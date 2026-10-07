const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => {
      sessionStorage.setItem('packit.prototype.access.v1', 'unlocked');
      if (!sessionStorage.getItem('packit.tests.workflow-seeded')) {
        localStorage.removeItem('packit-workflow-policy-v1');
        localStorage.removeItem('packit-deployment-v1');
        sessionStorage.setItem('packit.tests.workflow-seeded', 'true');
      }
    });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

    const readyStatusIcon = page.locator('.app-row').filter({ hasText: 'Contoso Finance Tools' }).locator('.status .fluent');
    assert(await readyStatusIcon.isVisible());
    assert(await readyStatusIcon.evaluate(element => getComputedStyle(element).webkitMaskImage.includes('arrow-up.svg')));

    const assignments = await page.evaluate(() => Object.fromEntries(Object.entries(packitPolicy.state().applications).map(([name, app]) => [name, app.binding])));
    assert.deepEqual(assignments['Contoso Finance Tools'], { workflowId: 'local-publish', revision: '1.0' });
    assert.deepEqual(assignments['Google Chrome'], { workflowId: 'psadt-update', revision: '1.0' });
    assert.deepEqual(assignments['Microsoft Project'], { workflowId: 'assignment-defaults', revision: '1.0' });
    assert.deepEqual(assignments['Microsoft Edge'], { workflowId: 'starter', revision: '2.0' });
    assert.equal(assignments['Tailspin Inventory Client'], null);
    assert.equal(assignments['Northwind VPN Client'], null);
    assert.equal(assignments['Adobe Acrobat Reader'], null);
    assert.equal(await page.evaluate(() => Object.values(packitPolicy.state().applications).some(app => app.binding?.workflowId === 'guided' || Object.values(app.versions).some(version => version.binding?.workflowId === 'guided'))), false);
    await page.evaluate(() => {
      const state = packitPolicy.state();
      for (const name of ['Microsoft Edge', 'Tailspin Inventory Client']) {
        state.applications[name].binding = { workflowId: 'guided', revision: '1.4' };
        Object.values(state.applications[name].versions).forEach(version => { version.binding = { workflowId: 'guided', revision: '1.4' }; });
      }
      localStorage.setItem('packit-workflow-policy-v1', JSON.stringify(state));
    });
    await page.reload({ waitUntil: 'networkidle' });
    assert.deepEqual(await page.evaluate(() => packitPolicy.state().applications['Microsoft Edge'].binding), { workflowId: 'starter', revision: '2.0' });
    assert.equal(await page.evaluate(() => packitPolicy.state().applications['Tailspin Inventory Client'].binding), null);
    assert.equal(await page.evaluate(() => Object.values(packitPolicy.state().applications).some(app => app.binding?.workflowId === 'guided' || Object.values(app.versions).some(version => version.binding?.workflowId === 'guided'))), false);

    const openApplication = async name => {
      if (await page.locator('#backToList').isVisible()) await page.locator('#backToList').click();
      await page.locator('#applicationSearch').fill(name);
      await page.locator('.app-row').filter({ hasText: name }).click();
      await page.locator('#installTab').click();
    };

    const assertLinkedVersionStatus = async expectedKey => {
      const version = await page.locator('.version.active').getAttribute('data-version');
      const leftStatus = page.locator(`.version[data-version="${version}"] > .status`);
      const commandStatus = page.locator('#commandStatus');
      assert(await leftStatus.isVisible());
      assert(await commandStatus.isVisible());
      assert.equal(await leftStatus.getAttribute('data-status-key'), expectedKey);
      assert.equal(await commandStatus.getAttribute('data-status-key'), expectedKey);
      assert.equal(await leftStatus.getAttribute('title'), await commandStatus.getAttribute('title'));
    };

    await openApplication('Contoso Finance Tools');
    assert.equal(await page.locator('#requirementsMinimumOs').evaluate(element => element.tagName), 'SELECT');
    assert(!(await page.locator('#requirementsMinimumOs').isDisabled()));
    assert(await page.locator('#packageVersionInput').isDisabled());
    assert.equal(await page.locator('#packageVersionInput').inputValue(), '12.4.0');
    assert(await page.locator('#payloadInstallCommand').isDisabled());
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'Direct installer');

    const selectMetrics = await page.locator('#requirementsMinimumOs').evaluate(element => {
      const style = getComputedStyle(element);
      return { paddingRight: parseFloat(style.paddingRight), position: style.backgroundPosition };
    });
    assert(selectMetrics.paddingRight >= 36);
    assert(selectMetrics.position.includes('12px'));

    const navAlignment = await page.locator('.version').first().evaluate(element => {
      const status = element.querySelector('.status').getBoundingClientRect();
      const parent = element.getBoundingClientRect();
      return { inset: Math.round(parent.right - status.right), label: element.querySelector('.status').innerText.trim() };
    });
    assert(navAlignment.inset <= 12);
    assert(['Issues', 'Intune failed', 'MECM failed', 'Intune + MECM', 'Intune', 'MECM', 'Ready'].includes(navAlignment.label));

    await openApplication('Google Chrome');
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'PSADT wrapper');
    assert.equal(await page.locator('#activePsadtTemplateName').textContent(), 'PSADT v4.1.8');
    assert(!(await page.locator('#payloadInstallCommand').isDisabled()));
    assert(!(await page.locator('#payloadUninstallCommand').isDisabled()));
    assert(await page.locator('#createPsadtWrapper').isDisabled());
    assert(await page.locator('#policyWrapperOwnership .policy-source-tip').isVisible());

    await openApplication('Skype for Business');
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'Direct installer');
    assert(!(await page.locator('#packageVersionInput').isDisabled()));
    assert(!(await page.locator('#requirementsArchitecture').isDisabled()));
    assert(!(await page.locator('#requirementsMinimumOs').isDisabled()));
    await assertLinkedVersionStatus('published-intune');
    await page.locator('#requirementsMinimumOs').selectOption('Windows 11 24H2');
    await assertLinkedVersionStatus('unsaved');
    assert.equal((await page.locator('.version.active > .status').innerText()).trim(), 'Unsaved');
    assert((await page.locator('#commandStatus').innerText()).includes('Unsaved configuration changes'));
    await page.locator('[data-configuration-action="cancel"]').click();
    await assertLinkedVersionStatus('published-intune');

    await openApplication('Microsoft Project');
    await page.locator('#deploymentTab').click();
    for (const intent of ['available', 'required', 'uninstall']) {
      assert(await page.locator(`[data-edit-managed-intent="${intent}"]`).isVisible());
      assert(await page.locator(`#deploy-${intent}-title`).locator('xpath=..').locator('.wui-help-tip[aria-label*="managed"]').isVisible());
    }
    assert.equal((await page.evaluate(() => packitDeployment.capture())).assignments.available[0].id, 'packit-pilot');
    assert.equal((await page.evaluate(() => packitDeployment.capture())).assignments.required[0].id, 'packit-managed');
    assert.equal((await page.evaluate(() => packitDeployment.capture())).assignments.uninstall[0].id, 'packit-retired');

    await openApplication('Remote Desktop');
    await page.locator('.applied-template-command').click();
    assert(await page.locator('#policyDialog').isVisible());
    assert.deepEqual(await page.locator('#policyWorkflowChoice option').allTextContents(), [
      'Intune assignment defaults · v1.0',
      'Local installer publication · v1.0',
      'PSADT managed update · v1.0',
      'Standard application update · v2.0'
    ]);
    assert(await page.locator('#policyReplaceCurrentVersion').isChecked());
    await page.locator('#policyWorkflowChoice').selectOption('psadt-update');
    await page.locator('#policyDialog button[type="submit"]').click();
    assert.deepEqual(await page.evaluate(() => packitPolicy.state().applications['Remote Desktop'].binding), { workflowId: 'psadt-update', revision: '1.0' });
    assert.deepEqual(await page.evaluate(() => packitPolicy.effective('Remote Desktop', selectedVersion).binding), { workflowId: 'psadt-update', revision: '1.0' });
    assert.equal(await page.locator('.applied-template-command strong').textContent(), 'PSADT managed update');
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'PSADT wrapper');

    await page.screenshot({ path: '/tmp/version-workflow-alignment-light.png', fullPage: true });
    await page.locator('#themeToggle').click();
    await page.locator('[data-theme-choice="dark"]').click();
    await page.waitForTimeout(150);
    assert.equal(await page.locator('.version-number').first().evaluate(element => getComputedStyle(element).color), 'rgb(255, 255, 255)');
    await page.screenshot({ path: '/tmp/version-workflow-alignment-dark.png', fullPage: true });
    await page.reload({ waitUntil: 'networkidle' });
    assert.deepEqual(await page.evaluate(() => packitPolicy.state().applications['Remote Desktop'].binding), { workflowId: 'psadt-update', revision: '1.0' });
    assert.deepEqual(errors, []);
    console.log('PASS: version controls match explicit workflow properties and compact navigation states');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
