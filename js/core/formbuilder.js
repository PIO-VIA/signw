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

  init(containerId, sectorId) {
    this.currentSectorId = sectorId || 'sec_btp';
    const existing = window.SignwStore.getFormSchemaBySector(this.currentSectorId);
    // Cloner profondément pour éditer sans altérer avant publication
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

    container.innerHTML = `
      <!-- En-tête du constructeur -->
      <div class="card" style="margin-bottom: 20px; padding: 16px 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div>
              <label class="form-label text-xs">Secteur d’activité :</label>
              <select class="form-control" style="width: 240px; font-weight: 700;" onchange="SignwFormBuilder.switchSector(this.value)">
                ${sectors.map(s => `<option value="${s.id}" ${s.id === this.currentSectorId ? 'selected' : ''}>${s.nom}</option>`).join('')}
              </select>
            </div>
            <div>
              <span class="badge badge-soumis" style="font-size: 0.8125rem;">Version ${this.schema.version}</span>
              <div class="text-xs text-muted" style="margin-top: 2px;">Dernière révision active</div>
            </div>
          </div>

          <!-- Onglets Mode de travail -->
          <div style="display: flex; gap: 8px; background: var(--ink-100); padding: 4px; border-radius: var(--radius-md);">
            <button class="btn btn-sm ${this.activeTab === 'edit' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('edit')">
              ✏️ Édition visuelle
            </button>
            <button class="btn btn-sm ${this.activeTab === 'preview' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('preview')">
              👁️ Aperçu (Comme l’agent)
            </button>
            <button class="btn btn-sm ${this.activeTab === 'json' ? 'btn-primary' : 'btn-ghost'}" onclick="SignwFormBuilder.setTab('json')">
              📋 Schéma JSON
            </button>
          </div>

          <!-- Actions de publication -->
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="SignwFormBuilder.resetToDefault()">
              ↺ Modèle BTP standard
            </button>
            <button class="btn btn-gold btn-sm" onclick="SignwFormBuilder.publish()">
              🚀 Publier la version ${this.schema.version + 1}
            </button>
          </div>
        </div>
      </div>

      <!-- Contenu selon l'onglet actif -->
      <div id="fb-tab-content">
        ${this.renderTabContent()}
      </div>
    `;

    if (this.activeTab === 'preview') {
      window.SignwFormRender.init('fb-preview-mount', this.schema, { id: 'dos_preview', statut: 'brouillon', reponses: {} });
    }
  },

  renderTabContent() {
    if (this.activeTab === 'json') {
      return `
        <div class="card" style="padding: 24px;">
          <h4 style="margin-bottom: 12px;">Schéma JSON brut</h4>
          <p class="text-sm text-muted">Ce schéma JSON définit dynamiquement le formulaire présenté à tous les agents du secteur.</p>
          <textarea id="fb-json-textarea" class="form-control" style="font-family: var(--font-mono); font-size: 0.8125rem; min-height: 500px; margin-bottom: 16px;">${JSON.stringify(this.schema, null, 2)}</textarea>
          <button class="btn btn-primary btn-sm" onclick="SignwFormBuilder.applyJson()">Appliquer les modifications JSON</button>
        </div>
      `;
    }

    if (this.activeTab === 'preview') {
      return `
        <div class="card" style="padding: 24px; margin-bottom: 20px; background: #FFF9E6; border: 1px dashed var(--gold-500);">
          <strong>Mode Aperçu interactif :</strong> Vous testez le formulaire tel que les candidats agents le rempliront.
        </div>
        <div id="fb-preview-mount"></div>
      `;
    }

    // Onglet 'edit' (Layout 3 colonnes)
    const activeSection = (this.schema.sections || []).find(s => s.id === this.selectedSectionId) || this.schema.sections[0];
    const activeField = activeSection && activeSection.champs ? activeSection.champs.find(c => c.id === this.selectedFieldId) : null;

    return `
      <div class="form-builder-layout">

        <!-- Colonne 1 : Palette d'éléments -->
        <div class="fb-palette">
          <h5 style="margin-bottom: 16px;">Palette de champs</h5>
          <p class="text-xs text-muted" style="margin-bottom: 16px;">Cliquez pour ajouter au formulaire :</p>

          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('texte')">
            <span>📝</span> Texte court
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('texte_long')">
            <span>📄</span> Texte long / Description
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('montant')">
            <span>💰</span> Montant en FCFA
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('nombre')">
            <span>🔢</span> Nombre / Années
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('date')">
            <span>📅</span> Date de validité
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('liste')">
            <span>🔽</span> Liste déroulante
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('case_a_cocher')">
            <span>☑️</span> Case à cocher
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('fichier')" style="border-color: var(--brand-500); background: var(--brand-100);">
            <span>📎</span> <strong>Dépôt de pièce (PDF)</strong>
          </div>
          <div class="fb-palette-item" onclick="SignwFormBuilder.addField('tableau_repetable')">
            <span>📊</span> Tableau répétable
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--ink-200);">
            <button class="btn btn-secondary btn-sm w-full" onclick="SignwFormBuilder.addSection()">
              + Nouvelle section
            </button>
          </div>
        </div>

        <!-- Colonne 2 : Canevas central -->
        <div class="fb-canvas">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h4 style="margin: 0;">Sections du formulaire</h4>
            <span class="text-sm text-muted">${(this.schema.sections || []).length} section(s) configurée(s)</span>
          </div>

          ${(this.schema.sections || []).map((sec, sIdx) => {
            const isSecSelected = sec.id === this.selectedSectionId;
            return `
              <div class="fb-section-card" style="${isSecSelected ? 'border: 2px solid var(--brand-700);' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="color: var(--brand-900); font-size: 1rem;">${sec.titre}</strong>
                    <span class="badge" style="background: var(--ink-200); font-size: 0.7rem;">Pilier : ${sec.pilier || 'admin'}</span>
                  </div>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn-ghost btn-sm" onclick="SignwFormBuilder.selectSection('${sec.id}')" title="Éditer cette section">✏️</button>
                    <button class="btn-ghost btn-sm" onclick="SignwFormBuilder.deleteSection('${sec.id}')" title="Supprimer la section">🗑️</button>
                  </div>
                </div>

                <!-- Champs de la section -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(sec.champs || []).map((ch, cIdx) => {
                    const isFieldSelected = ch.id === this.selectedFieldId;
                    return `
                      <div class="fb-field-card ${isFieldSelected ? 'selected' : ''}" onclick="SignwFormBuilder.selectField('${sec.id}', '${ch.id}')">
                        <div style="display: flex; align-items: center; gap: 12px;">
                          <span style="color: var(--ink-500); font-size: 0.8rem;">::</span>
                          <div>
                            <span class="font-bold text-sm">${ch.label || 'Champ sans titre'}</span>
                            <div class="text-xs text-muted">Type : ${ch.type} • Poids : ${ch.poids || 1} pts ${ch.obligatoire ? '• <span style="color: var(--danger)">Obligatoire</span>' : ''}</div>
                          </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                          <button type="button" class="btn-ghost btn-sm" onclick="event.stopPropagation(); SignwFormBuilder.moveField('${sec.id}', ${cIdx}, -1)">▲</button>
                          <button type="button" class="btn-ghost btn-sm" onclick="event.stopPropagation(); SignwFormBuilder.moveField('${sec.id}', ${cIdx}, 1)">▼</button>
                          <button type="button" class="btn-ghost btn-sm" onclick="event.stopPropagation(); SignwFormBuilder.deleteField('${sec.id}', '${ch.id}')">✕</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Colonne 3 : Inspecteur de propriétés -->
        <div class="fb-inspector">
          <h5 style="margin-bottom: 16px;">Propriétés du champ</h5>

          ${activeField ? `
            <div class="form-group">
              <label class="form-label text-xs">Libellé du champ (Label) :</label>
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
    window.SignwUI.showToast(`Champ "${newField.label}" ajouté à la section.`, 'info');
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
