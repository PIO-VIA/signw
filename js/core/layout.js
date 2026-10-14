/**
 * SIGNW — Gestionnaire de Layout Unique (Header, Sidebar, Footer, Demo Bar)
 * Injecté dynamiquement une seule fois pour garantir la cohérence
 */

window.SignwLayout = {
  init() {
    const isApp = window.location.pathname.includes('/app/');
    if (isApp) {
      this.renderAppShell();
    } else {
      this.renderPublicLayout();
    }
  },

  getRootPath() {
    return window.location.pathname.includes('/app/') ? '../../' : './';
  },

  /* =========================================================================
     ESPACE PUBLIC (Header + Footer)
     ========================================================================= */
  renderPublicLayout() {
    const root = this.getRootPath();
    const user = window.SignwAuth ? window.SignwAuth.getCurrentUser() : null;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Injecter le Header Public
    const headerPlaceholder = document.getElementById('public-header') || document.querySelector('header');
    if (headerPlaceholder) {
      let authBtnHtml = '';
      if (user) {
        const dashUrl = window.SignwAuth.getDashboardUrl(user.role, root);
        authBtnHtml = `
          <a href="${dashUrl}" class="btn btn-primary btn-sm">
            <span>Tableau de bord (${user.role.toUpperCase()})</span>
          </a>
          <button class="btn btn-ghost btn-sm" onclick="SignwAuth.logout()" title="Déconnexion">
            ✕ Quitter
          </button>
        `;
      } else {
        authBtnHtml = `
          <a href="${root}login.html" class="btn btn-ghost btn-sm">Se connecter</a>
          <a href="${root}login.html?tab=register" class="btn btn-primary btn-sm">Créer un compte</a>
        `;
      }

      headerPlaceholder.className = 'public-header';
      headerPlaceholder.innerHTML = `
        <div class="container header-inner">
          <a href="${root}index.html" class="nav-logo" title="Accueil signw">
            <img src="${root}assets/img/logo-signw.svg" alt="signw logo">
          </a>

          <ul class="public-nav-links" id="public-nav-menu">
            <li><a href="${root}secteurs.html" class="${currentPath === 'secteurs.html' ? 'active' : ''}">Secteurs</a></li>
            <li><a href="${root}marches.html" class="${currentPath.includes('marche') ? 'active' : ''}">Marchés publics</a></li>
            <li><a href="${root}annuaire.html" class="${currentPath === 'annuaire.html' ? 'active' : ''}">Annuaire certifié</a></li>
            <li><a href="${root}comment-ca-marche.html" class="${currentPath === 'comment-ca-marche.html' ? 'active' : ''}">Comment ça marche</a></li>
            <li><a href="${root}verifier.html" class="${currentPath === 'verifier.html' ? 'active' : ''}">Vérifier certificat</a></li>
            <li><a href="${root}a-propos.html" class="${currentPath === 'a-propos.html' ? 'active' : ''}">À propos</a></li>
          </ul>

          <div class="public-header-actions">
            ${authBtnHtml}
            <button class="mobile-menu-btn" onclick="document.getElementById('public-nav-menu').classList.toggle('mobile-open')" aria-label="Menu mobile">
              ☰
            </button>
          </div>
        </div>
      `;
    }

    // 2. Injecter le Footer Public
    const footerPlaceholder = document.getElementById('public-footer') || document.querySelector('footer');
    if (footerPlaceholder) {
      footerPlaceholder.className = 'public-footer';
      footerPlaceholder.innerHTML = `
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <img src="${root}assets/img/logo-signw-white.svg" alt="signw" style="height: 38px; margin-bottom: 16px;">
              <p style="color: #D3C3C8; font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">
                Tiers de confiance indépendant pour les marchés publics et privés au Cameroun.
                Nous transformons les déclarations en preuves vérifiées pour garantir la bonne attribution des marchés.
              </p>
              <div class="demo-reset-box">
                <span style="font-size: 0.8125rem; color: var(--gold-100);">Démo interactive :</span>
                <button class="btn btn-gold btn-sm" onclick="SignwStore.resetToSeed(true)" style="padding: 4px 10px; font-size: 0.75rem;">
                  ↻ Réinitialiser la démo
                </button>
              </div>
            </div>

            <div class="footer-col">
              <h5>Plateforme</h5>
              <ul class="footer-links">
                <li><a href="${root}secteurs.html">Secteurs couverts</a></li>
                <li><a href="${root}marches.html">Marchés publics & appels d'offres</a></li>
                <li><a href="${root}annuaire.html">Annuaire des agents certifiés</a></li>
                <li><a href="${root}verifier.html">Vérification de certificat (Code SGW)</a></li>
                <li><a href="${root}comment-ca-marche.html">Méthodologie & Audit humain</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Espaces Pro</h5>
              <ul class="footer-links">
                <li><a href="${root}login.html?role=agent">Espace Agent (Entreprises)</a></li>
                <li><a href="${root}login.html?role=principal">Espace Principal (Maîtres d’ouvrage)</a></li>
                <li><a href="${root}login.html?role=auditeur">Poste Auditeur</a></li>
                <li><a href="${root}login.html?role=admin">Administration signw</a></li>
                <li><a href="${root}a-propos.html">Principes économiques (Stiglitz, Spence)</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Bureaux & Contact</h5>
              <p style="color: #D3C3C8; font-size: 0.875rem; margin-bottom: 8px;">
                📍 <strong>Douala :</strong> 45 Boulevard de la Liberté, Akwa<br>
                📍 <strong>Yaoundé :</strong> Immeuble Émergence, Centre Administratif
              </p>
              <p style="color: #D3C3C8; font-size: 0.875rem; margin-bottom: 16px;">
                📞 +237 233 42 00 00 • ✉ contact@signw.cm
              </p>
              <div style="display: flex; gap: 8px;">
                <input type="email" placeholder="Votre email pour la veille" class="form-control" style="font-size: 0.8125rem; padding: 6px 10px; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: #fff;">
                <button class="btn btn-gold btn-sm" onclick="SignwUI.showToast('Inscription à la veille enregistrée !', 'success')">OK</button>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>© 2026 signw. Plateforme Tiers de Confiance. Tous droits réservés.</div>
            <div style="display: flex; gap: 20px;">
              <a href="${root}a-propos.html">Confidentialité & Données</a>
              <a href="${root}contact.html">Nous contacter</a>
              <a href="#" onclick="SignwStore.resetToSeed(true); return false;" style="color: var(--gold-500);">Réinitialiser démo</a>
            </div>
          </div>
        </div>
      `;
    }
  },

  /* =========================================================================
     ESPACE PRIVÉ APP (Sidebar + App Header + Fast Demo Bar)
     ========================================================================= */
  renderAppShell() {
    const root = this.getRootPath();
    const user = window.SignwAuth.getCurrentUser();
    if (!user) return; // Le route guard redirigera

    const currentPath = window.location.pathname.split('/').pop();
    const role = user.role;

    // Définition des menus par rôle
    const menus = {
      agent: [
        { label: 'Tableau de bord', icon: '📊', url: 'dashboard.html' },
        { label: 'Mes dossiers', icon: '📁', url: 'mes-dossiers.html' },
        { label: 'Nouveau dossier', icon: '➕', url: 'dossier.html' },
        { label: 'Mes certificats', icon: '🏆', url: 'certificats.html' },
        { label: 'Marchés publics', icon: '🏛️', url: `${root}marches.html` },
        { label: 'Messagerie', icon: '💬', url: 'messages.html' },
        { label: 'Profil entreprise', icon: '🏢', url: 'profil.html' }
      ],
      principal: [
        { label: 'Tableau de bord', icon: '📊', url: 'dashboard.html' },
        { label: 'Mes projets / marchés', icon: '📑', url: 'mes-projets.html' },
        { label: 'Nouveau projet', icon: '➕', url: 'nouveau-projet.html' },
        { label: 'Simulateur adéquation', icon: '⚡', url: 'adequation.html' },
        { label: 'Annuaire certifié', icon: '🔍', url: `${root}annuaire.html` },
        { label: 'Comparateur agents', icon: '⚖️', url: 'comparateur.html' },
        { label: 'Mes favoris', icon: '⭐', url: 'favoris.html' }
      ],
      auditeur: [
        { label: 'Tableau de bord', icon: '📊', url: 'dashboard.html' },
        { label: 'File d’attente', icon: '⏳', url: 'file-attente.html' },
        { label: 'Poste de vérification', icon: '🔎', url: 'audit.html' },
        { label: 'Historique des audits', icon: '📜', url: 'historique.html' }
      ],
      admin: [
        { label: 'Tableau de bord', icon: '📊', url: 'dashboard.html' },
        { label: 'Utilisateurs', icon: '👥', url: 'utilisateurs.html' },
        { label: 'Secteurs d’activité', icon: '🏗️', url: 'secteurs.html' },
        { label: 'Constructeur formulaires', icon: '⚙️', url: 'form-builder.html' },
        { label: 'Affectation dossiers', icon: '🎯', url: 'affectations.html' },
        { label: 'Certifications & Décisions', icon: '🏅', url: 'certifications.html' },
        { label: 'Paramètres & Barème', icon: '🎛️', url: 'parametres.html' },
        { label: 'Journal d’audit', icon: '📋', url: 'journal.html' }
      ]
    };

    const roleMenu = menus[role] || [];

    // 1. Injecter la Sidebar
    const sidebarPlaceholder = document.getElementById('app-sidebar') || document.querySelector('.app-sidebar');
    if (sidebarPlaceholder) {
      const itemsHtml = roleMenu.map(item => {
        const isActive = currentPath === item.url.split('/').pop();
        return `
          <a href="${item.url}" class="sidebar-item ${isActive ? 'active' : ''}">
            <span style="font-size: 1.1rem; width: 22px; text-align: center;">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `;
      }).join('');

      sidebarPlaceholder.innerHTML = `
        <div class="sidebar-header">
          <a href="${root}index.html" title="Retour au site public">
            <img src="${root}assets/img/logo-signw-white.svg" alt="signw" class="sidebar-logo">
          </a>
          <span class="sidebar-role-badge">${role}</span>
        </div>

        <nav class="sidebar-nav">
          ${itemsHtml}
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-user">
            <img src="${root}${user.avatar || 'assets/img/avatar-01.svg'}" alt="${user.nom}" class="sidebar-user-avatar">
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${user.nom}</div>
              <div class="sidebar-user-role">${user.email}</div>
            </div>
          </div>
          <button class="btn-ghost btn-sm" onclick="SignwAuth.logout()" title="Déconnexion" style="color: #fff; padding: 4px;">
            🚪
          </button>
        </div>
      `;
    }

    // 2. Injecter la Barre de Démo Rapide & App Header
    const appHeaderPlaceholder = document.getElementById('app-header') || document.querySelector('.app-header');
    if (appHeaderPlaceholder) {
      const notifs = window.SignwStore.getNotifications(user.id);
      const unreadCount = notifs.filter(n => !n.lue).length;

      appHeaderPlaceholder.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="mobile-menu-btn" onclick="document.querySelector('.app-sidebar').classList.toggle('open')">☰</button>
          <h3 style="margin: 0; font-size: 1.15rem;" id="app-page-title">${document.title.split('—')[0].trim()}</h3>
        </div>

        <div style="display: flex; align-items: center; gap: 14px;">
          <!-- Cloche Notifications -->
          <div style="position: relative;">
            <button class="btn btn-secondary btn-icon" onclick="SignwLayout.toggleNotificationsDropdown()" title="Notifications">
              🔔
              ${unreadCount > 0 ? `<span style="position: absolute; top: -3px; right: -3px; background: var(--danger); color: #fff; font-size: 0.65rem; font-weight: 800; padding: 2px 5px; border-radius: 99px;">${unreadCount}</span>` : ''}
            </button>
            <div id="notifs-dropdown" class="card" style="display: none; position: absolute; right: 0; top: 48px; width: 320px; z-index: 1000; box-shadow: var(--shadow-xl); padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong>Notifications (${unreadCount})</strong>
                <button class="btn-ghost btn-sm text-xs" onclick="SignwLayout.markAllNotifsRead('${user.id}')">Tout marquer lu</button>
              </div>
              <div style="max-height: 240px; overflow-y: auto;">
                ${notifs.length === 0 ? '<p class="text-sm text-muted">Aucune notification.</p>' : notifs.map(n => `
                  <div style="padding: 8px; border-bottom: 1px solid var(--ink-100); font-size: 0.8125rem; ${n.lue ? 'opacity: 0.6;' : 'font-weight: 600;'}">
                    <div>${n.texte}</div>
                    <small class="text-muted">${n.creeeLe}</small>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Lien vers le site public -->
          <a href="${root}index.html" class="btn btn-secondary btn-sm" target="_blank" title="Ouvrir le portail public dans un nouvel onglet">
            🌐 Vue publique ↗
          </a>

          <button class="btn btn-ghost btn-sm" onclick="SignwStore.resetToSeed(true)" title="Réinitialiser toutes les données de test">
            ↻ Reset Démo
          </button>
        </div>
      `;
    }

    // 3. Injecter le bandeau "Comptes de Démo rapides" en haut de la page
    let quickBar = document.getElementById('demo-quick-switcher');
    if (!quickBar) {
      quickBar = document.createElement('div');
      quickBar.id = 'demo-quick-switcher';
      quickBar.className = 'demo-quick-bar';
      quickBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong>⚡ Démo 1-clic :</strong>
          <span class="text-muted">Changer de rôle instantanément :</span>
        </div>
        <div class="demo-quick-pills">
          <button class="demo-pill-btn ${user.email === 'agent@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('agent@signw.demo')">Agent Or (BâtiPlus)</button>
          <button class="demo-pill-btn ${user.email === 'agent2@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('agent2@signw.demo')">Agent 2 (Incomplet)</button>
          <button class="demo-pill-btn ${user.email === 'principal@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('principal@signw.demo')">Principal (Mairie Bafoussam)</button>
          <button class="demo-pill-btn ${user.email === 'auditeur@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('auditeur@signw.demo')">Auditeur (A. Nkoulou)</button>
          <button class="demo-pill-btn ${user.email === 'admin@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('admin@signw.demo')">Admin signw</button>
        </div>
      `;
      const container = document.querySelector('.app-container');
      if (container) {
        container.insertBefore(quickBar, container.firstChild);
      }
    }
  },

  toggleNotificationsDropdown() {
    const el = document.getElementById('notifs-dropdown');
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  },

  markAllNotifsRead(userId) {
    const notifs = window.SignwStore.getNotifications(userId);
    notifs.forEach(n => window.SignwStore.markNotificationAsRead(n.id));
    this.renderAppShell();
    if (window.SignwUI) window.SignwUI.showToast('Toutes les notifications sont marquées comme lues.', 'info');
  }
};

// Initialisation automatique après chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  window.SignwLayout.init();
});
