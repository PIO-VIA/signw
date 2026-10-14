/**
 * SIGNW — Authentification simulée et Garde de routes
 */

window.SignwAuth = {
  SESSION_KEY: 'signw_session',

  getCurrentUser() {
    try {
      const sess = localStorage.getItem(this.SESSION_KEY);
      if (!sess) return null;
      const user = JSON.parse(sess);
      // Synchroniser avec les données à jour du store si possible
      if (window.SignwStore && user && user.id) {
        const fresh = window.SignwStore.getUserById(user.id);
        return fresh || user;
      }
      return user;
    } catch (e) {
      console.warn('Erreur session:', e);
      return null;
    }
  },

  login(email, password, role) {
    if (!window.SignwStore) return { success: false, message: 'Store non initialisé' };
    const user = window.SignwStore.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Identifiants inconnus. Vérifiez votre email.' };
    }
    if (user.motDePasse && user.motDePasse !== password) {
      return { success: false, message: 'Mot de passe incorrect.' };
    }
    if (role && user.role !== role) {
      return { success: false, message: `Ce compte n'a pas le rôle ${role}.` };
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('signw:auth_changed', { detail: user }));
    return { success: true, user };
  },

  loginAs(email) {
    const res = this.login(email, 'demo1234');
    if (res.success) {
      const root = this.getRootPath();
      const redirectUrl = this.getDashboardUrl(res.user.role, root);
      window.location.href = redirectUrl;
    } else {
      alert(res.message);
    }
    return res;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.dispatchEvent(new CustomEvent('signw:auth_changed', { detail: null }));
    const root = this.getRootPath();
    window.location.href = `${root}login.html`;
  },

  getDashboardUrl(role, root = '') {
    switch (role) {
      case 'agent':
        return `${root}app/agent/dashboard.html`;
      case 'principal':
        return `${root}app/principal/dashboard.html`;
      case 'auditeur':
        return `${root}app/auditeur/dashboard.html`;
      case 'admin':
        return `${root}app/admin/dashboard.html`;
      default:
        return `${root}index.html`;
    }
  },

  getRootPath() {
    const path = window.location.pathname;
    if (path.includes('/app/')) {
      return '../../';
    }
    return './';
  },

  /**
   * Garde de route à appeler dans les pages privées /app/*
   */
  requireAuth(allowedRoles = []) {
    const user = this.getCurrentUser();
    const root = this.getRootPath();

    if (!user) {
      const current = encodeURIComponent(window.location.href);
      window.location.href = `${root}login.html?redirect=${current}&msg=auth_required`;
      return false;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      alert(`Accès restreint : cette page est réservée au profil ${allowedRoles.join(' / ')}.`);
      window.location.href = this.getDashboardUrl(user.role, root);
      return false;
    }

    return true;
  }
};
