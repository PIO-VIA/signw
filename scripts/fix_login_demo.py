from pathlib import Path
import re

path = Path(__file__).resolve().parent.parent / "login.html"
text = path.read_text(encoding="utf-8")

new_demo = """ <!-- Bandeau Démo -->
 <div class="card" style="background: var(--ink-50); border: 1px solid var(--ink-200); padding: 16px; margin-bottom: 20px;">
 <strong class="text-sm" style="color: var(--ink-900);">Comptes de démonstration</strong>
 <p class="text-xs text-muted" style="margin: 4px 0 10px;">Un clic pour tester chaque rôle (mot de passe : demo1234).</p>
 <div class="auth-demo-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
 <button type="button" class="btn btn-secondary btn-sm" onclick="SignwAuth.loginAs('agent@signw.demo')">Agent Or</button>
 <button type="button" class="btn btn-secondary btn-sm" onclick="SignwAuth.loginAs('agent2@signw.demo')">Agent 2</button>
 <button type="button" class="btn btn-secondary btn-sm" onclick="SignwAuth.loginAs('principal@signw.demo')">Principal</button>
 <button type="button" class="btn btn-secondary btn-sm" onclick="SignwAuth.loginAs('auditeur@signw.demo')">Auditeur</button>
 </div>
 <div style="margin-top: 8px;">
 <button type="button" class="btn btn-ghost btn-sm text-xs" onclick="SignwAuth.loginAs('admin@signw.demo')" style="color: var(--brand-700);">Administrateur</button>
 </div>
 </div>
"""

pattern = re.compile(
    r" <!-- Bandeau Démo.*?<!-- Carte d'Authentification -->",
    re.DOTALL,
)
text2, n = pattern.subn(new_demo + "\n <!-- Carte d'Authentification -->", text, count=1)
if n != 1:
    raise SystemExit(f"replace failed: {n}")
path.write_text(text2, encoding="utf-8")
print("login demo ok")

# Agent dashboard alerts
dash = Path(__file__).resolve().parent.parent / "app" / "agent" / "dashboard.html"
t = dash.read_text(encoding="utf-8")
t = t.replace(
    """ <div style="display: flex; gap: 16px; align-items: center;">
 <span style="font-size: 2.2rem;"></span>
 <div>
 <h4 style="color: #9A5B00; margin: 0 0 4px;">Pièce complémentaire demandée par l’auditeur</h4>""",
    """ <div class="flex gap-3 items-start">
 <div>
 <h4 style="color: #7A4E00; margin: 0 0 4px; font-size: 1rem;">Pièce complémentaire demandée</h4>""",
)
t = t.replace('border: 1.5px solid var(--brand-500)', 'border: 1px solid var(--brand-100)')
t = t.replace('border: 1.5px solid var(--success)', 'border: 1px solid #B7E0C8')
t = t.replace(
    """ <div style="display: flex; gap: 12px; align-items: center;">
 <span style="font-size: 1.8rem;"></span>
 <div>
 <h4 style="color: var(--success); margin: 0 0 4px;">Votre certification ${agent.niveau} est active !</h4>""",
    """ <div>
 <h4 style="color: var(--success); margin: 0 0 4px; font-size: 1rem;">Certification ${agent.niveau} active</h4>""",
)
dash.write_text(t, encoding="utf-8")
print("agent dash ok")

# Admin dashboard header
admin = Path(__file__).resolve().parent.parent / "app" / "admin" / "dashboard.html"
a = admin.read_text(encoding="utf-8")
a = a.replace(
    """ <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
 <div>
 <h2 style="margin: 0 0 4px;">Tableau de Bord Administrateur</h2>
 <span class="text-muted text-sm">Supervision globale, décisions de certification et intégrité de la plateforme</span>
 </div>
 <div style="display: flex; gap: 10px;">
 <a href="certifications.html" class="btn btn-primary btn-sm"> Décisions en attente</a>
 <a href="form-builder.html" class="btn btn-primary btn-sm"> Constructeur de formulaires</a>
 </div>
 </div>""",
    """ <div class="page-header">
 <div>
 <h2>Administration</h2>
 <p>Supervision, décisions de certification et intégrité</p>
 </div>
 <div class="page-header-actions">
 <a href="certifications.html" class="btn btn-primary btn-sm">Décisions en attente</a>
 <a href="form-builder.html" class="btn btn-secondary btn-sm">Formulaires</a>
 </div>
 </div>""",
)
a = a.replace('class="grid grid-cols-4 gap-6" style="margin-bottom: 32px;"', 'class="kpi-strip"')
admin.write_text(a, encoding="utf-8")
print("admin dash ok")
