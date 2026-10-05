/* Semantic deep links for the prototype's stable navigation and view state. */
(() => {
  "use strict";

  const routeKeys = ["page", "application", "version", "section", "workflow", "workflowView", "theme", "account"];
  const validPages = new Set(["applications", "digital-signature", "automation", "discover-tools", "settings"]);
  const validVersionSections = new Set(["package", "install", "deployment", "review"]);
  const validApplicationSections = new Set(["application-details", "update-strategy", "workflow"]);
  const validWorkflowViews = new Set(["design", "applications", "runs", "revisions"]);
  const automationSections = { daemon: "daemon", workflows: "workflows", "run-history": "history" };
  const accountRouteTabs = { profile: "profile", "intune-accounts": "intune" };
  const accountRoutes = { profile: "profile", intune: "intune-accounts" };
  let applyingRoute = false;
  let pendingSync = false;
  let pendingReplace = false;

  const slug = (value) => String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const applicationForRoute = (value) => apps.find((app) => slug(app.name) === value);
  const workflowIdForRoute = (value) => Object.values(packitPolicy.state().workflows)
    .find((workflow) => workflow.id === value || slug(workflow.name) === value)?.id;

  function currentState() {
    const state = {};
    const theme = document.body.dataset.themePreference;
    if (theme && themeOptions[theme]) state.theme = theme;

    if (!accountFlyout.hidden) {
      const activeAccount = accountTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.accountTab;
      if (activeAccount) state.account = accountRoutes[activeAccount];
    }

    if (detailView.classList.contains("active")) {
      state.page = "applications";
      state.application = slug(selectedApplication.name);
      const applicationSection = document.querySelector(".app-nav-item.active")?.dataset.appSection;
      const versionSection = document.querySelector(".tab.active")?.dataset.tab;
      if (applicationSection) {
        state.section = applicationSection === "applicationDetails" ? "application-details"
          : applicationSection === "updateStrategy" ? "update-strategy"
            : "workflow";
      } else {
        state.version = selectedVersion;
        state.section = validVersionSections.has(versionSection) ? versionSection : "package";
      }
      return state;
    }

    if (signatureView.classList.contains("active")) return { ...state, page: "digital-signature" };

    if (automationView.classList.contains("active")) {
      state.page = "automation";
      const tabName = document.querySelector("[data-automation-tab].active")?.dataset.automationTab || "daemon";
      state.section = tabName === "history" ? "run-history" : tabName;
      if (tabName === "workflows") {
        const workflowState = window.packitWorkflowRouteState;
        const visibleWorkflow = document.querySelector(".workflow-command-identity strong")?.textContent.trim();
        const visibleView = document.querySelector("[id^='workflow-tab-'][aria-selected='true']")?.id.replace("workflow-tab-", "");
        if (workflowState?.mode === "editor" || visibleWorkflow) {
          const workflowId = workflowState?.workflowId || workflowIdForRoute(slug(visibleWorkflow));
          state.workflow = workflowState?.isNew || visibleWorkflow === "Untitled update workflow" ? "new" : workflowId;
          state.workflowView = validWorkflowViews.has(visibleView) ? visibleView : workflowState?.view || "design";
        }
      }
      return state;
    }

    if (toolsView.classList.contains("active")) return { ...state, page: "discover-tools" };

    if (settingsView.classList.contains("active")) {
      state.page = "settings";
      if (!psadtTemplatesPage.hidden) state.section = "psadt-templates";
      return state;
    }

    return { ...state, page: "applications" };
  }

  function routeUrl(state) {
    const url = new URL(window.location.href);
    routeKeys.forEach((key) => url.searchParams.delete(key));
    Object.entries(state).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
    });
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function writeRoute({ replace = false } = {}) {
    if (applyingRoute || document.documentElement.classList.contains("prototype-locked")) return;
    const next = routeUrl(currentState());
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) return;
    window.history[replace ? "replaceState" : "pushState"]({ packitRoute: true }, "", next);
  }

  function scheduleRouteSync({ replace = false } = {}) {
    pendingReplace = pendingSync ? pendingReplace && replace : replace;
    if (pendingSync) return;
    pendingSync = true;
    queueMicrotask(() => {
      const shouldReplace = pendingReplace;
      pendingSync = false;
      pendingReplace = false;
      writeRoute({ replace: shouldReplace });
    });
  }

  function applyRoute() {
    const params = new URLSearchParams(window.location.search);
    const requestedTheme = params.get("theme");
    const page = validPages.has(params.get("page")) ? params.get("page") : "applications";
    const section = params.get("section");
    const requestedAccount = params.get("account");
    applyingRoute = true;

    try {
      if (requestedTheme && themeOptions[requestedTheme]) setTheme(requestedTheme);

      if (page === "digital-signature") {
        showSignature();
      } else if (page === "automation") {
        showWorkspaceView("automation");
        const automationSection = automationSections[section] || "daemon";
        setAutomationTab(automationSection);
        if (automationSection === "workflows") {
          const requestedWorkflow = params.get("workflow");
          const workflowId = requestedWorkflow && requestedWorkflow !== "new" ? workflowIdForRoute(requestedWorkflow) : requestedWorkflow;
          const workflowView = validWorkflowViews.has(params.get("workflowView")) ? params.get("workflowView") : "design";
          window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent("packit:workflow-route", { detail: { workflow: workflowId, view: workflowView } }));
          }, 0);
        }
      } else if (page === "discover-tools") {
        showWorkspaceView("discover");
      } else if (page === "settings") {
        showWorkspaceView("settings");
        if (section === "psadt-templates") showPsadtTemplatesPage();
      } else {
        const requestedApplication = applicationForRoute(params.get("application"));
        if (!requestedApplication) {
          showWorkspaceView("applications");
        } else {
          const isApplicationSection = validApplicationSections.has(section);
          openDetail(isApplicationSection ? "overview" : (validVersionSections.has(section) ? section : "package"), requestedApplication);
          if (isApplicationSection) {
            setAppSection(section === "application-details" ? "applicationDetails" : section === "update-strategy" ? "updateStrategy" : "applicationWorkflow");
          } else {
            const requestedVersion = params.get("version");
            const versionButton = requestedVersion && versionList.querySelector(`.version[data-version="${CSS.escape(requestedVersion)}"]`);
            if (versionButton) versionButton.click();
          }
        }
      }

      if (requestedAccount && accountRouteTabs[requestedAccount]) {
        openAccountFlyout();
        setAccountTab(accountRouteTabs[requestedAccount]);
      } else {
        closeAccountFlyout();
      }
    } finally {
      queueMicrotask(() => { applyingRoute = false; });
    }
  }

  document.addEventListener("click", () => scheduleRouteSync());
  accountToggle.addEventListener("click", () => scheduleRouteSync());
  themeToggle.addEventListener("click", () => scheduleRouteSync());
  window.addEventListener("packit:workflow-selected", () => scheduleRouteSync({ replace: true }));
  window.addEventListener("packit:workflow-route-state", () => scheduleRouteSync({ replace: true }));
  window.addEventListener("popstate", applyRoute);
  window.packitRoutes = { apply: applyRoute, sync: writeRoute, state: currentState };
  applyRoute();
})();
