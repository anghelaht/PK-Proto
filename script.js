const appCatalog = [
  { name: "Contoso Finance Tools", publisher: "Contoso", update: "New", status: "", versions: "3 versions", source: "-", arch: "x86", version: "12.3.10", state: "all" },
  { name: "Fabrikam Helpdesk Agent", publisher: "Fabrikam", update: "", status: "Not configured", versions: "No versions", source: "-", arch: "-", version: "-", state: "all", empty: true },
  { name: "Tailspin Inventory Client", publisher: "Tailspin Toys", update: "", status: "⚠ Configuration issues", versions: "13 versions", source: "WinGet", arch: "x64", version: "12.3.10", state: "issue" },
  { name: "Northwind VPN Client", publisher: "Northwind Traders", update: "", status: "× Upload to MECM failed", versions: "13 versions", source: "Local", arch: "x64", version: "12.3.10", state: "failed" },
  { name: "Skype for Business", publisher: "Microsoft", update: "⇩ Update available", status: "✓ Published to Intune", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Project", publisher: "Microsoft", update: "⇩ Update available", status: "✓ Published to Intune and MECM", versions: "3 version", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Visio", publisher: "Microsoft", update: "", status: "✓ Published to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft PowerToys", publisher: "Microsoft", update: "", status: "✓ Published to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Loop", publisher: "Microsoft", update: "", status: "✓ Published to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Whiteboard", publisher: "Microsoft", update: "", status: "✓ Published to Intune", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft To Do", publisher: "Microsoft", update: "", status: "", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "all" },
  { name: "Microsoft Planner", publisher: "Microsoft", update: "", status: "", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "all" }
];

const generatedApps = [
  { name: "Microsoft Edge", publisher: "Microsoft", update: "Update available", status: "✓ Published to Intune", versions: "9 versions", source: "WinGet", arch: "x64", version: "124.0.2478", state: "success" },
  { name: "Microsoft Teams", publisher: "Microsoft", update: "Update available", status: "⚠ Configuration issues", versions: "14 versions", source: "WinGet", arch: "x64", version: "24102.2223", state: "issue" },
  { name: "OneDrive", publisher: "Microsoft", update: "", status: "✓ Published to MECM", versions: "7 versions", source: "WinGet", arch: "x64", version: "24.076.0414", state: "success" },
  { name: "Power BI Desktop", publisher: "Microsoft", update: "Update available", status: "× Upload to MECM failed", versions: "18 versions", source: "Local", arch: "x64", version: "2.128.952", state: "failed" },
  { name: "Visual Studio Code", publisher: "Microsoft", update: "Update available", status: "✓ Published to Intune and MECM", versions: "21 versions", source: "WinGet", arch: "x64", version: "1.89.0", state: "success" },
  { name: "Azure Data Studio", publisher: "Microsoft", update: "", status: "× Upload to Intune failed", versions: "6 versions", source: "Local", arch: "x64", version: "1.49.1", state: "failed" },
  { name: "Remote Desktop", publisher: "Microsoft", update: "", status: "✓ Published to Intune", versions: "5 versions", source: "WinGet", arch: "x64", version: "1.2.5405", state: "success" },
  { name: "Windows Admin Center", publisher: "Microsoft", update: "Update available", status: "× Upload to MECM failed", versions: "4 versions", source: "Local", arch: "x64", version: "2311.0", state: "failed" },
  { name: "7-Zip", publisher: "Igor Pavlov", update: "Update available", status: "✓ Published to Intune", versions: "11 versions", source: "WinGet", arch: "x64", version: "24.05", state: "success" },
  { name: "Adobe Acrobat Reader", publisher: "Adobe", update: "Update available", status: "⚠ Configuration issues", versions: "19 versions", source: "WinGet", arch: "x64", version: "24.002", state: "issue" },
  { name: "Google Chrome", publisher: "Google", update: "Update available", status: "✓ Published to Intune", versions: "23 versions", source: "WinGet", arch: "x64", version: "124.0.6367", state: "success" },
  { name: "Mozilla Firefox", publisher: "Mozilla", update: "", status: "✓ Published to Intune", versions: "17 versions", source: "WinGet", arch: "x64", version: "126.0", state: "success" },
  { name: "Notepad++", publisher: "Notepad++ Team", update: "Update available", status: "✓ Published to Intune and MECM", versions: "15 versions", source: "WinGet", arch: "x64", version: "8.6.7", state: "success" },
  { name: "VLC Media Player", publisher: "VideoLAN", update: "", status: "⚠ Configuration issues", versions: "10 versions", source: "Local", arch: "x64", version: "3.0.20", state: "issue" },
  { name: "Git", publisher: "Git Project", update: "Update available", status: "✓ Published to Intune", versions: "12 versions", source: "WinGet", arch: "x64", version: "2.45.1", state: "success" },
  { name: "GitHub Desktop", publisher: "GitHub", update: "", status: "× Upload to MECM failed", versions: "8 versions", source: "WinGet", arch: "x64", version: "3.3.18", state: "failed" },
  { name: "Docker Desktop", publisher: "Docker", update: "Update available", status: "⚠ Configuration issues", versions: "13 versions", source: "Local", arch: "x64", version: "4.30.0", state: "issue" },
  { name: "Postman", publisher: "Postman", update: "", status: "✓ Published to Intune", versions: "16 versions", source: "WinGet", arch: "x64", version: "11.1.13", state: "success" },
  { name: "Slack", publisher: "Salesforce", update: "Update available", status: "✓ Published to Intune", versions: "20 versions", source: "WinGet", arch: "x64", version: "4.38.127", state: "success" },
  { name: "Zoom Workplace", publisher: "Zoom", update: "Update available", status: "× Upload to MECM failed", versions: "22 versions", source: "Local", arch: "x64", version: "6.0.10", state: "failed" },
  { name: "Cisco Webex", publisher: "Cisco", update: "", status: "✓ Published to Intune", versions: "9 versions", source: "WinGet", arch: "x64", version: "44.5.0", state: "success" },
  { name: "Citrix Workspace", publisher: "Cloud Software Group", update: "Update available", status: "⚠ Configuration issues", versions: "12 versions", source: "Local", arch: "x64", version: "2403.1", state: "issue" },
  { name: "FortiClient VPN", publisher: "Fortinet", update: "", status: "× Upload to MECM failed", versions: "6 versions", source: "Local", arch: "x64", version: "7.2.4", state: "failed" },
  { name: "GlobalProtect", publisher: "Palo Alto Networks", update: "Update available", status: "✓ Published to Intune", versions: "7 versions", source: "Local", arch: "x64", version: "6.2.3", state: "success" },
  { name: "PuTTY", publisher: "Simon Tatham", update: "", status: "✓ Published to Intune", versions: "5 versions", source: "WinGet", arch: "x64", version: "0.81", state: "success" },
  { name: "WinSCP", publisher: "Martin Prikryl", update: "Update available", status: "✓ Published to Intune", versions: "13 versions", source: "WinGet", arch: "x64", version: "6.3.3", state: "success" },
  { name: "FileZilla Client", publisher: "FileZilla Project", update: "", status: "⚠ Configuration issues", versions: "9 versions", source: "WinGet", arch: "x64", version: "3.67.0", state: "issue" },
  { name: "KeePass", publisher: "Dominik Reichl", update: "Update available", status: "✓ Published to Intune and MECM", versions: "6 versions", source: "Local", arch: "x64", version: "2.57", state: "success" },
  { name: "1Password", publisher: "AgileBits", update: "", status: "✓ Published to Intune", versions: "11 versions", source: "WinGet", arch: "x64", version: "8.10.32", state: "success" },
  { name: "Figma Desktop", publisher: "Figma", update: "Update available", status: "✓ Published to Intune", versions: "14 versions", source: "WinGet", arch: "x64", version: "124.6.5", state: "success" },
  { name: "Miro", publisher: "Miro", update: "", status: "⚠ Configuration issues", versions: "8 versions", source: "Local", arch: "x64", version: "0.9.93", state: "issue" },
  { name: "Jira Cloud", publisher: "Atlassian", update: "", status: "", versions: "2 versions", source: "Local", arch: "x64", version: "2.1.4", state: "all" },
  { name: "Tableau Desktop", publisher: "Salesforce", update: "Update available", status: "× Upload to MECM failed", versions: "10 versions", source: "Local", arch: "x64", version: "2024.1", state: "failed" },
  { name: "SAP GUI", publisher: "SAP", update: "", status: "✓ Published to Intune", versions: "5 versions", source: "Local", arch: "x64", version: "8.00", state: "success" },
  { name: "ServiceNow Agent", publisher: "ServiceNow", update: "Update available", status: "⚠ Configuration issues", versions: "4 versions", source: "Local", arch: "x64", version: "3.5.2", state: "issue" },
  { name: "Box Drive", publisher: "Box", update: "", status: "✓ Published to Intune", versions: "8 versions", source: "WinGet", arch: "x64", version: "2.38.146", state: "success" },
  { name: "Dropbox", publisher: "Dropbox", update: "Update available", status: "✓ Published to Intune", versions: "16 versions", source: "WinGet", arch: "x64", version: "199.4.6287", state: "success" },
  { name: "RingCentral", publisher: "RingCentral", update: "", status: "× Upload to MECM failed", versions: "7 versions", source: "Local", arch: "x64", version: "24.2.10", state: "failed" },
  { name: "Bluebeam Revu", publisher: "Bluebeam", update: "Update available", status: "⚠ Configuration issues", versions: "9 versions", source: "Local", arch: "x64", version: "21.1.0", state: "issue" },
  { name: "Oracle Java Runtime", publisher: "Oracle", update: "Update available", status: "✓ Published to Intune", versions: "18 versions", source: "Local", arch: "x64", version: "8u411", state: "success" }
];

const apps = [...appCatalog, ...generatedApps];
const defaultWorkflowAssignments = {
  "Contoso Finance Tools": "local-publish",
  "Google Chrome": "psadt-update",
  "Microsoft Project": "assignment-defaults",
  "Skype for Business": "starter",
  "Microsoft Whiteboard": "starter",
  "Microsoft Edge": "starter",
  "Visual Studio Code": "starter",
  "Remote Desktop": "starter",
  "7-Zip": "starter",
  "Mozilla Firefox": "starter",
  "Notepad++": "starter",
  "Git": "starter",
  "GlobalProtect": "starter",
  "Cisco Webex": "starter"
};
apps.forEach((app) => { app.workflow = defaultWorkflowAssignments[app.name] || null; });

let statusFilter = "all";
let updatesOnly = false;
let searchQuery = "";

const appList = document.querySelector("#appList");
const listView = document.querySelector("#listView");
const signatureView = document.querySelector("#signatureView");
const signatureEnabled = document.querySelector("#signatureEnabled");
const signatureEnabledLabel = document.querySelector("#signatureEnabledLabel");
const signatureSettings = document.querySelector("#signatureSettings");
const signatureDisabledState = document.querySelector("#signatureDisabledState");
const signatureMethodInputs = [...document.querySelectorAll("input[name='signature-method']")];
const trustedSigningToolsStatus = document.querySelector("#trustedSigningToolsStatus");
const installTrustedSigningTools = document.querySelector("#installTrustedSigningTools");
const downloadTrustedSigningTools = document.querySelector("#downloadTrustedSigningTools");
const refreshCertificates = document.querySelector("#refreshCertificates");
const trustedSigningCorrelationToggle = document.querySelector("#trustedSigningCorrelationToggle");
const trustedSigningCorrelationField = document.querySelector("#trustedSigningCorrelationField");
const automationView = document.querySelector("#automationView");
const toolsView = document.querySelector("#toolsView");
const settingsView = document.querySelector("#settingsView");

const helpTooltipId = "wui-help-tooltip";
const helpTooltipLayer = document.createElement("div");
helpTooltipLayer.id = helpTooltipId;
helpTooltipLayer.className = "wui-tooltip-layer";
helpTooltipLayer.setAttribute("role", "tooltip");
helpTooltipLayer.hidden = true;
document.body.append(helpTooltipLayer);
let activeHelpTooltipButton = null;
const settingsRootPage = document.querySelector("#settingsRootPage");
const psadtTemplatesPage = document.querySelector("#psadtTemplatesPage");
const psadtTemplateList = document.querySelector("#psadtTemplateList");
const customPsadtTemplateList = document.querySelector("#customPsadtTemplateList");
const psadtTemplateFile = document.querySelector("#psadtTemplateFile");
const psadtTemplateCount = document.querySelector("#psadtTemplateCount");
const saveApplicationFragments = document.querySelector("#saveApplicationFragments");
const settingsUpdateStatus = document.querySelector("#settingsUpdateStatus");
const automationShell = document.querySelector(".automation-shell");
const detailView = document.querySelector("#detailView");
const shell = document.querySelector("#shell");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");
const toastIcon = toast.querySelector(".toast-icon");
const closeToast = document.querySelector("#closeToast");
const statusMenu = document.querySelector("#statusMenu");
const searchInput = document.querySelector("#applicationSearch");
const clearSearch = document.querySelector("#clearApplicationSearch");
const createPsadtWrapper = document.querySelector("#createPsadtWrapper");
const unwrapPsadtWrapper = document.querySelector("#unwrapPsadtWrapper");
const wrapperConfiguredState = document.querySelector("#wrapperConfiguredState");
const wrapperPanel = document.querySelector("#wrapperPanel");
const activePsadtTemplateName = document.querySelector("#activePsadtTemplateName");
const createPsadtWrapperDialog = document.querySelector("#createPsadtWrapperDialog");
const wrapperTemplateList = document.querySelector("#wrapperTemplateList");
const unwrapPsadtDialog = document.querySelector("#unwrapPsadtDialog");
let activePsadtTemplate = {
  id: "4.1.8",
  name: "PSADT v4.1.8_2",
  source: "GitHub release · Built in"
};
const contextCommandBar = document.querySelector("#contextCommandBar");
const detailMain = document.querySelector(".detail-main");
const commandContextMeta = document.querySelector("#commandContextMeta");
const commandStatus = document.querySelector("#commandStatus");
const commandInlineControls = document.querySelector("#commandInlineControls");
const strategyTabs = document.querySelector("#strategyTabs");
const strategyChoicePanel = document.querySelector("#strategyChoicePanel");
const strategyConfigurationFields = document.querySelector("#strategyConfigurationFields");
const strategyTemplateName = document.querySelector("#strategyTemplateName");
const strategyTemplateMeta = document.querySelector("#strategyTemplateMeta");
const strategyTemplateState = document.querySelector("#strategyTemplateState");
const strategyTemplateEditBar = document.querySelector("#strategyTemplateEditBar");
const strategyEditScopeTitle = document.querySelector("#strategyEditScopeTitle");
const strategyEditScopeDescription = document.querySelector("#strategyEditScopeDescription");
const editStrategyConfiguration = document.querySelector("#editStrategyConfiguration");
const resetStrategyTemplate = document.querySelector("#resetStrategyTemplate");
const strategyEditDialog = document.querySelector("#strategyEditDialog");
const newStrategyTemplateNameField = document.querySelector("#newStrategyTemplateNameField");
const newStrategyTemplateName = document.querySelector("#newStrategyTemplateName");
const informationTemplateName = document.querySelector("#informationTemplateName");
const informationTemplateMeta = document.querySelector("#informationTemplateMeta");
const informationTemplateState = document.querySelector("#informationTemplateState");
const changeAutomationTemplate = document.querySelector("#changeAutomationTemplate");
const manageAutomationTemplate = document.querySelector("#manageAutomationTemplate");
const updateLifecyclePanel = document.querySelector("#reviewPanel");
const automationTemplateSummary = document.querySelector("#automationTemplateSummary");
const versionAutomationRecord = document.querySelector("#versionAutomationRecord");
const viewAppliedSnapshot = document.querySelector("#viewAppliedSnapshot");
const appliedSnapshot = document.querySelector("#appliedSnapshot");
const versionAutomationRecordTitle = document.querySelector("#versionAutomationRecordTitle");
const reviewPendingChange = document.querySelector("#reviewPendingChange");
const reviewPendingChangeTitle = document.querySelector("#reviewPendingChangeTitle");
const reviewPendingChangeDescription = document.querySelector("#reviewPendingChangeDescription");
const reviewTab = document.querySelector("#reviewTab");
const provenanceSourceVersion = document.querySelector("#provenanceSourceVersion");
const provenanceTemplate = document.querySelector("#provenanceTemplate");
const provenanceCreatedOn = document.querySelector("#provenanceCreatedOn");
const provenanceConfigurationState = document.querySelector("#provenanceConfigurationState");
const snapshotSourceVersion = document.querySelector("#snapshotSourceVersion");
const packageVersionInput = document.querySelector("#packageVersionInput");
const saveConfigurationDialog = document.querySelector("#saveConfigurationDialog");
const newConfigurationTemplateNameField = document.querySelector("#newConfigurationTemplateNameField");
const newConfigurationTemplateName = document.querySelector("#newConfigurationTemplateName");
const sharedTemplateImpact = document.querySelector("#sharedTemplateImpact");
const confirmSaveConfiguration = document.querySelector("#confirmSaveConfiguration");
const automationTemplateDialog = document.querySelector("#automationTemplateDialog");
const replaceTemplateImpact = document.querySelector("#replaceTemplateImpact");
const automationNewAction = document.querySelector("#automationNewAction");
const automationOpenAction = document.querySelector("#automationOpenAction");
const automationSaveAction = document.querySelector("#automationSaveAction");
const automationCommandBar = document.querySelector("#automationCommandBar");
const automationEditorTemplateName = document.querySelector("#automationEditorTemplateName");
const automationEditorTemplateMeta = document.querySelector("#automationEditorTemplateMeta");
const daemonStatusIcon = document.querySelector("#daemonStatusIcon");
const daemonStatusTitle = document.querySelector("#daemonStatusTitle");
const daemonStatusDescription = document.querySelector("#daemonStatusDescription");
const toggleDaemon = document.querySelector("#toggleDaemon");
const toggleDaemonIcon = document.querySelector("#toggleDaemonIcon");
const toggleDaemonLabel = document.querySelector("#toggleDaemonLabel");
const restartDaemon = document.querySelector("#restartDaemon");
const daemonLastChecked = document.querySelector("#daemonLastChecked");
const daemonPollInterval = document.querySelector("#daemonPollInterval");
const daemonUploaderPath = document.querySelector("#daemonUploaderPath");
const daemonSettingsState = document.querySelector("#daemonSettingsState");
const saveDaemonSettings = document.querySelector("#saveDaemonSettings");
const themeToggle = document.querySelector("#themeToggle");
const themeMenu = document.querySelector("#themeMenu");
const accountToggle = document.querySelector("#accountToggle");
const accountFlyout = document.querySelector("#accountFlyout");
const accountTabs = [...document.querySelectorAll("[data-account-tab]")];
const accountPanels = [...document.querySelectorAll("[data-account-panel]")];
const accountBadge = accountToggle?.querySelector(".account-badge");
const manageAccountAction = document.querySelector("#manageAccountAction");
const refreshAccountAction = document.querySelector("#refreshAccountAction");
const signOutAction = document.querySelector("#signOutAction");
const addIntuneAccount = document.querySelector("#addIntuneAccount");
const intuneAccountRow = document.querySelector("#intuneAccountRow");
const intuneAccountEmpty = document.querySelector("#intuneAccountEmpty");
const removeIntuneAccount = document.querySelector("#removeIntuneAccount");
const removeIntuneAccountDialog = document.querySelector("#removeIntuneAccountDialog");
const closeRemoveIntuneAccountDialog = document.querySelector("#closeRemoveIntuneAccountDialog");
const cancelRemoveIntuneAccount = document.querySelector("#cancelRemoveIntuneAccount");
const confirmRemoveIntuneAccount = document.querySelector("#confirmRemoveIntuneAccount");
const statusFilterButton = document.querySelector("#statusFilter");
const desktop = document.querySelector("#desktop");
const appWindow = document.querySelector("#appWindow");
const titlebar = document.querySelector("#titlebar");
const minimizeWindow = document.querySelector("#minimizeWindow");
const maximizeWindow = document.querySelector("#maximizeWindow");
const closeWindow = document.querySelector("#closeWindow");
const packitLauncher = document.querySelector("#packitLauncher");
const launcherState = document.querySelector("#launcherState");
const detailAppIcon = document.querySelector("#detailAppIcon");
const detailAppName = document.querySelector("#detailAppName");
const detailAppPublisher = document.querySelector("#detailAppPublisher");
const versionList = document.querySelector("#versionList");
const versionEmptyNote = document.querySelector("#versionEmptyNote");
const appLevelNav = document.querySelector("#appLevelNav");
const versionTabs = document.querySelector("#versionTabs");
const configurationEmptyState = document.querySelector("#configurationEmptyState");
const applicationNameInput = document.querySelector("#applicationNameInput");
const applicationVendorInput = document.querySelector("#applicationVendorInput");
const applicationDescriptionInput = document.querySelector("#applicationDescriptionInput");
const automationTemplateDialogTitle = document.querySelector("#automationTemplateDialogTitle");
const automationTemplateDialogDescription = document.querySelector("#automationTemplateDialogDescription");

function composeVersionInformationArchitecture() {
  const installPanel = document.querySelector("#installPanel");
  const detectionPanel = document.querySelector("#detectionPanel");
  if (installPanel && detectionPanel) installPanel.append(detectionPanel);
}

composeVersionInformationArchitecture();
const defaultVersionListMarkup = versionList.innerHTML;
const defaultPackagePresentation = {
  productCode: document.querySelector("#productCode").textContent,
  architecture: document.querySelector("#packageArchitecture").textContent,
  sourceFolder: document.querySelector("#sourceFolderValue").textContent,
  resourceItems: document.querySelector("#resourceItemCount").textContent,
  resourceSize: document.querySelector("#resourceSize").textContent
};
let guidedAutomationEnabled = false;
let strategyEditMode = null;
let strategyHasApplicationOverride = false;
let appliedStrategyTemplateName = "Guided Intune Update";
let appliedStrategyTemplateVersion = "1.4";
let appliedStrategyTemplateApplications = 18;
let appliedStrategyTemplateId = "guided";
let versionConfigurationDirty = false;
let windowVisibilityState = "open";
let windowTransitionTimeout;
let selectedApplication = apps[0];
let initializingEmptyApplication = false;
let daemonRunning = true;

function captureStrategyConfiguration() {
  return {
    selects: Array.from(strategyConfigurationFields.querySelectorAll("select"), (select) => select.selectedIndex),
    checks: Array.from(strategyConfigurationFields.querySelectorAll("input[type='checkbox']"), (input) => input.checked)
  };
}

let strategyTemplateBaseline = captureStrategyConfiguration();

function restoreStrategyConfiguration(snapshot) {
  strategyConfigurationFields.querySelectorAll("select").forEach((select, index) => {
    select.selectedIndex = snapshot.selects[index] ?? 0;
  });
  strategyConfigurationFields.querySelectorAll("input[type='checkbox']").forEach((input, index) => {
    input.checked = snapshot.checks[index] ?? false;
  });
}

const commandSets = {};

function renderCommandIcon(command) {
  if (command.image) return `<img class="service-icon" src="${command.image}" alt="" />`;
  if (command.icon) return `<span class="fluent ${command.icon}"></span>`;
  return "";
}

function closeCommandOverflow({ restoreFocus = false } = {}) {
  const menu = contextCommandBar.querySelector(".command-overflow-menu:not([hidden])");
  if (!menu) return;
  const trigger = menu.closest(".command-overflow")?.querySelector(".command-overflow-trigger");
  menu.hidden = true;
  trigger?.setAttribute("aria-expanded", "false");
  if (restoreFocus) trigger?.focus();
}

const automationTemplates = {
  guided: { name: "Guided Intune Update", version: "1.4", applications: 18 },
  strict: { name: "Strict validation rollout", version: "2.2", applications: 7 },
  winget: { name: "WinGet standard update", version: "3.1", applications: 24 }
};

const contosoVersionAutomationRecords = {
  "12.3.123": { source: "12.3.122", template: "Local installer publication", templateVersion: "1.0", createdOn: "24 Sep 2026, 13:42", intune: "applied", mecm: "planned" },
  "12.3.122": { source: "12.3.121", template: "Local installer publication", templateVersion: "1.0", createdOn: "12 Sep 2026, 09:18", intune: "applied", mecm: "applied" },
  "12.3.121": { source: "12.3.120", template: "Local installer publication", templateVersion: "1.0", createdOn: "28 Aug 2026, 15:06", intune: "applied", mecm: "applied" },
  "12.3.120": { source: "12.3.119", template: "Local installer publication", templateVersion: "1.0", createdOn: "10 Aug 2026, 11:27", intune: "applied", mecm: "applied" },
  "12.3.119": { source: "12.3.118", template: "Local installer publication", templateVersion: "1.0", createdOn: "22 Jul 2026, 08:54", intune: "applied", mecm: "applied" }
};
let versionAutomationRecords = Object.fromEntries(Object.entries(contosoVersionAutomationRecords).map(([version, record]) => [version, { ...record }]));
let selectedVersion = "12.3.123";
const modifiedVersionRecords = new Set();
const versionChangeKinds = new Set();
const versionChangeProposals = new Map();
const applicationDetailStates = new Map();

function decrementVersion(version, amount) {
  const parts = String(version).split(".");
  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const value = Number(parts[index]);
    if (!Number.isInteger(value) || value < amount) continue;
    parts[index] = String(value - amount);
    for (let trailing = index + 1; trailing < parts.length; trailing += 1) parts[trailing] = "0";
    return parts.join(".");
  }
  return `${version}.${amount}`;
}

