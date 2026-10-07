const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => sessionStorage.setItem('packit.prototype.access.v1', 'unlocked'));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Automation', exact: true }).click();
    await page.getByRole('button', { name: 'Workflows', exact: true }).click();
    for (const name of ['Standard application update', 'PSADT managed update', 'Local installer publication', 'Intune assignment defaults']) {
      assert.equal(await page.getByRole('row', { name: new RegExp(name) }).count(), 1, `${name} should be available`);
    }
    await page.getByRole('row', { name: /Standard application update/ }).getByRole('button', { name: 'Open workflow' }).click();

    assert.equal(await page.locator('.workflow-palette-group').count(), 7);
    assert.equal(await page.locator('.workflow-palette-item').count(), 25);
    assert.equal(await page.locator('.workflow-palette-item.required-item').count(), 11);
    assert.equal(await page.getByRole('button', { name: 'Remove Log no update', exact: true }).count(), 1);

    const primitiveSearch = page.getByRole('searchbox', { name: 'Search workflow primitives' });
    await primitiveSearch.fill('PSADT');
    assert.equal(await page.locator('.workflow-palette-item').count(), 2);
    assert.equal(await page.locator('.workflow-palette-select').filter({ hasText: 'Wrap with PSADT' }).count(), 1);
    assert.equal(await page.locator('.workflow-palette-select').filter({ hasText: 'Unwrap PSADT' }).count(), 1);
    await primitiveSearch.fill('no such primitive');
    assert(await page.getByText('No matching primitives', { exact: true }).isVisible());
    await primitiveSearch.fill('');
    assert.equal(await page.locator('.workflow-palette-item').count(), 25);
    const firstScopeHeading = page.locator('.workflow-palette-scope-heading').first();
    const scopeHeaderOrder = await firstScopeHeading.evaluate(heading => {
      const help = heading.querySelector('.wui-help-tip').getBoundingClientRect();
      const chevron = heading.querySelector('.workflow-palette-section-toggle').getBoundingClientRect();
      return { helpLeft: help.left, chevronLeft: chevron.left };
    });
    assert(scopeHeaderOrder.helpLeft < scopeHeaderOrder.chevronLeft, 'Category help should appear beside the label and before the chevron');

    const palette = page.locator('.workflow-palette');
    const initialCanvasZoom = await page.locator('.react-flow__viewport').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a);
    assert.equal(initialCanvasZoom, 0.86, 'The workflow should open at a comfortably closer default zoom');
    await page.waitForTimeout(50);
    assert.equal(await page.locator('.workflow-palette-scroll-cue.up').count(), 0, 'No upward cue is needed at the start of the list');
    assert.equal(await page.locator('.workflow-palette-scroll-cue.down').count(), 1, 'A downward cue should reveal more primitives below');
    assert.equal(await page.locator('.workflow-palette-search').evaluate(element => getComputedStyle(element).backgroundColor), 'rgba(0, 0, 0, 0)', 'Search should remain transparent before scrolling');
    await palette.evaluate(element => { element.scrollTop = 500; });
    await page.waitForTimeout(50);
    const stickySearch = await page.locator('.workflow-palette-search').evaluate(element => {
      const search = element.getBoundingClientRect();
      const paletteElement = element.closest('.workflow-palette');
      const paletteBounds = paletteElement.getBoundingClientRect();
      return {
        searchTop: Math.round(search.top),
        paletteTop: Math.round(paletteBounds.top),
        searchRight: Math.round(search.right),
        paletteContentRight: Math.round(paletteBounds.left + paletteElement.clientWidth),
        position: getComputedStyle(element).position,
        background: getComputedStyle(element).backgroundColor
      };
    });
    assert.equal(stickySearch.position, 'sticky');
    assert(Math.abs(stickySearch.searchTop - stickySearch.paletteTop) <= 1, 'Primitive search should remain fixed to the top of the scrolling palette');
    assert.notEqual(stickySearch.background, 'rgba(0, 0, 0, 0)', 'Scrolled search should mask content moving underneath it');
    assert(Math.abs(stickySearch.searchRight - stickySearch.paletteContentRight) <= 1, 'Primitive content should use the full width before the scrollbar');
    assert.equal(await page.locator('.workflow-palette-scroll-cue.up').count(), 1, 'An upward cue should appear after scrolling');
    assert.equal(await page.locator('.workflow-palette-scroll-cue.down').count(), 1, 'The downward cue should remain while more primitives exist below');
    await palette.evaluate(element => { element.scrollTop = element.scrollHeight; });
    await page.waitForTimeout(50);
    assert.equal(await page.locator('.workflow-palette-scroll-cue.up').count(), 1, 'The upward cue should remain at the end of the list');
    assert.equal(await page.locator('.workflow-palette-scroll-cue.down').count(), 0, 'The downward cue should disappear at the end of the list');
    await palette.evaluate(element => { element.scrollTop = 0; });
    await page.waitForTimeout(50);

    const requiredNodeBoxes = await page.locator('.packit-flow-node.required').evaluateAll(nodes => nodes.slice(0, 5).map(node => {
      const bounds = node.getBoundingClientRect();
      return { top: bounds.top, bottom: bounds.bottom };
    }));
    const requiredNodeGaps = requiredNodeBoxes.slice(1).map((bounds, index) => bounds.top - requiredNodeBoxes[index].bottom);
    assert(requiredNodeGaps.every(gap => gap >= 60), 'Default workflow primitives should have generous visual separation');
    assert.equal(await page.locator('.packit-flow-node.required .workflow-node-remove').count(), 0, 'Required primitives must not be removable');
    assert.equal(await page.getByText('Template backbone', { exact: true }).count(), 0, 'Required state should not add a persistent caption');
    assert(await page.locator('.packit-flow-node.required').first().getByRole('button', { name: 'Required by this workflow template' }).isVisible());
    const neutralNodeBorder = await page.locator('.packit-flow-node.required:not(.selected)').first().evaluate(node => {
      const style = getComputedStyle(node);
      return { left: style.borderLeftColor, top: style.borderTopColor, leftWidth: style.borderLeftWidth, topWidth: style.borderTopWidth };
    });
    assert.deepEqual(neutralNodeBorder, { ...neutralNodeBorder, left: neutralNodeBorder.top, leftWidth: neutralNodeBorder.topWidth }, 'Unselected primitives should use a neutral, even border');
    const workspaceNode = page.locator('.packit-flow-node').filter({ hasText: 'Select workspace' }).first();
    assert.equal(await page.locator('.workflow-node-footer').count(), 0, 'Primitive cards should not repeat internal action names or output labels in a footer');
    await workspaceNode.click({ position: { x: 100, y: 40 } });
    await page.waitForTimeout(160);
    const selectedNodeState = await workspaceNode.evaluate(node => {
      const style = getComputedStyle(node);
      return { selected: node.classList.contains('selected'), border: style.borderTopColor, outline: style.outlineStyle };
    });
    assert.equal(selectedNodeState.selected, true);
    assert.notEqual(selectedNodeState.border, neutralNodeBorder.top, 'Selection should use the accent border');
    assert.notEqual(selectedNodeState.outline, 'none', 'Selection should remain visible while hovered');
    const selectChevronInset = await workspaceNode.locator('.workflow-select-control').first().evaluate(control => parseFloat(getComputedStyle(control.querySelector(':scope > .fluent')).right));
    assert(selectChevronInset >= 12, 'Workflow dropdown chevrons should have a comfortable trailing inset');

    const noUpdateNode = page.locator('.packit-flow-node').filter({ hasText: 'Log no update' });
    await noUpdateNode.getByRole('button', { name: 'Remove Log no update from workflow' }).click();
    assert.equal(await noUpdateNode.count(), 0);
    await page.getByRole('button', { name: 'Add Log no update', exact: true }).click();
    assert.equal(await page.locator('.packit-flow-node').filter({ hasText: 'Log no update' }).count(), 1, 'Removed optional primitives should be restorable');

    const paletteMetrics = await page.locator('.workflow-palette').evaluate(element => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      overflowY: getComputedStyle(element).overflowY,
    }));
    assert(paletteMetrics.scrollHeight > paletteMetrics.clientHeight, 'The primitive palette should scroll independently');
    assert.equal(paletteMetrics.overflowY, 'auto');

    await page.locator('.workflow-palette-select').filter({ hasText: 'Delay' }).dragTo(page.locator('.react-flow__pane'), {
      targetPosition: { x: 520, y: 520 },
    });
    const delay = page.locator('.packit-flow-node').filter({ hasText: 'Delay' });
    assert.equal(await delay.count(), 1);
    assert.equal(await delay.locator('input[type="number"]').count(), 1, 'Common primitive options should be editable in the node');
    assert(await page.getByRole('button', { name: 'Save draft', exact: true }).isEnabled());

    await page.getByRole('button', { name: 'Add Wrap with PSADT', exact: true }).click();
    const wrapper = page.locator('.packit-flow-node').filter({ hasText: 'Wrap with PSADT' });
    assert.equal(await wrapper.count(), 1);
    const wrapperInspector = page.getByRole('complementary', { name: 'Wrap with PSADT properties' });
    assert(await wrapperInspector.getByRole('combobox', { name: 'PSADT template' }).isVisible());
    await wrapperInspector.getByRole('combobox', { name: 'PSADT template' }).selectOption('PSADT v4.1.8');
    assert(await page.getByRole('button', { name: 'Save draft', exact: true }).isEnabled());

    await page.getByRole('button', { name: 'Add Unwrap PSADT', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Add Wrap with PSADT', exact: true }).count(), 1);
    assert.equal(await page.getByRole('button', { name: 'Remove Unwrap PSADT', exact: true }).count(), 1);

    await page.getByRole('button', { name: 'Add Assign groups', exact: true }).click();
    const assignment = page.locator('.packit-flow-node').filter({ hasText: 'Assign groups' });
    assert.equal(await assignment.count(), 1);
    assert(await page.getByRole('complementary', { name: 'Assign groups properties' }).getByRole('combobox', { name: 'Intent' }).isVisible());
    assert.equal(await page.getByRole('button', { name: 'Remove Assign groups', exact: true }).count(), 1);
    await page.locator('.workflow-commandbar').scrollIntoViewIfNeeded();
    await page.locator('.workflow-palette').evaluate(element => { element.scrollTop = 0; });
    await page.screenshot({ path: '/tmp/packit-workflow-primitives.png' });

    const openWorkflow = async (name) => {
      await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'Automation', exact: true }).click();
      await page.getByRole('button', { name: 'Workflows', exact: true }).click();
      await page.getByRole('row', { name: new RegExp(name) }).getByRole('button', { name: 'Open workflow' }).click();
    };

    await openWorkflow('PSADT managed update');
    await page.locator('.workflow-palette-select').filter({ hasText: 'Wrap with PSADT' }).click();
    assert.equal(await page.getByRole('complementary', { name: 'Wrap with PSADT properties' }).getByRole('combobox', { name: 'PSADT template' }).inputValue(), 'PSADT v4.1.8');

    await openWorkflow('Local installer publication');
    assert.equal(await page.evaluate(() => Object.keys(packitPolicy.latest('local-publish').values).some(key => key.startsWith('queryWingetCatalog.'))), false);
    await page.locator('.workflow-palette-select').filter({ hasText: 'Installer source folder' }).click();
    assert.equal(await page.getByRole('complementary', { name: 'Installer source folder properties' }).getByRole('textbox', { name: 'Folder' }).inputValue(), 'C:\\Packages\\Contoso Finance Tools\\12.4.0');

    await openWorkflow('Intune assignment defaults');
    for (const label of ['Assign pilot availability', 'Assign production requirement', 'Assign legacy uninstall']) {
      assert.equal(await page.locator('.workflow-palette-select').filter({ hasText: label }).count(), 1);
    }
    await page.locator('.workflow-palette-select').filter({ hasText: 'Assign production requirement' }).click();
    assert.equal(await page.getByRole('complementary', { name: 'Assign production requirement properties' }).getByRole('combobox', { name: 'Intent' }).inputValue(), 'required');
    const productionGroups = page.getByRole('complementary', { name: 'Assign production requirement properties' }).getByRole('textbox', { name: 'Groups' });
    assert.equal(await productionGroups.inputValue(), 'PacKit - Managed Windows Devices');
    await productionGroups.fill('PacKit - Managed Windows Devices\nPacKit - Finance Devices');
    await page.getByRole('button', { name: 'Save draft', exact: true }).click();
    await openWorkflow('Intune assignment defaults');
    await page.locator('.workflow-palette-select').filter({ hasText: 'Assign production requirement' }).click();
    assert((await page.getByRole('complementary', { name: 'Assign production requirement properties' }).getByRole('textbox', { name: 'Groups' }).inputValue()).includes('Finance Devices'));

    for (const width of [1440, 900]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: 24 catalog actions and four configured workflow recipes');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
