/**
 * SIGNW — Moteur de Rendu Dynamique de Formulaire (FormRender)
 */

window.SignwFormRender = {
  schema: null,
  dossier: null,
  activeSectionIndex: 0,
  containerEl: null,
  autoSaveTimer: null,
  lastSavedText: 'Brouillon à jour',

  ic(name, size = 18) {
    return window.SignwIcons ? window.SignwIcons.render(name, { size }) : '';
  },

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
    const rejectedPieces = pieces.filter(p => p.statutPiece === 'rejetee' || p.statutPiece === 'complement_demande');
    const ic = (n, s) => this.ic(n, s);

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
        <div class="alert alert-warning" style="margin-bottom: 20px;">
          ${ic('alert', 20)}
          <div style="min-width:0;">
            <h4 style="color: #7A4E00; margin: 0 0 6px; font-size: 1rem;">Demande de pièces complémentaires</h4>
            <p style="font-size: var(--text-sm); margin: 0 0 10px;">
              Certaines pièces nécessitent une mise à jour avant certification :
            </p>
            <ul style="padding-left: 18px; font-size: var(--text-sm); margin: 0;">
              ${rejectedPieces.map(p => `
                <li style="margin-bottom: 6px; word-break: break-word;">
                  <strong>${window.SignwUtils.escapeHTML(p.nomFichier)}</strong> —
                  <span style="color: var(--danger);">${window.SignwUtils.escapeHTML(p.commentaireAuditeur || 'Pièce non conforme')}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    this.containerEl.innerHTML = `
      ${bannerHtml}

      <div class="card" style="margin-bottom: 20px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 12px;">
          <div style="min-width:0; flex:1;">
            <h3 style="margin: 0; font-size: 1.15rem; word-break: break-word;">${window.SignwUtils.escapeHTML(this.schema.nom || 'Dossier de certification')}</h3>
            <div class="text-muted text-sm" style="margin-top: 4px; display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
              <span>Version ${this.schema.version}</span>
              <span>·</span>
              ${window.SignwUtils.getStatusBadge(this.dossier.statut)}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; flex-shrink:0;">
            <span id="autosave-status" class="form-autosave">${ic('save', 14)} ${this.lastSavedText}</span>
            <strong class="text-sm text-brand">${progressPct}%</strong>
          </div>
        </div>
        <div class="progress-bar-bg" style="height: 8px;">
          <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <div class="form-render-layout">
        <div class="card" style="padding: 12px;">
          <h5 style="margin-bottom: 12px; padding: 0 8px;">Sections</h5>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${sections.map((sec, idx) => {
              const isActive = idx === this.activeSectionIndex;
              const reqChamps = (sec.champs || []).filter(c => c.obligatoire);
              const isComplete = reqChamps.length > 0 && reqChamps.every(c => {
                return this.dossier.reponses[c.id] || pieces.some(p => p.champId === c.id && p.statutPiece !== 'rejetee');
              });
              const label = sec.titre.split('.')[1] ? sec.titre.split('.')[1].trim() : sec.titre;
              return `
                <button type="button" class="btn btn-ghost form-section-nav-btn" onclick="SignwFormRender.setSection(${idx})"
                  style="${isActive ? 'background: var(--brand-50); color: var(--brand-700); font-weight: 600;' : ''}"
                  title="${window.SignwUtils.escapeHTML(label)}">
                  <span class="sec-label">${window.SignwUtils.escapeHTML(label)}</span>
                  ${isComplete ? `<span style="color: var(--success); flex-shrink:0;">${ic('check', 16)}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card" style="padding: 20px;">
          <div style="padding-bottom: 14px; margin-bottom: 18px;">
            <h4 style="margin: 0 0 6px; word-break: break-word;">${window.SignwUtils.escapeHTML(activeSection.titre)}</h4>
            <p class="text-sm text-muted" style="margin: 0;">${window.SignwUtils.escapeHTML(activeSection.description || '')}</p>
          </div>

          <form id="dynamic-form-fields" onsubmit="return false;">
            ${(activeSection.champs || []).map(champ => this.renderField(champ, pieces)).join('')}
          </form>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 28px; padding-top: 16px; gap: 12px; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="SignwFormRender.prevSection()" ${this.activeSectionIndex === 0 ? 'disabled' : ''}>
              Section précédente
            </button>
            ${this.activeSectionIndex < sections.length - 1 ? `
              <button type="button" class="btn btn-primary btn-sm" onclick="SignwFormRender.nextSection()">
                Section suivante
              </button>
            ` : `
              <button type="button" class="btn btn-primary btn-sm" onclick="SignwFormRender.submitDossier()">
                ${ic('send', 16)}
                ${isPiecesIncompletes ? 'Resoumettre le dossier' : 'Soumettre pour vérification'}
              </button>
            `}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="card" style="padding: 16px;">
            <h5 style="margin-bottom: 10px; display:flex; align-items:center; gap:8px;">
              ${ic('lightbulb', 16)} Pourquoi ces pièces ?
            </h5>
            <p class="text-sm text-muted" style="margin: 0 0 12px; line-height: 1.5;">
              SIGNW certifie vos compétences réelles pour que les maîtres d’ouvrage vous attribuent les marchés en confiance.
            </p>
            <div style="background: var(--ink-50); padding: 12px; border-radius: var(--radius-md); font-size: var(--text-xs);">
              <strong class="text-brand">Confidentialité</strong>
              <p style="margin: 4px 0 0; color: var(--ink-500);">
                Vos pièces restent confidentielles. Seuls le score et les qualifications sont publiés.
              </p>
            </div>
          </div>

          <div class="card" style="padding: 16px;">
            <h5 style="margin-bottom: 10px; display:flex; align-items:center; gap:8px;">
              ${ic('score', 16)} Barème du secteur
            </h5>
            <div style="font-size: var(--text-xs); display: flex; flex-direction: column; gap: 8px;">
              <div class="flex justify-between"><span>Conformité juridique</span><strong>20 pts</strong></div>
              <div class="flex justify-between"><span>Capacité financière</span><strong>25 pts</strong></div>
              <div class="flex justify-between"><span>Capacité technique</span><strong>25 pts</strong></div>
              <div class="flex justify-between"><span>Références chantiers</span><strong>20 pts</strong></div>
              <div class="flex justify-between"><span>Ressources humaines</span><strong>10 pts</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachFieldListeners();
  },

  renderField(champ, pieces) {
    const val = this.dossier.reponses[champ.id] || '';
    const piece = pieces.find(p => p.champId === champ.id);
    const reqMark = champ.obligatoire ? '<span class="required">*</span>' : '';
    const ic = (n, s) => this.ic(n, s);
    let inputHtml = '';

    switch (champ.type) {
      case 'texte':
        inputHtml = `<input type="text" id="${champ.id}" name="${champ.id}" value="${window.SignwUtils.escapeHTML(val)}" class="form-control" placeholder="${champ.aide || ''}" ${champ.obligatoire ? 'required' : ''}>`;
        break;
      case 'texte_long':
        inputHtml = `<textarea id="${champ.id}" name="${champ.id}" class="form-control" placeholder="${champ.aide || ''}">${window.SignwUtils.escapeHTML(val)}</textarea>`;
        break;
      case 'nombre':
        inputHtml = `<input type="number" id="${champ.id}" name="${champ.id}" value="${val}" class="form-control" min="${champ.min || 0}" max="${champ.max || 999999}" ${champ.obligatoire ? 'required' : ''}>`;
        break;
      case 'montant':
        inputHtml = `
          <div class="input-with-unit">
            <input type="number" id="${champ.id}" name="${champ.id}" value="${val}" class="form-control" placeholder="Ex: 500000000" ${champ.obligatoire ? 'required' : ''}>
            <span class="input-unit">FCFA</span>
          </div>`;
        break;
      case 'date':
        inputHtml = `<input type="date" id="${champ.id}" name="${champ.id}" value="${val}" class="form-control" ${champ.obligatoire ? 'required' : ''}>`;
        break;
      case 'liste': {
        const options = champ.options || [];
        inputHtml = `
          <select id="${champ.id}" name="${champ.id}" class="form-control">
            <option value="">Sélectionner…</option>
            ${options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>`;
        break;
      }
      case 'case_a_cocher':
        inputHtml = `
          <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: var(--text-sm);">
            <input type="checkbox" id="${champ.id}" name="${champ.id}" ${val ? 'checked' : ''} style="width: 18px; height: 18px; margin-top: 2px; flex-shrink:0;">
            <span style="word-break: break-word;">${champ.label}</span>
          </label>`;
        break;
      case 'fichier':
        if (piece && piece.statutPiece !== 'rejetee') {
          inputHtml = `
            <div class="form-file-row">
              <div class="form-file-meta">
                ${ic('file', 20)}
                <div class="form-file-text">
                  <div class="file-name" title="${window.SignwUtils.escapeHTML(piece.nomFichier)}">${window.SignwUtils.escapeHTML(piece.nomFichier)}</div>
                  <div class="text-xs text-muted">${(piece.tailleKo / 1024).toFixed(2)} Mo · ${piece.deposeeLe}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-shrink:0;">
                <span class="badge ${piece.statutPiece === 'validee' ? 'badge-certifie' : 'badge-en_verification'}">
                  ${piece.statutPiece === 'validee' ? 'Validée' : 'En attente'}
                </span>
                <button type="button" class="btn btn-ghost btn-sm" onclick="SignwFormRender.simulateUpload('${champ.id}')">Remplacer</button>
              </div>
            </div>`;
        } else {
          const isRejet = piece && (piece.statutPiece === 'rejetee' || piece.statutPiece === 'complement_demande');
          inputHtml = `
            ${isRejet ? `<div class="badge badge-rejete" style="margin-bottom: 8px;">Rejeté : ${window.SignwUtils.escapeHTML(piece.commentaireAuditeur || '')}</div>` : ''}
            <div class="dropzone" id="dropzone-${champ.id}" onclick="SignwFormRender.simulateUpload('${champ.id}')">
              <span class="dropzone-icon">${ic('upload', 28)}</span>
              <strong>Déposer une pièce justificative</strong>
              <div class="text-xs text-muted" style="margin-top: 4px;">PDF, JPG · max ${champ.tailleMaxMo || 10} Mo</div>
            </div>`;
        }
        break;
      case 'tableau_repetable': {
        const rows = Array.isArray(val) ? val : [];
        const cols = champ.colonnes || ['Désignation', 'Quantité', 'Preuve'];
        inputHtml = `
          <div class="table-container">
            <table class="table" id="table-${champ.id}">
              <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}<th style="width:44px;"></th></tr></thead>
              <tbody>
                ${rows.length === 0 ? `
                  <tr><td colspan="${cols.length + 1}" class="text-center text-muted" style="padding: 16px;">Aucune ligne. Ajoutez-en une ci-dessous.</td></tr>
                ` : rows.map((r, rIdx) => `
                  <tr>
                    ${cols.map((c, cIdx) => `
                      <td><input type="text" class="form-control" value="${window.SignwUtils.escapeHTML(r[cIdx] || '')}" onchange="SignwFormRender.updateTableRow('${champ.id}', ${rIdx}, ${cIdx}, this.value)"></td>
                    `).join('')}
                    <td><button type="button" class="icon-btn" onclick="SignwFormRender.removeTableRow('${champ.id}', ${rIdx})">${ic('x', 16)}</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="padding: 10px; background: var(--ink-50);">
              <button type="button" class="btn btn-secondary btn-sm" onclick="SignwFormRender.addTableRow('${champ.id}', ${cols.length})">
                ${ic('plus', 14)} Ajouter une ligne
              </button>
            </div>
          </div>`;
        break;
      }
      default:
        inputHtml = `<input type="text" id="${champ.id}" class="form-control">`;
    }

    if (champ.type === 'case_a_cocher') {
      return `<div class="form-group">${inputHtml}</div>`;
    }

    return `
      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" for="${champ.id}" style="word-break: break-word;">
          ${champ.label} ${reqMark}
          ${champ.poids ? `<span class="badge badge-brouillon" style="margin-left: 6px;">${champ.poids} pts</span>` : ''}
        </label>
        ${inputHtml}
        ${champ.aide ? `<div class="form-hint">${champ.aide}</div>` : ''}
      </div>`;
  },

  attachFieldListeners() {
    const form = document.getElementById('dynamic-form-fields');
    if (!form) return;
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('change', () => {
        const id = input.id || input.name;
        if (!id) return;
        this.dossier.reponses[id] = input.type === 'checkbox' ? input.checked : input.value;
        this.triggerAutoSave();
      });
    });
  },

  triggerAutoSave() {
    clearTimeout(this.autoSaveTimer);
    const statusEl = document.getElementById('autosave-status');
    if (statusEl) statusEl.innerHTML = `${this.ic('save', 14)} Enregistrement…`;

    this.autoSaveTimer = setTimeout(() => {
      window.SignwStore.save();
      this.lastSavedText = 'Brouillon enregistré';
      if (statusEl) statusEl.innerHTML = `${this.ic('save', 14)} ${this.lastSavedText}`;
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
    const fakeFileName = `Document_${champId.toUpperCase()}.pdf`;
    window.SignwStore.savePiece({
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
    window.SignwUI.showToast(`Pièce « ${fakeFileName} » déposée.`, 'success');
    this.render();
  },

  addTableRow(champId, colCount) {
    if (!Array.isArray(this.dossier.reponses[champId])) this.dossier.reponses[champId] = [];
    this.dossier.reponses[champId].push(new Array(colCount).fill(''));
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
      'Transmission du dossier',
      'Confirmez-vous la transmission de votre dossier pour vérification par les auditeurs SIGNW ?',
      () => {
        window.SignwStore.transitionDossier(
          this.dossier.id,
          nextStatut,
          'Agent',
          isPiecesIncompletes ? 'Compléments de pièces déposés' : 'Soumission officielle du dossier'
        );
        window.SignwStore.addNotification(
          'usr_auditeur1',
          'info',
          `Le dossier ${this.dossier.id} a été ${isPiecesIncompletes ? 'complété' : 'soumis'} pour audit.`,
          `app/auditeur/audit.html?id=${this.dossier.id}`
        );
        window.SignwUI.showToast(
          isPiecesIncompletes ? 'Dossier renvoyé à l’auditeur.' : 'Dossier transmis avec succès.',
          'success'
        );
        setTimeout(() => { window.location.href = 'mes-dossiers.html'; }, 800);
      },
      'Transmettre'
    );
  }
};