function publicationTargetsFor(app) {
  const status = getApplicationStatus(app);
  if (status.includes("Configuration") || status === "Not configured") return { intune: "configuration", mecm: "configuration" };
  if (status.includes("Upload to Intune failed")) return { intune: "failed", mecm: "planned" };
  if (status.includes("Upload to MECM failed")) return { intune: "applied", mecm: "failed" };
  if (status.includes("Intune and MECM")) return { intune: "applied", mecm: "applied" };
  if (status.includes("Published to MECM")) return { intune: "planned", mecm: "applied" };
  if (status.includes("Published to Intune")) return { intune: "applied", mecm: "planned" };
  return { intune: "planned", mecm: "planned" };
}

function detailStateFor(app) {
  if (app.name === "Contoso Finance Tools") return { records: contosoVersionAutomationRecords, selectedVersion: "12.3.123" };
  if (applicationDetailStates.has(app.name)) return applicationDetailStates.get(app.name);

  const latest = app.version === "-" ? "1.0.0" : app.version;
  const currentTargets = publicationTargetsFor(app);
  const workflow = {
    starter: { name: "Standard application update", version: "2.0" },
    "psadt-update": { name: "PSADT managed update", version: "1.0" },
    "local-publish": { name: "Local installer publication", version: "1.0" },
    "assignment-defaults": { name: "Intune assignment defaults", version: "1.0" }
  }[app.workflow] || null;
  const versions = [latest, decrementVersion(latest, 1), decrementVersion(latest, 2)];
  const records = Object.fromEntries(versions.map((version, index) => [version, {
    source: index === versions.length - 1 ? "Original package" : versions[index + 1],
    template: workflow?.name || "Local configuration",
    templateVersion: workflow?.version || "",
    createdOn: index ? "12 Sep 2026, 09:18" : "24 Sep 2026, 13:42",
    intune: index ? "applied" : currentTargets.intune,
    mecm: index ? "applied" : currentTargets.mecm
  }]));
  const state = { records, selectedVersion: versions[0] };
  applicationDetailStates.set(app.name, state);
  return state;
}

function versionPublicationLabel(record) {
  if (record.intune === "configuration" || record.mecm === "configuration") return "Configuration issues";
  if (record.intune === "failed") return "Upload to Intune failed";
  if (record.mecm === "failed") return "Upload to MECM failed";
  if (record.intune === "applied" && record.mecm === "applied") return "Published to Intune and MECM";
  if (record.intune === "applied") return "Published to Intune";
  if (record.mecm === "applied") return "Published to MECM";
  return "Ready to publish";
}

function compactVersionPublicationLabel(record) {
  if (record.intune === "configuration" || record.mecm === "configuration") return "Issues";
  if (record.intune === "failed") return "Intune failed";
  if (record.mecm === "failed") return "MECM failed";
  if (record.intune === "applied" && record.mecm === "applied") return "Intune + MECM";
  if (record.intune === "applied") return "Intune";
  if (record.mecm === "applied") return "MECM";
  return "Ready";
}

function versionPublicationClass(record) {
  if (record.intune === "failed" || record.mecm === "failed") return "failed";
  if (record.intune === "configuration" || record.mecm === "configuration") return "issue";
  if (record.intune === "applied" || record.mecm === "applied") return "success";
  return "";
}

function versionStatusPresentation(version, record = getVersionRecord(version)) {
  if (version === selectedVersion && versionConfigurationDirty) {
    return { key: "unsaved", full: "Unsaved configuration changes", compact: "Unsaved", tone: "issue", icon: "icon-edit" };
  }
  const proposal = versionChangeProposals.get(version);
  if (proposal?.kind === "deployment") {
    return { key: "deployment-change", full: "Deployment change", compact: "Changed", tone: "issue", icon: "icon-edit" };
  }
  if (proposal) {
    return { key: "version-draft", full: "New version draft", compact: "Draft", tone: "issue", icon: "icon-edit" };
  }
  const full = versionPublicationLabel(record);
  return {
    key: record.intune === "configuration" || record.mecm === "configuration" ? "configuration-issues"
      : record.intune === "failed" ? "intune-failed"
      : record.mecm === "failed" ? "mecm-failed"
      : record.intune === "applied" && record.mecm === "applied" ? "published-intune-mecm"
      : record.intune === "applied" ? "published-intune"
      : record.mecm === "applied" ? "published-mecm"
      : "ready",
    full,
    compact: compactVersionPublicationLabel(record),
    tone: versionPublicationClass(record),
    icon: full.includes("failed") ? "icon-dismiss" : full === "Configuration issues" ? "icon-warning" : full === "Ready to publish" ? "icon-arrow-up" : "icon-check"
  };
}

function renderVersionList(records, activeVersion) {
  versionList.innerHTML = Object.entries(records).map(([version, record]) => {
    const active = version === activeVersion;
    const status = versionStatusPresentation(version, record);
    return `<button class="version ${active ? "active" : ""}" type="button" ${active ? 'aria-current="page"' : ""} data-version="${version}" aria-label="Version ${version}, ${status.full}"><span class="version-number">${version}</span><span class="status ${status.tone}" data-status-key="${status.key}" title="${status.full}"><span class="fluent ${status.icon}"></span> ${status.compact}</span></button>`;
  }).join("");
}

function selectDetailApplicationState(app) {
  const state = detailStateFor(app);
  versionAutomationRecords = state.records;
  selectedVersion = state.selectedVersion;
  modifiedVersionRecords.clear();
  versionChangeKinds.clear();
  versionChangeProposals.clear();
  renderVersionList(versionAutomationRecords, selectedVersion);
  bindVersionButtons();
}

function getVersionRecord(version = selectedVersion) {
  return versionAutomationRecords[version] || Object.values(versionAutomationRecords)[0];
}

