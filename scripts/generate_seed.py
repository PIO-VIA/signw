import json

data = {}

# 1. Users
data['users'] = [
    {
        'id': 'usr_agent1',
        'nom': 'Jean-Marc Kamdem',
        'email': 'agent@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'agent',
        'agentId': 'agt_001',
        'avatar': 'assets/img/avatar-09.svg',
        'telephone': '+237 699 12 34 56',
        'region': 'Littoral',
        'creeLe': '2025-01-10',
        'actif': True
    },
    {
        'id': 'usr_agent2',
        'nom': 'Ousmanou Bello',
        'email': 'agent2@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'agent',
        'agentId': 'agt_002',
        'avatar': 'assets/img/avatar-06.svg',
        'telephone': '+237 677 88 99 00',
        'region': 'Nord',
        'creeLe': '2025-03-12',
        'actif': True
    },
    {
        'id': 'usr_agent3',
        'nom': 'Pierre Owona',
        'email': 'agent3@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'agent',
        'agentId': 'agt_003',
        'avatar': 'assets/img/avatar-07.svg',
        'telephone': '+237 690 11 22 33',
        'region': 'Littoral',
        'creeLe': '2025-02-15',
        'actif': True
    },
    {
        'id': 'usr_principal1',
        'nom': 'Dr. François Nguemo (Maire)',
        'email': 'principal@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'principal',
        'principalId': 'prc_001',
        'avatar': 'assets/img/avatar-08.svg',
        'telephone': '+237 675 44 33 22',
        'region': 'Ouest',
        'creeLe': '2025-01-05',
        'actif': True
    },
    {
        'id': 'usr_principal2',
        'nom': 'Mme Célestine Tchounkeu (Directrice MINTP)',
        'email': 'principal2@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'principal',
        'principalId': 'prc_002',
        'avatar': 'assets/img/avatar-05.svg',
        'telephone': '+237 699 00 11 22',
        'region': 'Centre',
        'creeLe': '2025-01-08',
        'actif': True
    },
    {
        'id': 'usr_principal3',
        'nom': 'Eng. Robert Essomba (Dir. SONARA)',
        'email': 'principal3@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'principal',
        'principalId': 'prc_003',
        'avatar': 'assets/img/avatar-11.svg',
        'telephone': '+237 671 22 33 44',
        'region': 'Sud-Ouest',
        'creeLe': '2025-02-01',
        'actif': True
    },
    {
        'id': 'usr_auditeur1',
        'nom': 'Alain Nkoulou',
        'email': 'auditeur@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'auditeur',
        'avatar': 'assets/img/avatar-01.svg',
        'telephone': '+237 691 55 66 77',
        'region': 'Centre',
        'chargeActuelle': 3,
        'creeLe': '2024-11-01',
        'actif': True
    },
    {
        'id': 'usr_auditeur2',
        'nom': 'Sophie Fotso',
        'email': 'auditeur2@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'auditeur',
        'avatar': 'assets/img/avatar-02.svg',
        'telephone': '+237 672 99 88 77',
        'region': 'Littoral',
        'chargeActuelle': 2,
        'creeLe': '2024-11-15',
        'actif': True
    },
    {
        'id': 'usr_admin',
        'nom': 'Super Administrateur signw',
        'email': 'admin@signw.demo',
        'motDePasse': 'demo1234',
        'role': 'admin',
        'avatar': 'assets/img/avatar-04.svg',
        'telephone': '+237 699 99 99 99',
        'region': 'Centre',
        'creeLe': '2024-10-01',
        'actif': True
    }
]

# 2. Principals
data['principals'] = [
    {
        'id': 'prc_001',
        'userId': 'usr_principal1',
        'organisation': 'Mairie de Bafoussam',
        'type': 'commune',
        'region': 'Ouest',
        'adresse': 'Hôtel de Ville, Place des Fêtes, Bafoussam',
        'description': 'Collectivité territoriale décentralisée gérant les infrastructures urbaines, voiries et bâtiments municipaux.'
    },
    {
        'id': 'prc_002',
        'userId': 'usr_principal2',
        'organisation': 'Ministère des Travaux Publics (MINTP)',
        'type': 'ministère',
        'region': 'Centre',
        'adresse': 'Immeuble Émergence, Yaoundé',
        'description': 'Maître d’ouvrage délégué des grands axes routiers nationaux et ouvrages d’art majeurs du Cameroun.'
    },
    {
        'id': 'prc_003',
        'userId': 'usr_principal3',
        'organisation': 'Société Nationale de Raffinage (SONARA)',
        'type': "société d'État",
        'region': 'Sud-Ouest',
        'adresse': 'Zone Industrielle de Limbe, Cap Limboh',
        'description': 'Entreprise publique industrielle opérant les infrastructures pétrolières côtières.'
    }
]

# 3. Sectors
data['sectors'] = [
    {
        'id': 'sec_btp',
        'nom': 'BTP & Construction',
        'icone': 'hard-hat',
        'description': 'Bâtiments, routes, terrassement, ouvrages d’art, adduction d’eau et assainissement.',
        'actif': True,
        'statut': 'actif',
        'formulaireId': 'form_btp_v1',
        'couleur': '#7A1B34',
        'image': 'assets/img/sector-btp.webp',
        'nbAgents': 14,
        'coutMoyenM2': 285000,
        'coutMoyenKmRoute': 145000000
    },
    {
        'id': 'sec_energie',
        'nom': 'Énergie & Électrification',
        'icone': 'zap',
        'description': 'Réseaux électriques MT/BT, centrales solaires photovoltaïques et éclairage public.',
        'actif': True,
        'statut': 'actif',
        'formulaireId': 'form_energie_v1',
        'couleur': '#D99A1E',
        'image': 'assets/img/sector-energy.webp',
        'nbAgents': 6,
        'coutMoyenM2': 180000,
        'coutMoyenKmRoute': 35000000
    },
    {
        'id': 'sec_agri',
        'nom': 'Agriculture & Agro-industrie',
        'icone': 'sprout',
        'description': 'Aménagements hydro-agricoles, magasins de stockage et pistes rurales.',
        'actif': True,
        'statut': 'actif',
        'formulaireId': 'form_agri_v1',
        'couleur': '#1E8E5A',
        'image': 'assets/img/sector-agri.webp',
        'nbAgents': 4,
        'coutMoyenM2': 95000,
        'coutMoyenKmRoute': 22000000
    },
    {
        'id': 'sec_digital',
        'nom': 'Numérique & Services IT',
        'icone': 'laptop',
        'description': 'Infrastructures télécoms, fibre optique, datacenters et solutions logicielles d’État.',
        'actif': False,
        'statut': 'bientot',
        'formulaireId': 'form_digital_v1',
        'couleur': '#2563EB',
        'image': 'assets/img/sector-digital.webp',
        'nbAgents': 0
    },
    {
        'id': 'sec_sante',
        'nom': 'Santé & Biomédical',
        'icone': 'heart-pulse',
        'description': 'Centres hospitaliers, blocs opératoires et fourniture de plateaux techniques certifiés.',
        'actif': False,
        'statut': 'bientot',
        'formulaireId': 'form_sante_v1',
        'couleur': '#C0392B',
        'image': 'assets/img/sector-health.webp',
        'nbAgents': 0
    },
    {
        'id': 'sec_logistique',
        'nom': 'Transport & Logistique',
        'icone': 'truck',
        'description': 'Parcs d’engins lourds, manutention portuaire et fret sécurisé.',
        'actif': False,
        'statut': 'bientot',
        'formulaireId': 'form_logistique_v1',
        'couleur': '#4B5563',
        'image': 'assets/img/sector-logistics.webp',
        'nbAgents': 0
    }
]

