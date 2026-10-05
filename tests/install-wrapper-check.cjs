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
    await page.locator('.app-row').first().click();
    await page.locator('#installTab').click();
    const authorizeWrapper = async () => {
      await page.locator('#policyWrapperReason').fill('Wrapper regression test');
      await page.locator('#policyDialog button[type=submit]').click();
    };

    const installCommand = await page.locator('#payloadInstallCommand').inputValue();
    const uninstallCommand = await page.locator('#payloadUninstallCommand').inputValue();
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'PSADT wrapper');
    assert(await page.locator('#unwrapPsadtWrapper').isVisible());
    assert(await page.locator('#wrapperPanel').isVisible());

    await page.locator('#unwrapPsadtWrapper').click();
    await authorizeWrapper();
    assert(await page.locator('#unwrapPsadtDialog').isVisible());
    await page.locator('#cancelUnwrapPsadt').click();
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'PSADT wrapper');

    await page.locator('#unwrapPsadtWrapper').click();
    await authorizeWrapper();
    await page.locator('#confirmUnwrapPsadt').click();
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'Direct installer');
    assert(await page.locator('#createPsadtWrapper').isVisible());
    assert(!(await page.locator('#wrapperPanel').isVisible()));
    assert.equal(await page.locator('#payloadInstallCommand').inputValue(), installCommand);
    assert.equal(await page.locator('#payloadUninstallCommand').inputValue(), uninstallCommand);
    await page.screenshot({ path: '/tmp/install-direct-1440-light.png' });

    await page.evaluate(() => {
      const row = document.createElement('label');
      row.className = 'psadt-template-row';
      row.innerHTML = `
        <input type="radio" name="default-psadt-template" value="custom-4.2" />
        <span class="settings-row-icon psadt" aria-hidden="true"><img src="./assets/figma/icon-psadt.png" alt="" /></span>
        <span><strong>Enterprise PSADT 4.2</strong><small>Local template · Security baseline</small></span>`;
      document.querySelector('#psadtTemplateList').append(row);
    });

    await page.locator('#createPsadtWrapper').click();
    await authorizeWrapper();
    const choices = page.locator('#wrapperTemplateList input[name="wrapper-psadt-template"]');
    assert.equal(await choices.count(), 4);
    await page.locator('#wrapperTemplateList input[value="custom-4.2"]').check();
    await page.screenshot({ path: '/tmp/install-template-picker-1440-light.png' });
    await page.locator('#confirmCreatePsadtWrapper').click();
    assert.equal(await page.locator('#installationMethodTitle').textContent(), 'PSADT wrapper');
    assert.equal(await page.locator('#activePsadtTemplateName').textContent(), 'Enterprise PSADT 4.2');
    assert((await page.locator('#installationMethodDescription').textContent()).includes('Enterprise PSADT 4.2'));
    assert(await page.locator('#wrapperPanel').isVisible());

    await page.locator('[data-configuration-action="save"]').click();
    await page.locator('.version[data-version="12.3.122"]').click();
    await page.locator('.version[data-version="12.3.123"]').click();
    assert.equal(await page.locator('#activePsadtTemplateName').textContent(), 'Enterprise PSADT 4.2');

    await page.locator('#reviewTab').click();
    assert(await page.locator('.execution-chain-list code').first().isVisible());
    await page.locator('#installTab').click();

    const results = [];
    for (const width of [1440, 900]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const theme of ['light', 'dark']) {
        await page.locator('#themeToggle').click();
        await page.locator(`[data-theme-choice="${theme}"]`).click();
        await page.locator('.installation-method-card').scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await page.screenshot({ path: `/tmp/install-wrapper-${width}-${theme}.png` });
        await page.locator('#unwrapPsadtWrapper').click();
        await authorizeWrapper();
        await page.waitForTimeout(100);
        await page.screenshot({ path: `/tmp/install-unwrap-${width}-${theme}.png` });
        await page.locator('#cancelUnwrapPsadt').click();
        results.push(await page.evaluate(() => ({
          width: innerWidth,
          theme: document.body.dataset.theme,
          overflow: document.documentElement.scrollWidth - innerWidth,
          card: document.querySelector('.installation-method-card').getBoundingClientRect().toJSON()
        })));
      }
    }

    assert.deepEqual(errors, []);
    assert(results.every(result => result.overflow === 0));
    console.log(JSON.stringify({ passed: true, results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