function syncReviewPendingChange(version = selectedVersion) {
  const proposal = versionChangeProposals.get(version);
  reviewPendingChange.hidden = !proposal;
  if (!proposal) return;
  const deploymentOnly = proposal.kind === "deployment";
  reviewPendingChangeTitle.textContent = deploymentOnly ? "Deployment change ready for review" : "New version draft ready for review";
  reviewPendingChangeDescription.textContent = deploymentOnly
    ? "Assignments, scope tags, or return codes changed. Review the target change before it is sent to a published platform object."
    : "Package configuration changed. The published version remains unchanged; prepare and publish a new version after review.";
}

function syncReviewTabLabel(record = getVersionRecord(), proposal = versionChangeProposals.get(selectedVersion)) {
  let label = "Publish";
  if (proposal) label = "Review change";
  else if (selectedVersion !== "draft" && (record.intune === "applied" || record.mecm === "applied")) label = "Publication record";
  reviewTab.innerHTML = `<span class="fluent ${label === "Publication record" ? "icon-history" : "icon-check"}"></span> ${label}`;
}

function syncVersionPublicationUI({ rerenderCommands = true } = {}) {
  const record = getVersionRecord();
  const proposal = versionChangeProposals.get(selectedVersion);
  const versionButton = document.querySelector(`.version[data-version="${selectedVersion}"]`);
  const versionStatus = versionButton?.querySelector(":scope > span:last-child");
  const status = versionStatusPresentation(selectedVersion, record);

  if (versionStatus) {
    versionStatus.className = `status ${status.tone}`;
    versionStatus.dataset.statusKey = status.key;
    versionStatus.title = status.full;
    versionStatus.innerHTML = `<span class="fluent ${status.icon}"></span> ${status.compact}`;
    versionButton.setAttribute("aria-label", `Version ${selectedVersion}, ${status.full}`);
  }

  commandStatus.hidden = false;
  commandStatus.className = `new-label status ${status.tone}`;
  commandStatus.dataset.statusKey = status.key;
  commandStatus.title = status.full;
  commandStatus.innerHTML = `<span class="fluent ${status.icon}"></span> ${status.full}`;
  syncReviewPendingChange();
  syncReviewTabLabel(record, proposal);
  if (rerenderCommands && contextCommandBar.dataset.commandContext === "version" && !versionConfigurationDirty) renderContextCommands("version");
}

function recordVersionChangeProposal(version = selectedVersion, kinds = versionChangeKinds) {
  if (!version || !kinds.size) return;
  const kind = [...kinds].every((item) => item === "deployment") ? "deployment" : "version";
  versionChangeProposals.set(version, { kind });
  versionChangeKinds.clear();
  syncVersionPublicationUI();
}

window.addEventListener("packit:version-inputs-saved", (event) => {
  recordVersionChangeProposal(event.detail?.version);
});

window.addEventListener("packit:version-exception-saved", (event) => {
  const { version, kind } = event.detail || {};
  if (!version) return;
  recordVersionChangeProposal(version, new Set([kind || "version"]));
});

function renderDeploymentTargetStatus(article, status) {
  const state = article.querySelector("header > .status");
  const statusMap = {
    applied: { label: "Published", tone: "success", icon: "icon-check" },
    failed: { label: "Upload failed", tone: "failed", icon: "icon-dismiss" },
    configuration: { label: "Configuration issues", tone: "issue", icon: "icon-warning" },
    planned: { label: "Not published", tone: "", icon: "icon-history" }
  };
  const presentation = statusMap[status] || statusMap.planned;
  state.className = `status ${presentation.tone}`;
  state.innerHTML = `<span class="fluent ${presentation.icon}"></span> ${presentation.label}`;
  const execution = article.querySelector("dl > div:last-child dd");
  const target = article.querySelector("header strong")?.textContent;
  if (target === "MECM") execution.textContent = status === "applied" ? "Completed" : status === "failed" ? "Upload failed" : status === "configuration" ? "Blocked by configuration" : "Waiting for MECM publication";
  if (target === "Intune") execution.textContent = status === "applied" ? "Completed" : status === "failed" ? "Upload failed" : status === "configuration" ? "Blocked by configuration" : "Waiting for Intune publication";
}

function syncVersionAutomationRecord(version = selectedVersion) {
  selectedVersion = version;
  window.packitDeployment.select(selectedApplication.name, version);
  const record = getVersionRecord(version);
  versionAutomationRecordTitle.textContent = `Automation record for version ${version}`;
  provenanceSourceVersion.textContent = record.source;
  provenanceTemplate.textContent = `${record.template} v${record.templateVersion}`;
  provenanceCreatedOn.textContent = record.createdOn;
  snapshotSourceVersion.textContent = record.source;
  document.querySelectorAll(".previous-version-value").forEach((value) => { value.textContent = record.source; });
  packageVersionInput.value = version;
  commandContextMeta.textContent = `Version ${version}`;
  const targets = document.querySelectorAll(".deployment-handling-target");
  renderDeploymentTargetStatus(targets[0], record.intune);
  renderDeploymentTargetStatus(targets[1], record.mecm);
  provenanceConfigurationState.innerHTML = modifiedVersionRecords.has(version)
    ? `<span class="status issue"><span class="fluent icon-copy"></span> Modified after creation</span>`
    : `<span class="status success"><span class="fluent icon-check"></span> Unchanged since creation</span>`;
  if (!versionConfigurationDirty) lastSavedVersionConfiguration = captureVersionConfiguration();
  window.packitPolicyUI?.selectVersion();
  syncAppliedTemplateUI({ rerenderCommands: false });
  syncVersionPublicationUI();
}

function selectAutomationTemplate(templateId = appliedStrategyTemplateId, { focus = false } = {}) {
  const template = automationTemplates[templateId] || automationTemplates.guided;
  let selectedRow = document.querySelector(`[data-template-id="${templateId}"]`);
  if (!selectedRow && automationTemplates[templateId]) {
    const list = document.querySelector("#workflowsAutomationPanel .workflow-list");
    if (list) {
      list.insertAdjacentHTML("beforeend", `
        <button class="workflow-row" type="button" role="option" aria-selected="false" data-template-id="${templateId}">
          <span><strong>${template.name}</strong><small>v${template.version} • Used by ${template.applications} application${template.applications === 1 ? "" : "s"}</small></span>
          <span class="status success"><span class="fluent icon-check"></span> Active</span>
        </button>
      `);
      selectedRow = list.lastElementChild;
      selectedRow.addEventListener("click", () => selectAutomationTemplate(templateId));
    }
  }
  document.querySelectorAll("[data-template-id]").forEach((row) => {
    const active = row.dataset.templateId === templateId;
    row.classList.toggle("active", active);
    row.setAttribute("aria-selected", String(active));
    if (active && focus) row.focus();
  });
  if (automationEditorTemplateName) automationEditorTemplateName.textContent = template.name;
  if (automationEditorTemplateMeta) automationEditorTemplateMeta.textContent = `Version ${template.version} • Used by ${template.applications} application${template.applications === 1 ? "" : "s"}`;
  window.dispatchEvent(new CustomEvent("packit:workflow-selected", { detail: { workflowId: templateId } }));
}

function manageCurrentAutomationTemplate() {
  if (window.packitPolicyUI) return window.packitPolicyUI.manageWorkflow(selectedVersion);
  showWorkspaceView("automation");
  setAutomationTab("workflows");
  selectAutomationTemplate(appliedStrategyTemplateId, { focus: true });
}

function getVersionManagedControls() {
  return [...document.querySelectorAll(".tab-panel input, .tab-panel select, .tab-panel textarea")]
    .filter(control => !control.closest('#deploymentPanel') && control !== packageVersionInput);
}

function captureVersionConfiguration() {
  return {
    controls: getVersionManagedControls().map((control) => ({
      value: control.value,
      checked: control.checked
    })),
    wrapperConfigured: !wrapperConfiguredState.hidden,
    wrapperTemplate: activePsadtTemplate ? { ...activePsadtTemplate } : null,
    deployment: window.packitDeployment.capture()
  };
}

function restoreVersionConfiguration(snapshot) {
  window.packitDeployment.restore(snapshot.deployment);
  getVersionManagedControls().forEach((control, index) => {
    const stored = snapshot.controls[index];
    if (!stored) return;
    control.value = stored.value;
    if (control.type === "checkbox" || control.type === "radio") control.checked = stored.checked;
  });
  wrapperConfiguredState.hidden = !snapshot.wrapperConfigured;
  activePsadtTemplate = snapshot.wrapperTemplate
    ? { ...snapshot.wrapperTemplate }
    : snapshot.wrapperConfigured
      ? getDefaultPsadtTemplate()
      : null;
  syncInstallationMethod();
}

const automationTemplateSnapshots = {
  guided: captureVersionConfiguration()
};
let versionTemplateBaseline = automationTemplateSnapshots.guided;
let lastSavedVersionConfiguration = captureVersionConfiguration();

function incrementTemplateVersion(version) {
  const parts = String(version).split(".");
  const last = Number(parts.pop());
  parts.push(String(Number.isFinite(last) ? last + 1 : 1));
  return parts.join(".");
}

function renderAppliedTemplateControl() {
  if (!appliedStrategyTemplateId) {
    commandInlineControls.replaceChildren();
    return;
  }
  commandInlineControls.innerHTML = `
    <button class="applied-template-command" type="button" aria-haspopup="dialog" title="${versionConfigurationDirty ? "Save or cancel changes before changing the workflow" : "Change automation workflow"}" ${versionConfigurationDirty ? "disabled" : ""}>
      <span class="fluent icon-workflow" aria-hidden="true"></span>
      <span>
        <small>Automation workflow</small>
        <strong>${appliedStrategyTemplateName}</strong>
      </span>
      <span class="fluent icon-chevron-down" aria-hidden="true"></span>
    </button>
  `;
  commandInlineControls.querySelector(".applied-template-command")?.addEventListener("click", openAutomationTemplateDialog);
}

function syncAppliedTemplateUI({ rerenderCommands = true } = {}) {
  window.packitPolicyUI?.syncLabels();
  const hasWorkflow = Boolean(appliedStrategyTemplateId);
  informationTemplateName.textContent = appliedStrategyTemplateName;
  informationTemplateMeta.textContent = hasWorkflow
    ? `Version ${appliedStrategyTemplateVersion} • Used by ${appliedStrategyTemplateApplications} application${appliedStrategyTemplateApplications === 1 ? "" : "s"}`
    : "Locally configured version";
  automationTemplateSummary.hidden = !hasWorkflow;
  const reviewConfigurationSource = document.querySelector("#reviewConfigurationSource");

  if (versionConfigurationDirty) {
    informationTemplateState.innerHTML = `<span class="fluent icon-warning"></span> Unsaved configuration changes`;
  } else if (!hasWorkflow) {
    informationTemplateState.innerHTML = `<span class="fluent icon-settings"></span> Local configuration`;
  } else if (strategyHasApplicationOverride) {
    informationTemplateState.innerHTML = `<span class="fluent icon-copy"></span> Application override`;
  } else {
    informationTemplateState.innerHTML = `<span class="fluent icon-lock"></span> Inherited from workflow`;
  }

  if (reviewConfigurationSource) {
    if (versionConfigurationDirty) {
      reviewConfigurationSource.innerHTML = `<span class="fluent icon-warning"></span> Local changes pending`;
    } else if (strategyHasApplicationOverride) {
      reviewConfigurationSource.innerHTML = `<span class="fluent icon-copy"></span> Application override`;
    } else if (!hasWorkflow) {
      reviewConfigurationSource.innerHTML = `<span class="fluent icon-settings"></span> Local configuration`;
    } else {
      reviewConfigurationSource.innerHTML = `<span class="fluent icon-lock"></span> ${appliedStrategyTemplateName} v${appliedStrategyTemplateVersion}`;
    }
  }

  provenanceConfigurationState.innerHTML = modifiedVersionRecords.has(selectedVersion)
    ? `<span class="status issue"><span class="fluent icon-copy"></span> Modified after creation</span>`
    : `<span class="status success"><span class="fluent icon-check"></span> Unchanged since creation</span>`;

  changeAutomationTemplate.disabled = versionConfigurationDirty;
  if (contextCommandBar.dataset.commandContext === "version") {
    renderAppliedTemplateControl();
    syncVersionPublicationUI({ rerenderCommands: false });
    if (rerenderCommands) renderContextCommands("version");
  }
}

function markVersionConfigurationDirty(kind = "version") {
  versionChangeKinds.add(kind);
  if (versionConfigurationDirty) return;
  versionConfigurationDirty = true;
  syncAppliedTemplateUI();
}

function cancelVersionConfigurationEdits() {
  window.packitPolicyUI?.cancelPending();
  restoreVersionConfiguration(lastSavedVersionConfiguration);
  versionConfigurationDirty = false;
  versionChangeKinds.clear();
  syncAppliedTemplateUI();
  showToast("Configuration changes canceled");
}

function openSaveConfigurationDialog() {
  if (window.packitPolicyUI) return window.packitPolicyUI.saveVersionInputs();
  if (!window.packitDeployment.validate()) return;
  const defaultScope = saveConfigurationDialog.querySelector("input[value='application']");
  defaultScope.checked = true;
  newConfigurationTemplateNameField.hidden = true;
  sharedTemplateImpact.hidden = true;
  saveConfigurationDialog.querySelector(".shared-template-option small").textContent = `Replace ${appliedStrategyTemplateName} with this configuration.`;
  sharedTemplateImpact.querySelector("strong").textContent = `${appliedStrategyTemplateApplications} applications use this workflow.`;
  confirmSaveConfiguration.innerHTML = `<span class="fluent icon-check"></span> Save application override`;
  saveConfigurationDialog.showModal();
}

function syncSaveConfigurationDialog() {
  const scope = saveConfigurationDialog.querySelector("input[name='configuration-save-scope']:checked")?.value || "application";
  newConfigurationTemplateNameField.hidden = scope !== "new";
  sharedTemplateImpact.hidden = scope !== "template";
  const labels = {
    application: "Save application override",
    new: "Create and apply workflow",
    template: `Update workflow for ${appliedStrategyTemplateApplications} apps`
  };
  confirmSaveConfiguration.innerHTML = `<span class="fluent icon-check"></span> ${labels[scope]}`;
  if (scope === "new") newConfigurationTemplateName.focus();
}

function saveVersionConfiguration() {
  if (!window.packitDeployment.validate()) return;
  const scope = saveConfigurationDialog.querySelector("input[name='configuration-save-scope']:checked")?.value || "application";
  if (scope === "new" && !newConfigurationTemplateName.value.trim()) {
    newConfigurationTemplateName.setCustomValidity("Enter a workflow name");
    newConfigurationTemplateName.reportValidity();
    return;
  }

  if (scope === "application") {
    strategyHasApplicationOverride = true;
    lastSavedVersionConfiguration = captureVersionConfiguration();
    showToast("Application override saved");
  } else if (scope === "new") {
    appliedStrategyTemplateId = `custom-${Date.now()}`;
    appliedStrategyTemplateName = newConfigurationTemplateName.value.trim();
    appliedStrategyTemplateVersion = "1.0";
    appliedStrategyTemplateApplications = 1;
    automationTemplates[appliedStrategyTemplateId] = {
      name: appliedStrategyTemplateName,
      version: appliedStrategyTemplateVersion,
      applications: appliedStrategyTemplateApplications
    };
    versionTemplateBaseline = captureVersionConfiguration();
    automationTemplateSnapshots[appliedStrategyTemplateId] = versionTemplateBaseline;
    lastSavedVersionConfiguration = captureVersionConfiguration();
    strategyHasApplicationOverride = false;
    showToast(`${appliedStrategyTemplateName} created and applied`);
  } else {
    versionTemplateBaseline = captureVersionConfiguration();
    automationTemplateSnapshots[appliedStrategyTemplateId] = versionTemplateBaseline;
    lastSavedVersionConfiguration = captureVersionConfiguration();
    appliedStrategyTemplateVersion = incrementTemplateVersion(appliedStrategyTemplateVersion);
    if (automationTemplates[appliedStrategyTemplateId]) automationTemplates[appliedStrategyTemplateId].version = appliedStrategyTemplateVersion;
    strategyHasApplicationOverride = false;
    showToast(`${appliedStrategyTemplateName} updated for ${appliedStrategyTemplateApplications} applications`);
  }

  window.packitDeployment.commit();
  versionConfigurationDirty = false;
  recordVersionChangeProposal();
  modifiedVersionRecords.add(selectedVersion);
  saveConfigurationDialog.close();
  syncAppliedTemplateUI();
}

