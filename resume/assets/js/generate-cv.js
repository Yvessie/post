/* ==========================================================
   GÉNÉRATEUR DE CV PDF — 4 LANGUES (FR / EN / DE / MG)
   Style : Noir & Blanc, structuré et professionnel
   ========================================================== */

(function () {
  'use strict';

  /* ==========================================================
     1. DONNÉES DU CV PAR LANGUE
     ========================================================== */
  const CV_DATA = {
    fr: {
      name: 'RAKOTONIAINA Harry Yves',
      title: 'TECHNICIEN SUPPORT IT | SYSTÈMES & APPLICATIONS',
      contact: {
        phone: '+261 33 52 477 04',
        email: 'rakotoniainaharryyves@gmail.com',
        address: 'Antananarivo, Madagascar',
        availability: 'Disponible pour une mobilité internationale'
      },
      profile: {
        heading: 'PROFIL',
        text: "Technicien IT orienté support systèmes et applicatifs, avec une expérience en environnement numérique et technologique. Développement de solutions informatiques. Compétent en support utilisateurs, Active Directory, Microsoft 365, systèmes Linux, Windows, bases de données et développement applicatif. Habitué au diagnostic et à la résolution d'incidents, au déploiement des équipements et au support des applications métiers."
      },
      skills: {
        heading: 'COMPÉTENCES',
        supportTitle: 'Support & Systèmes',
        supportItems: [
          'Windows / Linux',
          'Gestion des tickets (GLPI)',
          'Maintenance et déploiement des postes',
          'Support utilisateurs & gestion des incidents',
          'Gestion Active Directory',
          'Administration Microsoft 365',
          'Virtualisation : Proxmox, VMware',
          'Réseaux : TCP/IP, DHCP, DNS, LAN'
        ],
        appsTitle: 'Applications & Bases de données',
        appsItems: [
          'Bases de données : SQL Server, Informix, PostgreSQL',
          'Développement : HTML/CSS3, JavaScript, React.js, .NET C#, Python, Django, Flask',
          'Outils : Git, Bash, PowerShell'
        ]
      },
      certifications: {
        heading: 'CERTIFICATIONS & FORMATIONS TECHNIQUES',
        ciscoTitle: 'Cisco Network Academy — Certificat de réussite (Septembre 2026 - Aujourd\'hui)',
        ciscoItems: [
          'Networking Basics',
          'Networking Devices and Initial Configuration',
          'Computer Hardware Basics',
          'Introduction to Cybersecurity',
          'Junior Cybersecurity Analyst Career Path',
          'Ethical Hacker',
          'Operating Systems Support',
          'IT Customer Support Basics'
        ],
        deutsch: 'Formation Deutsch : A2 — DLMZ (Octobre 2025 - Février 2026)',
        codefinity: 'Codefinity : Certificat de réussite pour Advanced Technical SQL (Novembre 2024 - Février 2025)',
        english: 'Formation Anglais — ITTI (Janvier 2024 - Février 2024)',
        webDev: 'Attestation de réussite : Développement Web — ESTIIM 67Ha (2019 - 2020)'
      },
      diplomas: {
        heading: 'DIPLÔMES',
        licence: 'Licence : Informatique Risque et Décision — ESMIA (2021 - 2023)',
        bac: 'Baccalauréat : Enseignement Général — LPR (2017 - 2018)'
      },
      experience: {
        heading: 'EXPÉRIENCE PROFESSIONNELLE',
        jobs: [
          {
            title: 'Stagiaire S.I : Développeur FullStack',
            company: 'Ravinala Airports International',
            date: 'Mars 2026 - Aujourd\'hui',
            bullets: [
              'Développement d\'une application dédiée aux Ressources Humaines',
              'Technologie : .NET, React et SQL Server / Git',
              'Participation à la mise en production de la version 2.0',
              'Correction de problèmes de sécurité et ajout de nouvelles fonctionnalités'
            ]
          },
          {
            title: 'Support utilisateurs',
            company: 'Freelance',
            date: 'Juillet 2025 - Février 2026',
            bullets: [
              'Assistant technique des utilisateurs spécifiques',
              'Assistance via : TeamViewer, AnyDesk'
            ]
          },
          {
            title: 'Chargé de Support IT et de la Télécompensation',
            company: 'BGFIBank Madagascar',
            date: 'Avril 2024 - Mars 2025',
            bullets: [
              'Support et assistance aux utilisateurs',
              'Administration des comptes Active Directory et Microsoft 365',
              'GPO, création nouveaux utilisateurs & groupes, gestion comptes',
              'Configuration des imprimantes et déploiement des postes de travail',
              'Gestion d\'incidents et résolution des tickets',
              'Support technique et aide aux utilisateurs'
            ],
            subtitle: 'Support Applicatif',
            subBullets: [
              'Traitement des virements multiples',
              'Support Amplitude Bank (Logiciel spécifique)',
              'Développement / gestion annuaire bancaire',
              'Administrateur serveur applicatifs (Windows Server)'
            ]
          },
          {
            title: 'Assistant IT',
            company: 'Mada-Marketing Call-Center',
            date: 'Novembre 2022 - Février 2023',
            bullets: [
              'Support et assistance aux utilisateurs',
              'Déploiement des postes de travail',
              'Maintenance des équipements informatiques'
            ]
          },
          {
            title: 'Support IT — Freelance',
            company: 'M1Com',
            date: 'Septembre 2020 - Mars 2022',
            bullets: [
              'Maintenance des équipements informatiques',
              'Support HelpDesk : Windows / imprimantes / Caméra / Réseau LAN'
            ]
          },
          {
            title: 'Stagiaire IT / Développeur',
            company: 'Rxl-Advisory',
            date: 'Octobre 2022 - Novembre 2022',
            bullets: [
              'Support Helpdesk & développeur Symfony (PHP)'
            ]
          },
          {
            title: 'Stagiaire S.I Développeur FullStack',
            company: 'Assurance Aro',
            date: 'Avril 2022 - Juin 2022',
            bullets: [
              'Développement de l\'application du catalogue des documents de l\'Assurance',
              'Technologie : Python / Django / Git / PostgreSQL'
            ]
          }
        ]
      },
      footer: 'CV généré automatiquement depuis le portfolio — rakotoniainaharryyves@gmail.com'
    },

    en: {
      name: 'RAKOTONIAINA Harry Yves',
      title: 'IT SUPPORT TECHNICIAN | SYSTEMS & APPLICATIONS',
      contact: {
        phone: '+261 33 52 477 04',
        email: 'rakotoniainaharryyves@gmail.com',
        address: 'Antananarivo, Madagascar',
        availability: 'Available for international mobility'
      },
      profile: {
        heading: 'PROFILE',
        text: "IT technician focused on systems and applications support, with experience in digital and technological environments. Development of IT solutions. Skilled in user support, Active Directory, Microsoft 365, Linux and Windows systems, databases and application development. Used to diagnosing and resolving incidents, deploying equipment and supporting business applications."
      },
      skills: {
        heading: 'SKILLS',
        supportTitle: 'Support & Systems',
        supportItems: [
          'Windows / Linux',
          'Ticket management (GLPI)',
          'Workstation maintenance and deployment',
          'User support & incident management',
          'Active Directory management',
          'Microsoft 365 administration',
          'Virtualization: Proxmox, VMware',
          'Networks: TCP/IP, DHCP, DNS, LAN'
        ],
        appsTitle: 'Applications & Databases',
        appsItems: [
          'Databases: SQL Server, Informix, PostgreSQL',
          'Development: HTML/CSS3, JavaScript, React.js, .NET C#, Python, Django, Flask',
          'Tools: Git, Bash, PowerShell'
        ]
      },
      certifications: {
        heading: 'CERTIFICATIONS & TECHNICAL TRAINING',
        ciscoTitle: 'Cisco Network Academy — Certificate of achievement (September 2026 - Present)',
        ciscoItems: [
          'Networking Basics',
          'Networking Devices and Initial Configuration',
          'Computer Hardware Basics',
          'Introduction to Cybersecurity',
          'Junior Cybersecurity Analyst Career Path',
          'Ethical Hacker',
          'Operating Systems Support',
          'IT Customer Support Basics'
        ],
        deutsch: 'German Training: A2 — DLMZ (October 2025 - February 2026)',
        codefinity: 'Codefinity: Certificate of achievement for Advanced Technical SQL (November 2024 - February 2025)',
        english: 'English Training — ITTI (January 2024 - February 2024)',
        webDev: 'Certificate of achievement: Web Development — ESTIIM 67Ha (2019 - 2020)'
      },
      diplomas: {
        heading: 'DIPLOMAS',
        licence: 'Bachelor: Computer Science Risk and Decision — ESMIA (2021 - 2023)',
        bac: 'Baccalaureate: General Education — LPR (2017 - 2018)'
      },
      experience: {
        heading: 'PROFESSIONAL EXPERIENCE',
        jobs: [
          {
            title: 'I.S Intern: FullStack Developer',
            company: 'Ravinala Airports International',
            date: 'March 2026 - Present',
            bullets: [
              'Development of an application dedicated to Human Resources',
              'Technology: .NET, React and SQL Server / Git',
              'Participation in the production release of version 2.0',
              'Fixing security issues and adding new features'
            ]
          },
          {
            title: 'User Support',
            company: 'Freelance',
            date: 'July 2025 - February 2026',
            bullets: [
              'Technical assistant for specific users',
              'Assist via: TeamViewer, AnyDesk'
            ]
          },
          {
            title: 'IT Support and Telecompensation Officer',
            company: 'BGFIBank Madagascar',
            date: 'April 2024 - March 2025',
            bullets: [
              'Support and assistance to users',
              'Administration of Active Directory and Microsoft 365 accounts',
              'GPO, creation of new users & groups, account management',
              'Printer configuration and workstation deployment',
              'Incident management and ticket resolution',
              'Technical support and user assistance'
            ],
            subtitle: 'Application Support',
            subBullets: [
              'Processing multiple transfers',
              'Amplitude Bank Support (specific software)',
              'Development / management of banking directory',
              'Application server administrator (Windows Server)'
            ]
          },
          {
            title: 'IT Assistant',
            company: 'Mada-Marketing Call-Center',
            date: 'November 2022 - February 2023',
            bullets: [
              'Support and assistance to users',
              'Deployment of workstations',
              'Maintenance of computer equipment'
            ]
          },
          {
            title: 'IT Support — Freelance',
            company: 'M1Com',
            date: 'September 2020 - March 2022',
            bullets: [
              'Maintenance of computer equipment',
              'HelpDesk Support: Windows / printers / Camera / LAN Network'
            ]
          },
          {
            title: 'IT Intern / Developer',
            company: 'Rxl-Advisory',
            date: 'October 2022 - November 2022',
            bullets: [
              'Helpdesk support & Symfony (PHP) developer'
            ]
          },
          {
            title: 'I.S Intern FullStack Developer',
            company: 'Aro Insurance',
            date: 'April 2022 - June 2022',
            bullets: [
              'Development of the document catalog application for the Insurance company',
              'Technology: Python / Django / Git / PostgreSQL'
            ]
          }
        ]
      },
      footer: 'CV automatically generated from the portfolio — rakotoniainaharryyves@gmail.com'
    },

    de: {
      name: 'RAKOTONIAINA Harry Yves',
      title: 'IT-SUPPORT-TECHNIKER | SYSTEME & ANWENDUNGEN',
      contact: {
        phone: '+261 33 52 477 04',
        email: 'rakotoniainaharryyves@gmail.com',
        address: 'Antananarivo, Madagaskar',
        availability: 'Verfügbar für internationale Mobilität'
      },
      profile: {
        heading: 'PROFIL',
        text: "IT-Techniker mit Schwerpunkt System- und Anwendungssupport, mit Erfahrung in digitalen und technologischen Umgebungen. Entwicklung von IT-Lösungen. Kompetent in Benutzer-Support, Active Directory, Microsoft 365, Linux- und Windows-Systemen, Datenbanken und Anwendungsentwicklung. Vertraut mit Diagnose und Behebung von Vorfällen, Bereitstellung von Geräten und Support von Geschäftsanwendungen."
      },
      skills: {
        heading: 'FÄHIGKEITEN',
        supportTitle: 'Support & Systeme',
        supportItems: [
          'Windows / Linux',
          'Ticketverwaltung (GLPI)',
          'Wartung und Bereitstellung von Arbeitsplätzen',
          'Benutzer-Support & Incident-Management',
          'Active Directory Verwaltung',
          'Microsoft 365 Verwaltung',
          'Virtualisierung: Proxmox, VMware',
          'Netzwerke: TCP/IP, DHCP, DNS, LAN'
        ],
        appsTitle: 'Anwendungen & Datenbanken',
        appsItems: [
          'Datenbanken: SQL Server, Informix, PostgreSQL',
          'Entwicklung: HTML/CSS3, JavaScript, React.js, .NET C#, Python, Django, Flask',
          'Tools: Git, Bash, PowerShell'
        ]
      },
      certifications: {
        heading: 'ZERTIFIZIERUNGEN & TECHNISCHE AUSBILDUNGEN',
        ciscoTitle: 'Cisco Network Academy — Erfolgszertifikat (September 2026 - Heute)',
        ciscoItems: [
          'Netzwerkgrundlagen',
          'Netzwerkgeräte und Ersteinrichtung',
          'Grundlagen der Computerhardware',
          'Einführung in die Cybersicherheit',
          'Karriereweg Junior Cybersecurity Analyst',
          'Ethical Hacker',
          'Betriebssystem-Support',
          'IT-Kunden-Support-Grundlagen'
        ],
        deutsch: 'Deutschkurs: A2 — DLMZ (Oktober 2025 - Februar 2026)',
        codefinity: 'Codefinity: Zertifikat für Advanced Technical SQL (November 2024 - Februar 2025)',
        english: 'Englischkurs — ITTI (Januar 2024 - Februar 2024)',
        webDev: 'Teilnahmebestätigung: Webentwicklung — ESTIIM 67Ha (2019 - 2020)'
      },
      diplomas: {
        heading: 'DIPLOME',
        licence: 'Bachelor: Informatik Risiko und Entscheidung — ESMIA (2021 - 2023)',
        bac: 'Abitur: Allgemeine Hochschulreife — LPR (2017 - 2018)'
      },
      experience: {
        heading: 'BERUFSERFAHRUNG',
        jobs: [
          {
            title: 'I.S Praktikant: FullStack Entwickler',
            company: 'Ravinala Airports International',
            date: 'März 2026 - Heute',
            bullets: [
              'Entwicklung einer Anwendung für das Personalwesen',
              'Technologie: .NET, React und SQL Server / Git',
              'Teilnahme an der Produktionsfreigabe der Version 2.0',
              'Behebung von Sicherheitsproblemen und Hinzufügen neuer Funktionen'
            ]
          },
          {
            title: 'Benutzer-Support',
            company: 'Freiberuflich',
            date: 'Juli 2025 - Februar 2026',
            bullets: [
              'Technischer Assistent für bestimmte Benutzer',
              'Unterstützung über: TeamViewer, AnyDesk'
            ]
          },
          {
            title: 'IT-Support- und Telekompensationsbeauftragter',
            company: 'BGFIBank Madagascar',
            date: 'April 2024 - März 2025',
            bullets: [
              'Support und Unterstützung für Benutzer',
              'Verwaltung von Active Directory und Microsoft 365 Konten',
              'GPO, Erstellung neuer Benutzer & Gruppen, Kontoverwaltung',
              'Druckerkonfiguration und Bereitstellung von Arbeitsplätzen',
              'Vorfallmanagement und Ticketlösung',
              'Technischer Support und Benutzerhilfe'
            ],
            subtitle: 'Anwendungssupport',
            subBullets: [
              'Bearbeitung von Mehrfachüberweisungen',
              'Amplitude Bank Support (spezifische Software)',
              'Entwicklung / Verwaltung von Bankverzeichnissen',
              'Anwendungsserver-Administrator (Windows Server)'
            ]
          },
          {
            title: 'IT-Assistent',
            company: 'Mada-Marketing Call-Center',
            date: 'November 2022 - Februar 2023',
            bullets: [
              'Support und Unterstützung für Benutzer',
              'Bereitstellung von Arbeitsplätzen',
              'Wartung von IT-Geräten'
            ]
          },
          {
            title: 'IT-Support — Freiberuflich',
            company: 'M1Com',
            date: 'September 2020 - März 2022',
            bullets: [
              'Wartung von IT-Geräten',
              'HelpDesk-Support: Windows / Drucker / Kamera / LAN-Netzwerk'
            ]
          },
          {
            title: 'IT-Praktikant / Entwickler',
            company: 'Rxl-Advisory',
            date: 'Oktober 2022 - November 2022',
            bullets: [
              'Helpdesk-Support & Symfony (PHP) Entwickler'
            ]
          },
          {
            title: 'I.S Praktikant FullStack Entwickler',
            company: 'Aro Versicherung',
            date: 'April 2022 - Juni 2022',
            bullets: [
              'Entwicklung der Dokumentenkataloganwendung für die Versicherung',
              'Technologie: Python / Django / Git / PostgreSQL'
            ]
          }
        ]
      },
      footer: 'Lebenslauf automatisch generiert aus dem Portfolio — rakotoniainaharryyves@gmail.com'
    },

    mg: {
      name: 'RAKOTONIAINA Harry Yves',
      title: 'TEKNISIANA FANOHANANA IT | RAHAFITRA & RINDRANASA',
      contact: {
        phone: '+261 33 52 477 04',
        email: 'rakotoniainaharryyves@gmail.com',
        address: 'Antananarivo, Madagasikara',
        availability: 'Misokatra ho an\'ny fifindrà-monina iraisam-pirenena'
      },
      profile: {
        heading: 'MOMBAMOMBA',
        text: "Teknisiana IT mifantoka amin'ny fanohanana rafitra sy rindranasa, manana traikefa amin'ny tontolo nomerika sy teknolojika. Famoronana vahaolana informatika. Mahay amin'ny fanohanana mpampiasa, Active Directory, Microsoft 365, rafitra Linux, Windows, tahiry angona ary famoronana rindranasa. Zatra amin'ny fitiliana sy famahana olana, fametrahana fitaovana ary fanohanana rindranasa matihanina."
      },
      skills: {
        heading: 'FAHAIZANA',
        supportTitle: 'Fanohanana & Rafitra',
        supportItems: [
          'Windows / Linux',
          'Fitantanana tickets (GLPI)',
          'Fikojakojana sy fametrahana toeram-piasana',
          'Fanohanana mpampiasa & fitantanana olana',
          'Fitantanana Active Directory',
          'Fitantanana Microsoft 365',
          'Virtualisation: Proxmox, VMware',
          'Tambajotra: TCP/IP, DHCP, DNS, LAN'
        ],
        appsTitle: 'Rindranasa & Tahiry Angona',
        appsItems: [
          'Tahiry angona: SQL Server, Informix, PostgreSQL',
          'Famoronana: HTML/CSS3, JavaScript, React.js, .NET C#, Python, Django, Flask',
          'Fitaovana: Git, Bash, PowerShell'
        ]
      },
      certifications: {
        heading: 'FANAMARINANA & FANOFANANA ARA-TEKNIKA',
        ciscoTitle: 'Cisco Network Academy — Taratasy fanamarinana fahombiazana (Septambra 2026 - Androany)',
        ciscoItems: [
          'Fototra amin\'ny Tambajotra',
          'Fitaovana Tambajotra sy Fanamboarana voalohany',
          'Fototra amin\'ny Fitaovana solosaina',
          'Fampidirana amin\'ny Fiarovana an-tserasera',
          'Lalana ho an\'ny Junior Cybersecurity Analyst',
          'Mpanao fitsapana ara-pitondrantena (Ethical Hacker)',
          'Fanohanana ny Rafitra Fiasa',
          'Fototra amin\'ny Fanohanana Mpampiasa IT'
        ],
        deutsch: 'Fanofanana Alemana: A2 — DLMZ (Oktobra 2025 - Febroary 2026)',
        codefinity: 'Codefinity: Taratasy fanamarinana ho an\'ny Advanced Technical SQL (Novambra 2024 - Febroary 2025)',
        english: 'Fanofanana Anglisy — ITTI (Janoary 2024 - Febroary 2024)',
        webDev: 'Taratasy fanamarinana fahombiazana: Famoronana Tranonkala — ESTIIM 67Ha (2019 - 2020)'
      },
      diplomas: {
        heading: 'DIPLAOMA',
        licence: 'Licence: Informatika Risika sy Fanapahan-kevitra — ESMIA (2021 - 2023)',
        bac: 'Baccalauréat: Fianarana ankapobeny — LPR (2017 - 2018)'
      },
      experience: {
        heading: 'TRAIKEFA MATIHANINA',
        jobs: [
          {
            title: 'Mpiofana S.I: Mpamorona FullStack',
            company: 'Ravinala Airports International',
            date: 'Martsa 2026 - Androany',
            bullets: [
              'Famoronana rindranasa natokana ho an\'ny Mpiasa (Ressources Humaines)',
              'Teknolojia: .NET, React sy SQL Server / Git',
              'Fandraisana anjara amin\'ny famoahana ny dika 2.0',
              'Fanitsiana olana ara-piarovana sy fanampiana endri-javatra vaovao'
            ]
          },
          {
            title: 'Fanohanana mpampiasa',
            company: 'Freelance',
            date: 'Jolay 2025 - Febroary 2026',
            bullets: [
              'Mpanampy ara-teknika ho an\'ny mpampiasa manokana',
              'Manampy amin\'ny alalan\'ny: TeamViewer, AnyDesk'
            ]
          },
          {
            title: 'Mpitantana Fanohanana IT sy Telecompensation',
            company: 'BGFIBank Madagascar',
            date: 'Avrily 2024 - Martsa 2025',
            bullets: [
              'Fanohanana sy fanampiana ny mpampiasa',
              'Fitantanana kaonty Active Directory sy Microsoft 365',
              'GPO, Famoronana mpampiasa vaovao & Vondrona, Fitantanana kaonty',
              'Fandrindrana mpanonta sy fametrahana toeram-piasana',
              'Fitantanana olana sy famahana tickets',
              'Fanohanana ara-teknika sy fanampiana ny mpampiasa'
            ],
            subtitle: 'Fanohanana rindranasa',
            subBullets: [
              'Fikarakarana famindrana vola maro',
              'Fanohanana Amplitude Bank (lojisialy manokana)',
              'Famoronana / fitantanana lisitry ny banky',
              'Mpitantana mpizara rindranasa (Windows Server)'
            ]
          },
          {
            title: 'Mpanampy IT',
            company: 'Mada-Marketing Call-Center',
            date: 'Novambra 2022 - Febroary 2023',
            bullets: [
              'Fanohanana sy fanampiana ny mpampiasa',
              'Fametrahana toeram-piasana',
              'Fikojakojana ny fitaovana informatika'
            ]
          },
          {
            title: 'Fanohanana IT — Freelance',
            company: 'M1Com',
            date: 'Septambra 2020 - Martsa 2022',
            bullets: [
              'Fikojakojana ny fitaovana informatika',
              'Fanohanana HelpDesk: Windows / mpanonta / Fakan-tsary / Tambajotra LAN'
            ]
          },
          {
            title: 'Mpiofana IT / Mpamorona',
            company: 'Rxl-Advisory',
            date: 'Oktobra 2022 - Novambra 2022',
            bullets: [
              'Fanohanana Helpdesk & mpamorona Symfony (PHP)'
            ]
          },
          {
            title: 'Mpiofana S.I Mpamorona FullStack',
            company: 'Assurance Aro',
            date: 'Avrily 2022 - Jona 2022',
            bullets: [
              'Famoronana rindranasa katalaogy antontan-taratasin\'ny Assurance',
              'Teknolojia: Python / Django / Git / PostgreSQL'
            ]
          }
        ]
      },
      footer: 'CV noforonina avy amin\'ny portfolio — rakotoniainaharryyves@gmail.com'
    }
  };

  /* ==========================================================
     2. GÉNÉRATION DU HTML DU CV (STYLE NOIR & BLANC)
     ========================================================== */
  function buildCVHtml(data) {
    const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);

    const bullets = (arr) =>
      '<ul>' + arr.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>';

    const jobsHtml = data.experience.jobs.map((job) => {
      const sub = job.subtitle
        ? '<p class="job-subtitle"><strong>' + esc(job.subtitle) + '</strong></p>' + bullets(job.subBullets || [])
        : '';
      return `
        <div class="job">
          <div class="job-head">
            <div class="job-left">
              <span class="job-title">${esc(job.title)}</span>
              <span class="job-company">${esc(job.company)}</span>
            </div>
            <span class="job-date">${esc(job.date)}</span>
          </div>
          ${bullets(job.bullets)}
          ${sub}
        </div>
      `;
    }).join('');

    return `
      <div class="cv-page">
        <header class="cv-header">
          <h1 class="cv-name">${esc(data.name)}</h1>
          <p class="cv-title">${esc(data.title)}</p>
          <div class="cv-contact">
            <span>${esc(data.contact.phone)}</span>
            <span class="sep">|</span>
            <span>${esc(data.contact.email)}</span>
            <span class="sep">|</span>
            <span>${esc(data.contact.address)}</span>
          </div>
          <p class="cv-availability">${esc(data.contact.availability)}</p>
        </header>

        <section class="cv-section">
          <h2 class="cv-section-title">${esc(data.profile.heading)}</h2>
          <p class="cv-profile">${esc(data.profile.text)}</p>
        </section>

        <section class="cv-section">
          <h2 class="cv-section-title">${esc(data.skills.heading)}</h2>
          <p class="cv-sub"><strong>${esc(data.skills.supportTitle)}</strong></p>
          ${bullets(data.skills.supportItems)}
          <p class="cv-sub"><strong>${esc(data.skills.appsTitle)}</strong></p>
          ${bullets(data.skills.appsItems)}
        </section>

        <section class="cv-section">
          <h2 class="cv-section-title">${esc(data.certifications.heading)}</h2>
          <p class="cv-sub"><strong>${esc(data.certifications.ciscoTitle)}</strong></p>
          ${bullets(data.certifications.ciscoItems)}
          <ul>
            <li>${esc(data.certifications.deutsch)}</li>
            <li>${esc(data.certifications.codefinity)}</li>
            <li>${esc(data.certifications.english)}</li>
            <li>${esc(data.certifications.webDev)}</li>
          </ul>
        </section>

        <section class="cv-section">
          <h2 class="cv-section-title">${esc(data.diplomas.heading)}</h2>
          <ul>
            <li>${esc(data.diplomas.licence)}</li>
            <li>${esc(data.diplomas.bac)}</li>
          </ul>
        </section>

        <section class="cv-section">
          <h2 class="cv-section-title">${esc(data.experience.heading)}</h2>
          ${jobsHtml}
        </section>

        <footer class="cv-footer">
          ${esc(data.footer)}
        </footer>
      </div>
    `;
  }

  /* ==========================================================
     3. CSS DU CV (POUR L'IMPRESSION / PDF)
     ========================================================== */
  const CV_STYLES = `
    @page { size: A4; margin: 14mm 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      color: #000;
      background: #fff;
      font-size: 10.5pt;
      line-height: 1.45;
    }
    .cv-page { max-width: 800px; margin: 0 auto; padding: 20px; }

    /* HEADER */
    .cv-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 14px; }
    .cv-name { font-size: 20pt; font-weight: 800; letter-spacing: 1px; margin-bottom: 4px; color: #000; }
    .cv-title { font-size: 10.5pt; font-weight: 700; letter-spacing: 0.6px; margin-bottom: 8px; color: #000; }
    .cv-contact { font-size: 9.5pt; color: #000; }
    .cv-contact .sep { margin: 0 6px; }
    .cv-availability { font-size: 9pt; font-style: italic; margin-top: 4px; color: #000; }

    /* SECTIONS */
    .cv-section { margin-bottom: 12px; page-break-inside: auto; }
    .cv-section-title {
      font-size: 11.5pt;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1.2px solid #000;
      padding-bottom: 3px;
      margin-bottom: 8px;
      color: #000;
    }
    .cv-profile { font-size: 10pt; text-align: justify; margin-bottom: 4px; color: #000; }
    .cv-sub { font-size: 10pt; margin: 6px 0 3px 0; color: #000; }

    /* LISTES */
    ul { list-style: none; margin: 4px 0 4px 0; padding-left: 0; }
    ul li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 2px;
      font-size: 10pt;
      color: #000;
      page-break-inside: avoid;
    }
    ul li::before {
      content: "•";
      position: absolute;
      left: 2px;
      top: 0;
      font-weight: bold;
      color: #000;
    }

    /* JOBS */
    .job { margin-bottom: 10px; page-break-inside: avoid; }
    .job-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      margin-bottom: 3px;
      gap: 6px;
    }
    .job-left { display: flex; flex-direction: column; }
    .job-title { font-size: 10.5pt; font-weight: 700; color: #000; }
    .job-company { font-size: 9.5pt; font-style: italic; color: #000; }
    .job-date { font-size: 9.5pt; font-weight: 600; color: #000; white-space: nowrap; }
    .job-subtitle { font-size: 10pt; margin: 5px 0 2px 0; color: #000; }

    /* FOOTER */
    .cv-footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #000;
      text-align: center;
      font-size: 8.5pt;
      font-style: italic;
      color: #000;
    }

    /* IMPRESSION */
    @media print {
      body { font-size: 10pt; }
      .cv-page { padding: 0; max-width: 100%; }
      .cv-section-title { font-size: 11pt; }
    }
  `;

  /* ==========================================================
     4. MODAL DE CHOIX DE LANGUE
     ========================================================== */
  function buildLanguageModal() {
    // Éviter doublons
    if (document.getElementById('cvLangModal')) return;

    const modal = document.createElement('div');
    modal.id = 'cvLangModal';
    modal.className = 'cv-lang-modal-overlay';
    modal.innerHTML = `
      <div class="cv-lang-modal" role="dialog" aria-modal="true">
        <button type="button" class="cv-lang-close" aria-label="Fermer">&times;</button>
        <div class="cv-lang-header">
          <h3 class="cv-lang-title">Générer mon CV en PDF</h3>
          <p class="cv-lang-sub">Choisissez la langue du CV</p>
        </div>
        <div class="cv-lang-options">
          <button class="cv-lang-option" data-lang="fr">
            <span class="cv-flag">🇫🇷</span>
            <span class="cv-lang-name">Français</span>
          </button>
          <button class="cv-lang-option" data-lang="en">
            <span class="cv-flag">🇬🇧</span>
            <span class="cv-lang-name">English</span>
          </button>
          <button class="cv-lang-option" data-lang="de">
            <span class="cv-flag">🇩🇪</span>
            <span class="cv-lang-name">Deutsch</span>
          </button>
          <button class="cv-lang-option" data-lang="mg">
            <span class="cv-flag">🇲🇬</span>
            <span class="cv-lang-name">Malagasy</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Styles inline pour ne pas dépendre du CSS externe
    const style = document.createElement('style');
    style.textContent = `
      .cv-lang-modal-overlay {
        position: fixed; inset: 0;
        background: rgba(15, 23, 42, 0.65);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        padding: 20px; z-index: 99999;
        opacity: 0; visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .cv-lang-modal-overlay.active { opacity: 1; visibility: visible; }
      .cv-lang-modal {
        background: #fff; border-radius: 20px;
        width: 100%; max-width: 460px;
        padding: 30px 28px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.25);
        position: relative;
        transform: scale(0.95);
        transition: transform 0.3s ease;
      }
      .cv-lang-modal-overlay.active .cv-lang-modal { transform: scale(1); }
      .cv-lang-close {
        position: absolute; top: 14px; right: 16px;
        width: 34px; height: 34px; border-radius: 50%;
        border: none; background: #f1f5f9;
        font-size: 1.4rem; line-height: 1;
        color: #64748b; cursor: pointer;
        transition: all 0.2s ease;
      }
      .cv-lang-close:hover { background: #1e3a8a; color: #fff; transform: rotate(90deg); }
      .cv-lang-header { text-align: center; margin-bottom: 22px; }
      .cv-lang-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }
      .cv-lang-sub { font-size: 0.9rem; color: #64748b; margin: 0; }
      .cv-lang-options {
        display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
      }
      .cv-lang-option {
        display: flex; align-items: center; gap: 10px;
        padding: 14px 16px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.25s ease;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 600;
        color: #0f172a;
      }
      .cv-lang-option:hover {
        background: #eff6ff;
        border-color: #3b82f6;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
      }
      .cv-flag { font-size: 1.6rem; line-height: 1; }
      .cv-lang-name { flex: 1; text-align: left; }

      /* Boutons groupe */
      .cv-buttons-group {
        display: flex; flex-wrap: wrap; gap: 12px;
      }
      @media (max-width: 576px) {
        .cv-buttons-group { flex-direction: column; }
        .cv-buttons-group .btn { width: 100%; }
        .cv-lang-options { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);

    return modal;
  }

  /* ==========================================================
     5. GÉNÉRATION DU PDF (via fenêtre d'impression)
     ========================================================== */
  function generatePDF(lang) {
    const data = CV_DATA[lang] || CV_DATA.fr;
    const html = buildCVHtml(data);

    // Ouvrir une fenêtre dédiée
    const win = window.open('', '_blank', 'width=900,height=1000');
    if (!win) {
      alert('Veuillez autoriser les popups pour générer le CV.');
      return;
    }

    win.document.open();
    win.document.write(`
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8">
        <title>CV — ${data.name} (${lang.toUpperCase()})</title>
        <style>${CV_STYLES}</style>
      </head>
      <body>
        ${html}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.focus();
              window.print();
            }, 400);
          };
        <\/script>
      </body>
      </html>
    `);
    win.document.close();
  }

  /* ==========================================================
     6. INITIALISATION
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('generateCvBtn');
    if (!btn) {
      console.warn('⚠️ Bouton #generateCvBtn introuvable');
      return;
    }

    // Créer la modal au chargement
    const modal = buildLanguageModal();

    // Ouvrir la modal au clic sur le bouton
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('active');
    });

    // Fermer
    modal.querySelector('.cv-lang-close').addEventListener('click', function () {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('active');
    });

    // Sélection de langue → génération PDF
    modal.querySelectorAll('.cv-lang-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        modal.classList.remove('active');
        generatePDF(lang);
      });
    });

    console.log('✅ Générateur de CV initialisé');
  });
})();



  /* ==========================================================
     PDF VIEWER MODAL — Ouverture dans une grande modal
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    const pdfModalEl = document.getElementById('pdfViewerModal');
    const iframe = document.getElementById('pdfViewerFrame');
    const loading = document.getElementById('pdfViewerLoading');
    const titleEl = document.getElementById('pdfViewerLabel');
    const subtitleEl = document.getElementById('pdfViewerSubtitle');
    const downloadBtn = document.getElementById('pdfDownloadBtn');
    const openBtn = document.getElementById('pdfOpenBtn');
    const smallModalEl = document.getElementById('myModal');

    if (!pdfModalEl || typeof bootstrap === 'undefined') return;

    const pdfModal = new bootstrap.Modal(pdfModalEl, {
      backdrop: 'static',
      keyboard: true
    });

    const smallModal = bootstrap.Modal.getInstance(smallModalEl) || new bootstrap.Modal(smallModalEl);

    // Ouvrir le PDF dans la grande modal
    document.querySelectorAll('.cv-download-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const url = this.getAttribute('data-pdf-url');
        const title = this.getAttribute('data-pdf-title') || 'CV Preview';

        if (!url) return;

        // Mettre à jour le contenu
        titleEl.textContent = title;
        subtitleEl.textContent = url.split('/').pop();
        downloadBtn.setAttribute('href', url);
        downloadBtn.setAttribute('download', url.split('/').pop());
        openBtn.setAttribute('href', url);

        // Afficher le loader
        loading.classList.remove('hidden');
        iframe.src = '';

        // Fermer le petit modal
        smallModal.hide();

        // Ouvrir la grande modal
        setTimeout(function () {
          pdfModal.show();
        }, 300);

        // Charger l'iframe
        setTimeout(function () {
          iframe.src = url;
          iframe.onload = function () {
            setTimeout(function () {
              loading.classList.add('hidden');
            }, 400);
          };
        }, 400);
      });
    });

    // Réinitialiser quand on ferme
    pdfModalEl.addEventListener('hidden.bs.modal', function () {
      iframe.src = '';
      loading.classList.remove('hidden');
    });

    console.log('✅ PDF Viewer Modal initialisé');
  });
