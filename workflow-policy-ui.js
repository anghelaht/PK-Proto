(function () {
  "use strict";
  const policy = window.packitPolicy;
  const panel = document.querySelector("#applicationWorkflowPanel");
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const icon = name => `<span class="fluent icon-${name === "edit" ? "settings" : name}" aria-hidden="true"></span>`;
  const display = value => value === undefined ? "Not managed" : typeof value === "boolean" ? value ? "On" : "Off" : String(value);
  const id = () => selectedApplication.name;
  let scopeVersion = null;
  let syncing = false;
  let pendingWrapper = null;
  let pendingCodes = null;
  const prototypeVersionBaseline = captureVersionConfiguration();
  const detectionTarget = document.createElement("div");
  detectionTarget.className = "form-grid single";
  detectionTarget.hidden = true;
  detectionTarget.innerHTML = '<label><span id="policyDetectionTargetLabel">Detection target</span><input id="policyDetectionTarget" required /><small>Version input for the inherited detection method.</small></label>';
  document.querySelector("#detectionPanel .form-grid.single").after(detectionTarget);
  const detectionInput = detectionTarget.querySelector("input");
  detectionInput.addEventListener("input", markVersionConfigurationDirty);
  const sourceNames = { workflow: "Workflow", application: "Application exception", version: "Version exception" };
  const dialog = document.createElement("dialog");
  dialog.id = "policyDialog";
  dialog.className = "content-dialog policy-dialog";
  dialog.setAttribute("aria-labelledby", "policyDialogTitle");
  document.body.append(dialog);
  let returnFocus;
  let returnFocusLabel;
  dialog.addEventListener("close", () => {
    if (dialog.open) return;
    if (returnFocus?.isConnected) returnFocus.focus();
    else {
      const replacement = [...document.querySelectorAll("button[aria-label]")].find(button => button.getAttribute("aria-label") === returnFocusLabel && button.getClientRects().length);
      (replacement || panel.querySelector("#policyViewScope"))?.focus();
    }
  });
  function showDialog(title, body, primary, submit, { wide = false, validate } = {}) {
    if (dialog.open) dialog.close();
    else {
      returnFocus = document.activeElement;
      returnFocusLabel = returnFocus?.getAttribute("aria-label");
    }
    dialog.classList.toggle("policy-dialog-wide", wide);
    dialog.innerHTML = `<form><header><h2 id="policyDialogTitle">${esc(title)}</h2></header><div class="policy-dialog-body">${body}<p class="policy-error" id="policyDialogError" role="alert" hidden></p></div><footer><button type="button" data-policy-cancel>Cancel</button><button class="primary-btn" type="submit">${esc(primary)}</button></footer></form>`;
    dialog.querySelector("[data-policy-cancel]").onclick = () => dialog.close();
    dialog.querySelector("form").onsubmit = event => {
      event.preventDefault();
      try {
        if (validate && !validate()) return;
        submit();
      } catch (error) {
        const message = dialog.querySelector("#policyDialogError");
        message.hidden = false;
        message.textContent = error.message;
      }
    };
    dialog.showModal();
    dialog.querySelector("[data-policy-cancel]").focus();
  }
  const info = text => `<div class="wui-info-bar informational policy-info" role="note">${icon("info")}<span>${esc(text)}</span></div>`;
  function ownershipTooltip(label, value, resolved, pending = false) {
    const workflow = policy.state().workflows[resolved.binding?.workflowId];
    const workflowName = workflow?.name || "the assigned workflow";
    const revision = resolved.binding?.revision ? ` v${resolved.binding.revision}` : "";
    if (pending) return `${label} is being edited as a version exception to ${workflowName}${revision}. Changes are not saved yet.`;
    if (value.source === "application") return `${label} uses an application exception to ${workflowName}${revision}. It applies to this and future versions while the workflow remains attached.`;
    if (value.source === "version") return `${label} uses a version exception to ${workflowName}${revision}. It applies only to version ${selectedVersion} while the workflow remains attached.`;
    return `${label} is managed by ${workflowName}${revision}. Editing creates a scoped exception while the workflow remains attached.`;
  }
  function ownershipMarkup(label, value, resolved, { editable = true, pending = false, editLabel = `Edit ${label}` } = {}) {
    const tooltip = ownershipTooltip(label, value, resolved, pending);
    const iconName = value.source === "workflow" || pending ? "lock" : "settings";
    return `<button class="wui-help-tip policy-source-tip ${value.source === "workflow" ? "inherited" : "exception"}" type="button" aria-label="${esc(tooltip)}" data-tooltip="${esc(tooltip)}">${icon(iconName)}</button>${editable ? `<button class="policy-inline-edit" type="button" data-policy-inline-edit aria-label="${esc(editLabel)}">Edit</button>` : ""}`;
  }
  function ensureFieldOwnership(control, fallbackLabel) {
    const label = control.closest("label");
    let labelRow = label?.querySelector(":scope > .policy-field-label");
    if (!labelRow && label) {
      const textNode = [...label.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      labelRow = document.createElement("span");
      labelRow.className = "policy-field-label";
      const name = document.createElement("span");
      name.className = "policy-field-name";
      name.textContent = textNode?.textContent.trim() || fallbackLabel;
      const owner = document.createElement("span");
      owner.className = "policy-inline-owner";
      labelRow.append(name, owner);
      label.insertBefore(labelRow, textNode || control);
      textNode?.remove();
    }
    return labelRow?.querySelector(".policy-inline-owner");
  }
  function fieldControl(key, value) {
    const field = policy.schema()[key];
    const options = field.type === "checkbox" ? [true, false] : field.options;
    return `<label class="policy-field">${esc(field.label)}${options ? `<select id="policyEditValue">${options.map(option => `<option value="${esc(option)}" ${option === value ? "selected" : ""}>${esc(display(option))}</option>`).join("")}</select>` : `<input id="policyEditValue" value="${esc(value)}" required />`}</label>`;
  }
  function editSetting(key, version = scopeVersion) {
    if (versionConfigurationDirty) { showToast("Save or cancel version changes before creating an exception"); return; }
    const resolved = policy.effective(id(), version);
    const current = resolved.values[key];
    const field = policy.schema()[key];
    if (!current || !field) return;
    showDialog("Edit outside the workflow?",
      `<p><strong>${esc(field.label)}</strong> is inherited from ${esc(policy.state().workflows[resolved.binding.workflowId].name)} v${esc(resolved.binding.revision)}.</p>${info("Only this setting will change. The workflow and all other inherited settings remain attached.")}`,
      "Continue", () => {
        const appBinding = policy.state().applications[id()].binding;
        const canShare = JSON.stringify(appBinding) === JSON.stringify(resolved.binding);
        const scopeControl = version ? `<fieldset class="policy-scope"><legend>Apply exception to</legend><label><input type="radio" name="exceptionScope" value="version" checked /> This version only (${esc(version)})</label><label><input type="radio" name="exceptionScope" value="application" ${canShare ? "" : "disabled"} /> This version and future versions of this application</label>${!canShare ? '<small>To change future versions, edit the application policy on its own revision.</small>' : ""}</fieldset>` : info("Applies to future versions of this application. Existing versions keep their recorded configuration.");
        showDialog(`Edit ${field.label}`, `${fieldControl(key, current.value)}${scopeControl}<label class="policy-field">Reason<input id="policyExceptionReason" required maxlength="240" value="${esc(current.reason || "")}" /></label><p class="policy-meta">Workflow default: ${esc(display(policy.state().workflows[resolved.binding.workflowId].revisions.find(row => row.version === resolved.binding.revision).values[key]))}</p>`, "Save exception", () => {
          const raw = dialog.querySelector("#policyEditValue").value;
          const value = field.type === "checkbox" ? raw === "true" : raw;
          const scope = version ? dialog.querySelector("[name='exceptionScope']:checked").value : "application";
          const changed = policy.setOverride(id(), version, key, value, scope, dialog.querySelector("#policyExceptionReason").value);
          dialog.close();
          if (changed) window.dispatchEvent(new CustomEvent("packit:version-exception-saved", { detail: { version, kind: key === "returnCodes.defaults" ? "deployment" : "version" } }));
          refresh();
          showToast(changed ? "Setting exception saved. Other settings remain inherited." : "No value changed. Ownership is unchanged.");
        });
        dialog.querySelector("#policyEditValue").focus();
      });
  }
  function restoreSetting(key) {
    const current = policy.effective(id(), scopeVersion).values[key];
    showDialog("Restore inheritance?", `<p>Remove the ${esc(sourceNames[current.source].toLowerCase())} for <strong>${esc(policy.schema()[key].label)}</strong>?</p>${info(scopeVersion ? "This version will use its next inherited value. Other versions and the application policy are unchanged." : "Future versions will use the workflow default. Existing versions and their snapshots are unchanged.")}`, "Restore inheritance", () => {
      policy.restore(id(), scopeVersion, key);
      dialog.close(); refresh(); showToast("Inheritance restored");
    });
  }
  function reviewRevision() {
    const resolved = policy.effective(id(), scopeVersion);
    const next = policy.latest(resolved.binding.workflowId);
    const changes = policy.compare(id(), scopeVersion, next.version);
    const rows = changes.map(row => `<tr><th scope="row">${esc(policy.schema()[row.key]?.label || row.key)}</th><td>${esc(display(row.before))}</td><td>${esc(display(row.after))}</td><td>${row.overridden ? `${esc(display(row.exception))}<small>${row.incompatible ? "Incompatible: step removed" : "Keep exception"}</small>${row.incompatible ? `<label><input type="checkbox" data-clear-exception="${esc(row.key)}" /> Remove exception</label>` : ""}` : "Use new default"}</td></tr>`).join("");
    const hasChangedExceptions = changes.some(row => row.changed && row.overridden);
    showDialog(`Review revision v${next.version}`, `${info(scopeVersion ? `Updates the editable configuration of version ${scopeVersion}, not an existing deployment or saved preview.` : "Updates the application policy for future versions. Existing versions and previews keep their recorded revision.")}<div class="policy-table-scroll"><table class="policy-compare wui-data-table"><thead><tr><th scope="col">Setting</th><th scope="col">Current default</th><th scope="col">New default</th><th scope="col">Effective result</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No configuration differences.</td></tr>'}</tbody></table></div>${hasChangedExceptions ? '<label class="policy-ack"><input type="checkbox" id="policyRevisionAck" required /> I reviewed the changed defaults and the exceptions that will be kept.</label>' : ""}`, "Adopt revision", () => {
      const cleared = [...dialog.querySelectorAll("[data-clear-exception]:checked")].map(input => input.dataset.clearException);
      policy.adopt(id(), scopeVersion, next.version, Boolean(dialog.querySelector("#policyRevisionAck")?.checked), cleared);
      dialog.close(); refresh(); showToast("Revision adopted for the selected scope");
    }, { wide: true });
  }
  function render() {
    const app = policy.state().applications[id()];
    if (!app) return;
    const resolved = policy.effective(id(), scopeVersion);
    const workflow = policy.state().workflows[resolved.binding?.workflowId];
    const count = Object.values(resolved.values).filter(value => value.source !== "workflow").length;
    const heading = `<header class="policy-heading"><div><h2>Automation workflow</h2><p>${scopeVersion ? `Configuration for version ${esc(scopeVersion)}` : "Application policy for future versions"}</p></div><label class="policy-scope-select">Configuration scope<select id="policyViewScope"><option value="">Future versions</option>${Object.keys(app.versions).map(version => `<option value="${esc(version)}" ${scopeVersion === version ? "selected" : ""}>Version ${esc(version)}</option>`).join("")}</select></label></header>`;
    if (!workflow) {
      panel.innerHTML = `${heading}<section class="policy-surface policy-empty"><h3>No workflow ${scopeVersion ? "recorded for this version" : "assigned"}</h3><p>${scopeVersion ? "This version is locally configured. Assigning a workflow to the application affects future versions." : "Choose a published workflow to manage future versions."}</p>${!scopeVersion ? '<button type="button" class="primary-btn" id="policyAssign">Assign workflow</button>' : ""}</section>`;
    } else {
      const latest = policy.latest(workflow.id);
      const groups = new Map();
      for (const [key, field] of Object.entries(policy.schema())) if (key in resolved.values) {
        if (!groups.has(field.group)) groups.set(field.group, []);
        groups.get(field.group).push([key, field, resolved.values[key]]);
      }
      panel.innerHTML = `${heading}<section class="policy-surface"><div class="policy-heading"><span><strong>${esc(workflow.name)}</strong><small>Pinned v${esc(resolved.binding.revision)} · ${count} exception${count === 1 ? "" : "s"}</small></span><div class="policy-actions"><button type="button" id="policyManage">${icon("workflow")} Open workflow</button>${!scopeVersion ? '<button type="button" id="policyDetach">Remove workflow</button>' : '<button type="button" id="policyPreview">View resolved configuration</button>'}</div></div>${latest.version !== resolved.binding.revision ? `<div class="policy-update"><span>Revision v${esc(latest.version)} is available. Your configuration has not changed.</span><button type="button" id="policyReview">Review update</button></div>` : ""}</section>${info(scopeVersion ? "Version exceptions stay on this version. Application exceptions are the ones recorded when this version was prepared." : "Application exceptions carry forward to new versions. Existing versions retain their recorded policy.")}<div class="policy-groups">${[...groups].map(([name, fields], index) => `<details class="policy-surface policy-group" ${index === 0 || fields.some(([, , value]) => value.source !== "workflow") ? "open" : ""}><summary><strong>${esc(name)}</strong><span class="policy-meta">${fields.length} settings</span>${icon("chevron-down")}</summary><div>${fields.map(([key, field, value]) => `<div class="policy-row"><span><strong>${esc(field.label)}</strong><small>${esc(display(value.value))}</small>${value.reason ? `<small>${esc(value.reason)} · ${esc(value.author)} · ${esc(new Date(value.at).toLocaleDateString())}</small>` : ""}</span><span class="policy-source ${value.source}">${icon(value.source === "workflow" ? "lock" : "edit")} ${esc(sourceNames[value.source])}</span><div class="policy-actions"><button type="button" data-policy-edit="${esc(key)}" aria-label="Edit ${esc(field.label)}">${icon("edit")} Edit</button>${value.source !== "workflow" ? `<button type="button" data-policy-restore="${esc(key)}" aria-label="Restore inheritance for ${esc(field.label)}">${icon("refresh")} Restore</button>` : ""}</div></div>`).join("")}</div></details>`).join("")}</div><section class="policy-input-summary"><h3>Application inputs and resolved values</h3><p>Application identity, group targets, scope tags and selected files remain application or version inputs. Installer identity and generated wrapper commands are resolved per version; they are not fixed workflow values.</p></section>`;
    }
    panel.querySelector("#policyViewScope").onchange = event => { scopeVersion = event.target.value || null; render(); };
    panel.querySelector("#policyAssign")?.addEventListener("click", () => assignWorkflow());
    if (!workflow && scopeVersion && app.binding) {
      const button = document.createElement("button"); button.type = "button"; button.textContent = "Apply application workflow to this version";
      panel.querySelector(".policy-empty").append(button);
      button.onclick = () => showDialog("Apply managed rules to this version?", `<p>Version ${esc(scopeVersion)} will inherit the application's pinned workflow revision and exceptions. Version inputs are retained.</p>`, "Apply workflow", () => { policy.attachVersion(id(), scopeVersion); dialog.close(); refresh(); });
    }
    panel.querySelector("#policyManage")?.addEventListener("click", () => manageWorkflow(scopeVersion));
    panel.querySelector("#policyDetach")?.addEventListener("click", () => confirmDetach([id()]));
    panel.querySelector("#policyReview")?.addEventListener("click", reviewRevision);
    panel.querySelector("#policyPreview")?.addEventListener("click", () => {
      if (versionConfigurationDirty) { showToast("Save or cancel changes before viewing the resolved configuration"); return; }
      const resolved = policy.effective(id(), scopeVersion);
      showSnapshot({ application: id(), version: scopeVersion, binding: resolved.binding, values: resolved.values, inputs: policy.ensureVersion(id(), scopeVersion).inputs });
    });
    panel.querySelectorAll("[data-policy-edit]").forEach(button => button.onclick = () => editSetting(button.dataset.policyEdit));
    panel.querySelectorAll("[data-policy-restore]").forEach(button => button.onclick = () => restoreSetting(button.dataset.policyRestore));
  }
  const controlMappings = [
    ["#packageVersionInput", ["versionValue.value", "information.version"]],
    ["#payloadInstallCommand", ["wrapPsadt.installCommand", "uploadIntune.installCommand", "program.installCommand"]],
    ["#payloadUninstallCommand", ["wrapPsadt.uninstallCommand", "uploadIntune.uninstallCommand", "program.uninstallCommand"]],
    ["#requirementsArchitecture", ["requirements.architecture"]],
    ["#requirementsMinimumOs", ["requirements.os"]],
    ["#detectionPanel .form-grid.single select", ["detection.method"]]
  ];
  function matchingControlKey(selector, candidateKeys, resolved) {
    let candidates = candidateKeys;
    if ((selector === "#payloadInstallCommand" || selector === "#payloadUninstallCommand") && resolved.values["wrapPsadt.templateFolder"]) {
      // The upload command enters the generated wrapper; it is not the payload action inside it.
      candidates = candidateKeys.filter(candidate => !candidate.startsWith("uploadIntune."));
    }
    return candidates.find(candidate => resolved.values[candidate]);
  }
  function applyControls() {
    const resolved = policy.effective(id(), selectedVersion);
    for (const [selector, candidateKeys] of controlMappings) {
      const control = document.querySelector(selector);
      if (!control) continue;
      const key = matchingControlKey(selector, candidateKeys, resolved);
      const field = key ? policy.schema()[key] : null;
      const value = key ? resolved.values[key] : null;
      control.parentElement.querySelector(".policy-field-source")?.remove();
      if (!field || !value) {
        control.disabled = false;
        delete control.dataset.policyKey;
        ensureFieldOwnership(control, field?.label || "Configuration")?.replaceChildren();
        continue;
      }
      const owner = ensureFieldOwnership(control, field.label);
      control.disabled = true;
      control.dataset.policyKey = key;
      if (control.tagName === "SELECT" && field.options) control.innerHTML = field.options.map(option => `<option${option === value.value ? " selected" : ""}>${esc(option)}</option>`).join("");
      else control.value = value.value;
      owner.innerHTML = ownershipMarkup(field.label, value, resolved);
      owner.querySelector("[data-policy-inline-edit]").onclick = event => { event.preventDefault(); editSetting(key, selectedVersion); };
    }
    const workflow = policy.state().workflows[resolved.binding?.workflowId];
    const managedAssignments = Object.entries(resolved.values).flatMap(([key, value]) => {
      const match = key.match(/^(assign[^.]+)\.intent$/);
      if (!match || !["available", "required", "uninstall"].includes(value.value)) return [];
      const groupKey = `${match[1]}.groupIds`;
      const groups = resolved.values[groupKey];
      if (!groups) return [];
      return [{
        intent: value.value,
        groups: groups.value,
        key: groupKey,
        tooltip: `${value.value[0].toUpperCase() + value.value.slice(1)} groups are managed by ${workflow?.name || "the assigned workflow"} v${resolved.binding?.revision || ""}. Edit creates an exception for this version.`
      }];
    });
    window.packitDeployment?.setManagedAssignments(managedAssignments);
    const method = resolved.values["detection.method"]?.value;
    detectionTarget.hidden = !["File version", "Registry value"].includes(method);
    detectionInput.disabled = detectionTarget.hidden;
    document.querySelector("#policyDetectionTargetLabel").textContent = method === "Registry value" ? "Registry key and value" : "Installed file path";
    detectionInput.value = policy.ensureVersion(id(), selectedVersion).inputs.detection?.[method] || "";
    document.querySelectorAll("#detectionPanel .detection-code, #detectionPanel .source-row, #detectionPanel .editor-tools, #detectionPanel .file-status").forEach(element => { element.hidden = Boolean(method && method !== "PowerShell script"); });
    syncLabels();
  }
  function syncLabels() {
    const resolved = policy.effective(id(), selectedVersion);
    const workflow = policy.state().workflows[resolved.binding?.workflowId];
    const count = Object.values(resolved.values).filter(value => value.source !== "workflow").length;
    appliedStrategyTemplateId = workflow?.id || "";
    appliedStrategyTemplateName = workflow?.name || "Not assigned";
    appliedStrategyTemplateVersion = resolved.binding?.revision || "";
    appliedStrategyTemplateApplications = Object.values(policy.state().applications).filter(app => app.binding?.workflowId === workflow?.id).length;
    document.querySelector("#informationTemplateName").textContent = appliedStrategyTemplateName;
    document.querySelector("#informationTemplateMeta").textContent = workflow ? `Pinned v${resolved.binding.revision} · Version ${selectedVersion}` : "Locally configured version";
    document.querySelector("#informationTemplateState").textContent = workflow ? `${count} exceptions · Other rules inherited` : "Version inputs";
    document.querySelector("#automationTemplateSummary").hidden = !workflow;
    const commandName = document.querySelector(".applied-template-command strong");
    if (commandName) commandName.textContent = workflow ? workflow.name : "Not assigned";
    document.querySelector("#changeAutomationTemplate").innerHTML = `${icon("settings")} Configuration sources`;
    document.querySelector("#manageAutomationTemplate").hidden = !workflow;
    const fields = ["transition.copyPolicy", "assignments.rings", "cleanup.action", "cleanup.failureGate"];
    document.querySelectorAll(".future-policy-grid dd").forEach((element, index) => { element.textContent = display(resolved.values[fields[index]]?.value); });
    document.querySelector(".workflow-policy-summary .version-record-heading strong").textContent = "Recorded policy for this version";
    const inheritedMessage = document.querySelector("#automationTemplateSummary .wui-info-bar-content");
    inheritedMessage.querySelector("strong").textContent = workflow ? "Explicit configuration ownership" : "No workflow recorded";
    inheritedMessage.querySelector("small").textContent = workflow ? "Managed rules are read-only. Edit a rule to create a scoped exception." : "Assign a workflow at application level to manage future versions.";
    const wrapperTemplate = resolved.values["wrapPsadt.templateFolder"];
    const wrapper = resolved.values["wrapper.wrapper"] || wrapperTemplate;
    const wrapperOwnership = document.querySelector("#policyWrapperOwnership");
    if (wrapperOwnership) wrapperOwnership.innerHTML = wrapper ? ownershipMarkup(wrapperTemplate ? "PSADT template" : "Installation method", wrapper, resolved, { editable: Boolean(wrapperTemplate), pending: Boolean(pendingWrapper?.changed) }) : "";
    wrapperOwnership?.querySelector("[data-policy-inline-edit]")?.addEventListener("click", event => {
      event.preventDefault();
      editSetting(wrapperTemplate ? "wrapPsadt.templateFolder" : "wrapper.wrapper", selectedVersion);
    });
    const workflowRequiresWrapper = Boolean(wrapperTemplate) || Boolean(wrapper && wrapper.value !== "Direct installer");
    createPsadtWrapper.disabled = workflowRequiresWrapper;
    unwrapPsadtWrapper.disabled = workflowRequiresWrapper;
    createPsadtWrapper.title = workflowRequiresWrapper ? "The assigned workflow manages the PSADT wrapper" : "";
    unwrapPsadtWrapper.title = workflowRequiresWrapper ? "The assigned workflow manages the PSADT wrapper" : "";
    if (wrapperTemplate && activePsadtTemplateName) activePsadtTemplateName.textContent = wrapperTemplate.value;
    document.querySelector("#provenanceTemplate").textContent = workflow ? `${workflow.name} v${resolved.binding.revision}` : "Local configuration";
    document.querySelector("#provenanceConfigurationState").textContent = count ? `${count} recorded exceptions` : workflow ? "Inherited rules" : "Version inputs";
    const wrapperMismatch = wrapper && workflowRequiresWrapper === wrapperConfiguredState.hidden;
    const readiness = document.querySelector(".review-readiness-heading p");
    readiness.textContent = wrapperMismatch ? "Installation method differs from the effective wrapper rule. Create or unwrap the package before validation." : !detectionTarget.hidden && !detectionInput.value.trim() ? "The selected detection method requires a version-specific target in Install." : "Review version inputs and recorded exceptions before publication. Validation has not been run.";
    const methodStatus = document.querySelector('[data-summary-target="install"] .status');
    methodStatus.className = `status ${wrapperMismatch ? "issue" : "neutral"}`;
    methodStatus.textContent = wrapperMismatch ? "Check method" : "Not validated";
  }
  function selectVersion() {
    if (syncing) return;
    syncing = true;
    pendingWrapper = null;
    pendingCodes = null;
    try {
      // Seed existing versions before a future-version policy is changed.
      document.querySelectorAll(".version[data-version]").forEach(button => policy.ensureVersion(id(), button.dataset.version));
      const version = policy.ensureVersion(id(), selectedVersion);
      restoreVersionConfiguration(version.inputs.configuration || prototypeVersionBaseline);
      if (!version.inputs.configuration) window.packitDeployment.select(id(), selectedVersion);
      const resolved = policy.effective(id(), selectedVersion);
      const workflow = policy.state().workflows[resolved.binding?.workflowId];
      if (workflow?.recipeId) {
        const wrapperTemplate = resolved.values["wrapPsadt.templateFolder"];
        wrapperConfiguredState.hidden = !wrapperTemplate;
        activePsadtTemplate = wrapperTemplate ? {
          id: `workflow-${workflow.id}`,
          name: wrapperTemplate.value,
          source: `${workflow.name} v${resolved.binding.revision}`
        } : null;
        syncInstallationMethod();
      }
      if (resolved.values["returnCodes.defaults"]?.value) {
        const deployment = window.packitDeployment.capture();
        deployment.codes = window.packitDeployment.standardCodes();
        window.packitDeployment.restore(deployment);
      }
      applyControls();
      refreshDeploymentLocks();
      lastSavedVersionConfiguration = captureVersionConfiguration();
    } finally { syncing = false; }
  }
  function refresh() { selectVersion(); render(); }
  function openConfiguration(version = null, navigate = true) {
    if (versionConfigurationDirty) { showToast("Save or cancel version changes before switching sections"); return; }
    if (navigate) setAppSection("applicationWorkflow");
    scopeVersion = version;
    render();
  }
  function manageWorkflow(version = scopeVersion) {
    const binding = policy.effective(id(), version).binding;
    if (!binding) return;
    showWorkspaceView("automation"); setAutomationTab("workflows");
    window.dispatchEvent(new CustomEvent("packit:workflow-selected", { detail: { workflowId: binding.workflowId } }));
  }
  function assignWorkflow(initial = false) {
    const workflows = Object.values(policy.state().workflows).filter(item => item.revisions.length);
    const canApplyToCurrent = !initial && !selectedApplication.empty && !policy.effective(id(), selectedVersion).binding;
    showDialog("Assign automation workflow", `<label class="policy-field">Published workflow<select id="policyWorkflowChoice">${workflows.map(item => `<option value="${esc(item.id)}">${esc(item.name)} · v${esc(item.revisions[0].version)}</option>`).join("")}</select></label>${info("The selected revision manages future versions. Existing version configurations are not replaced unless selected below.")}${canApplyToCurrent ? `<label class="policy-ack"><input type="checkbox" id="policyApplyCurrent" /> Also apply managed rules to local version ${esc(selectedVersion)}. Version inputs are retained.</label>` : ""}`, "Assign workflow", () => {
      policy.bind(id(), dialog.querySelector("#policyWorkflowChoice").value);
      if (dialog.querySelector("#policyApplyCurrent")?.checked) policy.attachVersion(id(), selectedVersion);
      dialog.close();
      if (initial) { initializeEmptyApplication("template"); selectVersion(); }
      else refresh();
      showToast("Workflow assigned for future versions");
    });
  }
  function changeWorkflow(version = selectedVersion) {
    if (versionConfigurationDirty) { showToast("Save or cancel version changes before changing the workflow"); return; }
    const current = policy.effective(id(), version).binding;
    const workflows = Object.values(policy.state().workflows)
      .filter(item => item.id !== "guided" && item.revisions.length)
      .sort((a, b) => a.name.localeCompare(b.name));
    const options = workflows.map(item => {
      const revision = item.revisions[0];
      return `<option value="${esc(item.id)}" ${item.id === current?.workflowId ? "selected" : ""}>${esc(item.name)} · v${esc(revision.version)}</option>`;
    }).join("");
    showDialog("Change automation workflow", `<label class="policy-field">Published workflow<select id="policyWorkflowChoice">${options}</select></label><label class="policy-ack"><input type="checkbox" id="policyReplaceCurrentVersion" checked /> Also replace the workflow recorded for version ${esc(version)}</label>${info("The application will use the selected workflow for future versions. Replacing this version clears its workflow exceptions but keeps its package inputs.")}`, "Apply workflow", () => {
      const workflowId = dialog.querySelector("#policyWorkflowChoice").value;
      const includeVersion = dialog.querySelector("#policyReplaceCurrentVersion").checked;
      policy.replaceBinding(id(), workflowId, version, includeVersion);
      dialog.close();
      refresh();
      showToast(includeVersion ? "Workflow applied to the application and current version" : "Workflow assigned for future versions");
    });
    dialog.querySelector("#policyWorkflowChoice").focus();
  }
  function confirmDetach(ids) {
    showDialog("Remove workflow from applications?", `<p>${ids.map(esc).join(", ")}</p>${info("Future versions will no longer inherit this workflow. Application exceptions are removed. Existing versions, their inputs, exceptions and previews are retained. No installed application is uninstalled.")}`, "Remove workflow", () => { ids.forEach(appId => policy.detach(appId)); dialog.close(); refresh(); showToast("Workflow removed for future versions"); });
  }
  function showSnapshot(snapshot) {
    showDialog("Resolved configuration", `${info("Read-only configuration view. No build, upload, deployment, or reconciliation is pending or executed.")}<p>${esc(snapshot.application)} · Version ${esc(snapshot.version)} · Revision v${esc(snapshot.binding?.revision || "local")}</p><div class="policy-table-scroll"><table class="policy-compare wui-data-table"><thead><tr><th scope="col">Setting</th><th scope="col">Effective value</th><th scope="col">Source</th></tr></thead><tbody>${Object.entries(snapshot.values).map(([key, value]) => `<tr><th scope="row">${esc(policy.schema()[key]?.label || key)}</th><td>${esc(display(value.value))}</td><td>${esc(sourceNames[value.source])}</td></tr>`).join("")}</tbody></table></div><details><summary>Recorded version inputs</summary><pre class="policy-snapshot-code">${esc(JSON.stringify(snapshot.inputs, null, 2))}</pre></details>`, "Close", () => dialog.close(), { wide: true });
  }
  function saveVersionInputs() {
    if (!window.packitDeployment.validate()) return;
    if (!validateVersionInputs({ allowPendingWrapper: true })) return;
    if (pendingWrapper?.changed) {
      const wrapperValue = wrapperConfiguredState.hidden ? "Direct installer" : /v3|3\.10/.test(activePsadtTemplate?.name || "") ? "PSAppDeployToolkit v3 compatibility" : "PSAppDeployToolkit v4";
      try { policy.setOverride(id(), selectedVersion, "wrapper.wrapper", wrapperValue, pendingWrapper.scope, pendingWrapper.reason); }
      catch (error) { showToast(error.message, "warning"); return; }
      pendingWrapper = null;
    }
    pendingWrapper = null;
    if (pendingCodes) {
      if (JSON.stringify(lastSavedVersionConfiguration.deployment.codes) !== JSON.stringify(window.packitDeployment.capture().codes)) {
        policy.setOverride(id(), selectedVersion, "returnCodes.defaults", false, "version", pendingCodes.reason);
      }
      pendingCodes = null;
    }
    window.packitDeployment.commit();
    lastSavedVersionConfiguration = captureVersionConfiguration();
    const detection = policy.ensureVersion(id(), selectedVersion).inputs.detection || {};
    const method = policy.effective(id(), selectedVersion).values["detection.method"]?.value;
    if (!detectionTarget.hidden) detection[method] = detectionInput.value.trim();
    policy.saveInputs(id(), selectedVersion, { configuration: lastSavedVersionConfiguration, detection });
    versionConfigurationDirty = false;
    window.dispatchEvent(new CustomEvent("packit:version-inputs-saved", { detail: { version: selectedVersion } }));
    modifiedVersionRecords.add(selectedVersion);
    syncAppliedTemplateUI();
    refreshDeploymentLocks();
    showToast("Version inputs saved. Workflow rules are unchanged.");
  }
  function validateVersionInputs({ allowPendingWrapper = false } = {}) {
    if (!detectionTarget.hidden && !detectionInput.value.trim()) {
      setTab("install");
      const section = detectionTarget.closest(".expander");
      if (section?.classList.contains("collapsed")) section.querySelector("header button[aria-expanded]")?.click();
      detectionInput.focus(); detectionInput.reportValidity();
      showToast("Add the target required by this detection method", "warning");
      return false;
    }
    const resolved = policy.effective(id(), selectedVersion);
    const wrapperTemplate = resolved.values["wrapPsadt.templateFolder"];
    const wrapper = resolved.values["wrapper.wrapper"] || wrapperTemplate;
    const workflowRequiresWrapper = Boolean(wrapperTemplate) || Boolean(wrapper && wrapper.value !== "Direct installer");
    if (wrapper && workflowRequiresWrapper === wrapperConfiguredState.hidden && !(allowPendingWrapper && pendingWrapper?.changed)) {
      setTab("install");
      showToast("Create or unwrap the package to match its effective wrapper rule", "warning");
      return false;
    }
    return true;
  }
  window.packitPolicyUI = { selectVersion, syncLabels, openConfiguration, manageWorkflow, assignWorkflow, changeWorkflow, confirmDetach, showSnapshot, saveVersionInputs, validateVersionInputs,
    editManagedAssignment(key) { if (key) editSetting(key, selectedVersion); },
    cancelPending() { pendingWrapper = null; pendingCodes = null; requestAnimationFrame(refreshDeploymentLocks); },
    wrapperChanged() { if (pendingWrapper) pendingWrapper.changed = true; },
    refreshDeploymentLocks,
    authorizeWrapper(proceed) {
      const value = policy.effective(id(), selectedVersion).values["wrapper.wrapper"];
      if (!value) { proceed(); return; }
      showDialog("Change workflow-managed wrapper?", `<p>The wrapper rule is <strong>${esc(display(value.value))}</strong>. Changing the installation method creates an exception for this version when you save.</p><label class="policy-field">Reason<input id="policyWrapperReason" required maxlength="240" /></label>${info("The existing payload commands are retained. Other workflow rules remain inherited.")}`, "Continue", () => {
        pendingWrapper = { scope: "version", reason: dialog.querySelector("#policyWrapperReason").value };
        dialog.close(); proceed();
      });
    },
    openApplication(appId) { const app = apps.find(item => item.name === appId); if (app && !versionConfigurationDirty) { setPrimaryNavigation("applications"); openDetail("overview", app); if (app.empty) { appLevelNav.hidden = false; } openConfiguration(null); } }
  };
  function refreshDeploymentLocks() {
    const resolved = policy.effective(id(), selectedVersion);
    const rule = resolved.values["returnCodes.defaults"];
    const locked = Boolean(rule?.value && !pendingCodes);
    document.querySelectorAll("#deploymentCodeRows input, #deploymentCodeRows select, #deploymentCodeRows button, #deploymentAddCode").forEach(control => { control.disabled = locked; });
    let ownership = document.querySelector("#policyCodesOwnership");
    if (!ownership) {
      ownership = document.createElement("span"); ownership.id = "policyCodesOwnership"; ownership.className = "policy-inline-owner";
      document.querySelector("#deploymentReturnCodes .deploy-toolbar .label-with-help").append(ownership);
    }
    ownership.innerHTML = rule ? ownershipMarkup("Return codes", rule, resolved, { editable: locked, pending: Boolean(pendingCodes), editLabel: "Edit Return codes" }) : "";
    ownership.querySelector("[data-policy-inline-edit]")?.addEventListener("click", () => {
      showDialog("Edit return codes outside the workflow?", `<p>This version will use custom mappings instead of the workflow's standard return codes.</p><label class="policy-field">Reason<input id="policyCodesReason" required maxlength="240" /></label>${info("An exception is recorded only when changed mappings are saved. The workflow remains attached.")}`, "Continue", () => {
        pendingCodes = { reason: dialog.querySelector("#policyCodesReason").value };
        dialog.close(); refreshDeploymentLocks();
        document.querySelector("#deploymentCodeRows input")?.focus();
      });
    });
  }
  window.addEventListener("packit:policy-changed", event => {
    if (event.detail?.persisted === false) showToast("Saved for this session only. Browser storage is unavailable.");
    if (panel.classList.contains("active")) render();
  });
  for (const target of ["#installPanel", "#deploymentPanel"]) {
    const notice = document.createElement("div"); notice.className = "policy-context-strip";
    notice.innerHTML = `<span>${icon("workflow")} Configuration sources</span><button type="button">View rules and exceptions ${icon("arrow-right")}</button>`;
    notice.querySelector("button").onclick = () => openConfiguration(selectedVersion);
    document.querySelector(target).prepend(notice);
  }
  document.querySelectorAll(".payload-actions-card label small").forEach(label => { label.textContent = "Version input. Resolved for this package, not copied into the workflow."; });
  document.querySelector("#deploymentAssignmentsTitle").insertAdjacentHTML("afterend", '<span class="policy-meta">Application-specific group targets</span>');
  selectVersion();
})();