# 4. Form Schemas
data['formSchemas'] = [
    {
        'id': 'form_btp_v1',
        'secteurId': 'sec_btp',
        'nom': 'Dossier de qualification BTP & Génie Civil',
        'version': 1,
        'sections': [
            {
                'id': 'sec_admin',
                'titre': '1. Conformité administrative et juridique',
                'description': 'Pièces légales attestant de l’existence juridique et de la régularité fiscale.',
                'pilier': 'admin',
                'champs': [
                    {'id': 'f_rs', 'type': 'texte', 'label': 'Raison sociale de l’entreprise', 'aide': 'Nom exact figurant sur le RCCM', 'obligatoire': True, 'poids': 2, 'pilier': 'admin'},
                    {'id': 'f_forme', 'type': 'liste', 'label': 'Forme juridique', 'aide': 'Statut OHADA', 'obligatoire': True, 'options': ['SARL', 'SA', 'SAS', 'Ets individuel', 'GIE'], 'poids': 2, 'pilier': 'admin'},
                    {'id': 'f_rccm', 'type': 'texte', 'label': 'Numéro RCCM', 'aide': 'Format : RC/DLA/2018/B/1429', 'obligatoire': True, 'poids': 3, 'pilier': 'admin', 'regleDeVerification': 'Vérifier la concordance avec le fichier RCCM déposé.'},
                    {'id': 'f_rccm_doc', 'type': 'fichier', 'label': 'Extrait K-bis ou Registre du Commerce (RCCM)', 'aide': 'Copie certifiée conforme datant de moins de 3 mois', 'obligatoire': True, 'piecesAcceptees': ['pdf', 'jpg', 'png'], 'tailleMaxMo': 10, 'poids': 4, 'pilier': 'admin'},
                    {'id': 'f_niu', 'type': 'texte', 'label': 'Numéro d’Identifiant Unique (NIU)', 'aide': 'Numéro fiscal délivré par la DGI', 'obligatoire': True, 'poids': 3, 'pilier': 'admin'},
                    {'id': 'f_quitus', 'type': 'fichier', 'label': 'Quitus fiscal ou Attestation de conformité fiscale', 'aide': 'Délivré par le centre des impôts territorialement compétent', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 5, 'poids': 4, 'pilier': 'admin', 'regleDeVerification': 'Vérifier la validité en cours à la date d’audit.'},
                    {'id': 'f_faillite', 'type': 'fichier', 'label': 'Attestation de non-faillite', 'aide': 'Délivrée par le Greffe du Tribunal de Première Instance', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 5, 'poids': 4, 'pilier': 'admin', 'regleDeVerification': 'Validité maximale de 3 mois.'},
                    {'id': 'f_cnps', 'type': 'fichier', 'label': 'Attestation pour soumission CNPS', 'aide': 'Preuve de paiement des cotisations sociales du personnel', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 5, 'poids': 3, 'pilier': 'admin'},
                    {'id': 'f_agrement', 'type': 'fichier', 'label': 'Agrément ministériel sectoriel BTP', 'aide': 'Certificat de qualification du MINTP (classe 1 à 5)', 'obligatoire': False, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 10, 'poids': 3, 'pilier': 'admin'}
                ]
            },
            {
                'id': 'sec_fin',
                'titre': '2. Capacité financière',
                'description': 'États financiers, volume d’affaires et solidité bancaire.',
                'pilier': 'fin',
                'champs': [
                    {'id': 'f_ca_moyen', 'type': 'montant', 'label': 'Chiffre d’affaires moyen des 3 derniers exercices', 'unite': 'FCFA', 'aide': 'Moyenne certifiée conforme par l’expert-comptable', 'obligatoire': True, 'poids': 6, 'pilier': 'fin'},
                    {'id': 'f_bilan_3ans', 'type': 'fichier', 'label': 'Liasses fiscales et bilans certifiés (N-1, N-2, N-3)', 'aide': 'Bilan visé par l’Ordre National des Experts Comptables (ONECCA)', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 15, 'poids': 8, 'pilier': 'fin', 'regleDeVerification': 'Vérifier la présence du timbre professionnel ONECCA.'},
                    {'id': 'f_attest_banque', 'type': 'fichier', 'label': 'Attestation de solvabilité bancaire', 'aide': 'Ligne de crédit ou caution de soumission délivrée par une banque de 1er ordre', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 5, 'poids': 6, 'pilier': 'fin'},
                    {'id': 'f_marches_en_cours', 'type': 'tableau_repetable', 'label': 'Marchés en cours d’exécution', 'aide': 'Indiquez les chantiers actifs pour estimer la charge résiduelle', 'obligatoire': False, 'colonnes': ['Intitulé du marché', 'Client / Maître d’ouvrage', 'Montant (FCFA)', 'Taux d’avancement (%)'], 'poids': 5, 'pilier': 'fin'}
                ]
            },
            {
                'id': 'sec_tech',
                'titre': '3. Capacité technique et matériel',
                'description': 'Inventaire des engins, parcs de matériel et preuves de propriété.',
                'pilier': 'tech',
                'champs': [
                    {'id': 'f_materiel_table', 'type': 'tableau_repetable', 'label': 'Engins de chantier et équipements lourds', 'aide': 'Pelles, niveleuses, bulldozers, camions bennes...', 'obligatoire': True, 'colonnes': ['Type d’engin', 'Marque & Modèle', 'Quantité', 'Année', 'Propriété ou Location', 'N° Carte Grise / Facture'], 'poids': 12, 'pilier': 'tech', 'regleDeVerification': 'Contrôler la cohérence des cartes grises au nom de l’entreprise.'},
                    {'id': 'f_depot_photos', 'type': 'fichier', 'label': 'Photos géolocalisées du parc matériel et ateliers', 'aide': 'Vue d’ensemble des hangars, magasins d’outillage et engins stationnés', 'obligatoire': True, 'piecesAcceptees': ['pdf', 'jpg', 'png'], 'tailleMaxMo': 15, 'poids': 8, 'pilier': 'tech'},
                    {'id': 'f_iso_qualite', 'type': 'fichier', 'label': 'Certification de management de la qualité (ISO 9001 / 14001)', 'aide': 'Facultatif mais confère un bonus de notation', 'obligatoire': False, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 5, 'poids': 5, 'pilier': 'tech'}
                ]
            },
            {
                'id': 'sec_ref',
                'titre': '4. Références et expérience de chantier',
                'description': 'Chantiers menés à terme avec Procès-Verbaux de réception.',
                'pilier': 'ref',
                'champs': [
                    {'id': 'f_annees_exp', 'type': 'nombre', 'label': 'Nombre d’années d’activité dans le BTP', 'aide': 'Ancienneté de la société', 'obligatoire': True, 'min': 1, 'max': 50, 'poids': 4, 'pilier': 'ref'},
                    {'id': 'f_references_table', 'type': 'tableau_repetable', 'label': 'Projets majeurs réalisés au cours des 5 dernières années', 'aide': 'Seuls les projets avec PV de réception ou attestation de bonne fin sont comptabilisés', 'obligatoire': True, 'colonnes': ['Intitulé du projet', 'Maître d’ouvrage', 'Localité', 'Montant (FCFA)', 'Année d’achèvement'], 'poids': 10, 'pilier': 'ref'},
                    {'id': 'f_pv_reception', 'type': 'fichier', 'label': 'Procès-Verbaux (PV) de réception provisoire ou définitive', 'aide': 'Compilés en un seul document PDF', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 20, 'poids': 6, 'pilier': 'ref', 'regleDeVerification': 'Vérifier la signature et le cachet officiel du maître d’ouvrage.'}
                ]
            },
            {
                'id': 'sec_rh',
                'titre': '5. Ressources humaines clés',
                'description': 'Encadrement technique, ingénieurs et chefs de chantier.',
                'pilier': 'rh',
                'champs': [
                    {'id': 'f_effectif_permanent', 'type': 'nombre', 'label': 'Nombre total de salariés permanents', 'aide': 'Inscrits sur le livre de paie et déclarés à la CNPS', 'obligatoire': True, 'poids': 3, 'pilier': 'rh'},
                    {'id': 'f_personnel_table', 'type': 'tableau_repetable', 'label': 'Personnel cadre et maîtrise technique', 'aide': 'Directeurs de travaux, ingénieurs civils, géomètres, conducteurs', 'obligatoire': True, 'colonnes': ['Nom & Prénom', 'Fonction', 'Diplôme / Titre', 'Années d’expérience'], 'poids': 4, 'pilier': 'rh'},
                    {'id': 'f_cv_diplomes', 'type': 'fichier', 'label': 'CV signés et copies des diplômes des ingénieurs clés', 'aide': 'Diplômes d’ingénieur de conception (ENSP, etc.) et attestations d’inscription à l’Ordre (ONIGC)', 'obligatoire': True, 'piecesAcceptees': ['pdf'], 'tailleMaxMo': 15, 'poids': 3, 'pilier': 'rh'}
                ]
            },
            {
                'id': 'sec_honneur',
                'titre': '6. Déclaration sur l’honneur & Signature',
                'description': 'Engagement solennel sur l’exactitude des déclarations formulées.',
                'pilier': 'admin',
                'champs': [
                    {'id': 'f_honneur_check', 'type': 'case_a_cocher', 'label': 'J’atteste sur l’honneur que toutes les pièces et informations déposées sont conformes et authentiques.', 'obligatoire': True, 'poids': 0, 'pilier': 'admin'},
                    {'id': 'f_signataire_nom', 'type': 'texte', 'label': 'Nom et prénom du représentant légal', 'obligatoire': True, 'poids': 0, 'pilier': 'admin'},
                    {'id': 'f_signataire_qualite', 'type': 'texte', 'label': 'Qualité (Gérant, Directeur Général, Fondé de pouvoir)', 'obligatoire': True, 'poids': 0, 'pilier': 'admin'}
                ]
            }
        ]
    },
    {
        'id': 'form_energie_v1',
        'secteurId': 'sec_energie',
        'nom': 'Dossier de qualification Énergie & Électrification',
        'version': 1,
        'sections': [
            {
                'id': 'sec_en_adm',
                'titre': '1. Conformité & Habilitations Électriques',
                'champs': [
                    {'id': 'fe_rs', 'type': 'texte', 'label': 'Raison sociale', 'obligatoire': True, 'poids': 4, 'pilier': 'admin'},
                    {'id': 'fe_rccm', 'type': 'fichier', 'label': 'RCCM et Quitus fiscal', 'obligatoire': True, 'poids': 6, 'pilier': 'admin'},
                    {'id': 'fe_agrement_arsel', 'type': 'fichier', 'label': 'Agrément de l’Agence de Régulation du Secteur de l’Électricité (ARSEL)', 'obligatoire': True, 'poids': 10, 'pilier': 'admin'}
                ]
            },
            {
                'id': 'sec_en_fin',
                'titre': '2. Capacité Financière & Équipements',
                'champs': [
                    {'id': 'fe_ca', 'type': 'montant', 'label': 'CA moyen 3 ans (FCFA)', 'obligatoire': True, 'poids': 10, 'pilier': 'fin'},
                    {'id': 'fe_parc_engins', 'type': 'tableau_repetable', 'label': 'Camions nacelles, groupes de tirage, mesureurs d’isolement', 'colonnes': ['Désignation', 'Quantité', 'N° Série / Carte grise'], 'obligatoire': True, 'poids': 15, 'pilier': 'tech'}
                ]
            },
            {
                'id': 'sec_en_ref',
                'titre': '3. Références Lignes MT/BT et Solaires',
                'champs': [
                    {'id': 'fe_ref_table', 'type': 'tableau_repetable', 'label': 'Projets d’électrification réalisés', 'colonnes': ['Projet', 'Maître d’ouvrage', 'Linéaire / Puissance kWc', 'Année'], 'obligatoire': True, 'poids': 20, 'pilier': 'ref'}
                ]
            }
        ]
    },
    {
        'id': 'form_agri_v1',
        'secteurId': 'sec_agri',
        'nom': 'Dossier de qualification Aménagements Agricoles',
        'version': 1,
        'sections': [
            {
                'id': 'sec_ag_adm',
                'titre': '1. Conformité Juridique',
                'champs': [
                    {'id': 'fa_rs', 'type': 'texte', 'label': 'Raison sociale', 'obligatoire': True, 'poids': 5, 'pilier': 'admin'},
                    {'id': 'fa_rccm', 'type': 'fichier', 'label': 'Extrait RCCM et Attestation Fiscale', 'obligatoire': True, 'poids': 10, 'pilier': 'admin'}
                ]
            },
            {
                'id': 'sec_ag_mat',
                'titre': '2. Matériel Agricole et Références Hydro-agricoles',
                'champs': [
                    {'id': 'fa_tracteurs', 'type': 'tableau_repetable', 'label': 'Tracteurs, niveleuses lasers, motopompes et semoirs', 'colonnes': ['Type', 'Marque', 'Quantité', 'Puissance (CV)'], 'obligatoire': True, 'poids': 15, 'pilier': 'tech'},
                    {'id': 'fa_ref_amenagements', 'type': 'tableau_repetable', 'label': 'Périmètres irrigués et pistes rurales aménagés (Hectares / Km)', 'colonnes': ['Site', 'Client', 'Superficie / Linéaire', 'Année'], 'obligatoire': True, 'poids': 20, 'pilier': 'ref'}
                ]
            }
        ]
    }
]

