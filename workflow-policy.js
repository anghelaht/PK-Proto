/* Shared configuration ownership. Published revisions and previews are snapshots. */
(function (root) {
  "use strict";
  const clone = value => JSON.parse(JSON.stringify(value));
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function createPolicyStore(storage, notify = () => {}) {
    const storageKey = "packit-workflow-policy-v1";
    let state = { workflows: {}, applications: {}, previews: [], audit: [] };
    let schema = {};
    try {
      const saved = JSON.parse(storage?.getItem(storageKey) || "null");
      if (saved?.workflows && saved?.applications && Array.isArray(saved.previews) && Array.isArray(saved.audit)) state = saved;
    } catch { /* A corrupt or unavailable browser store must not prevent startup. */ }
    const record = (action, details) => {
      state.audit.unshift({ action, ...clone(details), author: "You", at: new Date().toISOString() });
      let persisted = true;
      try { storage?.setItem(storageKey, JSON.stringify(state)); } catch { persisted = false; }
      notify({ persisted });
    };
    const revision = (id, version) => state.workflows[id]?.revisions.find(item => item.version === version);
    const latest = id => state.workflows[id]?.revisions[0];
    const application = id => {
      if (!state.applications[id]) state.applications[id] = { id, name: id, binding: null, overrides: {}, versions: {} };
      return state.applications[id];
    };
    function ensureVersion(id, version) {
      const app = application(id);
      if (!app.versions[version]) app.versions[version] = { binding: clone(app.binding), applicationOverrides: clone(app.overrides), overrides: {}, inputs: {} };
      return app.versions[version];
    }
    function context(id, version) {
      const app = application(id);
      const target = version ? ensureVersion(id, version) : app;
      const base = target.binding ? revision(target.binding.workflowId, target.binding.revision) : null;
      return { app, target, base, inherited: version ? target.applicationOverrides : {}, overrides: target.overrides };
    }
    function effective(id, version) {
      const { target, base, inherited, overrides } = context(id, version);
      const values = {};
      for (const [key, value] of Object.entries(base?.values || {})) values[key] = { value: clone(value), source: "workflow", revision: base.version };
      for (const [key, entry] of Object.entries(inherited)) values[key] = { value: clone(entry.value), source: "application", ...clone(entry) };
      for (const [key, entry] of Object.entries(overrides)) values[key] = { value: clone(entry.value), source: version ? "version" : "application", ...clone(entry) };
      return { binding: clone(target.binding), values };
    }
    function register(definitions, nodes, catalog, history = []) {
      schema = {};
      const actionNodeIds = new Set(nodes.filter((node) => node.category === "control" || node.category === "domain" || node.category === "primitive").map((node) => node.id));
      for (const node of nodes) for (const field of definitions[node.id] || []) {
        schema[`${node.id}.${field.key}`] = { ...clone(field), node: node.id, group: node.label, required: node.required, actionCatalog: actionNodeIds.has(node.id) };
      }
      const valuesFor = (optionalIds, configuration = {}) => {
        const usesActionCatalog = optionalIds.some((nodeId) => actionNodeIds.has(nodeId));
        return Object.fromEntries(Object.entries(schema)
        .filter(([, field]) => usesActionCatalog
          ? optionalIds.includes(field.node) && Object.prototype.hasOwnProperty.call(configuration[field.node] || {}, field.key)
          : field.required || optionalIds.includes(field.node))
        .map(([key, field]) => [key, configuration[field.node]?.[field.key] ?? field.defaultValue ?? field.checked ?? field.options?.[0] ?? field.value ?? ""]));
      };
      if (!state.workflows.guided) {
        const configuration = { requirements: { os: "Windows 10 22H2" }, detection: { method: "PowerShell script" }, publish: { target: "Microsoft Intune" }, cleanup: { action: "Remove assignments and retire", retention: "7 days" } };
        state.workflows.guided = { id: "guided", name: "Guided Intune Update", description: "Reusable update, assignment and retirement policy.", revisions: [{ version: "1.4", values: valuesFor(["wrapper"], configuration), configuration, optionalIds: ["wrapper"], author: "PacKit", created: "Included with prototype" }], draft: null };
      }
      if (!state.workflows.starter) state.workflows.starter = { id: "starter", name: "Standard application update", description: "Detect, prepare, assign and retire application versions.", revisions: (history.length ? history : [{ version: "1.3", configuration: {}, optionalIds: [] }]).map(row => ({ ...clone(row), values: valuesFor(row.optionalIds, row.configuration), author: row.author || "PacKit", created: row.created || "Included with prototype" })), draft: null };
      for (const item of catalog) {
        const isNew = !state.applications[item.name];
        const app = application(item.name);
        app.name = item.name;
        app.publisher = item.publisher;
        app.version = item.version;
        const previousDesiredWorkflow = app.desiredWorkflow || null;
        app.desiredWorkflow = item.workflow || null;
        if (previousDesiredWorkflow !== app.desiredWorkflow && !app.binding) app.workflowSeeded = false;
        if (app.binding?.workflowId === "guided" && item.workflow !== "guided") {
          app.binding = null;
          app.overrides = {};
          app.workflowSeeded = false;
        }
        for (const version of Object.values(app.versions || {})) {
          if (version.binding?.workflowId !== "guided" || item.workflow === "guided") continue;
          version.binding = null;
          version.applicationOverrides = {};
          version.overrides = {};
        }
        if (item.workflow && !app.workflowSeeded) {
          const published = latest(item.workflow);
          if (published) {
            app.binding = { workflowId: item.workflow, revision: published.version };
            app.workflowSeeded = true;
          }
        }
        if (isNew && !item.workflow) app.workflowSeeded = true;
        for (const version of item.existingVersions || []) ensureVersion(item.name, version);
      }
      return valuesFor;
    }
    function setOverride(id, version, key, value, scope, reason) {
      const { target, base } = context(id, version);
      const field = schema[key];
      if (!field || !base || !(key in base.values)) throw new Error("This setting is no longer managed by the selected revision.");
      if (!reason.trim()) throw new Error("Add a reason for this exception.");
      if (field.options && !field.options.includes(value)) throw new Error("Choose a supported value.");
      if (field.type === "checkbox" && typeof value !== "boolean") throw new Error("Choose On or Off.");
      const current = effective(id, version).values[key];
      if (equal(current.value, value)) return false;
      if (scope === "application" && version && !equal(application(id).binding, target.binding)) throw new Error("This version uses a different revision. Add the application exception from Automation workflow instead.");
      const entry = { value: clone(value), baseline: clone(base.values[key]), revision: base.version, reason: reason.trim(), author: "You", at: new Date().toISOString() };
      if (scope === "application") {
        application(id).overrides[key] = entry;
        if (version) { target.applicationOverrides[key] = clone(entry); delete target.overrides[key]; }
      } else {
        if (!version) throw new Error("Choose a version for a version exception.");
        target.overrides[key] = entry;
      }
      record("Exception saved", { application: id, version: version || null, key, scope, ...entry });
      return true;
    }
    function restore(id, version, key) {
      const { target, overrides, inherited } = context(id, version);
      if (key in overrides) delete overrides[key];
      else if (version && key in inherited) delete target.applicationOverrides[key];
      record("Inheritance restored", { application: id, version: version || null, key });
    }
    function compare(id, version, nextVersion) {
      const { target, base, inherited, overrides } = context(id, version);
      const next = revision(target.binding?.workflowId, nextVersion);
      if (!next) throw new Error("Published revision not found.");
      const exceptions = { ...inherited, ...overrides };
      return [...new Set([...Object.keys(base?.values || {}), ...Object.keys(next.values), ...Object.keys(exceptions)])].map(key => {
        const entry = exceptions[key];
        const incompatible = Boolean(entry && (!(key in next.values) || (schema[key]?.options && !schema[key].options.includes(entry.value))));
        return { key, before: base?.values[key], after: next.values[key], exception: entry?.value, overridden: Boolean(entry), incompatible, changed: !equal(base?.values[key], next.values[key]) };
      }).filter(row => row.changed || row.overridden);
    }
    function adopt(id, version, nextVersion, acknowledged, clear = []) {
      const rows = compare(id, version, nextVersion);
      if (rows.some(row => row.overridden && row.changed) && !acknowledged) throw new Error("Review changed defaults for your exceptions before adopting.");
      if (rows.some(row => row.incompatible && !clear.includes(row.key))) throw new Error("Remove incompatible exceptions before adopting this revision.");
      const { target } = context(id, version);
      for (const key of clear) { delete target.overrides[key]; if (version) delete target.applicationOverrides[key]; }
      target.binding.revision = nextVersion;
      record("Revision adopted", { application: id, version: version || null, revision: nextVersion, cleared: clear });
    }
    function bind(id, workflowId) {
      const app = application(id);
      if (app.binding?.workflowId === workflowId) return;
      if (app.binding) throw new Error("Remove the current workflow before assigning another one. Existing versions keep their recorded configuration.");
      const published = latest(workflowId);
      if (!published) throw new Error("Publish a revision before assigning applications.");
      app.binding = { workflowId, revision: published.version };
      app.workflowSeeded = true;
      app.overrides = {};
      record("Workflow assigned for future versions", { application: id, workflowId, revision: published.version });
    }
    function replaceBinding(id, workflowId, version = null, includeVersion = false) {
      const app = application(id);
      const published = latest(workflowId);
      if (!published) throw new Error("Publish a revision before assigning applications.");
      const binding = { workflowId, revision: published.version };
      app.binding = clone(binding);
      app.workflowSeeded = true;
      app.overrides = {};
      if (version && includeVersion) {
        const target = ensureVersion(id, version);
        target.binding = clone(binding);
        target.applicationOverrides = {};
        target.overrides = {};
      }
      record("Workflow assignment changed", { application: id, version: includeVersion ? version : null, workflowId, revision: published.version });
    }
    function detach(id) {
      const app = application(id);
      app.binding = null;
      app.workflowSeeded = true;
      app.overrides = {};
      record("Workflow removed for future versions", { application: id });
    }
    function attachVersion(id, version) {
      const app = application(id);
      const target = ensureVersion(id, version);
      if (!app.binding) throw new Error("Assign an application workflow first.");
      if (target.binding) throw new Error("This version already has a recorded workflow. Review its revisions instead.");
      target.binding = clone(app.binding);
      target.applicationOverrides = clone(app.overrides);
      record("Workflow applied to local version", { application: id, version, ...app.binding });
    }
    function publish(id) {
      const workflow = state.workflows[id];
      if (!workflow?.draft) throw new Error("Save a draft before publishing.");
      const old = latest(id)?.version || "0.0";
      const parts = old.split(".");
      parts[parts.length - 1] = String(Number(parts.at(-1)) + 1);
      const item = { ...clone(workflow.draft), version: parts.join("."), author: "You", created: new Date().toISOString() };
      workflow.revisions.unshift(item);
      workflow.draft = null;
      record("Workflow revision published", { workflowId: id, revision: item.version });
      return clone(item);
    }
    function preview(id, version) {
      const resolved = effective(id, version);
      const { target } = context(id, version);
      const item = { id: `preview-${Date.now()}-${state.previews.length}`, application: id, version, created: new Date().toISOString(), kind: "Configuration preview", ...resolved, inputs: clone(target.inputs || {}) };
      state.previews.unshift(clone(item));
      record("Configuration preview captured", { application: id, version });
      return clone(item);
    }
    return {
      register, effective, setOverride, restore, compare, adopt, bind, replaceBinding, detach, attachVersion, publish, preview,
      schema: () => clone(schema), state: () => clone(state), latest: id => clone(latest(id) || null),
      ensureVersion: (id, version) => clone(ensureVersion(id, version)),
      saveInputs(id, version, inputs) { ensureVersion(id, version).inputs = clone(inputs); record("Version inputs saved", { application: id, version }); },
      saveDraft(id, draft) { state.workflows[id].draft = clone(draft); record("Workflow draft saved", { workflowId: id }); },
      seedBuiltIn(item) {
        const current = state.workflows[item.id];
        const previousBuiltInVersion = current?.builtInVersion || null;
        const seededVersion = item.revision.version;
        const customRevisions = current?.revisions?.filter((entry) => entry.author !== "PacKit" && entry.created !== "Included with prototype") || [];
        state.workflows[item.id] = {
          id: item.id,
          name: item.name,
          description: item.description,
          recipeId: item.recipeId,
          builtInVersion: seededVersion,
          revisions: [clone(item.revision), ...customRevisions],
          draft: current?.builtInVersion === seededVersion ? current?.draft || null : null
        };
        for (const app of Object.values(state.applications)) {
          if (app.desiredWorkflow !== item.id) continue;
          const migrateCurrentBuiltIn = app.binding?.workflowId === item.id
            && (!previousBuiltInVersion || app.binding.revision === previousBuiltInVersion);
          const migrateSeededBinding = (!app.binding && !app.workflowSeeded) || app.binding?.workflowId === "guided" || migrateCurrentBuiltIn;
          if (migrateSeededBinding) {
            app.binding = { workflowId: item.id, revision: seededVersion };
            app.overrides = {};
            for (const version of Object.values(app.versions || {})) {
              const migrateVersionBuiltIn = version.binding?.workflowId === item.id
                && (!previousBuiltInVersion || version.binding.revision === previousBuiltInVersion);
              if (!version.binding || version.binding.workflowId === "guided" || migrateVersionBuiltIn) {
                version.binding = { workflowId: item.id, revision: seededVersion };
                version.applicationOverrides = {};
              }
            }
          }
          app.workflowSeeded = true;
        }
        try { storage?.setItem(storageKey, JSON.stringify(state)); } catch { /* The prototype still works when storage is unavailable. */ }
      },
      create(id, name, description) { state.workflows[id] = { id, name, description, revisions: [], draft: null }; record("Workflow created", { workflowId: id }); },
      discard(id) { if (!latest(id)) { delete state.workflows[id]; record("Unsaved workflow discarded", { workflowId: id }); } }
    };
  }
  if (typeof module !== "undefined") module.exports = { createPolicyStore };
  else {
    let storage;
    try { storage = root.localStorage; } catch { /* Session-only fallback. */ }
    root.packitPolicy = createPolicyStore(storage, detail => root.dispatchEvent(new CustomEvent("packit:policy-changed", { detail })));
  }
})(typeof window === "undefined" ? globalThis : window);
