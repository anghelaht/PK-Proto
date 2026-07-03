const appCatalog = [
  { name: "Contoso Finance Tools", publisher: "Contoso", update: "New", status: "", versions: "3 versions", source: "-", arch: "x86", version: "12.3.10", state: "all" },
  { name: "Fabrikam Helpdesk Agent", publisher: "Fabrikam", update: "PSADT created", status: "", versions: "3 versions", source: "-", arch: "x86", version: "12.3.10", state: "all" },
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
let guidedAutomationEnabled = false;

const commandSets = {
  version: [
    { label: "Manual Update", icon: "icon-download" },
    { label: "Update from WinGet", icon: "icon-download", meta: "v 12.3.124" },
    { label: "Upload to Intune⌄", image: "./assets/figma/icon-intune.png" },
    { label: "Upload to MECM", image: "./assets/figma/icon-sccm.png" }
  ]
};

function renderCommandIcon(command) {
  if (command.image) return `<img class="service-icon" src="${command.image}" alt="" />`;
  if (command.icon) return `<span class="fluent ${command.icon}"></span>`;
  return "";
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
    contextCommandBar.dataset.commandContext = context;
    contextCommandBar.innerHTML = `
      ${guidedAutomationEnabled ? "" : `
        <button type="button" data-command-action="manual-update">
          <span class="fluent icon-download"></span>
          <span>Manual Update</span>
        </button>
      `}
      ${guidedAutomationEnabled ? `
        <button class="primary-btn" type="button" data-command-action="save-update-strategy">
          <span class="fluent icon-check"></span>
          <span>Save Update Strategy</span>
        </button>
      ` : ""}
    `;

    const manualUpdate = contextCommandBar.querySelector("[data-command-action='manual-update']");
    manualUpdate?.addEventListener("click", () => showToast("Manual update started"));
    contextCommandBar.querySelector("[data-command-action='save-update-strategy']")?.addEventListener("click", () => {
      showToast("Update strategy saved");
    });
    return;
  }

  const commands = commandSets[context] || [];
  contextCommandBar.dataset.commandContext = context;
  contextCommandBar.innerHTML = commands.map((command) => `
    <button type="button" ${command.iconOnly ? `aria-label="${command.label}"` : ""}>
      ${renderCommandIcon(command)}
      ${command.iconOnly ? "" : `<span>${command.label}</span>`}
      ${command.meta ? `<small>${command.meta}</small>` : ""}
    </button>
  `).join("");

  contextCommandBar.querySelectorAll("button").forEach((button, index) => {
    const command = commands[index];
    button.addEventListener("click", () => showToast(command.label));
  });
}

function setCommandContext(context = "version") {
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
  commandStatus.textContent = "New";
  commandInlineControls.innerHTML = "";
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
  "1Password": ["1P", "#5b6ee1"],
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
  const [label, color] = appIconMeta[app.name] || [fallback, "#605e5c"];
  return { label, color };
}

function renderAppIcon(app, size = "") {
  const icon = getAppIcon(app);
  return `<span class="app-icon-tile ${size}" style="--tile-bg: ${icon.color};">${icon.label}</span>`;
}

function statusClass(status) {
  if (status.includes("failed")) return "failed";
  if (status.includes("issues")) return "issue";
  if (status.includes("Uploaded") || status.includes("Uploads")) return "success";
  return "";
}

function renderUpdate(update) {
  if (update.includes("Update")) return `<span class="fluent icon-download"></span>${update.replace("⇩ ", "")}`;
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
    <button class="app-row" type="button" data-index="${index}">
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
    row.addEventListener("click", () => openDetail("information"));
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
    toggle.textContent = expanded ? "⌃" : "⌄";
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

function openDetail(tabName) {
  listView.classList.remove("active");
  detailView.classList.add("active");
  shell.classList.add("detail-mode");
  setTab(tabName);
}

function showList() {
  detailView.classList.remove("active");
  listView.classList.add("active");
  shell.classList.remove("detail-mode");
}

function setTab(tabName) {
  detailMain.classList.remove("app-section-mode");
  setCommandContext("version");
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".app-nav-item").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".app-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${tabName}Panel`);
  if (target) target.classList.add("active");
}

function setAppSection(sectionName) {
  detailMain.classList.add("app-section-mode");
  setCommandContext(sectionName);
  document.querySelectorAll(".version").forEach((version) => version.classList.remove("active"));
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelectorAll(".app-nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.appSection === sectionName);
  });
  document.querySelectorAll(".app-panel").forEach((panel) => panel.classList.remove("active"));

  const target = document.querySelector(`#${sectionName}Panel`);
  if (target) target.classList.add("active");
  if (sectionName === "updateStrategy") syncStrategyChoice();
}

function setStrategyTab(tabName) {
  if (!guidedAutomationEnabled) return;
  document.querySelectorAll("[data-strategy-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.strategyTab === tabName);
  });
  document.querySelectorAll(".strategy-page").forEach((page) => page.classList.remove("active"));

  const target = document.querySelector(`#${tabName}StrategyPage`);
  if (target) target.classList.add("active");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

document.querySelector("#backToList").addEventListener("click", showList);
document.querySelector("#addApplication").addEventListener("click", () => showToast("Import from catalog template opened"));
wrapWithPsadt.addEventListener("click", () => {
  wrapperEmptyState.hidden = true;
  wrapperConfiguredState.hidden = false;
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
  renderApps();
});
document.querySelector("#statusFilter").addEventListener("click", () => {
  statusMenu.classList.toggle("open");
  statusMenu.setAttribute("aria-hidden", String(!statusMenu.classList.contains("open")));
});

statusMenu.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  statusFilter = button.dataset.status;
  document.querySelector("#statusFilter").innerHTML = `${button.textContent}<span class="fluent icon-chevron-down"></span>`;
  statusMenu.classList.remove("open");
  statusMenu.setAttribute("aria-hidden", "true");
  renderApps();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

document.querySelectorAll(".version").forEach((version) => {
  version.addEventListener("click", () => {
    document.querySelectorAll(".version").forEach((item) => item.classList.toggle("active", item === version));
    setTab("information");
  });
});

document.querySelectorAll(".app-nav-item").forEach((item) => {
  item.addEventListener("click", () => setAppSection(item.dataset.appSection));
});

document.querySelectorAll("[data-strategy-choice]").forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.dataset.strategyChoice === "guided") setGuidedAutomationEnabled(true);
  });
});

document.querySelectorAll("[data-strategy-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setStrategyTab(tab.dataset.strategyTab));
});

document.querySelectorAll("[data-history-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.historyView;
    document.querySelectorAll("[data-history-view]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    document.querySelector("#packageHistory").classList.toggle("active", target === "package");
    document.querySelector("#deviceHistory").classList.toggle("active", target === "devices");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    statusMenu.classList.remove("open");
    statusMenu.setAttribute("aria-hidden", "true");
  }
});

renderApps();
setCommandContext("version");
syncSearchControls();
initCollapsibleSections();
