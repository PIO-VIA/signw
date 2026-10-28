/**
 * SIGNW — Constructeur de Formulaire Visuel (FormBuilder Admin)
 * Section 7.E.4
 */

window.SignwFormBuilder = {
  currentSectorId: 'sec_btp',
  schema: null,
  selectedSectionId: null,
  selectedFieldId: null,
  activeTab: 'edit', // 'edit', 'preview', 'json'

  ic(name, size = 16) {
    return window.SignwIcons ? window.SignwIcons.render(name, { size }) : '';
  },

  init(containerId, sectorId) {
    this.currentSectorId = sectorId || 'sec_btp';
    const existing = window.SignwStore.getFormSchemaBySector(this.currentSectorId);
    this.schema = JSON.parse(JSON.stringify(existing));

    if (this.schema.sections && this.schema.sections.length > 0) {
      this.selectedSectionId = this.schema.sections[0].id;
      if (this.schema.sections[0].champs && this.schema.sections[0].champs.length > 0) {
        this.selectedFieldId = this.schema.sections[0].champs[0].id;
      }
    }

    this.render();
  },

  render() {
    const container = document.getElementById('form-builder-app');
    if (!container) return;

    const sectors = window.SignwStore.getSectors();
    const ic = (n, s) => this.ic(n, s);

    container.innerHTML = `
      <div class="card" style="margin-bottom: 20px; padding: 16px 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; min-width: 0;">
            <div>
              <label class="form-label text-xs">Secteur d’activité :</label>
              <select class="form-control" style="width: 240px; max-width: 100%; font-weight: 700;" onchange="SignwFormBuilder.switchSector(this.value)">
                ${sectors.map(s => `<option value="${s.id}" ${s.id === this.currentSectorId ? 'selected' : ''}>${s.nom}</option>`).join('')}
              </select>
            </div>
            <div>
              <span class="badge badge-soumis" style="font-size: 0.8125rem;">Version ${this.schema.version}</span>
              <div class="text-xs text-muted" style="margin-top: 2px;">Dernière révision active</div>
            </div>
          </div>

          <div class="fb-mode-tabs" style="display: flex; gap: 4px; background: var(--ink-100); padding: 4px; border-radius: var(--radius-md); flex-wrap: wrap;">
            <button type="button" class="btn btn-sm btn-wrap ${this.activeTab === 'edit' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('edit')">
              ${ic('pencil', 14)} Édition
            </button>
            <button type="button" class="btn btn-sm btn-wrap ${this.activeTab === 'preview' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('preview')">
              ${ic('eye', 14)} Aperçu agent
            </button>
            <button type="button" class="btn btn-sm btn-wrap ${this.activeTab === 'json' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('json')">
              ${ic('code', 14)} JSON
            </button>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm btn-wrap" onclick="SignwFormBuilder.resetToDefault()">
              ${ic('refresh', 14)} Modèle BTP
            </button>
            <button type="button" class="btn btn-gold btn-sm btn-wrap" onclick="SignwFormBuilder.publish()">
              ${ic('send', 14)} Publier v${this.schema.version + 1}
            </button>
          </div>
        </div>
      </div>

      <div id="fb-tab-content">
        ${this.renderTabContent()}
      </div>
    `;

    if (this.activeTab === 'preview') {
      window.SignwFormRender.init('fb-preview-mount', this.schema, { id: 'dos_preview', statut: 'brouillon', reponses: {} });
    }
  },

  renderTabContent() {
    const ic = (n, s) => this.ic(n, s);

    if (this.activeTab === 'json') {
      return `
        <div class="card" style="padding: 24px;">
          <h4 style="margin-bottom: 12px;">Schéma JSON brut</h4>
          <p class="text-sm text-muted">Ce schéma JSON définit dynamiquement le formulaire présenté à tous les agents du secteur.</p>
          <textarea id="fb-json-textarea" class="form-control" style="font-family: var(--font-mono); font-size: 0.8125rem; min-height: 500px; margin-bottom: 16px;">${JSON.stringify(this.schema, null, 2)}</textarea>
          <button type="button" class="btn btn-primary btn-sm btn-wrap" onclick="SignwFormBuilder.applyJson()">Appliquer le JSON</button>
        </div>
      `;
    }

    if (this.activeTab === 'preview') {
      return `
        <div class="card" style="padding: 20px; margin-bottom: 20px; background: var(--ink-50); border: 1px dashed var(--ink-300);">
          <strong>Mode aperçu :</strong>
          <span class="text-sm text-muted"> vous testez le formulaire tel que les candidats agents le rempliront.</span>
        </div>
        <div id="fb-preview-mount"></div>
      `;
    }

    const activeSection = (this.schema.sections || []).find(s => s.id === this.selectedSectionId) || this.schema.sections[0];
    const activeField = activeSection && activeSection.champs ? activeSection.champs.find(c => c.id === this.selectedFieldId) : null;

    const palette = [
      { type: 'texte', icon: 'type', label: 'Texte court' },
      { type: 'texte_long', icon: 'align-left', label: 'Texte long / Description' },
      { type: 'montant', icon: 'score', label: 'Montant en FCFA' },
      { type: 'nombre', icon: 'hash', label: 'Nombre / Années' },
      { type: 'date', icon: 'calendar', label: 'Date de validité' },
      { type: 'liste', icon: 'list', label: 'Liste déroulante' },
      { type: 'case_a_cocher', icon: 'check-square', label: 'Case à cocher' },
      { type: 'fichier', icon: 'upload', label: 'Dépôt de pièce (PDF)', highlight: true },
      { type: 'tableau_repetable', icon: 'table', label: 'Tableau répétable' }
    ];

    return `
      <div class="form-builder-layout">

        <div class="fb-palette">
          <h5 style="margin-bottom: 16px;">Palette de champs</h5>
          <p class="text-xs text-muted" style="margin-bottom: 16px;">Cliquez pour ajouter au formulaire :</p>

          ${palette.map(item => `
            <div class="fb-palette-item${item.highlight ? ' fb-palette-item--accent' : ''}" onclick="SignwFormBuilder.addField('${item.type}')">
              <span class="fb-palette-icon">${ic(item.icon, 16)}</span>
              ${item.highlight ? `<strong>${item.label}</strong>` : item.label}
            </div>
          `).join('')}

          <div style="margin-top: 24px; padding-top: 16px;">
            <button type="button" class="btn btn-secondary btn-sm w-full btn-wrap" onclick="SignwFormBuilder.addSection()">
              ${ic('plus', 14)} Nouvelle section
            </button>
          </div>
        </div>

        <div class="fb-canvas">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 8px;">
            <h4 style="margin: 0;">Sections du formulaire</h4>
            <span class="text-sm text-muted">${(this.schema.sections || []).length} section(s)</span>
          </div>

          ${(this.schema.sections || []).map(sec => {
            const isSecSelected = sec.id === this.selectedSectionId;
            return `
              <div class="fb-section-card" style="${isSecSelected ? 'border: 2px solid var(--brand-700);' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
                    <strong style="color: var(--brand-900); font-size: 1rem; word-break: break-word;">${window.SignwUtils.escapeHTML(sec.titre)}</strong>
                    <span class="badge" style="background: var(--ink-200); font-size: 0.7rem; flex-shrink: 0;">Pilier : ${sec.pilier || 'admin'}</span>
                  </div>
                  <div style="display: flex; gap: 2px; flex-shrink: 0;">
                    <button type="button" class="icon-btn" onclick="SignwFormBuilder.selectSection('${sec.id}')" title="Éditer cette section">${ic('pencil', 16)}</button>
                    <button type="button" class="icon-btn" onclick="SignwFormBuilder.deleteSection('${sec.id}')" title="Supprimer la section">${ic('trash', 16)}</button>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(sec.champs || []).map((ch, cIdx) => {
                    const isFieldSelected = ch.id === this.selectedFieldId;
                    return `
                      <div class="fb-field-card ${isFieldSelected ? 'selected' : ''}" onclick="SignwFormBuilder.selectField('${sec.id}', '${ch.id}')">
                        <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
                          <span class="fb-field-grip" aria-hidden="true">${ic('grip', 14)}</span>
                          <div style="min-width: 0;">
                            <span class="font-bold text-sm" style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${window.SignwUtils.escapeHTML(ch.label || 'Champ sans titre')}</span>
                            <div class="text-xs text-muted">Type : ${ch.type} · ${ch.poids || 1} pts ${ch.obligatoire ? '· <span style="color: var(--danger)">Obligatoire</span>' : ''}</div>
                          </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 2px; flex-shrink: 0;">
                          <button type="button" class="icon-btn" title="Monter" onclick="event.stopPropagation(); SignwFormBuilder.moveField('${sec.id}', ${cIdx}, -1)">${ic('chevron-up', 14)}</button>
                          <button type="button" class="icon-btn" title="Descendre" onclick="event.stopPropagation(); SignwFormBuilder.moveField('${sec.id}', ${cIdx}, 1)">${ic('chevron-down', 14)}</button>
                          <button type="button" class="icon-btn" title="Supprimer" onclick="event.stopPropagation(); SignwFormBuilder.deleteField('${sec.id}', '${ch.id}')">${ic('x', 14)}</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="fb-inspector">
          <h5 style="margin-bottom: 16px;">Propriétés du champ</h5>

          ${activeField ? `
            <div class="form-group">
              <label class="form-label text-xs">Libellé du champ :</label>
              <input type="text" class="form-control" value="${window.SignwUtils.escapeHTML(activeField.label || '')}" onchange="SignwFormBuilder.updateFieldProp('label', this.value)">
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Texte d’aide / Instruction :</label>
              <input type="text" class="form-control" value="${window.SignwUtils.escapeHTML(activeField.aide || '')}" onchange="SignwFormBuilder.updateFieldProp('aide', this.value)">
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Pilier de notation rattaché :</label>
              <select class="form-control" onchange="SignwFormBuilder.updateFieldProp('pilier', this.value)">
                <option value="admin" ${activeField.pilier === 'admin' ? 'selected' : ''}>1. Conformité administrative (20%)</option>
                <option value="fin" ${activeField.pilier === 'fin' ? 'selected' : ''}>2. Capacité financière (25%)</option>
                <option value="tech" ${activeField.pilier === 'tech' ? 'selected' : ''}>3. Capacité technique & matériel (25%)</option>
                <option value="ref" ${activeField.pilier === 'ref' ? 'selected' : ''}>4. Références chantiers (20%)</option>
                <option value="rh" ${activeField.pilier === 'rh' ? 'selected' : ''}>5. Ressources humaines (10%)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label text-xs">Poids dans le calcul (0 à 15 pts) :</label>
              <input type="number" class="form-control" min="0" max="15" value="${activeField.poids || 1}" onchange="SignwFormBuilder.updateFieldProp('poids', parseInt(this.value, 10))">
            </div>

            <div class="form-group">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; cursor: pointer;">
                <input type="checkbox" ${activeField.obligatoire ? 'checked' : ''} onchange="SignwFormBuilder.updateFieldProp('obligatoire', this.checked)">
                <strong>Pièce / Champ obligatoire</strong>
              </label>
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label text-xs">Règle de vérification pour l’auditeur :</label>
              <textarea class="form-control" style="font-size: 0.8125rem;" placeholder="Ex: Vérifier que la date de validité est postérieure..." onchange="SignwFormBuilder.updateFieldProp('regleDeVerification', this.value)">${window.SignwUtils.escapeHTML(activeField.regleDeVerification || '')}</textarea>
            </div>
          ` : `
            <p class="text-sm text-muted">Sélectionnez un champ dans le canevas central pour éditer ses propriétés.</p>
          `}
        </div>

      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  switchSector(sectorId) {
    this.currentSectorId = sectorId;
    const existing = window.SignwStore.getFormSchemaBySector(sectorId);
    this.schema = JSON.parse(JSON.stringify(existing));
    if (this.schema.sections && this.schema.sections.length > 0) {
      this.selectedSectionId = this.schema.sections[0].id;
      if (this.schema.sections[0].champs && this.schema.sections[0].champs.length > 0) {
        this.selectedFieldId = this.schema.sections[0].champs[0].id;
      }
    }
    this.render();
  },

  selectSection(secId) {
    this.selectedSectionId = secId;
    const sec = this.schema.sections.find(s => s.id === secId);
    if (sec && sec.champs && sec.champs.length > 0) {
      this.selectedFieldId = sec.champs[0].id;
    }
    this.render();
  },

  selectField(secId, fieldId) {
    this.selectedSectionId = secId;
    this.selectedFieldId = fieldId;
    this.render();
  },

  addField(type) {
    const sec = this.schema.sections.find(s => s.id === this.selectedSectionId) || this.schema.sections[0];
    if (!sec) return;
    const id = `f_${type}_${Date.now().toString().slice(-4)}`;
    const newField = {
      id,
      type,
      label: `Nouveau champ ${type}`,
      aide: 'Consigne ou description pour l’agent',
      obligatoire: true,
      poids: 3,
      pilier: sec.pilier || 'admin'
    };
    if (type === 'fichier') {
      newField.piecesAcceptees = ['pdf'];
      newField.tailleMaxMo = 10;
      newField.label = 'Pièce justificative requise';
      newField.regleDeVerification = 'Vérifier la validité et la conformité du document.';
    }
    sec.champs.push(newField);
    this.selectedFieldId = id;
    this.render();
    window.SignwUI.showToast(`Champ « ${newField.label} » ajouté à la section.`, 'info');
  },

  updateFieldProp(prop, val) {
    const sec = this.schema.sections.find(s => s.id === this.selectedSectionId);
    if (!sec) return;
    const ch = sec.champs.find(c => c.id === this.selectedFieldId);
    if (!ch) return;
    ch[prop] = val;
    this.render();
  },

  moveField(secId, idx, delta) {
    const sec = this.schema.sections.find(s => s.id === secId);
    if (!sec) return;
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= sec.champs.length) return;
    const item = sec.champs.splice(idx, 1)[0];
    sec.champs.splice(newIdx, 0, item);
    this.render();
  },

  deleteField(secId, fieldId) {
    const sec = this.schema.sections.find(s => s.id === secId);
    if (!sec) return;
    sec.champs = sec.champs.filter(c => c.id !== fieldId);
    if (this.selectedFieldId === fieldId) {
      this.selectedFieldId = sec.champs[0] ? sec.champs[0].id : null;
    }
    this.render();
  },

  addSection() {
    const title = prompt('Titre de la nouvelle section :', 'Nouvelle section de pièces');
    if (!title) return;
    const id = `sec_${Date.now().toString().slice(-4)}`;
    this.schema.sections.push({
      id,
      titre: title,
      description: 'Description des exigences de cette section',
      pilier: 'admin',
      champs: []
    });
    this.selectedSectionId = id;
    this.render();
  },

  deleteSection(secId) {
    if (this.schema.sections.length <= 1) {
      alert('Un formulaire doit comporter au moins une section.');
      return;
    }
    if (confirm('Voulez-vous vraiment supprimer cette section et tous ses champs ?')) {
      this.schema.sections = this.schema.sections.filter(s => s.id !== secId);
      this.selectedSectionId = this.schema.sections[0].id;
      this.render();
    }
  },

  publish() {
    this.schema.version += 1;
    window.SignwStore.saveFormSchema(this.schema);
    window.SignwStore.addJournalEntry(
      'Admin signw',
      'Publication formulaire',
      `Secteur ${this.currentSectorId}`,
      `Nouvelle version ${this.schema.version} du formulaire publiée avec succès.`
    );
    window.SignwUI.showToast(`Version ${this.schema.version} publiée avec succès ! Tous les nouveaux dossiers utiliseront ce schéma.`, 'success');
    this.render();
  },

  resetToDefault() {
    if (confirm('Réinitialiser aux sections standard ?')) {
      this.init('form-builder-app', this.currentSectorId);
      window.SignwUI.showToast('Modèle standard rechargé.', 'info');
    }
  },

  applyJson() {
    try {
      const textarea = document.getElementById('fb-json-textarea');
      const parsed = JSON.parse(textarea.value);
      this.schema = parsed;
      this.setTab('edit');
      window.SignwUI.showToast('Schéma JSON appliqué !', 'success');
    } catch (e) {
      alert('Erreur dans le format JSON : ' + e.message);
    }
  }
};
