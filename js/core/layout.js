/**
 * SIGNW — Layout (Header, Sidebar, Footer, Demo Bar)
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

  icon(name, size = 18) {
    return window.SignwIcons ? window.SignwIcons.render(name, { size }) : '';
  },

  renderPublicLayout() {
    const root = this.getRootPath();
    const user = window.SignwAuth ? window.SignwAuth.getCurrentUser() : null;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const ic = (n, s) => this.icon(n, s);

    const headerPlaceholder = document.getElementById('public-header') || document.querySelector('header');
    if (headerPlaceholder) {
      let authBtnHtml = '';
      if (user) {
        const dashUrl = window.SignwAuth.getDashboardUrl(user.role, root);
        authBtnHtml = `
          <a href="${dashUrl}" class="btn btn-primary btn-sm">Espace ${user.role}</a>
          <button class="btn btn-ghost btn-sm icon-btn" onclick="SignwAuth.logout()" title="Déconnexion">
            ${ic('log-out', 16)}
          </button>
        `;
      } else {
        authBtnHtml = `
          <a href="${root}login.html" class="btn btn-ghost btn-sm">Se connecter</a>
          <a href="${root}login.html?tab=register" class="btn btn-primary btn-sm">Créer un compte</a>
        `;
      }

      const hasHero = !!document.querySelector('.hero-section');
      headerPlaceholder.className = hasHero ? 'public-header header-transparent' : 'public-header';
      headerPlaceholder.innerHTML = `
        <div class="container header-inner">
          <a href="${root}index.html" class="nav-logo" title="Accueil signw">
            <img class="logo-on-light" src="${root}assets/img/logo-signw.svg" alt="signw">
            <img class="logo-on-dark" src="${root}assets/img/logo-signw-white.svg" alt="signw">
          </a>

          <ul class="public-nav-links" id="public-nav-menu">
            <li><a href="${root}secteurs.html" class="${currentPath === 'secteurs.html' ? 'active' : ''}">Secteurs</a></li>
            <li><a href="${root}marches.html" class="${currentPath.includes('marche') ? 'active' : ''}">Marchés</a></li>
            <li><a href="${root}annuaire.html" class="${currentPath === 'annuaire.html' ? 'active' : ''}">Annuaire</a></li>
            <li><a href="${root}comment-ca-marche.html" class="${currentPath === 'comment-ca-marche.html' ? 'active' : ''}">Méthode</a></li>
            <li><a href="${root}verifier.html" class="${currentPath === 'verifier.html' ? 'active' : ''}">Vérifier</a></li>
            <li><a href="${root}a-propos.html" class="${currentPath === 'a-propos.html' ? 'active' : ''}">À propos</a></li>
          </ul>

          <div class="public-header-actions">
            ${authBtnHtml}
            <button class="mobile-menu-btn" onclick="document.getElementById('public-nav-menu').classList.toggle('mobile-open')" aria-label="Menu">
              ${ic('menu', 22)}
            </button>
          </div>
        </div>
      `;

      if (hasHero) {
        this.bindTransparentHeader(headerPlaceholder);
      }
    }

    const footerPlaceholder = document.getElementById('public-footer') || document.querySelector('footer');
    if (footerPlaceholder) {
      footerPlaceholder.className = 'public-footer';
      footerPlaceholder.innerHTML = `
        <div class="container">
          <div class="footer-statement">
            <span class="footer-eyebrow">Tiers de confiance</span>
            <h2>Vérifiez avant&nbsp;de contracter.</h2>
            <p>Preuves auditées, score de confiance et certification — pour que chaque marché aille au bon acteur.</p>
          </div>

          <div class="footer-grid">
            <div class="footer-col footer-brand-col">
              <img src="${root}assets/img/logo-signw-white.svg" alt="signw" class="footer-logo">
              <p class="footer-tagline">Plateforme de certification pour les marchés publics et privés au Cameroun.</p>
              <div class="demo-reset-box">
                <span style="font-size: 0.75rem; color: rgba(232,223,226,0.5);">Démo</span>
                <button class="btn btn-sm" onclick="SignwStore.resetToSeed(true)">
                  ${ic('refresh', 14)} Réinitialiser
                </button>
              </div>
            </div>

            <div class="footer-col">
              <h5>Plateforme</h5>
              <ul class="footer-links">
                <li><a href="${root}secteurs.html">Secteurs</a></li>
                <li><a href="${root}marches.html">Marchés publics</a></li>
                <li><a href="${root}annuaire.html">Annuaire certifié</a></li>
                <li><a href="${root}verifier.html">Vérifier un certificat</a></li>
                <li><a href="${root}comment-ca-marche.html">Comment ça marche</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Espaces</h5>
              <ul class="footer-links">
                <li><a href="${root}login.html?role=agent">Agent</a></li>
                <li><a href="${root}login.html?role=principal">Maître d’ouvrage</a></li>
                <li><a href="${root}login.html?role=auditeur">Auditeur</a></li>
                <li><a href="${root}login.html?role=admin">Administration</a></li>
                <li><a href="${root}contact.html">Contact</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h5>Contact</h5>
              <div class="footer-contact-line">${ic('map-pin', 14)} <span>Douala — 45 Bd de la Liberté, Akwa</span></div>
              <div class="footer-contact-line">${ic('map-pin', 14)} <span>Yaoundé — Immeuble Émergence</span></div>
              <div class="footer-contact-line">${ic('mail', 14)} <span>contact@signw.cm</span></div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>© 2026 signw</div>
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <a href="${root}a-propos.html">Confidentialité</a>
              <a href="${root}contact.html">Nous contacter</a>
              <a href="#" onclick="SignwStore.resetToSeed(true); return false;">Réinitialiser démo</a>
            </div>
          </div>
        </div>
      `;
    }
  },

  renderAppShell() {
    const root = this.getRootPath();
    const user = window.SignwAuth.getCurrentUser();
    if (!user) return;

    const currentPath = window.location.pathname.split('/').pop();
    const role = user.role;
    const ic = (n, s) => this.icon(n, s);

    const menus = {
      agent: [
        { label: 'Tableau de bord', icon: 'dashboard', url: 'dashboard.html' },
        { label: 'Mes dossiers', icon: 'folder', url: 'mes-dossiers.html' },
        { label: 'Nouveau dossier', icon: 'plus', url: 'dossier.html' },
        { label: 'Mes certificats', icon: 'certificate', url: 'certificats.html' },
        { label: 'Marchés publics', icon: 'briefcase', url: `${root}marches.html` },
        { label: 'Messagerie', icon: 'mail', url: 'messages.html' },
        { label: 'Profil entreprise', icon: 'building', url: 'profil.html' }
      ],
      principal: [
        { label: 'Tableau de bord', icon: 'dashboard', url: 'dashboard.html' },
        { label: 'Mes projets', icon: 'clipboard', url: 'mes-projets.html' },
        { label: 'Nouveau projet', icon: 'plus', url: 'nouveau-projet.html' },
        { label: 'Adéquation', icon: 'match', url: 'adequation.html' },
        { label: 'Annuaire', icon: 'search', url: `${root}annuaire.html` },
        { label: 'Comparateur', icon: 'compare', url: 'comparateur.html' },
        { label: 'Favoris', icon: 'star', url: 'favoris.html' }
      ],
      auditeur: [
        { label: 'Tableau de bord', icon: 'dashboard', url: 'dashboard.html' },
        { label: 'File d’attente', icon: 'inbox', url: 'file-attente.html' },
        { label: 'Poste d’audit', icon: 'audit', url: 'audit.html' },
        { label: 'Historique', icon: 'history', url: 'historique.html' }
      ],
      admin: [
        { label: 'Tableau de bord', icon: 'dashboard', url: 'dashboard.html' },
        { label: 'Utilisateurs', icon: 'users', url: 'utilisateurs.html' },
        { label: 'Secteurs', icon: 'layers', url: 'secteurs.html' },
        { label: 'Formulaires', icon: 'settings', url: 'form-builder.html' },
        { label: 'Affectations', icon: 'clipboard', url: 'affectations.html' },
        { label: 'Certifications', icon: 'certificate', url: 'certifications.html' },
        { label: 'Paramètres', icon: 'score', url: 'parametres.html' },
        { label: 'Journal', icon: 'blog', url: 'journal.html' }
      ]
    };

    const roleMenu = menus[role] || [];

    const sidebarPlaceholder = document.getElementById('app-sidebar') || document.querySelector('.app-sidebar');
    if (sidebarPlaceholder) {
      const itemsHtml = roleMenu.map(item => {
        const isActive = currentPath === item.url.split('/').pop();
        return `
          <a href="${item.url}" class="sidebar-item ${isActive ? 'active' : ''}">
            ${ic(item.icon, 18)}
            <span>${item.label}</span>
          </a>
        `;
      }).join('');

      sidebarPlaceholder.innerHTML = `
        <div class="sidebar-header">
          <a href="${root}index.html" title="Site public">
            <img src="${root}assets/img/logo-signw.svg" alt="signw" class="sidebar-logo">
          </a>
          <span class="sidebar-role-badge">${role}</span>
        </div>
        <nav class="sidebar-nav">${itemsHtml}</nav>
        <div class="sidebar-footer">
          <div class="sidebar-user">
            <img src="${root}${user.avatar || 'assets/img/avatar-01.svg'}" alt="" class="sidebar-user-avatar">
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${user.nom}</div>
              <div class="sidebar-user-role">${user.email}</div>
            </div>
          </div>
          <button class="icon-btn" onclick="SignwAuth.logout()" title="Déconnexion">
            ${ic('log-out', 18)}
          </button>
        </div>
      `;
    }

    const appHeaderPlaceholder = document.getElementById('app-header') || document.querySelector('.app-header');
    if (appHeaderPlaceholder) {
      const notifs = window.SignwStore.getNotifications(user.id);
      const unreadCount = notifs.filter(n => !n.lue).length;

      appHeaderPlaceholder.innerHTML = `
        <div class="flex items-center gap-3">
          <button class="mobile-menu-btn" onclick="document.querySelector('.app-sidebar').classList.toggle('open')" aria-label="Menu">
            ${ic('menu', 22)}
          </button>
          <h1 style="margin: 0; font-size: 1.05rem; font-weight: 600;" id="app-page-title">${document.title.split('—')[0].trim()}</h1>
        </div>

        <div class="flex items-center gap-2">
          <div style="position: relative;">
            <button class="btn btn-secondary btn-icon" onclick="SignwLayout.toggleNotificationsDropdown()" title="Notifications">
              ${ic('bell', 18)}
              ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
            </button>
            <div id="notifs-dropdown" class="card" style="display: none; position: absolute; right: 0; top: 44px; width: 300px; z-index: 1000; padding: 12px;">
              <div class="flex justify-between items-center" style="margin-bottom: 8px;">
                <strong class="text-sm">Notifications</strong>
                <button class="btn-ghost btn-sm text-xs" onclick="SignwLayout.markAllNotifsRead('${user.id}')">Tout lu</button>
              </div>
              <div style="max-height: 220px; overflow-y: auto;">
                ${notifs.length === 0
                  ? '<p class="text-sm text-muted">Aucune notification.</p>'
                  : notifs.map(n => `
                    <div style="padding: 8px 0; border-bottom: 1px solid var(--ink-100); font-size: 0.8125rem; ${n.lue ? 'opacity: 0.65;' : 'font-weight: 600;'}">
                      <div>${n.texte}</div>
                      <small class="text-muted">${n.creeeLe}</small>
                    </div>
                  `).join('')}
              </div>
            </div>
          </div>

          <a href="${root}index.html" class="btn btn-ghost btn-sm" target="_blank" title="Site public">
            ${ic('external-link', 16)} Public
          </a>
          <button class="btn btn-ghost btn-sm" onclick="SignwStore.resetToSeed(true)" title="Réinitialiser la démo">
            ${ic('refresh', 16)} Reset
          </button>
        </div>
      `;
    }

    let quickBar = document.getElementById('demo-quick-switcher');
    if (!quickBar) {
      quickBar = document.createElement('div');
      quickBar.id = 'demo-quick-switcher';
      quickBar.className = 'demo-quick-bar';
      quickBar.innerHTML = `
        <div class="flex items-center gap-2">
          <span>Comptes démo</span>
        </div>
        <div class="demo-quick-pills">
          <button class="demo-pill-btn ${user.email === 'agent@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('agent@signw.demo')">Agent Or</button>
          <button class="demo-pill-btn ${user.email === 'agent2@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('agent2@signw.demo')">Agent 2</button>
          <button class="demo-pill-btn ${user.email === 'principal@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('principal@signw.demo')">Principal</button>
          <button class="demo-pill-btn ${user.email === 'auditeur@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('auditeur@signw.demo')">Auditeur</button>
          <button class="demo-pill-btn ${user.email === 'admin@signw.demo' ? 'active' : ''}" onclick="SignwAuth.loginAs('admin@signw.demo')">Admin</button>
        </div>
      `;
      const container = document.querySelector('.app-container');
      if (container) container.insertBefore(quickBar, container.firstChild);
    }
  },

  bindTransparentHeader(headerEl) {
    const onScroll = () => {
      if (window.scrollY > 24) headerEl.classList.add('is-scrolled');
      else headerEl.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  },

  toggleNotificationsDropdown() {
    const el = document.getElementById('notifs-dropdown');
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  },

  markAllNotifsRead(userId) {
    const notifs = window.SignwStore.getNotifications(userId);
    notifs.forEach(n => window.SignwStore.markNotificationAsRead(n.id));
    this.renderAppShell();
    if (window.SignwUI) window.SignwUI.showToast('Notifications marquées comme lues.', 'info');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.SignwLayout.init();
});
