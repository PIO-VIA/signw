# SIGNW — Prototype Web Interactif

> **Tiers de Confiance Indépendant pour les Marchés Publics et Privés au Cameroun**

- **Version** : `1.0.0`
- **Date** : Octobre 2026
- **Auteur** : Équipe signw
- **Technologie** : 100% Hors-Ligne (*HTML5, CSS3 pur avec Design Tokens, Vanilla JavaScript ES2020+*)
- **Dépendances** : Aucune dépendance externe ni npm requise.

---

## 1. Comment ouvrir et exécuter le projet

Le prototype est conçu pour fonctionner **directement depuis le système de fichiers** sans aucun serveur web ni compilation.

### Méthode 1 : Ouverture directe (Recommandée)
Double-cliquez simplement sur le fichier `index.html` à la racine du projet pour l'ouvrir dans un navigateur moderne (*Google Chrome, Firefox, Safari, Microsoft Edge*).  
L'URL dans votre barre d'adresse sera :
```
file:///.../signw/index.html
```

### Méthode 2 : Serveur HTTP local léger (Optionnel)
Si vous préférez exécuter un serveur local :
```bash
python3 -m http.server 8080
# ou
npx serve .
```
Puis accédez à [http://localhost:8080](http://localhost:8080).

> [!NOTE]
> **Stockage hors-ligne & 0 erreur CORS :**  
> Toutes les données de la plateforme sont stockées dans le `localStorage` du navigateur sous la clé `signw_db_v1`. Aucune requête `fetch()` de fichiers JSON locaux n'est effectuée, garantissant une compatibilité totale avec le protocole `file://`.  
> Pour réinitialiser le jeu de données à l'état initial, cliquez sur le bouton **« ↻ Réinitialiser la démo »** situé dans le pied de page ou dans le sélecteur rapide.

---

## 2. Comptes de démonstration

Tous les comptes utilisent le mot de passe unique : `demo1234`  
Une barre de connexion rapide (*Quick Switcher*) présente en haut de chaque page permet également de basculer instantanément d'un compte à l'autre en un clic.

| Rôle | Identifiant (Email) | Entité / Nom | Détails & Usage Démo |
| :--- | :--- | :--- | :--- |
| **Agent Titulaire** | `agent@signw.demo` | **BâtiPlus Cameroun SARL** (Douala) | **Score 91/100 (Niveau Or)** — Certificat `SGW-2026-00001`, consultation de chantiers vérifiés, postulation aux appels d'offres. |
| **Agent Candidat** | `agent2@signw.demo` | **Sahel Travaux & Routes** (Garoua) | **Dossier à corriger** — Statut « Pièces incomplètes » (rejet attestation non-faillite), démo de resoumission de justificatif. |
| **Auditeur Technique** | `auditeur@signw.demo` | **Alain Nkoulou** (Yaoundé) | **Instruction contradictoire** — Poste d'audit 3 volets, visionneuse de pièces, calcul de score en direct, formulation d'avis. |
| **Auditeur 2** | `auditeur2@signw.demo` | **Serge Fotso** (Bafoussam) | Poste d'audit secondaire et répartition de charge d'inspection. |
| **Super Administrateur** | `admin@signw.demo` | **Direction Générale signw** | **Validation collégiale (4 yeux)** — Délivrance des certificats SGW, form-builder, gestion des secteurs, journal inaltérable. |
| **Maître d'Ouvrage** | `principal@signw.demo` | **Mairie de Bafoussam** | **Acheteur public** — Publication de marchés, simulateur intelligent d'adéquation budget/capacités, comparateur. |

---

## 3. Structure de l'arborescence du projet

```
signw/
│
├── index.html                  Page d'accueil publique (Hero, Secteurs, Asymétrie, Sceau)
├── login.html                  Page de connexion avec sélecteur 1-clic par rôle
├── secteurs.html               Vitrine publique des secteurs économiques
├── marches.html                Portail des marchés publics & appels d'offres
├── marche-detail.html          Fiche détaillée d'un appel d'offres (ex: DAO Bafoussam)
├── annuaire.html               Annuaire public certifié avec recherche à facettes
├── agent-profil.html           Fiche publique d'un agent certifié (Score & Justificatifs)
├── verifier.html               Vérification publique immédiate par code SGW-...
├── comment-ca-marche.html      Méthodologie, 5 piliers de score, audit contradictoire
├── a-propos.html               Vision, fondements économiques (Stiglitz, Akerlof, Spence)
├── contact.html                Formulaire de contact & coordonnées Douala / Yaoundé
├── favicon.png                 Favicon signw
├── README.md                   Documentation officielle du projet
│
├── app/                        Espaces connectés réservés
│   ├── agent/                  PORTAIL CANDIDAT / ENTREPRISE
│   │   ├── dashboard.html      Tableau de bord de l'entreprise
│   │   ├── dossier.html        Remplissage dynamique du dossier & téléversement
│   │   ├── mes-dossiers.html   Historique de ses candidatures & suivi SLA
│   │   ├── certificats.html    Certificat officiel imprimable (Sceau & Filigrane)
│   │   ├── messages.html       Messagerie sécurisée avec l'auditeur
│   │   └── profil.html         Coordonnées, RCCM, NIU et références de chantier
│   │
│   ├── principal/              PORTAIL MAÎTRE D'OUVRAGE
│   │   ├── dashboard.html      Supervision des marchés lancés et alertes
│   │   ├── mes-projets.html    Liste de ses appels d'offres
│   │   ├── nouveau-projet.html Publication d'un nouveau projet (Budget FCFA)
│   │   ├── adequation.html     Simulateur intelligent d'adéquation Budget / Capacité
│   │   ├── comparateur.html    Comparateur multi-critères côte-à-côte (2 à 3 agents)
│   │   └── favoris.html        Sélection d'entreprises présélectionnées
│   │
│   ├── auditeur/               PORTAIL AUDITEUR TECHNIQUE
│   │   ├── dashboard.html      File d'attente, charge et alertes SLA
│   │   ├── file-attente.html   Dossiers à instruire
│   │   ├── audit.html          Poste de travail 3 zones (pièces, visionneuse, score live)
│   │   └── historique.html     Archives des audits instruits
│   │
│   └── admin/                  PORTAIL ADMINISTRATION GÉNÉRALE
│       ├── dashboard.html      KPIs, entonnoir de conversion, répartition sectorielle
│       ├── utilisateurs.html   Gestion des comptes, création d'auditeurs
│       ├── secteurs.html       Gestion des secteurs d'activité
│       ├── form-builder.html   Constructeur visuel de formulaires par secteur
│       ├── affectations.html   Affectation des dossiers aux auditeurs & charge
│       ├── certifications.html Registre officiel & validation des décisions (4 yeux)
│       ├── parametres.html     Barème des 5 piliers (somme 100%), seuils Or/Argent/Bronze
│       └── journal.html        Journal d'audit inaltérable avec export CSV
│
├── css/
│   ├── tokens.css              Charte graphique, couleurs (Bordeaux & Or), espacements
│   ├── base.css                Reset CSS, typographie Inter, media print certificat
│   ├── components.css          Boutons, badges, modales, jauges de score, cartes
│   ├── layout.css              Header public, sidebar responsive 264px, quick demo bar
│   └── pages.css               Styles des postes d'audit, builder et certificats
│
├── js/
│   ├── data/
│   │   └── seed.js             Jeu de données initial complet (agents, projets, secteurs)
│   ├── core/
│   │   ├── utils.js            Formatage FCFA, dates FR, identifiants, badges de statut
│   │   ├── store.js            Magasin localStorage, CRUD, machine à états
│   │   ├── auth.js             Comptes démo, gestion de session et route guard
│   │   ├── score.js            Algorithme 5 piliers et moteur d'adéquation projet
│   │   ├── ui.js               Toasts, modales, drawer, jauges SVG animées
│   │   ├── layout.js           Injection automatique du header, footer et sidebar
│   │   ├── formrender.js       Génération dynamique de formulaire à partir du JSON
│   │   └── formbuilder.js      Constructeur visuel de formulaires de qualification
│   └── pages/                  Logique spécifique par écran
│
├── docs/
│   └── signw_prototype_spec.txt Spécification fonctionnelle et technique complète
│
├── scripts/
│   └── generate_seed.py        Générateur du jeu de données seed.js
│
└── assets/
    ├── img/                    Visuels optimisés, arrière-plans, photos de chantiers
    └── icons/                  Logos vectoriels SVG, sceau officiel signw, QR codes
```

---

## 4. Script de démonstration pas-à-pas (5 minutes)

Suivez ce parcours complet pour expérimenter toute la chaîne de valeur de la confiance :

### Étape 1 : Visiteur (Compréhension & Découverte)
1. Ouvrez `index.html`.
2. Découvrez l'explication visuelle de l'asymétrie d'information *(Nobels Stiglitz / Akerlof)*.
3. Cliquez sur **« Consulter l'annuaire certifié »** : filtrez sur le secteur BTP et le niveau Or.
4. Ouvrez la fiche de **« BâtiPlus Cameroun SARL »**. Observez les 5 piliers de score détaillés.
5. Cliquez sur **« Vérifier certificat »** dans la barre de navigation : saisissez `SGW-2026-00001` pour constater l'attestation publique de validité en temps réel.

### Étape 2 : Agent (Resoumission d'une pièce corrigée)
1. Rendez-vous sur `login.html` et cliquez sur **« Connexion Sahel Travaux »** (`agent2@signw.demo`).
2. Sur le tableau de bord, visualisez le bandeau d'alerte :  
   *« Pièces incomplètes : 1 pièce nécessite votre attention »*.
3. Cliquez sur **« Corriger mon dossier »** (`dossier.html`).
4. Repérez la section avec l'alerte sur l'attestation de non-faillite (rejetée par l'auditeur).
5. Téléversez une nouvelle pièce conforme via le formulaire.
6. Cliquez sur **« Resoumettre le dossier »**.
7. Le statut passe immédiatement à **« En vérification »** et l'historique du dossier est horodaté.

### Étape 3 : Auditeur (Instruction contradictoire & Avis final)
1. Basculez sur le compte Auditeur (`auditeur@signw.demo`).
2. Rendez-vous sur le **« Poste de vérification »** (`audit.html`).
3. Sélectionnez le dossier de **« Sahel Travaux & Routes »**.
4. Examinez la pièce dans la visionneuse centrale.
5. Cliquez sur **« Conforme »** pour valider la pièce : la jauge à droite recalcule le score en direct.
6. Une fois toutes les pièces traitées, cliquez sur **« Émettre l'avis final »** : recommandez la décision avec une synthèse d'audit.

### Étape 4 : Administrateur (Validation collégiale 4 yeux & Octroi du code SGW)
1. Basculez sur le compte Admin (`admin@signw.demo`).
2. Rendez-vous sur **« Certifications & Décisions »** (`certifications.html`).
3. L'onglet **« Décisions en attente »** affiche le dossier instruit par l'auditeur.
4. Cliquez sur **« Prendre la décision finale »**.
5. Le niveau de certification est automatiquement encadré par le score réel calculé (sécurité anti-fraude).
6. Validez : un code unique officiel `SGW-2026-NNNNN` est généré, inscrit au registre et consigné au journal d'audit inaltérable.

### Étape 5 : Administrateur (Constructeur de formulaires dynamique)
1. Allez sur **« Constructeur formulaires »** (`form-builder.html`).
2. Sélectionnez le secteur **« Énergie & Électrification »**.
3. Dans la palette, ajoutez une exigence (ex. *« Dépôt de pièce PDF »*).
4. Nommez le champ : *« Attestation d'habilitation électrique haute tension »*.
5. Cliquez sur **« Publier la nouvelle version »**.
6. Ouvrez l'espace Agent (`app/agent/dossier.html`) : le nouveau champ est instantanément disponible.

### Étape 6 : Administrateur (Création d'un nouveau secteur d'activité)
1. Allez sur **« Secteurs d'activité »** (`secteurs.html` côté admin).
2. Cliquez sur **« Ajouter un secteur »** : Nom = *« Éducation & Formation »*, Icône = 🎓.
3. Validez : le secteur est instantanément créé avec son formulaire initialisé.
4. Il apparaît immédiatement sur la vitrine publique `secteurs.html` et sur la page d'accueil.

### Étape 7 : Donneur d'ordre (Création de marché & Simulateur d'adéquation)
1. Basculez sur le compte Donneur d'ordre (`principal@signw.demo` — Mairie de Bafoussam).
2. Cliquez sur **« Simulateur adéquation »** (`adequation.html`).
3. Renseignez un budget de marché de `800 000 000 FCFA` pour le secteur BTP.
4. Sélectionnez une entreprise candidate et lancez l'évaluation.
5. Le moteur analyse les 4 conditions critiques *(ratio budget/CA, adéquation équipement lourd, encadrement technique, antécédents)*.
6. Le verdict s'affiche clairement avec analyse détaillée et détection des points d'attention.

---

## 5. Comment ajouter un nouveau secteur d'activité

### Option A : Via l'interface Administrateur (Recommandé)
1. Connectez-vous avec le compte `admin@signw.demo`.
2. Rendez-vous dans le menu **« Secteurs d’activité »** (`app/admin/secteurs.html`).
3. Cliquez sur **« ➕ Ajouter un secteur »**.
4. Renseignez le nom (ex: *« Hydraulique & Forages »*), le slug est généré automatiquement.
5. Définissez l'icône, la couleur d'accentuation et la description.
6. Cliquez sur **« Créer le secteur & son formulaire »**.
7. Le secteur est sauvegardé dans le `localStorage` et devient immédiatement opérationnel dans toute l'application.

### Option B : Par code dans le fichier seed
1. Ouvrez `js/data/seed.js`.
2. Dans le tableau `sectors`, ajoutez le nouvel objet :
   ```javascript
   {
     id: "sec_hydraulique",
     nom: "Hydraulique & Forages",
     icon: "💧",
     couleur: "#0284C7",
     description: "Adduction d'eau potable, châteaux d'eau, forages ruraux et stations.",
     actif: true,
     statut: "actif",
     nbAgents: 0
   }
   ```
3. Dans `formSchemas`, ajoutez le schéma de formulaire correspondant lié à `secteurId: "sec_hydraulique"`.
4. Cliquez sur **« Réinitialiser la démo »** dans le pied de page pour réinitialiser les données avec le nouveau secteur.

---

## 6. Critères de qualité respectés

- **Principe des 4 yeux & Non-collusion** : Séparation stricte entre l'instruction technique par l'auditeur et la décision finale par l'administrateur.
- **Verrouillage métier des certifications** : Impossibilité d'émettre un certificat pour un dossier non qualifié (< 55 points) ou d'attribuer un palier supérieur au score calculé.
- **100% Hors-ligne** : Fonctionne sans connexion Internet et sans serveur local via double-clic sur `index.html`.
- **Responsive design (375 px à 4K)** : Adaptabilité complète sur mobile sans débordement horizontal (*tableaux sous conteneur défilant, menus repliables, boutons fluides*).
- **Données camerounaises réalistes** : Montants en FCFA (XAF), villes réelles (Douala, Yaoundé, Bafoussam, Garoua), institutions (DGI, CNPS, ONECCA, Greffe TPI).
- **Export & Impression PDF certifiée** : Feuille de style `@media print` optimisée pour imprimer ou enregistrer le certificat officiel au format A4 avec filigrane, QR code et sceau.

---

*signw — La preuve par l'audit indépendant au service de la commande publique.*
