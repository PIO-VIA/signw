================================================================================
                           SIGNW — PROTOTYPE WEB INTERACTIF
     Tiers de Confiance Indépendant pour les Marchés Publics et Privés au Cameroun
================================================================================

Version : 1.0.0
Date : Octobre 2026
Auteur : Antigravity & Équipe signw
Technologie : 100% Hors-Ligne (HTML5, CSS3 pur avec Design Tokens, Vanilla JavaScript ES2020+)
Aucune dépendance externe ni npm requise.


================================================================================
1. COMMENT OUVRIR ET EXÉCUTER LE PROJET
================================================================================

Le prototype est conçu pour fonctionner DIRECTEMENT depuis le système de fichiers
sans aucun serveur web ni compilation :

METHODE 1 (La plus simple) :
  Double-cliquez simplement sur le fichier "index.html" à la racine du projet
  pour l'ouvrir dans votre navigateur web moderne (Google Chrome, Firefox, Safari, Edge).
  L'URL dans la barre d'adresse sera : file:///.../signw/index.html

METHODE 2 (Optionnelle via serveur local léger) :
  Si vous préférez un serveur HTTP local :
    python3 -m http.server 8080
    ou
    npx serve .
  Puis ouvrez http://localhost:8080 dans votre navigateur.

NOTE SUR LE STOCKAGE HORS-LIGNE :
  Toutes les données de la plateforme sont stockées dans le localStorage de votre
  navigateur sous la clé "signw_db_v1". Aucune requête fetch() de fichiers JSON
  locaux n'est effectuée (ce qui garantit 0 erreur CORS en protocole file://).
  Pour remettre les données à zéro à tout moment, cliquez sur le bouton
  "↻ Réinitialiser la démo" situé dans le pied de page ou dans le sélecteur rapide.


================================================================================
2. COMPTES DE DÉMONSTRATION (1-CLIC & MOT DE PASSE UNIQUE)
================================================================================

Tous les comptes ont pour mot de passe : demo1234
Une barre de connexion rapide (Quick Switcher) permet de basculer instantanément
d'un compte à un autre en 1 clic.

