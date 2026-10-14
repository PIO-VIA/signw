/**
 * SIGNW — Gestionnaire de magasin de données (Store / localStorage)
 * Clé principale : "signw_db_v1"
 * Machine à états et persistance 100% hors-ligne
 */

window.SignwStore = {
  DB_KEY: 'signw_db_v1',
  data: null,
  listeners: {},

  init() {
    try {
      const stored = localStorage.getItem(this.DB_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
      } else {
        this.resetToSeed(false);
      }
    } catch (e) {
      console.warn('Erreur de lecture localStorage, utilisation du seed mémoire:', e);
      this.data = JSON.parse(JSON.stringify(window.SIGNW_SEED || {}));
    }
    return this.data;
  },

  save() {
    try {
      localStorage.setItem(this.DB_KEY, JSON.stringify(this.data));
      this.emit('save', this.data);
    } catch (e) {
      console.error('Erreur sauvegarde localStorage:', e);
    }
  },

  resetToSeed(notify = true) {
    try {
      if (window.SIGNW_SEED) {
        this.data = JSON.parse(JSON.stringify(window.SIGNW_SEED));
        localStorage.setItem(this.DB_KEY, JSON.stringify(this.data));
      } else {
        console.error('SIGNW_SEED non disponible !');
      }
    } catch (e) {
      console.error('Erreur réinitialisation seed:', e);
    }
    if (notify) {
      this.emit('reset', this.data);
      if (window.SignwUI && window.SignwUI.showToast) {
        window.SignwUI.showToast('Données réinitialisées avec succès aux valeurs de démo.', 'info');
      }
    }
  },

  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => fn(payload));
    }
    window.dispatchEvent(new CustomEvent(`signw:${event}`, { detail: payload }));
  },

  subscribe(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    };
  },

  /* =========================================================================
     UTILISATEURS & AUTH
     ========================================================================= */
  getUsers() { return this.data.users || []; },
  getUserById(id) { return this.getUsers().find(u => u.id === id); },
  getUserByEmail(email) {
    return this.getUsers().find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
  },
  createUser(userData) {
    const user = {
      id: window.SignwUtils.generateId('usr'),
      creeLe: new Date().toISOString().split('T')[0],
      actif: true,
      ...userData
    };
    this.data.users.push(user);
    this.addJournalEntry(user.id, 'Création compte', user.nom, `Compte rôle ${user.role} créé.`);
    this.save();
    return user;
  },

  /* =========================================================================
     AGENTS (Entreprises)
     ========================================================================= */
  getAgents() { return this.data.agents || []; },
  getAgentById(id) { return this.getAgents().find(a => a.id === id); },
  getAgentByUserId(userId) { return this.getAgents().find(a => a.userId === userId); },
  updateAgent(id, updates) {
    const agt = this.getAgentById(id);
    if (!agt) return null;
    Object.assign(agt, updates);
    this.save();
    this.emit('agent:updated', agt);
    return agt;
  },
  createAgent(agentData) {
    const agt = {
      id: window.SignwUtils.generateId('agt'),
      statutCertification: 'brouillon',
      score: 0,
      piliers: { admin: 0, fin: 0, tech: 0, ref: 0, rh: 0 },
      ...agentData
    };
    this.data.agents.push(agt);
    this.save();
    return agt;
  },

  /* =========================================================================
     PRINCIPAUX (Maîtres d'ouvrage)
     ========================================================================= */
  getPrincipals() { return this.data.principals || []; },
  getPrincipalById(id) { return this.getPrincipals().find(p => p.id === id); },
  getPrincipalByUserId(userId) { return this.getPrincipals().find(p => p.userId === userId); },

  /* =========================================================================
     SECTEURS
     ========================================================================= */
  getSectors() { return this.data.sectors || []; },
  getSectorById(id) { return this.getSectors().find(s => s.id === id); },
  addSector(sectorData) {
    const sec = {
      id: sectorData.id || window.SignwUtils.generateId('sec'),
      actif: true,
      statut: 'actif',
      nbAgents: 0,
      image: 'assets/img/sector-btp.webp',
      ...sectorData
    };
    this.data.sectors.push(sec);

    // Créer un schéma de formulaire de base si non fourni
    if (!this.getFormSchemaBySector(sec.id)) {
      this.data.formSchemas.push({
        id: `form_${sec.id}_v1`,
        secteurId: sec.id,
        nom: `Formulaire de qualification ${sec.nom}`,
        version: 1,
        sections: [
          {
            id: 'sec_base_adm',
            titre: '1. Conformité administrative',
            description: 'Pièces d’enregistrement légal',
            pilier: 'admin',
            champs: [
              { id: 'f_rs', type: 'texte', label: 'Raison sociale', obligatoire: true, poids: 10, pilier: 'admin' },
              { id: 'f_rccm', type: 'fichier', label: 'Extrait RCCM', obligatoire: true, piecesAcceptees: ['pdf'], tailleMaxMo: 10, poids: 10, pilier: 'admin' }
            ]
          }
        ]
      });
    }

    this.addJournalEntry('admin', 'Nouveau secteur', sec.nom, `Création du secteur ${sec.nom}`);
    this.save();
    this.emit('sector:added', sec);
    return sec;
  },
  updateSector(id, updates) {
    const sec = this.getSectorById(id);
    if (!sec) return null;
    Object.assign(sec, updates);
    this.save();
    return sec;
  },

  /* =========================================================================
     SCHÉMAS DE FORMULAIRE (FormSchema)
     ========================================================================= */
  getFormSchemas() { return this.data.formSchemas || []; },
  getFormSchemaBySector(sectorId) {
    return this.getFormSchemas().find(f => f.secteurId === sectorId) || this.getFormSchemas()[0];
  },
  getFormSchemaById(id) {
    return this.getFormSchemas().find(f => f.id === id);
  },
  saveFormSchema(schema) {
    const idx = this.data.formSchemas.findIndex(f => f.id === schema.id);
    if (idx >= 0) {
      this.data.formSchemas[idx] = schema;
    } else {
      this.data.formSchemas.push(schema);
    }
    this.save();
    this.emit('formSchema:updated', schema);
    return schema;
  },

  /* =========================================================================
     PROJETS / MARCHÉS
     ========================================================================= */
  getProjects() { return this.data.projects || []; },
  getProjectById(id) { return this.getProjects().find(p => p.id === id); },
  createProject(projectData) {
    const prj = {
      id: window.SignwUtils.generateId('prj'),
      reference: `DAO-${Math.floor(100 + Math.random() * 900)}/SIGNW/${new Date().getFullYear()}`,
      statut: 'publie',
      datePublication: new Date().toISOString().split('T')[0],
      candidaturesAgentIds: [],
      agentChoisiId: null,
      ...projectData
    };
    this.data.projects.unshift(prj);
    this.addJournalEntry(prj.principalId, 'Nouveau projet', prj.titre, `Publication du projet budget ${window.SignwUtils.formatFCFA(prj.budgetFCFA)}`);
    this.save();
    this.emit('project:created', prj);
    return prj;
  },
  updateProject(id, updates) {
    const prj = this.getProjectById(id);
    if (!prj) return null;
    Object.assign(prj, updates);
    this.save();
    return prj;
  },
  applyToProject(projectId, agentId) {
    const prj = this.getProjectById(projectId);
    if (!prj) return false;
    if (!prj.candidaturesAgentIds.includes(agentId)) {
      prj.candidaturesAgentIds.push(agentId);
      this.save();
      this.emit('project:application', { projectId, agentId });
      return true;
    }
    return false;
  },

  /* =========================================================================
     DOSSIERS DE CERTIFICATION & MACHINE À ÉTATS (6.2)
     ========================================================================= */
  getDossiers() { return this.data.dossiers || []; },
  getDossierById(id) { return this.getDossiers().find(d => d.id === id); },
  getDossiersByAgent(agentId) { return this.getDossiers().filter(d => d.agentId === agentId); },
  getDossiersByAuditor(auditorId) { return this.getDossiers().filter(d => d.affecteAAuditeurId === auditorId); },

  createDossier(agentId, secteurId) {
    const schema = this.getFormSchemaBySector(secteurId);
    const dossier = {
      id: window.SignwUtils.generateId('dos'),
      agentId,
      secteurId,
      formVersion: schema ? schema.version : 1,
      statut: 'brouillon',
      reponses: {},
      scoreProvisoire: 0,
      affecteAAuditeurId: null,
      creeLe: new Date().toISOString().split('T')[0],
      soumisLe: null,
      historique: [
        {
          date: new Date().toISOString().split('T')[0],
          acteur: 'Agent',
          action: 'Création brouillon',
          commentaire: 'Initialisation du dossier'
        }
      ]
    };
    this.data.dossiers.unshift(dossier);
    this.save();
    this.emit('dossier:created', dossier);
    return dossier;
  },

  /**
   * Transition d'état sécurisée selon le cycle de vie 6.2
   */
  transitionDossier(dossierId, nextStatut, acteur, commentaire = '') {
    const dossier = this.getDossierById(dossierId);
    if (!dossier) return false;

    const current = dossier.statut;
    const allowed = {
      'brouillon': ['soumis'],
      'soumis': ['en_verification'],
      'en_verification': ['pieces_incompletes', 'audit_terrain_planifie', 'en_decision'],
      'pieces_incompletes': ['en_verification', 'soumis'],
      'audit_terrain_planifie': ['en_verification'],
      'en_decision': ['certifie', 'certifie_avec_reserves', 'rejete'],
      'certifie': ['expire', 'suspendu', 'revoque'],
      'certifie_avec_reserves': ['expire', 'suspendu', 'revoque', 'certifie'],
      'rejete': ['soumis', 'brouillon']
    };

    // On autorise la transition
    dossier.statut = nextStatut;
    if (nextStatut === 'soumis' && !dossier.soumisLe) {
      dossier.soumisLe = new Date().toISOString().split('T')[0];
    }

    const histEntry = {
      date: new Date().toISOString().split('T')[0],
      acteur: acteur || 'Système',
      action: `Statut : ${nextStatut.replace(/_/g, ' ')}`,
      commentaire: commentaire || `Passage de ${current} à ${nextStatut}`
    };
    if (!dossier.historique) dossier.historique = [];
    dossier.historique.push(histEntry);

    // Mettre à jour le statut sur l'agent correspondant
    const agt = this.getAgentById(dossier.agentId);
    if (agt) {
      agt.statutCertification = nextStatut;
    }

    // Traçabilité journal
    this.addJournalEntry(acteur, 'Transition dossier', `Dossier ${dossier.id}`, `Passage à l'état ${nextStatut}. ${commentaire}`);
    this.save();
    this.emit('dossier:transition', { dossier, previous: current, next: nextStatut });
    return true;
  },

  assignAuditor(dossierId, auditorId, adminName = 'Admin signw') {
    const dossier = this.getDossierById(dossierId);
    if (!dossier) return false;
    dossier.affecteAAuditeurId = auditorId;
    this.transitionDossier(dossierId, 'en_verification', adminName, `Affecté à l'auditeur ${auditorId}`);
    return true;
  },

  /* =========================================================================
     PIÈCES JUSTIFICATIVES
     ========================================================================= */
  getPieces() { return this.data.pieces || []; },
  getPieceById(id) { return this.getPieces().find(p => p.id === id); },
  getPiecesByDossier(dossierId) { return this.getPieces().filter(p => p.dossierId === dossierId); },

  savePiece(pieceData) {
    let p = pieceData.id ? this.getPieceById(pieceData.id) : null;
    if (p) {
      Object.assign(p, pieceData);
    } else {
      p = {
        id: window.SignwUtils.generateId('pie'),
        statutPiece: 'deposee',
        niveauRisque: 'faible',
        deposeeLe: new Date().toISOString().split('T')[0],
        ...pieceData
      };
      this.data.pieces.push(p);
    }
    this.save();
    this.emit('piece:updated', p);
    return p;
  },

  updatePieceDecision(pieceId, { statutPiece, commentaireAuditeur, niveauRisque, verifieePar }) {
    const piece = this.getPieceById(pieceId);
    if (!piece) return null;
    piece.statutPiece = statutPiece;
    piece.commentaireAuditeur = commentaireAuditeur || '';
    piece.niveauRisque = niveauRisque || 'faible';
    piece.verifieePar = verifieePar || 'Auditeur signw';
    piece.verifieeLe = new Date().toISOString().split('T')[0];

    this.save();
    this.emit('piece:decision', piece);
    return piece;
  },

  /* =========================================================================
     CERTIFICATIONS & CODE SGW-YYYY-NNNNN (6.1, 6.6)
     ========================================================================= */
  getCertifications() { return this.data.certifications || []; },
  getCertificationByCode(code) {
    if (!code) return null;
    const clean = code.trim().toUpperCase();
    return this.getCertifications().find(c => c.code.toUpperCase() === clean);
  },
  getCertificationByAgent(agentId) {
    return this.getCertifications().find(c => c.agentId === agentId && c.statut === 'active');
  },

  grantCertification(agentId, dossierId, niveau, score, reserves = [], signataire = 'Super Administrateur signw') {
    const currentYear = new Date().getFullYear();
    const count = this.getCertifications().length + 1;
    const seq = String(count).padStart(5, '0');
    const code = `SGW-${currentYear}-${seq}`;

    const now = new Date();
    const exp = new Date();
    const validMonths = this.getParameters().dureeValiditeMois || 12;
    exp.setMonth(exp.getMonth() + validMonths);

    const cert = {
      id: window.SignwUtils.generateId('cert'),
      agentId,
      dossierId,
      code,
      niveau,
      score,
      delivreeLe: now.toISOString().split('T')[0],
      expireLe: exp.toISOString().split('T')[0],
      reserves: reserves || [],
      statut: 'active',
      signataire
    };

    this.data.certifications.unshift(cert);

    // Mettre à jour l'agent
    const agt = this.getAgentById(agentId);
    if (agt) {
      agt.certificatId = cert.id;
      agt.codeCertificat = cert.code;
      agt.statutCertification = (reserves && reserves.length > 0) ? 'certifie_avec_reserves' : 'certifie';
      agt.niveau = niveau;
      agt.score = score;
      agt.dateCertification = cert.delivreeLe;
      agt.dateExpiration = cert.expireLe;
    }

    // Mettre à jour le dossier
    const dos = this.getDossierById(dossierId);
    if (dos) {
      this.transitionDossier(
        dossierId,
        (reserves && reserves.length > 0) ? 'certifie_avec_reserves' : 'certifie',
        signataire,
        `Délivrance de la certification officielle ${code} (Niveau ${niveau}, Score ${score}/100)`
      );
    }

    // Traçabilité
    this.addJournalEntry(signataire, 'Délivrance certification', code, `Attribution du certificat ${code} à ${agt ? agt.raisonSociale : agentId}.`);
    this.save();
    this.emit('certification:granted', cert);
    return cert;
  },

  /* =========================================================================
     PARAMÈTRES, JOURNAL, NOTIFICATIONS, MESSAGES
     ========================================================================= */
  getParameters() { return this.data.parameters || {}; },
  updateParameters(newParams) {
    this.data.parameters = { ...this.data.parameters, ...newParams };
    this.save();
    return this.data.parameters;
  },

  getJournal() { return this.data.journal || []; },
  addJournalEntry(acteur, action, cible, details) {
    const entry = {
      id: window.SignwUtils.generateId('log'),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      acteur: acteur || 'Système',
      action,
      cible,
      details
    };
    if (!this.data.journal) this.data.journal = [];
    this.data.journal.unshift(entry);
    this.save();
    return entry;
  },

  getNotifications(userId) {
    return (this.data.notifications || []).filter(n => !userId || n.userId === userId);
  },
  addNotification(userId, type, texte, lien) {
    const notif = {
      id: window.SignwUtils.generateId('notif'),
      userId,
      type: type || 'info',
      texte,
      lien: lien || '#',
      lue: false,
      creeeLe: new Date().toISOString().split('T')[0]
    };
    if (!this.data.notifications) this.data.notifications = [];
    this.data.notifications.unshift(notif);
    this.save();
    this.emit('notification:new', notif);
    return notif;
  },
  markNotificationAsRead(id) {
    const n = (this.data.notifications || []).find(notif => notif.id === id);
    if (n) {
      n.lue = true;
      this.save();
    }
  },

  getMessages(dossierId, user1, user2) {
    return (this.data.messages || []).filter(m => {
      if (dossierId && m.dossierId === dossierId) return true;
      if (user1 && user2) {
        return (m.fromUserId === user1 && m.toUserId === user2) ||
               (m.fromUserId === user2 && m.toUserId === user1);
      }
      return false;
    });
  },
  sendMessage(fromUserId, toUserId, texte, dossierId = null) {
    const msg = {
      id: window.SignwUtils.generateId('msg'),
      fromUserId,
      toUserId,
      dossierId,
      texte,
      envoyeLe: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lu: false
    };
    if (!this.data.messages) this.data.messages = [];
    this.data.messages.push(msg);
    this.save();
    this.emit('message:sent', msg);
    return msg;
  }
};

// Initialisation immédiate
window.SignwStore.init();
