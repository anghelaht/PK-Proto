/* Version-scoped deployment drafts. Tenant data is a local prototype fixture. */
(() => {
  const panel = document.querySelector('#deploymentPanel');
  const groups = [
    { id: 'all-users', name: 'All users', type: 'Built-in target', details: 'Every licensed user' },
    { id: 'all-devices', name: 'All devices', type: 'Built-in target', details: 'Every enrolled device' },
    { id: 'bbn', name: 'BBN', type: 'Users', details: 'Microsoft 365 group' },
    { id: 'caphyon', name: 'CAPHYON SRL', type: 'Users', details: 'Security group' },
    { id: 'testers', name: 'Testers', type: 'Users', details: 'Security group' },
    { id: 'pilot', name: 'Pilot devices', type: 'Devices', details: 'Dynamic device group' },
    { id: 'it', name: 'IT administrators', type: 'Users', details: 'Security group' },
    { id: 'production', name: 'Production devices', type: 'Devices', details: 'Dynamic device group' },
    { id: 'retired', name: 'Retired devices', type: 'Devices', details: 'Assigned device group' },
    { id: 'exceptions', name: 'Deployment exceptions', type: 'Devices', details: 'Assigned device group' }
  ];
  const tags = ['Default', 'Packaging', 'Endpoint Engineering', 'Finance', 'Test'];
  const intents = {
    available: { name: 'Available', help: 'Offer this app in Company Portal for enrolled devices. Excluded groups are omitted from this assignment intent.' },
    required: { name: 'Required', help: 'Install automatically for included groups. Removing an assignment does not uninstall the app. Use an Uninstall assignment to request removal.' },
    uninstall: { name: 'Uninstall', help: 'Request app removal for included groups. Remove conflicting install assignments first. Exclusions apply only to this intent.' }
  };
  const codeTypes = ['Success', 'Failed', 'Soft reboot', 'Hard reboot', 'Retry'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const icon = name => `<span class="fluent icon-${name}" aria-hidden="true"></span>`;
  const help = (label, message) => `<button class="wui-help-tip" type="button" aria-label="About ${label}" aria-description="${escape(message)}" data-tooltip="${escape(message)}">${icon('help')}</button>`;
  const removeButton = (label, attr) => `<button class="deploy-icon-button" type="button" ${attr} aria-label="${escape(label)}" title="${escape(label)}">${icon('dismiss')}</button>`;
  const defaults = (sample = false) => ({
    assignments: { available: sample ? ['bbn', 'caphyon', 'testers'].map(id => ({id, target:'include'})) : [], required: sample ? ['bbn', 'testers'].map(id => ({id, target:'include'})) : [], uninstall: [] },
    tags: sample ? ['Default', 'Packaging'] : ['Default'],
    codes: [{code:'0',type:'Success'}, {code:'1707',type:'Success'}, {code:'3010',type:'Soft reboot'}, {code:'1641',type:'Hard reboot'}, {code:'1618',type:'Retry'}]
  });
  let state = defaults(true);
  let scope = '';
  const saved = new Map();
  const storageKey = 'packit-deployment-v1';
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (const [key, value] of Object.entries(stored)) {
      if (value && Object.keys(intents).every(intent => Array.isArray(value.assignments?.[intent]) && value.assignments[intent].every(row => groups.some(group => group.id === row.id) && ['include', 'exclude'].includes(row.target))) && Array.isArray(value.tags) && value.tags.every(tag => tags.includes(tag)) && Array.isArray(value.codes) && value.codes.every(row => typeof row.code === 'string' && codeTypes.includes(row.type))) saved.set(key, value);
    }
  } catch { /* Storage may be unavailable in private browsing. */ }

  function announce(message) { document.querySelector('#deploymentAnnouncement').textContent = message; }
  function changed(message) {
    markVersionConfigurationDirty();
    syncSummary();
    if (message) announce(message);
  }
  function syncSummary() {
    const button = document.querySelector('[data-summary-target="deployment"]');
    const count = Object.values(state.assignments).reduce((total, rows) => total + rows.length, 0);
    if (button) {
      button.querySelector('strong').textContent = `${count} group assignment${count === 1 ? '' : 's'}`;
      button.querySelector('em').textContent = `${state.tags.length} scope tag${state.tags.length === 1 ? '' : 's'}`;
      button.querySelector('.status').textContent = codesValid() ? (count ? 'Configured' : 'No assignments') : 'Check return codes';
      button.querySelector('.status').className = `status ${codesValid() ? 'success' : 'issue'}`;
    }
  }
  function renderAssignments() {
    document.querySelector('#deploymentAssignments').innerHTML = Object.entries(intents).map(([intent, info]) => `
      <section class="deploy-intent" aria-labelledby="deploy-${intent}-title">
        <header class="deploy-toolbar"><div class="label-with-help"><h3 id="deploy-${intent}-title">${info.name}</h3>${help(info.name, info.help)}<span class="deploy-meta">${state.assignments[intent].length}</span></div><button type="button" data-add-groups="${intent}">${icon(state.assignments[intent].length ? 'people' : 'add')} ${state.assignments[intent].length ? 'Edit groups' : 'Add groups'}</button></header>
        ${state.assignments[intent].length ? `<table class="deploy-table"><caption class="visually-hidden">${info.name} group assignments</caption><thead><tr><th scope="col">Group</th><th scope="col">Targeting</th><th scope="col"><span class="visually-hidden">Remove</span></th></tr></thead><tbody>${state.assignments[intent].map(row => {
          const group = groups.find(group => group.id === row.id);
          return `<tr><td><span class="deploy-group-name">${icon('people')}<span>${group.name}<small>${group.type}</small></span></span></td><td>${row.target === 'include' ? 'Included' : 'Excluded'}</td><td>${removeButton(`Remove ${group.name} from ${info.name}`, `data-remove-group="${row.id}" data-intent="${intent}"`)}</td></tr>`;
        }).join('')}</tbody></table>` : `<p class="deploy-empty">No groups assigned.</p>`}
      </section>`).join('');
  }
  function renderTags() {
    document.querySelector('#deploymentScopeCount').textContent = `${state.tags.length} selected`;
    document.querySelector('#deploymentTagList').innerHTML = state.tags.length ? state.tags.map(tag => `<li><span>${escape(tag)}</span>${removeButton(`Remove scope tag ${tag}`, `data-remove-tag="${escape(tag)}"`)}</li>`).join('') : '<li class="deploy-empty">No scope tags selected. Intune applies the Default scope tag when none are specified.</li>';
  }
  function codeError(row, index) {
    const raw = row.code.trim();
    if (!/^-?\d+$/.test(raw) || Number(raw) < -2147483648 || Number(raw) > 2147483647) return 'Enter a whole number from -2147483648 to 2147483647.';
    if (state.codes.some((other, i) => i !== index && other.code.trim() !== '' && Number(other.code) === Number(raw))) return 'Each return code must be unique.';
    return '';
  }
  function codesValid() { return state.codes.length > 0 && state.codes.every((row, i) => !codeError(row, i)); }
  function validateCodes() {
    const message = document.querySelector('#deploymentCodeError');
    let error = state.codes.length ? '' : 'Add at least one return code before saving.';
    state.codes.forEach((row, i) => {
      const input = panel.querySelector(`[data-code-index="${i}"]`);
      const issue = codeError(row, i);
      input?.setAttribute('aria-invalid', String(Boolean(issue)));
      input?.setCustomValidity(issue);
      if (issue) error = issue;
    });
    message.hidden = !error;
    message.textContent = error;
    document.querySelector('#deploymentCodeCount').textContent = `${state.codes.length} mappings`;
    return !error;
  }
  function renderCodes() {
    document.querySelector('#deploymentCodeRows').innerHTML = state.codes.map((row, i) => `<tr><td><input type="text" inputmode="numeric" data-code-index="${i}" aria-label="Return code ${i + 1}" aria-describedby="deploymentCodeError" value="${escape(row.code)}" /></td><td><select data-type-index="${i}" aria-label="Code type ${i + 1}">${codeTypes.map(type => `<option${type === row.type ? ' selected' : ''}>${type}</option>`).join('')}</select></td><td>${removeButton(`Remove return code ${row.code || i + 1}`, `data-remove-code="${i}"`)}</td></tr>`).join('');
    validateCodes();
    window.packitPolicyUI?.refreshDeploymentLocks();
  }
  function render() { renderAssignments(); renderTags(); renderCodes(); syncSummary(); }

  const dialog = document.createElement('dialog');
  dialog.className = 'content-dialog deploy-picker';
  dialog.id = 'deploymentPicker';
  dialog.setAttribute('aria-labelledby', 'deploymentPickerTitle');
  dialog.innerHTML = `<form method="dialog"><header><div><h2 id="deploymentPickerTitle"></h2><p>Choose whether each group is included in or excluded from this assignment.</p></div><button class="dialog-close" type="button" data-picker-cancel aria-label="Close">${icon('dismiss')}</button></header><div class="deploy-picker-body"><label>Search groups<input type="search" id="deploymentPickerSearch" autocomplete="off" /></label><div class="deploy-picker-actions"><span class="deploy-meta">Prototype directory</span></div><div id="deploymentPickerOptions" aria-label="Directory items"></div><p class="deploy-meta" id="deploymentPickerStatus" role="status"></p></div><footer><button type="button" data-picker-cancel>Cancel</button><button class="primary-btn" type="submit" id="deploymentPickerApply">Done</button></footer></form>`;
  document.body.append(dialog);
  const refreshDirectory = document.createElement('button');
  refreshDirectory.type = 'button';
  refreshDirectory.className = 'deploy-refresh-directory';
  refreshDirectory.innerHTML = `${icon('refresh')} Refresh directory`;
  dialog.querySelector('.deploy-picker-actions').append(refreshDirectory);
  refreshDirectory.addEventListener('click', () => {
    renderPicker();
    updatePickerStatus('Sample directory refreshed. ');
  });
  let pickerIntent = null;
  let picked = new Map();
  let opener;
  function conflict(id, target) {
    if (target === 'exclude') return '';
    const opposite = pickerIntent === 'uninstall' ? ['available', 'required'] : ['uninstall'];
    return opposite.some(intent => state.assignments[intent].some(row => row.id === id && row.target === 'include')) ? 'Conflicting assignment: remove the existing install or uninstall assignment first.' : '';
  }
  function updatePickerStatus(prefix = '') {
    if (!pickerIntent) {
      dialog.querySelector('#deploymentPickerStatus').textContent = `${prefix}${picked.size} selected`;
      return;
    }
    const selected = [...picked.values()];
    const included = selected.filter(target => target === 'include').length;
    const excluded = selected.filter(target => target === 'exclude').length;
    dialog.querySelector('#deploymentPickerStatus').textContent = `${prefix}${included} included · ${excluded} excluded`;
  }
  function renderPicker() {
    const query = dialog.querySelector('#deploymentPickerSearch').value.trim().toLowerCase();
    if (!pickerIntent) {
      const filteredTags = tags.filter(tag => tag.toLowerCase().includes(query));
      dialog.querySelector('#deploymentPickerOptions').innerHTML = `<fieldset class="deploy-picker-tag-options"><legend class="visually-hidden">Scope tags</legend>${filteredTags.map(tag => `<label class="deploy-picker-option"><input type="checkbox" value="${escape(tag)}"${picked.has(tag) ? ' checked' : ''} /><span><strong>${escape(tag)}</strong><small>Scope tag</small></span></label>`).join('') || '<p class="deploy-empty">No matching results.</p>'}</fieldset>`;
      updatePickerStatus();
      return;
    }

    const filtered = groups.filter(group => `${group.name} ${group.type} ${group.details}`.toLowerCase().includes(query));
    dialog.querySelector('#deploymentPickerOptions').innerHTML = filtered.length ? `<table class="deploy-picker-table"><caption class="visually-hidden">Include or exclude groups</caption><thead><tr><th scope="col">Include</th><th scope="col">Exclude</th><th scope="col">Group</th><th scope="col">Details</th></tr></thead><tbody>${filtered.map(group => {
      const selected = picked.get(group.id);
      const includeConflict = conflict(group.id, 'include');
      return `<tr${selected ? ` class="is-selected ${selected}"` : ''}>
        <td><input type="checkbox" data-picker-group="${escape(group.id)}" data-target="include" aria-label="Include ${escape(group.name)}"${selected === 'include' ? ' checked' : ''}${includeConflict && selected !== 'include' ? ' disabled' : ''} /></td>
        <td><input type="checkbox" data-picker-group="${escape(group.id)}" data-target="exclude" aria-label="Exclude ${escape(group.name)}"${selected === 'exclude' ? ' checked' : ''} /></td>
        <td><span class="deploy-picker-group"><strong>${escape(group.name)}</strong><small>${escape(group.type)}</small></span></td>
        <td><span>${escape(includeConflict && selected !== 'include' ? includeConflict : group.details)}</span></td>
      </tr>`;
    }).join('')}</tbody></table>` : '<p class="deploy-empty">No matching results.</p>';
    updatePickerStatus();
  }
  function openPicker(intent, button) {
    pickerIntent = intent;
    opener = button;
    picked = new Map(intent ? state.assignments[intent].map(row => [row.id, row.target]) : state.tags.map(tag => [tag, true]));
    dialog.querySelector('#deploymentPickerTitle').textContent = intent ? `Edit ${intents[intent].name.toLowerCase()} groups` : 'Select scope tags';
    dialog.querySelector('#deploymentPickerApply').textContent = intent ? 'Done' : 'Apply';
    dialog.querySelector('#deploymentPickerSearch').value = '';
    renderPicker();
    dialog.showModal();
    dialog.querySelector('#deploymentPickerSearch').focus();
  }
  dialog.querySelectorAll('[data-picker-cancel]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
  dialog.querySelector('#deploymentPickerSearch').addEventListener('input', renderPicker);
  dialog.querySelector('#deploymentPickerOptions').addEventListener('change', event => {
    if (!pickerIntent) {
      if (event.target.checked) picked.set(event.target.value, true); else picked.delete(event.target.value);
      updatePickerStatus();
      return;
    }

    const id = event.target.dataset.pickerGroup;
    const target = event.target.dataset.target;
    if (!id || !target) return;
    if (event.target.checked) {
      picked.set(id, target);
      const opposite = target === 'include' ? 'exclude' : 'include';
      dialog.querySelector(`[data-picker-group="${CSS.escape(id)}"][data-target="${opposite}"]`).checked = false;
    } else if (picked.get(id) === target) picked.delete(id);
    const selected = picked.get(id);
    event.target.closest('tr').className = selected ? `is-selected ${selected}` : '';
    updatePickerStatus();
  });
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    if (pickerIntent) {
      const before = JSON.stringify(state.assignments[pickerIntent]);
      state.assignments[pickerIntent] = [...picked].map(([id, target]) => ({id, target}));
      if (JSON.stringify(state.assignments[pickerIntent]) !== before) changed('Group assignments updated.');
    } else {
      const before = JSON.stringify(state.tags);
      state.tags = [...picked.keys()];
      if (JSON.stringify(state.tags) !== before) changed('Scope tags updated.');
    }
    dialog.close();
    render();
    if (pickerIntent) panel.querySelector(`[data-add-groups="${pickerIntent}"]`).focus();
  });
  panel.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.addGroups) openPicker(button.dataset.addGroups, button);
    if (button.id === 'deploymentChooseTags') openPicker(null, button);
    if (button.dataset.removeGroup) {
      const intent = button.dataset.intent;
      state.assignments[intent] = state.assignments[intent].filter(row => row.id !== button.dataset.removeGroup);
      renderAssignments();
      changed('Group removed from this assignment. No uninstall was requested.');
      panel.querySelector(`[data-add-groups="${intent}"]`).focus();
    }
    if (button.dataset.removeTag) {
      state.tags = state.tags.filter(tag => tag !== button.dataset.removeTag);
      renderTags();
      changed('Scope tag removed.');
      document.querySelector('#deploymentChooseTags').focus();
    }
    if (button.id === 'deploymentAddCode') {
      state.codes.push({code:'',type:'Failed'});
      renderCodes();
      changed();
      panel.querySelector(`[data-code-index="${state.codes.length - 1}"]`).focus();
    }
    if (button.hasAttribute('data-remove-code')) {
      state.codes.splice(Number(button.dataset.removeCode), 1);
      renderCodes();
      changed('Return code removed.');
      document.querySelector('#deploymentAddCode').focus();
    }
  });
  panel.addEventListener('input', event => {
    if (!event.target.hasAttribute('data-code-index')) return;
    state.codes[Number(event.target.dataset.codeIndex)].code = event.target.value;
    validateCodes();
    changed();
  });
  panel.addEventListener('change', event => {
    if (!event.target.hasAttribute('data-type-index')) return;
    state.codes[Number(event.target.dataset.typeIndex)].type = event.target.value;
    changed();
  });
  window.packitDeployment = {
    capture: () => clone(state),
    standardCodes: () => clone(defaults().codes),
    restore(value) { state = clone(value || defaults()); render(); },
    select(app, version) {
      scope = JSON.stringify([app, version]);
      state = clone(saved.get(scope) || defaults(app === 'Contoso Finance Tools' && version === '12.3.123'));
      render();
    },
    commit() {
      saved.set(scope, clone(state));
      try { localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(saved))); }
      catch { announce('Saved for this session. Browser storage is unavailable.'); }
    },
    validate() {
      if (validateCodes()) return true;
      setTab('deployment');
      document.querySelector('#deploymentReturnCodes').open = true;
      (panel.querySelector('[aria-invalid="true"]') || document.querySelector('#deploymentAddCode')).focus();
      return false;
    }
  };
  document.querySelector('#openDeploymentReturnCodes').addEventListener('click', () => {
    setTab('deployment');
    document.querySelector('#deploymentReturnCodes').open = true;
    document.querySelector('#deploymentAddCode').focus();
  });
  render();
})();
