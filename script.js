const appCatalog = [
  { name: "Contoso Finance Tools", publisher: "Contoso", update: "New", status: "", versions: "3 versions", source: "-", arch: "x86", version: "12.3.10", state: "all" },
  { name: "Fabrikam Helpdesk Agent", publisher: "Fabrikam", update: "", status: "Not configured", versions: "No versions", source: "-", arch: "-", version: "-", state: "all", empty: true },
  { name: "Tailspin Inventory Client", publisher: "Tailspin Toys", update: "", status: "⚠ Configuration issues", versions: "13 versions", source: "WinGet", arch: "x64", version: "12.3.10", state: "issue" },
  { name: "Northwind VPN Client", publisher: "Northwind Traders", update: "", status: "× Upload to SCCM failed", versions: "13 versions", source: "Local", arch: "x64", version: "12.3.10", state: "failed" },
  { name: "Skype for Business", publisher: "Microsoft", update: "⇩ Update available", status: "✓ Uploaded to Intune", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Project", publisher: "Microsoft", update: "⇩ Update available", status: "✓ Uploads successful", versions: "3 version", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Visio", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft PowerToys", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Loop", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "3 versions", source: "Local", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft Whiteboard", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "success" },
  { name: "Microsoft To Do", publisher: "Microsoft", update: "", status: "", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "all" },
  { name: "Microsoft Planner", publisher: "Microsoft", update: "", status: "", versions: "3 versions", source: "WinGet", arch: "x86", version: "12.3.10", state: "all" }
];

const generatedApps = [
  { name: "Microsoft Edge", publisher: "Microsoft", update: "Update available", status: "✓ Uploaded to Intune", versions: "9 versions", source: "WinGet", arch: "x64", version: "124.0.2478", state: "success" },
  { name: "Microsoft Teams", publisher: "Microsoft", update: "Update available", status: "⚠ Configuration issues", versions: "14 versions", source: "WinGet", arch: "x64", version: "24102.2223", state: "issue" },
  { name: "OneDrive", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "7 versions", source: "WinGet", arch: "x64", version: "24.076.0414", state: "success" },
  { name: "Power BI Desktop", publisher: "Microsoft", update: "Update available", status: "× Upload to SCCM failed", versions: "18 versions", source: "Local", arch: "x64", version: "2.128.952", state: "failed" },
  { name: "Visual Studio Code", publisher: "Microsoft", update: "Update available", status: "✓ Uploaded to Intune", versions: "21 versions", source: "WinGet", arch: "x64", version: "1.89.0", state: "success" },
  { name: "Azure Data Studio", publisher: "Microsoft", update: "", status: "⚠ Configuration issues", versions: "6 versions", source: "Local", arch: "x64", version: "1.49.1", state: "issue" },
  { name: "Remote Desktop", publisher: "Microsoft", update: "", status: "✓ Uploaded to Intune", versions: "5 versions", source: "WinGet", arch: "x64", version: "1.2.5405", state: "success" },
  { name: "Windows Admin Center", publisher: "Microsoft", update: "Update available", status: "× Upload to SCCM failed", versions: "4 versions", source: "Local", arch: "x64", version: "2311.0", state: "failed" },
  { name: "7-Zip", publisher: "Igor Pavlov", update: "Update available", status: "✓ Uploaded to Intune", versions: "11 versions", source: "WinGet", arch: "x64", version: "24.05", state: "success" },
  { name: "Adobe Acrobat Reader", publisher: "Adobe", update: "Update available", status: "⚠ Configuration issues", versions: "19 versions", source: "WinGet", arch: "x64", version: "24.002", state: "issue" },
  { name: "Google Chrome", publisher: "Google", update: "Update available", status: "✓ Uploaded to Intune", versions: "23 versions", source: "WinGet", arch: "x64", version: "124.0.6367", state: "success" },
  { name: "Mozilla Firefox", publisher: "Mozilla", update: "", status: "✓ Uploaded to Intune", versions: "17 versions", source: "WinGet", arch: "x64", version: "126.0", state: "success" },
  { name: "Notepad++", publisher: "Notepad++ Team", update: "Update available", status: "✓ Uploads successful", versions: "15 versions", source: "WinGet", arch: "x64", version: "8.6.7", state: "success" },
  { name: "VLC Media Player", publisher: "VideoLAN", update: "", status: "⚠ Configuration issues", versions: "10 versions", source: "Local", arch: "x64", version: "3.0.20", state: "issue" },
  { name: "Git", publisher: "Git Project", update: "Update available", status: "✓ Uploaded to Intune", versions: "12 versions", source: "WinGet", arch: "x64", version: "2.45.1", state: "success" },
  { name: "GitHub Desktop", publisher: "GitHub", update: "", status: "× Upload to SCCM failed", versions: "8 versions", source: "WinGet", arch: "x64", version: "3.3.18", state: "failed" },
  { name: "Docker Desktop", publisher: "Docker", update: "Update available", status: "⚠ Configuration issues", versions: "13 versions", source: "Local", arch: "x64", version: "4.30.0", state: "issue" },
  { name: "Postman", publisher: "Postman", update: "", status: "✓ Uploaded to Intune", versions: "16 versions", source: "WinGet", arch: "x64", version: "11.1.13", state: "success" },
  { name: "Slack", publisher: "Salesforce", update: "Update available", status: "✓ Uploaded to Intune", versions: "20 versions", source: "WinGet", arch: "x64", version: "4.38.127", state: "success" },
  { name: "Zoom Workplace", publisher: "Zoom", update: "Update available", status: "× Upload to SCCM failed", versions: "22 versions", source: "Local", arch: "x64", version: "6.0.10", state: "failed" },
  { name: "Cisco Webex", publisher: "Cisco", update: "", status: "✓ Uploaded to Intune", versions: "9 versions", source: "WinGet", arch: "x64", version: "44.5.0", state: "success" },
  { name: "Citrix Workspace", publisher: "Cloud Software Group", update: "Update available", status: "⚠ Configuration issues", versions: "12 versions", source: "Local", arch: "x64", version: "2403.1", state: "issue" },
  { name: "FortiClient VPN", publisher: "Fortinet", update: "", status: "× Upload to SCCM failed", versions: "6 versions", source: "Local", arch: "x64", version: "7.2.4", state: "failed" },
  { name: "GlobalProtect", publisher: "Palo Alto Networks", update: "Update available", status: "✓ Uploaded to Intune", versions: "7 versions", source: "Local", arch: "x64", version: "6.2.3", state: "success" },
  { name: "PuTTY", publisher: "Simon Tatham", update: "", status: "✓ Uploaded to Intune", versions: "5 versions", source: "WinGet", arch: "x64", version: "0.81", state: "success" },
  { name: "WinSCP", publisher: "Martin Prikryl", update: "Update available", status: "✓ Uploaded to Intune", versions: "13 versions", source: "WinGet", arch: "x64", version: "6.3.3", state: "success" },
  { name: "FileZilla Client", publisher: "FileZilla Project", update: "", status: "⚠ Configuration issues", versions: "9 versions", source: "WinGet", arch: "x64", version: "3.67.0", state: "issue" },
  { name: "KeePass", publisher: "Dominik Reichl", update: "Update available", status: "✓ Uploads successful", versions: "6 versions", source: "Local", arch: "x64", version: "2.57", state: "success" },
  { name: "1Password", publisher: "AgileBits", update: "", status: "✓ Uploaded to Intune", versions: "11 versions", source: "WinGet", arch: "x64", version: "8.10.32", state: "success" },
  { name: "Figma Desktop", publisher: "Figma", update: "Update available", status: "✓ Uploaded to Intune", versions: "14 versions", source: "WinGet", arch: "x64", version: "124.6.5", state: "success" },
  { name: "Miro", publisher: "Miro", update: "", status: "⚠ Configuration issues", versions: "8 versions", source: "Local", arch: "x64", version: "0.9.93", state: "issue" },
  { name: "Jira Cloud", publisher: "Atlassian", update: "", status: "", versions: "2 versions", source: "Local", arch: "x64", version: "2.1.4", state: "all" },
  { name: "Tableau Desktop", publisher: "Salesforce", update: "Update available", status: "× Upload to SCCM failed", versions: "10 versions", source: "Local", arch: "x64", version: "2024.1", state: "failed" },
  { name: "SAP GUI", publisher: "SAP", update: "", status: "✓ Uploaded to Intune", versions: "5 versions", source: "Local", arch: "x64", version: "8.00", state: "success" },
  { name: "ServiceNow Agent", publisher: "ServiceNow", update: "Update available", status: "⚠ Configuration issues", versions: "4 versions", source: "Local", arch: "x64", version: "3.5.2", state: "issue" },
  { name: "Box Drive", publisher: "Box", update: "", status: "✓ Uploaded to Intune", versions: "8 versions", source: "WinGet", arch: "x64", version: "2.38.146", state: "success" },
  { name: "Dropbox", publisher: "Dropbox", update: "Update available", status: "✓ Uploaded to Intune", versions: "16 versions", source: "WinGet", arch: "x64", version: "199.4.6287", state: "success" },
  { name: "RingCentral", publisher: "RingCentral", update: "", status: "× Upload to SCCM failed", versions: "7 versions", source: "Local", arch: "x64", version: "24.2.10", state: "failed" },
  { name: "Bluebeam Revu", publisher: "Bluebeam", update: "Update available", status: "⚠ Configuration issues", versions: "9 versions", source: "Local", arch: "x64", version: "21.1.0", state: "issue" },
  { name: "Oracle Java Runtime", publisher: "Oracle", update: "Update available", status: "✓ Uploaded to Intune", versions: "18 versions", source: "Local", arch: "x64", version: "8u411", state: "success" }
];

const apps = [...appCatalog, ...generatedApps];

let statusFilter = "all";
let updatesOnly = false;
let searchQuery = "";

const appList = document.querySelector("#appList");
const listView = document.querySelector("#listView");
const automationView = document.querySelector("#automationView");
const detailView = document.querySelector("#detailView");
const shell = document.querySelector("#shell");
const toast = document.querySelector("#toast");
const statusMenu = document.querySelector("#statusMenu");
const searchInput = document.querySelector("#applicationSearch");
const clearSearch = document.querySelector("#clearApplicationSearch");
const wrapWithPsadt = document.querySelector("#wrapWithPsadt");
const wrapperEmptyState = document.querySelector("#wrapperEmptyState");
const wrapperConfiguredState = document.querySelector("#wrapperConfiguredState");
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
const updateLifecyclePanel = document.querySelector("#updateLifecyclePanel");
const automationTemplateSummary = document.querySelector("#automationTemplateSummary");
const versionAutomationRecord = document.querySelector("#versionAutomationRecord");
const viewAppliedSnapshot = document.querySelector("#viewAppliedSnapshot");
const appliedSnapshot = document.querySelector("#appliedSnapshot");
const versionAutomationRecordTitle = document.querySelector("#versionAutomationRecordTitle");
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
const automationEditorTemplateName = document.querySelector("#automationEditorTemplateName");
const automationEditorTemplateMeta = document.querySelector("#automationEditorTemplateMeta");
const themeToggle = document.querySelector("#themeToggle");
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
const commandAppIcon = document.querySelector("#commandAppIcon");
const commandAppName = document.querySelector("#commandAppName");
const versionList = document.querySelector("#versionList");
const versionEmptyNote = document.querySelector("#versionEmptyNote");
const appLevelNav = document.querySelector("#appLevelNav");
const versionTabs = document.querySelector("#versionTabs");
const configurationEmptyState = document.querySelector("#configurationEmptyState");
const applicationNameInput = document.querySelector("#applicationNameInput");
const applicationVendorInput = document.querySelector("#applicationVendorInput");
const applicationDescriptionInput = document.querySelector("#applicationDescriptionInput");
const applicationIconPreview = document.querySelector("#applicationIconPreview");
const automationTemplateDialogTitle = document.querySelector("#automationTemplateDialogTitle");
const automationTemplateDialogDescription = document.querySelector("#automationTemplateDialogDescription");
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

const commandSets = {
  version: [
    { label: "Upload to Intune", image: "./assets/figma/icon-intune.png", endIcon: "icon-chevron-down" },
    { label: "Upload to MECM", image: "./assets/figma/icon-sccm.png" },
    { label: "Manual Update", icon: "icon-download", secondary: true },
    { label: "Update from WinGet", icon: "icon-download", meta: "v 12.3.124", secondary: true }
  ]
};

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

const versionAutomationRecords = {
  "12.3.123": { source: "12.3.122", template: "Guided Intune Update", templateVersion: "1.4", createdOn: "24 Sep 2026, 13:42", intune: "applied", mecm: "planned" },
  "12.3.122": { source: "12.3.121", template: "Guided Intune Update", templateVersion: "1.3", createdOn: "12 Sep 2026, 09:18", intune: "applied", mecm: "applied" },
  "12.3.121": { source: "12.3.120", template: "Guided Intune Update", templateVersion: "1.3", createdOn: "28 Aug 2026, 15:06", intune: "applied", mecm: "applied" },
  "12.3.120": { source: "12.3.119", template: "Guided Intune Update", templateVersion: "1.2", createdOn: "10 Aug 2026, 11:27", intune: "applied", mecm: "applied" },
  "12.3.119": { source: "12.3.118", template: "Guided Intune Update", templateVersion: "1.2", createdOn: "22 Jul 2026, 08:54", intune: "applied", mecm: "applied" }
};
let selectedVersion = "12.3.123";
const modifiedVersionRecords = new Set();

function renderDeploymentTargetStatus(article, status) {
  const state = article.querySelector("header > .status");
  const applied = status === "applied";
  state.className = `status ${applied ? "success" : "issue"}`;
  state.innerHTML = `<span class="fluent ${applied ? "icon-check" : "icon-history"}"></span> ${applied ? "Applied" : "Planned"}`;
  const execution = article.querySelector("dl > div:last-child dd");
  if (article.querySelector("header strong")?.textContent === "MECM") {
    execution.textContent = applied ? "Completed" : "Waiting for MECM upload";
  }
}

function syncVersionAutomationRecord(version = selectedVersion) {
  selectedVersion = version;
  const record = versionAutomationRecords[version] || versionAutomationRecords["12.3.123"];
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
}

function selectAutomationTemplate(templateId = appliedStrategyTemplateId, { focus = false } = {}) {
  const template = automationTemplates[templateId] || automationTemplates.guided;
  let selectedRow = document.querySelector(`[data-template-id="${templateId}"]`);
  if (!selectedRow && automationTemplates[templateId]) {
    const list = document.querySelector("#templatesAutomationPanel .workflow-list");
    list.insertAdjacentHTML("beforeend", `
      <button class="workflow-row" type="button" role="option" aria-selected="false" data-template-id="${templateId}">
        <span><strong>${template.name}</strong><small>v${template.version} • Used by ${template.applications} application${template.applications === 1 ? "" : "s"}</small></span>
        <span class="status success"><span class="fluent icon-check"></span> Active</span>
      </button>
    `);
    selectedRow = list.lastElementChild;
    selectedRow.addEventListener("click", () => selectAutomationTemplate(templateId));
  }
  document.querySelectorAll("[data-template-id]").forEach((row) => {
    const active = row.dataset.templateId === templateId;
    row.classList.toggle("active", active);
    row.setAttribute("aria-selected", String(active));
    if (active && focus) row.focus();
  });
  automationEditorTemplateName.textContent = template.name;
  automationEditorTemplateMeta.textContent = `Version ${template.version} • Used by ${template.applications} application${template.applications === 1 ? "" : "s"}`;
}

function manageCurrentAutomationTemplate() {
  showWorkspaceView("automation");
  setAutomationTab("templates");
  selectAutomationTemplate(appliedStrategyTemplateId, { focus: true });
}

function getVersionManagedControls() {
  return [...document.querySelectorAll(".tab-panel input, .tab-panel select, .tab-panel textarea")];
}

function captureVersionConfiguration() {
  return {
    controls: getVersionManagedControls().map((control) => ({
      value: control.value,
      checked: control.checked
    })),
    wrapperConfigured: !wrapperConfiguredState.hidden
  };
}

function restoreVersionConfiguration(snapshot) {
  getVersionManagedControls().forEach((control, index) => {
    const stored = snapshot.controls[index];
    if (!stored) return;
    control.value = stored.value;
    if (control.type === "checkbox" || control.type === "radio") control.checked = stored.checked;
  });
  wrapperConfiguredState.hidden = !snapshot.wrapperConfigured;
  wrapperEmptyState.hidden = snapshot.wrapperConfigured;
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
  commandInlineControls.innerHTML = `
    <button class="applied-template-command" type="button" aria-haspopup="dialog" title="${versionConfigurationDirty ? "Save or cancel changes before changing the template" : "Change automation template"}" ${versionConfigurationDirty ? "disabled" : ""}>
      <span class="fluent icon-workflow" aria-hidden="true"></span>
      <span>
        <small>Automation template</small>
        <strong>${appliedStrategyTemplateName}</strong>
      </span>
      <span class="fluent icon-chevron-down" aria-hidden="true"></span>
    </button>
  `;
  commandInlineControls.querySelector(".applied-template-command")?.addEventListener("click", openAutomationTemplateDialog);
}

function syncAppliedTemplateUI({ rerenderCommands = true } = {}) {
  informationTemplateName.textContent = appliedStrategyTemplateName;
  informationTemplateMeta.textContent = `Version ${appliedStrategyTemplateVersion} • Used by ${appliedStrategyTemplateApplications} application${appliedStrategyTemplateApplications === 1 ? "" : "s"}`;

  if (versionConfigurationDirty) {
    informationTemplateState.innerHTML = `<span class="fluent icon-warning"></span> Unsaved configuration changes`;
  } else if (strategyHasApplicationOverride) {
    informationTemplateState.innerHTML = `<span class="fluent icon-copy"></span> Application override`;
  } else {
    informationTemplateState.innerHTML = `<span class="fluent icon-lock"></span> Inherited from template`;
  }

  provenanceConfigurationState.innerHTML = modifiedVersionRecords.has(selectedVersion)
    ? `<span class="status issue"><span class="fluent icon-copy"></span> Modified after creation</span>`
    : `<span class="status success"><span class="fluent icon-check"></span> Unchanged since creation</span>`;

  changeAutomationTemplate.disabled = versionConfigurationDirty;
  if (contextCommandBar.dataset.commandContext === "version") {
    commandStatus.hidden = versionConfigurationDirty;
    renderAppliedTemplateControl();
    if (rerenderCommands) renderContextCommands("version");
  }
}

function markVersionConfigurationDirty() {
  if (versionConfigurationDirty) return;
  versionConfigurationDirty = true;
  syncAppliedTemplateUI();
}

function cancelVersionConfigurationEdits() {
  restoreVersionConfiguration(lastSavedVersionConfiguration);
  versionConfigurationDirty = false;
  syncAppliedTemplateUI();
  showToast("Configuration changes canceled");
}

function openSaveConfigurationDialog() {
  const defaultScope = saveConfigurationDialog.querySelector("input[value='application']");
  defaultScope.checked = true;
  newConfigurationTemplateNameField.hidden = true;
  sharedTemplateImpact.hidden = true;
  saveConfigurationDialog.querySelector(".shared-template-option small").textContent = `Replace ${appliedStrategyTemplateName} with this configuration.`;
  sharedTemplateImpact.querySelector("strong").textContent = `${appliedStrategyTemplateApplications} applications use this template.`;
  confirmSaveConfiguration.innerHTML = `<span class="fluent icon-check"></span> Save application override`;
  saveConfigurationDialog.showModal();
}

function syncSaveConfigurationDialog() {
  const scope = saveConfigurationDialog.querySelector("input[name='configuration-save-scope']:checked")?.value || "application";
  newConfigurationTemplateNameField.hidden = scope !== "new";
  sharedTemplateImpact.hidden = scope !== "template";
  const labels = {
    application: "Save application override",
    new: "Create and apply template",
    template: `Update template for ${appliedStrategyTemplateApplications} apps`
  };
  confirmSaveConfiguration.innerHTML = `<span class="fluent icon-check"></span> ${labels[scope]}`;
  if (scope === "new") newConfigurationTemplateName.focus();
}

function saveVersionConfiguration() {
  const scope = saveConfigurationDialog.querySelector("input[name='configuration-save-scope']:checked")?.value || "application";
  if (scope === "new" && !newConfigurationTemplateName.value.trim()) {
    newConfigurationTemplateName.setCustomValidity("Enter a template name");
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

  versionConfigurationDirty = false;
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
    wrapperEmptyState.hidden = true;
    wrapperConfiguredState.hidden = false;
  } else if (templateId === "winget") {
    detectionArchitecture.selectedIndex = 0;
    minimumOperatingSystem.value = "Windows 10 1809";
    detectionMethod.selectedIndex = 0;
    wrapperEmptyState.hidden = false;
    wrapperConfiguredState.hidden = true;
  }

  automationTemplateSnapshots[templateId] = captureVersionConfiguration();
  return automationTemplateSnapshots[templateId];
}

function openAutomationTemplateDialog() {
  initializingEmptyApplication = false;
  automationTemplateDialogTitle.textContent = "Change automation template";
  automationTemplateDialogDescription.textContent = "Replacing the template resets its managed configuration for this application.";
  automationTemplateDialog.querySelectorAll("input[name='automation-template']").forEach((input) => {
    input.checked = input.value === appliedStrategyTemplateId;
  });
  replaceTemplateImpact.querySelector("span:last-child").textContent = versionConfigurationDirty || strategyHasApplicationOverride
    ? "Applying another template will discard unsaved changes or the current application override and replace all template-managed defaults."
    : "Information, Assignments, Detection, Scope Tags, and Wrapper defaults will be replaced.";
  automationTemplateDialog.showModal();
}

function openInitialAutomationTemplateDialog() {
  initializingEmptyApplication = true;
  automationTemplateDialogTitle.textContent = "Apply automation template";
  automationTemplateDialogDescription.textContent = `Choose the managed defaults for ${selectedApplication.name}.`;
  automationTemplateDialog.querySelectorAll("input[name='automation-template']").forEach((input) => {
    input.checked = input.value === "guided";
  });
  replaceTemplateImpact.querySelector("span:last-child").textContent = "The selected template will create the first version and populate its managed configuration defaults.";
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
    strategyTemplateState.innerHTML = `<span class="fluent icon-warning"></span> Editing shared template`;
    strategyEditScopeTitle.textContent = `Shared template: ${appliedStrategyTemplateName}`;
    strategyEditScopeDescription.textContent = "Saving can affect every application that uses this template.";
  } else if (strategyEditMode === "new") {
    const draftName = newStrategyTemplateName.value.trim() || "Untitled update strategy";
    strategyTemplateState.innerHTML = `<span class="fluent icon-add"></span> Creating new template`;
    strategyEditScopeTitle.textContent = `New template draft: ${draftName}`;
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

function renderContextCommands(context = "version") {
  if (context === "updateStrategy") {
    const strategySaveLabels = {
      application: "Save application override",
      template: "Update shared template",
      new: "Create and apply template"
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

  const commands = commandSets[context] || [];
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
    button.addEventListener("click", () => showToast(command.label));
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
      showToast(command.label);
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
    contextCommandBar.querySelector("[data-draft-action='save']")?.addEventListener("click", () => showToast("Draft configuration saved"));
    return;
  }

  if (context === "updateStrategy" || context === "history") {
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
  commandContextMeta.textContent = "Version 12.3.123";
  commandStatus.hidden = false;
  commandStatus.className = "new-label status success";
  commandStatus.innerHTML = `<span class="fluent icon-check"></span> Upload success`;
  renderAppliedTemplateControl();
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

function statusClass(status) {
  if (status.includes("failed")) return "failed";
  if (status.includes("issues")) return "issue";
  if (status.includes("Uploaded") || status.includes("Uploads")) return "success";
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
  if (status.includes("Uploaded") || status.includes("Uploads")) return `<span class="fluent icon-check"></span>${status.replace("✓ ", "")}`;
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
      app.status
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
      <span>Actions</span>
    </div>
  ` + filtered.map((app, index) => `
    <button class="app-row" role="option" aria-selected="false" type="button" data-index="${index}">
      <span class="app-name">
        ${renderAppIcon(app)}
        <span><strong>${app.name}</strong><small>Published by ${app.publisher}</small></span>
      </span>
      <span class="linkish icon-text">${renderUpdate(app.update)}</span>
      <span class="status icon-text ${statusClass(app.status)}">${renderStatus(app.status)}</span>
      <span>${app.versions}</span>
      <span>${app.source}</span>
      <span><small>Arch</small><br><span class="linkish">${app.arch}</span></span>
      <span><small>Latest version</small><br><span class="linkish">${app.version}</span></span>
      <span><span class="fluent icon-more"></span></span>
    </button>
  `).join("");

  document.querySelectorAll(".app-row").forEach((row) => {
    row.addEventListener("click", () => openDetail("information", filtered[Number(row.dataset.index)]));
  });
}

function syncSearchControls() {
  const hasQuery = searchInput.value.length > 0;
  clearSearch.hidden = !hasQuery;
}

function setSectionExpanded(section, expanded) {
  const toggle = section.querySelector(":scope > header button");
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
    const toggle = header?.querySelector("button");
    if (!header || !toggle) return;

    setSectionExpanded(section, true);

    header.addEventListener("click", () => {
      const expanded = !section.classList.contains("collapsed");
      setSectionExpanded(section, !expanded);
    });
  });
}

function syncDetailApplicationIdentity(app) {
  const icon = getAppIcon(app);
  const foreground = getTileTextColor(icon.color);
  [detailAppIcon, commandAppIcon, applicationIconPreview].forEach((tile) => {
    tile.textContent = icon.label;
    tile.style.setProperty("--tile-bg", icon.color);
    tile.style.setProperty("--tile-fg", foreground);
  });
  detailAppName.textContent = app.name;
  detailAppPublisher.textContent = `Published by ${app.publisher}`;
  commandAppName.textContent = app.name;
  applicationNameInput.value = app.name;
  applicationVendorInput.value = app.publisher;
  applicationDescriptionInput.value = app.name === "Contoso Finance Tools"
    ? "Finance workstation utilities packaged for Intune deployment"
    : "";
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
      const activeTabName = document.querySelector(".tab.active")?.dataset.tab || "information";
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
  document.querySelector("#packageSyncInfo").hidden = false;
}

function restoreDefaultPackagePresentation() {
  document.querySelector("#productCode").textContent = defaultPackagePresentation.productCode;
  document.querySelector("#packageArchitecture").textContent = defaultPackagePresentation.architecture;
  document.querySelector("#sourceFolderValue").textContent = defaultPackagePresentation.sourceFolder;
  document.querySelector("#wingetLinkStatus").hidden = false;
  document.querySelector("#resourceItemCount").textContent = defaultPackagePresentation.resourceItems;
  document.querySelector("#resourceSize").textContent = defaultPackagePresentation.resourceSize;
  document.querySelector("#packageSyncInfo").hidden = false;
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
  document.querySelector("#packageSyncInfo").hidden = true;
  wrapperEmptyState.hidden = false;
  wrapperConfiguredState.hidden = true;
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
  setTab("information");
  renderApps();
  document.querySelector("#informationPanel input")?.focus();
}

function cancelInitialConfiguration() {
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
  selectedApplication = app;
  listView.classList.remove("active");
  automationView.classList.remove("active");
  detailView.classList.add("active");
  shell.classList.add("detail-mode");
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
    versionList.innerHTML = defaultVersionListMarkup;
    selectedVersion = "12.3.123";
    bindVersionButtons();
    automationTemplateSummary.hidden = false;
    versionAutomationRecord.hidden = false;
  }
  setTab(tabName);
  if (!app.configurationMode) syncVersionAutomationRecord(selectedVersion);
}

function showList() {
  automationView.classList.remove("active");
  detailView.classList.remove("active");
  listView.classList.add("active");
  shell.classList.remove("detail-mode");
  setSidebarActive("applications");
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
  if (viewName === "applications") {
    setPrimaryNavigation("applications");
    showList();
    return;
  }

  if (viewName === "automation") {
    listView.classList.remove("active");
    detailView.classList.remove("active");
    automationView.classList.add("active");
    shell.classList.remove("detail-mode");
    setPrimaryNavigation("automation");
    return;
  }

  showToast(`${viewName === "dashboard" ? "Dashboard" : "Digital Signature"} section is not built yet`);
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

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

function setMaximized(maximized) {
  desktop.classList.toggle("is-maximized", maximized);
  appWindow.classList.toggle("maximized", maximized);
  maximizeWindow.setAttribute("aria-pressed", String(maximized));
  maximizeWindow.setAttribute("aria-label", maximized ? "Restore" : "Maximize");
  maximizeWindow.title = maximized ? "Restore" : "Maximize";
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
  document.querySelectorAll("[data-automation-tab]").forEach((tab) => {
    const active = tab.dataset.automationTab === tabName;
    tab.classList.toggle("active", active);
    if (active) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  document.querySelectorAll(".automation-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${tabName}AutomationPanel`);
  if (target) target.classList.add("active");

  const commandLabels = {
    daemon: ["New Workflow", "Open Workflow Folder", "Save Workflow"],
    templates: ["New Template", "Import Template", "Save Template"],
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
wrapWithPsadt.addEventListener("click", () => {
  wrapperEmptyState.hidden = true;
  wrapperConfiguredState.hidden = false;
  markVersionConfigurationDirty();
  showToast("PSADT wrapper created from template");
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
    newStrategyTemplateName.setCustomValidity("Enter a template name");
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

document.querySelectorAll(".automation-view button:not([data-automation-tab]):not(.workflow-row)").forEach((button) => {
  button.addEventListener("click", () => showToast(button.textContent.trim()));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    statusMenu.classList.remove("open");
    statusMenu.setAttribute("aria-hidden", "true");
    statusFilterButton.setAttribute("aria-expanded", "false");
    closeCommandOverflow({ restoreFocus: true });
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".status-filter")) {
    statusMenu.classList.remove("open");
    statusMenu.setAttribute("aria-hidden", "true");
    statusFilterButton.setAttribute("aria-expanded", "false");
  }
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

function setTheme(theme) {
  const dark = theme === "dark";
  document.body.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
  themeToggle.title = dark ? "Use light theme" : "Use dark theme";
  themeToggle.innerHTML = `<span class="fluent ${dark ? "icon-sun" : "icon-moon"}"></span>`;
}

themeToggle.addEventListener("click", () => {
  setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
});

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

document.querySelectorAll(".info-tip").forEach((tip) => {
  tip.tabIndex = 0;
  tip.setAttribute("role", "img");
  tip.setAttribute("aria-label", tip.dataset.tooltip || "More information");
});

document.querySelectorAll("button[aria-label]").forEach((button) => {
  if (!button.title && !button.textContent.trim()) button.title = button.getAttribute("aria-label");
});

initTabKeyboardNavigation(".tabs, .strategy-tabs, .history-switch");

updateLifecyclePanel.prepend(automationTemplateSummary);
updateLifecyclePanel.append(versionAutomationRecord);
renderApps();
setCommandContext("version");
syncStrategyTemplateUI();
syncAppliedTemplateUI();
syncVersionAutomationRecord();
selectAutomationTemplate();
syncSearchControls();
initCollapsibleSections();
