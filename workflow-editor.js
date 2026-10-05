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
    useNodesState,
    useEdgesState
  } = window.ReactFlow;

  const starterWorkflow = {
    id: "starter",
    name: "Standard application update",
    description: "Detect, prepare, assign and retire application versions with one reusable update policy.",
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

  const nodeDefinitions = [
    { id: "trigger", label: "Update trigger", icon: "icon-history", summary: "New catalog version detected", required: true },
    { id: "source", label: "Resolve installer source", icon: "icon-folder", summary: "Acquire the matching installer", required: true },
    { id: "inspect", label: "Inspect package", icon: "icon-search", summary: "Verify identity, version and content", required: true },
    { id: "information", label: "App & package information", icon: "icon-info", summary: "Resolve metadata for the next version", required: true },
    { id: "program", label: "Install & uninstall behavior", icon: "icon-tools", summary: "Commands, context, timeout and restart", required: true },
    { id: "requirements", label: "Requirements", icon: "icon-list", summary: "Architecture and minimum OS", required: true },
    { id: "detection", label: "Detection", icon: "icon-detection", summary: "Prove the installed application state", required: true },
    { id: "returnCodes", label: "Return codes & restart", icon: "icon-refresh", summary: "Interpret process outcomes consistently", required: true },
    { id: "transition", label: "Future version handling", icon: "icon-copy", summary: "Create and configure the next package version", required: true },
    { id: "build", label: "Build package", icon: "icon-folder", summary: "Create the selected deployment artifact", required: true },
    { id: "validate", label: "Build & verify", icon: "icon-check", summary: "Validate installation, upgrade and detection", required: true },
    { id: "approval", label: "Review & approval", icon: "icon-people", summary: "Review resolved changes before execution", required: true },
    { id: "publish", label: "Publish output", icon: "icon-download", summary: "Build only, Intune, MECM or both", required: true },
    { id: "assignments", label: "Future assignments", icon: "icon-people", summary: "Move or preserve Required, Available and Uninstall", required: true },
    { id: "cleanup", label: "Previous version handling", icon: "icon-history", summary: "Retain, unassign or retire after deployment", required: true },
    { id: "wrapper", label: "Wrapper", icon: "icon-tools", summary: "PSAppDeployToolkit or custom wrapper", required: false },
    { id: "customScripts", label: "Custom scripts", icon: "icon-signature", summary: "Pre-install and post-install actions", required: false },
    { id: "repair", label: "Repair behavior", icon: "icon-tools", summary: "Define an optional repair path", required: false },
    { id: "dependencies", label: "Dependencies", icon: "icon-workflow", summary: "Resolve prerequisite applications", required: false },
    { id: "scopeTags", label: "Scope tags", icon: "icon-tag", summary: "No tags selected", required: false },
    { id: "signing", label: "Digital signing", icon: "icon-signature", summary: "Apply the configured signing profile", required: false },
    { id: "notifications", label: "Notifications", icon: "icon-feedback", summary: "Notify owners about approvals and failures", required: false },
    { id: "monitoring", label: "Post-publish monitoring", icon: "icon-eye", summary: "Observe deployment and device results", required: false }
  ];

  const requiredIds = nodeDefinitions.filter((node) => node.required).map((node) => node.id);
  const workflowViews = new Set(["design", "applications", "runs", "revisions"]);

  function createInitialNodes() {
    const requiredNodes = nodeDefinitions.filter((node) => node.required).map((node, index) => ({
      id: node.id,
      type: "packitNode",
      position: { x: 84, y: 36 + index * 116 },
      data: { ...node, enabled: true, status: "configured" }
    }));
    const optionalPositions = {
      wrapper: { x: 360, y: 418 },
      customScripts: { x: 360, y: 534 },
      repair: { x: 360, y: 650 },
      dependencies: { x: 360, y: 766 },
      signing: { x: 360, y: 1114 },
      scopeTags: { x: 360, y: 1230 },
      notifications: { x: 360, y: 1346 },
      monitoring: { x: 360, y: 1462 }
    };
    const optionalNodes = nodeDefinitions.filter((node) => !node.required).map((node) => ({
      id: node.id,
      type: "packitNode",
      position: optionalPositions[node.id],
      data: { ...node, enabled: Boolean(node.enabled), status: node.enabled ? "configured" : "available" }
    }));
    return [...requiredNodes, ...optionalNodes];
  }

  function createInitialEdges() {
    const coreEdges = requiredIds.slice(0, -1).map((source, index) => ({
      id: `${source}-${requiredIds[index + 1]}`,
      source,
      target: requiredIds[index + 1],
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      className: "workflow-core-edge"
    }));
    return [
      ...coreEdges,
      { id: "program-wrapper", source: "program", target: "wrapper", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "program-customScripts", source: "program", target: "customScripts", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "program-repair", source: "program", target: "repair", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "requirements-dependencies", source: "requirements", target: "dependencies", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "build-signing", source: "build", target: "signing", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "publish-scopeTags", source: "publish", target: "scopeTags", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "approval-notifications", source: "approval", target: "notifications", type: "smoothstep", className: "workflow-optional-edge" },
      { id: "publish-monitoring", source: "publish", target: "monitoring", type: "smoothstep", className: "workflow-optional-edge" }
    ];
  }

  function FluentIcon({ name }) {
    return h("span", { className: `fluent ${name}`, "aria-hidden": "true" });
  }

  function PackitNode({ data, selected }) {
    const stateLabel = data.required ? "Required" : data.enabled ? "Optional · Added" : "Optional";
    return h("div", {
      className: `packit-flow-node ${data.required ? "required" : "optional"} ${data.enabled ? "enabled" : "available"} ${selected ? "selected" : ""}`
    },
      h(Handle, { type: "target", position: Position.Top, className: "workflow-handle" }),
      h("div", { className: "packit-flow-node-heading" },
        h("span", { className: "packit-flow-node-icon" }, h(FluentIcon, { name: data.icon })),
        h("span", null,
          h("strong", null, data.label),
          h("small", null, stateLabel)
        ),
        h(FluentIcon, { name: data.required || data.enabled ? "icon-check" : "icon-add" })
      ),
      h("p", null, data.summary),
      h(Handle, { type: "source", position: Position.Bottom, className: "workflow-handle" })
    );
  }

  const fieldDefinitions = {
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
    build: [
      { key: "artifact", label: "Package artifact", type: "select", options: ["IntuneWin", "MECM content", "Both targets"] },
      { key: "clean", label: "Use clean build directory", type: "checkbox", checked: true }
    ],
    validate: [
      { key: "installTest", label: "Clean install test", type: "checkbox", checked: true },
      { key: "upgradeTest", label: "Upgrade test", type: "checkbox", checked: true },
      { key: "uninstallTest", label: "Uninstall and detection test", type: "checkbox", checked: true }
    ],
    approval: [
      { key: "approval", label: "Approval policy", type: "select", options: ["Required before publication", "Required after validation", "No approval"] }
    ],
    publish: [
      { key: "target", label: "Workflow output", type: "select", options: ["Build only", "Microsoft Intune", "MECM", "Intune and MECM"] },
      { key: "failure", label: "If publication fails", type: "select", options: ["Stop and keep the current deployment", "Pause for review", "Retry the failed target"] }
    ],
    wrapper: [
      { key: "wrapper", label: "Wrapper", type: "select", options: ["PSAppDeployToolkit v4", "PSAppDeployToolkit v3 compatibility", "Custom PowerShell", "Direct installer"] },
      { key: "interaction", label: "User interaction", type: "select", options: ["Silent", "Allow deferral", "Close blocking processes"] }
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
    customScripts: [
      { key: "preInstall", label: "Pre-install action", type: "select", options: ["None", "Run configured PowerShell script", "Require application binding"] },
      { key: "postInstall", label: "Post-install action", type: "select", options: ["None", "Run configured PowerShell script", "Require application binding"] }
    ],
    repair: [
      { key: "repair", label: "Repair command", type: "select", options: ["Resolve from installer", "Use wrapper repair phase", "Require application binding"] },
      { key: "testRepair", label: "Validate repair during testing", type: "checkbox", checked: true }
    ],
    dependencies: [
      { key: "source", label: "Dependency source", type: "select", options: ["Application binding", "Existing deployment relationships", "Shared dependency set"] },
      { key: "install", label: "Install dependencies automatically", type: "checkbox", checked: true }
    ],
    scopeTags: [
      { key: "source", label: "Scope tag source", type: "select", options: ["Application binding", "Workspace default", "Require selection before publication"] }
    ],
    assignments: [
      { key: "source", label: "Start from", type: "select", options: ["Previous version assignments", "Workflow assignment defaults", "No existing assignments"] },
      { key: "rings", label: "Assignment rings", type: "select", options: ["Pilot → IT → Production", "Pilot → Production", "Single ring"] },
      { key: "required", label: "Required assignments", type: "radio", defaultValue: "Keep current Required assignments and require the next version", options: ["Move Required assignments to the next version", "Keep current Required assignments and require the next version", "Do not automate Required assignments"] },
      { key: "available", label: "Available assignments", type: "radio", defaultValue: "Move Available assignments to the next version", options: ["Move Available assignments to the next version", "Keep current Available assignments and make the next version available", "Do not automate Available assignments"] },
      { key: "silentUpdate", label: "Update devices that have the current version installed", type: "checkbox", checked: false },
      { key: "uninstall", label: "Uninstall assignments", type: "radio", defaultValue: "Copy Uninstall assignments to the next version", options: ["Keep Uninstall assignments on the current version only", "Copy Uninstall assignments to the next version", "Do not automate Uninstall assignments"] }
    ],
    signing: [
      { key: "profile", label: "Signing profile", type: "select", options: ["Workspace default", "Application binding", "Require selection before build"] },
      { key: "scripts", label: "Sign generated PowerShell scripts", type: "checkbox", checked: true }
    ],
    notifications: [
      { key: "events", label: "Notify on", type: "select", options: ["Approval and failure", "Failure only", "Every completed run"] },
      { key: "recipients", label: "Recipients", type: "select", options: ["Application owners", "Workflow operators", "Application owners and operators"] }
    ],
    monitoring: [
      { key: "source", label: "Monitor", type: "select", options: ["Deployment operations and device results", "Deployment operations only", "Device results only"] },
      { key: "failureGate", label: "Pause rollout on failure threshold", type: "checkbox", checked: true }
    ],
    cleanup: [
      { key: "when", label: "When the rollout is complete", type: "select", options: ["After the Production ring succeeds", "After explicit approval", "After a retention period"] },
      { key: "retention", label: "Retention period", type: "select", options: ["No delay", "3 days", "7 days", "14 days", "30 days"] },
      { key: "action", label: "Previous version action", type: "select", options: ["Keep the version and its assignments", "Remove assignments only", "Retire the deployment object", "Remove assignments and retire"] },
      { key: "failureGate", label: "Keep the previous version active while deployment failures remain", type: "checkbox", checked: true }
    ]
  };

  const starterRevisionHistory = [
    {
      version: "1.3",
      state: "Current",
      tone: "success",
      author: "Mara Ionescu",
      created: "28 Sep 2026",
      changes: "Simplified the required backbone and approval defaults",
      optionalIds: [],
      configuration: {}
    },
    {
      version: "1.2",
      state: "Published",
      tone: "neutral",
      author: "Andrei Pop",
      created: "19 Sep 2026",
      changes: "Added assignment rings and PSADT wrapper defaults",
      optionalIds: ["wrapper"],
      configuration: {
        source: { acquisition: "Linked catalog", variant: "Prefer x64 stable release" },
        wrapper: { wrapper: "PSAppDeployToolkit v4", interaction: "Allow deferral" },
        assignments: { source: "Assignment workflow", rings: "Pilot → IT → Production" },
        publish: { target: "Microsoft Intune", failure: "Pause for review" }
      }
    },
    {
      version: "1.1",
      state: "Published",
      tone: "neutral",
      author: "Mara Ionescu",
      created: "6 Sep 2026",
      changes: "Enabled wrapper handling and stricter validation",
      optionalIds: ["wrapper"],
      configuration: {
        source: { acquisition: "Publisher URL", variant: "Require review when multiple variants match" },
        wrapper: { wrapper: "PSAppDeployToolkit v4", interaction: "Silent" },
        validate: { installTest: true, upgradeTest: true, uninstallTest: true },
        approval: { approval: "Required after validation" }
      }
    },
    {
      version: "1.0",
      state: "Published",
      tone: "neutral",
      author: "PacKit",
      created: "25 Aug 2026",
      changes: "Initial application-update workflow",
      optionalIds: [],
      configuration: {
        source: { acquisition: "Monitored folder", variant: "Match application architecture and locale" },
        detection: { method: "File version", versionCheck: true },
        publish: { target: "Build only", failure: "Stop and keep the current deployment" }
      }
    }
  ];

  const policy = window.packitPolicy;
  const existingVersionIds = [...document.querySelectorAll("#versionList [data-version]")].map(button => button.dataset.version);
  const policyCatalog = apps.map(app => ({ ...app, existingVersions: app.empty ? [] : existingVersionIds }));
  const policyValues = policy.register(fieldDefinitions, nodeDefinitions, policyCatalog, starterRevisionHistory);
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
    const fields = fieldDefinitions[node.id] || [];
    return h("aside", { className: "workflow-inspector", "aria-label": `${node.data.label} properties` },
      h("header", null,
        h("span", { className: "workflow-inspector-icon" }, h(FluentIcon, { name: node.data.icon })),
        h("div", null,
          !node.data.required && h("small", null, "Optional workflow step"),
          h("h2", null, node.data.label),
          h("p", null, node.data.summary)
        )
      ),
      !node.data.required && !node.data.enabled
        ? h("div", { className: "workflow-optional-prompt" },
            h("strong", null, "Not included in this workflow"),
            h("p", null, "Add this step to configure it and include it during execution."),
            h("button", { className: "primary-btn", type: "button", onClick: () => onActivate(node.id) }, h(FluentIcon, { name: "icon-add" }), " Add to workflow")
          )
        : h("div", { className: "workflow-inspector-form" },
            h("p", { className: "policy-meta" }, "Inherited by assigned applications. Local exceptions must be explicitly confirmed; publishing creates a revision for review."),
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
              : h("label", { key: field.key, className: field.type === "checkbox" ? "workflow-check-field" : "" },
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
                    h("span", { key: `${field.key}-label` }, field.label),
                    field.type === "select"
                      ? h("select", {
                          key: `${field.key}-input`,
                          value: configuration[field.key] ?? field.options[0],
                          onChange: (event) => onConfigurationChange(node.id, field.key, event.target.value)
                        }, field.options.map((option) => h("option", { key: option }, option)))
                      : h("input", {
                          key: `${field.key}-input`,
                          type: "text",
                          value: configuration[field.key] ?? field.value ?? "",
                          onChange: (event) => onConfigurationChange(node.id, field.key, event.target.value)
                        })
                  ]
            )),
            !node.data.required && h("button", { className: "workflow-remove-step", type: "button", onClick: () => onActivate(node.id, false) }, h(FluentIcon, { name: "icon-dismiss" }), " Remove from workflow")
          ),
      h("footer", null,
        h("span", { className: `status ${node.data.enabled ? "success" : "neutral"}` }, h(FluentIcon, { name: node.data.enabled ? "icon-check" : "icon-add" }), node.data.enabled ? "Configured" : "Available"),
        h("small", null, "Changes are saved with the workflow draft.")
      )
    );
  }

  function WorkflowPalette({ nodes, selectedId, onSelect, onActivate }) {
    const [requiredExpanded, setRequiredExpanded] = React.useState(true);
    const [optionalExpanded, setOptionalExpanded] = React.useState(true);
    const requiredNodes = nodes.filter((node) => node.data.required);
    const optionalNodes = nodes.filter((node) => !node.data.required);
    const enabledOptionalCount = optionalNodes.filter((node) => node.data.enabled).length;
    return h("aside", { className: "workflow-palette", "aria-label": "Workflow steps" },
      h("header", null, h("h2", null, "Workflow steps"), h("p", null, "Required steps are protected. Add optional behavior where needed.")),
      h("section", { className: "workflow-palette-group" },
        h("button", {
          className: "workflow-palette-section-toggle",
          type: "button",
          "aria-expanded": requiredExpanded,
          "aria-controls": "requiredWorkflowSteps",
          onClick: () => setRequiredExpanded((expanded) => !expanded)
        },
          h("span", null, h("strong", null, "Required backbone"), h("small", null, `${requiredNodes.length} protected steps`)),
          h(FluentIcon, { name: requiredExpanded ? "icon-chevron-up" : "icon-chevron-down" })
        ),
        h("div", { className: "workflow-palette-list required-list", id: "requiredWorkflowSteps", role: "list", "aria-label": "Required workflow steps", hidden: !requiredExpanded }, requiredNodes.map((node) =>
          h("div", { className: `workflow-palette-item required-item ${node.id === selectedId ? "selected" : ""}`, role: "listitem", key: node.id },
            h("button", { className: "workflow-palette-select", type: "button", "aria-current": node.id === selectedId ? "step" : undefined, onClick: () => onSelect(node.id) },
              h(FluentIcon, { name: node.data.icon }),
              h("span", null, h("strong", null, node.data.label), h("small", null, "Required"))
            ),
            h("span", { className: "workflow-palette-fixed", title: "Required step", "aria-label": "Required step" }, h(FluentIcon, { name: "icon-lock" }))
          )
        ))
      ),
      h("section", { className: "workflow-palette-group" },
        h("button", {
          className: "workflow-palette-section-toggle",
          type: "button",
          "aria-expanded": optionalExpanded,
          "aria-controls": "optionalWorkflowSteps",
          onClick: () => setOptionalExpanded((expanded) => !expanded)
        },
          h("span", null, h("strong", null, "Optional steps"), h("small", null, `${enabledOptionalCount} of ${optionalNodes.length} added`)),
          h(FluentIcon, { name: optionalExpanded ? "icon-chevron-up" : "icon-chevron-down" })
        ),
        h("div", { className: "workflow-palette-list", id: "optionalWorkflowSteps", role: "list", "aria-label": "Optional workflow steps", hidden: !optionalExpanded }, optionalNodes.map((node) =>
          h("div", { className: `workflow-palette-item optional-item ${node.data.enabled ? "enabled" : "available"} ${node.id === selectedId ? "selected" : ""}`, role: "listitem", key: node.id },
            h("button", { className: "workflow-palette-select", type: "button", "aria-current": node.id === selectedId ? "step" : undefined, onClick: () => onSelect(node.id) },
              h(FluentIcon, { name: node.data.icon }),
              h("span", null, h("strong", null, node.data.label), h("small", null, node.data.enabled ? "Added" : "Available"))
            ),
            h("button", {
              className: "workflow-palette-toggle icon-btn",
              type: "button",
              "aria-pressed": node.data.enabled,
              "aria-label": node.data.enabled ? `Remove ${node.data.label}` : `Add ${node.data.label}`,
              title: node.data.enabled ? "Remove from workflow" : "Add to workflow",
              onClick: () => onActivate(node.id, !node.data.enabled)
            }, h(FluentIcon, { name: node.data.enabled ? "icon-subtract" : "icon-add" }))
          )
        ))
      ),
      h("section", { className: "workflow-legend" },
        h("h3", null, "Legend"),
        h("span", null, h("i", { className: "required" }), " Required"),
        h("span", null, h("i", { className: "optional" }), " Optional")
      )
    );
  }

  function WorkflowContextSidebar({ workflow, nodes, selectedId, onSelect, onActivate, onBack, restoredRevision }) {
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
      h(WorkflowPalette, { nodes, selectedId, onSelect, onActivate })
    );
  }

  function WorkflowListView({ workflows, onOpen, onNew }) {
    const [showGuidance, setShowGuidance] = React.useState(true);
    return h("div", { className: "workflow-list-view ia-page-frame" },
      h("header", { className: "workflow-list-header ia-page-header" },
        h("span", { className: "ia-page-icon", "aria-hidden": "true" }, h(FluentIcon, { name: "icon-workflow" })),
        h("div", { className: "ia-page-heading" },
          h("h1", null, "Workflows"),
          h("p", null, "Create reusable packaging and update automation, then assign it to applications when ready.")
        ),
        h("div", { className: "ia-page-actions" },
          h("button", { className: "primary-btn", type: "button", "data-workflow-new": "true", onClick: onNew }, h(FluentIcon, { name: "icon-add" }), " New workflow")
        )
      ),
      h("div", { className: "ia-page-body workflow-list-body" },
      h("section", { className: "workflow-list-card" },
        h("table", { className: "workflow-list-table", "aria-label": "Available workflows" },
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
              h("span", null, h("strong", null, workflow.name), h("small", null, workflow.description))
            )),
            h("td", null, h("span", { className: "status neutral" }, workflow.status)),
            h("td", null, h("strong", null, workflow.applications), h("small", null, workflow.applications === 1 ? "application" : "applications")),
            h("td", null, h("strong", null, workflow.revisions), h("small", null, `Current v${workflow.revision}`)),
            h("td", null, h("strong", null, "0 runs"), h("small", null, `${workflow.previews || 0} configuration previews`)),
            h("td", null, h("button", { type: "button", "data-workflow-open": workflow.id, onClick: () => onOpen(workflow.id) }, "Open workflow", h(FluentIcon, { name: "icon-arrow-right" })))
          )))
        )
      ),
      showGuidance && h("div", { className: "workflow-list-note wui-info-bar informational", role: "note" },
        h(FluentIcon, { name: "icon-info" }),
        h("span", { className: "wui-info-bar-content" },
          h("strong", null, "Start with the PacKit workflow, then make it yours"),
          h("small", null, "No applications are affected until you assign and publish the workflow.")
        ),
        h("button", { className: "wui-info-bar-close", type: "button", "aria-label": "Dismiss message", title: "Dismiss", onClick: () => setShowGuidance(false) }, h(FluentIcon, { name: "icon-dismiss" }))
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
    const canAssign = Boolean(policy.latest(workflow.id));

    React.useEffect(() => {
      setSelected((current) => new Set(Array.from(current).filter((id) => applications.some((app) => app.id === id))));
    }, [applications]);

    const toggle = (id) => setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    const removeSelected = () => {
      if (selected.size === 0) return;
      onRemove(Array.from(selected));
      setSelected(new Set());
    };

    return h("div", { className: "workflow-applications-view" },
      h("section", { className: "workflow-bulk-card" },
        h("header", null,
          h("div", null,
            h("h2", null, "Assigned applications"),
            h("p", null, applications.length === 0 ? "Applications assigned to this workflow will appear here." : `${applications.length} ${applications.length === 1 ? "application uses" : "applications use"} this workflow.`)
          ),
          h("div", { className: "workflow-bulk-actions" },
            applications.length > 0 && h("button", { className: "workflow-remove-app", type: "button", disabled: selected.size === 0, onClick: removeSelected }, h(FluentIcon, { name: "icon-dismiss" }), " Remove app from workflow"),
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
          : h("div", { className: "workflow-app-table", role: "table", "aria-label": "Applications assigned to this workflow" },
              h("div", { className: "workflow-app-row heading", role: "row" }, h("span", null), h("span", null, "Application"), h("span", null, "Current version"), h("span", null, "Publisher"), h("span", null, "Workflow")),
              applications.map((app) => h("label", { className: `workflow-app-row ${selected.has(app.id) ? "selected" : ""}`, role: "row", key: app.id },
                h("span", null, h("input", { type: "checkbox", checked: selected.has(app.id), onChange: () => toggle(app.id), "aria-label": `Select ${app.name}` })),
                h("strong", null, app.name),
                h("span", null, app.version),
                h("span", null, app.publisher),
                h("span", null,
                  h("span", { className: "policy-meta" }, `Pinned v${policy.state().applications[app.id]?.binding?.revision} · ${Object.keys(policy.state().applications[app.id]?.overrides || {}).length} application exceptions · ${Object.values(policy.state().applications[app.id]?.versions || {}).reduce((sum, version) => sum + Object.keys(version.overrides).length, 0)} version exceptions`),
                  h("button", { type: "button", onClick: () => window.packitPolicyUI.openApplication(app.id) }, "View configuration")
                )
              ))
            )
      ),
      showAssignDialog && h(AssignApplicationsDialog, { workflow, applications: availableApplications, onAssign, onClose: () => setShowAssignDialog(false) })
    );
  }

  function RunsView({ workflow }) {
    const previews = policy.state().previews.filter(item => item.binding?.workflowId === workflow.id);
    return h("section", { className: "workflow-simple-view" },
      h("header", null, h("div", null, h("h2", null, "Runs and configuration previews"), h("p", null, "Previews capture configuration only. No deployment or external drift check is performed."))),
      previews.length ? h("div", { className: "policy-run-list" }, previews.map(item => h("div", { key: item.id, className: "policy-row" },
        h("span", null, h("strong", null, item.application), h("small", null, `${item.version} · v${item.binding.revision} · ${new Date(item.created).toLocaleString()}`)),
        h("span", null, "Configuration preview"),
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
      h("div", { className: "workflow-simple-table revisions", role: "table", "aria-label": "Workflow revision history" },
        h("div", { className: "heading", role: "row" }, h("span", null, "Revision"), h("span", null, "State"), h("span", null, "Author"), h("span", null, "Created"), h("span", null, "Changes"), h("span", null, "Actions")),
        rows.map((row, index) => h("div", { key: row.version, role: "row" },
          h("strong", null, `v${row.version}`),
          h("span", { className: `status ${row.tone}` }, row.state),
          h("span", null, row.author),
          h("span", null, row.created),
          h("span", null, row.changes),
          index === 0
            ? h("span", { className: "workflow-current-revision" }, h(FluentIcon, { name: "icon-check" }), " Current revision")
            : h("button", { type: "button", onClick: () => onRevert(row) }, h(FluentIcon, { name: "icon-history" }), " Revert to revision")
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
    const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
    const [edges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges());
    const [selectedNodeId, setSelectedNodeId] = React.useState("source");
    const [configuration, setConfiguration] = React.useState({});
    const [dirty, setDirty] = React.useState(false);
    const [canPublish, setCanPublish] = React.useState(false);
    const [isNewWorkflow, setIsNewWorkflow] = React.useState(false);
    const [showDiscardDialog, setShowDiscardDialog] = React.useState(false);
    const [restoredRevision, setRestoredRevision] = React.useState(null);
    const [theme, setTheme] = React.useState(document.body.dataset.theme || "light");

    const workflow = workflows.find((item) => item.id === workflowId) || workflows[0];
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    const visibleNodes = nodes.filter((node) => node.data.required || node.data.enabled);
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
    const activateNode = (id, enabled = true) => {
      setNodes((current) => current.map((node) => node.id === id ? { ...node, data: { ...node.data, enabled, status: enabled ? "configured" : "available" } } : node));
      setSelectedNodeId(id);
      setDirty(true);
      setCanPublish(false);
    };
    const resetEditor = () => {
      setNodes(createInitialNodes());
      setEdges(createInitialEdges());
      setConfiguration({});
      setSelectedNodeId("source");
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
      resetEditor();
      const stored = policy.state().workflows[id];
      if (!stored) return;
      const saved = stored.draft || stored.revisions[0];
      if (saved) {
        setConfiguration(saved.configuration);
        setNodes(createInitialNodes().map(node => ({ ...node, data: { ...node.data, enabled: node.data.required || saved.optionalIds.includes(node.id) } })));
      }
      setCanPublish(Boolean(stored.draft));
      setWorkflowId(id);
      setPageMode("editor");
      setIsNewWorkflow(false);
    };
    const changeConfiguration = (nodeId, key, value) => {
      setConfiguration((current) => ({ ...current, [nodeId]: { ...(current[nodeId] || {}), [key]: value } }));
      setDirty(true);
      setCanPublish(false);
    };
    const revertToRevision = (revision) => {
      const enabledOptionalIds = new Set(revision.optionalIds);
      setNodes((current) => current.map((node) => ({
        ...node,
        data: {
          ...node.data,
          enabled: node.data.required || enabledOptionalIds.has(node.id),
          status: node.data.required || enabledOptionalIds.has(node.id) ? "configured" : "available"
        }
      })));
      setConfiguration(JSON.parse(JSON.stringify(revision.configuration)));
      setSelectedNodeId("source");
      setRestoredRevision(revision.version);
      setDirty(true);
      setCanPublish(false);
      setActiveView("design");
    };
    const saveDraft = () => {
      const optionalIds = nodes.filter(node => !node.data.required && node.data.enabled).map(node => node.id);
      policy.saveDraft(workflow.id, { configuration, optionalIds, values: policyValues(optionalIds, configuration) });
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
      resetEditor();
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
        h(WorkflowContextSidebar, { workflow, nodes, selectedId: selectedNodeId, onSelect: selectNode, onActivate: activateNode, onBack: requestExit, restoredRevision }),
        sidebarRootElement
      ),
      h("div", { className: "workflow-workspace" },
      h("header", { className: "workflow-commandbar", role: "toolbar", "aria-label": "Workflow commands" },
        h("div", { className: "workflow-command-identity" },
          h("span", { className: "workflow-command-icon" }, h(FluentIcon, { name: "icon-workflow" })),
          h("div", null, h("strong", null, workflow.name), h("span", null, restoredRevision ? `Unsaved draft from revision v${restoredRevision}` : `Revision v${workflow.revision}`))
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
      h("div", { className: "policy-workflow-notice wui-info-bar informational", role: "note" },
        h(FluentIcon, { name: "icon-info" }),
        h("span", null, "Published revisions are immutable. Applications keep their pinned revision and exceptions until an update is reviewed. Existing versions retain their recorded configuration.")
      ),
      activeView === "design" && h("div", { className: "workflow-design-layout", id: "workflow-panel-design", role: "tabpanel", "aria-labelledby": "workflow-tab-design", tabIndex: 0 },
        h("section", { className: "workflow-canvas", "aria-label": "Workflow canvas" },
          h(FlowCanvas, {
            nodes: visibleNodes,
            edges: visibleEdges,
            nodeTypes,
            onNodesChange,
            onEdgesChange,
            onNodeClick: (_event, node) => setSelectedNodeId(node.id),
            isValidConnection,
            deleteKeyCode: null,
            defaultViewport: { x: 105, y: 20, zoom: 0.78 },
            minZoom: 0.45,
            maxZoom: 1.4,
            nodesConnectable: false,
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
          h("div", { className: "workflow-canvas-hint" }, h(FluentIcon, { name: "icon-info" }), " Select a node to configure it. Required steps cannot be deleted.")
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
