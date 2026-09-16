/* ==========================================================
   SAPHIRE — CHATBOT LOCAL MULTILINGUE
   Détection auto de langue + réponses dans 4 langues
   ========================================================== */

(function () {
  'use strict';

  /* ==========================================================
     ⚙️ CONFIGURATION
     ========================================================== */
  const SUPPORTED_LANGS = ['fr', 'en', 'de', 'mg'];

  const KB = window.HARRY_KB;
  if (!KB) {
    console.error('❌ chatbot-data.js non chargé !');
    return;
  }

  // Détecter la langue actuelle depuis le site
  function detectSiteLang() {
    var saved = localStorage.getItem('preferredLanguage');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    var activeBtn = document.querySelector('.lang-btn.active');
    if (activeBtn && activeBtn.dataset.lang) return activeBtn.dataset.lang;
    return 'fr';
  }

  let CURRENT_LANG = detectSiteLang();

  console.log('✅ KB chargée — Langue active :', CURRENT_LANG);

  /* ==========================================================
     1. NORMALISATION
     ========================================================== */
  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ==========================================================
     2. TRADUCTIONS DES RÉPONSES (fr / en / de / mg)
     ========================================================== */
  const REPLIES = {
    /* ---------- SALUTATION ---------- */
    salutation: {
      fr: () => `Bonjour 👋 Ravi de vous voir ! Je suis **Saphire**, l'assistante de Harry. Posez-moi une question sur son **parcours**, ses **compétences**, ses **services** ou pour le **contacter**.`,
      en: () => `Hello 👋 Nice to meet you! I'm **Saphire**, Harry's assistant. Ask me anything about his **background**, **skills**, **services** or how to **contact** him.`,
      de: () => `Hallo 👋 Schön, Sie zu sehen! Ich bin **Saphire**, Harrys Assistentin. Fragen Sie mich nach seinem **Werdegang**, seinen **Fähigkeiten**, **Diensten** oder **Kontakt**.`,
      mg: () => `Manao ahoana 👋 Faly mahita anao! Izaho dia **Saphire**, mpanampy an'i Harry. Anontanio aho momba ny **fintinarany**, ny **fahaizany**, ny **tolotra** na ny **fifandraisana** aminy.`
    },

    /* ---------- REMERCIEMENT ---------- */
    remerciement: {
      fr: () => `Avec plaisir 😊 N'hésitez pas si vous avez d'autres questions !`,
      en: () => `You're welcome 😊 Feel free to ask if you have any other questions!`,
      de: () => `Gern geschehen 😊 Fragen Sie gerne, wenn Sie weitere Fragen haben!`,
      mg: () => `Tsy misy fisaorana 😊 Aza misalasala manontany raha misy fanontaniana hafa!`
    },

    /* ---------- AU REVOIR ---------- */
    aurevoir: {
      fr: () => `À bientôt 👋 Bonne journée !`,
      en: () => `See you soon 👋 Have a great day!`,
      de: () => `Bis bald 👋 Schönen Tag noch!`,
      mg: () => `Mandra-pihaona 👋 Mirary soa!`
    },

    /* ---------- QUI EST SAPHIRE ---------- */
    qui_est_saphire: {
      fr: () => `Je suis **Saphire** 💎, l'assistante virtuelle de Harry Yves. Je réponds à vos questions sur son **parcours**, ses **compétences**, ses **projets**, ses **services** ou ses **contacts**.`,
      en: () => `I'm **Saphire** 💎, Harry Yves' virtual assistant. I answer your questions about his **background**, **skills**, **projects**, **services** or **contacts**.`,
      de: () => `Ich bin **Saphire** 💎, Harry Yves' virtuelle Assistentin. Ich beantworte Ihre Fragen zu seinem **Werdegang**, seinen **Fähigkeiten**, **Projekten**, **Diensten** oder **Kontakten**.`,
      mg: () => `Izaho dia **Saphire** 💎, mpanampy virtoaly an'i Harry Yves. Mamaly ny fanontanianao momba ny **fintinarany**, ny **fahaizany**, ny **tetikasany**, ny **tolotra** na ny **fifandraisana** aminy aho.`
    },

    /* ---------- IDENTITÉ HARRY ---------- */
    identite: {
      fr: () => `**${KB.identite.nom}** est un **${KB.identite.poste}** basé à ${KB.identite.localisation}. Il possède **${KB.identite.experience}**. Passionné de nouvelles technologies, cybersécurité et développement web.`,
      en: () => `**${KB.identite.nom}** is a **${KB.identite.poste}** based in ${KB.identite.localisation}. He has **4 years of experience**. Passionate about new technologies, cybersecurity and web development.`,
      de: () => `**${KB.identite.nom}** ist ein **${KB.identite.poste}** mit Sitz in ${KB.identite.localisation}. Er hat **4 Jahre Erfahrung**. Leidenschaftlich für neue Technologien, Cybersicherheit und Webentwicklung.`,
      mg: () => `**${KB.identite.nom}** dia **${KB.identite.poste}** mipetraka any ${KB.identite.localisation}. Manana **traikefa 4 taona** izy. Tia teknolojia vaovao, fiarovana an-tserasera ary famoronana tranonkala.`
    },

    /* ---------- LOCALISATION ---------- */
    localisation: {
      fr: () => `Harry est basé à **${KB.identite.localisation}** 📍. ${KB.identite.disponibilite}.`,
      en: () => `Harry is based in **${KB.identite.localisation}** 📍. He is **available for international mobility**.`,
      de: () => `Harry ist in **${KB.identite.localisation}** ansässig 📍. Er ist **für internationale Mobilität verfügbar**.`,
      mg: () => `Mipetraka any **${KB.identite.localisation}** i Harry 📍. **Vonona ny hifindra monina iraisam-pirenena** izy.`
    },

    /* ---------- DISPONIBILITÉ ---------- */
    disponibilite: {
      fr: () => `Oui ! Harry est **${KB.identite.disponibilite}** ✅. Contactez-le : ${KB.contact.email} ou WhatsApp ${KB.contact.whatsapp}.`,
      en: () => `Yes! Harry is **available for international mobility** ✅. Contact him: ${KB.contact.email} or WhatsApp ${KB.contact.whatsapp}.`,
      de: () => `Ja! Harry ist **für internationale Mobilität verfügbar** ✅. Kontakt: ${KB.contact.email} oder WhatsApp ${KB.contact.whatsapp}.`,
      mg: () => `Eny! **Vonona ny hifindra monina iraisam-pirenena** i Harry ✅. Mifandraisa aminy: ${KB.contact.email} na WhatsApp ${KB.contact.whatsapp}.`
    },

    /* ---------- CONTACT ---------- */
    contact: {
      fr: () => `Voici comment contacter Harry 📞 :

📧 **Email** : ${KB.contact.email}
📱 **WhatsApp** : ${KB.contact.whatsapp}
💼 **LinkedIn** : ${KB.contact.linkedin}
🦊 **GitLab** : ${KB.contact.gitlab}
🏆 **Credly** : ${KB.contact.credly}`,
      en: () => `Here's how to contact Harry 📞 :

📧 **Email**: ${KB.contact.email}
📱 **WhatsApp**: ${KB.contact.whatsapp}
💼 **LinkedIn**: ${KB.contact.linkedin}
🦊 **GitLab**: ${KB.contact.gitlab}
🏆 **Credly**: ${KB.contact.credly}`,
      de: () => `So kontaktieren Sie Harry 📞 :

📧 **E-Mail**: ${KB.contact.email}
📱 **WhatsApp**: ${KB.contact.whatsapp}
💼 **LinkedIn**: ${KB.contact.linkedin}
🦊 **GitLab**: ${KB.contact.gitlab}
🏆 **Credly**: ${KB.contact.credly}`,
      mg: () => `Ireto ny fomba hifandraisana amin'i Harry 📞 :

📧 **Mailaka**: ${KB.contact.email}
📱 **WhatsApp**: ${KB.contact.whatsapp}
💼 **LinkedIn**: ${KB.contact.linkedin}
🦊 **GitLab**: ${KB.contact.gitlab}
🏆 **Credly**: ${KB.contact.credly}`
    },

    /* ---------- EMAIL ---------- */
    email: {
      fr: () => `L'email de Harry : **${KB.contact.email}** 📧. Il répond sous 24h.`,
      en: () => `Harry's email: **${KB.contact.email}** 📧. He replies within 24h.`,
      de: () => `Harrys E-Mail: **${KB.contact.email}** 📧. Er antwortet innerhalb von 24h.`,
      mg: () => `Ny mailak'i Harry: **${KB.contact.email}** 📧. Mamaly ao anatin'ny 24 ora izy.`
    },

    /* ---------- WHATSAPP ---------- */
    whatsapp: {
      fr: () => `WhatsApp : **${KB.contact.whatsapp}** 📱. Lien direct : ${KB.contact.whatsapp_lien}`,
      en: () => `WhatsApp: **${KB.contact.whatsapp}** 📱. Direct link: ${KB.contact.whatsapp_lien}`,
      de: () => `WhatsApp: **${KB.contact.whatsapp}** 📱. Direktlink: ${KB.contact.whatsapp_lien}`,
      mg: () => `WhatsApp: **${KB.contact.whatsapp}** 📱. Rohy mivantana: ${KB.contact.whatsapp_lien}`
    },

    /* ---------- LINKEDIN ---------- */
    linkedin: {
      fr: () => `LinkedIn : **${KB.contact.linkedin}** 💼`,
      en: () => `LinkedIn: **${KB.contact.linkedin}** 💼`,
      de: () => `LinkedIn: **${KB.contact.linkedin}** 💼`,
      mg: () => `LinkedIn: **${KB.contact.linkedin}** 💼`
    },

    /* ---------- GITLAB ---------- */
    gitlab: {
      fr: () => `GitLab : **${KB.contact.gitlab}** 🦊 — tous ses projets de développement.`,
      en: () => `GitLab: **${KB.contact.gitlab}** 🦊 — all his development projects.`,
      de: () => `GitLab: **${KB.contact.gitlab}** 🦊 — alle seine Entwicklungsprojekte.`,
      mg: () => `GitLab: **${KB.contact.gitlab}** 🦊 — ny tetikasany rehetra.`
    },

    /* ---------- CREDLY ---------- */
    credly: {
      fr: () => `Badges Credly : **${KB.contact.credly}** 🏆 — Cisco Network Academy.`,
      en: () => `Credly badges: **${KB.contact.credly}** 🏆 — Cisco Network Academy.`,
      de: () => `Credly-Abzeichen: **${KB.contact.credly}** 🏆 — Cisco Network Academy.`,
      mg: () => `Badge Credly: **${KB.contact.credly}** 🏆 — Cisco Network Academy.`
    },

    /* ---------- CV ---------- */
    cv: {
      fr: () => `CV de Harry 📄 dans la section **Résumé** :
• 🇫🇷 Français
• 🇫🇷 Français avec photo
• 🇬🇧 Anglais

💡 Générez aussi un CV en 4 langues (FR/EN/DE/MG) !`,
      en: () => `Harry's CV 📄 in the **Resume** section:
• 🇫🇷 French
• 🇫🇷 French with photo
• 🇬🇧 English

💡 You can also generate a CV in 4 languages (FR/EN/DE/MG)!`,
      de: () => `Harrys Lebenslauf 📄 im Bereich **Lebenslauf**:
• 🇫🇷 Französisch
• 🇫🇷 Französisch mit Foto
• 🇬🇧 Englisch

💡 Sie können auch einen Lebenslauf in 4 Sprachen erstellen (FR/EN/DE/MG)!`,
      mg: () => `Ny CV an'i Harry 📄 ao amin'ny fizarana **Fintinarana**:
• 🇫🇷 Frantsay
• 🇫🇷 Frantsay misy sary
• 🇬🇧 Anglisy

💡 Azonao atao koa ny mamorona CV amin'ny fiteny 4 (FR/EN/DE/MG)!`
    },

    /* ---------- COMPÉTENCES ---------- */
    competences: {
      fr: () => `🎯 **2 grands domaines** :

🖥️ **Support IT & Systèmes** : Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware, Réseaux
💻 **Applications & BDD** : SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      en: () => `🎯 **2 main areas**:

🖥️ **IT Support & Systems**: Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware, Networks
💻 **Applications & Databases**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      de: () => `🎯 **2 Hauptbereiche**:

🖥️ **IT-Support & Systeme**: Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware, Netzwerke
💻 **Anwendungen & Datenbanken**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      mg: () => `🎯 **Sehatra 2 lehibe** :

🖥️ **Fanohanana IT & Rafitra**: Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware, Tambajotra
💻 **Rindranasa & Tahiry angona**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`
    },

    /* ---------- COMPÉTENCES SUPPORT ---------- */
    competences_support: {
      fr: () => `🖥️ **Support IT** :
${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      en: () => `🖥️ **IT Support**:
${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      de: () => `🖥️ **IT-Support**:
${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      mg: () => `🖥️ **Fanohanana IT**:
${KB.competences_support.map(c => '• ' + c).join('\n')}`
    },

    /* ---------- COMPÉTENCES APPLICATIFS ---------- */
    competences_applicatifs: {
      fr: () => `💻 **Applicatifs** :
🗄️ BDD : ${KB.competences_applicatifs.bases_donnees.join(', ')}
🌐 Langages : ${KB.competences_applicatifs.langages.join(', ')}
🛠️ Outils : ${KB.competences_applicatifs.outils.join(', ')}`,
      en: () => `💻 **Applications**:
🗄️ Databases: ${KB.competences_applicatifs.bases_donnees.join(', ')}
🌐 Languages: ${KB.competences_applicatifs.langages.join(', ')}
🛠️ Tools: ${KB.competences_applicatifs.outils.join(', ')}`,
      de: () => `💻 **Anwendungen**:
🗄️ Datenbanken: ${KB.competences_applicatifs.bases_donnees.join(', ')}
🌐 Sprachen: ${KB.competences_applicatifs.langages.join(', ')}
🛠️ Tools: ${KB.competences_applicatifs.outils.join(', ')}`,
      mg: () => `💻 **Rindranasa**:
🗄️ Tahiry angona: ${KB.competences_applicatifs.bases_donnees.join(', ')}
🌐 Fiteny: ${KB.competences_applicatifs.langages.join(', ')}
🛠️ Fitaovana: ${KB.competences_applicatifs.outils.join(', ')}`
    },

    /* ---------- TECHNOLOGIES DEV ---------- */
    techno_dev: {
      fr: () => `🚀 **Technologies dev** :
🎨 Frontend : ${KB.techno_dev.frontend.join(', ')}
⚙️ Backend : ${KB.techno_dev.backend.join(', ')}
🗄️ BDD : ${KB.techno_dev.bdd.join(', ')}`,
      en: () => `🚀 **Dev technologies**:
🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}
⚙️ Backend: ${KB.techno_dev.backend.join(', ')}
🗄️ Databases: ${KB.techno_dev.bdd.join(', ')}`,
      de: () => `🚀 **Entwicklungstechnologien**:
🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}
⚙️ Backend: ${KB.techno_dev.backend.join(', ')}
🗄️ Datenbanken: ${KB.techno_dev.bdd.join(', ')}`,
      mg: () => `🚀 **Teknolojia famoronana**:
🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}
⚙️ Backend: ${KB.techno_dev.backend.join(', ')}
🗄️ Tahiry angona: ${KB.techno_dev.bdd.join(', ')}`
    },

    /* ---------- TECHNOLOGIES SUPPORT ---------- */
    techno_support: {
      fr: () => `🖥️ **Technologies support** :
💿 OS : ${KB.techno_support.os.join(', ')}
📋 Gestion : ${KB.techno_support.gestion.join(', ')}
🖥️ Virtualisation : ${KB.techno_support.virtualisation.join(', ')}`,
      en: () => `🖥️ **Support technologies**:
💿 OS: ${KB.techno_support.os.join(', ')}
📋 Management: ${KB.techno_support.gestion.join(', ')}
🖥️ Virtualization: ${KB.techno_support.virtualisation.join(', ')}`,
      de: () => `🖥️ **Support-Technologien**:
💿 BS: ${KB.techno_support.os.join(', ')}
📋 Verwaltung: ${KB.techno_support.gestion.join(', ')}
🖥️ Virtualisierung: ${KB.techno_support.virtualisation.join(', ')}`,
      mg: () => `🖥️ **Teknolojia fanohanana**:
💿 OS: ${KB.techno_support.os.join(', ')}
📋 Fitantanana: ${KB.techno_support.gestion.join(', ')}
🖥️ Virtualisation: ${KB.techno_support.virtualisation.join(', ')}`
    },

    /* ---------- EXPÉRIENCES ---------- */
    experiences: {
      fr: () => `🎯 **Parcours** :
${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      en: () => `🎯 **Career**:
${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      de: () => `🎯 **Werdegang**:
${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      mg: () => `🎯 **Fintinarana**:
${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`
    },

    /* ---------- EXPÉRIENCE ACTUELLE ---------- */
    experience_actuelle: {
      fr: () => {
        const c = KB.experiences.find(e => e.actuel);
        return `🟢 **Poste actuel** : **${c.titre}** chez **${c.entreprise}** (${c.date}).`;
      },
      en: () => {
        const c = KB.experiences.find(e => e.actuel);
        return `🟢 **Current position**: **${c.titre}** at **${c.entreprise}** (${c.date}).`;
      },
      de: () => {
        const c = KB.experiences.find(e => e.actuel);
        return `🟢 **Aktuelle Position**: **${c.titre}** bei **${c.entreprise}** (${c.date}).`;
      },
      mg: () => {
        const c = KB.experiences.find(e => e.actuel);
        return `🟢 **Toerana ankehitriny**: **${c.titre}** ao amin'ny **${c.entreprise}** (${c.date}).`;
      }
    },

    /* ---------- CERTIFICATIONS ---------- */
    certifications: {
      fr: () => `🎓 **Certifications** :
${KB.certifications.map(c => '• ' + c).join('\n')}

📜 **Diplômes** :
${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      en: () => `🎓 **Certifications**:
${KB.certifications.map(c => '• ' + c).join('\n')}

📜 **Diplomas**:
${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      de: () => `🎓 **Zertifizierungen**:
${KB.certifications.map(c => '• ' + c).join('\n')}

📜 **Diplome**:
${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      mg: () => `🎓 **Fanamarinana**:
${KB.certifications.map(c => '• ' + c).join('\n')}

📜 **Diplaoma**:
${KB.diplomes.map(d => '• ' + d).join('\n')}`
    },

    /* ---------- PROJETS ---------- */
    projets: {
      fr: () => `📂 **Projets** :
${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      en: () => `📂 **Projects**:
${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      de: () => `📂 **Projekte**:
${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      mg: () => `📂 **Tetikasa**:
${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`
    },

    /* ---------- SERVICES ---------- */
    services: {
      fr: () => `💼 **Services** :
${KB.services.map(s => '• ' + s).join('\n')}`,
      en: () => `💼 **Services**:
${KB.services.map(s => '• ' + s).join('\n')}`,
      de: () => `💼 **Dienstleistungen**:
${KB.services.map(s => '• ' + s).join('\n')}`,
      mg: () => `💼 **Tolotra**:
${KB.services.map(s => '• ' + s).join('\n')}`
    },

    /* ---------- FREELANCE ---------- */
    freelance: {
      fr: () => `Oui, Harry travaille en **freelance** 💼. Contact : ${KB.contact.email}`,
      en: () => `Yes, Harry works as a **freelancer** 💼. Contact: ${KB.contact.email}`,
      de: () => `Ja, Harry arbeitet **freiberuflich** 💼. Kontakt: ${KB.contact.email}`,
      mg: () => `Eny, miasa **freelance** i Harry 💼. Fifandraisana: ${KB.contact.email}`
    },

    /* ---------- TARIFS ---------- */
    tarif: {
      fr: () => `Les tarifs dépendent de la **mission** 💰. Devis personnalisé : ${KB.contact.email} ou WhatsApp ${KB.contact.whatsapp}.`,
      en: () => `Rates depend on the **mission** 💰. Custom quote: ${KB.contact.email} or WhatsApp ${KB.contact.whatsapp}.`,
      de: () => `Die Preise hängen von der **Mission** ab 💰. Individuelles Angebot: ${KB.contact.email} oder WhatsApp ${KB.contact.whatsapp}.`,
      mg: () => `Miankina amin'ny **asa** ny vidiny 💰. Devis manokana: ${KB.contact.email} na WhatsApp ${KB.contact.whatsapp}.`
    },

    /* ---------- LANGUES ---------- */
    langues: {
      fr: () => `🌍 **Langues** :
🇲🇬 Malagasy : ${KB.langues.Malagasy}
🇫🇷 Français : ${KB.langues.Français}
🇬🇧 Anglais : ${KB.langues.Anglais}
🇩🇪 Allemand : ${KB.langues.Allemand}`,
      en: () => `🌍 **Languages**:
🇲🇬 Malagasy: Native
🇫🇷 French: Fluent
🇬🇧 English: Intermediate
🇩🇪 German: A2 (in progress)`,
      de: () => `🌍 **Sprachen**:
🇲🇬 Malagasy: Muttersprache
🇫🇷 Französisch: Fließend
🇬🇧 Englisch: Mittelstufe
🇩🇪 Deutsch: A2 (in Bearbeitung)`,
      mg: () => `🌍 **Fiteny** :
🇲🇬 Malagasy : Reny
🇫🇷 Frantsay : Mahay tsara
🇬🇧 Anglisy : Antonony
🇩🇪 Alemana : A2 (mianatra)`
    },

    /* ---------- ✅ CENTRES D'INTÉRÊT ---------- */
    interets: {
      fr: () => `🎯 **Centres d'intérêt de Harry** :

💡 **Technologies** :
${KB.interets.tech.map(i => '• ' + i).join('\n')}

💼 **Professionnels** :
${KB.interets.professionnels.map(i => '• ' + i).join('\n')}

🌟 **Personnels** :
${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,

      en: () => `🎯 **Harry's interests**:

💡 **Technologies**:
${KB.interets.tech.map(i => '• ' + i).join('\n')}

💼 **Professional**:
${KB.interets.professionnels.map(i => '• ' + i).join('\n')}

🌟 **Personal**:
${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,

      de: () => `🎯 **Harrys Interessen**:

💡 **Technologien**:
${KB.interets.tech.map(i => '• ' + i).join('\n')}

💼 **Beruflich**:
${KB.interets.professionnels.map(i => '• ' + i).join('\n')}

🌟 **Persönlich**:
${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,

      mg: () => `🎯 **Ny zavatra tian'i Harry** :

💡 **Teknolojia** :
${KB.interets.tech.map(i => '• ' + i).join('\n')}

💼 **Matihanina** :
${KB.interets.professionnels.map(i => '• ' + i).join('\n')}

🌟 **Manokana** :
${KB.interets.personnels.map(i => '• ' + i).join('\n')}`
    },

    /* ---------- AIDE ---------- */
    aide: {
      fr: () => `Je suis **Saphire** 💎. Je peux répondre sur :
• 👤 Qui est Harry
• 💻 Ses **compétences**
• 🎓 Ses **certifications**
• 📂 Ses **projets**
• 💼 Ses **services**
• 📞 Ses **contacts**
• 🌍 Ses **langues**
• 🎯 Ses **centres d'intérêt**`,
      en: () => `I'm **Saphire** 💎. I can answer about:
• 👤 Who Harry is
• 💻 His **skills**
• 🎓 His **certifications**
• 📂 His **projects**
• 💼 His **services**
• 📞 His **contacts**
• 🌍 His **languages**
• 🎯 His **interests**`,
      de: () => `Ich bin **Saphire** 💎. Ich beantworte Fragen zu:
• 👤 Wer Harry ist
• 💻 Seinen **Fähigkeiten**
• 🎓 Seinen **Zertifizierungen**
• 📂 Seinen **Projekten**
• 💼 Seinen **Diensten**
• 📞 Seinen **Kontakten**
• 🌍 Seinen **Sprachen**
• 🎯 Seinen **Interessen**`,
      mg: () => `Izaho dia **Saphire** 💎. Afaka mamaly momba:
• 👤 Iza i Harry
• 💻 Ny **fahaizany**
• 🎓 Ny **fanamarinany**
• 📂 Ny **tetikasany**
• 💼 Ny **tolotra**
• 📞 Ny **fifandraisana**
• 🌍 Ny **fiteny**
• 🎯 Ny **zavatra tiany**`
    },

    /* ---------- HORAIRES ---------- */
    horaires: {
      fr: () => `Horaires flexibles ⏰. Contactez-le : ${KB.contact.email}`,
      en: () => `Flexible hours ⏰. Contact: ${KB.contact.email}`,
      de: () => `Flexible Arbeitszeiten ⏰. Kontakt: ${KB.contact.email}`,
      mg: () => `Malalaka ny ora ⏰. Mifandraisa: ${KB.contact.email}`
    },

    /* ---------- ÂGE ---------- */
    age: {
      fr: () => `Je n'ai pas cette info 🤔. Contactez Harry : ${KB.contact.email}`,
      en: () => `I don't have this info 🤔. Contact Harry: ${KB.contact.email}`,
      de: () => `Ich habe diese Info nicht 🤔. Kontakt: ${KB.contact.email}`,
      mg: () => `Tsy manana io fampahalalana io aho 🤔. Mifandraisa: ${KB.contact.email}`
    }
  };

  /* ==========================================================
     3. INTENTIONS (mots-clés multilingues)
     ========================================================== */
  const INTENTS = [
    { id: 'salutation', keywords: ['bonjour','salut','bjr','slt','cc','coucou','hey','hello','hi','bonsoir','yo','wsh','allo','hallo','guten tag','guten morgen','guten abend','hallo zusammen','manao ahoana','salama','manahoana','mbonjour'] },
    { id: 'remerciement', keywords: ['merci','thanks','thx','mrc','cool','top','super','genial','parfait','nickel','bravo','excellent','danke','vielen dank','misaotra','misaotra betsaka'] },
    { id: 'aurevoir', keywords: ['aurevoir','au revoir','bye','a plus','aplus','ciao','tchao','bonne journee','bonne soiree','adieu','tschuess','auf wiedersehen','veloma','mandrapihaona'] },

    { id: 'qui_est_saphire', keywords: ['saphire','qui es tu','qui est saphire','cest qui saphire','tu es qui','tu es quoi','c ki toi','c toi ki','ki es tu','who are you','wer bist du','iza ianao'] },
    { id: 'identite', keywords: ['qui','etes','vous','toi','tu','nom','prenom','identite','presente','presentation','profil','connaitre','connais','presentez','qui es','qui est','qui etes','parle moi de toi','parle de toi','harry','yves','rakotoniaina','c ki harry','qui est harry','presentation harry','profil harry','cest qui harry','who','about','wer','ueber','iza','momba anao','momba ahy'] },

    { id: 'localisation', keywords: ['ou','habite','vit','localise','localisation','adresse','ville','pays','endroit','situe','region','madagascar','antananarivo','tana','habite ou','vit ou','tu es ou','ou es tu','where','wo','wohnort','aiza','aiza ianao'] },

    { id: 'disponibilite', keywords: ['dispo','disponible','disponibilite','mobilite','libre','ouvert','recherche','opportunite','embauche','recrutement','tu es dispo','libre quand','available','verfuegbar','misy','vonona'] },

    { id: 'contact', keywords: ['contact','contacter','contacte','joindre','parler','echanger','discuter','mail','email','telephone','numero','tel','phone','appel','appeler','comment contacter','comment te contacter','comment le contacter','kontakt','fifandraisana','mifandraisa'] },
    { id: 'email', keywords: ['email','mail','adresse mail','adresse email','courriel','gmail','envoyer mail','ecrire','ecrire a harry','son email','son mail','e-mail','mailaka'] },
    { id: 'whatsapp', keywords: ['whatsapp','whats','watsap','whatsap','wa','numero whatsapp','son whatsapp'] },
    { id: 'linkedin', keywords: ['linkedin','linked','linkdin','reseau pro','son linkedin'] },
    { id: 'gitlab', keywords: ['gitlab','git','code','repository','repo','github','son gitlab','ses codes','ses projets'] },
    { id: 'credly', keywords: ['credly','badge','badges','certification','certifications','certificat','cisco','certif','ses badges'] },

    { id: 'cv', keywords: ['cv','resume','curriculum','vitae','telecharger','telecharge','document','fichier','pdf','mon cv','ton cv','voir cv','son cv','telecharger cv','version cv','cv version','lebenslauf','resume','cv-ko'] },

    { id: 'competences', keywords: ['competence','competences','savoir faire','sait faire','fort','maitrise','connait','skills','skill','expertise','domaine','specialite','ses competences','tes competences','faehigkeiten','fahaizana'] },
    { id: 'competences_support', keywords: ['support it','systemes','systeme','admin','administration','windows','linux','active directory','glpi','office 365','microsoft 365','proxmox','vmware','reseau','tcp','dhcp','dns','support systeme'] },
    { id: 'competences_applicatifs', keywords: ['applicatif','application','dev','developpement','code','programmation','langage','python','django','flask','react','net','csharp','sql','postgres','javascript','ses langages','techno dev'] },
    { id: 'techno_dev', keywords: ['techno dev','technologie dev','stack','frontend','backend','fullstack','frameworks','outils dev','stack technique'] },
    { id: 'techno_support', keywords: ['techno support','technologie support','outils support','outil support','ses outils','outils it'] },

    { id: 'experiences', keywords: ['experience','experiences','parcours','carriere','travaille','travail','entreprise','societe','boulot','emploi','job','poste','missions','ses experiences','son parcours','ou a t il travaille','erfahrung'] },
    { id: 'experience_actuelle', keywords: ['actuel','actuelle','en ce moment','maintenant','actuellement','travaille actuellement','poste actuel','job actuel','travaille ou','ou travaille t il'] },

    { id: 'certifications', keywords: ['certification','certifications','formation','formations','certificat','diplome','diplomes','etude','etudes','ecole','universite','cursus','parcours scolaire','ses diplomes','ses certifications','zertifizierung'] },

    { id: 'projets', keywords: ['projet','projets','realisation','realisations','portfolio','app','application','site','developpe','developpement','creation','travaux','ses projets','ses realisations','quoi comme projet','projekte'] },
    { id: 'services', keywords: ['service','services','propose','offre','prestation','prestations','fait quoi','tu fais','peut faire','aide','aider','proposer','ses services','que fait il','dienstleistungen','tolotra'] },
    { id: 'freelance', keywords: ['freelance','free lance','independant','independance','mission','missions','travaille seul'] },
    { id: 'tarif', keywords: ['tarif','tarifs','prix','cout','combien','devis','facture','facturer','gratuit','gratis','combien ca coute','ses tarifs','prix prestation','preis'] },

    { id: 'langues', keywords: ['langue','langues','parle','parler','francais','anglais','allemand','malagasy','traduction','ses langues','quelles langues','sprachen','fiteny'] },

    /* ---------- ✅ NOUVELLE INTENTION ---------- */
    { id: 'interets', keywords: ['interet','interets','centre d interet','centres d interet','loisir','loisirs','passe temps','hobby','hobbies','aime','passion','passionne','interesse','ce qui l interesse','ce quil aime','zavatra tiany','interessen'] },

    { id: 'aide', keywords: ['aide','aider','peux tu','peut tu','tu peux','tu sais','tu sais faire','que sais tu','que peux tu','capable','capacite','a quoi sers','que faire','hilfe'] },
    { id: 'horaires', keywords: ['horaire','horaires','disponible quand','quand','heure','heures','travaille quand','dispo quand'] },
    { id: 'age', keywords: ['age','ans','quel age','tu as quel age','vieux'] }
  ];

  /* ==========================================================
     4. TROUVER L'INTENTION
     ========================================================== */
  function findBestIntent(text) {
    const normalized = normalize(text);
    if (!normalized) return null;

    const words = normalized.split(' ').filter(w => w.length >= 2);
    if (words.length === 0) return null;

    let bestIntent = null;
    let bestScore = 0;

    for (const intent of INTENTS) {
      let score = 0;
      for (const kw of intent.keywords) {
        const kwNorm = normalize(kw);
        if (normalized === kwNorm) score += 10;
        else if (normalized.includes(kwNorm)) {
          score += kwNorm.includes(' ') ? 6 : 3;
        } else {
          for (const word of words) {
            if (word.length >= 4 && (kwNorm.startsWith(word) || word.startsWith(kwNorm))) {
              score += 1;
            }
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }
    return bestScore >= 2 ? bestIntent : null;
  }

  /* ==========================================================
     5. FALLBACK MULTILINGUE
     ========================================================== */
  function getFallback() {
    const messages = {
      fr: [
        `Hmm, je ne suis pas certaine d'avoir bien compris 🤔. Pouvez-vous reformuler ? Je peux parler du **parcours** de Harry, ses **compétences**, ses **services**, ses **projets**, ses **centres d'intérêt** ou ses **contacts**.`,
        `Je n'ai pas compris 💭. Essayez : "Qui est Harry ?", "Ses compétences", "Ses services", "Comment le contacter", "Ses centres d'intérêt".`
      ],
      en: [
        `Hmm, I'm not sure I understood 🤔. Could you rephrase? I can talk about Harry's **background**, **skills**, **services**, **projects**, **interests** or **contacts**.`,
        `I didn't understand 💭. Try: "Who is Harry?", "His skills", "His services", "How to contact him", "His interests".`
      ],
      de: [
        `Hmm, ich bin nicht sicher, ob ich verstanden habe 🤔. Können Sie umformulieren? Ich kann über Harrys **Werdegang**, **Fähigkeiten**, **Dienste**, **Projekte**, **Interessen** oder **Kontakte** sprechen.`,
        `Ich habe nicht verstanden 💭. Versuchen Sie: "Wer ist Harry?", "Seine Fähigkeiten", "Seine Dienste", "Kontakt", "Seine Interessen".`
      ],
      mg: [
        `Hmm, tsy azoko tsara angamba 🤔. Azonao averina ve? Afaka miresaka momba ny **fintinarany**, ny **fahaizany**, ny **tolotra**, ny **tetikasany**, ny **zavatra tiany** na ny **fifandraisana** aho.`,
        `Tsy azoko 💭. Andramo: "Iza i Harry?", "Ny fahaizany", "Ny tolotra", "Fifandraisana", "Ny zavatra tiany".`
      ]
    };
    const list = messages[CURRENT_LANG] || messages.fr;
    return list[Math.floor(Math.random() * list.length)];
  }

  /* ==========================================================
     6. CRÉATION DE L'INTERFACE
     ========================================================== */
  const UI_TEXT = {
    fr: { welcome: 'Bonjour 👋 Je suis **Saphire**, l\'assistante virtuelle de Harry. Posez-moi une question sur son parcours, ses compétences, ses services, ses centres d\'intérêt ou pour le contacter.', placeholder: 'Posez votre question...', chips: [['Qui est Harry ?','👤 Qui est Harry ?'],['Quelles sont ses compétences ?','💻 Ses compétences'],['Ses centres d\'intérêt ?','🎯 Ses intérêts'],['Comment le contacter ?','📞 Le contacter']] },
    en: { welcome: 'Hello 👋 I\'m **Saphire**, Harry\'s virtual assistant. Ask me about his background, skills, services, interests or how to contact him.', placeholder: 'Ask your question...', chips: [['Who is Harry?','👤 Who is Harry?'],['His skills?','💻 His skills'],['His interests?','🎯 His interests'],['How to contact him?','📞 Contact him']] },
    de: { welcome: 'Hallo 👋 Ich bin **Saphire**, Harrys virtuelle Assistentin. Fragen Sie mich nach seinem Werdegang, Fähigkeiten, Diensten, Interessen oder Kontakt.', placeholder: 'Stellen Sie Ihre Frage...', chips: [['Wer ist Harry?','👤 Wer ist Harry?'],['Seine Fähigkeiten?','💻 Seine Fähigkeiten'],['Seine Interessen?','🎯 Seine Interessen'],['Kontakt?','📞 Kontakt']] },
    mg: { welcome: 'Manao ahoana 👋 Izaho dia **Saphire**, mpanampy an\'i Harry. Anontanio aho momba ny fintinarany, fahaizany, tolotra, zavatra tiany na fifandraisana aminy.', placeholder: 'Anontanio...', chips: [['Iza i Harry?','👤 Iza i Harry?'],['Ny fahaizany?','💻 Ny fahaizany'],['Ny zavatra tiany?','🎯 Ny tiany'],['Fifandraisana?','📞 Mifandraisa']] }
  };

  function createChatbotUI() {
    if (document.getElementById('chatbot-wrapper')) return;

    const ui = UI_TEXT[CURRENT_LANG] || UI_TEXT.fr;
    const chipsHtml = ui.chips.map(c =>
      `<button class="chatbot-chip" data-q="${c[0]}">${c[1]}</button>`
    ).join('');

    const wrap = document.createElement('div');
    wrap.id = 'chatbot-wrapper';
    wrap.innerHTML = `
      <button id="chatbot-toggle" aria-label="Ouvrir Saphire">
        <i class="bi bi-chat-dots-fill"></i>
        <span class="chatbot-badge">1</span>
      </button>

      <div id="chatbot-window" class="chatbot-hidden">
        <div class="chatbot-header">
          <div class="chatbot-header-avatar"><i class="bi bi-gem"></i></div>
          <div class="chatbot-header-info">
            <h4>Saphire <span class="chatbot-ai-tag">IA</span></h4>
            <span class="chatbot-status">
              <span class="chatbot-dot"></span> <span data-chatbot-status>En ligne</span>
            </span>
          </div>
          <button id="chatbot-close" aria-label="Fermer"><i class="bi bi-x-lg"></i></button>
        </div>

        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chatbot-msg chatbot-msg-bot">${ui.welcome}</div>
          <div class="chatbot-suggestions" id="chatbot-suggestions">${chipsHtml}</div>
        </div>

        <div class="chatbot-input-wrap">
          <input type="text" id="chatbot-input" placeholder="${ui.placeholder}" autocomplete="off" maxlength="250">
          <button id="chatbot-send" aria-label="Envoyer"><i class="bi bi-send-fill"></i></button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
  }

  /* ==========================================================
     7. RECONSTRUIRE LA MODAL QUAND LA LANGUE CHANGE
     ========================================================== */
  function rebuildUI() {
    const old = document.getElementById('chatbot-wrapper');
    if (old) old.remove();
    createChatbotUI();
    attachEvents();
  }

  /* ==========================================================
     8. AFFICHAGE DES MESSAGES
     ========================================================== */
  function formatMessage(text) {
    return String(text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/([\w.-]+@[\w.-]+\.\w+)/g, '<a href="mailto:$1">$1</a>');
  }

  function addMessage(text, type) {
    const messages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg chatbot-msg-' + type;
    msg.innerHTML = formatMessage(text);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const messages = document.getElementById('chatbot-messages');
    const typing = document.createElement('div');
    typing.className = 'chatbot-msg chatbot-msg-bot chatbot-typing';
    typing.id = 'chatbot-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('chatbot-typing');
    if (t) t.remove();
  }

  /* ==========================================================
     9. ENVOI D'UN MESSAGE
     ========================================================== */
  function handleSend(customText) {
    const input = document.getElementById('chatbot-input');
    const text = (customText || input.value).trim();
    if (!text) return;

    addMessage(text, 'user');
    if (!customText) input.value = '';

    const sugg = document.getElementById('chatbot-suggestions');
    if (sugg) sugg.style.display = 'none';

    const intent = findBestIntent(text);
    showTyping();

    setTimeout(() => {
      hideTyping();
      if (intent && REPLIES[intent.id]) {
        const fn = REPLIES[intent.id][CURRENT_LANG] || REPLIES[intent.id].fr;
        addMessage(fn(), 'bot');
      } else {
        addMessage(getFallback(), 'bot');
      }
    }, 600);
  }

  /* ==========================================================
     10. ATTACHER LES ÉVÉNEMENTS
     ========================================================== */
  function attachEvents() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const win = document.getElementById('chatbot-window');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const sugg = document.getElementById('chatbot-suggestions');

    if (!toggle || !close) return;

    toggle.addEventListener('click', () => win.classList.toggle('chatbot-hidden'));
    close.addEventListener('click', () => win.classList.add('chatbot-hidden'));
    send.addEventListener('click', () => handleSend());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
    });

    if (sugg) {
      sugg.addEventListener('click', function (e) {
        const chip = e.target.closest('.chatbot-chip');
        if (!chip) return;
        const q = chip.getAttribute('data-q');
        if (q) handleSend(q);
      });
    }
  }

  /* ==========================================================
     11. INITIALISATION + ÉCOUTE CHANGEMENT DE LANGUE
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    createChatbotUI();
    attachEvents();

    // ✅ Écouter le changement de langue du site
    window.addEventListener('languageChanged', function (e) {
      const lang = e.detail && e.detail.lang;
      if (lang && SUPPORTED_LANGS.includes(lang)) {
        CURRENT_LANG = lang;
        console.log('🌐 Saphire change de langue →', lang);
        rebuildUI();
      }
    });

    // ✅ Écouter aussi les clics sur les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lang = this.dataset.lang;
        if (lang && SUPPORTED_LANGS.includes(lang)) {
          CURRENT_LANG = lang;
          setTimeout(rebuildUI, 100); // laisser le temps à setLanguage
        }
      });
    });

    console.log('💎 Saphire multilingue initialisée (langue : ' + CURRENT_LANG + ')');
  });
})();