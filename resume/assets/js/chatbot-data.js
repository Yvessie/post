/* ==========================================================
   SAPHIRE — BASE DE CONNAISSANCES SUR HARRY YVES
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

  /* ===== ✅ CENTRES D'INTÉRÊT (ENRICHIS) ===== */
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
  }
};