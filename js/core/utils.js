/**
 * SIGNW — Utilitaires communs (Formatage, IDs, Dates, Badges)
 */

window.SignwUtils = {
  /**
   * Formatage monétaire complet en FCFA : 480 000 000 FCFA
   */
  formatFCFA(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '0 FCFA';
    const num = Math.round(Number(amount));
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
  },

  /**
   * Formatage monétaire abrégé : "480 M FCFA" ou "2,4 Md FCFA"
   */
  formatFCFAShort(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return '0 FCFA';
    const val = Number(amount);
    if (val >= 1000000000) {
      const b = (val / 1000000000).toFixed(1).replace('.', ',');
      return `${b} Md FCFA`;
    }
    if (val >= 1000000) {
      const m = Math.round(val / 1000000);
      return `${m} M FCFA`;
    }
    return this.formatFCFA(amount);
  },

  /**
   * Formatage date en français : "14 octobre 2026"
   */
  formatDateFR(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  },

  /**
   * Formatage date & heure : "14 oct. 2026 à 14:32"
   */
  formatDateTimeFR(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const datePart = d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const timePart = d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${datePart} à ${timePart}`;
    } catch (e) {
      return dateStr;
    }
  },

  /**
   * Génération d'ID aléatoire préfixé : 'dos_...'
   */
  generateId(prefix = 'id') {
    const rand = Math.random().toString(36).substring(2, 8);
    const ts = Date.now().toString(36).slice(-4);
    return `${prefix}_${ts}${rand}`;
  },

  /**
   * Debounce d'une fonction
   */
  debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Rendu du badge de statut d'un dossier selon 6.3
   */
  getStatusBadge(statut) {
    const s = statut || 'brouillon';
    const map = {
      'brouillon': { label: 'Brouillon', class: 'badge-brouillon', icon: 'edit-3' },
      'soumis': { label: 'Soumis', class: 'badge-soumis', icon: 'send' },
      'en_verification': { label: 'En vérification', class: 'badge-en_verification', icon: 'clock' },
      'pieces_incompletes': { label: 'Pièces incomplètes', class: 'badge-pieces_incompletes', icon: 'alert-triangle' },
      'audit_terrain_planifie': { label: 'Audit terrain planifié', class: 'badge-audit_terrain_planifie', icon: 'map-pin' },
      'en_decision': { label: 'En décision', class: 'badge-en_decision', icon: 'eye' },
      'certifie': { label: 'Certifié', class: 'badge-certifie', icon: 'check-circle' },
      'certifie_avec_reserves': { label: 'Certifié avec réserves', class: 'badge-certifie_avec_reserves', icon: 'shield-alert' },
      'rejete': { label: 'Rejeté', class: 'badge-rejete', icon: 'x-circle' },
      'expire': { label: 'Expiré', class: 'badge-expire', icon: 'slash' },
      'suspendu': { label: 'Suspendu', class: 'badge-suspendu', icon: 'pause-circle' },
      'revoque': { label: 'Révoqué', class: 'badge-revoque', icon: 'alert-octagon' }
    };

    const info = map[s] || { label: s, class: 'badge-brouillon', icon: 'help-circle' };
    return `<span class="badge ${info.class}" data-status="${s}">
      <span class="badge-dot">●</span>
      ${info.label}
    </span>`;
  },

  /**
   * Rendu du badge de niveau (Or, Argent, Bronze, Avec réserves)
   */
  getTierBadge(niveau) {
    if (!niveau) return '';
    const n = String(niveau).toLowerCase();
    if (n.includes('or')) {
      return `<span class="badge badge-tier-gold">★ NIVEAU OR</span>`;
    }
    if (n.includes('argent')) {
      return `<span class="badge badge-tier-silver">★ NIVEAU ARGENT</span>`;
    }
    if (n.includes('bronze')) {
      return `<span class="badge badge-tier-bronze">★ NIVEAU BRONZE</span>`;
    }
    if (n.includes('réserve') || n.includes('reserve')) {
      return `<span class="badge badge-certifie_avec_reserves">⚠ AVEC RÉSERVES</span>`;
    }
    return `<span class="badge badge-brouillon">${niveau}</span>`;
  },

  generateTierBadge(niveau) {
    return this.getTierBadge(niveau);
  },

  /**
   * Échappement HTML sécurisé
   */
  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};