# 5. Agents (14 agents as required)
data['agents'] = [
    {
        'id': 'agt_001',
        'userId': 'usr_agent1',
        'raisonSociale': 'BâtiPlus Cameroun SARL',
        'formeJuridique': 'SARL',
        'rccm': 'RC/DLA/2014/B/894',
        'niu': 'M021400049210P',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Voirie urbaine', 'Bâtiments collectifs', 'Drainage pluvial'],
        'ville': 'Douala',
        'region': 'Littoral',
        'adresse': '45 Boulevard de la Liberté, Akwa, Douala',
        'anneeCreation': 2014,
        'effectif': 85,
        'caMoyen3ans': 1450000000,
        'siteWeb': 'www.batiplus-cameroun.com',
        'description': 'Leader régional du génie civil et de la construction d’infrastructures urbaines modernes dans le Littoral et le Sud-Ouest.',
        'logo': 'assets/img/company-logo-01.svg',
        'statutCertification': 'certifie',
        'score': 92,
        'certificatId': 'cert_001',
        'codeCertificat': 'SGW-2026-00481',
        'dateCertification': '2026-02-14',
        'dateExpiration': '2027-02-14',
        'niveau': 'Or',
        'piliers': {'admin': 95, 'fin': 90, 'tech': 94, 'ref': 92, 'rh': 88},
        'specialites': ['Routes & Voiries', 'Ouvrages d’Art', 'Génie Sanitaire']
    },
    {
        'id': 'agt_002',
        'userId': 'usr_agent2',
        'raisonSociale': 'Sahel Travaux & Routes',
        'formeJuridique': 'SARL',
        'rccm': 'RC/GRA/2017/B/312',
        'niu': 'M081700078120L',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Routes en terre', 'Pistes rurales', 'Digues et forages'],
        'ville': 'Garoua',
        'region': 'Nord',
        'adresse': 'Avenue des Banques, Quartier Marouaré, Garoua',
        'anneeCreation': 2017,
        'effectif': 42,
        'caMoyen3ans': 780000000,
        'siteWeb': 'www.sahel-routes.cm',
        'description': 'Spécialiste du désenclavement routier, du terrassement lourd et des aménagements de retenues collinaires dans le Grand Nord.',
        'logo': 'assets/img/company-logo-02.svg',
        'statutCertification': 'pieces_incompletes',
        'score': 68,
        'certificatId': None,
        'codeCertificat': None,
        'dateCertification': None,
        'dateExpiration': None,
        'niveau': 'En cours',
        'piliers': {'admin': 60, 'fin': 72, 'tech': 70, 'ref': 68, 'rh': 65},
        'specialites': ['Terrassement', 'Pistes de brousse', 'Ouvrages de franchissement']
    },
    {
        'id': 'agt_003',
        'userId': 'usr_agent3',
        'raisonSociale': 'Omnium BTP Douala',
        'formeJuridique': 'SA',
        'rccm': 'RC/DLA/2010/B/445',
        'niu': 'M041000031980K',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Bâtiments industriels', 'Fondations spéciales', 'Ouvrages maritimes'],
        'ville': 'Douala',
        'region': 'Littoral',
        'adresse': 'Zone Portuaire Nord, Bonabéri',
        'anneeCreation': 2010,
        'effectif': 120,
        'caMoyen3ans': 2100000000,
        'siteWeb': 'www.omnium-btp.cm',
        'description': 'Entreprise générale de premier plan avec parc lourd complet d’engins chenillés et centrale d’enrobé.',
        'logo': 'assets/img/company-logo-03.svg',
        'statutCertification': 'certifie',
        'score': 88,
        'certificatId': 'cert_002',
        'codeCertificat': 'SGW-2026-00312',
        'dateCertification': '2026-01-20',
        'dateExpiration': '2027-01-20',
        'niveau': 'Or',
        'piliers': {'admin': 90, 'fin': 88, 'tech': 92, 'ref': 85, 'rh': 82},
        'specialites': ['Plateformes Logistiques', 'Béton Armé Lourd', 'Pieux forés']
    },
    {
        'id': 'agt_004',
        'userId': None,
        'raisonSociale': 'Cameroun Génie Civil SA',
        'formeJuridique': 'SA',
        'rccm': 'RC/YAO/2006/B/102',
        'niu': 'M010600018990T',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Autoroutes', 'Viaducs', 'Barrages hydroélectriques'],
        'ville': 'Yaoundé',
        'region': 'Centre',
        'adresse': 'Immeuble CGC, Boulevard du 20 Mai, Yaoundé',
        'anneeCreation': 2006,
        'effectif': 240,
        'caMoyen3ans': 3800000000,
        'siteWeb': 'www.cgc-cameroun.com',
        'description': 'Opérateur national de référence certifié ISO 9001, réalisant les chantiers autoroutiers et ouvrages de franchissement majeurs.',
        'logo': 'assets/img/company-logo-04.svg',
        'statutCertification': 'certifie',
        'score': 95,
        'certificatId': 'cert_003',
        'codeCertificat': 'SGW-2025-00109',
        'dateCertification': '2025-11-15',
        'dateExpiration': '2026-11-15',
        'niveau': 'Or',
        'piliers': {'admin': 98, 'fin': 95, 'tech': 96, 'ref': 94, 'rh': 90},
        'specialites': ['Autoroutes', 'Ponts suspendus', 'Canalisations grand diamètre']
    },
    {
        'id': 'agt_005',
        'userId': None,
        'raisonSociale': 'Socatrav Travaux Publics',
        'formeJuridique': 'SARL',
        'rccm': 'RC/BFM/2016/B/198',
        'niu': 'M051600055410G',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Routes secondaires', 'Bâtiments scolaires', 'Ponts ruraux'],
        'ville': 'Bafoussam',
        'region': 'Ouest',
        'adresse': 'Quartier Djeleng, Bafoussam',
        'anneeCreation': 2016,
        'effectif': 38,
        'caMoyen3ans': 620000000,
        'siteWeb': 'www.socatrav-tp.cm',
        'description': 'Acteur dynamique de la région Ouest, réputé pour la qualité de ses terrassements et ouvrages de retenue des sols volcaniques.',
        'logo': 'assets/img/company-logo-05.svg',
        'statutCertification': 'certifie',
        'score': 79,
        'certificatId': 'cert_004',
        'codeCertificat': 'SGW-2026-00405',
        'dateCertification': '2026-02-02',
        'dateExpiration': '2027-02-02',
        'niveau': 'Argent',
        'piliers': {'admin': 82, 'fin': 78, 'tech': 80, 'ref': 76, 'rh': 75},
        'specialites': ['Soutènement', 'Pavage urbain', 'Bâtiments communaux']
    },
    {
        'id': 'agt_006',
        'userId': None,
        'raisonSociale': 'Hydro-Bâtiment Ouest',
        'formeJuridique': 'SARL',
        'rccm': 'RC/DSC/2018/B/044',
        'niu': 'M031800067120Q',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Adduction d’eau', 'Châteaux d’eau', 'Caniveaux'],
        'ville': 'Bafoussam',
        'region': 'Ouest',
        'adresse': 'Route de Bamougoum, Bafoussam',
        'anneeCreation': 2018,
        'effectif': 30,
        'caMoyen3ans': 490000000,
        'siteWeb': 'www.hydro-batiment.cm',
        'description': 'Experts des réseaux d’assainissement urbain, réservoirs de stockage en béton précontraint et forages industriels.',
        'logo': 'assets/img/company-logo-06.svg',
        'statutCertification': 'certifie',
        'score': 74,
        'certificatId': 'cert_005',
        'codeCertificat': 'SGW-2026-00388',
        'dateCertification': '2026-01-28',
        'dateExpiration': '2027-01-28',
        'niveau': 'Argent',
        'piliers': {'admin': 80, 'fin': 70, 'tech': 75, 'ref': 72, 'rh': 70},
        'specialites': ['Réseaux AEP', 'Stations de pompage', 'Fossés bétonnés']
    },
    {
        'id': 'agt_007',
        'userId': None,
        'raisonSociale': 'Équatoriale des Travaux',
        'formeJuridique': 'SARL',
        'rccm': 'RC/KRI/2019/B/089',
        'niu': 'M091900091230B',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Voirie côtière', 'Hangars métalliques', 'Aménagements portuaires'],
        'ville': 'Kribi',
        'region': 'Sud',
        'adresse': 'Zone Industrielle de Mboro, Kribi',
        'anneeCreation': 2019,
        'effectif': 35,
        'caMoyen3ans': 540000000,
        'siteWeb': 'www.equatoriale-travaux.com',
        'description': 'Implantée au cœur du pôle économique de Kribi, spécialisée dans les aménagements côtiers et charpentes métalliques.',
        'logo': 'assets/img/company-logo-07.svg',
        'statutCertification': 'certifie',
        'score': 71,
        'certificatId': 'cert_006',
        'codeCertificat': 'SGW-2026-00431',
        'dateCertification': '2026-02-10',
        'dateExpiration': '2027-02-10',
        'niveau': 'Argent',
        'piliers': {'admin': 75, 'fin': 72, 'tech': 70, 'ref': 70, 'rh': 68},
        'specialites': ['Charpente Métal', 'Dallage lourd', 'Enrochements']
    },
    {
        'id': 'agt_008',
        'userId': None,
        'raisonSociale': 'Atlas Infrastructure Kribi',
        'formeJuridique': 'SARL',
        'rccm': 'RC/KRI/2021/B/150',
        'niu': 'M112100123450M',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Terrassement', 'Location d’engins', 'Voies d’accès'],
        'ville': 'Kribi',
        'region': 'Sud',
        'adresse': 'Boulevard Maritime, Kribi',
        'anneeCreation': 2021,
        'effectif': 22,
        'caMoyen3ans': 310000000,
        'siteWeb': 'www.atlas-infra.cm',
        'description': 'PME émergente disposant d’un parc de compacteurs et camions bennes récents.',
        'logo': 'assets/img/company-logo-08.svg',
        'statutCertification': 'certifie',
        'score': 63,
        'certificatId': 'cert_007',
        'codeCertificat': 'SGW-2026-00299',
        'dateCertification': '2026-01-12',
        'dateExpiration': '2027-01-12',
        'niveau': 'Bronze',
        'piliers': {'admin': 68, 'fin': 60, 'tech': 65, 'ref': 62, 'rh': 58},
        'specialites': ['Nivellement', 'Fourniture de graves', 'Dessouchage']
    },
    {
        'id': 'agt_009',
        'userId': None,
        'raisonSociale': 'Soudan BTP Nord',
        'formeJuridique': 'Ets',
        'rccm': 'RC/MRA/2015/A/092',
        'niu': 'P021500034110F',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Écoles', 'Dispensaires', 'Clôtures sécurisées'],
        'ville': 'Maroua',
        'region': 'Extrême-Nord',
        'adresse': 'Quartier Domayo, Maroua',
        'anneeCreation': 2015,
        'effectif': 18,
        'caMoyen3ans': 260000000,
        'siteWeb': 'www.soudan-btp.cm',
        'description': 'Artisan constructeur intervenant dans l’Extrême-Nord sur des chantiers de proximité et d’urgence humanitaire.',
        'logo': 'assets/img/company-logo-09.svg',
        'statutCertification': 'certifie',
        'score': 58,
        'certificatId': 'cert_008',
        'codeCertificat': 'SGW-2026-00215',
        'dateCertification': '2026-01-05',
        'dateExpiration': '2027-01-05',
        'niveau': 'Bronze',
        'piliers': {'admin': 62, 'fin': 55, 'tech': 60, 'ref': 58, 'rh': 52},
        'specialites': ['Briques stabilisées', 'Charpentes bois', 'Toitures bacs alu']
    },
    {
        'id': 'agt_010',
        'userId': None,
        'raisonSociale': 'Chantiers Réunis Yaoundé',
        'formeJuridique': 'SARL',
        'rccm': 'RC/YAO/2019/B/451',
        'niu': 'M061900088210S',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Logements sociaux', 'Rénovations', 'Voirie urbaine'],
        'ville': 'Yaoundé',
        'region': 'Centre',
        'adresse': 'Quartier Bastos, Yaoundé',
        'anneeCreation': 2019,
        'effectif': 28,
        'caMoyen3ans': 420000000,
        'siteWeb': 'www.chantiers-reunis.cm',
        'description': 'Certifié sous réserve de confirmation bancaire de la ligne de garantie de bonne fin d’exécution.',
        'logo': 'assets/img/company-logo-10.svg',
        'statutCertification': 'certifie_avec_reserves',
        'score': 66,
        'certificatId': 'cert_009',
        'codeCertificat': 'SGW-2026-00502',
        'dateCertification': '2026-03-01',
        'dateExpiration': '2027-03-01',
        'niveau': 'Avec réserves',
        'reserves': ['Attestation bancaire provisionnelle limitée à 200M FCFA', 'Parc de camions bennes partiellement loué'],
        'piliers': {'admin': 74, 'fin': 60, 'tech': 64, 'ref': 68, 'rh': 65},
        'specialites': ['Second œuvre', 'Revêtements', 'Maçonnerie générale']
    },
    {
        'id': 'agt_011',
        'userId': None,
        'raisonSociale': 'Delta Travaux Maritimes',
        'formeJuridique': 'SARL',
        'rccm': 'RC/DLA/2020/B/711',
        'niu': 'M122000109980H',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Pontons', 'Dragage estuaire', 'Digue côtière'],
        'ville': 'Douala',
        'region': 'Littoral',
        'adresse': 'Zone UDEAC, Quai Maritime, Douala',
        'anneeCreation': 2020,
        'effectif': 26,
        'caMoyen3ans': 380000000,
        'siteWeb': 'www.delta-maritimes.cm',
        'description': 'Certifié avec réserves administratives en cours de régularisation auprès de la délégation des Travaux Publics.',
        'logo': 'assets/img/company-logo-11.svg',
        'statutCertification': 'certifie_avec_reserves',
        'score': 61,
        'certificatId': 'cert_010',
        'codeCertificat': 'SGW-2026-00467',
        'dateCertification': '2026-02-20',
        'dateExpiration': '2027-02-20',
        'niveau': 'Avec réserves',
        'reserves': ['Agrément classe 3 en cours de renouvellement au MINTP'],
        'piliers': {'admin': 62, 'fin': 64, 'tech': 62, 'ref': 60, 'rh': 56},
        'specialites': ['Travaux fluviaux', 'Palplanches', 'Gabionnage']
    },
    {
        'id': 'agt_012',
        'userId': None,
        'raisonSociale': 'Vanguard BTP & Énergie',
        'formeJuridique': 'SA',
        'rccm': 'RC/YAO/2016/B/890',
        'niu': 'M041600076540D',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Lignes électriques', 'Génie civil sous-stations', 'Voirie'],
        'ville': 'Yaoundé',
        'region': 'Centre',
        'adresse': 'Quartier Dragages, Yaoundé',
        'anneeCreation': 2016,
        'effectif': 54,
        'caMoyen3ans': 850000000,
        'siteWeb': 'www.vanguard-cam.com',
        'description': 'Dossier de renouvellement en cours d’audit d’étape auprès de nos inspecteurs techniques.',
        'logo': 'assets/img/company-logo-12.svg',
        'statutCertification': 'en_verification',
        'score': 76,
        'certificatId': None,
        'codeCertificat': None,
        'dateCertification': None,
        'dateExpiration': None,
        'niveau': 'En cours',
        'piliers': {'admin': 82, 'fin': 76, 'tech': 74, 'ref': 75, 'rh': 72},
        'specialites': ['Réseaux mixtes', 'Éclairage public solaire', 'Postes de transformation']
    },
    {
        'id': 'agt_013',
        'userId': None,
        'raisonSociale': 'Sogecam Génie Urbain',
        'formeJuridique': 'SARL',
        'rccm': 'RC/BDA/2018/B/211',
        'niu': 'M071800045120N',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Terrassement', 'Voirie'],
        'ville': 'Bamenda',
        'region': 'Nord-Ouest',
        'adresse': 'Commercial Avenue, Bamenda',
        'anneeCreation': 2018,
        'effectif': 12,
        'caMoyen3ans': 190000000,
        'siteWeb': 'www.sogecam-urban.cm',
        'description': 'Dossier rejeté suite à anomalie sur les liasses fiscales et absence d’engins déclarés lors du contrôle terrain.',
        'logo': 'assets/img/company-logo-13.svg',
        'statutCertification': 'rejete',
        'score': 34,
        'certificatId': None,
        'codeCertificat': None,
        'dateCertification': None,
        'dateExpiration': None,
        'niveau': 'Rejeté',
        'piliers': {'admin': 35, 'fin': 30, 'tech': 35, 'ref': 40, 'rh': 30},
        'specialites': ['Pistes', 'Curage de fossés']
    },
    {
        'id': 'agt_014',
        'userId': None,
        'raisonSociale': 'Panafricaine de Terrassement',
        'formeJuridique': 'SARL',
        'rccm': 'RC/BTA/2015/B/041',
        'niu': 'M011500021340E',
        'secteurId': 'sec_btp',
        'sousSecteurs': ['Pistes forestières', 'Ouverture de layons', 'Terrassement'],
        'ville': 'Bertoua',
        'region': 'Est',
        'adresse': 'Carrefour Aviation, Bertoua',
        'anneeCreation': 2015,
        'effectif': 29,
        'caMoyen3ans': 510000000,
        'siteWeb': 'www.panafricaine-terrassement.cm',
        'description': 'Certificat annuel arrivé à expiration. L’entreprise doit déposer son dossier de renouvellement N+1.',
        'logo': 'assets/img/company-logo-14.svg',
        'statutCertification': 'expire',
        'score': 72,
        'certificatId': 'cert_011',
        'codeCertificat': 'SGW-2025-00088',
        'dateCertification': '2025-08-15',
        'dateExpiration': '2026-08-15',
        'niveau': 'Expiré',
        'piliers': {'admin': 75, 'fin': 70, 'tech': 74, 'ref': 72, 'rh': 68},
        'specialites': ['Layons forestiers', 'Ponts en grumes', 'Buses métalliques']
    }
]

