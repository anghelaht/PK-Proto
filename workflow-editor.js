(function () {
  "use strict";

  const rootElement = document.querySelector("#workflowEditorRoot");
  const sidebarRootElement = document.querySelector("#workflowContextSidebarRoot");
  if (!rootElement || !window.React || !window.ReactDOM || !window.ReactFlow) return;

  const h = React.createElement;
  const {
    ReactFlow: FlowCanvas,
    Background,
    Controls,
    MiniMap,
    Handle,
    Position,
    MarkerType,
    addEdge,
    useNodesState,
    useEdgesState
  } = window.ReactFlow;

  const starterWorkflow = {
    id: "starter",
    name: "Standard application update",
    description: "Detect, package and publish newer WinGet versions to Microsoft Intune.",
    revision: "1.3",
    revisions: 4,
    applications: 0,
    runs: 0,
    status: "Ready to configure",
    modified: "Included with PacKit"
  };

  const legacyAssignableApplications = [
    { id: "fabrikam", name: "Fabrikam Helpdesk Agent", publisher: "Fabrikam", version: "Not configured", readiness: "Ready to configure", tone: "neutral" },
    { id: "tailspin", name: "Tailspin Inventory Client", publisher: "Tailspin Toys", version: "12.3.10", readiness: "Ready", tone: "success" },
    { id: "northwind", name: "Northwind VPN Client", publisher: "Northwind Traders", version: "12.3.10", readiness: "Ready", tone: "success" },
    { id: "adobe", name: "Adobe Acrobat Reader", publisher: "Adobe", version: "24.002", readiness: "Ready", tone: "success" },
    { id: "sevenzip", name: "7-Zip", publisher: "Igor Pavlov", version: "24.09", readiness: "Ready", tone: "success" },
    { id: "vlc", name: "VLC media player", publisher: "VideoLAN", version: "3.0.21", readiness: "Ready", tone: "success" }
  ];

  const actionScopes = [
    { id: "values", label: "Reusable values", description: "Typed values connected to matching inputs." },
    { id: "flow", label: "Flow control", description: "Start, branch, wait, merge and report." },
    { id: "context", label: "PacKit context", description: "Choose the workspace and application." },
    { id: "discovery", label: "Update discovery", description: "Resolve and compare the tracked package." },
    { id: "content", label: "Content preparation", description: "Acquire, wrap and build package content." },
    { id: "delivery", label: "Intune delivery", description: "Create the app and optionally target groups." },
    { id: "records", label: "Run records", description: "Persist the result for future updates." }
  ];

  const actionCatalog = [
    { id: "text", label: "Text", description: "A fixed text value connected to any matching input.", category: "primitive", scope: "values", icon: "icon-copy", inputs: [{ key: "value", label: "Value", dataType: "Text", type: "text", required: true, value: "" }], outputs: [{ key: "value", label: "Value", dataType: "Text" }] },
    { id: "number", label: "Number", description: "A fixed numeric value connected to any matching input.", category: "primitive", scope: "values", icon: "icon-list", inputs: [{ key: "value", label: "Value", dataType: "Number", type: "number", required: true, value: "0" }], outputs: [{ key: "value", label: "Value", dataType: "Number" }] },
    { id: "flag", label: "Yes / no", description: "A reusable true or false value.", category: "primitive", scope: "values", icon: "icon-check", inputs: [{ key: "value", label: "Value", dataType: "Flag", type: "checkbox", checked: false }], outputs: [{ key: "value", label: "Value", dataType: "Flag" }] },
    { id: "filePath", label: "File", description: "A file path connected to a compatible input.", category: "primitive", scope: "values", icon: "icon-copy", inputs: [{ key: "value", label: "File", dataType: "Path", type: "text", required: true, value: "" }], outputs: [{ key: "value", label: "File", dataType: "Path" }] },
    { id: "folderPath", label: "Folder", description: "A folder path connected to a compatible input.", category: "primitive", scope: "values", icon: "icon-folder", inputs: [{ key: "value", label: "Folder", dataType: "Folder", type: "text", required: true, value: "" }], outputs: [{ key: "value", label: "Folder", dataType: "Folder" }] },
    { id: "url", label: "URL", description: "A URL connected to a compatible input.", category: "primitive", scope: "values", icon: "icon-download", inputs: [{ key: "value", label: "URL", dataType: "Url", type: "text", required: true, value: "" }], outputs: [{ key: "value", label: "URL", dataType: "Url" }] },
    { id: "version", label: "Version", description: "A version value used for comparisons and publication.", category: "primitive", scope: "values", icon: "icon-history", inputs: [{ key: "value", label: "Version", dataType: "Version", type: "text", required: true, value: "" }], outputs: [{ key: "value", label: "Version", dataType: "Version" }] },
    { id: "start", label: "Start", description: "Where the workflow begins.", category: "control", scope: "flow", icon: "icon-play", required: true, controlOutputs: ["out"], inputs: [], outputs: [] },
    { id: "notify", label: "Notify", description: "Writes a message to the run log.", category: "control", scope: "flow", icon: "icon-feedback", included: true, controlOutputs: ["out"], inline: ["message"], inputs: [{ key: "message", label: "Message", dataType: "Text", type: "textarea", required: true, value: "No newer version was found." }], outputs: [] },
    { id: "delay", label: "Delay", description: "Waits before continuing, up to seven days.", category: "control", scope: "flow", icon: "icon-history", controlOutputs: ["out"], inline: ["milliseconds"], inputs: [{ key: "milliseconds", label: "Milliseconds", dataType: "Number", type: "number", required: true, value: "1000", help: "Clamped to 7 days." }], outputs: [] },
    { id: "condition", label: "Condition", description: "Sends control down one of two branches.", category: "control", scope: "flow", icon: "icon-workflow", required: true, controlOutputs: ["then", "else"], inline: ["value"], inputs: [{ key: "value", label: "Value", dataType: "Flag", type: "text", required: true, value: "Compare versions · Is newer", connected: true }], outputs: [] },
    { id: "merge", label: "Merge", description: "Continues once any incoming branch arrives.", category: "control", scope: "flow", icon: "icon-workflow", allowsFanIn: true, controlOutputs: ["out"], inputs: [], outputs: [] },
    { id: "selectWorkspace", label: "Select workspace", description: "Opens a PacKit workspace for the rest of the workflow.", category: "domain", scope: "context", icon: "icon-folder-open", required: true, controlOutputs: ["out"], inputs: [{ key: "workspacePath", label: "Workspace", dataType: "Path", type: "select", required: true, value: "Current workspace", options: ["Current workspace", "Packaging lab · C:\\PacKit\\Workspaces\\LOB.pkproj", "Validation workspace · C:\\PacKit\\Workspaces\\Validation.pkproj", "Choose when the run starts"] }], outputs: [{ key: "workspace", label: "Workspace", dataType: "Workspace" }] },
    { id: "selectApp", label: "Select application", description: "Picks one application inside the workspace.", category: "domain", scope: "context", icon: "icon-list", required: true, controlOutputs: ["out"], inputs: [{ key: "workspace", label: "Workspace", dataType: "Workspace", type: "text", required: true, value: "Select workspace · Workspace", connected: true }, { key: "appId", label: "Application", dataType: "Text", type: "select", required: true, value: "Assigned application", options: ["Assigned application", "Choose when the run starts", "Use a fixed application"] }], outputs: [{ key: "app", label: "Application", dataType: "App" }] },
    { id: "resolveTrackedPackage", label: "Resolve tracked package", description: "Finds the WinGet package and current shipped version.", category: "domain", scope: "discovery", icon: "icon-search", required: true, controlOutputs: ["out"], inputs: [{ key: "workspace", label: "Workspace", dataType: "Workspace", type: "text", required: true, value: "Select workspace · Workspace", connected: true }, { key: "app", label: "Application", dataType: "App", type: "text", required: true, value: "Select application · Application", connected: true }, { key: "catalogPackageId", label: "Catalog package id override", dataType: "Text", type: "text", required: false, value: "", help: "Only needed when the application tracks more than one package." }], outputs: [{ key: "catalogPackageId", label: "Catalog package id", dataType: "Text" }, { key: "currentVersion", label: "Current version", dataType: "Version" }] },
    { id: "queryWingetCatalog", label: "Query WinGet catalog", description: "Looks up the latest published package version.", category: "domain", scope: "discovery", icon: "icon-search", required: true, controlOutputs: ["out"], inputs: [{ key: "catalogPackageId", label: "Catalog package id", dataType: "Text", type: "text", required: true, value: "Resolve tracked package · Catalog package id", connected: true }], outputs: [{ key: "latestVersion", label: "Latest version", dataType: "Version" }, { key: "downloadUrl", label: "Download URL", dataType: "Url" }] },
    { id: "compareVersions", label: "Compare versions", description: "Reports whether the catalog version is newer.", category: "domain", scope: "discovery", icon: "icon-refresh", required: true, controlOutputs: ["out"], inputs: [{ key: "currentVersion", label: "Current version", dataType: "Version", type: "text", required: true, value: "Resolve tracked package · Current version", connected: true }, { key: "latestVersion", label: "Latest version", dataType: "Version", type: "text", required: true, value: "Query WinGet catalog · Latest version", connected: true }], outputs: [{ key: "isNewer", label: "Is newer", dataType: "Flag" }] },
    { id: "download", label: "Download", description: "Fetches the installer into a staging folder.", category: "domain", scope: "content", icon: "icon-download", required: true, controlOutputs: ["out"], inputs: [{ key: "url", label: "URL", dataType: "Url", type: "text", required: true, value: "Query WinGet catalog · Download URL", connected: true }, { key: "destinationFolder", label: "Destination folder", dataType: "Folder", type: "select", required: true, value: "Workspace staging folder", options: ["Workspace staging folder", "Application source folder", "Choose a folder"] }], outputs: [{ key: "file", label: "Downloaded file", dataType: "Path" }] },
    { id: "wrapPsadt", label: "Wrap with PSADT", description: "Creates a PSAppDeployToolkit package around the installer.", category: "domain", scope: "content", icon: "icon-tools", controlOutputs: ["out"], inline: ["templateFolder"], inputs: [{ key: "installer", label: "Installer", dataType: "Path", type: "text", required: true, value: "Download · Downloaded file", connected: true }, { key: "templateFolder", label: "PSADT template", dataType: "Folder", type: "select", required: true, value: "Workspace default", options: ["Workspace default", "PSADT v4.1.8", "Choose a template"] }, { key: "outputFolder", label: "Output folder", dataType: "Folder", type: "select", required: true, value: "Workspace build folder", options: ["Workspace build folder", "Choose a folder"] }, { key: "appName", label: "Application name", dataType: "Text", type: "text", required: true, value: "Selected application · Name", connected: true }, { key: "appVendor", label: "Vendor", dataType: "Text", type: "text", required: true, value: "Selected application · Vendor", connected: true }, { key: "appVersion", label: "Version", dataType: "Version", type: "text", required: true, value: "Query WinGet catalog · Latest version", connected: true }, { key: "installCommand", label: "Install command", dataType: "Text", type: "text", required: false, value: "" }, { key: "uninstallCommand", label: "Uninstall command", dataType: "Text", type: "text", required: false, value: "" }], outputs: [{ key: "packageFolder", label: "Package folder", dataType: "Folder" }, { key: "deployScript", label: "Deploy script", dataType: "Path" }] },
    { id: "unwrapPsadt", label: "Unwrap PSADT", description: "Returns a wrapped package to its installer content.", category: "domain", scope: "content", icon: "icon-tools", controlOutputs: ["out"], inputs: [{ key: "packageFolder", label: "Package folder", dataType: "Folder", type: "text", required: true, value: "" }, { key: "installerFileName", label: "Installer file name", dataType: "Text", type: "text", required: false, value: "", help: "Leave empty to discover it from the deploy script." }], outputs: [{ key: "installer", label: "Installer", dataType: "Path" }, { key: "packageFolder", label: "Package folder", dataType: "Folder" }] },
    { id: "buildIntuneWin", label: "Build .intunewin", description: "Creates the Intune Win32 content artifact.", category: "domain", scope: "content", icon: "icon-copy", required: true, controlOutputs: ["out"], inputs: [{ key: "sourceFolder", label: "Source folder", dataType: "Folder", type: "select", required: true, value: "Downloaded installer folder", options: ["Downloaded installer folder", "PSADT package folder", "Choose a folder"] }, { key: "setupFile", label: "Setup file", dataType: "Path", type: "text", required: true, value: "Download · Downloaded file", connected: true }, { key: "outputFolder", label: "Output folder", dataType: "Folder", type: "select", required: true, value: "Workspace output folder", options: ["Workspace output folder", "Choose a folder"] }], outputs: [{ key: "package", label: "Package", dataType: "Path" }] },
    { id: "uploadIntune", label: "Upload to Intune", description: "Creates the next Intune application version.", category: "domain", scope: "delivery", icon: "icon-arrow-up", required: true, controlOutputs: ["out"], inputs: [{ key: "package", label: "Package", dataType: "Path", type: "text", required: true, value: "Build .intunewin · Package", connected: true }, { key: "workspace", label: "Workspace", dataType: "Workspace", type: "text", required: true, value: "Select workspace · Workspace", connected: true }, { key: "app", label: "Application", dataType: "App", type: "text", required: true, value: "Select application · Application", connected: true }, { key: "catalogPackageId", label: "Catalog package id", dataType: "Text", type: "text", required: false, value: "Resolve tracked package · Catalog package id", connected: true }, { key: "version", label: "New version", dataType: "Version", type: "text", required: true, value: "Query WinGet catalog · Latest version", connected: true }, { key: "setupFile", label: "Package setup filename", dataType: "Text", type: "text", required: true, value: "Downloaded file name", connected: true }, { key: "displayName", label: "Display name override", dataType: "Text", type: "text", required: false, value: "" }, { key: "publisher", label: "Publisher override", dataType: "Text", type: "text", required: false, value: "" }, { key: "installCommand", label: "Install command", dataType: "Text", type: "text", required: false, value: "" }, { key: "uninstallCommand", label: "Uninstall command", dataType: "Text", type: "text", required: false, value: "" }], outputs: [{ key: "intuneAppId", label: "Intune app id", dataType: "IntuneAppId" }] },
    { id: "assignGroups", label: "Assign groups", description: "Adds Available, Required or Uninstall assignments.", category: "domain", scope: "delivery", icon: "icon-people", controlOutputs: ["out"], inline: ["intent"], inputs: [{ key: "intuneAppId", label: "Intune app id", dataType: "IntuneAppId", type: "text", required: true, value: "Upload to Intune · Intune app id", connected: true }, { key: "groupIds", label: "Groups", dataType: "Text", type: "textarea", required: true, value: "" }, { key: "intent", label: "Intent", dataType: "Text", type: "select", required: true, value: "available", options: ["available", "required", "uninstall"] }], outputs: [{ key: "intuneAppId", label: "Intune app id", dataType: "IntuneAppId" }] },
    { id: "recordDeployment", label: "Record deployment", description: "Stores the published version and target result in PacKit.", category: "domain", scope: "records", icon: "icon-history", required: true, controlOutputs: ["out"], inputs: [{ key: "workspace", label: "Workspace", dataType: "Workspace", type: "text", required: true, value: "Select workspace · Workspace", connected: true }, { key: "app", label: "Application", dataType: "App", type: "text", required: true, value: "Select application · Application", connected: true }, { key: "catalogPackageId", label: "Catalog package id", dataType: "Text", type: "text", required: true, value: "Resolve tracked package · Catalog package id", connected: true }, { key: "version", label: "Version", dataType: "Version", type: "text", required: true, value: "Query WinGet catalog · Latest version", connected: true }, { key: "intuneAppId", label: "Intune app id", dataType: "IntuneAppId", type: "text", required: false, value: "Upload to Intune · Intune app id", connected: true }], outputs: [{ key: "recorded", label: "Recorded", dataType: "Flag" }] }
  ];

  const nodeDefinitions = actionCatalog.map((action) => ({
    ...action,
    summary: action.description,
    enabled: Boolean(action.required || action.included)
  }));
  const requiredIds = nodeDefinitions.filter((node) => node.required).map((node) => node.id);
  const workflowViews = new Set(["design", "applications", "runs", "revisions"]);

  const standardChain = ["start", "selectWorkspace", "selectApp", "resolveTrackedPackage", "queryWingetCatalog", "compareVersions", "condition", "download", "buildIntuneWin", "uploadIntune", "recordDeployment"];
  const recipeNode = (id, actionType = id, options = {}) => ({ id, actionType, required: options.required !== false, label: options.label, position: options.position });
  const chainEdges = (ids) => ids.slice(0, -1).map((source, index) => ({ source, target: ids[index + 1] }));
  const updateBranchEdges = (contentChain, afterUpload = ["recordDeployment"]) => [
    ...chainEdges(["start", "selectWorkspace", "selectApp", "resolveTrackedPackage", "queryWingetCatalog", "compareVersions", "condition"]),
    { source: "condition", target: contentChain[0], sourceHandle: "then", label: "Newer version" },
    { source: "condition", target: "notifyNoUpdate", sourceHandle: "else", label: "No update" },
    ...chainEdges(contentChain),
    ...chainEdges([contentChain.at(-1), ...afterUpload])
  ];

  const workflowRecipes = {
    starter: {
      name: "Standard application update",
      description: "Detect, package and publish newer WinGet versions to Microsoft Intune.",
      summary: "A direct-installer update path with a safe no-update branch.",
      nodes: [
        ...standardChain.map((id) => recipeNode(id)),
        recipeNode("notifyNoUpdate", "notify", { label: "Log no update", required: false, position: { x: 432, y: 876 } })
      ],
      edges: updateBranchEdges(["download", "buildIntuneWin", "uploadIntune"]),
      configuration: {
        selectWorkspace: { workspacePath: "Current workspace" },
        selectApp: { appId: "Assigned application" },
        notifyNoUpdate: { message: "No newer WinGet version was found. The current deployment remains unchanged." },
        download: { destinationFolder: "Workspace staging folder" },
        buildIntuneWin: { sourceFolder: "Downloaded installer folder", setupFile: "Download · Downloaded file", outputFolder: "Workspace output folder" },
        uploadIntune: { package: "Build .intunewin · Package", workspace: "Select workspace · Workspace", app: "Select application · Application", version: "Query WinGet catalog · Latest version", setupFile: "Downloaded file name" },
        recordDeployment: { workspace: "Select workspace · Workspace", app: "Select application · Application", catalogPackageId: "Resolve tracked package · Catalog package id", version: "Query WinGet catalog · Latest version", intuneAppId: "Upload to Intune · Intune app id" }
      }
    },
    "psadt-update": {
      name: "PSADT managed update",
      description: "Detect a WinGet update, create a PSADT wrapper and publish it to Microsoft Intune.",
      summary: "A preconfigured PSADT v4 path for packages that need wrapper behavior.",
      nodes: [
        ...standardChain.filter((id) => id !== "buildIntuneWin").map((id) => recipeNode(id)),
        recipeNode("notifyNoUpdate", "notify", { label: "Log no update", required: false, position: { x: 432, y: 876 } }),
        recipeNode("wrapPsadt", "wrapPsadt"), recipeNode("buildIntuneWin", "buildIntuneWin")
      ],
      edges: updateBranchEdges(["download", "wrapPsadt", "buildIntuneWin", "uploadIntune"]),
      configuration: {
        selectWorkspace: { workspacePath: "Current workspace" },
        selectApp: { appId: "Assigned application" },
        notifyNoUpdate: { message: "No newer WinGet version was found. No wrapper was created." },
        download: { destinationFolder: "Workspace staging folder" },
        wrapPsadt: { installer: "Download · Downloaded file", templateFolder: "PSADT v4.1.8", outputFolder: "Workspace build folder", appName: "Selected application · Name", appVendor: "Selected application · Vendor", appVersion: "Query WinGet catalog · Latest version" },
        buildIntuneWin: { sourceFolder: "PSADT package folder", setupFile: "Wrap with PSADT · Deploy script", outputFolder: "Workspace output folder" },
        uploadIntune: { package: "Build .intunewin · Package", workspace: "Select workspace · Workspace", app: "Select application · Application", version: "Query WinGet catalog · Latest version", setupFile: "Deploy-Application.exe", installCommand: "Deploy-Application.exe -DeploymentType Install -DeployMode Silent", uninstallCommand: "Deploy-Application.exe -DeploymentType Uninstall -DeployMode Silent" },
        recordDeployment: { workspace: "Select workspace · Workspace", app: "Select application · Application", catalogPackageId: "Resolve tracked package · Catalog package id", version: "Query WinGet catalog · Latest version", intuneAppId: "Upload to Intune · Intune app id" }
      }
    },
    "local-publish": {
      name: "Local installer publication",
      description: "Build and publish a known local installer without catalog discovery.",
      summary: "A filled example for line-of-business installers maintained on disk.",
      nodes: [
        recipeNode("start"), recipeNode("selectWorkspace"), recipeNode("selectApp"),
        recipeNode("sourceFolderValue", "folderPath", { label: "Installer source folder", position: { x: -80, y: 396 } }),
        recipeNode("setupFileValue", "filePath", { label: "Setup file", position: { x: -80, y: 536 } }),
        recipeNode("versionValue", "version", { label: "Package version", position: { x: -80, y: 676 } }),
        recipeNode("buildIntuneWin", "buildIntuneWin", { position: { x: 92, y: 476 } }),
        recipeNode("uploadIntune", "uploadIntune", { position: { x: 92, y: 616 } }),
        recipeNode("recordDeployment", "recordDeployment", { position: { x: 92, y: 756 } })
      ],
      edges: chainEdges(["start", "selectWorkspace", "selectApp", "buildIntuneWin", "uploadIntune", "recordDeployment"]),
      configuration: {
        selectWorkspace: { workspacePath: "Packaging lab · C:\\PacKit\\Workspaces\\LOB.pkproj" },
        selectApp: { appId: "Assigned application" },
        sourceFolderValue: { value: "C:\\Packages\\Contoso Finance Tools\\12.4.0" },
        setupFileValue: { value: "C:\\Packages\\Contoso Finance Tools\\12.4.0\\ContosoFinance.msi" },
        versionValue: { value: "12.4.0" },
        buildIntuneWin: { sourceFolder: "Installer source folder · Folder", setupFile: "Setup file · File", outputFolder: "Workspace output folder" },
        uploadIntune: { package: "Build .intunewin · Package", workspace: "Select workspace · Workspace", app: "Select application · Application", catalogPackageId: "", version: "Package version · Version", setupFile: "ContosoFinance.msi", displayName: "Contoso Finance Tools 12.4.0", publisher: "Contoso", installCommand: "msiexec /i ContosoFinance.msi /qn /norestart", uninstallCommand: "msiexec /x {0E1653D1-AB8F-39C6-9FDB-38895E6FF7A1} /qn /norestart" },
        recordDeployment: { workspace: "Select workspace · Workspace", app: "Select application · Application", catalogPackageId: "Local.ContosoFinance", version: "Package version · Version", intuneAppId: "Upload to Intune · Intune app id" }
      }
    },
    "assignment-defaults": {
      name: "Intune assignment defaults",
      description: "Publish a detected update and apply explicit Available, Required and Uninstall groups.",
      summary: "A publication recipe with three independently configured assignment instances.",
      nodes: [
        ...standardChain.map((id) => recipeNode(id, id, id === "recordDeployment" ? { position: { x: 92, y: 1996 } } : {})),
        recipeNode("notifyNoUpdate", "notify", { label: "Log no update", required: false, position: { x: 432, y: 876 } }),
        recipeNode("assignPilot", "assignGroups", { label: "Assign pilot availability", required: false, position: { x: 92, y: 1576 } }),
        recipeNode("assignProduction", "assignGroups", { label: "Assign production requirement", required: false, position: { x: 92, y: 1716 } }),
        recipeNode("assignRetired", "assignGroups", { label: "Assign legacy uninstall", required: false, position: { x: 92, y: 1856 } })
      ],
      edges: updateBranchEdges(["download", "buildIntuneWin", "uploadIntune"], ["assignPilot", "assignProduction", "assignRetired", "recordDeployment"]),
      configuration: {
        selectWorkspace: { workspacePath: "Current workspace" },
        selectApp: { appId: "Assigned application" },
        notifyNoUpdate: { message: "No newer version was found. Existing assignments remain in place." },
        download: { destinationFolder: "Workspace staging folder" },
        buildIntuneWin: { sourceFolder: "Downloaded installer folder", setupFile: "Download · Downloaded file", outputFolder: "Workspace output folder" },
        uploadIntune: { package: "Build .intunewin · Package", workspace: "Select workspace · Workspace", app: "Select application · Application", version: "Query WinGet catalog · Latest version", setupFile: "Downloaded file name" },
        assignPilot: { intuneAppId: "Upload to Intune · Intune app id", groupIds: "PacKit - Application Pilot Users", intent: "available" },
        assignProduction: { intuneAppId: "Assign pilot availability · Intune app id", groupIds: "PacKit - Managed Windows Devices", intent: "required" },
        assignRetired: { intuneAppId: "Assign production requirement · Intune app id", groupIds: "PacKit - Legacy Application Removal", intent: "uninstall" },
        recordDeployment: { workspace: "Select workspace · Workspace", app: "Select application · Application", catalogPackageId: "Resolve tracked package · Catalog package id", version: "Query WinGet catalog · Latest version", intuneAppId: "Assign legacy uninstall · Intune app id" }
      }
    }
  };

  const defaultPositions = {
    start: { x: 92, y: 36 }, selectWorkspace: { x: 92, y: 176 }, selectApp: { x: 92, y: 316 },
    resolveTrackedPackage: { x: 92, y: 456 }, queryWingetCatalog: { x: 92, y: 596 }, compareVersions: { x: 92, y: 736 },
    condition: { x: 92, y: 876 }, download: { x: 92, y: 1016 }, wrapPsadt: { x: 92, y: 1156 },
    buildIntuneWin: { x: 92, y: 1296 }, uploadIntune: { x: 92, y: 1436 }, recordDeployment: { x: 92, y: 1856 },
    notify: { x: 432, y: 876 }, delay: { x: 432, y: 176 }, merge: { x: 432, y: 316 }, unwrapPsadt: { x: 432, y: 1156 },
    assignGroups: { x: 432, y: 1436 }, text: { x: -244, y: 176 }, number: { x: -244, y: 316 }, flag: { x: -244, y: 456 },
    filePath: { x: -244, y: 596 }, folderPath: { x: -244, y: 736 }, url: { x: -244, y: 876 }, version: { x: -244, y: 1016 }
  };

  const workflowLayoutVersion = 5;
  const workflowVerticalScale = 2;
  const spreadCanvasPosition = (position) => ({
    x: 120 + (position.x - 92) * 1.3,
    y: 56 + (position.y - 36) * workflowVerticalScale
  });
  const upgradeCanvasPosition = (position, layoutVersion) => {
    if (layoutVersion >= workflowLayoutVersion) return position;
    if (layoutVersion === 4) {
      return { x: position.x, y: 56 + (position.y - 56) * (workflowVerticalScale / 2.35) };
    }
    if (layoutVersion === 3) {
      return { x: position.x, y: 56 + (position.y - 56) * (workflowVerticalScale / 2.75) };
    }
    if (layoutVersion === 2) {
      const legacyY = 36 + (position.y - 56) / 1.65;
      return { x: position.x, y: 56 + (legacyY - 36) * workflowVerticalScale };
    }
    return spreadCanvasPosition(position);
  };

  function createInitialNodes(recipeId = "starter") {
    const recipe = workflowRecipes[recipeId] || workflowRecipes.starter;
    const instances = new Map(recipe.nodes.map((instance) => [instance.id, instance]));
    const availableCatalogNodes = nodeDefinitions.filter((definition) => !instances.has(definition.id)).map((definition) => ({ id: definition.id, actionType: definition.id, required: false }));
    return [...recipe.nodes, ...availableCatalogNodes].map((instance) => {
      const definition = actionCatalog.find((action) => action.id === instance.actionType);
      const position = spreadCanvasPosition(instance.position || defaultPositions[instance.actionType] || { x: 92, y: 36 });
      const enabled = instances.has(instance.id);
      return {
        id: instance.id,
        type: "packitNode",
        position,
        data: {
          ...definition,
          id: instance.id,
          actionType: instance.actionType,
          label: instance.label || definition.label,
          summary: definition.description,
          required: Boolean(instance.required && enabled),
          enabled,
          status: enabled ? "configured" : "available"
        }
      };
    });
  }

  function createInitialEdges(recipeId = "starter") {
    const recipe = workflowRecipes[recipeId] || workflowRecipes.starter;
    return recipe.edges.map((edge, index) => ({
      id: `${edge.source}-${edge.target}-${edge.sourceHandle || "out"}-${index}`,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      label: edge.label,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      className: "workflow-core-edge"
    }));
  }

  function defaultActionConfiguration(actionType) {
    const definition = actionCatalog.find((action) => action.id === actionType);
    return Object.fromEntries((definition?.inputs || []).map((field) => [
      field.key,
      field.defaultValue ?? field.checked ?? field.value ?? field.options?.[0] ?? ""
    ]));
  }

  function serializeWorkflowGraph(nodes, edges) {
    return {
      layoutVersion: workflowLayoutVersion,
      nodes: nodes.map((node) => ({
        id: node.id,
        actionType: node.data.actionType || node.id,
        label: node.data.label,
        required: Boolean(node.data.required),
        enabled: Boolean(node.data.enabled),
        position: node.position
      })),
      edges: edges.map(({ id, source, target, sourceHandle, targetHandle, label, className }) => ({ id, source, target, sourceHandle, targetHandle, label, className }))
    };
  }

  function hydrateWorkflowNodes(items, layoutVersion = 1) {
    return items.map((item) => {
      const definition = actionCatalog.find((action) => action.id === item.actionType);
      const savedPosition = item.position || defaultPositions[item.actionType] || { x: 92, y: 36 };
      return {
        id: item.id,
        type: "packitNode",
        position: upgradeCanvasPosition(savedPosition, layoutVersion),
        data: {
          ...definition,
          id: item.id,
          actionType: item.actionType,
          label: item.label || definition.label,
          summary: definition.description,
          required: Boolean(item.required),
          enabled: Boolean(item.enabled),
          status: item.enabled ? "configured" : "available"
        }
      };
    });
  }

  function hydrateWorkflowEdges(items) {
    return items.map((edge, index) => ({
      ...edge,
      id: edge.id || `${edge.source}-${edge.target}-${edge.sourceHandle || "out"}-${index}`,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      className: edge.className || "workflow-core-edge"
    }));
  }

  function FluentIcon({ name }) {
    return h("span", { className: `fluent ${name}`, "aria-hidden": "true" });
  }

  function HelpTip({ label }) {
    return h("button", {
      className: "wui-help-tip",
      type: "button",
      "aria-label": label,
      "data-tooltip": label
    }, h(FluentIcon, { name: "icon-help" }));
  }

  function WorkflowSelect({ children, ...selectProps }) {
    return h("span", { className: "workflow-select-control" },
      h("select", selectProps, children),
      h(FluentIcon, { name: "icon-chevron-down" })
    );
  }

  const inlineFieldMap = {
    text: ["value"], number: ["value"], flag: ["value"], filePath: ["value"], folderPath: ["value"], url: ["value"], version: ["value"],
    notify: ["message"], delay: ["milliseconds"], selectWorkspace: ["workspacePath"], selectApp: ["appId"],
    resolveTrackedPackage: ["catalogPackageId"], download: ["destinationFolder"], wrapPsadt: ["templateFolder", "outputFolder"],
    unwrapPsadt: ["installerFileName"], buildIntuneWin: ["sourceFolder", "outputFolder"], uploadIntune: ["displayName", "publisher"], assignGroups: ["intent"]
  };

  function PackitNode({ data, selected }) {
    const inlineKeys = inlineFieldMap[data.actionType] || data.inline || [];
    const inlineFields = (data.inputs || []).filter((field) => inlineKeys.includes(field.key) && !field.connected);
    const changeInlineValue = (event, field) => {
      event.stopPropagation();
      const value = field.type === "checkbox" ? event.target.checked : event.target.value;
      data.onConfigurationChange?.(data.id, field.key, value);
    };
    const removeNode = (event) => {
      event.preventDefault();
      event.stopPropagation();
      data.onRemove?.(data.id);
    };
    return h("div", {
      className: `packit-flow-node ${data.required ? "required" : "optional"} ${data.enabled ? "enabled" : "available"} ${inlineFields.length ? "has-inline-fields" : ""} ${selected ? "selected" : ""}`
    },
      h(Handle, { type: "target", position: Position.Top, className: "workflow-handle" }),
      h("div", { className: "packit-flow-node-heading" },
        h("span", { className: "packit-flow-node-icon" }, h(FluentIcon, { name: data.icon })),
        h("span", null,
          h("strong", null, data.label)
        ),
        data.required
          ? h("button", {
              className: "workflow-node-fixed wui-help-tip nodrag nowheel",
              type: "button",
              "aria-label": "Required by this workflow template",
              "data-tooltip": "Required by this workflow template. This action cannot be removed."
            }, h(FluentIcon, { name: "icon-lock" }))
          : h("button", {
              type: "button",
              className: "workflow-node-remove nodrag nowheel",
              title: `Remove ${data.label} from workflow`,
              "aria-label": `Remove ${data.label} from workflow`,
              onPointerDown: (event) => event.stopPropagation(),
              onClick: removeNode
            }, h(FluentIcon, { name: "icon-dismiss" }))
      ),
      h("p", null, data.summary),
      inlineFields.length > 0 && h("div", { className: "workflow-node-fields nodrag nowheel", onPointerDown: (event) => event.stopPropagation(), onMouseDown: (event) => event.stopPropagation(), onClick: (event) => event.stopPropagation() }, inlineFields.map((field) =>
        h("label", { key: field.key },
          h("span", { className: "workflow-node-field-heading" }, h("span", null, field.label), h("small", null, field.dataType)),
          field.type === "select"
            ? h(WorkflowSelect, { value: data.configuration?.[field.key] ?? field.value ?? field.options?.[0], onChange: (event) => changeInlineValue(event, field) }, field.options.map((option) => h("option", { key: option }, option)))
            : field.type === "checkbox"
              ? h("input", { type: "checkbox", checked: data.configuration?.[field.key] ?? field.checked ?? false, onChange: (event) => changeInlineValue(event, field) })
              : field.type === "textarea"
                ? h("textarea", { rows: 2, value: data.configuration?.[field.key] ?? field.value ?? "", onChange: (event) => changeInlineValue(event, field) })
                : h("input", { type: field.type === "number" ? "number" : "text", value: data.configuration?.[field.key] ?? field.value ?? "", onChange: (event) => changeInlineValue(event, field) })
        )
      )),
      data.controlOutputs?.length > 1
        ? data.controlOutputs.map((output, index) => h(Handle, { key: output, id: output, type: "source", position: Position.Bottom, className: `workflow-handle workflow-handle-${output}`, style: { left: `${35 + index * 30}%` } }))
        : h(Handle, { type: "source", position: Position.Bottom, className: "workflow-handle" })
    );
  }

  const fieldDefinitions = Object.fromEntries(actionCatalog.map((action) => [action.id, action.inputs || []]));
  const recipeInstanceDefinitions = Object.values(workflowRecipes).flatMap((recipe) => recipe.nodes)
    .filter((instance) => instance.id !== instance.actionType)
    .filter((instance, index, items) => items.findIndex((candidate) => candidate.id === instance.id) === index)
    .map((instance) => {
      const definition = actionCatalog.find((action) => action.id === instance.actionType);
      return { ...definition, id: instance.id, actionType: instance.actionType, label: instance.label || definition.label, required: true };
    });

  // Existing application/version ownership views still resolve these policy keys.
  // They remain a compatibility schema; the workflow canvas exposes the action catalog above.
  const legacyPolicyNodes = [
    ["trigger", "Update trigger", true], ["source", "Resolve installer source", true], ["inspect", "Inspect package", true],
    ["information", "App & package information", true], ["program", "Install & uninstall", true], ["requirements", "Requirements", true],
    ["detection", "Detection", true], ["returnCodes", "Return codes & restart", true], ["transition", "Future version handling", true],
    ["build", "Build package", true], ["validate", "Build & verify", true], ["approval", "Review & approval", true],
    ["publish", "Publish output", true], ["assignments", "Future assignments", true], ["cleanup", "Previous version handling", true],
    ["wrapper", "Wrapper", false]
  ].map(([id, label, required]) => ({ id, label, required }));
  const legacyPolicyFields = {
    trigger: [
      { key: "trigger", label: "Trigger", type: "select", options: ["New catalog version detected", "Scheduled check", "Manual run"] },
      { key: "channel", label: "Release channel", type: "select", options: ["Stable", "Preview", "Any"] }
    ],
    source: [
      { key: "acquisition", label: "Installer source", type: "select", options: ["Linked catalog", "Publisher URL", "Monitored folder", "Application binding"] },
      { key: "variant", label: "Installer variant", type: "select", options: ["Match application architecture and locale", "Prefer x64 stable release", "Require review when multiple variants match"] }
    ],
    inspect: [
      { key: "identity", label: "Installer identity", type: "select", options: ["Read from installer metadata", "Read from WinGet manifest", "Require manual confirmation"] },
      { key: "hash", label: "Verify installer hash", type: "checkbox", checked: true }
    ],
    information: [
      { key: "copyInfo", label: "Copy application information", type: "checkbox", checked: true },
      { key: "version", label: "Update version from source", type: "checkbox", checked: true },
      { key: "notes", label: "Release notes", type: "select", options: ["Import when available", "Do not change", "Require review"] }
    ],
    program: [
      { key: "installCommand", label: "Install command", type: "select", options: ["Resolve from installer metadata", "Preserve verified command", "Require application binding"] },
      { key: "uninstallCommand", label: "Uninstall command", type: "select", options: ["Resolve from installer identity", "Preserve verified command", "Require application binding"] },
      { key: "context", label: "Install context", type: "select", options: ["System", "User", "Preserve previous"] },
      { key: "timeout", label: "Installation timeout", type: "select", options: ["60 minutes", "90 minutes", "120 minutes"] },
      { key: "restart", label: "Restart behavior", type: "select", options: ["Based on return codes", "Suppress restart", "Require restart"] }
    ],
    requirements: [
      { key: "architecture", label: "Architecture", type: "select", options: ["Match installer", "x64", "x86", "ARM64"] },
      { key: "os", label: "Minimum operating system", type: "select", options: ["Preserve previous", "Windows 11", "Windows 10 22H2"] }
    ],
    detection: [
      { key: "method", label: "Detection method", type: "select", options: ["Installer identity when available", "File version", "Registry value", "PowerShell script"] },
      { key: "versionCheck", label: "Require version comparison", type: "checkbox", checked: true }
    ],
    returnCodes: [
      { key: "defaults", label: "Start with platform defaults", type: "checkbox", checked: true },
      { key: "restartCodes", label: "Preserve reboot exit codes", type: "checkbox", checked: true },
      { key: "unknownCode", label: "Unknown return code", type: "select", options: ["Treat as failure", "Pause for review", "Use previous mapping"] }
    ],
    transition: [
      { key: "copySource", label: "Build the next version from", type: "select", options: ["Previous released version", "Latest successful upload", "Clean configuration"] },
      { key: "copyPolicy", label: "Copy-forward policy", type: "select", options: ["Copy verified reusable configuration", "Copy all configuration for review", "Resolve every value again"] },
      { key: "relationship", label: "Deployment relationship", type: "select", options: ["Supersede the previous version", "Replace and uninstall the previous version", "Create without a relationship"] },
      { key: "existingInstalls", label: "Devices with the previous version", type: "select", options: ["Update through the Required assignment policy", "Leave unchanged until assigned", "Pause for review"] }
    ],
    build: [
      { key: "artifact", label: "Package artifact", type: "select", options: ["IntuneWin", "MECM content", "Both targets"] },
      { key: "clean", label: "Use clean build directory", type: "checkbox", checked: true }
    ],
    validate: [
      { key: "installTest", label: "Clean install test", type: "checkbox", checked: true },
      { key: "upgradeTest", label: "Upgrade test", type: "checkbox", checked: true },
      { key: "uninstallTest", label: "Uninstall and detection test", type: "checkbox", checked: true }
    ],
    approval: [{ key: "approval", label: "Approval policy", type: "select", options: ["Required before publication", "Required after validation", "No approval"] }],
    publish: [
      { key: "target", label: "Workflow output", type: "select", options: ["Build only", "Microsoft Intune", "MECM", "Intune and MECM"] },
      { key: "failure", label: "If publication fails", type: "select", options: ["Stop and keep the current deployment", "Pause for review", "Retry the failed target"] }
    ],
    assignments: [
      { key: "source", label: "Start from", type: "select", options: ["Previous version assignments", "Workflow assignment defaults", "No existing assignments"] },
      { key: "rings", label: "Assignment rings", type: "select", options: ["Pilot → IT → Production", "Pilot → Production", "Single ring"] },
      { key: "required", label: "Required assignments", type: "radio", defaultValue: "Keep current Required assignments and require the next version", options: ["Move Required assignments to the next version", "Keep current Required assignments and require the next version", "Do not automate Required assignments"] },
      { key: "available", label: "Available assignments", type: "radio", defaultValue: "Move Available assignments to the next version", options: ["Move Available assignments to the next version", "Keep current Available assignments and make the next version available", "Do not automate Available assignments"] },
      { key: "silentUpdate", label: "Update devices that have the current version installed", type: "checkbox", checked: false },
      { key: "uninstall", label: "Uninstall assignments", type: "radio", defaultValue: "Copy Uninstall assignments to the next version", options: ["Keep Uninstall assignments on the current version only", "Copy Uninstall assignments to the next version", "Do not automate Uninstall assignments"] }
    ],
    cleanup: [
      { key: "when", label: "When the rollout is complete", type: "select", options: ["After the Production ring succeeds", "After explicit approval", "After a retention period"] },
      { key: "retention", label: "Retention period", type: "select", options: ["No delay", "3 days", "7 days", "14 days", "30 days"] },
      { key: "action", label: "Previous version action", type: "select", options: ["Keep the version and its assignments", "Remove assignments only", "Retire the deployment object", "Remove assignments and retire"] },
      { key: "failureGate", label: "Keep the previous version active while deployment failures remain", type: "checkbox", checked: true }
    ],
    wrapper: [
      { key: "wrapper", label: "Wrapper", type: "select", options: ["PSAppDeployToolkit v4", "PSAppDeployToolkit v3 compatibility", "Custom PowerShell", "Direct installer"] },
      { key: "interaction", label: "User interaction", type: "select", options: ["Silent", "Allow deferral", "Close blocking processes"] }
    ]
  };
  const recipeFieldDefinitions = Object.fromEntries(recipeInstanceDefinitions.map((instance) => [instance.id, fieldDefinitions[instance.actionType] || []]));
  const policyFieldDefinitions = { ...legacyPolicyFields, ...fieldDefinitions, ...recipeFieldDefinitions };
  const policyNodeDefinitions = [...legacyPolicyNodes, ...nodeDefinitions, ...recipeInstanceDefinitions];

  const starterRevisionHistory = [
    {
      version: "1.3",
      state: "Current",
      tone: "success",
      author: "Mara Ionescu",
      created: "28 Sep 2026",
      changes: "Simplified the required backbone and approval defaults",
      optionalIds: ["notify"],
      configuration: {
        notify: { message: "No newer version was found." },
        selectWorkspace: { workspacePath: "Current workspace" },
        selectApp: { appId: "Assigned application" },
        download: { destinationFolder: "Workspace staging folder" },
        buildIntuneWin: { sourceFolder: "Downloaded installer folder", outputFolder: "Workspace output folder" }
      }
    },
    {
      version: "1.2",
      state: "Published",
      tone: "neutral",
      author: "Andrei Pop",
      created: "19 Sep 2026",
      changes: "Added assignment rings and PSADT wrapper defaults",
      optionalIds: ["notify", "wrapPsadt", "assignGroups"],
      configuration: {
        notify: { message: "No newer version was found." },
        wrapPsadt: { templateFolder: "PSADT v4.1.8" },
        assignGroups: { intent: "available", groupIds: "Pilot\nIT\nProduction" },
        buildIntuneWin: { sourceFolder: "PSADT package folder" }
      }
    },
    {
      version: "1.1",
      state: "Published",
      tone: "neutral",
      author: "Mara Ionescu",
      created: "6 Sep 2026",
      changes: "Enabled wrapper handling and stricter validation",
      optionalIds: ["notify", "wrapPsadt"],
      configuration: {
        notify: { message: "No newer version was found." },
        wrapPsadt: { templateFolder: "Workspace default" },
        buildIntuneWin: { sourceFolder: "PSADT package folder" }
      }
    },
    {
      version: "1.0",
      state: "Published",
      tone: "neutral",
      author: "PacKit",
      created: "25 Aug 2026",
      changes: "Initial application-update workflow",
      optionalIds: ["notify"],
      configuration: {
        notify: { message: "No newer version was found." },
        selectWorkspace: { workspacePath: "Current workspace" },
        selectApp: { appId: "Assigned application" }
      }
    }
  ];

  const policy = window.packitPolicy;
  const existingVersionIds = [...document.querySelectorAll("#versionList [data-version]")].map(button => button.dataset.version);
  const policyCatalog = apps.map(app => ({ ...app, existingVersions: app.empty ? [] : existingVersionIds }));
  const policyValues = policy.register(policyFieldDefinitions, policyNodeDefinitions, policyCatalog, starterRevisionHistory);
  const builtInWorkflowSeeds = [
    { id: "starter", ...workflowRecipes.starter, version: "2.0", changes: "Configured direct-installer publication recipe" },
    { id: "psadt-update", ...workflowRecipes["psadt-update"], version: "1.0", changes: "Configured PSADT v4 update recipe" },
    { id: "local-publish", ...workflowRecipes["local-publish"], version: "1.0", changes: "Configured local installer publication recipe" },
    { id: "assignment-defaults", ...workflowRecipes["assignment-defaults"], version: "1.0", changes: "Configured Available, Required and Uninstall assignment defaults" }
  ];
  builtInWorkflowSeeds.forEach((item) => policy.seedBuiltIn({
    id: item.id,
    name: item.name,
    description: item.description,
    recipeId: item.id,
    revision: {
      version: item.version,
      state: "Current",
      tone: "success",
      author: "PacKit",
      created: "Included with prototype",
      changes: item.changes,
      recipeId: item.id,
      optionalIds: item.nodes.map((node) => node.id),
      configuration: item.configuration,
      values: policyValues(item.nodes.map((node) => node.id), item.configuration)
    }
  }));
  const assignableApplications = apps.map(app => ({ ...app, id: app.name, readiness: app.empty ? "Not configured" : "Ready", tone: "neutral" }));
  const workflowRows = () => Object.values(policy.state().workflows).map(item => ({
    ...item, revision: item.revisions[0]?.version || "0.1", revisions: item.revisions.length,
    applications: Object.values(policy.state().applications).filter(app => app.binding?.workflowId === item.id).length,
    runs: 0,
    previews: policy.state().previews.filter(run => run.binding?.workflowId === item.id).length,
    status: item.draft ? "Saved draft" : item.revisions.length ? "Published" : "Draft"
  }));

  function WorkflowInspector({ node, configuration, onConfigurationChange, onActivate }) {
    if (!node) {
      return h("aside", { className: "workflow-inspector empty" },
        h(FluentIcon, { name: "icon-info" }),
        h("strong", null, "Select a workflow node"),
        h("p", null, "Its effective configuration and validation status will appear here.")
      );
    }
    const fields = fieldDefinitions[node.data.actionType || node.id] || [];
    return h("aside", { className: "workflow-inspector", "aria-label": `${node.data.label} properties` },
      h("header", null,
        h("span", { className: "workflow-inspector-icon" }, h(FluentIcon, { name: node.data.icon })),
        h("div", null,
          h("div", { className: "label-with-help" },
            h("h2", null, node.data.label),
            h(HelpTip, { label: `${node.data.summary} Assigned applications inherit this configuration; publishing creates a revision for review.` }),
            node.data.required && h("button", {
              className: "workflow-inspector-lock wui-help-tip",
              type: "button",
              "aria-label": "Required by this workflow template",
              "data-tooltip": "Required by this workflow template. This action cannot be removed."
            }, h(FluentIcon, { name: "icon-lock" }))
          )
        )
      ),
      !node.data.required && !node.data.enabled
        ? h("div", { className: "workflow-optional-prompt" },
            h("strong", null, "Not included in this workflow"),
            h("button", { className: "primary-btn", type: "button", onClick: () => onActivate(node.id) }, h(FluentIcon, { name: "icon-add" }), " Add to workflow")
          )
        : h("div", { className: "workflow-inspector-form" },
            fields.map((field) => field.type === "radio"
              ? h("fieldset", { key: field.key, className: "workflow-radio-field" },
                  h("legend", null, field.label),
                  field.options.map((option) => h("label", { key: option },
                    h("input", {
                      type: "radio",
                      name: `${node.id}-${field.key}`,
                      value: option,
                      checked: (configuration[field.key] ?? field.defaultValue) === option,
                      onChange: () => onConfigurationChange(node.id, field.key, option)
                    }),
                    h("span", null, option)
                  ))
                )
              : h("label", { key: field.key, className: `${field.type === "checkbox" ? "workflow-check-field" : ""} ${field.connected ? "workflow-connected-field" : ""}`.trim() },
              field.type === "checkbox"
                ? [
                    h("input", {
                      key: `${field.key}-input`,
                      type: "checkbox",
                      checked: configuration[field.key] ?? field.checked ?? false,
                      onChange: (event) => onConfigurationChange(node.id, field.key, event.target.checked)
                    }),
                    h("span", { key: `${field.key}-label` }, field.label)
                  ]
                : [
                    h("span", { key: `${field.key}-label`, className: "workflow-field-label" }, field.label, field.required && h("span", { "aria-hidden": "true" }, " *")),
                    field.type === "select"
                      ? h(WorkflowSelect, {
                          key: `${field.key}-input`,
                          value: configuration[field.key] ?? field.value ?? field.options[0],
                          onChange: (event) => onConfigurationChange(node.id, field.key, event.target.value)
                        }, field.options.map((option) => h("option", { key: option }, option)))
                      : field.type === "textarea"
                        ? h("textarea", { key: `${field.key}-input`, rows: 3, value: configuration[field.key] ?? field.value ?? "", onChange: (event) => onConfigurationChange(node.id, field.key, event.target.value) })
                        : h("input", {
                            key: `${field.key}-input`,
                            type: field.type === "number" ? "number" : "text",
                            value: configuration[field.key] ?? field.value ?? "",
                            onChange: (event) => onConfigurationChange(node.id, field.key, event.target.value)
                          }),
                    field.connected && h("small", { key: `${field.key}-connection`, className: "workflow-field-connection" }, h(FluentIcon, { name: "icon-workflow" }), ` Connected: ${configuration[field.key] ?? field.value}`),
                    field.help && h("small", { key: `${field.key}-help`, className: "workflow-field-help" }, field.help)
                  ]
            )),
            !node.data.required && h("button", { className: "workflow-remove-step", type: "button", onClick: () => onActivate(node.id, false) }, h(FluentIcon, { name: "icon-dismiss" }), " Remove from workflow")
          )
    );
  }

  function WorkflowPalette({ nodes, selectedId, onSelect, onActivate, onDragStart }) {
    const [expandedScopes, setExpandedScopes] = React.useState(() => Object.fromEntries(actionScopes.map((scope) => [scope.id, true])));
    const [query, setQuery] = React.useState("");
    const [scrollState, setScrollState] = React.useState({ up: false, down: false });
    const paletteRef = React.useRef(null);
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matchingNodes = normalizedQuery
      ? nodes.filter((node) => [node.data.label, node.data.description, node.data.scope].some((value) => String(value || "").toLocaleLowerCase().includes(normalizedQuery)))
      : nodes;
    const visibleScopes = actionScopes.filter((scope) => matchingNodes.some((node) => node.data.scope === scope.id));
    const syncScrollState = React.useCallback(() => {
      const palette = paletteRef.current;
      if (!palette) return;
      const next = {
        up: palette.scrollTop > 2,
        down: palette.scrollTop + palette.clientHeight < palette.scrollHeight - 2
      };
      setScrollState((current) => current.up === next.up && current.down === next.down ? current : next);
    }, []);
    React.useEffect(() => {
      const palette = paletteRef.current;
      if (!palette) return undefined;
      const frame = requestAnimationFrame(syncScrollState);
      const observer = new ResizeObserver(syncScrollState);
      observer.observe(palette);
      window.addEventListener("resize", syncScrollState);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("resize", syncScrollState);
      };
    }, [expandedScopes, normalizedQuery, nodes.length, syncScrollState]);
    return h("div", { className: "workflow-palette-frame" },
      h("aside", {
        ref: paletteRef,
        className: `workflow-palette ${scrollState.up ? "is-scrolled" : ""}`,
        "aria-label": "Workflow actions",
        onScroll: syncScrollState
      },
      h("header", null,
        h("div", { className: "label-with-help" },
          h("h2", null, "Workflow actions"),
          h(HelpTip, { label: "Drag actions to the canvas. Locked actions are required by the workflow template." })
        )
      ),
      h("label", { className: "workflow-palette-search" },
        h(FluentIcon, { name: "icon-search" }),
        h("input", {
          type: "search",
          value: query,
          placeholder: "Search primitives",
          "aria-label": "Search workflow primitives",
          onChange: (event) => setQuery(event.target.value)
        })
      ),
      visibleScopes.map((scope) => {
        const scopedNodes = matchingNodes.filter((node) => node.data.scope === scope.id);
        const includedCount = scopedNodes.filter((node) => node.data.required || node.data.enabled).length;
        const expanded = normalizedQuery ? true : expandedScopes[scope.id];
        return h("section", { className: "workflow-palette-group", key: scope.id },
          h("div", { className: "workflow-palette-scope-heading" },
            h("div", { className: "workflow-palette-scope-copy" },
              h("div", { className: "label-with-help" },
                h("strong", null, scope.label),
                h(HelpTip, { label: scope.description })
              ),
              h("small", null, `${includedCount} of ${scopedNodes.length}`)
            ),
            h("button", {
              className: "workflow-palette-section-toggle",
              type: "button",
              "aria-expanded": expanded,
              "aria-controls": `workflowScope-${scope.id}`,
              "aria-label": `${expanded ? "Collapse" : "Expand"} ${scope.label}`,
              onClick: () => setExpandedScopes((current) => ({ ...current, [scope.id]: !current[scope.id] }))
            },
              h(FluentIcon, { name: expanded ? "icon-chevron-up" : "icon-chevron-down" })
            )
          ),
          h("div", { className: "workflow-palette-list workflow-scope-list", id: `workflowScope-${scope.id}`, role: "list", "aria-label": `${scope.label} actions`, hidden: !expanded }, scopedNodes.map((node) => {
            return h("div", { className: `workflow-palette-item ${node.data.required ? "required-item" : "optional-item"} ${node.data.enabled ? "enabled" : "available"} ${node.id === selectedId ? "selected" : ""}`, role: "listitem", key: node.id },
              h("button", {
                className: "workflow-palette-select",
                type: "button",
                draggable: true,
                "aria-current": node.id === selectedId ? "step" : undefined,
                title: `Select ${node.data.label}; drag to add it to the canvas`,
                onDragStart: (event) => onDragStart(event, node),
                onDragEnd: (event) => event.currentTarget.closest(".workflow-palette-item")?.classList.remove("dragging"),
                onClick: () => onSelect(node.id)
              },
                h(FluentIcon, { name: node.data.icon }),
                h("span", null, h("strong", null, node.data.label))
              ),
              node.data.required
                ? h("button", {
                    className: "workflow-palette-fixed wui-help-tip",
                    type: "button",
                    "aria-label": "Required by this workflow template",
                    "data-tooltip": "Required by this workflow template. This action cannot be removed."
                  }, h(FluentIcon, { name: "icon-lock" }))
                : h("button", {
                    className: "workflow-palette-toggle icon-btn",
                    type: "button",
                    "aria-pressed": node.data.enabled,
                    "aria-label": node.data.enabled ? `Remove ${node.data.label}` : `Add ${node.data.label}`,
                    title: node.data.enabled ? "Remove from workflow" : "Add to workflow",
                    onClick: () => onActivate(node.id, !node.data.enabled)
                  }, h(FluentIcon, { name: node.data.enabled ? "icon-subtract" : "icon-add" })),
              h("span", {
                className: "workflow-drag-grip",
                draggable: true,
                "aria-hidden": "true",
                title: "Drag to canvas",
                onDragStart: (event) => onDragStart(event, node),
                onDragEnd: (event) => event.currentTarget.closest(".workflow-palette-item")?.classList.remove("dragging")
              }, Array.from({ length: 6 }, (_, index) => h("i", { key: index })))
            );
          }))
        );
      }),
      visibleScopes.length === 0 && h("div", { className: "workflow-palette-empty", role: "status" },
        h(FluentIcon, { name: "icon-search" }),
        h("span", null, "No matching primitives")
      )
      ),
      scrollState.up && h("span", { className: "workflow-palette-scroll-cue up", "aria-hidden": "true" },
        h(FluentIcon, { name: "icon-chevron-up" }),
        h(FluentIcon, { name: "icon-chevron-up" })
      ),
      scrollState.down && h("span", { className: "workflow-palette-scroll-cue down", "aria-hidden": "true" },
        h(FluentIcon, { name: "icon-chevron-down" }),
        h(FluentIcon, { name: "icon-chevron-down" })
      )
    );
  }

  function WorkflowContextSidebar({ workflow, nodes, selectedId, onSelect, onActivate, onDragStart, onBack, restoredRevision }) {
    return h("div", { className: "workflow-context-sidebar" },
          h("button", { className: "workflow-sidebar-back context-back-button", type: "button", "data-workflow-back": "true", onClick: onBack },
        h(FluentIcon, { name: "icon-chevron-left" }),
        "Back to Workflows"
      ),
      h("section", { className: "workflow-sidebar-identity", "aria-label": "Current workflow" },
        h("span", { className: "workflow-sidebar-icon", "aria-hidden": "true" }, h(FluentIcon, { name: "icon-workflow" })),
        h("span", null,
          h("strong", null, workflow.name),
          h("small", null, restoredRevision ? `Unsaved draft from revision v${restoredRevision}` : `Revision v${workflow.revision}`)
        )
      ),
      h(WorkflowPalette, { nodes, selectedId, onSelect, onActivate, onDragStart })
    );
  }

  function WorkflowListView({ workflows, onOpen, onNew }) {
    return h("div", { className: "workflow-list-view ia-page-frame" },
      h("header", { className: "workflow-list-header ia-page-header" },
        h("span", { className: "ia-page-icon", "aria-hidden": "true" }, h(FluentIcon, { name: "icon-workflow" })),
        h("div", { className: "ia-page-heading" },
          h("div", { className: "label-with-help" },
            h("h1", null, "Workflows"),
            h(HelpTip, { label: "Create reusable packaging and update automation. Publishing a workflow does not assign it to applications." })
          )
        ),
        h("div", { className: "ia-page-actions" },
          h("button", { className: "primary-btn", type: "button", "data-workflow-new": "true", onClick: onNew }, h(FluentIcon, { name: "icon-add" }), " New workflow")
        )
      ),
      h("div", { className: "ia-page-body workflow-list-body" },
      h("section", { className: "workflow-list-card" },
        h("table", { className: "workflow-list-table wui-data-table", "aria-label": "Available workflows" },
          h("thead", null, h("tr", null,
            h("th", { scope: "col" }, "Workflow"),
            h("th", { scope: "col" }, "Status"),
            h("th", { scope: "col" }, "Applications"),
            h("th", { scope: "col" }, "Revisions"),
            h("th", { scope: "col" }, "Runs"),
            h("th", { scope: "col" }, h("span", { className: "sr-only" }, "Actions"))
          )),
          h("tbody", null, workflows.map((workflow) => h("tr", { key: workflow.id },
            h("td", { className: "workflow-list-name" }, h("div", { className: "workflow-list-name-content" },
              h("span", { className: "workflow-list-icon" }, h(FluentIcon, { name: "icon-workflow" })),
              h("span", { className: "workflow-list-name-heading" },
                h("strong", null, workflow.name),
                h(HelpTip, { label: workflow.description })
              )
            )),
            h("td", null, h("span", { className: "status neutral" }, workflow.status)),
            h("td", null, h("strong", null, workflow.applications)),
            h("td", null, h("strong", null, workflow.revisions), h("small", null, `v${workflow.revision}`)),
            h("td", null, h("strong", null, workflow.runs || 0), workflow.previews > 0 && h("small", null, `${workflow.previews} previews`)),
            h("td", null, h("button", { type: "button", "data-workflow-open": workflow.id, onClick: () => onOpen(workflow.id) }, "Open workflow", h(FluentIcon, { name: "icon-arrow-right" })))
          )))
        )
      )
      )
    );
  }

  function useDialogFocus(dialogRef, onClose) {
    React.useEffect(() => {
      const dialog = dialogRef.current;
      const previouslyFocused = document.activeElement;
      if (!dialog) return undefined;

      const selector = "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href], [tabindex]:not([tabindex='-1'])";
      const focusables = () => Array.from(dialog.querySelectorAll(selector)).filter((element) => element.getClientRects().length > 0);
      (dialog.querySelector("[data-dialog-initial-focus='true']") || dialog.querySelector("[autofocus]") || focusables()[0])?.focus();

      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
          return;
        }
        if (event.key !== "Tab") return;
        const items = focusables();
        if (items.length === 0) {
          event.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus?.();
      };
    }, [dialogRef, onClose]);
  }

  function AssignApplicationsDialog({ workflow, applications, onAssign, onClose }) {
    const [selected, setSelected] = React.useState(new Set());
    const [query, setQuery] = React.useState("");
    const dialogRef = React.useRef(null);
    const selectAllRef = React.useRef(null);
    const titleId = `assignApplicationsTitle-${workflow.id}`;
    const descriptionId = `assignApplicationsDescription-${workflow.id}`;
    const searchId = `assignApplicationsSearch-${workflow.id}`;
    const listId = `assignApplicationsList-${workflow.id}`;
    useDialogFocus(dialogRef, onClose);

    const normalizedQuery = query.trim().toLocaleLowerCase();
    const visibleApplications = React.useMemo(() => applications.filter((app) => {
      if (!normalizedQuery) return true;
      return [app.name, app.publisher, app.version, app.readiness].some((value) => String(value || "").toLocaleLowerCase().includes(normalizedQuery));
    }), [applications, normalizedQuery]);
    const selectedVisibleCount = visibleApplications.reduce((count, app) => count + (selected.has(app.id) ? 1 : 0), 0);
    const allVisibleSelected = visibleApplications.length > 0 && selectedVisibleCount === visibleApplications.length;

    React.useEffect(() => {
      if (selectAllRef.current) selectAllRef.current.indeterminate = selectedVisibleCount > 0 && !allVisibleSelected;
    }, [selectedVisibleCount, allVisibleSelected]);

    React.useEffect(() => {
      document.body.classList.add("workflow-modal-open");
      return () => document.body.classList.remove("workflow-modal-open");
    }, []);

    const toggle = (id) => setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    const toggleVisible = () => setSelected((current) => {
      const next = new Set(current);
      if (allVisibleSelected) visibleApplications.forEach((app) => next.delete(app.id));
      else visibleApplications.forEach((app) => next.add(app.id));
      return next;
    });

    const assignSelected = () => {
      if (selected.size === 0) return;
      onAssign(Array.from(selected));
      onClose();
    };

    return ReactDOM.createPortal(h("div", { className: "workflow-dialog-backdrop workflow-assignment-backdrop" },
      h("dialog", { ref: dialogRef, className: "workflow-assignment-dialog", open: true, "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descriptionId },
        h("header", null,
          h("div", null,
            h("h2", { id: titleId }, "Assign applications"),
            h("p", { id: descriptionId }, `Assign ${workflow.name} to future versions. Existing versions keep their recorded configuration.`)
          ),
          h("button", { className: "icon-btn", type: "button", "aria-label": "Close assign applications dialog", title: "Close", onClick: onClose }, h(FluentIcon, { name: "icon-dismiss" }))
        ),
        applications.length > 0 && h("div", { className: "workflow-assignment-tools" },
          h("label", { className: "workflow-assignment-search", htmlFor: searchId },
            h(FluentIcon, { name: "icon-search" }),
            h("input", { id: searchId, type: "search", value: query, placeholder: "Search applications", "aria-label": "Search applications", "aria-controls": listId, autoFocus: true, "data-dialog-initial-focus": "true", onChange: (event) => setQuery(event.target.value) })
          ),
          h("div", { className: "workflow-assignment-select-all" },
            h("label", null,
              h("input", { ref: selectAllRef, type: "checkbox", checked: allVisibleSelected, disabled: visibleApplications.length === 0, "aria-label": normalizedQuery ? "Select all filtered applications" : "Select all available applications", onChange: toggleVisible }),
              h("span", null, "Select all")
            ),
            h("small", { role: "status", "aria-live": "polite" }, `${visibleApplications.length} ${visibleApplications.length === 1 ? "application" : "applications"} shown`)
          )
        ),
        applications.length > 0
          ? visibleApplications.length > 0
            ? h("div", { className: "workflow-assignment-list", id: listId, role: "group", "aria-label": "Applications available to assign" },
                visibleApplications.map((app) => h("label", { className: `workflow-assignment-row ${selected.has(app.id) ? "selected" : ""}`, key: app.id },
                  h("input", { type: "checkbox", checked: selected.has(app.id), "aria-label": `Select ${app.name}`, onChange: () => toggle(app.id) }),
                  h("span", { className: "workflow-assignment-app" },
                    h("strong", null, app.name),
                    h("small", null, `${app.publisher} · ${app.version}`)
                  ),
                  h("span", { className: `status ${app.tone}` }, app.readiness)
                ))
              )
            : h("div", { className: "workflow-dialog-empty workflow-filter-empty" },
                h(FluentIcon, { name: "icon-search" }),
                h("strong", null, "No matching applications"),
                h("p", null, "Try another name, publisher, version, or readiness state."),
                h("button", { type: "button", onClick: () => setQuery("") }, "Clear search")
              )
          : h("div", { className: "workflow-dialog-empty" },
              h(FluentIcon, { name: "icon-check" }),
              h("strong", null, "All available applications are assigned"),
              h("p", null, "Remove an application from this workflow before assigning it again.")
            ),
        h("footer", null,
          h("span", { role: "status", "aria-live": "polite" }, selected.size === 0 ? "No applications selected" : `${selected.size} ${selected.size === 1 ? "application" : "applications"} selected`),
          h("div", null,
            h("button", { type: "button", onClick: onClose }, "Cancel"),
            h("button", { className: "primary-btn", type: "button", disabled: selected.size === 0, onClick: assignSelected }, "Assign applications")
          )
        )
      )
    ), document.body);
  }

  function ApplicationsView({ workflow, applications, availableApplications, onAssign, onRemove }) {
    const [selected, setSelected] = React.useState(new Set());
    const [showAssignDialog, setShowAssignDialog] = React.useState(false);
    const selectAllRef = React.useRef(null);
    const tableRef = React.useRef(null);
    const selectionCommandRef = React.useRef(null);
    const canAssign = Boolean(policy.latest(workflow.id));
    const allSelected = applications.length > 0 && selected.size === applications.length;

    React.useEffect(() => {
      setSelected((current) => new Set(Array.from(current).filter((id) => applications.some((app) => app.id === id))));
    }, [applications]);

    React.useEffect(() => {
      if (selectAllRef.current) selectAllRef.current.indeterminate = selected.size > 0 && !allSelected;
    }, [selected, allSelected]);

    React.useEffect(() => {
      if (selected.size === 0 || !tableRef.current || !selectionCommandRef.current) return undefined;

      const alignSelectionCommand = () => {
        const tableBounds = tableRef.current?.getBoundingClientRect();
        const command = selectionCommandRef.current;
        if (!tableBounds || !command) return;
        const visibleLeft = Math.max(0, tableBounds.left);
        const visibleRight = Math.min(window.innerWidth, tableBounds.right);
        command.style.left = `${visibleLeft + ((visibleRight - visibleLeft) / 2)}px`;
      };

      const scrollContainer = tableRef.current.closest('[role="tabpanel"]');
      const resizeObserver = window.ResizeObserver ? new ResizeObserver(alignSelectionCommand) : null;
      alignSelectionCommand();
      resizeObserver?.observe(tableRef.current);
      window.addEventListener("resize", alignSelectionCommand);
      scrollContainer?.addEventListener("scroll", alignSelectionCommand, { passive: true });
      return () => {
        resizeObserver?.disconnect();
        window.removeEventListener("resize", alignSelectionCommand);
        scrollContainer?.removeEventListener("scroll", alignSelectionCommand);
      };
    }, [selected.size]);

    const toggle = (id) => setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    const toggleAll = () => {
      setSelected(allSelected ? new Set() : new Set(applications.map((app) => app.id)));
    };

    const removeSelected = () => {
      if (selected.size === 0) return;
      onRemove(Array.from(selected));
      setSelected(new Set());
    };

    return h("div", { className: `workflow-applications-view ${selected.size > 0 ? "has-selection" : ""}` },
      h("section", { className: "workflow-bulk-card" },
        h("header", null,
          h("div", null,
            h("h2", null, "Assigned applications"),
            h("p", null, applications.length === 0 ? "Applications assigned to this workflow will appear here." : `${applications.length} ${applications.length === 1 ? "application uses" : "applications use"} this workflow.`)
          ),
          h("div", { className: "workflow-bulk-actions" },
            h("button", { className: "primary-btn", type: "button", disabled: !canAssign, title: canAssign ? "Assign a published revision" : "Publish a revision before assigning applications", onClick: () => setShowAssignDialog(true) }, h(FluentIcon, { name: "icon-add" }), " Assign applications")
          )
        ),
        applications.length === 0
          ? h("div", { className: "workflow-empty-state workflow-applications-empty" },
              h(FluentIcon, { name: "icon-people" }),
              h("h3", null, "No applications assigned"),
              h("p", null, canAssign ? "Assign applications to use this workflow for future package updates." : "Publish a revision before assigning applications."),
              h("button", { className: "primary-btn", type: "button", disabled: !canAssign, onClick: () => setShowAssignDialog(true) }, h(FluentIcon, { name: "icon-add" }), " Assign applications")
            )
          : h("div", { ref: tableRef, className: "workflow-app-table wui-data-table", role: "table", "aria-label": "Applications assigned to this workflow" },
              h("div", { className: "workflow-app-row heading", role: "row" },
                h("span", { className: "workflow-app-select", role: "columnheader" },
                  h("input", { ref: selectAllRef, type: "checkbox", checked: allSelected, onChange: toggleAll, "aria-label": "Select all applications" })
                ),
                h("span", { role: "columnheader" }, "Application"),
                h("span", { role: "columnheader" }, "Current version"),
                h("span", { role: "columnheader" }, "Publisher"),
                h("span", { role: "columnheader" }, "Exceptions"),
                h("span", { role: "columnheader" }, "Configuration")
              ),
              applications.map((app) => {
                const applicationExceptions = Object.keys(policy.state().applications[app.id]?.overrides || {}).length;
                const versionExceptions = Object.values(policy.state().applications[app.id]?.versions || {}).reduce((sum, version) => sum + Object.keys(version.overrides).length, 0);
                const exceptionSummary = applicationExceptions || versionExceptions
                  ? `${applicationExceptions} application · ${versionExceptions} version`
                  : "None";
                return h("div", { className: `workflow-app-row ${selected.has(app.id) ? "selected" : ""}`, role: "row", key: app.id },
                  h("span", { className: "workflow-app-select", role: "cell" }, h("input", { type: "checkbox", checked: selected.has(app.id), onChange: () => toggle(app.id), "aria-label": `Select ${app.name}` })),
                  h("strong", { role: "cell" }, app.name),
                  h("span", { role: "cell" }, app.version),
                  h("span", { role: "cell" }, app.publisher),
                  h("span", { className: "workflow-app-exceptions", role: "cell" }, exceptionSummary),
                  h("span", { className: "workflow-app-action", role: "cell" },
                    h("button", { type: "button", onClick: () => window.packitPolicyUI.openApplication(app.id) }, "View configurations")
                  )
                );
              })
            ),
        selected.size > 0 && h("div", { ref: selectionCommandRef, className: "workflow-selection-command", role: "toolbar", "aria-label": "Selected application actions" },
          h("span", { role: "status", "aria-live": "polite" }, `${selected.size} ${selected.size === 1 ? "application" : "applications"} selected`),
          h("button", { className: "workflow-remove-app", type: "button", onClick: removeSelected }, h(FluentIcon, { name: "icon-dismiss" }), " Remove from workflow")
        )
      ),
      showAssignDialog && h(AssignApplicationsDialog, { workflow, applications: availableApplications, onAssign, onClose: () => setShowAssignDialog(false) })
    );
  }

  function RunsView({ workflow }) {
    const previews = policy.state().previews.filter(item => item.binding?.workflowId === workflow.id);
    return h("section", { className: "workflow-simple-view" },
      h("header", null, h("div", null, h("h2", null, "Runs and configuration snapshots"), h("p", null, "Snapshots record resolved configuration only. They are not deployment previews or external drift checks."))),
      previews.length ? h("div", { className: "policy-run-list" }, previews.map(item => h("div", { key: item.id, className: "policy-row" },
        h("span", null, h("strong", null, item.application), h("small", null, `${item.version} · v${item.binding.revision} · ${new Date(item.created).toLocaleString()}`)),
        h("span", null, "Configuration snapshot"),
        h("button", { type: "button", onClick: () => window.packitPolicyUI.showSnapshot(item) }, "View snapshot")
      ))) :
      h("div", { className: "workflow-empty-state" },
        h(FluentIcon, { name: "icon-history" }),
        h("h3", null, "No runs yet"),
        h("p", null, "Runs appear here after the workflow is assigned to an application and started by a trigger or a packager.")
      )
    );
  }

  function RevisionsView({ workflow, onRevert }) {
    const rows = policy.state().workflows[workflow.id].revisions.map((row, index) => ({ ...row, state: index ? "Published" : "Latest published", tone: "neutral", changes: "Immutable configuration snapshot" }));
    return h("section", { className: "workflow-simple-view" },
      h("header", null, h("div", null, h("h2", null, "Workflow revisions"), h("p", null, "Draft changes remain isolated until a revision is published."))),
      h("div", { className: "workflow-simple-table revisions wui-data-table", role: "table", "aria-label": "Workflow revision history" },
        h("div", { className: "heading", role: "row" }, h("span", { role: "columnheader" }, "Revision"), h("span", { role: "columnheader" }, "State"), h("span", { role: "columnheader" }, "Author"), h("span", { role: "columnheader" }, "Created"), h("span", { role: "columnheader" }, "Changes"), h("span", { role: "columnheader" }, "Actions")),
        rows.map((row, index) => h("div", { key: row.version, role: "row" },
          h("strong", { role: "cell" }, `v${row.version}`),
          h("span", { className: `status ${row.tone}`, role: "cell" }, row.state),
          h("span", { role: "cell" }, row.author),
          h("span", { role: "cell" }, row.created),
          h("span", { role: "cell" }, row.changes),
          index === 0
            ? h("span", { className: "workflow-current-revision", role: "cell" }, h(FluentIcon, { name: "icon-check" }), " Current revision")
            : h("span", { role: "cell" }, h("button", { type: "button", onClick: () => onRevert(row) }, h(FluentIcon, { name: "icon-history" }), " Revert to revision"))
        ))
      )
    );
  }

  function DiscardChangesDialog({ onClose, onDiscard }) {
    const dialogRef = React.useRef(null);
    useDialogFocus(dialogRef, onClose);

    return h("div", { className: "workflow-dialog-backdrop" },
      h("dialog", { ref: dialogRef, className: "workflow-discard-dialog", open: true, "aria-modal": "true", "aria-labelledby": "discardWorkflowTitle", "aria-describedby": "discardWorkflowDescription" },
        h("header", null, h("h2", { id: "discardWorkflowTitle" }, "Discard changes?")),
        h("p", { id: "discardWorkflowDescription" }, "This workflow has unsaved changes. If you leave now, those changes will be discarded."),
        h("footer", null,
          h("button", { type: "button", autoFocus: true, onClick: onClose }, "Keep editing"),
          h("button", { className: "danger-btn", type: "button", onClick: onDiscard }, "Discard changes")
        )
      )
    );
  }

  function WorkflowEditor() {
    const [workflows, setWorkflows] = React.useState(workflowRows);
    const [pageMode, setPageMode] = React.useState("list");
    const [workflowId, setWorkflowId] = React.useState(starterWorkflow.id);
    const [activeView, setActiveView] = React.useState("design");
    const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes("starter"));
    const [edges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges("starter"));
    const [selectedNodeId, setSelectedNodeId] = React.useState("selectWorkspace");
    const [configuration, setConfiguration] = React.useState(workflowRecipes.starter.configuration);
    const [activeRecipeId, setActiveRecipeId] = React.useState("starter");
    const [dirty, setDirty] = React.useState(false);
    const [canPublish, setCanPublish] = React.useState(false);
    const [isNewWorkflow, setIsNewWorkflow] = React.useState(false);
    const [showDiscardDialog, setShowDiscardDialog] = React.useState(false);
    const [restoredRevision, setRestoredRevision] = React.useState(null);
    const [theme, setTheme] = React.useState(document.body.dataset.theme || "light");
    const [flowInstance, setFlowInstance] = React.useState(null);
    const [dropActive, setDropActive] = React.useState(false);

    const workflow = workflows.find((item) => item.id === workflowId) || workflows[0];
    const changeConfiguration = (nodeId, key, value) => {
      setConfiguration((current) => ({ ...current, [nodeId]: { ...(current[nodeId] || {}), [key]: value } }));
      setDirty(true);
      setCanPublish(false);
    };
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    const visibleNodes = nodes
      .filter((node) => node.data.required || node.data.enabled)
      .map((node) => ({
        ...node,
        data: {
          ...node.data,
          configuration: configuration[node.id] || {},
          onConfigurationChange: changeConfiguration,
          onRemove: (id) => activateNode(id, false)
        }
      }));
    const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
    const visibleEdges = edges.filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target));

    React.useEffect(() => {
      const selectWorkflow = (event) => {
        openWorkflow(event.detail.workflowId);
      };
      window.addEventListener("packit:workflow-selected", selectWorkflow);
      return () => window.removeEventListener("packit:workflow-selected", selectWorkflow);
    }, []);

    React.useEffect(() => {
      const openRoute = (event) => {
        const { workflow: routeWorkflow, view } = event.detail || {};
        if (routeWorkflow === "new") {
          if (pageMode === "list") createWorkflow();
          return;
        }
        if (!routeWorkflow) {
          if (pageMode === "editor" && !dirty) returnToList();
          return;
        }
        openWorkflow(routeWorkflow);
        if (workflowViews.has(view)) setActiveView(view);
      };
      window.addEventListener("packit:workflow-route", openRoute);
      return () => window.removeEventListener("packit:workflow-route", openRoute);
    }, [pageMode, dirty]);

    React.useEffect(() => {
      window.packitWorkflowRouteState = {
        mode: pageMode,
        workflowId,
        view: activeView,
        isNew: isNewWorkflow
      };
      window.dispatchEvent(new CustomEvent("packit:workflow-route-state"));
    }, [pageMode, workflowId, activeView, isNewWorkflow]);

    React.useEffect(() => {
      const refresh = () => setWorkflows(workflowRows());
      window.addEventListener("packit:policy-changed", refresh);
      return () => window.removeEventListener("packit:policy-changed", refresh);
    }, []);

    React.useEffect(() => {
      const observer = new MutationObserver(() => setTheme(document.body.dataset.theme || "light"));
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      const sidebar = sidebarRootElement?.closest(".sidebar");
      sidebar?.classList.toggle("workflow-context-mode", pageMode === "editor");
      return () => sidebar?.classList.remove("workflow-context-mode");
    }, [pageMode]);

    const selectNode = (id) => setSelectedNodeId(id);
    const startPaletteDrag = (event, node) => {
      event.currentTarget.closest(".workflow-palette-item")?.classList.add("dragging");
      event.dataTransfer.effectAllowed = "copyMove";
      const payload = JSON.stringify({ nodeId: node.id, actionType: node.data.actionType || node.id, label: node.data.label });
      event.dataTransfer.setData("application/x-packit-workflow-action", payload);
      event.dataTransfer.setData("text/plain", payload);
    };
    const dragOverCanvas = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      setDropActive(true);
    };
    const leaveCanvas = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setDropActive(false);
    };
    const dropOnCanvas = (event) => {
      event.preventDefault();
      setDropActive(false);
      if (!flowInstance) return;
      let payload;
      try {
        payload = JSON.parse(event.dataTransfer.getData("application/x-packit-workflow-action") || event.dataTransfer.getData("text/plain"));
      } catch { return; }
      const definition = actionCatalog.find((action) => action.id === payload.actionType);
      if (!definition) return;
      const point = { x: event.clientX, y: event.clientY };
      const canvasBounds = event.currentTarget.getBoundingClientRect();
      const position = typeof flowInstance.screenToFlowPosition === "function"
        ? flowInstance.screenToFlowPosition(point)
        : flowInstance.project({ x: point.x - canvasBounds.left, y: point.y - canvasBounds.top });
      setNodes((current) => current.map((node) => node.id === payload.nodeId ? {
        ...node,
        position,
        data: { ...node.data, enabled: true, status: "configured" }
      } : node));
      setConfiguration((current) => current[payload.nodeId] ? current : { ...current, [payload.nodeId]: defaultActionConfiguration(payload.actionType) });
      setSelectedNodeId(payload.nodeId);
      setDirty(true);
      setCanPublish(false);
    };
    const connectNodes = React.useCallback((connection) => {
      setEdges((current) => addEdge({
        ...connection,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        className: "workflow-core-edge"
      }, current));
      setDirty(true);
      setCanPublish(false);
    }, [setEdges]);
    const handleNodesChange = React.useCallback((changes) => {
      onNodesChange(changes);
      if (changes.some((change) => change.type === "position" && change.dragging === false)) {
        setDirty(true);
        setCanPublish(false);
      }
    }, [onNodesChange]);
    const handleEdgesChange = React.useCallback((changes) => {
      onEdgesChange(changes);
      if (changes.some((change) => change.type === "remove")) {
        setDirty(true);
        setCanPublish(false);
      }
    }, [onEdgesChange]);
    const activateNode = (id, enabled = true) => {
      setNodes((current) => current.map((node) => {
        const activated = current.find((candidate) => candidate.id === id);
        const activatedType = activated?.data.actionType || id;
        const nodeType = node.data.actionType || node.id;
        const mutuallyExclusive = enabled && ((activatedType === "wrapPsadt" && nodeType === "unwrapPsadt") || (activatedType === "unwrapPsadt" && nodeType === "wrapPsadt"));
        if (mutuallyExclusive) return { ...node, data: { ...node.data, enabled: false, status: "available" } };
        return node.id === id ? { ...node, data: { ...node.data, enabled, status: enabled ? "configured" : "available" } } : node;
      }));
      setSelectedNodeId(id);
      setDirty(true);
      setCanPublish(false);
    };
    const resetEditor = (recipeId = "starter", nextConfiguration = workflowRecipes[recipeId]?.configuration || {}) => {
      setActiveRecipeId(recipeId);
      setNodes(createInitialNodes(recipeId));
      setEdges(createInitialEdges(recipeId));
      setConfiguration(JSON.parse(JSON.stringify(nextConfiguration)));
      setSelectedNodeId("selectWorkspace");
      setActiveView("design");
      setDirty(false);
      setCanPublish(false);
      setRestoredRevision(null);
    };
    const returnToList = ({ discardNew = false } = {}) => {
      if (discardNew && isNewWorkflow) {
        policy.discard(workflow.id);
      }
      resetEditor();
      setPageMode("list");
      setIsNewWorkflow(false);
      setShowDiscardDialog(false);
    };
    const requestExit = () => dirty ? setShowDiscardDialog(true) : returnToList();
    const discardChanges = () => returnToList({ discardNew: true });
    const openWorkflow = (id) => {
      const stored = policy.state().workflows[id];
      if (!stored) return;
      const saved = stored.draft || stored.revisions[0];
      const recipeId = saved?.recipeId || stored.recipeId || (workflowRecipes[id] ? id : "starter");
      resetEditor(recipeId, saved?.configuration || workflowRecipes[recipeId]?.configuration || {});
      if (saved) {
        const enabledIds = new Set(saved.optionalIds || []);
        const savedNodes = saved.graph?.nodes ? hydrateWorkflowNodes(saved.graph.nodes, saved.graph.layoutVersion) : createInitialNodes(recipeId);
        setNodes(savedNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            enabled: node.data.required || enabledIds.has(node.id),
            status: node.data.required || enabledIds.has(node.id) ? "configured" : "available"
          }
        })));
        if (saved.graph?.edges) setEdges(hydrateWorkflowEdges(saved.graph.edges));
      }
      setCanPublish(Boolean(stored.draft));
      setWorkflowId(id);
      setPageMode("editor");
      setIsNewWorkflow(false);
    };
    const revertToRevision = (revision) => {
      const recipeId = revision.recipeId || activeRecipeId;
      const enabledOptionalIds = new Set(revision.optionalIds);
      setActiveRecipeId(recipeId);
      setEdges(revision.graph?.edges ? hydrateWorkflowEdges(revision.graph.edges) : createInitialEdges(recipeId));
      const revisionNodes = revision.graph?.nodes ? hydrateWorkflowNodes(revision.graph.nodes, revision.graph.layoutVersion) : createInitialNodes(recipeId);
      setNodes(revisionNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          enabled: node.data.required || enabledOptionalIds.has(node.id),
          status: node.data.required || enabledOptionalIds.has(node.id) ? "configured" : "available"
        }
      })));
      setConfiguration(JSON.parse(JSON.stringify(revision.configuration)));
      setSelectedNodeId("selectWorkspace");
      setRestoredRevision(revision.version);
      setDirty(true);
      setCanPublish(false);
      setActiveView("design");
    };
    const saveDraft = () => {
      const optionalIds = nodes.filter(node => node.data.enabled).map(node => node.id);
      policy.saveDraft(workflow.id, { recipeId: activeRecipeId, configuration, optionalIds, graph: serializeWorkflowGraph(nodes, edges), values: policyValues(optionalIds, configuration) });
      setDirty(false);
      setCanPublish(true);
      setIsNewWorkflow(false);
      setRestoredRevision(null);
    };
    const publishWorkflow = () => {
      policy.publish(workflow.id);
      setDirty(false);
      setCanPublish(false);
      setRestoredRevision(null);
      setPageMode("list");
      setIsNewWorkflow(false);
    };
    const createWorkflow = () => {
      const id = `custom-${Date.now()}`;
      const created = { id, name: "Untitled update workflow", description: "New workflow created from the PacKit required backbone.", revision: "0.1", revisions: 1, applications: 0, runs: 0, status: "Draft", modified: "Just now" };
      policy.create(id, created.name, created.description);
      setWorkflowId(id);
      resetEditor("starter", workflowRecipes.starter.configuration);
      setPageMode("editor");
      setDirty(true);
      setCanPublish(false);
      setIsNewWorkflow(true);
    };
    const assignApplications = (ids) => {
      if (!policy.latest(workflow.id)) { showToast("Publish a revision before assigning applications"); return; }
      ids.forEach(id => policy.bind(id, workflow.id));
    };
    const removeApplications = ids => window.packitPolicyUI.confirmDetach(ids);
    const assignedApplicationIds = Object.values(policy.state().applications).filter(app => app.binding?.workflowId === workflow.id).map(app => app.id);
    const assignedApplications = assignableApplications.filter((app) => assignedApplicationIds.includes(app.id));
    const availableApplications = assignableApplications.filter((app) => !policy.state().applications[app.id]?.binding);

    const nodeTypes = React.useMemo(() => ({ packitNode: PackitNode }), []);
    const isValidConnection = React.useCallback((connection) => connection.source !== connection.target, []);
    const tabs = [["design", "Design", "icon-workflow"], ["applications", "Applications", "icon-people"], ["runs", "Runs", "icon-history"], ["revisions", "Revisions", "icon-copy"]];
    const selectAdjacentTab = (event, currentIndex) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      setActiveView(tabs[nextIndex][0]);
      requestAnimationFrame(() => document.querySelector(`#workflow-tab-${tabs[nextIndex][0]}`)?.focus());
    };

    if (pageMode === "list") {
      return h("div", { className: "workflow-workspace" },
        h(WorkflowListView, { workflows, onOpen: openWorkflow, onNew: createWorkflow })
      );
    }

    return h(React.Fragment, null,
      sidebarRootElement && ReactDOM.createPortal(
        h(WorkflowContextSidebar, { workflow, nodes, selectedId: selectedNodeId, onSelect: selectNode, onActivate: activateNode, onDragStart: startPaletteDrag, onBack: requestExit, restoredRevision }),
        sidebarRootElement
      ),
      h("div", { className: "workflow-workspace" },
      h("header", { className: "workflow-commandbar", role: "toolbar", "aria-label": "Workflow commands" },
        h("div", { className: "workflow-command-identity" },
          h("span", { className: "workflow-command-icon" }, h(FluentIcon, { name: "icon-workflow" })),
          h("div", null,
            h("strong", null, workflow.name),
            h("span", { className: "workflow-command-meta" },
              h("span", null, restoredRevision ? `Unsaved draft from revision v${restoredRevision}` : `Revision v${workflow.revision}`),
              h(HelpTip, { label: "Published revisions are immutable. Assigned applications remain pinned to their revision until an update is reviewed." })
            )
          )
        ),
        h("div", { className: "workflow-command-actions" },
          h("button", { type: "button", onClick: requestExit }, "Cancel"),
          h("button", { type: "button", disabled: !dirty, onClick: saveDraft }, "Save draft"),
          h("button", { className: "primary-btn", type: "button", disabled: !canPublish, title: canPublish ? "Publish the saved workflow revision" : "Save the draft before publishing", onClick: publishWorkflow }, "Publish revision")
        )
      ),
      h("nav", { className: "workflow-context-tabs wui-context-tabs", role: "tablist", "aria-label": "Workflow sections" },
        tabs.map((item, index) =>
          h("button", { key: item[0], id: `workflow-tab-${item[0]}`, type: "button", role: "tab", tabIndex: activeView === item[0] ? 0 : -1, className: activeView === item[0] ? "active" : "", "aria-selected": activeView === item[0], "aria-controls": `workflow-panel-${item[0]}`, onKeyDown: (event) => selectAdjacentTab(event, index), onClick: () => setActiveView(item[0]) }, h(FluentIcon, { name: item[2] }), item[1])
        )
      ),
      activeView === "design" && h("div", { className: "workflow-design-layout", id: "workflow-panel-design", role: "tabpanel", "aria-labelledby": "workflow-tab-design", tabIndex: 0 },
        h("section", { className: `workflow-canvas ${dropActive ? "is-drop-target" : ""}`, "aria-label": "Workflow canvas" },
          h(FlowCanvas, {
            nodes: visibleNodes,
            edges: visibleEdges,
            nodeTypes,
            onInit: setFlowInstance,
            onNodesChange: handleNodesChange,
            onEdgesChange: handleEdgesChange,
            onConnect: connectNodes,
            onDragOver: dragOverCanvas,
            onDragLeave: leaveCanvas,
            onDrop: dropOnCanvas,
            onNodeClick: (_event, node) => setSelectedNodeId(node.id),
            isValidConnection,
            deleteKeyCode: null,
            defaultViewport: { x: 105, y: 20, zoom: 0.86 },
            minZoom: 0.45,
            maxZoom: 1.4,
            nodesConnectable: true,
            nodesFocusable: true,
            edgesFocusable: true,
            autoPanOnNodeFocus: true,
            colorMode: theme === "dark" ? "dark" : "light",
            ariaLabelConfig: { "controls.ariaLabel": "Workflow canvas controls", "minimap.ariaLabel": "Workflow overview" }
          },
            h(Background, { gap: 18, size: 1 }),
            h(Controls, { showInteractive: false }),
            h(MiniMap, { pannable: true, zoomable: true, nodeStrokeWidth: 3 })
          ),
          h("div", { className: "workflow-canvas-help" },
            h(HelpTip, { label: "Drag actions from the left, connect their handles, and edit common options in place. Full configuration remains in Properties." })
          )
        ),
        h(WorkflowInspector, { node: selectedNode, configuration: configuration[selectedNodeId] || {}, onConfigurationChange: changeConfiguration, onActivate: activateNode })
      ),
      activeView === "applications" && h("div", { id: "workflow-panel-applications", role: "tabpanel", "aria-labelledby": "workflow-tab-applications", tabIndex: 0 }, h(ApplicationsView, { workflow, applications: assignedApplications, availableApplications, onAssign: assignApplications, onRemove: removeApplications })),
      activeView === "runs" && h("div", { id: "workflow-panel-runs", role: "tabpanel", "aria-labelledby": "workflow-tab-runs", tabIndex: 0 }, h(RunsView, { workflow })),
      activeView === "revisions" && h("div", { id: "workflow-panel-revisions", role: "tabpanel", "aria-labelledby": "workflow-tab-revisions", tabIndex: 0 }, h(RevisionsView, { workflow, onRevert: revertToRevision })),
      showDiscardDialog && h(DiscardChangesDialog, { onClose: () => setShowDiscardDialog(false), onDiscard: discardChanges })
      )
    );
  }

  ReactDOM.createRoot(rootElement).render(h(WorkflowEditor));
})();
