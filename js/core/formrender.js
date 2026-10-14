/**
 * SIGNW — Moteur de Rendu Dynamique de Formulaire (FormRender)
 * Section 7.B.2
 */

window.SignwFormRender = {
  schema: null,
  dossier: null,
  activeSectionIndex: 0,
  containerEl: null,
  autoSaveTimer: null,
  lastSavedText: 'Brouillon à jour',

  init(containerId, schema, dossier) {
    this.containerEl = document.getElementById(containerId);
    this.schema = schema;
    this.dossier = dossier || { reponses: {} };
    if (!this.dossier.reponses) this.dossier.reponses = {};

    this.render();
  },

  render() {
    if (!this.containerEl || !this.schema) return;

    const sections = this.schema.sections || [];
    const activeSection = sections[this.activeSectionIndex] || sections[0];
    const pieces = window.SignwStore.getPiecesByDossier(this.dossier.id);
    const isPiecesIncompletes = this.dossier.statut === 'pieces_incompletes';

    // Trouver les pièces rejetées si pièces incomplètes
    const rejectedPieces = pieces.filter(p => p.statutPiece === 'rejetee' || p.statutPiece === 'complement_demande');

    // Calcul de complétion globale
    let totalRequired = 0;
    let filledRequired = 0;
    sections.forEach(sec => {
      (sec.champs || []).forEach(ch => {
        if (ch.obligatoire) {
          totalRequired++;
          const hasVal = this.dossier.reponses[ch.id];
          const hasPiece = pieces.some(p => p.champId === ch.id && p.statutPiece !== 'rejetee');
          if (hasVal || hasPiece) filledRequired++;
        }
      });
    });
    const progressPct = totalRequired > 0 ? Math.round((filledRequired / totalRequired) * 100) : 0;

    let bannerHtml = '';
    if (isPiecesIncompletes && rejectedPieces.length > 0) {
      bannerHtml = `
        <div class="card" style="background: var(--warning-bg); border: 2px solid var(--warning); margin-bottom: 24px; padding: 20px;">
          <div style="display: flex; gap: 14px; align-items: flex-start;">
            <span style="font-size: 1.8rem;">⚠️</span>
            <div>
              <h4 style="color: #9A5B00; margin-bottom: 6px;">Demande de pièces complémentaires de l’auditeur</h4>
              <p style="font-size: 0.9375rem; color: var(--ink-900); margin-bottom: 12px;">
                Certaines pièces de votre dossier nécessitent une mise à jour avant de pouvoir finaliser votre certification :
              </p>
              <ul style="padding-left: 20px; font-size: 0.875rem;">
                ${rejectedPieces.map(p => `
                  <li style="margin-bottom: 8px;">
                    <strong>${p.nomFichier}</strong> :
                    <span style="color: var(--danger); font-weight: 600;">${p.commentaireAuditeur || 'Pièce non conforme'}</span>
                  </li>
                `).join('')}
              </ul>
              <small class="text-muted">Déposez les nouveaux justificatifs ci-dessous puis cliquez sur "Resoumettre le dossier".</small>
            </div>
          </div>
        </div>
      `;
    }

    this.containerEl.innerHTML = `
      ${bannerHtml}

      <!-- Barre de statut & progression -->
      <div class="card" style="margin-bottom: 24px; padding: 16px 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="margin: 0; font-size: 1.3rem;">${this.schema.nom || 'Dossier de certification'}</h3>
            <span class="text-muted text-sm">Version ${this.schema.version} • Statut : ${window.SignwUtils.getStatusBadge(this.dossier.statut)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span id="autosave-status" class="text-xs text-muted" style="font-style: italic;">💾 ${this.lastSavedText}</span>
            <div style="text-align: right;">
              <span class="font-bold text-sm" style="color: var(--brand-700);">${progressPct}% complété</span>
            </div>
          </div>
        </div>
        <div class="progress-bar-bg" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <!-- Layout 3 colonnes -->
      <div style="display: grid; grid-template-columns: 280px 1fr 300px; gap: 24px; align-items: start;">

        <!-- Colonne Gauche : Sections -->
        <div class="card" style="padding: 12px;">
          <h5 style="margin-bottom: 12px; padding: 0 8px;">Sections du dossier</h5>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${sections.map((sec, idx) => {
              const isActive = idx === this.activeSectionIndex;
              // Vérifier si la section est complète
              const reqChamps = (sec.champs || []).filter(c => c.obligatoire);
              const isComplete = reqChamps.length > 0 && reqChamps.every(c => {
                return this.dossier.reponses[c.id] || pieces.some(p => p.champId === c.id && p.statutPiece !== 'rejetee');
              });

              return `
                <button type="button" class="btn btn-ghost" onclick="SignwFormRender.setSection(${idx})"
                        style="justify-content: space-between; text-align: left; padding: 10px 12px; border-radius: var(--radius-md); ${isActive ? 'background: var(--brand-100); color: var(--brand-900); font-weight: 700;' : ''}">
                  <span style="font-size: 0.875rem;">${sec.titre.split('.')[1] ? sec.titre.split('.')[1].trim() : sec.titre}</span>
                  <span>${isComplete ? '<span style="color: var(--success); font-weight: bold;">✓</span>' : ''}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Colonne Centrale : Formulaire de la section active -->
        <div class="card" style="padding: 24px;">
          <div style="border-bottom: 1px solid var(--ink-200); padding-bottom: 16px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 6px;">${activeSection.titre}</h4>
            <p class="text-sm text-muted" style="margin: 0;">${activeSection.description || ''}</p>
          </div>

          <form id="dynamic-form-fields" onsubmit="return false;">
            ${(activeSection.champs || []).map(champ => this.renderField(champ, pieces)).join('')}
          </form>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--ink-200);">
            <button type="button" class="btn btn-secondary btn-sm" onclick="SignwFormRender.prevSection()" ${this.activeSectionIndex === 0 ? 'disabled' : ''}>
              ← Section précédente
            </button>

            ${this.activeSectionIndex < sections.length - 1 ? `
              <button type="button" class="btn btn-primary btn-sm" onclick="SignwFormRender.nextSection()">
                Section suivante →
              </button>
            ` : `
              <button type="button" class="btn btn-gold btn-sm" onclick="SignwFormRender.submitDossier()">
                🚀 ${isPiecesIncompletes ? 'Resoumettre le dossier corrigé' : 'Soumettre pour vérification'}
              </button>
            `}
          </div>
        </div>

        <!-- Colonne Droite : Aide & Points rapportés -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="card" style="padding: 20px; background: #FAFBFD;">
            <h5 style="margin-bottom: 12px;">💡 Pourquoi ces pièces ?</h5>
            <p style="font-size: 0.875rem; color: var(--ink-700); line-height: 1.5; margin-bottom: 12px;">
              signw certifie vos compétences réelles pour que les maîtres d’ouvrage vous attribuent les marchés en toute confiance.
            </p>
            <div style="background: var(--white); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--ink-200); font-size: 0.8125rem;">
              <span class="font-bold text-brand">Règle de transparence :</span>
              <p style="margin: 4px 0 0; color: var(--ink-500);">
                Vos pièces financières et techniques restent strictement confidentielles. Seul votre score global et vos qualifications sont publiés.
              </p>
            </div>
          </div>

          <div class="card" style="padding: 20px;">
            <h5 style="margin-bottom: 10px;">🎯 Barème du secteur</h5>
            <div style="font-size: 0.8125rem; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span>Conformité juridique</span>
                <strong>20 pts</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Capacité financière</span>
                <strong>25 pts</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Capacité technique</span>
                <strong>25 pts</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Références chantiers</span>
                <strong>20 pts</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Ressources humaines</span>
                <strong>10 pts</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    // Attacher les écouteurs sur les champs pour auto-save
    this.attachFieldListeners();
  },

  renderField(champ, pieces) {
    const val = this.dossier.reponses[champ.id] || '';
    const piece = pieces.find(p => p.champId === champ.id);
    const reqMark = champ.obligatoire ? '<span class="required">*</span>' : '';

    let inputHtml = '';

    switch (champ.type) {
      case 'texte':
        inputHtml = `
          <input type="text" id="${champ.id}" name="${champ.id}" value="${window.SignwUtils.escapeHTML(val)}"
                 class="form-control" placeholder="${champ.aide || ''}" ${champ.obligatoire ? 'required' : ''}>
        `;
        break;

      case 'texte_long':
        inputHtml = `
          <textarea id="${champ.id}" name="${champ.id}" class="form-control" placeholder="${champ.aide || ''}">${window.SignwUtils.escapeHTML(val)}</textarea>
        `;
        break;

      case 'nombre':
        inputHtml = `
          <input type="number" id="${champ.id}" name="${champ.id}" value="${val}"
                 class="form-control" min="${champ.min || 0}" max="${champ.max || 999999}" ${champ.obligatoire ? 'required' : ''}>
        `;
        break;

      case 'montant':
        inputHtml = `
          <div class="input-with-unit">
            <input type="number" id="${champ.id}" name="${champ.id}" value="${val}"
                   class="form-control" placeholder="Ex: 500000000" ${champ.obligatoire ? 'required' : ''}>
            <span class="input-unit">FCFA</span>
          </div>
        `;
        break;

      case 'date':
        inputHtml = `
          <input type="date" id="${champ.id}" name="${champ.id}" value="${val}" class="form-control" ${champ.obligatoire ? 'required' : ''}>
        `;
        break;

      case 'liste':
        const options = champ.options || [];
        inputHtml = `
          <select id="${champ.id}" name="${champ.id}" class="form-control">
            <option value="">Sélectionner une option...</option>
            ${options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
        `;
        break;

      case 'case_a_cocher':
        inputHtml = `
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.9375rem;">
            <input type="checkbox" id="${champ.id}" name="${champ.id}" ${val ? 'checked' : ''} style="width: 18px; height: 18px;">
            <span>${champ.label}</span>
          </label>
        `;
        break;

      case 'fichier':
        if (piece && piece.statutPiece !== 'rejetee') {
          // Fichier déjà déposé et valide ou en cours
          inputHtml = `
            <div style="background: var(--ink-50); border: 1px solid var(--ink-300); border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.6rem;">📄</span>
                <div>
                  <div class="font-bold text-sm">${piece.nomFichier}</div>
                  <div class="text-xs text-muted">${(piece.tailleKo / 1024).toFixed(2)} Mo • Déposé le ${piece.deposeeLe}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge ${piece.statutPiece === 'validee' ? 'badge-certifie' : 'badge-en_verification'}">
                  ${piece.statutPiece === 'validee' ? '✓ Validée' : 'En attente'}
                </span>
                <button type="button" class="btn btn-ghost btn-sm" onclick="SignwFormRender.simulateUpload('${champ.id}')" title="Remplacer le document">
                  Remplacer
                </button>
              </div>
            </div>
          `;
        } else {
          // Dropzone d'upload simulé
          const isRejet = piece && (piece.statutPiece === 'rejetee' || piece.statutPiece === 'complement_demande');
          inputHtml = `
            ${isRejet ? `<div class="badge badge-rejete" style="margin-bottom: 8px;">Rejeté : ${piece.commentaireAuditeur}</div>` : ''}
            <div class="dropzone" id="dropzone-${champ.id}" onclick="SignwFormRender.simulateUpload('${champ.id}')">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 6px;">📤</span>
              <strong>Cliquez ou glissez votre pièce justificative</strong>
              <div class="text-xs text-muted" style="margin-top: 4px;">Formats : PDF, JPG • Taille max : ${champ.tailleMaxMo || 10} Mo</div>
            </div>
          `;
        }
        break;

      case 'tableau_repetable':
        const rows = Array.isArray(val) ? val : [];
        const cols = champ.colonnes || ['Désignation', 'Quantité', 'Preuve'];
        inputHtml = `
          <div style="border: 1px solid var(--ink-200); border-radius: var(--radius-md); overflow: hidden;">
            <table class="table" id="table-${champ.id}">
              <thead>
                <tr>
                  ${cols.map(c => `<th>${c}</th>`).join('')}
                  <th style="width: 50px;"></th>
                </tr>
              </thead>
              <tbody>
                ${rows.length === 0 ? `
                  <tr><td colspan="${cols.length + 1}" class="text-center text-muted" style="padding: 20px;">Aucune ligne saisie. Cliquez sur Ajouter ci-dessous.</td></tr>
                ` : rows.map((r, rIdx) => `
                  <tr>
                    ${cols.map((c, cIdx) => `
                      <td><input type="text" class="form-control" value="${r[cIdx] || ''}" onchange="SignwFormRender.updateTableRow('${champ.id}', ${rIdx}, ${cIdx}, this.value)"></td>
                    `).join('')}
                    <td><button type="button" class="btn-ghost btn-sm" onclick="SignwFormRender.removeTableRow('${champ.id}', ${rIdx})">✕</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="padding: 10px; background: var(--ink-50); border-top: 1px solid var(--ink-200);">
              <button type="button" class="btn btn-secondary btn-sm" onclick="SignwFormRender.addTableRow('${champ.id}', ${cols.length})">
                + Ajouter une ligne
              </button>
            </div>
          </div>
        `;
        break;

      default:
        inputHtml = `<input type="text" id="${champ.id}" class="form-control">`;
    }

    if (champ.type === 'case_a_cocher') {
      return `<div class="form-group">${inputHtml}</div>`;
    }

    return `
      <div class="form-group" style="margin-bottom: 20px;">
        <label class="form-label" for="${champ.id}">
          ${champ.label} ${reqMark}
          ${champ.poids ? `<span class="badge" style="background: var(--ink-100); font-weight: normal; margin-left: 8px;">${champ.poids} pts</span>` : ''}
        </label>
        ${inputHtml}
        ${champ.aide ? `<div class="form-hint">${champ.aide}</div>` : ''}
      </div>
    `;
  },

  attachFieldListeners() {
    const form = document.getElementById('dynamic-form-fields');
    if (!form) return;

    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('change', () => {
        const id = input.id || input.name;
        if (!id) return;
        if (input.type === 'checkbox') {
          this.dossier.reponses[id] = input.checked;
        } else {
          this.dossier.reponses[id] = input.value;
        }
        this.triggerAutoSave();
      });
    });
  },

  triggerAutoSave() {
    clearTimeout(this.autoSaveTimer);
    const statusEl = document.getElementById('autosave-status');
    if (statusEl) statusEl.textContent = 'Enregistrement en cours...';

    this.autoSaveTimer = setTimeout(() => {
      window.SignwStore.save();
      this.lastSavedText = 'Brouillon enregistré à l’instant';
      if (statusEl) statusEl.textContent = '💾 ' + this.lastSavedText;
    }, 600);
  },

  setSection(index) {
    this.activeSectionIndex = index;
    this.render();
  },

  nextSection() {
    if (this.activeSectionIndex < this.schema.sections.length - 1) {
      this.activeSectionIndex++;
      this.render();
    }
  },

  prevSection() {
    if (this.activeSectionIndex > 0) {
      this.activeSectionIndex--;
      this.render();
    }
  },

  simulateUpload(champId) {
    // Simuler le dépôt d'un fichier avec feedback immédiat
    const fakeFileName = `Document_Justificatif_${champId.toUpperCase()}.pdf`;
    const newPiece = window.SignwStore.savePiece({
      dossierId: this.dossier.id,
      champId,
      nomFichier: fakeFileName,
      typeMime: 'application/pdf',
      tailleKo: Math.floor(1200 + Math.random() * 2500),
      statutPiece: 'deposee',
      niveauRisque: 'faible'
    });

    this.dossier.reponses[champId] = fakeFileName;
    window.SignwStore.save();
    window.SignwUI.showToast(`Pièce "${fakeFileName}" téléversée avec succès.`, 'success');
    this.render();
  },

  addTableRow(champId, colCount) {
    if (!Array.isArray(this.dossier.reponses[champId])) {
      this.dossier.reponses[champId] = [];
    }
    const emptyRow = new Array(colCount).fill('');
    this.dossier.reponses[champId].push(emptyRow);
    this.triggerAutoSave();
    this.render();
  },

  removeTableRow(champId, rowIndex) {
    if (Array.isArray(this.dossier.reponses[champId])) {
      this.dossier.reponses[champId].splice(rowIndex, 1);
      this.triggerAutoSave();
      this.render();
    }
  },

  updateTableRow(champId, rIdx, cIdx, val) {
    if (this.dossier.reponses[champId] && this.dossier.reponses[champId][rIdx]) {
      this.dossier.reponses[champId][rIdx][cIdx] = val;
      this.triggerAutoSave();
    }
  },

  submitDossier() {
    const isPiecesIncompletes = this.dossier.statut === 'pieces_incompletes';
    const nextStatut = isPiecesIncompletes ? 'en_verification' : 'soumis';

    window.SignwUI.confirm(
      'Transmission du dossier de certification',
      'Confirmez-vous la transmission de votre dossier pour vérification par l’équipe d’auditeurs signw ? Toutes les pièces déposées seront contrôlées.',
      () => {
        window.SignwStore.transitionDossier(
          this.dossier.id,
          nextStatut,
          'Agent',
          isPiecesIncompletes ? 'Compléments de pièces déposés par l’agent' : 'Soumission officielle du dossier'
        );

        window.SignwStore.addNotification(
          'usr_auditeur1',
          'info',
          `Le dossier ${this.dossier.id} a été ${isPiecesIncompletes ? 'complété et renvoyé' : 'soumis'} pour audit.`,
          `app/auditeur/audit.html?id=${this.dossier.id}`
        );

        window.SignwUI.showToast(
          isPiecesIncompletes ? 'Dossier corrigé renvoyé à l’auditeur avec succès !' : 'Votre dossier a été transmis avec succès !',
          'success'
        );

        setTimeout(() => {
          window.location.href = 'mes-dossiers.html';
        }, 800);
      },
      'Transmettre le dossier'
    );
  }
};
