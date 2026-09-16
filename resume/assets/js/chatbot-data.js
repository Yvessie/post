/* ==========================================================
   SAPHIRE — BASE DE CONNAISSANCES SUR HARRY YVES
   Version complète avec diplômes, certifications, dates
   ========================================================== */

window.HARRY_KB = {
  /* ===== IDENTITÉ ===== */
  identite: {
    nom: 'RAKOTONIAINA Harry Yves',
    poste: 'Technicien Support IT & Développeur FullStack',
    localisation: 'Antananarivo, Madagascar',
    disponibilite: 'Disponible pour une mobilité internationale',
    experience: '4 ans d\'expérience en IT support et développement',
    langue_parlee: 'Français, Anglais (intermédiaire), Allemand (A2 en cours), Malagasy (natif)'
  },

  /* ===== CONTACT ===== */
  contact: {
    email: 'rakotoniainaharryyves@gmail.com',
    whatsapp: '+261 33 52 477 04',
    whatsapp_lien: 'https://wa.me/261335247704',
    linkedin: 'linkedin.com/in/rakotoniaina-harry-yves-840ab4223',
    gitlab: 'gitlab.com/harsdev1',
    credly: 'credly.com/users/rakotoniaina-harry-yves/badges/credly',
    messenger: 'm.me/HarrysHRak'
  },

  /* ===== CV ===== */
  cv: {
    versions: [
      { lang: 'Français', fichier: 'HARRY YVES RAKOTONIAINA-Fr.pdf' },
      { lang: 'Français (avec photo)', fichier: 'HARRY YVES RAKOTONIAINA-Fr_bild.pdf' },
      { lang: 'Anglais', fichier: 'HARRY YVES RAKOTONIAINA-EN.pdf' }
    ]
  },

  /* ===== COMPÉTENCES ===== */
  competences_support: [
    'Windows / Linux',
    'Gestion des tickets (GLPI)',
    'Maintenance et déploiement des postes de travail',
    'Support utilisateurs & gestion des incidents',
    'Gestion Active Directory',
    'Administration Microsoft 365',
    'Virtualisation : Proxmox, VMware',
    'Réseaux : TCP/IP, DHCP, DNS, LAN'
  ],

  competences_applicatifs: {
    bases_donnees: ['SQL Server', 'Informix', 'PostgreSQL'],
    langages: ['HTML5', 'CSS3', 'JavaScript', 'React.js', '.NET C#', 'Python', 'Django', 'Flask'],
    outils: ['Git', 'Bash', 'PowerShell']
  },

  techno_dev: {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vue.js', 'Bootstrap'],
    backend: ['.NET C#', 'Python', 'Django', 'Flask', 'Symfony (PHP)'],
    bdd: ['SQL Server', 'PostgreSQL', 'Informix'],
    outils: ['Git', 'GitLab']
  },

  techno_support: {
    os: ['Windows 10/11', 'Windows Server', 'Linux (Ubuntu, Debian)'],
    gestion: ['Active Directory', 'GLPI', 'Microsoft 365', 'GPO'],
    virtualisation: ['Proxmox', 'VMware'],
    reseaux: ['TCP/IP', 'DHCP', 'DNS', 'LAN', 'Wi-Fi'],
    outils: ['TeamViewer', 'AnyDesk', 'PowerShell', 'Bash']
  },

  /* ===== EXPÉRIENCES ===== */
  experiences: [
    {
      titre: 'Stagiaire S.I : Développeur FullStack',
      entreprise: 'Ravinala Airports International',
      date: 'Mars 2026 - Aujourd\'hui',
      actuel: true,
      details: [
        'Développement d\'une application RH (.NET, React, SQL Server, Git)',
        'Participation à la mise en production V2.0',
        'Correction de sécurité et nouvelles fonctionnalités'
      ]
    },
    {
      titre: 'Support utilisateurs (Freelance)',
      entreprise: 'Freelance',
      date: 'Juillet 2025 - Février 2026',
      actuel: false,
      details: ['Assistant technique spécifique', 'Support via TeamViewer et AnyDesk']
    },
    {
      titre: 'Chargé de Support IT et de la Télécompensation',
      entreprise: 'BGFIBank Madagascar',
      date: 'Avril 2024 - Mars 2025',
      actuel: false,
      details: [
        'Support utilisateurs quotidien',
        'Administration Active Directory et Microsoft 365',
        'Configuration imprimantes et déploiement postes',
        'Gestion d\'incidents et tickets',
        'Support Applicatif : virements multiples, Amplitude Bank, annuaire bancaire, serveurs Windows Server'
      ]
    },
    {
      titre: 'Assistant IT',
      entreprise: 'Mada-Marketing Call-Center',
      date: 'Novembre 2022 - Février 2023',
      actuel: false,
      details: ['Support utilisateurs', 'Déploiement postes', 'Maintenance équipements']
    },
    {
      titre: 'Support IT (Freelance)',
      entreprise: 'M1Com',
      date: 'Septembre 2020 - Mars 2022',
      actuel: false,
      details: ['Maintenance équipements', 'HelpDesk Windows/imprimantes/caméras/réseau LAN']
    },
    {
      titre: 'Stagiaire IT / Développeur',
      entreprise: 'Rxl-Advisory',
      date: 'Octobre 2022 - Novembre 2022',
      actuel: false,
      details: ['Support Helpdesk', 'Développeur Symfony (PHP)']
    },
    {
      titre: 'Stagiaire S.I Développeur FullStack',
      entreprise: 'Assurance Aro',
      date: 'Avril 2022 - Juin 2022',
      actuel: false,
      details: ['Développement catalogue documents', 'Python / Django / Git / PostgreSQL']
    }
  ],

  /* ===== CERTIFICATIONS ===== */
  certifications: [
    'Cisco Network Academy : Certificat de réussite (Septembre 2026 - Aujourd\'hui)',
    'Formation Deutsch A2 — DLMZ (Octobre 2025 - Février 2026)',
    'Codefinity : Advanced Technical SQL (Novembre 2024 - Février 2025)',
    'Formation Anglais — ITTI (Janvier 2024 - Février 2024)',
    'Attestation Développement Web — ESTIIM 67Ha (2019 - 2020)'
  ],

  diplomes: [
    'Licence : Informatique Risque et Décision — ESMIA (2021 - 2023)',
    'Baccalauréat : Enseignement Général — LPR (2017 - 2018)'
  ],

  /* ===== PROJETS ===== */
  projets: [
    { nom: 'Catalogue CDI - Assurance Aro', description: 'Application web de catalogue documentaire', techno: 'Python / Django / PostgreSQL' },
    { nom: 'Annuaire bancaire - BGFIBank', description: 'Projet interne chez BGFIBank Madagascar', techno: '.NET, SQL Server' },
    { nom: 'Site web Hôtel Karthala', description: 'Site vitrine pour la présentation de l\'hôtel', techno: 'HTML/CSS/JS' },
    { nom: 'Site web Guide du Choix 2024', description: 'Projet bénévole pour une association', techno: 'Web' },
    { nom: 'Site e-commerce', description: 'Boutique en ligne conçue entre amis', techno: 'Web' },
    { nom: 'Application VINA - Ravinala Airports', description: 'Application d\'évaluation des performances RH', techno: '.NET, React, SQL Server' }
  ],

  /* ===== SERVICES ===== */
  services: [
    'Développement Web & Applications (sites vitrines, e-commerce, apps métier)',
    'Support IT (assistance à distance, helpdesk, gestion tickets)',
    'Maintenance IT (diagnostic, réparation, mise à jour)',
    'Freelance (missions ponctuelles ou long terme)'
  ],

  /* ===== LANGUES ===== */
  langues: {
    Malagasy: 'Langue maternelle',
    Français: 'Courant',
    Anglais: 'Intermédiaire',
    Allemand: 'A2 (en cours d\'apprentissage)'
  },

  /* ===== CENTRES D'INTÉRÊT ===== */
  interets: {
    tech: [
      'Nouvelles technologies & innovation',
      'Cybersécurité (Ethical Hacking, Pentest)',
      'Développement web & applications modernes',
      'Veille technologique quotidienne'
    ],
    professionnels: [
      'Cloud computing (AWS, Azure en découverte)',
      'Intelligence Artificielle & Machine Learning',
      'DevOps & automatisation',
      'Réseaux et infrastructure IT'
    ],
    personnels: [
      'Apprentissage des langues (Allemand A2 en cours)',
      'Lecture technique & documentation',
      'Partage de connaissances avec la communauté dev',
      'Résolution de problèmes complexes'
    ]
  },

  /* ===== PROFIL RECRUTEUR ===== */
  recruteur: {
    qualites: [
      'Polyvalent : aussi à l\'aise en support IT qu\'en développement',
      'Autonome et rigoureux dans la gestion des incidents',
      'Curieux et passionné par les nouvelles technologies',
      'Fiable : habitué aux environnements bancaires et aéroportuaires',
      'En constante progression (certifications Cisco en cours)',
      'Capable de s\'adapter rapidement à de nouveaux outils'
    ],
    points_forts: [
      'Double compétence : support IT + développement fullstack',
      'Expérience concrète en entreprise (BGFIBank, Ravinala Airports)',
      'Maîtrise des environnements critiques (banque, aéroport)',
      'Habitué au support utilisateurs et au travail en équipe',
      'Formation continue active (Cisco, cybersécurité, allemand)',
      'Anglais technique et mobilité internationale'
    ],
    ideal_pour: [
      'Poste de Technicien Support IT / Helpdesk N2',
      'Développeur FullStack junior ou intermédiaire',
      'Administrateur systèmes et réseaux débutant',
      'Support applicatif en environnement bancaire',
      'Mission freelance en développement ou support'
    ]
  },

  /* ===== À PROPOS DE SAPHIRE ===== */
  saphire_info: {
    nom: 'Saphire',
    type: 'Assistante virtuelle basée sur un système de règles enrichies',
    statut: 'Projet d\'IA en cours de développement',
    domaine: 'IT & Développement',
    but: 'Aider les visiteurs du portfolio à découvrir le parcours et les compétences de Harry',
    capacites: [
      'Comprendre les questions courantes sur Harry',
      'Détecter les fautes de frappe et la ponctuation manquante',
      'Répondre en 4 langues (FR / EN / DE / MG)',
      'Fournir des informations structurées sur son profil'
    ],
    limites: [
      'Répond uniquement sur le domaine IT & Dev',
      'Ne peut pas traiter des questions hors sujet',
      'S\'améliore progressivement au fur et à mesure de son développement',
      'Peut parfois demander une reformulation'
    ]
  },

  /* ===== EXEMPLES DE QUESTIONS ===== */
  exemples_questions: {
    titres: {
      fr: 'Voici quelques exemples de questions que vous pouvez me poser :',
      en: 'Here are some examples of questions you can ask me:',
      de: 'Hier sind einige Beispiele für Fragen, die Sie mir stellen können:',
      mg: 'Ireto ny ohatra amin\'ny fanontaniana azonao atao:'
    },
    liste: {
      fr: [
        'Qui est Harry Yves ?',
        'Quelles sont ses compétences techniques ?',
        'Quel est son diplôme ?',
        'Quelles entreprises a-t-il fréquentées ?',
        'Comment puis-je le contacter ?',
        'Peut-il travailler en freelance ?',
        'Quels sont ses tarifs ?',
        'Pouvez-vous me montrer ses certifications ?'
      ],
      en: [
        'Who is Harry Yves?',
        'What are his technical skills?',
        'What is his degree?',
        'Which companies has he worked for?',
        'How can I contact him?',
        'Can he work as a freelancer?',
        'What are his rates?',
        'Can you show me his certifications?'
      ],
      de: [
        'Wer ist Harry Yves?',
        'Was sind seine technischen Fähigkeiten?',
        'Was ist sein Abschluss?',
        'Bei welchen Unternehmen hat er gearbeitet?',
        'Wie kann ich ihn kontaktieren?',
        'Kann er als Freiberufler arbeiten?',
        'Was sind seine Preise?',
        'Können Sie mir seine Zertifizierungen zeigen?'
      ],
      mg: [
        'Iza i Harry Yves?',
        'Inona ny fahaizany ara-teknika?',
        'Inona ny diplaomany?',
        'Izao orinasa no niasany?',
        'Ahoana no hifandraisana aminy?',
        'Afaka miasa freelance ve izy?',
        'Ohatrinona ny vidiny?',
        'Azonao aseho ahy ve ny fanamarinany?'
      ]
    }
  },

  /* ===== ✅ DIPLÔMES DÉTAILLÉS (pour intention "diplomes") ===== */
  diplomes_detail: [
    {
      titre: 'Licence en Informatique',
      specialite: 'Risque et Décision',
      etablissement: 'ESMIA (École Supérieure de Management et de l\'Informatique Appliquée)',
      annee: '2021 - 2023',
      ville: 'Antananarivo, Madagascar'
    },
    {
      titre: 'Baccalauréat',
      specialite: 'Enseignement Général',
      etablissement: 'LPR (Lycée Privé Ranaivosoa)',
      annee: '2017 - 2018',
      ville: 'Antananarivo, Madagascar'
    }
  ],

  /* ===== ✅ CERTIFICATIONS DÉTAILLÉES (avec liens de preuve) ===== */
  certifications_detail: [
    {
      titre: 'Cisco Network Academy — Certificat de réussite',
      annee: 'Septembre 2026 - Aujourd\'hui',
      modules: [
        'Networking Basics',
        'Networking Devices and Initial Configuration',
        'Computer Hardware Basics',
        'Introduction to Cybersecurity',
        'Junior Cybersecurity Analyst Career Path',
        'Ethical Hacker',
        'Operating Systems Support',
        'IT Customer Support Basics'
      ],
      lien: 'https://www.credly.com/users/rakotoniaina-harry-yves/badges/credly'
    },
    {
      titre: 'Codefinity — Advanced Technical SQL',
      annee: 'Novembre 2024 - Février 2025',
      modules: ['SQL avancé'],
      lien: null
    },
    {
      titre: 'Formation Deutsch A2',
      annee: 'Octobre 2025 - Février 2026',
      modules: ['Allemand niveau A2'],
      lien: null,
      etablissement: 'DLMZ (Deutsch Lernen Mit Ziel)'
    },
    {
      titre: 'Formation Anglais',
      annee: 'Janvier 2024 - Février 2024',
      modules: ['Anglais général'],
      lien: null,
      etablissement: 'ITTI (Internationale TEFL/TESOL Training Institute)'
    },
    {
      titre: 'Attestation Développement Web',
      annee: '2019 - 2020',
      modules: ['Développement Web'],
      lien: null,
      etablissement: 'ESTIIM 67Ha (cecam)'
    }
  ],

  /* ===== ✅ NOMBRE D'ANNÉES D'EXPÉRIENCE ===== */
  annees_experience: {
    total: '4 ans',
    support_it: '4 ans',
    developpement: '2 ans',
    detail: 'Support IT depuis 2020 · Développement depuis 2022'
  },

  /* ===== ✅ EMPLOI PAR ANNÉE (pour questions temporelles) ===== */
  emploi_par_annee: {
    '2020': 'Support IT (Freelance) — M1Com (Septembre 2020 - Mars 2022)',
    '2021': 'Support IT (Freelance) — M1Com (Septembre 2020 - Mars 2022)',
    '2022': 'Stagiaire IT / Développeur — Rxl-Advisory (Oct. 2022 - Nov. 2022) · Stagiaire S.I Développeur FullStack — Assurance Aro (Avril 2022 - Juin 2022) · Assistant IT — Mada-Marketing (Nov. 2022 - Fév. 2023)',
    '2023': 'Assistant IT — Mada-Marketing Call-Center (Novembre 2022 - Février 2023)',
    '2024': 'Chargé de Support IT et de la Télécompensation — BGFIBank Madagascar (Avril 2024 - Mars 2025)',
    '2025': 'Chargé de Support IT et de la Télécompensation — BGFIBank Madagascar (jusqu\'à Mars 2025) · puis Support utilisateurs (Freelance) à partir de Juillet 2025',
    '2026': 'Stagiaire S.I : Développeur FullStack — Ravinala Airports International (Mars 2026 - Aujourd\'hui)'
  },

    /* ===== ✅ CV DISPONIBLES (pour le chatbot) ===== */
  cv_details: {
    versions: [
      {
        code: 'fr',
        label: 'Français',
        fichier: './HARRY YVES RAKOTONIAINA-Fr.pdf',
        flag: '🇫🇷',
        description: 'Version française sans photo'
      },
      {
        code: 'fr_photo',
        label: 'Français avec photo',
        fichier: './HARRY YVES RAKOTONIAINA-Fr_bild.pdf',
        flag: '🇫🇷',
        description: 'Version française avec photo de profil'
      },
      {
        code: 'en',
        label: 'Anglais',
        fichier: './HARRY YVES RAKOTONIAINA-EN.pdf',
        flag: '🇬🇧',
        description: 'English version'
      }
    ],
    /* Détection des mots-clés de choix de langue */
    choix_langue: {
      fr: ['francais', 'français', 'francaise', 'fr', 'french', 'franzosisch', 'frantsay'],
      fr_photo: ['photo', 'avec photo', 'picture', 'bild', 'sary', 'mitovy'],
      en: ['anglais', 'anglaise', 'en', 'english', 'englisch', 'anglisy']
    }
  }
};