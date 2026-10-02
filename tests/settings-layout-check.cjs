const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await page.locator('[data-primary-view="settings"]').click();

    const manageTemplates = page.locator('#managePsadtTemplates');
    for (let index = 0; index < 24; index += 1) {
      if (await page.evaluate(() => document.activeElement?.id === 'managePsadtTemplates')) break;
      await page.keyboard.press('Tab');
    }
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'managePsadtTemplates');
    assert.notEqual(await manageTemplates.evaluate(element => getComputedStyle(element).outlineStyle), 'none');
    await manageTemplates.click();
    assert(await page.locator('#psadtTemplatesPage').isVisible());
    assert(await page.locator('#settingsRootPage').isHidden());
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'psadtTemplatesPageTitle');
    assert.equal(await page.locator('#psadtTemplatesPage .psadt-template-row').count(), 3);

    await page.locator('label[for="defaultPsadtV3"]').click();
    assert(await page.locator('#defaultPsadtV3').isChecked());
    assert.equal(await page.locator('input[name="default-psadt-template"]:checked').count(), 1);

    await page.locator('[data-delete-psadt-template]').click();
    assert.equal(await page.locator('#psadtTemplatesPage .psadt-template-row').count(), 2);
    assert.equal(await page.locator('#psadtTemplateCount').textContent(), '2 templates');

    await page.locator('#downloadLatestPsadt').click();
    assert(await page.locator('#downloadLatestPsadt').isDisabled());
    await page.waitForTimeout(700);
    assert(!(await page.locator('#downloadLatestPsadt').isDisabled()));
    await page.screenshot({ path: '/tmp/settings-psadt-subpage-1440-light.png' });

    await page.locator('#backToSettings').click();
    assert(await page.locator('#settingsRootPage').isVisible());
    assert(await page.locator('#psadtTemplatesPage').isHidden());
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'managePsadtTemplates');

    const fragments = page.locator('#saveApplicationFragments');
    const initialFragments = await fragments.isChecked();
    await fragments.locator('xpath=..').click();
    assert.equal(await fragments.isChecked(), !initialFragments);

    await page.locator('#checkForUpdates').click();
    assert(await page.locator('#checkForUpdates').isDisabled());
    await page.waitForTimeout(750);
    assert(await page.locator('#settingsUpdateStatus').isVisible());

    const results = [];
    for (const width of [1440, 900]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const theme of ['light', 'dark']) {
        await page.locator('#themeToggle').click();
        await page.locator(`[data-theme-choice="${theme}"]`).click();
        await page.waitForTimeout(120);
        const metrics = await page.evaluate(() => {
          const header = document.querySelector('#settingsView .ia-page-header').getBoundingClientRect();
          const body = document.querySelector('.settings-page-body').getBoundingClientRect();
          const rows = [...document.querySelectorAll('.settings-page-body > .settings-group > .settings-row')].map(row => row.getBoundingClientRect());
          return {
            width: innerWidth,
            theme: document.body.dataset.theme,
            overflow: document.documentElement.scrollWidth - innerWidth,
            headerLeft: header.left,
            bodyLeft: body.left,
            rowLefts: rows.map(row => row.left),
            rowWidths: rows.map(row => row.width)
          };
        });
        results.push(metrics);
        await page.screenshot({ path: `/tmp/settings-after-${width}-${theme}.png` });
      }
    }

    assert.deepEqual(errors, []);
    assert(results.every(result => result.overflow === 0));
    assert(results.every(result => Math.abs(result.headerLeft - result.bodyLeft) < 1));
    assert(results.every(result => result.rowLefts.every(left => Math.abs(left - result.bodyLeft) < 3)));
    assert(results.every(result => Math.max(...result.rowWidths) - Math.min(...result.rowWidths) < 1));
    console.log(JSON.stringify({ passed: true, results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