function buildTemplateSnapshot(templateId) {
  if (automationTemplateSnapshots[templateId]) return automationTemplateSnapshots[templateId];
  restoreVersionConfiguration(automationTemplateSnapshots.guided);
  const detectionArchitecture = document.querySelector("#detectionPanel .form-grid.two select");
  const minimumOperatingSystem = document.querySelector("#detectionPanel .form-grid.two input");
  const detectionMethod = document.querySelector("#detectionPanel .form-grid.single select");

  if (templateId === "strict") {
    detectionArchitecture.selectedIndex = 0;
    minimumOperatingSystem.value = "Windows 11 22H2";
    detectionMethod.selectedIndex = 1;
    wrapperConfiguredState.hidden = false;
    activePsadtTemplate = getDefaultPsadtTemplate();
  } else if (templateId === "winget") {
    detectionArchitecture.selectedIndex = 0;
    minimumOperatingSystem.value = "Windows 10 1809";
    detectionMethod.selectedIndex = 0;
    wrapperConfiguredState.hidden = true;
    activePsadtTemplate = null;
  }

  automationTemplateSnapshots[templateId] = captureVersionConfiguration();
  return automationTemplateSnapshots[templateId];
}

function setInfoBarCopy(infoBar, title, message) {
  const content = infoBar.querySelector(".wui-info-bar-content");
  content.querySelector("strong").textContent = title;
  content.querySelector("small").textContent = message;
}

function openAutomationTemplateDialog() {
  if (window.packitPolicyUI) return window.packitPolicyUI.changeWorkflow(selectedVersion);
  initializingEmptyApplication = false;
  automationTemplateDialogTitle.textContent = "Change automation workflow";
  automationTemplateDialogDescription.textContent = "Replacing the workflow resets its managed configuration for this application.";
  automationTemplateDialog.querySelectorAll("input[name='automation-template']").forEach((input) => {
    input.checked = input.value === appliedStrategyTemplateId;
  });
  setInfoBarCopy(
    replaceTemplateImpact,
    versionConfigurationDirty || strategyHasApplicationOverride ? "Current changes will be discarded" : "Inherited settings will be replaced",
    versionConfigurationDirty || strategyHasApplicationOverride
      ? "Applying another workflow discards unsaved changes or the current application override and replaces all workflow-managed defaults."
      : "Package, deployment, detection, scope tag, and wrapper defaults will use the selected workflow."
  );
  automationTemplateDialog.showModal();
}

function openInitialAutomationTemplateDialog() {
  if (window.packitPolicyUI) return window.packitPolicyUI.assignWorkflow(true);
  initializingEmptyApplication = true;
  automationTemplateDialogTitle.textContent = "Apply automation workflow";
  automationTemplateDialogDescription.textContent = `Choose the managed defaults for ${selectedApplication.name}.`;
  automationTemplateDialog.querySelectorAll("input[name='automation-template']").forEach((input) => {
    input.checked = input.value === "guided";
  });
  setInfoBarCopy(
    replaceTemplateImpact,
    "The first version will use workflow defaults",
    "The selected workflow creates the first version and populates its managed package and deployment settings."
  );
  automationTemplateDialog.showModal();
}

function applyAutomationTemplate() {
  const templateId = automationTemplateDialog.querySelector("input[name='automation-template']:checked")?.value;
  if (!templateId || (!initializingEmptyApplication && templateId === appliedStrategyTemplateId)) {
    automationTemplateDialog.close();
    return;
  }

  const template = automationTemplates[templateId];
  appliedStrategyTemplateId = templateId;
  appliedStrategyTemplateName = template.name;
  appliedStrategyTemplateVersion = template.version;
  appliedStrategyTemplateApplications = template.applications;
  versionTemplateBaseline = buildTemplateSnapshot(templateId);
  restoreVersionConfiguration(versionTemplateBaseline);
  lastSavedVersionConfiguration = captureVersionConfiguration();
  versionConfigurationDirty = false;
  modifiedVersionRecords.add(selectedVersion);
  strategyHasApplicationOverride = false;
  automationTemplateDialog.close();
  syncAppliedTemplateUI();
  if (initializingEmptyApplication) {
    initializingEmptyApplication = false;
    initializeEmptyApplication("template");
    showToast(`${appliedStrategyTemplateName} applied to ${selectedApplication.name}`);
    return;
  }
  showToast(`${appliedStrategyTemplateName} applied`);
}

function syncStrategyTemplateUI() {
  const editing = Boolean(strategyEditMode);
  strategyConfigurationFields.disabled = !editing;
  strategyTemplateName.textContent = appliedStrategyTemplateName;
  strategyTemplateMeta.textContent = `Managed in Automation • v${appliedStrategyTemplateVersion}`;
  editStrategyConfiguration.innerHTML = `<span class="fluent icon-settings"></span> ${editing ? "Change edit scope" : "Edit configuration"}`;

  if (strategyEditMode === "application") {
    strategyTemplateState.innerHTML = `<span class="fluent icon-copy"></span> Editing application override`;
    strategyEditScopeTitle.textContent = "Application override";
    strategyEditScopeDescription.textContent = `Changes will apply only to Contoso Finance Tools. ${appliedStrategyTemplateName} remains unchanged.`;
  } else if (strategyEditMode === "template") {
    strategyTemplateState.innerHTML = `<span class="fluent icon-warning"></span> Editing shared workflow`;
    strategyEditScopeTitle.textContent = `Shared workflow: ${appliedStrategyTemplateName}`;
    strategyEditScopeDescription.textContent = "Saving can affect every application that uses this workflow.";
  } else if (strategyEditMode === "new") {
    const draftName = newStrategyTemplateName.value.trim() || "Untitled update strategy";
    strategyTemplateState.innerHTML = `<span class="fluent icon-add"></span> Creating new workflow`;
    strategyEditScopeTitle.textContent = `New workflow draft: ${draftName}`;
    strategyEditScopeDescription.textContent = "The current configuration will be copied into Automation and applied to this application.";
  } else if (strategyHasApplicationOverride) {
    strategyTemplateState.innerHTML = `<span class="fluent icon-copy"></span> Application override • Saved`;
    strategyEditScopeTitle.textContent = "Application override active";
    strategyEditScopeDescription.textContent = `This application differs from ${appliedStrategyTemplateName}. Reset to remove the override.`;
  } else {
    strategyTemplateState.innerHTML = `<span class="fluent icon-lock"></span> Inherited • No local changes`;
  }

  strategyTemplateEditBar.hidden = !editing && !strategyHasApplicationOverride;
  if (contextCommandBar.dataset.commandContext === "updateStrategy") renderContextCommands("updateStrategy");
}

function openStrategyEditDialog() {
  const selectedMode = strategyEditMode || "application";
  strategyEditDialog.querySelectorAll("input[name='strategy-edit-scope']").forEach((input) => {
    input.checked = input.value === selectedMode;
  });
  newStrategyTemplateNameField.hidden = selectedMode !== "new";
  strategyEditDialog.showModal();
}

function setStrategyEditMode(mode) {
  strategyEditMode = mode;
  syncStrategyTemplateUI();
  strategyConfigurationFields.querySelector("select, input")?.focus();
}

function saveStrategyConfiguration() {
  if (!strategyEditMode) return;

  if (strategyEditMode === "application") {
    strategyHasApplicationOverride = true;
    showToast("Application override saved");
  } else if (strategyEditMode === "template") {
    strategyTemplateBaseline = captureStrategyConfiguration();
    strategyHasApplicationOverride = false;
    appliedStrategyTemplateVersion = "1.5";
    showToast(`${appliedStrategyTemplateName} updated`);
  } else {
    const templateName = newStrategyTemplateName.value.trim();
    if (!templateName) {
      openStrategyEditDialog();
      newStrategyTemplateNameField.hidden = false;
      newStrategyTemplateName.focus();
      return;
    }
    appliedStrategyTemplateName = templateName;
    appliedStrategyTemplateVersion = "1.0";
    strategyTemplateBaseline = captureStrategyConfiguration();
    strategyHasApplicationOverride = false;
    showToast(`${templateName} created and applied`);
  }

  strategyEditMode = null;
  syncStrategyTemplateUI();
}

function resetToAppliedStrategyTemplate() {
  restoreStrategyConfiguration(strategyTemplateBaseline);
  strategyEditMode = null;
  strategyHasApplicationOverride = false;
  syncStrategyTemplateUI();
  showToast(`Reset to ${appliedStrategyTemplateName}`);
}

function renderAutomationToggle() {
  commandInlineControls.innerHTML = `
    <label class="automation-toggle">
      <input type="checkbox" ${guidedAutomationEnabled ? "checked" : ""} />
      <span class="toggle-track" aria-hidden="true"></span>
      <span>Guided Automation Mode</span>
    </label>
  `;
  commandInlineControls.querySelector(".automation-toggle input")?.addEventListener("change", (event) => {
    setGuidedAutomationEnabled(event.currentTarget.checked);
  });
}

function getVersionCommands() {
  const record = getVersionRecord();
  const proposal = versionChangeProposals.get(selectedVersion);
  if (proposal) {
    return [
      { label: proposal.kind === "deployment" ? "Review deployment change" : "Review new version draft", icon: "icon-eye", action: "review-pending-change", primary: true },
      { label: "View publication record", icon: "icon-history", action: "view-publication", secondary: true }
    ];
  }

  if (record.intune === "configuration" || record.mecm === "configuration") {
    return [{ label: "Review configuration", icon: "icon-warning", action: "review-configuration", primary: true }];
  }

  const commands = [];
  if (record.intune !== "applied") commands.push({ label: record.intune === "failed" ? "Retry Intune upload" : "Upload to Intune", image: "./assets/figma/icon-intune.png", action: "upload-intune", primary: true });
  if (record.mecm !== "applied") commands.push({ label: record.mecm === "failed" ? "Retry MECM upload" : "Upload to MECM", image: "./assets/figma/icon-sccm.png", action: "upload-mecm", primary: true });
  if (record.intune === "applied" || record.mecm === "applied") commands.unshift({ label: "View publication record", icon: "icon-history", action: "view-publication" });
  if (record.intune === "applied") commands.push({ label: "Reconcile with Intune", icon: "icon-refresh", action: "reconcile-intune", secondary: true });
  if (record.mecm === "applied") commands.push({ label: "Reconcile with MECM", icon: "icon-refresh", action: "reconcile-mecm", secondary: true });
  return commands;
}

function handleVersionCommand(command) {
  const record = getVersionRecord();
  if (command.action === "review-configuration") {
    setTab("overview");
    showToast("Resolve the package configuration before publishing this version.", "warning");
    return;
  }
  if (command.action === "view-publication") {
    setTab("review");
    requestAnimationFrame(() => versionAutomationRecord.focus({ preventScroll: false }));
    return;
  }
  if (command.action === "review-pending-change") {
    setTab("review");
    requestAnimationFrame(() => reviewPendingChange.focus({ preventScroll: false }));
    return;
  }
  if (command.action === "upload-intune" || command.action === "upload-mecm") {
    if (window.packitPolicyUI && !window.packitPolicyUI.validateVersionInputs()) return;
    const target = command.action.endsWith("intune") ? "intune" : "mecm";
    record[target] = "applied";
    syncVersionAutomationRecord(selectedVersion);
    syncVersionPublicationUI();
    showToast(`Version ${selectedVersion} published to ${target === "intune" ? "Intune" : "MECM"}`);
    return;
  }
  if (command.action?.startsWith("reconcile-")) {
    const target = command.action.endsWith("intune") ? "Intune" : "MECM";
    showToast(`${target} was reconciled. No target drift was found.`);
  }
}

