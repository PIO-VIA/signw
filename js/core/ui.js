/**
 * SIGNW — Composants UI & Interactions (Toasts, Modales, Drawer, Gauges, Tabs)
 */

window.SignwUI = {
  /**
   * Affichage d'un toast informatif ou d'action
   */
  showToast(message, type = 'info', duration = 4500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span class="toast-icon" style="font-weight: 800; font-size: 1.1rem;">${iconMap[type] || 'ℹ'}</span>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
      <button type="button" class="btn-ghost btn-sm" style="padding: 2px 6px; font-size: 1rem; color: var(--ink-500);">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.onclick = () => {
      toast.remove();
    };

    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(100%)';
          toast.style.transition = 'all 0.25s ease';
          setTimeout(() => toast.remove(), 250);
        }
      }, duration);
    }
  },

  /**
   * Modales génériques
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Fermeture par touche Echap
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modalId);
        window.removeEventListener('keydown', handleKey);
      }
    };
    window.addEventListener('keydown', handleKey);
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  },

  confirm(title, message, onConfirm, confirmText = 'Confirmer', isDanger = false) {
    let confirmModal = document.getElementById('signw-confirm-modal');
    if (!confirmModal) {
      confirmModal = document.createElement('div');
      confirmModal.id = 'signw-confirm-modal';
      confirmModal.className = 'modal-overlay';
      confirmModal.innerHTML = `
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-header">
            <h4 id="confirm-modal-title" style="margin: 0; font-size: 1.15rem;"></h4>
            <button class="btn-ghost btn-sm" onclick="SignwUI.closeModal('signw-confirm-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <p id="confirm-modal-msg" style="color: var(--ink-700); font-size: 0.95rem;"></p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="SignwUI.closeModal('signw-confirm-modal')">Annuler</button>
            <button id="confirm-modal-action-btn" class="btn btn-sm"></button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);
    }

    document.getElementById('confirm-modal-title').textContent = title;
    document.getElementById('confirm-modal-msg').textContent = message;

    const actionBtn = document.getElementById('confirm-modal-action-btn');
    actionBtn.textContent = confirmText;
    actionBtn.className = `btn btn-sm ${isDanger ? 'btn-danger' : 'btn-primary'}`;
    actionBtn.onclick = () => {
      this.closeModal('signw-confirm-modal');
      if (onConfirm) onConfirm();
    };

    this.openModal('signw-confirm-modal');
  },

  /**
   * Lateral Drawer
   */
  openDrawer(drawerId) {
    const overlay = document.getElementById(drawerId);
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer(drawerId) {
    const overlay = document.getElementById(drawerId);
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  /**
   * Jauge de score circulaire SVG
   */
  renderScoreGauge(score = 0, size = 64) {
    const s = Math.min(100, Math.max(0, Math.round(score)));
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (s / 100) * circumference;

    let strokeColor = '#C0392B'; // Rouge
    if (s >= 85) strokeColor = '#1E8E5A'; // Vert
    else if (s >= 70) strokeColor = '#D99A1E'; // Or
    else if (s >= 55) strokeColor = '#2563EB'; // Bleu

    return `
      <div class="score-circle" style="width: ${size}px; height: ${size}px;" title="Score de confiance : ${s}/100">
        <svg width="${size}" height="${size}" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="${radius}" fill="none" stroke="#E5E7EB" stroke-width="5" />
          <circle cx="32" cy="32" r="${radius}" fill="none" stroke="${strokeColor}" stroke-width="5"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                  stroke-linecap="round" style="transition: stroke-dashoffset 0.6s ease;" />
        </svg>
        <div class="score-value" style="font-size: ${size * 0.28}px;">${s}</div>
      </div>
    `;
  },

  /**
   * Visualiseur des 5 piliers
   */
  renderPillarBars(piliers = {}, bareme = { admin: 20, fin: 25, tech: 25, ref: 20, rh: 10 }) {
    const pillarLabels = {
      admin: '1. Conformité administrative',
      fin: '2. Capacité financière',
      tech: '3. Capacité technique & matériel',
      ref: '4. Références & expérience',
      rh: '5. Ressources humaines'
    };

    return Object.keys(bareme).map(key => {
      const val = piliers[key] !== undefined ? piliers[key] : 75;
      const weight = bareme[key];
      return `
        <div class="pillar-bar-container">
          <div class="pillar-bar-header">
            <span>${pillarLabels[key] || key} <span class="text-muted text-xs">(${weight} pts)</span></span>
            <span class="font-bold">${val} %</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${val}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Initialisation des onglets data-tab
   */
  initTabs() {
    document.querySelectorAll('.tabs-nav').forEach(nav => {
      nav.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = btn.dataset.tab;
          nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const parent = nav.closest('.tab-container') || document;
          parent.querySelectorAll('.tab-pane').forEach(p => {
            if (p.id === target) {
              p.classList.remove('hidden');
            } else {
              p.classList.add('hidden');
            }
          });
        });
      });
    });
  },

  /**
   * Animation douce des compteurs numériques
   */
  animateCounters() {
    const elements = document.querySelectorAll('[data-counter]');
    elements.forEach(el => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      if (isNaN(target)) return;

      let start = 0;
      const duration = 1200;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          el.textContent = target.toLocaleString('fr-FR');
          clearInterval(timer);
        } else {
          el.textContent = Math.round(start).toLocaleString('fr-FR');
        }
      }, stepTime);
    });
  }
};

// Initialisation au DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.SignwUI.initTabs();
  window.SignwUI.animateCounters();
});