1. AGENT TITULAIRE (Certifié Or)
   Email : agent@signw.demo
   Entreprise : BâtiPlus Cameroun SARL (Douala)
   Score : 91/100 (Médaille d'Or)
   Code certificat : SGW-2026-00001
   Usage : Visualiser son certificat imprimable, ses chantiers, postuler aux marchés.

2. AGENT CANDIDAT (Dossier à corriger - Étape clé du flux de démo)
   Email : agent2@signw.demo
   Entreprise : Sahel Travaux & Routes (Garoua)
   Statut dossier : Pièces incomplètes (rejet de l'attestation de non-faillite)
   Usage : Démonstration de la resoumission d'une pièce corrigée.

3. AUDITEUR TECHNIQUE (Instruction & Contrôle contradictoire)
   Email : auditeur@signw.demo
   Nom : Alain Nkoulou (Yaoundé)
   Rôle : Poste de vérification d'audit, visionneuse de documents, calcul live du score.

4. AUDITEUR 2
   Email : auditeur2@signw.demo
   Nom : Serge Fotso (Bafoussam)

5. SUPER ADMINISTRATEUR (Gouvernance & Validation collégiale)
   Email : admin@signw.demo
   Nom : Admin signw (Direction Générale)
   Rôle : Validation des décisions 4 yeux, délivrance du code SGW, Constructeur
          de formulaires, gestion des secteurs, affectations et journal d'audit.

6. DONNEUR D'ORDRE (Maître d'ouvrage / Acheteur public)
   Email : principal@signw.demo
   Organisation : Mairie de Bafoussam (Commune d'Arrondissement)
   Rôle : Publication de marchés, simulateur d'adéquation budget/capacité, comparateur.


================================================================================
3. STRUCTURE DE L'ARBORESCENCE DU PROJET
================================================================================

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
├── favicon.png                 Favicon SVG/PNG signw
├── README.txt                  Ce document
│
├── app/                        Espaces connectés réservés
│   ├── agent/                  PORTAIL CANDIDAT / ENTREPRISE
│   │   ├── dashboard.html      Tableau de bord de l'entreprise
│   │   ├── dossier.html        Remplissage dynamique du dossier & téléversement
│   │   ├── mes-dossiers.html   Historique de ses candidatures
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
│   ├── tokens.css              Charte graphique, couleurs, espacements, ombres
│   ├── base.css                Reset CSS, typographie Inter, media print certificat
│   ├── components.css          Boutons, badges, modales, jauges de score, cartes
│   ├── layout.css              Header public, sidebar 264px, quick demo bar
│   └── pages.css               Styles des postes d'audit, builder et certificats
│
├── js/
│   ├── data/
│   │   └── seed.js             Jeu de données réaliste complet (14 agents, 8 projets...)
│   ├── core/
│   │   ├── utils.js            Formatage FCFA, dates FR, identifiants, badges
│   │   ├── store.js            Magasin localStorage, CRUD, machine à états
│   │   ├── auth.js             Comptes démo, gestion de session et route guard
│   │   ├── score.js            Algorithme 5 piliers et moteur d'adéquation projet
│   │   ├── ui.js               Toasts, modales, drawer, jauges SVG animées
│   │   ├── layout.js           Injection automatique du header, footer et sidebar
│   │   ├── formrender.js       Génération dynamique de formulaire à partir du JSON
│   │   └── formbuilder.js      Constructeur visuel drag&drop de formulaires
│   └── pages/                  Scripts additionnels modulaires
│
└── assets/
    ├── img/                    Photos webp optimisées, héros de chantier, secteurs
    └── icons/                  Logos vectoriels SVG, sceau officiel signw, QR code


================================================================================
4. SCRIPT DE DÉMONSTRATION PAS À PAS (5 MINUTES)
================================================================================

Suivez ce parcours pour expérimenter toute la chaîne de valeur de la confiance :

ÉTAPE 1 : VISITEUR (Compréhension & Découverte)
  1. Ouvrez index.html.
  2. Découvrez l'explication visuelle de l'asymétrie de l'information (Nobel Stiglitz/Akerlof).
  3. Cliquez sur "Consulter l'annuaire certifié" : filtrez sur le secteur BTP et le niveau Or.
  4. Ouvrez la fiche de "BâtiPlus Cameroun SARL". Observez les 5 piliers de score détaillés.
  5. Cliquez sur "Vérifier certificat" dans la barre de navigation : saisissez SGW-2026-00001
     pour constater l'attestation publique de validité en temps réel.

ÉTAPE 2 : AGENT (Resoumission d'une pièce corrigée)
  1. Rendez-vous sur login.html et cliquez sur "Connexion Sahel Travaux" (agent2@signw.demo).
  2. Vous arrivez sur le tableau de bord avec le bandeau d'alerte :
     "Pièces incomplètes : 1 pièce nécessite votre attention".
  3. Cliquez sur "Corriger mon dossier" (dossier.html).
  4. Repérez la section avec l'alerte rouge sur le non-faillite (rejetée par l'auditeur).
  5. Cliquez sur le dropzone pour téléverser une nouvelle pièce conforme.
  6. Cliquez sur "Resoumettre le dossier".
  7. Le statut passe instantanément à "en vérification" et une notification est émise.

ÉTAPE 3 : AUDITEUR (Instruction contradictoire & Avis final)
  1. Basculez sur le compte Auditeur (auditeur@signw.demo).
  2. Rendez-vous sur "Poste de vérification" (audit.html).
  3. Cliquez sur le dossier de "Sahel Travaux & Routes".
  4. Examinez la pièce dans la visionneuse centrale.
  5. Cliquez sur "Conforme" pour valider la pièce : observez la jauge de score à droite
     qui recalcule le score en direct (+10 pts).
  6. Une fois toutes les pièces validées, cliquez sur "Émettre l'avis final" en bas :
     sélectionnez "Recommander la certification" et saisissez votre synthèse.

ÉTAPE 4 : ADMINISTRATEUR (Validation collégiale 4 yeux & Octroi du code SGW)
  1. Basculez sur le compte Admin (admin@signw.demo).
  2. Rendez-vous sur "Certifications & Décisions" (certifications.html).
  3. L'onglet "Décisions en attente" affiche la recommandation de l'auditeur pour Sahel Travaux.
  4. Cliquez sur "Prendre la décision finale".
  5. Choisissez "Octroyer la certification complète (Médaille d'Or)".
  6. Validez : un code unique officiel "SGW-2026-00009" est généré, consigné au registre
     officiel, et automatiquement tracé dans le journal d'audit.

ÉTAPE 5 : ADMINISTRATEUR (Constructeur de formulaires dynamique)
  1. Depuis l'espace Admin, allez sur "Constructeur formulaires" (form-builder.html).
  2. Sélectionnez le secteur "Énergie & Électrification".
  3. Dans la palette de gauche, cliquez sur "Dépôt de pièce (PDF)" pour ajouter une exigence.
  4. Nommez le champ : "Attestation d'habilitation électrique haute tension".
  5. Cliquez sur "Publier la nouvelle version".
  6. Ouvrez l'espace Agent (app/agent/dossier.html) : le nouveau champ est présent en direct !

ÉTAPE 6 : ADMINISTRATEUR (Création d'un nouveau secteur d'activité)
  1. Allez sur "Secteurs d'activité" (secteurs.html côté admin).
  2. Cliquez sur "Ajouter un secteur" : Nom = "Éducation & Formation", Icône = 🎓.
  3. Validez : le secteur est instantanément créé avec son formulaire initialisé.
  4. Il apparaît immédiatement sur la vitrine publique secteurs.html et dans les listes.

ÉTAPE 7 : PRINCIPAL (Création de marché & Simulateur d'adéquation)
  1. Basculez sur le compte Donneur d'ordre (principal@signw.demo - Mairie de Bafoussam).
  2. Cliquez sur "Simulateur adéquation" (adequation.html).
  3. Renseignez un budget de marché de 800 000 000 FCFA pour le secteur BTP.
  4. Sélectionnez "BâtiPlus Cameroun SARL".
  5. Cliquez sur "Calculer l'adéquation" : le moteur analyse les 4 conditions critiques
     (ratio budget/CA, adéquation équipement, encadrement ingénieurs, antécédents).
  6. Le verdict s'affiche clairement : "ADÉQUATION CONFIRMÉE" avec explications détaillées.
  7. Ajoutez l'agent à vos favoris en 1 clic.


================================================================================
5. COMMENT AJOUTER UN NOUVEAU SECTEUR D'ACTIVITÉ
================================================================================

Vous pouvez ajouter un secteur de deux façons :

VIA L'INTERFACE ADMINISTRATEUR (Recommandé) :
  1. Connectez-vous avec le compte admin@signw.demo.
  2. Rendez-vous dans le menu "Secteurs d’activité" (app/admin/secteurs.html).
  3. Cliquez sur le bouton "➕ Ajouter un secteur".
  4. Remplissez le nom (ex: "Hydraulique & Forages"), le slug est généré automatiquement.
  5. Choisissez l'icône, la couleur d'accentuation et rédigez une description.
  6. Cliquez sur "Créer le secteur & son formulaire".
  7. Le secteur est sauvegardé dans le localStorage et devient disponible partout !
  8. Vous pouvez ensuite cliquer sur "⚙️ Formulaire" pour configurer ses champs spécifiques.

PAR CODE DANS LE FICHIER SEED (Pour modification permanente de base) :
  1. Ouvrez js/data/seed.js.
  2. Dans le tableau `sectors`, ajoutez votre nouvel objet secteur :
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
  3. Dans `formSchemas`, ajoutez un schéma de formulaire rattaché à `secteurId: "sec_hydraulique"`.
  4. Cliquez sur "Réinitialiser la démo" dans le footer de l'application pour recharger le seed.


================================================================================
6. CRITÈRES DE QUALITÉ RESPECTÉS
================================================================================

- Respect strict du principe d'indépendance et de non-collusion (séparation stricte
  entre l'instruction technique par l'auditeur et l'octroi juridique par l'administrateur).
- 100% Hors-ligne : fonctionne sans connexion Internet et sans serveur HTTP via double-clic.
- Données réalistes camerounaises : FCFA (XAF), villes réelles, RCCM/NIU fictifs.
- Typographie soignée : polices système de secours fluides + Google Fonts Inter.
- Accessibilité : contrastes WCAG AA vérifiés, focus visuel visible, balisage sémantique.
- Impression certifiée : feuille de style @media print dédiée pour exporter le certificat
  en PDF A4 portrait impeccable via Ctrl+P.

================================================================================
signw — La preuve par l'audit indépendant au service de la commande publique.
================================================================================