function renderContextCommands(context = "version") {
  if (context === "updateStrategy") {
    const strategySaveLabels = {
      application: "Save application override",
      template: "Update shared workflow",
      new: "Create and apply workflow"
    };
    contextCommandBar.dataset.commandContext = context;
    contextCommandBar.innerHTML = `
      ${guidedAutomationEnabled ? "" : `
        <button type="button" data-command-action="manual-update">
          <span class="fluent icon-download"></span>
          <span>Manual Update</span>
        </button>
      `}
      ${guidedAutomationEnabled && strategyEditMode ? `
        <button class="primary-btn" type="button" data-command-action="save-update-strategy">
          <span class="fluent icon-check"></span>
          <span>${strategySaveLabels[strategyEditMode]}</span>
        </button>
      ` : ""}
    `;

    const manualUpdate = contextCommandBar.querySelector("[data-command-action='manual-update']");
    manualUpdate?.addEventListener("click", () => showToast("Manual update started"));
    contextCommandBar.querySelector("[data-command-action='save-update-strategy']")?.addEventListener("click", saveStrategyConfiguration);
    return;
  }

  if (context === "version" && versionConfigurationDirty) {
    contextCommandBar.dataset.commandContext = context;
    contextCommandBar.innerHTML = `
      <button type="button" data-configuration-action="cancel">
        <span>Cancel</span>
      </button>
      <button class="primary-btn" type="button" data-configuration-action="save">
        <span class="fluent icon-check"></span>
        <span>Save configuration</span>
      </button>
    `;
    contextCommandBar.querySelector("[data-configuration-action='cancel']")?.addEventListener("click", cancelVersionConfigurationEdits);
    contextCommandBar.querySelector("[data-configuration-action='save']")?.addEventListener("click", openSaveConfigurationDialog);
    return;
  }

  const commands = context === "version" ? getVersionCommands() : commandSets[context] || [];
  const primaryCommands = commands.filter((command) => !command.secondary);
  const secondaryCommands = commands.filter((command) => command.secondary);
  contextCommandBar.dataset.commandContext = context;
  contextCommandBar.innerHTML = `
    ${primaryCommands.map((command, index) => `
    <button type="button" data-primary-command="${index}" ${command.iconOnly ? `aria-label="${command.label}"` : ""}>
      ${renderCommandIcon(command)}
      ${command.iconOnly ? "" : `<span>${command.label}</span>`}
      ${command.meta ? `<small>${command.meta}</small>` : ""}
      ${command.endIcon ? `<span class="fluent ${command.endIcon}"></span>` : ""}
    </button>
    `).join("")}
    ${secondaryCommands.length ? `
      <div class="command-overflow">
        <button class="command-overflow-trigger" type="button" aria-label="More actions" title="More actions" aria-haspopup="menu" aria-expanded="false">
          <span class="fluent icon-more" aria-hidden="true"></span>
        </button>
        <div class="command-overflow-menu" role="menu" aria-label="More actions" hidden>
          ${secondaryCommands.map((command, index) => `
            <button type="button" role="menuitem" data-secondary-command="${index}" tabindex="-1">
              ${renderCommandIcon(command)}
              <span class="command-overflow-label">
                <span>${command.label}</span>
                ${command.meta ? `<small>${command.meta}</small>` : ""}
              </span>
            </button>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;

  contextCommandBar.querySelectorAll("[data-primary-command]").forEach((button) => {
    const command = primaryCommands[Number(button.dataset.primaryCommand)];
    button.addEventListener("click", () => context === "version" ? handleVersionCommand(command) : showToast(command.label));
  });

  const overflow = contextCommandBar.querySelector(".command-overflow");
  const overflowTrigger = overflow?.querySelector(".command-overflow-trigger");
  const overflowMenu = overflow?.querySelector(".command-overflow-menu");
  const overflowItems = [...(overflowMenu?.querySelectorAll("[role='menuitem']") || [])];

  overflowTrigger?.addEventListener("click", () => {
    const opening = overflowMenu.hidden;
    overflowMenu.hidden = !opening;
    overflowTrigger.setAttribute("aria-expanded", String(opening));
    if (opening) overflowItems[0]?.focus();
  });

  overflowItems.forEach((button) => {
    button.addEventListener("click", () => {
      const command = secondaryCommands[Number(button.dataset.secondaryCommand)];
      closeCommandOverflow();
      if (context === "version") handleVersionCommand(command);
      else showToast(command.label);
    });
  });

  overflowMenu?.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = overflowItems.indexOf(document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % overflowItems.length;
    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + overflowItems.length) % overflowItems.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = overflowItems.length - 1;
    overflowItems[nextIndex]?.focus();
  });
}

function setCommandContext(context = "version") {
  if (context === "emptyApplication") {
    commandContextMeta.hidden = false;
    commandContextMeta.textContent = "Not configured";
    commandStatus.hidden = true;
    commandInlineControls.innerHTML = "";
    contextCommandBar.dataset.commandContext = context;
    contextCommandBar.innerHTML = "";
    return;
  }

  if (context === "draftConfiguration") {
    commandContextMeta.hidden = false;
    commandContextMeta.textContent = "New version";
    commandStatus.hidden = false;
    commandStatus.className = "new-label status issue";
    commandStatus.textContent = "Draft";
    commandInlineControls.innerHTML = "";
    contextCommandBar.dataset.commandContext = context;
    contextCommandBar.innerHTML = `
      <button type="button" data-draft-action="cancel">Cancel</button>
      <button class="primary-btn" type="button" data-draft-action="save"><span class="fluent icon-check"></span> Save configuration</button>
    `;
    contextCommandBar.querySelector("[data-draft-action='cancel']")?.addEventListener("click", cancelInitialConfiguration);
    contextCommandBar.querySelector("[data-draft-action='save']")?.addEventListener("click", () => {
      if (window.packitPolicyUI) return window.packitPolicyUI.saveVersionInputs();
      if (!window.packitDeployment.validate()) return;
      window.packitDeployment.commit();
      lastSavedVersionConfiguration = captureVersionConfiguration();
      versionConfigurationDirty = false;
      showToast("Draft configuration saved");
    });
    return;
  }

  if (context === "applicationDetails" || context === "applicationWorkflow" || context === "updateStrategy" || context === "history") {
    commandContextMeta.textContent = "";
    commandContextMeta.hidden = true;
    commandStatus.textContent = "";
    commandStatus.hidden = true;
    commandInlineControls.innerHTML = "";
    if (context === "updateStrategy") renderAutomationToggle();
    renderContextCommands(context === "updateStrategy" ? "updateStrategy" : "empty");
    return;
  }

  commandContextMeta.hidden = false;
  commandContextMeta.textContent = `Version ${selectedVersion}`;
  renderAppliedTemplateControl();
  syncVersionPublicationUI({ rerenderCommands: false });
  renderContextCommands("version");
}

function syncStrategyChoice() {
  strategyTabs.hidden = !guidedAutomationEnabled;
  strategyChoicePanel.hidden = guidedAutomationEnabled;
  document.querySelectorAll("[data-strategy-choice]").forEach((choice) => {
    const active = choice.dataset.strategyChoice === (guidedAutomationEnabled ? "guided" : "notify");
    choice.setAttribute("aria-pressed", String(active));
  });

  if (guidedAutomationEnabled) {
    setStrategyTab("guided");
  } else {
    document.querySelectorAll("[data-strategy-tab]").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".strategy-page").forEach((page) => page.classList.remove("active"));
  }
}

function setGuidedAutomationEnabled(enabled) {
  guidedAutomationEnabled = enabled;
  syncStrategyChoice();
  renderAutomationToggle();
  renderContextCommands("updateStrategy");
}

const appIconMeta = {
  "1Password": ["1P", "#4858bd"],
  "7-Zip": ["7Z", "#2e7d32"],
  "Adobe Acrobat Reader": ["A", "#d92d20"],
  "Azure Data Studio": ["AD", "#0078d4"],
  "Bluebeam Revu": ["BR", "#005a9e"],
  "Box Drive": ["B", "#0061d5"],
  "Cisco Webex": ["W", "#008d97"],
  "Citrix Workspace": ["CW", "#4527a0"],
  "Contoso Finance Tools": ["CF", "#005fb8"],
  "Docker Desktop": ["D", "#1d63ed"],
  "Dropbox": ["D", "#0061ff"],
  "Fabrikam Helpdesk Agent": ["FH", "#8764b8"],
  "Figma Desktop": ["F", "#a4262c"],
  "FileZilla Client": ["FZ", "#b91c1c"],
  "FortiClient VPN": ["F", "#da3b01"],
  "Git": ["G", "#f1502f"],
  "GitHub Desktop": ["GH", "#24292f"],
  "GlobalProtect": ["GP", "#00796b"],
  "Google Chrome": ["C", "#107c10"],
  "Jira Cloud": ["J", "#0052cc"],
  "KeePass": ["KP", "#498205"],
  "Microsoft Edge": ["E", "#008272"],
  "Microsoft Loop": ["L", "#6b69d6"],
  "Microsoft Planner": ["P", "#31752f"],
  "Microsoft PowerToys": ["PT", "#8764b8"],
  "Microsoft Project": ["P", "#107c41"],
  "Microsoft Teams": ["T", "#6264a7"],
  "Microsoft To Do": ["TD", "#2563eb"],
  "Microsoft Visio": ["V", "#3955a3"],
  "Microsoft Whiteboard": ["W", "#0078d4"],
  "Miro": ["M", "#ffb900"],
  "Mozilla Firefox": ["F", "#d83b01"],
  "Northwind VPN Client": ["NV", "#004e8c"],
  "Notepad++": ["N+", "#0b6a0b"],
  "OneDrive": ["OD", "#0078d4"],
  "Oracle Java Runtime": ["J", "#c74634"],
  "Postman": ["P", "#ff6c37"],
  "Power BI Desktop": ["BI", "#f2c811"],
  "PuTTY": ["Pu", "#5c2d91"],
  "Remote Desktop": ["RD", "#0078d4"],
  "RingCentral": ["RC", "#066fac"],
  "SAP GUI": ["SAP", "#0a6ed1"],
  "ServiceNow Agent": ["SN", "#154734"],
  "Skype for Business": ["S", "#00aff0"],
  "Slack": ["S", "#611f69"],
  "Tableau Desktop": ["T", "#1f77b4"],
  "Tailspin Inventory Client": ["TI", "#8a6100"],
  "Visual Studio Code": ["VS", "#007acc"],
  "VLC Media Player": ["V", "#f7630c"],
  "Windows Admin Center": ["WA", "#0078d4"],
  "WinSCP": ["WS", "#006cbe"],
  "Zoom Workplace": ["Z", "#2d8cff"]
};

function getAppIcon(app) {
  const fallback = app.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const fallbackColor = getComputedStyle(document.documentElement).getPropertyValue("--wui-app-icon-fallback").trim();
  const [label, color] = appIconMeta[app.name] || [fallback, fallbackColor];
  return { label, color };
}

function getTileTextColor(hexColor) {
  const hex = hexColor.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "var(--wui-contrast-light)";
  const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const luminance = channels
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const whiteContrast = 1.05 / (luminance + 0.05);
  return whiteContrast >= 4.5 ? "var(--wui-contrast-light)" : "var(--wui-contrast-dark)";
}

function renderAppIcon(app, size = "") {
  const icon = getAppIcon(app);
  const foreground = getTileTextColor(icon.color);
  return `<span class="app-icon-tile ${size}" style="--tile-bg: ${icon.color}; --tile-fg: ${foreground};">${icon.label}</span>`;
}

function getApplicationStatus(app) {
  if (app.status) return app.status;
  return app.empty ? "Not configured" : "Ready to publish";
}

function statusClass(status) {
  if (status.includes("failed")) return "failed";
  if (status.includes("issues")) return "issue";
  if (status.includes("Published")) return "success";
  return "";
}

function renderUpdate(update) {
  if (update.includes("Update")) return `<span class="fluent icon-refresh"></span>${update.replace("⇩ ", "")}`;
  return update;
}

function renderStatus(status) {
  if (!status) return "";
  if (status.includes("Configuration")) return `<span class="fluent icon-warning"></span>${status.replace("⚠ ", "")}`;
  if (status.includes("failed")) return `<span class="fluent icon-dismiss"></span>${status.replace("× ", "")}`;
  if (status.includes("Published")) return `<span class="fluent icon-check"></span>${status.replace("✓ ", "")}`;
  if (status === "Ready to publish") return `<span class="fluent icon-arrow-up"></span>${status}`;
  return status;
}

function renderApps() {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = apps.filter((app) => {
    const statusMatches = statusFilter === "all" || app.state === statusFilter;
    const updatesMatch = !updatesOnly || app.update.includes("Update");
    const queryMatches = !normalizedQuery || [
      app.name,
      app.publisher,
      app.source,
      app.version,
      app.arch,
      getApplicationStatus(app)
    ].some((value) => String(value).toLowerCase().includes(normalizedQuery));
    return statusMatches && updatesMatch && queryMatches;
  });

  appList.innerHTML = `
    <div class="app-list-header" role="row">
      <span>App name</span>
      <span>Updates</span>
      <span>Status</span>
      <span>Versions</span>
      <span>Source</span>
      <span>Arch</span>
      <span>Latest version</span>
    </div>
  ` + filtered.map((app, index) => `
    <button class="app-row" role="option" aria-selected="false" type="button" data-index="${index}">
      <span class="app-name">
        ${renderAppIcon(app)}
        <span><strong>${app.name}</strong><small>Published by ${app.publisher}</small></span>
      </span>
      <span class="linkish icon-text">${renderUpdate(app.update)}</span>
      <span class="status icon-text ${statusClass(getApplicationStatus(app))}">${renderStatus(getApplicationStatus(app))}</span>
      <span>${app.versions}</span>
      <span>${app.source}</span>
      <span><small>Arch</small><br><span class="linkish">${app.arch}</span></span>
      <span><small>Latest version</small><br><span class="linkish">${app.version}</span></span>
    </button>
  `).join("");

  document.querySelectorAll(".app-row").forEach((row) => {
    row.addEventListener("click", () => openDetail("overview", filtered[Number(row.dataset.index)]));
  });
}

function syncSearchControls() {
  const hasQuery = searchInput.value.length > 0;
  clearSearch.hidden = !hasQuery;
}

function setSectionExpanded(section, expanded) {
  const toggle = section.querySelector(":scope > header button[aria-expanded]");
  const title = section.querySelector(":scope > header strong")?.textContent.trim() || "section";
  section.classList.toggle("collapsed", !expanded);
  section.setAttribute("aria-expanded", String(expanded));
  if (toggle) {
    toggle.innerHTML = `<span class="fluent ${expanded ? "icon-chevron-up" : "icon-chevron-down"}"></span>`;
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", `${expanded ? "Collapse" : "Expand"} ${title}`);
  }
}

function initCollapsibleSections() {
  document.querySelectorAll(".expander, .script-editor, .assignment-behaviour-section").forEach((section) => {
    const header = section.querySelector(":scope > header");
    const toggle = header?.querySelector("button[aria-expanded]");
    if (!header || !toggle) return;

    setSectionExpanded(section, section.dataset.defaultCollapsed !== "true");

    header.addEventListener("click", (event) => {
      const interactiveTarget = event.target.closest("button, a, input, select, textarea");
      if (interactiveTarget && interactiveTarget !== toggle) return;
      const expanded = !section.classList.contains("collapsed");
      setSectionExpanded(section, !expanded);
    });
  });
}

function syncDetailApplicationIdentity(app) {
  const icon = getAppIcon(app);
  const foreground = getTileTextColor(icon.color);
  [detailAppIcon].forEach((tile) => {
    tile.textContent = icon.label;
    tile.style.setProperty("--tile-bg", icon.color);
    tile.style.setProperty("--tile-fg", foreground);
  });
  detailAppName.textContent = app.name;
  detailAppPublisher.textContent = `Published by ${app.publisher}`;
  applicationNameInput.value = app.name;
  applicationVendorInput.value = app.publisher;
  applicationDescriptionInput.value = app.name === "Contoso Finance Tools"
    ? "Finance workstation utilities packaged for Intune deployment"
    : "";
  if (app.name !== "Contoso Finance Tools") {
    document.querySelector("#productCode").textContent = "Not detected";
    document.querySelector("#packageArchitecture").textContent = app.arch === "-" ? "Not set" : app.arch;
    document.querySelector("#sourceFolderValue").textContent = app.source === "WinGet"
      ? `WinGet catalog source · ${app.name}`
      : `Local package source · ${app.name}`;
  }
}

function bindVersionButtons() {
  versionList.querySelectorAll(".version").forEach((version) => {
    version.addEventListener("click", () => {
      if (versionConfigurationDirty) {
        showToast("Save or cancel configuration changes before switching versions");
        return;
      }
      versionList.querySelectorAll(".version").forEach((item) => {
        const active = item === version;
        item.classList.toggle("active", active);
        if (active) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
      const activeTabName = document.querySelector(".tab.active")?.dataset.tab || "overview";
      setTab(activeTabName);
      syncVersionAutomationRecord(version.dataset.version);
    });
  });
}

function showEmptyApplicationState() {
  detailMain.classList.add("empty-application-mode");
  versionList.hidden = true;
  versionEmptyNote.hidden = false;
  appLevelNav.hidden = true;
  versionTabs.hidden = true;
  configurationEmptyState.hidden = false;
  document.querySelectorAll(".tab-panel, .app-panel").forEach((panel) => panel.classList.remove("active"));
  setCommandContext("emptyApplication");
}

function prepareInitialPackageData() {
  packageVersionInput.value = "";
  document.querySelector("#productCode").textContent = "Not set";
  document.querySelector("#packageArchitecture").textContent = "Not set";
  document.querySelector("#sourceFolderValue").textContent = "No folder selected";
  document.querySelector("#wingetLinkStatus").hidden = true;
  document.querySelector("#wingetCatalogSelect").selectedIndex = -1;
  document.querySelector("#resourceItemCount").textContent = "0 items";
  document.querySelector("#resourceSize").textContent = "0 B";
  const packageSyncInfo = document.querySelector("#packageSyncInfo");
  if (packageSyncInfo) packageSyncInfo.hidden = false;
}

function restoreDefaultPackagePresentation() {
  document.querySelector("#productCode").textContent = defaultPackagePresentation.productCode;
  document.querySelector("#packageArchitecture").textContent = defaultPackagePresentation.architecture;
  document.querySelector("#sourceFolderValue").textContent = defaultPackagePresentation.sourceFolder;
  document.querySelector("#wingetLinkStatus").hidden = false;
  document.querySelector("#resourceItemCount").textContent = defaultPackagePresentation.resourceItems;
  document.querySelector("#resourceSize").textContent = defaultPackagePresentation.resourceSize;
  const packageSyncInfo = document.querySelector("#packageSyncInfo");
  if (packageSyncInfo) packageSyncInfo.hidden = false;
}

function prepareBlankConfiguration() {
  document.querySelectorAll(".tab-panel input, .tab-panel textarea").forEach((control) => {
    if (control.type === "checkbox" || control.type === "radio") control.checked = false;
    else control.value = "";
  });
  document.querySelectorAll(".tab-panel select").forEach((select) => { select.selectedIndex = -1; });
  applicationNameInput.value = selectedApplication.name;
  applicationVendorInput.value = selectedApplication.publisher;
  prepareInitialPackageData();
  const packageSyncInfo = document.querySelector("#packageSyncInfo");
  if (packageSyncInfo) packageSyncInfo.hidden = true;
  wrapperConfiguredState.hidden = true;
  activePsadtTemplate = null;
}

function initializeEmptyApplication(mode) {
  selectedApplication.empty = false;
  selectedApplication.configurationMode = mode;
  selectedApplication.versions = "1 draft";
  selectedApplication.status = "Draft";
  selectedApplication.version = "Not set";
  selectedVersion = "draft";
  if (mode === "scratch") prepareBlankConfiguration();
  else prepareInitialPackageData();
  window.packitDeployment.select(selectedApplication.name, selectedVersion);
  lastSavedVersionConfiguration = captureVersionConfiguration();
  versionList.innerHTML = `
    <button class="version active" type="button" aria-current="page" data-version="draft">
      New version <span class="status issue">Draft</span>
    </button>
  `;
  bindVersionButtons();
  versionList.hidden = false;
  versionEmptyNote.hidden = true;
  appLevelNav.hidden = true;
  versionTabs.hidden = false;
  configurationEmptyState.hidden = true;
  detailMain.classList.remove("empty-application-mode");
  applicationNameInput.value = selectedApplication.name;
  applicationVendorInput.value = selectedApplication.publisher;
  applicationDescriptionInput.value = "";
  automationTemplateSummary.hidden = mode !== "template";
  versionAutomationRecord.hidden = true;
  setTab("overview");
  renderApps();
  document.querySelector("#overviewPanel input")?.focus();
}

function cancelInitialConfiguration() {
  restoreVersionConfiguration(lastSavedVersionConfiguration);
  versionConfigurationDirty = false;
  selectedApplication.empty = true;
  delete selectedApplication.configurationMode;
  selectedApplication.versions = "No versions";
  selectedApplication.status = "Not configured";
  selectedApplication.version = "-";
  showEmptyApplicationState();
  renderApps();
  showToast("Draft discarded");
}

function openDetail(tabName, app = apps[0]) {
  if (versionConfigurationDirty) { showToast("Save or cancel configuration changes before switching applications"); return; }
  selectedApplication = app;
  listView.classList.remove("active");
  signatureView.classList.remove("active");
  automationView.classList.remove("active");
  toolsView.classList.remove("active");
  settingsView.classList.remove("active");
  detailView.classList.add("active");
  shell.classList.add("detail-mode");
  shell.classList.remove("tools-mode");
  shell.classList.remove("settings-mode");
  setSidebarActive("applications");
  syncDetailApplicationIdentity(app);
  if (app.empty) {
    showEmptyApplicationState();
    return;
  }
  detailMain.classList.remove("empty-application-mode");
  versionList.hidden = false;
  versionEmptyNote.hidden = true;
  versionTabs.hidden = false;
  configurationEmptyState.hidden = true;
  appLevelNav.hidden = Boolean(app.configurationMode);
  if (!app.configurationMode) {
    restoreVersionConfiguration(automationTemplateSnapshots.guided);
    restoreDefaultPackagePresentation();
    syncDetailApplicationIdentity(app);
    selectDetailApplicationState(app);
    automationTemplateSummary.hidden = false;
    versionAutomationRecord.hidden = false;
  }
  setTab(tabName);
  if (!app.configurationMode) syncVersionAutomationRecord(selectedVersion);
}

function showList() {
  if (versionConfigurationDirty) { showToast("Save or cancel configuration changes before leaving this version"); return; }
  automationView.classList.remove("active");
  toolsView.classList.remove("active");
  settingsView.classList.remove("active");
  signatureView.classList.remove("active");
  detailView.classList.remove("active");
  listView.classList.add("active");
  shell.classList.remove("detail-mode");
  shell.classList.remove("tools-mode");
  shell.classList.remove("settings-mode");
  setSidebarActive("applications");
}

function showSignature() {
  listView.classList.remove("active");
  automationView.classList.remove("active");
  toolsView.classList.remove("active");
  settingsView.classList.remove("active");
  detailView.classList.remove("active");
  signatureView.classList.add("active");
  shell.classList.remove("detail-mode");
  shell.classList.remove("tools-mode");
  shell.classList.remove("settings-mode");
  setPrimaryNavigation("applications");
  setSidebarActive("signature");
}

function setSidebarActive(viewName) {
  document.querySelectorAll("[data-main-view]").forEach((item) => {
    const active = item.dataset.mainView === viewName;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

function setPrimaryNavigation(viewName) {
  document.querySelectorAll("[data-primary-view]").forEach((item) => {
    const active = item.dataset.primaryView === viewName;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-secondary-nav]").forEach((nav) => {
    nav.classList.toggle("active", nav.dataset.secondaryNav === viewName);
  });
}

function showWorkspaceView(viewName) {
  if (versionConfigurationDirty) { showToast("Save or cancel configuration changes before leaving this version"); return; }
  if (viewName === "applications") {
    setPrimaryNavigation("applications");
    updatesOnly = false;
    document.querySelector("#updatesFilter").classList.remove("active");
    document.querySelector("#updatesFilter").setAttribute("aria-pressed", "false");
    showList();
    renderApps();
    return;
  }

  if (viewName === "automation") {
    listView.classList.remove("active");
    signatureView.classList.remove("active");
    detailView.classList.remove("active");
    toolsView.classList.remove("active");
    settingsView.classList.remove("active");
    automationView.classList.add("active");
    shell.classList.remove("detail-mode");
    shell.classList.remove("tools-mode");
    shell.classList.remove("settings-mode");
    setPrimaryNavigation("automation");
    return;
  }

  if (viewName === "discover") {
    listView.classList.remove("active");
    signatureView.classList.remove("active");
    detailView.classList.remove("active");
    automationView.classList.remove("active");
    settingsView.classList.remove("active");
    toolsView.classList.add("active");
    shell.classList.remove("detail-mode");
    shell.classList.remove("settings-mode");
    shell.classList.add("tools-mode");
    setPrimaryNavigation("discover");
    return;
  }

  if (viewName === "settings") {
    listView.classList.remove("active");
    signatureView.classList.remove("active");
    detailView.classList.remove("active");
    automationView.classList.remove("active");
    toolsView.classList.remove("active");
    settingsView.classList.add("active");
    shell.classList.remove("detail-mode");
    shell.classList.remove("tools-mode");
    shell.classList.add("settings-mode");
    setPrimaryNavigation("settings");
    showSettingsRoot();
    return;
  }

  if (viewName === "signature") showSignature();
}

function setTab(tabName) {
  detailMain.classList.remove("app-section-mode");
  setCommandContext(selectedApplication.configurationMode ? "draftConfiguration" : "version");
  document.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  document.querySelectorAll(".app-nav-item").forEach((item) => {
    item.classList.remove("active");
    item.removeAttribute("aria-current");
  });
  document.querySelectorAll(".app-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${tabName}Panel`);
  if (target) {
    target.classList.add("active");
    target.setAttribute("role", "tabpanel");
    target.setAttribute("aria-labelledby", `${tabName}Tab`);
  }
}

function setAppSection(sectionName) {
  if (versionConfigurationDirty) { showToast("Save or cancel version changes before switching sections"); return; }
  detailMain.classList.add("app-section-mode");
  setCommandContext(sectionName);
  document.querySelectorAll(".version").forEach((version) => {
    version.classList.remove("active");
    version.removeAttribute("aria-current");
  });
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
    tab.tabIndex = -1;
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelectorAll(".app-nav-item").forEach((item) => {
    const active = item.dataset.appSection === sectionName;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  document.querySelectorAll(".app-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${sectionName}Panel`);
  if (target) target.classList.add("active");
  if (sectionName === "updateStrategy") syncStrategyChoice();
  if (sectionName === "applicationWorkflow") window.packitPolicyUI?.openConfiguration(null, false);
}

function setStrategyTab(tabName) {
  if (!guidedAutomationEnabled) return;
  document.querySelectorAll("[data-strategy-tab]").forEach((tab) => {
    const active = tab.dataset.strategyTab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  document.querySelectorAll(".strategy-page").forEach((page) => page.classList.remove("active"));

  const target = document.querySelector(`#${tabName}StrategyPage`);
  if (target) {
    target.classList.add("active");
    target.setAttribute("role", "tabpanel");
  }
}

function getNotificationSeverity(message, requestedSeverity) {
  if (requestedSeverity) return requestedSeverity;
  if (/failed|error/i.test(message)) return "error";
  if (/save or cancel|required|before saving|no valid|not connected|not set/i.test(message)) return "warning";
  if (/saved|created|applied|updated|reset|started|stopped|restarted|refreshed|added|removed|copied|installed|disabled/i.test(message)) return "success";
  return "informational";
}

function hideToast() {
  window.clearTimeout(showToast.timeout);
  toast.classList.remove("visible");
}

function showToast(message, requestedSeverity) {
  const severity = getNotificationSeverity(message, requestedSeverity);
  const iconBySeverity = {
    informational: "icon-info",
    success: "icon-check",
    warning: "icon-warning",
    error: "icon-dismiss"
  };
  toast.classList.remove("informational", "success", "warning", "error");
  toast.classList.add(severity);
  toastMessage.textContent = message;
  toastIcon.className = `fluent ${iconBySeverity[severity]} toast-icon`;
  toast.setAttribute("aria-live", severity === "error" ? "assertive" : "polite");
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(hideToast, severity === "warning" || severity === "error" ? 5000 : 3200);
}

closeToast.addEventListener("click", hideToast);

document.addEventListener("click", (event) => {
  const dismissButton = event.target.closest("[data-dismiss-message]");
  if (!dismissButton) return;
  const message = dismissButton.closest(".wui-info-bar");
  if (!message) return;
  message.hidden = true;
  dismissButton.blur();
});

document.querySelector("#licenseDetailsAction")?.addEventListener("click", () => {
  showToast("Commercial licensing details opened", "informational");
});

function setMaximized(maximized) {
  desktop.classList.toggle("is-maximized", maximized);
  appWindow.classList.toggle("maximized", maximized);
  maximizeWindow.setAttribute("aria-pressed", String(maximized));
  maximizeWindow.setAttribute("aria-label", maximized ? "Restore" : "Maximize");
  maximizeWindow.dataset.titlebarTooltip = maximized ? "Restore" : "Maximize";
  maximizeWindow.querySelector("[data-window-icon='maximize']").hidden = maximized;
  maximizeWindow.querySelector("[data-window-icon='restore']").hidden = !maximized;
}

function hideApplication(state) {
  window.clearTimeout(windowTransitionTimeout);
  windowVisibilityState = state;
  launcherState.textContent = state === "minimized" ? "Minimized" : "Open PacKit";
  packitLauncher.setAttribute("aria-label", state === "minimized" ? "Restore PacKit" : "Open PacKit");
  appWindow.classList.add("is-minimizing");

  windowTransitionTimeout = window.setTimeout(() => {
    appWindow.hidden = true;
    appWindow.classList.remove("is-minimizing");
    packitLauncher.hidden = false;
    packitLauncher.focus();
  }, 170);
}

function restoreApplication() {
  window.clearTimeout(windowTransitionTimeout);
  if (windowVisibilityState === "closed") setMaximized(false);
  windowVisibilityState = "open";
  packitLauncher.hidden = true;
  appWindow.hidden = false;
  appWindow.classList.add("is-restoring");
  window.setTimeout(() => appWindow.classList.remove("is-restoring"), 190);
  minimizeWindow.focus();
}

function setAutomationTab(tabName) {
  automationShell?.classList.toggle("workflow-mode", tabName === "workflows");
  document.querySelectorAll("[data-automation-tab]").forEach((tab) => {
    const active = tab.dataset.automationTab === tabName;
    tab.classList.toggle("active", active);
    if (active) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  document.querySelectorAll(".automation-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${tabName}AutomationPanel`);
  if (target) target.classList.add("active");

  automationCommandBar.hidden = true;

  const commandLabels = {
    workflows: ["New Workflow", "Open Workflow Folder", "Save Workflow"],
    history: ["New Workflow", "Open Logs Folder", "Export Logs"]
  };
  const [newLabel, openLabel, saveLabel] = commandLabels[tabName] || commandLabels.workflows;
  automationNewAction.innerHTML = `<span class="fluent icon-add"></span> ${newLabel}`;
  automationOpenAction.innerHTML = `<span class="fluent icon-folder"></span> ${openLabel}`;
  automationSaveAction.innerHTML = `<span class="fluent icon-check"></span> ${saveLabel}`;
}

document.querySelectorAll("[data-primary-view]").forEach((item) => {
  item.addEventListener("click", () => showWorkspaceView(item.dataset.primaryView));
});

document.querySelector("#backToList").addEventListener("click", showList);
document.querySelector("#addApplication").addEventListener("click", () => showToast("Import from catalog template opened"));

let trustedSigningToolsInstalled = false;

function syncSignatureMethod() {
  const selectedMethod = document.querySelector("input[name='signature-method']:checked")?.value || "store";
  document.querySelectorAll("[data-signature-method-card]").forEach((card) => {
    card.classList.toggle("selected", card.dataset.signatureMethodCard === selectedMethod);
  });
  document.querySelectorAll("[data-signature-method-details]").forEach((details) => {
    details.hidden = details.dataset.signatureMethodDetails !== selectedMethod;
  });
}

function syncSignatureEnabled() {
  const enabled = signatureEnabled.checked;
  signatureEnabledLabel.textContent = enabled ? "Enabled" : "Disabled";
  signatureSettings.hidden = !enabled;
  signatureDisabledState.hidden = enabled;
}

function syncTrustedSigningCorrelationField() {
  const enabled = trustedSigningCorrelationToggle.checked;
  trustedSigningCorrelationField.hidden = !enabled;
  trustedSigningCorrelationToggle.setAttribute("aria-expanded", String(enabled));
}

function positionHelpTooltip(button) {
  const text = button.dataset.tooltip;
  if (!text) return;

  const tooltipRoot = button.closest("dialog[open]") ?? document.body;
  if (helpTooltipLayer.parentElement !== tooltipRoot) tooltipRoot.append(helpTooltipLayer);

  helpTooltipLayer.textContent = text;
  helpTooltipLayer.hidden = false;
  helpTooltipLayer.style.maxWidth = `${Math.max(1, window.innerWidth - 24)}px`;
  helpTooltipLayer.style.left = "-9999px";
  helpTooltipLayer.style.top = "-9999px";

  const rect = button.getBoundingClientRect();
  const viewportMargin = 12;
  const tooltipGap = 10;
  const naturalWidth = helpTooltipLayer.getBoundingClientRect().width;
  const startX = Math.max(viewportMargin, rect.left);
  const endX = Math.min(window.innerWidth - viewportMargin, rect.right);

  const placements = [
    { alignEnd: false, above: false, horizontal: window.innerWidth - startX - viewportMargin, vertical: window.innerHeight - rect.bottom - tooltipGap - viewportMargin },
    { alignEnd: true, above: false, horizontal: endX - viewportMargin, vertical: window.innerHeight - rect.bottom - tooltipGap - viewportMargin },
    { alignEnd: false, above: true, horizontal: window.innerWidth - startX - viewportMargin, vertical: rect.top - tooltipGap - viewportMargin },
    { alignEnd: true, above: true, horizontal: endX - viewportMargin, vertical: rect.top - tooltipGap - viewportMargin },
  ].map((placement) => {
    const width = Math.max(1, Math.min(naturalWidth, placement.horizontal));
    helpTooltipLayer.style.maxWidth = `${Math.floor(width)}px`;
    const height = helpTooltipLayer.getBoundingClientRect().height;
    return {
      ...placement,
      width,
      height,
      fits: placement.horizontal >= naturalWidth && placement.vertical >= height,
      score: Math.min(placement.horizontal, naturalWidth) * Math.min(placement.vertical, height),
    };
  });

  // Prefer the familiar lower-right placement, then choose the most usable quadrant.
  const placement = placements.find((candidate) => candidate.fits)
    ?? placements.reduce((best, candidate) => (candidate.score > best.score ? candidate : best));

  helpTooltipLayer.style.maxWidth = `${Math.floor(placement.width)}px`;
  const preferredLeft = placement.alignEnd ? rect.right - placement.width : rect.left;
  const left = Math.min(
    window.innerWidth - viewportMargin - placement.width,
    Math.max(viewportMargin, preferredLeft),
  );
  helpTooltipLayer.style.left = `${Math.round(left)}px`;
  helpTooltipLayer.style.top = `${Math.round(placement.above ? rect.top - tooltipGap - placement.height : rect.bottom + tooltipGap)}px`;
  button.setAttribute("aria-describedby", helpTooltipId);
  activeHelpTooltipButton = button;
}

function hideHelpTooltip(button) {
  if (activeHelpTooltipButton !== button || button.matches(":hover") || document.activeElement === button) return;
  button.removeAttribute("aria-describedby");
  helpTooltipLayer.hidden = true;
  activeHelpTooltipButton = null;
}

document.addEventListener("pointerover", (event) => {
  const button = event.target.closest?.("button.wui-help-tip");
  if (!button || button.contains(event.relatedTarget)) return;
  positionHelpTooltip(button);
});

document.addEventListener("pointerout", (event) => {
  const button = event.target.closest?.("button.wui-help-tip");
  if (!button || button.contains(event.relatedTarget)) return;
  hideHelpTooltip(button);
});

document.addEventListener("focusin", (event) => {
  const button = event.target.closest?.("button.wui-help-tip");
  if (button) positionHelpTooltip(button);
});

document.addEventListener("focusout", (event) => {
  const button = event.target.closest?.("button.wui-help-tip");
  if (button) hideHelpTooltip(button);
});

window.addEventListener("resize", () => {
  if (activeHelpTooltipButton) positionHelpTooltip(activeHelpTooltipButton);
});

document.addEventListener("scroll", () => {
  if (activeHelpTooltipButton) positionHelpTooltip(activeHelpTooltipButton);
}, true);

function installTrustedSigningDependencies() {
  trustedSigningToolsInstalled = true;
  trustedSigningToolsStatus.classList.remove("warning");
  trustedSigningToolsStatus.classList.add("success");
  trustedSigningToolsStatus.querySelector(":scope > .fluent").className = "fluent icon-check";
  const statusCopy = trustedSigningToolsStatus.querySelector(".wui-info-bar-content");
  statusCopy.innerHTML = "<strong>Trusted Signing Client Tools installed</strong><small>This device is ready to use Microsoft Trusted Signing.</small>";
  trustedSigningToolsStatus.querySelector(".signature-status-actions").hidden = true;
  showToast("Trusted Signing Client Tools installed");
}

signatureMethodInputs.forEach((input) => {
  input.addEventListener("change", () => {
    syncSignatureMethod();
  });
});

signatureEnabled.addEventListener("change", () => {
  syncSignatureEnabled();
});

trustedSigningCorrelationToggle.addEventListener("change", syncTrustedSigningCorrelationField);

installTrustedSigningTools.addEventListener("click", installTrustedSigningDependencies);
downloadTrustedSigningTools.addEventListener("click", () => showToast("Trusted Signing Client Tools download opened"));
refreshCertificates.addEventListener("click", () => showToast("No valid code-signing certificate found", "warning"));

function syncInstallationMethod() {
  const wrapped = !wrapperConfiguredState.hidden;
  const method = wrapped ? "wrapper" : "direct";
  if (wrapperPanel) wrapperPanel.hidden = !wrapped;
  createPsadtWrapper.hidden = wrapped;
  unwrapPsadtWrapper.hidden = !wrapped;
  const methodTitle = document.querySelector("#installationMethodTitle");
  const methodDescription = document.querySelector("#installationMethodDescription");
  const methodIcon = document.querySelector(".installation-method-icon .fluent");
  if (methodTitle) methodTitle.textContent = wrapped ? "PSADT wrapper" : "Direct installer";
  if (methodDescription) {
    methodDescription.textContent = wrapped
      ? `Created from ${activePsadtTemplate?.name || "the selected PSADT template"}. Management platforms start the wrapper.`
      : "Management platforms run the package install and uninstall actions directly.";
  }
  if (methodIcon) methodIcon.className = `fluent ${wrapped ? "icon-settings" : "icon-folder"}`;
  if (activePsadtTemplateName) activePsadtTemplateName.textContent = activePsadtTemplate?.name || "No template selected";
  const summaryMethod = document.querySelector("#installationSummaryMethod");
  const summaryDetail = document.querySelector("#installationSummaryDetail");
  if (summaryMethod) summaryMethod.textContent = wrapped ? "PSADT wrapper" : "Direct installer";
  if (summaryDetail) summaryDetail.textContent = wrapped ? activePsadtTemplate?.name || "Template configured" : "Platform runs payload commands";
  const payloadInstall = document.querySelector("#payloadInstallCommand");
  const payloadUninstall = document.querySelector("#payloadUninstallCommand");
  const reviewInstall = document.querySelector("#reviewPayloadInstall");
  const reviewUninstall = document.querySelector("#reviewPayloadUninstall");
  if (reviewInstall && payloadInstall) reviewInstall.textContent = payloadInstall.value;
  if (reviewUninstall && payloadUninstall) reviewUninstall.textContent = payloadUninstall.value;
  document.querySelectorAll(".execution-chain-list > div").forEach((row) => {
    row.classList.toggle("direct-execution", method === "direct");
    const platformCommand = row.querySelector("code:first-of-type");
    const payloadCommand = row.querySelector("code:last-of-type");
    const arrow = row.querySelectorAll(".icon-arrow-right")[1];
    if (platformCommand) platformCommand.hidden = method === "direct";
    if (arrow) arrow.hidden = method === "direct";
    if (payloadCommand) payloadCommand.hidden = false;
  });
}

function getPsadtTemplates() {
  return [...psadtTemplatesPage.querySelectorAll(".psadt-template-row")].map((row) => {
    const input = row.querySelector("input[type='radio']");
    return {
      id: input.value,
      name: row.querySelector("strong")?.textContent.trim() || input.value,
      source: row.dataset.templateSource || row.querySelector("small")?.textContent.trim() || "Installed template",
      isDefault: input.checked
    };
  });
}

function getDefaultPsadtTemplate() {
  const templates = getPsadtTemplates();
  const template = templates.find((item) => item.isDefault) || templates[0];
  return template ? { id: template.id, name: template.name, source: template.source } : null;
}

function renderWrapperTemplateChoices() {
  const templates = getPsadtTemplates();
  const preferred = activePsadtTemplate?.id || templates.find((item) => item.isDefault)?.id || templates[0]?.id;
  wrapperTemplateList.replaceChildren();

  templates.forEach((template) => {
    const row = document.createElement("label");
    row.className = "psadt-template-row";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "wrapper-psadt-template";
    radio.value = template.id;
    radio.checked = template.id === preferred;

    const icon = document.createElement("span");
    icon.className = "settings-row-icon psadt";
    icon.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.src = "./assets/figma/icon-psadt.png";
    image.alt = "";
    icon.append(image);

    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = template.name;
    const source = document.createElement("small");
    source.textContent = template.source;
    copy.append(name, source);

    if (template.isDefault) {
      const badge = document.createElement("span");
      badge.className = "service-badge";
      badge.textContent = "Default";
      row.append(radio, icon, copy, badge);
    } else {
      row.append(radio, icon, copy);
    }
    wrapperTemplateList.append(row);
  });
}

[document.querySelector("#payloadInstallCommand"), document.querySelector("#payloadUninstallCommand")].forEach((input) => {
  input?.addEventListener("input", syncInstallationMethod);
});

document.querySelectorAll("[data-summary-target]").forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.summaryTarget));
});

createPsadtWrapper.addEventListener("click", () => {
  const proceed = () => { renderWrapperTemplateChoices(); createPsadtWrapperDialog.showModal(); };
  if (window.packitPolicyUI) window.packitPolicyUI.authorizeWrapper(proceed);
  else proceed();
});

document.querySelector("#closeCreatePsadtWrapperDialog").addEventListener("click", () => createPsadtWrapperDialog.close());
document.querySelector("#cancelCreatePsadtWrapper").addEventListener("click", () => createPsadtWrapperDialog.close());

document.querySelector("#confirmCreatePsadtWrapper").addEventListener("click", () => {
  const selected = wrapperTemplateList.querySelector("input[name='wrapper-psadt-template']:checked");
  const template = getPsadtTemplates().find((item) => item.id === selected?.value);
  if (!template) return;
  activePsadtTemplate = { id: template.id, name: template.name, source: template.source };
  wrapperConfiguredState.hidden = false;
  window.packitPolicyUI?.wrapperChanged();
  syncInstallationMethod();
  markVersionConfigurationDirty();
  createPsadtWrapperDialog.close();
  showToast(`PSADT wrapper created from ${template.name}`);
});

unwrapPsadtWrapper.addEventListener("click", () => {
  if (window.packitPolicyUI) window.packitPolicyUI.authorizeWrapper(() => unwrapPsadtDialog.showModal());
  else unwrapPsadtDialog.showModal();
});
document.querySelector("#closeUnwrapPsadtDialog").addEventListener("click", () => unwrapPsadtDialog.close());
document.querySelector("#cancelUnwrapPsadt").addEventListener("click", () => unwrapPsadtDialog.close());
document.querySelector("#confirmUnwrapPsadt").addEventListener("click", () => {
  wrapperConfiguredState.hidden = true;
  activePsadtTemplate = null;
  window.packitPolicyUI?.wrapperChanged();
  syncInstallationMethod();
  markVersionConfigurationDirty();
  unwrapPsadtDialog.close();
  showToast("PSADT wrapper removed. Direct installer restored.");
});
searchInput.addEventListener("input", (event) => {
  searchQuery = event.currentTarget.value;
  syncSearchControls();
  renderApps();
});
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  syncSearchControls();
  renderApps();
  searchInput.focus();
});
document.querySelector("#updatesFilter").addEventListener("click", (event) => {
  updatesOnly = !updatesOnly;
  event.currentTarget.classList.toggle("active", updatesOnly);
  event.currentTarget.setAttribute("aria-pressed", String(updatesOnly));
  renderApps();
});
statusFilterButton.addEventListener("click", () => {
  statusMenu.classList.toggle("open");
  const open = statusMenu.classList.contains("open");
  statusMenu.setAttribute("aria-hidden", String(!open));
  statusFilterButton.setAttribute("aria-expanded", String(open));
  if (open) statusMenu.querySelector("[aria-checked='true']")?.focus();
});

statusMenu.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  statusFilter = button.dataset.status;
  statusFilterButton.innerHTML = `${button.textContent}<span class="fluent icon-chevron-down"></span>`;
  statusMenu.querySelectorAll("[role='menuitemradio']").forEach((item) => {
    item.setAttribute("aria-checked", String(item === button));
  });
  statusMenu.classList.remove("open");
  statusMenu.setAttribute("aria-hidden", "true");
  statusFilterButton.setAttribute("aria-expanded", "false");
  statusFilterButton.focus();
  renderApps();
});

document.querySelectorAll(".view-toggles button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".view-toggles button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    showToast(button.getAttribute("aria-label"));
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

bindVersionButtons();

document.querySelectorAll(".app-nav-item").forEach((item) => {
  item.addEventListener("click", () => setAppSection(item.dataset.appSection));
});

document.querySelectorAll("[data-strategy-choice]").forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.dataset.strategyChoice === "guided") setGuidedAutomationEnabled(true);
  });
});