# 6. Projects / Marchés (8 projects)
data['projects'] = [
    {
        'id': 'prj_001',
        'principalId': 'prc_001',
        'organisation': 'Mairie de Bafoussam',
        'titre': 'Réhabilitation et bitumage de la voirie urbaine de Bafoussam (Tronçon Rond-Point BIAO - Marché A)',
        'reference': 'DAO-004/C-BFM/CIPM/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Voirie urbaine & Drainage',
        'description': 'Travaux de terrassement, pose d’enrobé dense à chaud (5 cm), construction de caniveaux maçonnés trapézoïdaux de 1,20 m et mise en place de lampadaires solaires sur 4,2 kilomètres.',
        'budgetFCFA': 480000000,
        'delaiMois': 8,
        'region': 'Ouest',
        'ville': 'Bafoussam',
        'datePublication': '2026-03-01',
        'dateLimite': '2026-11-28',
        'statut': 'publie',
        'exigences': {
            'caMinimum': 500000000,
            'experienceMinAns': 5,
            'nbProjetsSimilaires': 2,
            'materielRequis': [
                {'type': 'Niveleuse (puissance > 140 CV)', 'quantiteMin': 1},
                {'type': 'Compacteur vibrant double bille', 'quantiteMin': 1},
                {'type': 'Camion benne 20 m³', 'quantiteMin': 3},
                {'type': 'Pelle hydraulique sur chenilles', 'quantiteMin': 1}
            ],
            'personnelCle': [
                'Ingénieur de génie civil (Chef de mission, > 8 ans)',
                'Conducteur de travaux routiers (> 5 ans)',
                'Topographe géomètre assermenté'
            ],
            'certificationMinimale': 'Argent'
        },
        'candidaturesAgentIds': ['agt_001', 'agt_005', 'agt_006'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_002',
        'principalId': 'prc_002',
        'organisation': 'Ministère des Travaux Publics (MINTP)',
        'titre': 'Construction du viaduc de franchissement de la Sanaga et aménagement des voies d’accès',
        'reference': 'APP-012/MINTP/SG/DGTI/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Ouvrages d’Art majeurs',
        'description': 'Réalisation d’un pont en béton précontraint de 280 mètres de portée, culées en béton armé sur pieux forés de 1 200 mm de diamètre, remblais d’accès et couche de roulement BBg.',
        'budgetFCFA': 2400000000,
        'delaiMois': 24,
        'region': 'Centre',
        'ville': 'Nachtigal',
        'datePublication': '2026-02-15',
        'dateLimite': '2026-12-15',
        'statut': 'publie',
        'exigences': {
            'caMinimum': 2000000000,
            'experienceMinAns': 10,
            'nbProjetsSimilaires': 3,
            'materielRequis': [
                {'type': 'Foreuse de pieux grand diamètre', 'quantiteMin': 1},
                {'type': 'Grue mobile télescopique 50T', 'quantiteMin': 1},
                {'type': 'Centrale à béton automatisée', 'quantiteMin': 1},
                {'type': 'Pelles hydrauliques lourdes', 'quantiteMin': 2}
            ],
            'personnelCle': [
                'Directeur de projet (Ingénieur ponts et chaussées > 15 ans)',
                'Ingénieur structure béton précontraint',
                'Responsable QSE / Sécurité environnementale'
            ],
            'certificationMinimale': 'Or'
        },
        'candidaturesAgentIds': ['agt_004', 'agt_003'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_003',
        'principalId': 'prc_002',
        'organisation': 'Ministère des Travaux Publics (MINTP)',
        'titre': 'Aménagement de la plateforme multimodale de stockage et desserte ferroviaire du port de Kribi',
        'reference': 'DAO-028/MINTP/PAK/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Infrastructures logistiques',
        'budgetFCFA': 1150000000,
        'delaiMois': 14,
        'region': 'Sud',
        'ville': 'Kribi',
        'datePublication': '2026-01-20',
        'dateLimite': '2026-10-30',
        'statut': 'en_evaluation',
        'exigences': {
            'caMinimum': 1000000000,
            'experienceMinAns': 6,
            'nbProjetsSimilaires': 2,
            'materielRequis': [
                {'type': 'Finisseur d’enrobé grande largeur', 'quantiteMin': 1},
                {'type': 'Compacteurs mixtes pneu/acier', 'quantiteMin': 2},
                {'type': 'Bulldozer D7 ou équivalent', 'quantiteMin': 1}
            ],
            'personnelCle': [
                'Chef de projet BTP (> 10 ans)',
                'Géotechnicien d’essais de sol'
            ],
            'certificationMinimale': 'Or'
        },
        'candidaturesAgentIds': ['agt_001', 'agt_003'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_004',
        'principalId': 'prc_001',
        'organisation': 'Mairie de Bafoussam',
        'titre': 'Construction d’une école primaire publique à 6 salles de classe, bloc administratif et latrines',
        'reference': 'DAO-009/C-BFM/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Bâtiments éducatifs',
        'budgetFCFA': 95000000,
        'delaiMois': 5,
        'region': 'Ouest',
        'ville': 'Bafoussam',
        'datePublication': '2026-03-10',
        'dateLimite': '2026-11-15',
        'statut': 'publie',
        'exigences': {
            'caMinimum': 80000000,
            'experienceMinAns': 3,
            'nbProjetsSimilaires': 1,
            'materielRequis': [
                {'type': 'Bétonnière thermique 500L', 'quantiteMin': 2},
                {'type': 'Vibreurs à béton', 'quantiteMin': 3},
                {'type': 'Camion de transport benne 10 m³', 'quantiteMin': 1}
            ],
            'personnelCle': [
                'Conducteur de travaux bâtiment (> 4 ans)',
                'Chef de chantier maçonnerie'
            ],
            'certificationMinimale': 'Bronze'
        },
        'candidaturesAgentIds': ['agt_005', 'agt_008', 'agt_009'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_005',
        'principalId': 'prc_002',
        'organisation': 'Ministère des Travaux Publics (MINTP)',
        'titre': 'Travaux de reprofilage lourd et bitumage de l’axe régional Bandjoun - Baham (12 km)',
        'reference': 'DAO-055/MINTP/DR-OU/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Routes régionales',
        'budgetFCFA': 820000000,
        'delaiMois': 12,
        'region': 'Ouest',
        'ville': 'Bandjoun',
        'datePublication': '2026-02-28',
        'dateLimite': '2026-11-30',
        'statut': 'publie',
        'exigences': {
            'caMinimum': 600000000,
            'experienceMinAns': 5,
            'nbProjetsSimilaires': 2,
            'materielRequis': [
                {'type': 'Niveleuse avec ripper', 'quantiteMin': 1},
                {'type': 'Pelle 20T', 'quantiteMin': 1},
                {'type': 'Camions bennes 15T', 'quantiteMin': 4}
            ],
            'personnelCle': [
                'Ingénieur des travaux publics (> 7 ans)',
                'Topographe'
            ],
            'certificationMinimale': 'Argent'
        },
        'candidaturesAgentIds': ['agt_001', 'agt_005'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_006',
        'principalId': 'prc_003',
        'organisation': 'Société Nationale de Raffinage (SONARA)',
        'titre': 'Extension et renforcement du réseau de drainage pluvial et déshuileurs de la raffinerie',
        'reference': 'DAO-SON-2025-081',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Ouvrages industriels & Assainissement',
        'budgetFCFA': 340000000,
        'delaiMois': 6,
        'region': 'Sud-Ouest',
        'ville': 'Limbe',
        'datePublication': '2025-10-10',
        'dateLimite': '2026-01-15',
        'statut': 'attribue',
        'exigences': {
            'caMinimum': 400000000,
            'experienceMinAns': 5,
            'nbProjetsSimilaires': 2,
            'materielRequis': [
                {'type': 'Pelle à rayon court', 'quantiteMin': 1},
                {'type': 'Pompes d’épuisement gros débit', 'quantiteMin': 2}
            ],
            'personnelCle': [
                'Ingénieur civil assainissement',
                'Superviseur HSE certifié'
            ],
            'certificationMinimale': 'Argent'
        },
        'candidaturesAgentIds': ['agt_001', 'agt_006'],
        'agentChoisiId': 'agt_001'
    },
    {
        'id': 'prj_007',
        'principalId': 'prc_002',
        'organisation': 'Ministère des Travaux Publics (MINTP)',
        'titre': 'Construction du Centre Médical d’Arrondissement (CMA) de Garoua-Boulai et logement d’astreinte',
        'reference': 'DAO-077/MINTP/MINSANTE/2026',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Équipements sanitaires',
        'budgetFCFA': 185000000,
        'delaiMois': 7,
        'region': 'Est',
        'ville': 'Garoua-Boulai',
        'datePublication': '2026-03-12',
        'dateLimite': '2026-12-01',
        'statut': 'publie',
        'exigences': {
            'caMinimum': 150000000,
            'experienceMinAns': 4,
            'nbProjetsSimilaires': 1,
            'materielRequis': [
                {'type': 'Bétonnière 350L', 'quantiteMin': 2},
                {'type': 'Camion benne', 'quantiteMin': 1}
            ],
            'personnelCle': [
                'Architecte ou Ingénieur BTP'
            ],
            'certificationMinimale': 'Bronze'
        },
        'candidaturesAgentIds': ['agt_008', 'agt_010'],
        'agentChoisiId': None
    },
    {
        'id': 'prj_008',
        'principalId': 'prc_001',
        'organisation': 'Mairie de Bafoussam',
        'titre': 'Aménagement paysager des berges de la rivière Noun et promenade piétonne',
        'reference': 'DAO-014/C-BFM/2026-B',
        'secteurId': 'sec_btp',
        'sousSecteur': 'Aménagement urbain',
        'budgetFCFA': 650000000,
        'delaiMois': 10,
        'region': 'Ouest',
        'ville': 'Bafoussam',
        'datePublication': '2026-03-20',
        'dateLimite': '2027-01-30',
        'statut': 'brouillon',
        'exigences': {
            'caMinimum': 500000000,
            'experienceMinAns': 5,
            'nbProjetsSimilaires': 2,
            'materielRequis': [],
            'personnelCle': [],
            'certificationMinimale': 'Argent'
        },
        'candidaturesAgentIds': [],
        'agentChoisiId': None
    }
]

# 7. Dossiers (25 dossiers with various statuses)
data['dossiers'] = [
    {
        'id': 'dos_001',
        'agentId': 'agt_001',
        'secteurId': 'sec_btp',
        'formVersion': 1,
        'statut': 'certifie',
        'affecteAAuditeurId': 'usr_auditeur1',
        'scoreProvisoire': 92,
        'creeLe': '2026-01-10',
        'soumisLe': '2026-01-15',
        'historique': [
            {'date': '2026-01-10', 'acteur': 'Jean-Marc Kamdem', 'action': 'Création du brouillon', 'commentaire': 'Dépôt des premiers éléments administratifs'},
            {'date': '2026-01-15', 'acteur': 'Jean-Marc Kamdem', 'action': 'Soumission du dossier', 'commentaire': 'Dossier complet et certifié sur l’honneur'},
            {'date': '2026-01-18', 'acteur': 'Admin signw', 'action': 'Affectation auditeur', 'commentaire': 'Affecté à Alain Nkoulou (SLA 15j)'},
            {'date': '2026-02-05', 'acteur': 'Alain Nkoulou', 'action': 'Avis d’audit favorable', 'commentaire': 'Toutes pièces conformes, parc d’engins audité et vérifié'},
            {'date': '2026-02-14', 'acteur': 'Admin signw', 'action': 'Certification délivrée', 'commentaire': 'Validation finale décision 4 yeux : Niveau Or (92/100)'}
        ]
    },
    {
        'id': 'dos_002',
        'agentId': 'agt_002',
        'secteurId': 'sec_btp',
        'formVersion': 1,
        'statut': 'pieces_incompletes',  # Key for Demo Step 2!
        'affecteAAuditeurId': 'usr_auditeur1',
        'scoreProvisoire': 68,
        'creeLe': '2026-02-10',
        'soumisLe': '2026-02-18',
        'historique': [
            {'date': '2026-02-10', 'acteur': 'Ousmanou Bello', 'action': 'Création du dossier', 'commentaire': 'Saisie initiale des engins et références'},
            {'date': '2026-02-18', 'acteur': 'Ousmanou Bello', 'action': 'Soumission', 'commentaire': 'Dossier transmis pour vérification'},
            {'date': '2026-02-20', 'acteur': 'Admin signw', 'action': 'Affectation auditeur', 'commentaire': 'Affecté à Alain Nkoulou'},
            {'date': '2026-03-02', 'acteur': 'Alain Nkoulou', 'action': 'Demande de complément', 'commentaire': 'L’attestation de non-faillite déposée date de 2024 et est périmée. Merci de fournir un document du tribunal de moins de 3 mois.'}
        ]
    },
    {
        'id': 'dos_003',
        'agentId': 'agt_003',
        'secteurId': 'sec_btp',
        'formVersion': 1,
        'statut': 'certifie',
        'affecteAAuditeurId': 'usr_auditeur2',
        'scoreProvisoire': 88,
        'creeLe': '2025-12-01',
        'soumisLe': '2025-12-10',
        'historique': [
            {'date': '2025-12-10', 'acteur': 'Pierre Owona', 'action': 'Soumission', 'commentaire': 'Transmission du dossier'},
            {'date': '2026-01-20', 'acteur': 'Admin signw', 'action': 'Certification délivrée', 'commentaire': 'Attribution Niveau Or'}
        ]
    },
    {
        'id': 'dos_012',
        'agentId': 'agt_012',
        'secteurId': 'sec_btp',
        'formVersion': 1,
        'statut': 'en_verification',
        'affecteAAuditeurId': 'usr_auditeur1',
        'scoreProvisoire': 76,
        'creeLe': '2026-03-01',
        'soumisLe': '2026-03-08',
        'historique': [
            {'date': '2026-03-08', 'acteur': 'Vanguard BTP', 'action': 'Soumission', 'commentaire': 'Demande de renouvellement de qualification'},
            {'date': '2026-03-10', 'acteur': 'Admin signw', 'action': 'Affectation', 'commentaire': 'Affecté à A. Nkoulou'}
        ]
    },
    {
        'id': 'dos_013',
        'agentId': 'agt_013',
        'secteurId': 'sec_btp',
        'formVersion': 1,
        'statut': 'rejete',
        'affecteAAuditeurId': 'usr_auditeur2',
        'scoreProvisoire': 34,
        'creeLe': '2025-10-10',
        'soumisLe': '2025-10-25',
        'historique': [
            {'date': '2025-11-15', 'acteur': 'Sophie Fotso', 'action': 'Avis de rejet', 'commentaire': 'Non concordance fiscale grave'},
            {'date': '2025-11-20', 'acteur': 'Admin signw', 'action': 'Rejet officiel', 'commentaire': 'Dossier rejeté pour déclaration infondée'}
        ]
    }
]

# Generate other dossiers (to reach 25+)
for i in range(4, 26):
    did = f'dos_{i:03d}'
    if any(d['id'] == did for d in data['dossiers']):
        continue
    agt_idx = ((i - 1) % 14) + 1
    agt_id = f'agt_{agt_idx:03d}'
    st = 'certifie' if i % 2 == 0 else ('en_verification' if i % 3 == 0 else 'soumis')
    data['dossiers'].append({
        'id': did,
        'agentId': agt_id,
        'secteurId': 'sec_btp' if i % 4 != 0 else 'sec_energie',
        'formVersion': 1,
        'statut': st,
        'affecteAAuditeurId': 'usr_auditeur1' if i % 2 == 0 else 'usr_auditeur2',
        'scoreProvisoire': 65 + (i * 2) % 30,
        'creeLe': f'2026-0{(i%3)+1}-{(i%25)+1:02d}',
        'soumisLe': f'2026-0{(i%3)+1}-{(i%25)+2:02d}',
        'historique': [
            {'date': f'2026-0{(i%3)+1}-05', 'acteur': 'Agent', 'action': 'Soumission initiale', 'commentaire': 'Dossier standard'}
        ]
    })

# 8. Pieces (60+ pieces)
data['pieces'] = [
    # Pieces for dos_001 (BatiPlus) - all validated
    {'id': 'pie_001', 'dossierId': 'dos_001', 'champId': 'f_rccm_doc', 'nomFichier': 'RCCM_BatiPlus_certifie.pdf', 'typeMime': 'application/pdf', 'tailleKo': 1420, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'Extrait conforme délivré par le greffe du TPI de Douala.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-22'},
    {'id': 'pie_002', 'dossierId': 'dos_001', 'champId': 'f_quitus', 'nomFichier': 'Quitus_Fiscal_DGI_2026.pdf', 'typeMime': 'application/pdf', 'tailleKo': 890, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'Quitus régulier à jour des impôts d’octobre 2025 à décembre 2025.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-22'},
    {'id': 'pie_003', 'dossierId': 'dos_001', 'champId': 'f_faillite', 'nomFichier': 'Non_Faillite_Douala_2026.pdf', 'typeMime': 'application/pdf', 'tailleKo': 640, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'Attestation conforme datée du 05/01/2026.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-22'},
    {'id': 'pie_004', 'dossierId': 'dos_001', 'champId': 'f_bilan_3ans', 'nomFichier': 'Bilans_Certifies_2023_2025.pdf', 'typeMime': 'application/pdf', 'tailleKo': 4800, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'Bilan certifié avec visa ONECCA.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-25'},
    {'id': 'pie_005', 'dossierId': 'dos_001', 'champId': 'f_attest_banque', 'nomFichier': 'Attestation_Solvabilite_Afriland.pdf', 'typeMime': 'application/pdf', 'tailleKo': 710, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'Ligne de crédit confirmée à hauteur de 500M FCFA.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-25'},
    {'id': 'pie_006', 'dossierId': 'dos_001', 'champId': 'f_pv_reception', 'nomFichier': 'PV_Reception_Route_Deido.pdf', 'typeMime': 'application/pdf', 'tailleKo': 2300, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': 'PV signé par le Délégué Régional MINTP Littoral.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-28'},
    {'id': 'pie_007', 'dossierId': 'dos_001', 'champId': 'f_cv_diplomes', 'nomFichier': 'Dossier_Personnel_Cadres_BatiPlus.pdf', 'typeMime': 'application/pdf', 'tailleKo': 3100, 'deposeeLe': '2026-01-14', 'statutPiece': 'validee', 'commentaireAuditeur': '2 Ingénieurs inscrits à l’ONIGC vérifiés.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-01-28'},

    # Pieces for dos_002 (Sahel Travaux - Demo 2 scenario: pieces_incompletes!)
    {'id': 'pie_010', 'dossierId': 'dos_002', 'champId': 'f_rccm_doc', 'nomFichier': 'RCCM_Sahel_Garoua.pdf', 'typeMime': 'application/pdf', 'tailleKo': 1100, 'deposeeLe': '2026-02-18', 'statutPiece': 'validee', 'commentaireAuditeur': 'Registre du commerce de Garoua régulier.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-02-28'},
    {'id': 'pie_011', 'dossierId': 'dos_002', 'champId': 'f_quitus', 'nomFichier': 'Quitus_Fiscal_Garoua_2026.pdf', 'typeMime': 'application/pdf', 'tailleKo': 820, 'deposeeLe': '2026-02-18', 'statutPiece': 'validee', 'commentaireAuditeur': 'Attestation des impôts conforme.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-02-28'},
    {'id': 'pie_012', 'dossierId': 'dos_002', 'champId': 'f_faillite', 'nomFichier': 'Attestation_Non_Faillite_2024_expiree.pdf', 'typeMime': 'application/pdf', 'tailleKo': 590, 'deposeeLe': '2026-02-18', 'statutPiece': 'rejetee', 'commentaireAuditeur': 'Attestation de non-faillite expirée depuis le 03/06/2024 — merci de fournir une version à jour délivrée par le greffe du TPI de Garoua.', 'niveauRisque': 'eleve', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-03-02'},
    {'id': 'pie_013', 'dossierId': 'dos_002', 'champId': 'f_bilan_3ans', 'nomFichier': 'Bilans_Sahel_2023_2025.pdf', 'typeMime': 'application/pdf', 'tailleKo': 3400, 'deposeeLe': '2026-02-18', 'statutPiece': 'validee', 'commentaireAuditeur': 'Chiffre d’affaires vérifié à 780M FCFA.', 'niveauRisque': 'moyen', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-03-02'},
    {'id': 'pie_014', 'dossierId': 'dos_002', 'champId': 'f_depot_photos', 'nomFichier': 'Parc_Engins_Photos_Garoua.pdf', 'typeMime': 'application/pdf', 'tailleKo': 6200, 'deposeeLe': '2026-02-18', 'statutPiece': 'complement_demande', 'commentaireAuditeur': 'Photos du parc floues. Merci de joindre les cartes grises des 2 camions bennes déclarés.', 'niveauRisque': 'moyen', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-03-02'},

    # Pieces for dos_012 (Vanguard BTP - in progress audit workstation)
    {'id': 'pie_020', 'dossierId': 'dos_012', 'champId': 'f_rccm_doc', 'nomFichier': 'Kbis_Vanguard_2026.pdf', 'typeMime': 'application/pdf', 'tailleKo': 1250, 'deposeeLe': '2026-03-08', 'statutPiece': 'en_verification', 'commentaireAuditeur': None, 'niveauRisque': 'faible', 'verifieePar': None, 'verifieeLe': None},
    {'id': 'pie_021', 'dossierId': 'dos_012', 'champId': 'f_quitus', 'nomFichier': 'Quitus_DGI_Yaounde_2026.pdf', 'typeMime': 'application/pdf', 'tailleKo': 940, 'deposeeLe': '2026-03-08', 'statutPiece': 'validee', 'commentaireAuditeur': 'Vérifié auprès du centre divisionnaire Yaoundé.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-03-12'},
    {'id': 'pie_022', 'dossierId': 'dos_012', 'champId': 'f_faillite', 'nomFichier': 'NonFaillite_TPI_Mfoundi.pdf', 'typeMime': 'application/pdf', 'tailleKo': 610, 'deposeeLe': '2026-03-08', 'statutPiece': 'en_verification', 'commentaireAuditeur': None, 'niveauRisque': 'faible', 'verifieePar': None, 'verifieeLe': None},
    {'id': 'pie_023', 'dossierId': 'dos_012', 'champId': 'f_bilan_3ans', 'nomFichier': 'Liasse_Fiscale_2025_ONECCA.pdf', 'typeMime': 'application/pdf', 'tailleKo': 4100, 'deposeeLe': '2026-03-08', 'statutPiece': 'validee', 'commentaireAuditeur': 'Bilan régulier.', 'niveauRisque': 'faible', 'verifieePar': 'Alain Nkoulou', 'verifieeLe': '2026-03-12'},
    {'id': 'pie_024', 'dossierId': 'dos_012', 'champId': 'f_pv_reception', 'nomFichier': 'PV_Reception_Ligne_MT_Obala.pdf', 'typeMime': 'application/pdf', 'tailleKo': 2800, 'deposeeLe': '2026-03-08', 'statutPiece': 'en_verification', 'commentaireAuditeur': None, 'niveauRisque': 'faible', 'verifieePar': None, 'verifieeLe': None}
]

# Generate more pieces to easily surpass 60 pieces
p_id_counter = 30
for d in data['dossiers']:
    if d['id'] in ['dos_001', 'dos_002', 'dos_012']:
        continue
    # add 2-3 pieces per dossier
    for champ_id, fname, pstatus in [
        ('f_rccm_doc', 'Extrait_RCCM_Officiel.pdf', 'validee' if d['statut'] == 'certifie' else 'en_verification'),
        ('f_quitus', 'Quitus_Fiscal_Certifie.pdf', 'validee' if d['statut'] == 'certifie' else 'en_verification'),
        ('f_bilan_3ans', 'Bilans_Comptables_Certifies.pdf', 'validee' if d['statut'] == 'certifie' else 'a_fournir')
    ]:
        p_id_counter += 1
        data['pieces'].append({
            'id': f'pie_{p_id_counter:03d}',
            'dossierId': d['id'],
            'champId': champ_id,
            'nomFichier': fname,
            'typeMime': 'application/pdf',
            'tailleKo': 1200 + (p_id_counter * 37) % 3000,
            'deposeeLe': d['soumisLe'],
            'statutPiece': pstatus,
            'commentaireAuditeur': 'Pièce conforme contrôlée sur l’original.' if pstatus == 'validee' else '',
            'niveauRisque': 'faible',
            'verifieePar': 'Alain Nkoulou' if p_id_counter % 2 == 0 else 'Sophie Fotso',
            'verifieeLe': '2026-02-15' if pstatus == 'validee' else None
        })

# 9. Certifications
data['certifications'] = [
    {
        'id': 'cert_001',
        'agentId': 'agt_001',
        'dossierId': 'dos_001',
        'code': 'SGW-2026-00481',
        'niveau': 'Or',
        'score': 92,
        'delivreeLe': '2026-02-14',
        'expireLe': '2027-02-14',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw & Commission d’Audit'
    },
    {
        'id': 'cert_002',
        'agentId': 'agt_003',
        'dossierId': 'dos_003',
        'code': 'SGW-2026-00312',
        'niveau': 'Or',
        'score': 88,
        'delivreeLe': '2026-01-20',
        'expireLe': '2027-01-20',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_003',
        'agentId': 'agt_004',
        'dossierId': 'dos_004',
        'code': 'SGW-2025-00109',
        'niveau': 'Or',
        'score': 95,
        'delivreeLe': '2025-11-15',
        'expireLe': '2026-11-15',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_004',
        'agentId': 'agt_005',
        'dossierId': 'dos_005',
        'code': 'SGW-2026-00405',
        'niveau': 'Argent',
        'score': 79,
        'delivreeLe': '2026-02-02',
        'expireLe': '2027-02-02',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_005',
        'agentId': 'agt_006',
        'dossierId': 'dos_006',
        'code': 'SGW-2026-00388',
        'niveau': 'Argent',
        'score': 74,
        'delivreeLe': '2026-01-28',
        'expireLe': '2027-01-28',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_006',
        'agentId': 'agt_007',
        'dossierId': 'dos_007',
        'code': 'SGW-2026-00431',
        'niveau': 'Argent',
        'score': 71,
        'delivreeLe': '2026-02-10',
        'expireLe': '2027-02-10',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_007',
        'agentId': 'agt_008',
        'dossierId': 'dos_008',
        'code': 'SGW-2026-00299',
        'niveau': 'Bronze',
        'score': 63,
        'delivreeLe': '2026-01-12',
        'expireLe': '2027-01-12',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_008',
        'agentId': 'agt_009',
        'dossierId': 'dos_009',
        'code': 'SGW-2026-00215',
        'niveau': 'Bronze',
        'score': 58,
        'delivreeLe': '2026-01-05',
        'expireLe': '2027-01-05',
        'reserves': [],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_009',
        'agentId': 'agt_010',
        'dossierId': 'dos_010',
        'code': 'SGW-2026-00502',
        'niveau': 'Avec réserves',
        'score': 66,
        'delivreeLe': '2026-03-01',
        'expireLe': '2027-03-01',
        'reserves': ['Attestation bancaire provisionnelle limitée à 200M FCFA', 'Parc de camions bennes partiellement loué'],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_010',
        'agentId': 'agt_011',
        'dossierId': 'dos_011',
        'code': 'SGW-2026-00467',
        'niveau': 'Avec réserves',
        'score': 61,
        'delivreeLe': '2026-02-20',
        'expireLe': '2027-02-20',
        'reserves': ['Agrément classe 3 en cours de renouvellement au MINTP'],
        'statut': 'active',
        'signataire': 'Super Administrateur signw'
    },
    {
        'id': 'cert_011',
        'agentId': 'agt_014',
        'dossierId': 'dos_014',
        'code': 'SGW-2025-00088',
        'niveau': 'Expiré',
        'score': 72,
        'delivreeLe': '2025-08-15',
        'expireLe': '2026-08-15',
        'reserves': [],
        'statut': 'expiree',
        'signataire': 'Super Administrateur signw'
    }
]

# 10. Parameters (barème piliers, seuils, SLA)
data['parameters'] = {
    'baremePiliers': {
        'admin': 20,
        'fin': 25,
        'tech': 25,
        'ref': 20,
        'rh': 10
    },
    'seuils': {
        'or': 85,
        'argent': 70,
        'bronze': 55
    },
    'dureeValiditeMois': 12,
    'slaAuditJoursOuvres': 15,
    'notificationEmailActif': True,
    'deviseDefaut': 'FCFA'
}

# 11. Journal (audit log)
data['journal'] = [
    {'id': 'log_001', 'date': '2026-03-12 14:32', 'acteur': 'Super Administrateur signw', 'action': 'Publication barème', 'cible': 'Paramètres Système', 'details': 'Mise à jour des seuils de certification Niveaux Or/Argent/Bronze.'},
    {'id': 'log_002', 'date': '2026-03-10 11:15', 'acteur': 'Alain Nkoulou', 'action': 'Audit pièce', 'cible': 'Dossier dos_012 (Vanguard)', 'details': 'Validation du quitus fiscal et liasses comptables.'},
    {'id': 'log_003', 'date': '2026-03-02 09:40', 'acteur': 'Alain Nkoulou', 'action': 'Rejet pièce', 'cible': 'Dossier dos_002 (Sahel Travaux)', 'details': 'Rejet attestation de non-faillite périmée avec notification à l’agent.'},
    {'id': 'log_004', 'date': '2026-02-14 16:00', 'acteur': 'Super Administrateur signw', 'action': 'Décision certification', 'cible': 'BâtiPlus SARL', 'details': 'Attribution certificat SGW-2026-00481 (Niveau Or, score 92/100).'},
    {'id': 'log_005', 'date': '2026-01-20 10:10', 'acteur': 'Sophie Fotso', 'action': 'Audit pièce', 'cible': 'Dossier dos_003 (Omnium BTP)', 'details': 'Contrôle physique des engins lourds et rapport positif.'}
]

# 12. Notifications
data['notifications'] = [
    {'id': 'notif_001', 'userId': 'usr_agent2', 'type': 'alerte', 'texte': 'Action requise : une pièce a été rejetée sur votre dossier BTP (Attestation de non-faillite).', 'lien': 'app/agent/dossier.html?id=dos_002', 'lue': False, 'creeeLe': '2026-03-02'},
    {'id': 'notif_002', 'userId': 'usr_agent1', 'type': 'succes', 'texte': 'Félicitations ! Votre certificat SGW-2026-00481 est actif (Niveau Or).', 'lien': 'app/agent/certificats.html', 'lue': True, 'creeeLe': '2026-02-14'},
    {'id': 'notif_003', 'userId': 'usr_principal1', 'type': 'info', 'texte': '3 agents certifiés ont candidaté à votre marché de réhabilitation de la voirie.', 'lien': 'marche-detail.html?id=prj_001', 'lue': False, 'creeeLe': '2026-03-05'},
    {'id': 'notif_004', 'userId': 'usr_auditeur1', 'type': 'info', 'texte': 'Nouveau dossier affecté : Vanguard BTP & Énergie (SLA restant : 11 jours).', 'lien': 'app/auditeur/audit.html?id=dos_012', 'lue': False, 'creeeLe': '2026-03-10'}
]

# 13. Messages
data['messages'] = [
    {'id': 'msg_001', 'fromUserId': 'usr_auditeur1', 'toUserId': 'usr_agent2', 'dossierId': 'dos_002', 'texte': 'Bonjour M. Bello, nous constatons que votre attestation de non-faillite date de juin 2024. Le règlement exige une pièce de moins de 3 mois délivrée par le greffe du TPI. Merci de régulariser pour finaliser l’audit.', 'envoyeLe': '2026-03-02 09:42', 'lu': True},
    {'id': 'msg_002', 'fromUserId': 'usr_agent2', 'toUserId': 'usr_auditeur1', 'dossierId': 'dos_002', 'texte': 'Bonjour M. Nkoulou, bien reçu. Notre coursier a déposé la demande au greffe de Garoua ce matin, nous téléversons la nouvelle pièce dès cet après-midi.', 'envoyeLe': '2026-03-02 11:20', 'lu': True}
]

# Write to js/data/seed.js as window.SIGNW_SEED
js_content = "/**\n * SIGNW — Base de données initiale (Seed)\n * 100% Hors ligne - Contexte Cameroun\n */\nwindow.SIGNW_SEED = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"

with open('js/data/seed.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Full seed generated successfully in js/data/seed.js')
