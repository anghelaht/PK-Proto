const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const baseUrl = 'http://localhost:4173/';

async function open(browser, query) {
  const context = await browser.newContext();
  await context.addInitScript(() => sessionStorage.setItem('packit.prototype.access.v1', 'unlocked'));
  const page = await context.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${baseUrl}${query}`, { waitUntil: 'networkidle' });
  return { context, page, errors };
}

function assertParams(url, expected) {
  const params = new URL(url).searchParams;
  for (const [key, value] of Object.entries(expected)) {
    assert.equal(params.get(key), value, `${key} should be semantic in ${url}`);
  }
}

(async () => {
  const browser = await chromium.launch();
  try {
    const directRoutes = [
      ['application list', '?page=applications', () => document.querySelector('#listView').classList.contains('active')],
      ['digital signature', '?page=digital-signature', () => document.querySelector('#signatureView').classList.contains('active')],
      ['discover tools', '?page=discover-tools', () => document.querySelector('#toolsView').classList.contains('active')],
      ['settings templates', '?page=settings&section=psadt-templates', () => !document.querySelector('#psadtTemplatesPage').hidden],
      ['automation daemon', '?page=automation&section=daemon', () => document.querySelector('#daemonAutomationPanel').classList.contains('active')],
      ['run history', '?page=automation&section=run-history', () => document.querySelector('#historyAutomationPanel').classList.contains('active')],
      ['application version', '?page=applications&application=contoso-finance-tools&version=12.3.122&section=install', () => selectedVersion === '12.3.122' && document.querySelector('#installPanel').classList.contains('active')],
      ['application workflow', '?page=applications&application=contoso-finance-tools&section=workflow', () => document.querySelector('#applicationWorkflowPanel').classList.contains('active')],
      ['workflow editor', '?page=automation&section=workflows&workflow=starter&workflowView=revisions', () => document.querySelector('#workflow-tab-revisions').getAttribute('aria-selected') === 'true'],
      ['workflow creation', '?page=automation&section=workflows&workflow=new&workflowView=design', () => document.querySelector('.workflow-command-identity strong').textContent === 'Untitled update workflow'],
      ['theme and account', '?page=discover-tools&theme=dark&account=intune-accounts', () => document.body.dataset.theme === 'dark' && !document.querySelector('#accountFlyout').hidden && document.querySelector('#intuneAccountsTab').getAttribute('aria-selected') === 'true']
    ];

    for (const [name, query, predicate] of directRoutes) {
      const { context, page, errors } = await open(browser, query);
      await page.waitForTimeout(140);
      assert.equal(await page.evaluate(predicate), true, `${name} direct route`);
      assert.deepEqual(errors, [], `${name} page errors`);
      await context.close();
    }

    const { context, page } = await open(browser, '?page=applications');
    await page.locator('.app-row').first().click();
    await page.waitForTimeout(40);
    assertParams(page.url(), { page: 'applications', application: 'contoso-finance-tools', version: '12.3.123', section: 'package' });

    await page.locator('.version[data-version="12.3.122"]').click();
    await page.locator('#installTab').click();
    await page.waitForTimeout(40);
    assertParams(page.url(), { application: 'contoso-finance-tools', version: '12.3.122', section: 'install' });

    await page.locator('[data-primary-view="automation"]').click();
    await page.locator('[data-automation-tab="workflows"]').click();
    await page.locator('[data-workflow-open="starter"]').click();
    await page.waitForTimeout(100);
    assertParams(page.url(), { page: 'automation', section: 'workflows', workflow: 'starter', workflowView: 'design' });

    await page.locator('#workflow-tab-runs').click();
    await page.waitForTimeout(40);
    assertParams(page.url(), { workflow: 'starter', workflowView: 'runs' });

    await page.locator('#themeToggle').click();
    await page.locator('[data-theme-choice="dark"]').click();
    await page.locator('#accountToggle').click();
    await page.waitForTimeout(40);
    assertParams(page.url(), { theme: 'dark', account: 'profile' });

    await page.locator('#intuneAccountsTab').click();
    await page.waitForTimeout(40);
    assertParams(page.url(), { account: 'intune-accounts' });

    await page.goBack({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#accountToggle').getAttribute('aria-expanded'), 'true');
    await context.close();
    console.log('PASS: semantic prototype routes and browser history');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