editStrategyConfiguration.addEventListener("click", openStrategyEditDialog);
resetStrategyTemplate.addEventListener("click", resetToAppliedStrategyTemplate);

strategyEditDialog.querySelectorAll("input[name='strategy-edit-scope']").forEach((input) => {
  input.addEventListener("change", () => {
    newStrategyTemplateNameField.hidden = input.value !== "new" || !input.checked;
    if (input.value === "new" && input.checked) newStrategyTemplateName.focus();
  });
});

newStrategyTemplateName.addEventListener("input", () => {
  newStrategyTemplateName.setCustomValidity("");
  if (strategyEditMode === "new") syncStrategyTemplateUI();
});

document.querySelector("#confirmStrategyEdit").addEventListener("click", () => {
  const selectedScope = strategyEditDialog.querySelector("input[name='strategy-edit-scope']:checked")?.value || "application";
  if (selectedScope === "new" && !newStrategyTemplateName.value.trim()) {
    newStrategyTemplateNameField.hidden = false;
    newStrategyTemplateName.setCustomValidity("Enter a workflow name");
    newStrategyTemplateName.reportValidity();
    return;
  }
  strategyEditDialog.close();
  setStrategyEditMode(selectedScope);
});

document.querySelector("#cancelStrategyEdit").addEventListener("click", () => strategyEditDialog.close());
document.querySelector("#closeStrategyEditDialog").addEventListener("click", () => strategyEditDialog.close());
strategyEditDialog.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#confirmStrategyEdit").click();
});

getVersionManagedControls().forEach((control) => {
  control.addEventListener(control.tagName === "SELECT" ? "change" : "input", markVersionConfigurationDirty);
});

changeAutomationTemplate.addEventListener("click", openAutomationTemplateDialog);
manageAutomationTemplate.addEventListener("click", manageCurrentAutomationTemplate);
viewAppliedSnapshot.addEventListener("click", () => {
  const expanded = appliedSnapshot.hidden;
  appliedSnapshot.hidden = !expanded;
  viewAppliedSnapshot.setAttribute("aria-expanded", String(expanded));
  viewAppliedSnapshot.innerHTML = `<span class="fluent icon-eye"></span> ${expanded ? "Hide applied snapshot" : "View applied snapshot"}`;
});

saveConfigurationDialog.querySelectorAll("input[name='configuration-save-scope']").forEach((input) => {
  input.addEventListener("change", syncSaveConfigurationDialog);
});
newConfigurationTemplateName.addEventListener("input", () => newConfigurationTemplateName.setCustomValidity(""));
confirmSaveConfiguration.addEventListener("click", saveVersionConfiguration);
document.querySelector("#cancelSaveConfiguration").addEventListener("click", () => saveConfigurationDialog.close());
document.querySelector("#closeSaveConfigurationDialog").addEventListener("click", () => saveConfigurationDialog.close());
saveConfigurationDialog.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  saveVersionConfiguration();
});

document.querySelector("#confirmAutomationTemplate").addEventListener("click", applyAutomationTemplate);
document.querySelector("#cancelAutomationTemplate").addEventListener("click", () => {
  initializingEmptyApplication = false;
  automationTemplateDialog.close();
});
document.querySelector("#closeAutomationTemplateDialog").addEventListener("click", () => {
  initializingEmptyApplication = false;
  automationTemplateDialog.close();
});
automationTemplateDialog.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  applyAutomationTemplate();
});

document.querySelector("#chooseInitialTemplate").addEventListener("click", openInitialAutomationTemplateDialog);
document.querySelector("#configureFromScratch").addEventListener("click", () => initializeEmptyApplication("scratch"));

document.querySelectorAll("[data-strategy-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setStrategyTab(tab.dataset.strategyTab));
});

document.querySelectorAll("[data-history-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.historyView;
    document.querySelectorAll("[data-history-view]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    document.querySelector("#packageHistory").classList.toggle("active", target === "package");
    document.querySelector("#deviceHistory").classList.toggle("active", target === "devices");
  });
});

document.querySelectorAll("[data-main-view]").forEach((item) => {
  item.addEventListener("click", () => showWorkspaceView(item.dataset.mainView));
});

document.querySelectorAll("[data-automation-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    showWorkspaceView("automation");
    setAutomationTab(tab.dataset.automationTab);
  });
});

document.querySelectorAll("[data-template-id]").forEach((row) => {
  row.addEventListener("click", () => selectAutomationTemplate(row.dataset.templateId));
});

document.querySelectorAll(".workflow-row").forEach((row) => {
  row.addEventListener("click", () => {
    document.querySelectorAll(".workflow-row").forEach((item) => item.classList.toggle("active", item === row));
  });
});

document.querySelectorAll(".automation-view button:not([data-automation-tab]):not(.workflow-row):not([data-daemon-action])").forEach((button) => {
  button.addEventListener("click", () => showToast(button.textContent.trim()));
});

function renderDaemonState() {
  daemonStatusIcon.classList.toggle("success", daemonRunning);
  daemonStatusIcon.classList.toggle("is-stopped", !daemonRunning);
  daemonStatusIcon.innerHTML = `<span class="fluent ${daemonRunning ? "icon-check" : "icon-warning"}"></span>`;
  daemonStatusTitle.textContent = daemonRunning ? "Daemon running" : "Daemon stopped";
  daemonStatusDescription.textContent = daemonRunning
    ? "Workflows can run on schedule or on demand."
    : "Scheduled and on-demand workflow runs are paused.";
  toggleDaemonLabel.textContent = daemonRunning ? "Stop" : "Start";
  toggleDaemonIcon.className = daemonRunning ? "daemon-stop-glyph" : "fluent icon-play";
  restartDaemon.disabled = !daemonRunning;
}

document.querySelector("#refreshDaemonStatus").addEventListener("click", () => {
  daemonLastChecked.textContent = "Checked just now";
  showToast("Daemon status refreshed");
});
toggleDaemon.addEventListener("click", () => {
  daemonRunning = !daemonRunning;
  renderDaemonState();
  showToast(daemonRunning ? "Automation daemon started" : "Automation daemon stopped");
});
restartDaemon.addEventListener("click", () => showToast("Automation daemon restarted"));
[daemonPollInterval, daemonUploaderPath].forEach((control) => {
  control.addEventListener("input", () => {
    daemonSettingsState.classList.add("is-dirty");
    daemonSettingsState.innerHTML = `<span class="fluent icon-warning"></span> Unsaved changes`;
    saveDaemonSettings.disabled = false;
  });
});
saveDaemonSettings.addEventListener("click", () => {
  daemonSettingsState.classList.remove("is-dirty");
  daemonSettingsState.innerHTML = `<span class="fluent icon-check"></span> Settings saved`;
  saveDaemonSettings.disabled = true;
  showToast("Daemon settings saved");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    statusMenu.classList.remove("open");
    statusMenu.setAttribute("aria-hidden", "true");
    statusFilterButton.setAttribute("aria-expanded", "false");
    closeThemeMenu({ restoreFocus: true });
    closeAccountFlyout({ restoreFocus: true });
    closeCommandOverflow({ restoreFocus: true });
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".status-filter")) {
    statusMenu.classList.remove("open");
    statusMenu.setAttribute("aria-hidden", "true");
    statusFilterButton.setAttribute("aria-expanded", "false");
  }
  if (!event.target.closest(".theme-picker")) closeThemeMenu();
  if (!event.target.closest(".account-picker")) closeAccountFlyout();
  if (!event.target.closest(".command-overflow")) closeCommandOverflow();
});

function initTabKeyboardNavigation(selector) {
  document.querySelectorAll(selector).forEach((tabList) => {
    tabList.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const tabs = [...tabList.querySelectorAll("[role='tab']:not([disabled])")];
      const currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      event.preventDefault();
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  });
}

const themeOptions = {
  system: { label: "System defined", icon: "icon-system-theme", effectiveTheme: "light" },
  light: { label: "Light", icon: "icon-sun", effectiveTheme: "light" },
  dark: { label: "Dark", icon: "icon-moon", effectiveTheme: "dark" }
};

function closeThemeMenu({ restoreFocus = false } = {}) {
  if (!themeMenu || themeMenu.hidden) return;
  themeMenu.hidden = true;
  themeToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) themeToggle.focus();
}

function openThemeMenu() {
  closeAccountFlyout();
  themeMenu.hidden = false;
  themeToggle.setAttribute("aria-expanded", "true");
  themeMenu.querySelector("[aria-checked='true']")?.focus();
}

function setTheme(themeChoice) {
  const option = themeOptions[themeChoice] || themeOptions.system;
  document.body.dataset.theme = option.effectiveTheme;
  document.body.dataset.themePreference = themeChoice;
  themeToggle.setAttribute("aria-label", `Theme: ${option.label}`);
  themeToggle.dataset.titlebarTooltip = `Theme: ${option.label}`;
  themeToggle.innerHTML = `<span class="fluent ${option.icon}"></span>`;
  themeMenu.querySelectorAll("[role='menuitemradio']").forEach((item) => {
    item.setAttribute("aria-checked", String(item.dataset.themeChoice === themeChoice));
  });
}

themeToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  themeMenu.hidden ? openThemeMenu() : closeThemeMenu({ restoreFocus: true });
});

themeToggle.addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();
  openThemeMenu();
});

themeMenu.addEventListener("click", (event) => {
  const item = event.target.closest("[data-theme-choice]");
  if (!item) return;
  setTheme(item.dataset.themeChoice);
  closeThemeMenu({ restoreFocus: true });
});

themeMenu.addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const items = [...themeMenu.querySelectorAll("[role='menuitemradio']")];
  const currentIndex = items.indexOf(document.activeElement);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? items.length - 1
      : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
  items[nextIndex].focus();
});

setTheme("system");

let intuneAccountConnected = true;

function setAccountTab(tabName, { focus = false } = {}) {
  accountTabs.forEach((tab) => {
    const selected = tab.dataset.accountTab === tabName;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });

  accountPanels.forEach((panel) => {
    const selected = panel.dataset.accountPanel === tabName;
    panel.classList.toggle("active", selected);
    panel.hidden = !selected;
  });
}

function closeAccountFlyout({ restoreFocus = false } = {}) {
  if (!accountFlyout || accountFlyout.hidden) return;
  accountFlyout.hidden = true;
  accountToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) accountToggle.focus();
}

function openAccountFlyout() {
  closeThemeMenu();
  closeCommandOverflow();
  accountFlyout.hidden = false;
  accountToggle.setAttribute("aria-expanded", "true");
  accountTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.focus();
}

function syncIntuneAccountState() {
  intuneAccountRow.hidden = !intuneAccountConnected;
  intuneAccountEmpty.hidden = intuneAccountConnected;
  accountBadge.hidden = !intuneAccountConnected;
  accountToggle.setAttribute("aria-label", intuneAccountConnected ? "Account, 1 notification" : "Account");
}

function closeRemoveAccountDialog() {
  if (removeIntuneAccountDialog.open) removeIntuneAccountDialog.close();
}

accountToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  accountFlyout.hidden ? openAccountFlyout() : closeAccountFlyout({ restoreFocus: true });
});

accountToggle.addEventListener("keydown", (event) => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
  event.preventDefault();
  openAccountFlyout();
});

accountTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAccountTab(tab.dataset.accountTab));
});

accountFlyout.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) && document.activeElement?.matches("[data-account-tab]")) {
    event.preventDefault();
    const currentIndex = accountTabs.indexOf(document.activeElement);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? accountTabs.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + accountTabs.length) % accountTabs.length;
    setAccountTab(accountTabs[nextIndex].dataset.accountTab, { focus: true });
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = [...accountFlyout.querySelectorAll("button:not([disabled]):not([hidden]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.closest("[hidden]"));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

manageAccountAction.addEventListener("click", () => showToast("Account management would open in PacKit"));
refreshAccountAction.addEventListener("click", () => showToast("Account information refreshed"));
signOutAction.addEventListener("click", () => {
  closeAccountFlyout({ restoreFocus: true });
  showToast("Sign out is not connected in this prototype");
});

addIntuneAccount.addEventListener("click", () => {
  if (intuneAccountConnected) {
    showToast("Microsoft sign-in would open to add another Intune account");
    return;
  }
  intuneAccountConnected = true;
  syncIntuneAccountState();
  showToast("Intune account added");
});

removeIntuneAccount.addEventListener("click", () => {
  closeAccountFlyout();
  removeIntuneAccountDialog.showModal();
});
closeRemoveIntuneAccountDialog.addEventListener("click", closeRemoveAccountDialog);
cancelRemoveIntuneAccount.addEventListener("click", closeRemoveAccountDialog);
confirmRemoveIntuneAccount.addEventListener("click", () => {
  intuneAccountConnected = false;
  syncIntuneAccountState();
  closeRemoveAccountDialog();
  accountToggle.focus();
  showToast("Intune account removed");
});

syncIntuneAccountState();

document.querySelector("#copyProductCode")?.addEventListener("click", async () => {
  const productCode = document.querySelector("#productCode")?.textContent.trim() || "";
  try {
    await navigator.clipboard.writeText(productCode);
    showToast("Product code copied");
  } catch {
    showToast("Product code is ready to copy");
  }
});

minimizeWindow.addEventListener("click", () => hideApplication("minimized"));
maximizeWindow.addEventListener("click", () => setMaximized(!appWindow.classList.contains("maximized")));
closeWindow.addEventListener("click", () => hideApplication("closed"));
packitLauncher.addEventListener("click", restoreApplication);

titlebar.addEventListener("dblclick", (event) => {
  if (event.target.closest("button, a, input, select, [role='button']")) return;
  setMaximized(!appWindow.classList.contains("maximized"));
});

document.querySelectorAll("button[aria-label]").forEach((button) => {
  if (!button.title && !button.dataset.titlebarTooltip && !button.dataset.navTooltip && !button.dataset.tooltip && !button.textContent.trim()) {
    button.title = button.getAttribute("aria-label");
  }
});

document.querySelectorAll("[data-workspace-action]").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.workspaceAction === "new" ? "New workspace command opened" : "Open workspace command opened");
  });
});

document.querySelectorAll("[data-tool-name]").forEach((button) => {
  button.addEventListener("click", () => showToast(`${button.dataset.toolName} opened`));
});

function showSettingsRoot({ restoreFocus = false } = {}) {
  settingsRootPage.hidden = false;
  psadtTemplatesPage.hidden = true;
  settingsView.setAttribute("aria-labelledby", "settingsPageTitle");
  if (restoreFocus) document.querySelector("#managePsadtTemplates").focus();
}

function showPsadtTemplatesPage() {
  settingsRootPage.hidden = true;
  psadtTemplatesPage.hidden = false;
  settingsView.setAttribute("aria-labelledby", "psadtTemplatesPageTitle");
  document.querySelector("#psadtTemplatesPageTitle").focus();
}

document.querySelector("#managePsadtTemplates").addEventListener("click", showPsadtTemplatesPage);
document.querySelector("#backToSettings").addEventListener("click", () => showSettingsRoot({ restoreFocus: true }));

function syncPsadtTemplateDefaults() {
  const rows = [...psadtTemplatesPage.querySelectorAll(".psadt-template-row")];
  rows.forEach((row) => {
    const input = row.querySelector("input[type='radio']");
    row.classList.toggle("default", input.checked);
    input.setAttribute("aria-label", `Use ${row.querySelector("strong")?.textContent.trim()} as the default PSADT template`);
  });
  psadtTemplateCount.textContent = `${rows.length} ${rows.length === 1 ? "template" : "templates"}`;
}

document.querySelector("#addPsadtTemplate").addEventListener("click", () => {
  psadtTemplateFile.click();
});

psadtTemplateFile.addEventListener("change", () => {
  const file = psadtTemplateFile.files?.[0];
  if (!file) return;

  const row = document.createElement("div");
  row.className = "settings-row psadt-settings-template-row psadt-template-row custom";
  row.dataset.templateSource = "Local · Custom template";

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "default-psadt-template";
  radio.value = file.name;
  radio.id = `default-psadt-${Date.now()}`;
  radio.checked = true;

  const icon = document.createElement("span");
  icon.className = "settings-row-icon";
  icon.setAttribute("aria-hidden", "true");
  const folderIcon = document.createElement("span");
  folderIcon.className = "fluent icon-folder";
  icon.append(folderIcon);

  const copy = document.createElement("span");
  copy.className = "psadt-template-copy";
  const name = document.createElement("strong");
  name.textContent = file.name.replace(/\.[^.]+$/, "");
  const source = document.createElement("small");
  source.textContent = file.name;
  source.title = file.name;
  copy.append(name, source);

  const defaultControl = document.createElement("label");
  defaultControl.className = "psadt-default-control";
  defaultControl.htmlFor = radio.id;
  defaultControl.innerHTML = '<span>Default</span><span class="automation-toggle"><span class="toggle-track" aria-hidden="true"></span></span>';

  const remove = document.createElement("button");
  remove.className = "icon-btn psadt-delete-template";
  remove.type = "button";
  remove.dataset.deletePsadtTemplate = "";
  remove.setAttribute("aria-label", `Remove ${name.textContent}`);
  remove.innerHTML = '<span class="fluent icon-delete"></span>';

  row.append(radio, icon, copy, defaultControl, remove);
  customPsadtTemplateList.append(row);
  syncPsadtTemplateDefaults();
  psadtTemplateFile.value = "";
  showToast(`${name.textContent} added and set as default`);
});

psadtTemplatesPage.addEventListener("change", (event) => {
  if (!event.target.matches("input[name='default-psadt-template']")) return;
  syncPsadtTemplateDefaults();
  const template = getDefaultPsadtTemplate();
  if (template) showToast(`${template.name} is now the default template`);
});

psadtTemplatesPage.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-delete-psadt-template]");
  if (!remove) return;
  const row = remove.closest(".psadt-template-row");
  const removedName = row.querySelector("strong")?.textContent.trim() || "Template";
  const removedDefault = row.querySelector("input[type='radio']").checked;
  row.remove();
  if (removedDefault) {
    const fallback = psadtTemplatesPage.querySelector("input[name='default-psadt-template']");
    if (fallback) fallback.checked = true;
  }
  syncPsadtTemplateDefaults();
  showToast(`${removedName} removed`);
});

document.querySelector("#downloadLatestPsadt").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="fluent icon-refresh"></span> Checking...';
  window.setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span class="fluent icon-download"></span> Download';
    showToast("PSADT 4.1.8 is already available");
  }, 650);
});

syncPsadtTemplateDefaults();

saveApplicationFragments.addEventListener("change", () => {
  showToast(saveApplicationFragments.checked ? "Applications will be saved as fragments" : "Applications will be stored inside the project file");
});

document.querySelector("#checkForUpdates").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="fluent icon-refresh"></span> Checking...';
  settingsUpdateStatus.hidden = true;
  window.setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span class="fluent icon-refresh"></span> Check for updates';
    settingsUpdateStatus.hidden = false;
  }, 650);
});

initTabKeyboardNavigation(".tabs, .strategy-tabs, .history-switch");

updateLifecyclePanel.append(automationTemplateSummary);
updateLifecyclePanel.append(versionAutomationRecord);
renderApps();
setCommandContext("version");
syncStrategyTemplateUI();
syncAppliedTemplateUI();
syncVersionAutomationRecord();
selectAutomationTemplate();
syncSearchControls();
syncInstallationMethod();
syncSignatureMethod();
syncSignatureEnabled();
syncTrustedSigningCorrelationField();
initCollapsibleSections();
