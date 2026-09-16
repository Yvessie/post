/* ==========================================================
   SAPHIRE — CHATBOT LOCAL MULTILINGUE
   Détection auto de langue + réponses dans 4 langues
   + Sidebar conversations + Grand modal style ChatGPT
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
     2. RÉPONSES MULTILINGUES
     ========================================================== */
  const REPLIES = {

    /* ---------- SALUTATIONS ---------- */
    salutation: {
      fr: () => `Bonjour 👋 Ravi de vous voir ! Je suis **Saphire**, l'assistante de Harry. Posez-moi une question sur son **parcours**, ses **compétences**, ses **services** ou pour le **contacter**.`,
      en: () => `Hello 👋 Nice to meet you! I'm **Saphire**, Harry's assistant.`,
      de: () => `Hallo 👋 Schön, Sie zu sehen! Ich bin **Saphire**.`,
      mg: () => `Manao ahoana 👋 Izaho dia **Saphire**, mpanampy an'i Harry.`
    },

    remerciement: {
      fr: () => `Avec plaisir 😊 N'hésitez pas si vous avez d'autres questions !`,
      en: () => `You're welcome 😊`,
      de: () => `Gern geschehen 😊`,
      mg: () => `Tsy misy fisaorana 😊`
    },

    aurevoir: {
      fr: () => `À bientôt 👋 Bonne journée !`,
      en: () => `See you soon 👋`,
      de: () => `Bis bald 👋`,
      mg: () => `Mandra-pihaona 👋`
    },

    /* ---------- SAPHIRE ---------- */
    qui_est_saphire: {
      fr: () => `Je suis **Saphire** 💎, l'assistante virtuelle de Harry Yves.`,
      en: () => `I'm **Saphire** 💎, Harry Yves' virtual assistant.`,
      de: () => `Ich bin **Saphire** 💎, Harry Yves' virtuelle Assistentin.`,
      mg: () => `Izaho dia **Saphire** 💎, mpanampy virtoaly an'i Harry Yves.`
    },

    saphire_info: {
      fr: () => `💎 **À propos de Saphire**\n\n**Saphire** est une assistante virtuelle en cours de développement.\n\n✅ **Capacités** :\n${KB.saphire_info.capacites.map(c => '• ' + c).join('\n')}\n\n⚠️ **Limites** :\n${KB.saphire_info.limites.map(l => '• ' + l).join('\n')}`,
      en: () => `💎 **About Saphire**\n\nVirtual assistant under development.\n\n✅ **Capabilities**:\n${KB.saphire_info.capacites.map(c => '• ' + c).join('\n')}\n\n⚠️ **Limitations**:\n${KB.saphire_info.limites.map(l => '• ' + l).join('\n')}`,
      de: () => `💎 **Über Saphire**\n\nVirtuelle Assistentin in Entwicklung.`,
      mg: () => `💎 **Momba an'i Saphire**\n\nMpanampy virtoaly mbola amboarina.`
    },

    /* ---------- IDENTITÉ ---------- */
    identite: {
      fr: () => `**${KB.identite.nom}** est un **${KB.identite.poste}** basé à ${KB.identite.localisation}. Il possède **${KB.identite.experience}**.`,
      en: () => `**${KB.identite.nom}** is a **${KB.identite.poste}** based in ${KB.identite.localisation}. He has **4 years of experience**.`,
      de: () => `**${KB.identite.nom}** ist ein **${KB.identite.poste}** mit Sitz in ${KB.identite.localisation}.`,
      mg: () => `**${KB.identite.nom}** dia **${KB.identite.poste}** mipetraka any ${KB.identite.localisation}.`
    },

    /* ---------- LOCALISATION & EMPLACEMENT ---------- */
    localisation: {
      fr: () => `Harry est basé à **${KB.identite.localisation}** 📍.`,
      en: () => `Harry is based in **${KB.identite.localisation}** 📍.`,
      de: () => `Harry ist in **${KB.identite.localisation}** ansässig 📍.`,
      mg: () => `Mipetraka any **${KB.identite.localisation}** i Harry 📍.`
    },

    emplacement_actuel: {
      fr: () => `📍 Harry est actuellement à **Antananarivo, Madagascar** ✅.`,
      en: () => `📍 Harry is currently in **Antananarivo, Madagascar** ✅.`,
      de: () => `📍 Harry ist derzeit in **Antananarivo, Madagaskar** ✅.`,
      mg: () => `📍 Any **Antananarivo, Madagasikara** i Harry amin'izao ✅.`
    },

    disponibilite: {
      fr: () => `Oui ! Harry est **${KB.identite.disponibilite}** ✅.`,
      en: () => `Yes! Harry is **available for international mobility** ✅.`,
      de: () => `Ja! Harry ist **verfügbar** ✅.`,
      mg: () => `Eny! **Vonona** i Harry ✅.`
    },

    /* ---------- CONTACTS ---------- */
    contact: {
      fr: () => `Voici comment contacter Harry 📞 :\n\n📧 **Email** : ${KB.contact.email}\n📱 **WhatsApp** : ${KB.contact.whatsapp}\n💼 **LinkedIn** : ${KB.contact.linkedin}\n🦊 **GitLab** : ${KB.contact.gitlab}\n🏆 **Credly** : ${KB.contact.credly}`,
      en: () => `Here's how to contact Harry 📞 :\n\n📧 **Email**: ${KB.contact.email}\n📱 **WhatsApp**: ${KB.contact.whatsapp}\n💼 **LinkedIn**: ${KB.contact.linkedin}\n🦊 **GitLab**: ${KB.contact.gitlab}\n🏆 **Credly**: ${KB.contact.credly}`,
      de: () => `So kontaktieren Sie Harry 📞 :\n\n📧 **E-Mail**: ${KB.contact.email}\n📱 **WhatsApp**: ${KB.contact.whatsapp}\n💼 **LinkedIn**: ${KB.contact.linkedin}\n🦊 **GitLab**: ${KB.contact.gitlab}\n🏆 **Credly**: ${KB.contact.credly}`,
      mg: () => `Ireto ny fomba hifandraisana amin'i Harry 📞 :\n\n📧 **Mailaka**: ${KB.contact.email}\n📱 **WhatsApp**: ${KB.contact.whatsapp}\n💼 **LinkedIn**: ${KB.contact.linkedin}\n🦊 **GitLab**: ${KB.contact.gitlab}\n🏆 **Credly**: ${KB.contact.credly}`
    },

    email: {
      fr: () => `Email : **${KB.contact.email}** 📧.`,
      en: () => `Email: **${KB.contact.email}** 📧.`,
      de: () => `E-Mail: **${KB.contact.email}** 📧.`,
      mg: () => `Mailaka: **${KB.contact.email}** 📧.`
    },

    whatsapp: {
      fr: () => `WhatsApp : **${KB.contact.whatsapp}** 📱.`,
      en: () => `WhatsApp: **${KB.contact.whatsapp}** 📱.`,
      de: () => `WhatsApp: **${KB.contact.whatsapp}** 📱.`,
      mg: () => `WhatsApp: **${KB.contact.whatsapp}** 📱.`
    },

    linkedin: {
      fr: () => `LinkedIn : **${KB.contact.linkedin}** 💼`,
      en: () => `LinkedIn: **${KB.contact.linkedin}** 💼`,
      de: () => `LinkedIn: **${KB.contact.linkedin}** 💼`,
      mg: () => `LinkedIn: **${KB.contact.linkedin}** 💼`
    },

    gitlab: {
      fr: () => `GitLab : **${KB.contact.gitlab}** 🦊`,
      en: () => `GitLab: **${KB.contact.gitlab}** 🦊`,
      de: () => `GitLab: **${KB.contact.gitlab}** 🦊`,
      mg: () => `GitLab: **${KB.contact.gitlab}** 🦊`
    },

    credly: {
      fr: () => `Credly : **${KB.contact.credly}** 🏆`,
      en: () => `Credly: **${KB.contact.credly}** 🏆`,
      de: () => `Credly: **${KB.contact.credly}** 🏆`,
      mg: () => `Credly: **${KB.contact.credly}** 🏆`
    },

    /* ---------- CV ---------- */
    cv: {
      fr: () => `CV de Harry 📄 dans la section **Résumé** :\n• 🇫🇷 Français\n• 🇫🇷 Français avec photo\n• 🇬🇧 Anglais\n\n💡 Générez aussi un CV en 4 langues !`,
      en: () => `Harry's CV 📄 in the **Resume** section:\n• 🇫🇷 French\n• 🇫🇷 French with photo\n• 🇬🇧 English`,
      de: () => `Harrys Lebenslauf 📄:\n• 🇫🇷 Französisch\n• 🇫🇷 Französisch mit Foto\n• 🇬🇧 Englisch`,
      mg: () => `Ny CV an'i Harry 📄:\n• 🇫🇷 Frantsay\n• 🇫🇷 Frantsay misy sary\n• 🇬🇧 Anglisy`
    },

        /* ---------- ✅ GÉNÉRATION CV — GUIDE ---------- */
    cv_generate_guide: {
      fr: () => `📄 **Générer mon CV en PDF**

      Voici comment procéder pour générer et télécharger le CV de Harry :

      **Étape 1** — Rendez-vous dans la section **Résumé** de la page
      **Étape 2** — Cliquez sur le bouton **"Générer mon CV (PDF)"**
      **Étape 3** — Choisissez la langue souhaitée dans la boîte de dialogue :
         • 🇫🇷 Français
         • 🇬🇧 Anglais
         • 🇩🇪 Allemand
         • 🇲🇬 Malagasy
      **Étape 4** — Le PDF s'ouvrira automatiquement, il ne vous restera plus qu'à l'enregistrer

      💡 **Voulez-vous aussi que je vous fournisse une version déjà prête ?** (répondez "oui" ou "non")`,

            en: () => `📄 **Generate my CV as PDF**

      Here's how to generate and download Harry's CV:

      **Step 1** — Go to the **Resume** section of the page
      **Step 2** — Click the **"Generate my CV (PDF)"** button
      **Step 3** — Choose the desired language in the dialog:
         • 🇫🇷 French
         • 🇬🇧 English
         • 🇩🇪 German
         • 🇲🇬 Malagasy
      **Step 4** — The PDF will open automatically, just save it

      💡 **Would you also like me to provide a ready-made version?** (answer "yes" or "no")`,

            de: () => `📄 **Lebenslauf als PDF generieren**

      So generieren und laden Sie Harrys Lebenslauf herunter:

      **Schritt 1** — Gehen Sie zum Bereich **Lebenslauf**
      **Schritt 2** — Klicken Sie auf **"Lebenslauf generieren (PDF)"**
      **Schritt 3** — Wählen Sie die Sprache:
         • 🇫🇷 Französisch
         • 🇬🇧 Englisch
         • 🇩🇪 Deutsch
         • 🇲🇬 Malagasy
      **Schritt 4** — Das PDF öffnet sich automatisch

      💡 **Möchten Sie auch eine fertige Version?** (antworten Sie "ja" oder "nein")`,

            mg: () => `📄 **Mamorona ny CV amin'ny PDF**

      Ireto ny dingana hamoronana sy hakana ny CV an'i Harry:

      **Dingana 1** — Mankanesa any amin'ny fizarana **Fintinarana**
      **Dingana 2** — Tsindrio ny bokotra **"Mamorona CV (PDF)"**
      **Dingana 3** — Safidio ny fiteny:
         • 🇫🇷 Frantsay
         • 🇬🇧 Anglisy
         • 🇩🇪 Alemana
         • 🇲🇬 Malagasy
      **Dingana 4** — Hisokatra ho azy ny PDF, tehirizo fotsiny

      💡 **Tianao ve koa ny dika efa vita?** (valio "eny" na "tsia")`
          },

          /* ---------- ✅ CV — CHOIX DE LANGUE ---------- */
          cv_choose_language: {
            fr: () => `📋 **De quelle version souhaitez-vous ?**

      Veuillez choisir parmi les versions disponibles :
         • 🇫🇷 **Français** → répondez "français"
         • 🇫🇷 **Français avec photo** → répondez "photo"
         • 🇬🇧 **Anglais** → répondez "anglais"`,

            en: () => `📋 **Which version would you like?**

      Please choose among the available versions:
         • 🇫🇷 **French** → answer "french"
         • 🇫🇷 **French with photo** → answer "photo"
         • 🇬🇧 **English** → answer "english"`,

            de: () => `📋 **Welche Version möchten Sie?**

      Bitte wählen Sie:
         • 🇫🇷 **Französisch** → antworten Sie "französisch"
         • 🇫🇷 **Französisch mit Foto** → antworten Sie "foto"
         • 🇬🇧 **Englisch** → antworten Sie "englisch"`,

            mg: () => `📋 **Iza amin'ireto dika ireto no tianao?**

      Safidio:
         • 🇫🇷 **Frantsay** → valio "frantsay"
         • 🇫🇷 **Frantsay misy sary** → valio "sary"
         • 🇬🇧 **Anglisy** → valio "anglisy"`
          },

          /* ---------- ✅ CV — LIEN DE TÉLÉCHARGEMENT ---------- */
          cv_download_link: {
            fr: (v) => `✅ **Voici votre CV — Version ${v.label}**

      ${v.flag} **${v.description}**

      📥 **Télécharger maintenant** : [Cliquez ici pour télécharger le CV](${v.fichier})

      🔗 Vous pouvez aussi ouvrir le PDF directement dans un nouvel onglet.

      💡 Besoin d'une **autre version** ? Répondez "autre"`,

            en: (v) => `✅ **Here is your CV — ${v.label} Version**

      ${v.flag} **${v.description}**

      📥 **Download now**: [Click here to download the CV](${v.fichier})

      🔗 You can also open the PDF directly in a new tab.

      💡 Need **another version**? Answer "other"`,

            de: (v) => `✅ **Hier ist Ihr Lebenslauf — Version ${v.label}**

      ${v.flag} **${v.description}**

      📥 **Jetzt herunterladen**: [Klicken Sie hier, um den Lebenslauf herunterzuladen](${v.fichier})

      🔗 Sie können das PDF auch in einem neuen Tab öffnen.

      💡 **Andere Version** benötigt? Antworten Sie "andere"`,

            mg: (v) => `✅ **Ity ny CV-nao — Dika ${v.label}**

      ${v.flag} **${v.description}**

      📥 **Alaina izao**: [Tsindrio eto raha hakana ny CV](${v.fichier})

      🔗 Azonao atao koa ny manokatra ny PDF amin'ny varavarankely vaovao.

      💡 Mila **dika hafa**? Valio "hafa"`
          },

          /* ---------- ✅ CV — AUCUNE VERSION / ANNULER ---------- */
          cv_cancel: {
            fr: () => `D'accord 👍 Si vous souhaitez la version PDF, n'hésitez pas à revenir. Vous pouvez aussi retrouver tous les CV dans la section **Résumé** du portfolio.`,
            en: () => `Alright 👍 If you'd like the PDF version later, feel free. You can also find all CVs in the **Resume** section.`,
            de: () => `In Ordnung 👍 Wenn Sie die PDF-Version später möchten, kein Problem. Alle Lebensläufe finden Sie im Bereich **Lebenslauf**.`,
            mg: () => `Tsara 👍 Raha tianao ny dika PDF aoriana, miverena fotsiny. Hita ao amin'ny **Fintinarana** ny CV rehetra.`
          },

    /* ---------- COMPÉTENCES ---------- */
    competences: {
      fr: () => `🎯 **2 grands domaines** :\n\n🖥️ **Support IT** : Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware, Réseaux\n💻 **Applications** : SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      en: () => `🎯 **2 main areas**:\n\n🖥️ **IT Support**: Windows/Linux, GLPI, Active Directory, Microsoft 365, Proxmox, VMware\n💻 **Applications**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      de: () => `🎯 **2 Hauptbereiche**:\n\n🖥️ **IT-Support**: Windows/Linux, GLPI, Active Directory, Microsoft 365\n💻 **Anwendungen**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`,
      mg: () => `🎯 **Sehatra 2 lehibe** :\n\n🖥️ **Fanohanana IT**: Windows/Linux, GLPI, Active Directory, Microsoft 365\n💻 **Rindranasa**: SQL Server, PostgreSQL, HTML/CSS, JavaScript, React, .NET C#, Python, Django, Flask`
    },

    competences_support: {
      fr: () => `🖥️ **Support IT** :\n${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      en: () => `🖥️ **IT Support**:\n${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      de: () => `🖥️ **IT-Support**:\n${KB.competences_support.map(c => '• ' + c).join('\n')}`,
      mg: () => `🖥️ **Fanohanana IT**:\n${KB.competences_support.map(c => '• ' + c).join('\n')}`
    },

        /* ---------- ✅ COMPÉTENCES EN DÉVELOPPEMENT (DÉDIÉE) ---------- */
    competences_dev_detail: {
      fr: () => `💻 **Harry — Compétences en développement**

      **🎨 Frontend**
      ${KB.techno_dev.frontend.map(f => '• ' + f).join('\n')}

      **⚙️ Backend**
      ${KB.techno_dev.backend.map(b => '• ' + b).join('\n')}

      **🗄️ Bases de données**
      ${KB.techno_dev.bdd.map(d => '• ' + d).join('\n')}

      **🛠️ Outils**
      ${KB.techno_dev.outils.map(o => '• ' + o).join('\n')}

      💡 **Type de profil** : Développeur **FullStack**

      Souhaitez-vous voir ses **projets réalisés** ou ses **certifications** ?`,

            en: () => `💻 **Harry — Development skills**

      **🎨 Frontend**
      ${KB.techno_dev.frontend.map(f => '• ' + f).join('\n')}

      **⚙️ Backend**
      ${KB.techno_dev.backend.map(b => '• ' + b).join('\n')}

      **🗄️ Databases**
      ${KB.techno_dev.bdd.map(d => '• ' + d).join('\n')}

      **🛠️ Tools**
      ${KB.techno_dev.outils.map(o => '• ' + o).join('\n')}

      💡 **Profile type**: **FullStack** Developer

      Would you like to see his **completed projects** or **certifications**?`,

            de: () => `💻 **Harry — Entwicklungsfähigkeiten**

      **🎨 Frontend**
      ${KB.techno_dev.frontend.map(f => '• ' + f).join('\n')}

      **⚙️ Backend**
      ${KB.techno_dev.backend.map(b => '• ' + b).join('\n')}

      **🗄️ Datenbanken**
      ${KB.techno_dev.bdd.map(d => '• ' + d).join('\n')}

      **🛠️ Tools**
      ${KB.techno_dev.outils.map(o => '• ' + o).join('\n')}

      💡 **Profil-Typ**: **FullStack** Entwickler

      Möchten Sie seine **durchgeführten Projekte** oder **Zertifizierungen** sehen?`,

            mg: () => `💻 **Harry — Fahaizana amin'ny famoronana**

      **🎨 Frontend**
      ${KB.techno_dev.frontend.map(f => '• ' + f).join('\n')}

      **⚙️ Backend**
      ${KB.techno_dev.backend.map(b => '• ' + b).join('\n')}

      **🗄️ Tahiry angona**
      ${KB.techno_dev.bdd.map(d => '• ' + d).join('\n')}

      **🛠️ Fitaovana**
      ${KB.techno_dev.outils.map(o => '• ' + o).join('\n')}

      💡 **Karazana profil** : Mpamorona **FullStack**

      Tianao ve ny mahita ny **tetikasa efa nataony** na ny **fanamarinany** ?`
    },

        /* ---------- ✅ COMPÉTENCES EN DÉVELOPPEMENT ---------- */
    competences_applicatifs: {
      fr: () => `💻 **Compétences de Harry en développement**

      **🗄️ Bases de données**
      ${KB.competences_applicatifs.bases_donnees.map(b => '• ' + b).join('\n')}

      **🌐 Langages & Frameworks**
      ${KB.competences_applicatifs.langages.map(l => '• ' + l).join('\n')}

      **🛠️ Outils de développement**
      ${KB.competences_applicatifs.outils.map(o => '• ' + o).join('\n')}

      💡 **Stack principale** : FullStack (Frontend + Backend)
      Souhaitez-vous voir ses **projets réalisés** ?`,

            en: () => `💻 **Harry's development skills**

      **🗄️ Databases**
      ${KB.competences_applicatifs.bases_donnees.map(b => '• ' + b).join('\n')}

      **🌐 Languages & Frameworks**
      ${KB.competences_applicatifs.langages.map(l => '• ' + l).join('\n')}

      **🛠️ Development tools**
      ${KB.competences_applicatifs.outils.map(o => '• ' + o).join('\n')}

      💡 **Main stack**: FullStack (Frontend + Backend)
      Would you like to see his **completed projects**?`,

            de: () => `💻 **Harrys Entwicklungsfähigkeiten**

      **🗄️ Datenbanken**
      ${KB.competences_applicatifs.bases_donnees.map(b => '• ' + b).join('\n')}

      **🌐 Sprachen & Frameworks**
      ${KB.competences_applicatifs.langages.map(l => '• ' + l).join('\n')}

      **🛠️ Entwicklungstools**
      ${KB.competences_applicatifs.outils.map(o => '• ' + o).join('\n')}

      💡 **Haupt-Stack**: FullStack (Frontend + Backend)
      Möchten Sie seine **durchgeführten Projekte** sehen?`,

            mg: () => `💻 **Fahaizan'i Harry amin'ny famoronana**

      **🗄️ Tahiry angona**
      ${KB.competences_applicatifs.bases_donnees.map(b => '• ' + b).join('\n')}

      **🌐 Fiteny & Frameworks**
      ${KB.competences_applicatifs.langages.map(l => '• ' + l).join('\n')}

      **🛠️ Fitaovana famoronana**
      ${KB.competences_applicatifs.outils.map(o => '• ' + o).join('\n')}

      💡 **Stack lehibe** : FullStack (Frontend + Backend)
      Tianao ve ny mahita ny **tetikasa efa nataony** ?`
    },

    techno_dev: {
      fr: () => `🚀 **Technologies dev** :\n🎨 Frontend : ${KB.techno_dev.frontend.join(', ')}\n⚙️ Backend : ${KB.techno_dev.backend.join(', ')}\n🗄️ BDD : ${KB.techno_dev.bdd.join(', ')}`,
      en: () => `🚀 **Dev techs**:\n🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}\n⚙️ Backend: ${KB.techno_dev.backend.join(', ')}\n🗄️ Databases: ${KB.techno_dev.bdd.join(', ')}`,
      de: () => `🚀 **Entwicklungstechnologien**:\n🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}\n⚙️ Backend: ${KB.techno_dev.backend.join(', ')}\n🗄️ Datenbanken: ${KB.techno_dev.bdd.join(', ')}`,
      mg: () => `🚀 **Teknolojia famoronana**:\n🎨 Frontend: ${KB.techno_dev.frontend.join(', ')}\n⚙️ Backend: ${KB.techno_dev.backend.join(', ')}\n🗄️ Tahiry angona: ${KB.techno_dev.bdd.join(', ')}`
    },

    techno_support: {
      fr: () => `🖥️ **Technologies support** :\n💿 OS : ${KB.techno_support.os.join(', ')}\n📋 Gestion : ${KB.techno_support.gestion.join(', ')}\n🖥️ Virtualisation : ${KB.techno_support.virtualisation.join(', ')}`,
      en: () => `🖥️ **Support techs**:\n💿 OS: ${KB.techno_support.os.join(', ')}\n📋 Management: ${KB.techno_support.gestion.join(', ')}\n🖥️ Virtualization: ${KB.techno_support.virtualisation.join(', ')}`,
      de: () => `🖥️ **Support-Technologien**:\n💿 BS: ${KB.techno_support.os.join(', ')}\n📋 Verwaltung: ${KB.techno_support.gestion.join(', ')}\n🖥️ Virtualisierung: ${KB.techno_support.virtualisation.join(', ')}`,
      mg: () => `🖥️ **Teknolojia fanohanana**:\n💿 OS: ${KB.techno_support.os.join(', ')}\n📋 Fitantanana: ${KB.techno_support.gestion.join(', ')}\n🖥️ Virtualisation: ${KB.techno_support.virtualisation.join(', ')}`
    },

    /* ---------- DIPLÔMES UNIQUEMENT ---------- */
    diplomes: {
      fr: () => `🎓 **Diplômes obtenus par Harry** :\n\n${KB.diplomes_detail.map(d => `• **${d.titre}** — ${d.specialite}\n  _${d.etablissement}_ (${d.annee})`).join('\n\n')}`,
      en: () => `🎓 **Harry's degrees**:\n\n• **Bachelor in Computer Science** — Risk and Decision\n  _ESMIA_ (2021 - 2023)\n\n• **Baccalaureate** — General Education\n  _LPR_ (2017 - 2018)`,
      de: () => `🎓 **Harrys Diplome**:\n\n• **Bachelor in Informatik** — Risiko und Entscheidung\n  _ESMIA_ (2021 - 2023)\n\n• **Abitur** — Allgemeine Hochschulreife\n  _LPR_ (2017 - 2018)`,
      mg: () => `🎓 **Diplaoma azon'i Harry** :\n\n• **Licence amin'ny Informatika** — Risika sy Fanapahan-kevitra\n  _ESMIA_ (2021 - 2023)\n\n• **Baccalauréat** — Fianarana ankapobeny\n  _LPR_ (2017 - 2018)`
    },

    /* ---------- CERTIFICATIONS UNIQUEMENT ---------- */
    certifications_seules: {
      fr: () => `🏆 **Certifications obtenues par Harry** :\n\n${KB.certifications_detail.map(c => `• **${c.titre}** — _${c.annee}_`).join('\n')}\n\n💡 Souhaitez-vous les **liens de preuve** ? (répondez "oui" ou "non")`,
      en: () => `🏆 **Harry's certifications**:\n\n${KB.certifications_detail.map(c => `• **${c.titre}** — _${c.annee}_`).join('\n')}\n\n💡 Would you like the **proof links**? (answer "yes" or "no")`,
      de: () => `🏆 **Harrys Zertifizierungen**:\n\n${KB.certifications_detail.map(c => `• **${c.titre}** — _${c.annee}_`).join('\n')}\n\n💡 Möchten Sie die **Nachweis-Links**? (antworten Sie "ja" oder "nein")`,
      mg: () => `🏆 **Fanamarinana azon'i Harry** :\n\n${KB.certifications_detail.map(c => `• **${c.titre}** — _${c.annee}_`).join('\n')}\n\n💡 Tianao ve ny **rohy fanamarinana**? (valio "eny" na "tsia")`
    },

    preuves_certifications: {
      fr: () => `🔗 **Liens de preuve** :\n\n${KB.certifications_detail.filter(c => c.lien).map(c => `• **${c.titre}**\n  🔗 ${c.lien}`).join('\n\n')}\n\n⚠️ Certaines certifications n'ont pas de lien public.`,
      en: () => `🔗 **Proof links**:\n\n${KB.certifications_detail.filter(c => c.lien).map(c => `• **${c.titre}**\n  🔗 ${c.lien}`).join('\n\n')}\n\n⚠️ Some have no public link.`,
      de: () => `🔗 **Nachweis-Links**:\n\n${KB.certifications_detail.filter(c => c.lien).map(c => `• **${c.titre}**\n  🔗 ${c.lien}`).join('\n\n')}\n\n⚠️ Einige haben keine öffentlichen Links.`,
      mg: () => `🔗 **Rohy fanamarinana**:\n\n${KB.certifications_detail.filter(c => c.lien).map(c => `• **${c.titre}**\n  🔗 ${c.lien}`).join('\n\n')}\n\n⚠️ Ny sasany tsy manana rohy.`
    },

    aucune_preuve: {
      fr: () => `D'accord 👍 Si vous souhaitez plus tard voir les preuves, faites-le-moi savoir.`,
      en: () => `Alright 👍 If you'd like to see the proof later, let me know.`,
      de: () => `In Ordnung 👍 Wenn Sie später die Nachweise sehen möchten, lassen Sie es mich wissen.`,
      mg: () => `Tsara 👍 Raha tianao ny mahita ny porofo aoriana, lazao amiko.`
    },

    /* ---------- EXPÉRIENCES ---------- */
    experiences: {
      fr: () => `🎯 **Parcours** :\n${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      en: () => `🎯 **Career**:\n${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      de: () => `🎯 **Werdegang**:\n${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`,
      mg: () => `🎯 **Fintinarana**:\n${KB.experiences.map(e => `${e.actuel ? '🟢' : '•'} **${e.titre}** — _${e.entreprise}_ (${e.date})`).join('\n')}`
    },

    experience_actuelle: {
      fr: () => { const c = KB.experiences.find(e => e.actuel); return `🟢 **Poste actuel** : **${c.titre}** chez **${c.entreprise}** (${c.date}).`; },
      en: () => { const c = KB.experiences.find(e => e.actuel); return `🟢 **Current**: **${c.titre}** at **${c.entreprise}** (${c.date}).`; },
      de: () => { const c = KB.experiences.find(e => e.actuel); return `🟢 **Aktuelle Position**: **${c.titre}** bei **${c.entreprise}** (${c.date}).`; },
      mg: () => { const c = KB.experiences.find(e => e.actuel); return `🟢 **Toerana ankehitriny**: **${c.titre}** ao amin'ny **${c.entreprise}** (${c.date}).`; }
    },

    annees_experience: {
      fr: () => `⏱️ **Expérience professionnelle de Harry** :\n\n🎯 **Total** : **${KB.annees_experience.total}** dans le domaine IT\n🖥️ **Support IT** : ${KB.annees_experience.support_it}\n💻 **Développement FullStack** : ${KB.annees_experience.developpement}\n\n📅 _${KB.annees_experience.detail}_`,
      en: () => `⏱️ **Harry's professional experience**:\n\n🎯 **Total**: **4 years**\n🖥️ **IT Support**: 4 years\n💻 **FullStack Dev**: 2 years\n\n📅 _Support IT since 2020 · Dev since 2022_`,
      de: () => `⏱️ **Harrys Berufserfahrung**:\n\n🎯 **Gesamt**: **4 Jahre**\n🖥️ **IT-Support**: 4 Jahre\n💻 **FullStack-Entwicklung**: 2 Jahre`,
      mg: () => `⏱️ **Traikefa an'i Harry** :\n\n🎯 **Total** : **4 taona**\n🖥️ **Fanohanana IT** : 4 taona\n💻 **Famoronana FullStack** : 2 taona`
    },

    /* ---------- CERTIFICATIONS COMBINÉES (legacy) ---------- */
    certifications: {
      fr: () => `🎓 **Certifications** :\n${KB.certifications.map(c => '• ' + c).join('\n')}\n\n📜 **Diplômes** :\n${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      en: () => `🎓 **Certifications**:\n${KB.certifications.map(c => '• ' + c).join('\n')}\n\n📜 **Diplomas**:\n${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      de: () => `🎓 **Zertifizierungen**:\n${KB.certifications.map(c => '• ' + c).join('\n')}\n\n📜 **Diplome**:\n${KB.diplomes.map(d => '• ' + d).join('\n')}`,
      mg: () => `🎓 **Fanamarinana**:\n${KB.certifications.map(c => '• ' + c).join('\n')}\n\n📜 **Diplaoma**:\n${KB.diplomes.map(d => '• ' + d).join('\n')}`
    },

    /* ---------- PROJETS / SERVICES / TARIFS ---------- */
    projets: {
      fr: () => `📂 **Projets** :\n${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      en: () => `📂 **Projects**:\n${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      de: () => `📂 **Projekte**:\n${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`,
      mg: () => `📂 **Tetikasa**:\n${KB.projets.map(p => `• **${p.nom}** — ${p.description} _(${p.techno})_`).join('\n')}`
    },

    services: {
      fr: () => `💼 **Services** :\n${KB.services.map(s => '• ' + s).join('\n')}`,
      en: () => `💼 **Services**:\n${KB.services.map(s => '• ' + s).join('\n')}`,
      de: () => `💼 **Dienstleistungen**:\n${KB.services.map(s => '• ' + s).join('\n')}`,
      mg: () => `💼 **Tolotra**:\n${KB.services.map(s => '• ' + s).join('\n')}`
    },

    freelance: {
      fr: () => `Oui, Harry travaille en **freelance** 💼. Contact : ${KB.contact.email}`,
      en: () => `Yes, Harry works as a **freelancer** 💼. Contact: ${KB.contact.email}`,
      de: () => `Ja, Harry arbeitet **freiberuflich** 💼. Kontakt: ${KB.contact.email}`,
      mg: () => `Eny, miasa **freelance** i Harry 💼. Mifandraisa: ${KB.contact.email}`
    },

    tarif: {
      fr: () => `Les tarifs dépendent de la mission 💰. Devis : ${KB.contact.email}`,
      en: () => `Rates depend on the mission 💰. Quote: ${KB.contact.email}`,
      de: () => `Die Preise hängen von der Mission ab 💰. Angebot: ${KB.contact.email}`,
      mg: () => `Miankina amin'ny asa ny vidiny 💰. Devis: ${KB.contact.email}`
    },

    /* ---------- LANGUES / INTÉRÊTS ---------- */
    langues: {
      fr: () => `🌍 **Langues** :\n🇲🇬 Malagasy : ${KB.langues.Malagasy}\n🇫🇷 Français : ${KB.langues.Français}\n🇬🇧 Anglais : ${KB.langues.Anglais}\n🇩🇪 Allemand : ${KB.langues.Allemand}`,
      en: () => `🌍 **Languages**:\n🇲🇬 Malagasy: Native\n🇫🇷 French: Fluent\n🇬🇧 English: Intermediate\n🇩🇪 German: A2`,
      de: () => `🌍 **Sprachen**:\n🇲🇬 Malagasy: Muttersprache\n🇫🇷 Französisch: Fließend\n🇬🇧 Englisch: Mittelstufe\n🇩🇪 Deutsch: A2`,
      mg: () => `🌍 **Fiteny** :\n🇲🇬 Malagasy : Reny\n🇫🇷 Frantsay : Mahay tsara\n🇬🇧 Anglisy : Antonony\n🇩🇪 Alemana : A2`
    },

    interets: {
      fr: () => `🎯 **Centres d'intérêt** :\n\n💡 **Tech** :\n${KB.interets.tech.map(i => '• ' + i).join('\n')}\n\n💼 **Pro** :\n${KB.interets.professionnels.map(i => '• ' + i).join('\n')}\n\n🌟 **Perso** :\n${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,
      en: () => `🎯 **Interests**:\n\n💡 **Tech**:\n${KB.interets.tech.map(i => '• ' + i).join('\n')}\n\n💼 **Professional**:\n${KB.interets.professionnels.map(i => '• ' + i).join('\n')}\n\n🌟 **Personal**:\n${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,
      de: () => `🎯 **Interessen**:\n\n💡 **Technologien**:\n${KB.interets.tech.map(i => '• ' + i).join('\n')}\n\n💼 **Beruflich**:\n${KB.interets.professionnels.map(i => '• ' + i).join('\n')}\n\n🌟 **Persönlich**:\n${KB.interets.personnels.map(i => '• ' + i).join('\n')}`,
      mg: () => `🎯 **Zavatra tian'i Harry** :\n\n💡 **Teknolojia** :\n${KB.interets.tech.map(i => '• ' + i).join('\n')}\n\n💼 **Matihanina** :\n${KB.interets.professionnels.map(i => '• ' + i).join('\n')}\n\n🌟 **Manokana** :\n${KB.interets.personnels.map(i => '• ' + i).join('\n')}`
    },

    /* ---------- RECRUTEUR ---------- */
    recruteur_profil: {
      fr: () => `👔 **Profil recruteur** :\n\n✅ **Points forts** :\n${KB.recruteur.points_forts.map(p => '• ' + p).join('\n')}\n\n🎯 **Idéal pour** :\n${KB.recruteur.ideal_pour.map(i => '• ' + i).join('\n')}`,
      en: () => `👔 **Recruiter profile**:\n\n✅ **Strengths**:\n${KB.recruteur.points_forts.map(p => '• ' + p).join('\n')}\n\n🎯 **Ideal for**:\n${KB.recruteur.ideal_pour.map(i => '• ' + i).join('\n')}`,
      de: () => `👔 **Recruiter-Profil**:\n\n✅ **Stärken**:\n${KB.recruteur.points_forts.map(p => '• ' + p).join('\n')}\n\n🎯 **Ideal für**:\n${KB.recruteur.ideal_pour.map(i => '• ' + i).join('\n')}`,
      mg: () => `👔 **Mombamomba ho mpandraharaha**:\n\n✅ **Toetra tsara** :\n${KB.recruteur.points_forts.map(p => '• ' + p).join('\n')}\n\n🎯 **Mety ho an'ny** :\n${KB.recruteur.ideal_pour.map(i => '• ' + i).join('\n')}`
    },

    pourquoi_recruter: {
      fr: () => `🎯 **Pourquoi recruter Harry ?**\n\n${KB.recruteur.qualites.map(q => '• ' + q).join('\n')}`,
      en: () => `🎯 **Why hire Harry?**\n\n${KB.recruteur.qualites.map(q => '• ' + q).join('\n')}`,
      de: () => `🎯 **Warum Harry einstellen?**\n\n${KB.recruteur.qualites.map(q => '• ' + q).join('\n')}`,
      mg: () => `🎯 **Nahoana no haka an'i Harry?**\n\n${KB.recruteur.qualites.map(q => '• ' + q).join('\n')}`
    },

    exemples_questions: {
      fr: () => `💡 **${KB.exemples_questions.titres.fr}**\n\n${KB.exemples_questions.liste.fr.map(q => '• ' + q).join('\n')}`,
      en: () => `💡 **${KB.exemples_questions.titres.en}**\n\n${KB.exemples_questions.liste.en.map(q => '• ' + q).join('\n')}`,
      de: () => `💡 **${KB.exemples_questions.titres.de}**\n\n${KB.exemples_questions.liste.de.map(q => '• ' + q).join('\n')}`,
      mg: () => `💡 **${KB.exemples_questions.titres.mg}**\n\n${KB.exemples_questions.liste.mg.map(q => '• ' + q).join('\n')}`
    },

    aide: {
      fr: () => `Je suis **Saphire** 💎. Je peux répondre sur :\n• 👤 Qui est Harry\n• 💻 Ses **compétences**\n• 🎓 Ses **certifications**\n• 📂 Ses **projets**\n• 💼 Ses **services**\n• 📞 Ses **contacts**\n• 🌍 Ses **langues**\n• 🎯 Ses **centres d'intérêt**\n• 👔 Son **profil recruteur**`,
      en: () => `I'm **Saphire** 💎. I can answer about:\n• 👤 Who Harry is\n• 💻 His **skills**\n• 🎓 His **certifications**\n• 📂 His **projects**\n• 💼 His **services**\n• 📞 His **contacts**\n• 🌍 His **languages**\n• 🎯 His **interests**\n• 👔 His **recruiter profile**`,
      de: () => `Ich bin **Saphire** 💎. Ich beantworte Fragen zu:\n• 👤 Wer Harry ist\n• 💻 Seinen **Fähigkeiten**\n• 🎓 Seinen **Zertifizierungen**\n• 📂 Seinen **Projekten**\n• 💼 Seinen **Diensten**\n• 📞 Seinen **Kontakten**\n• 🌍 Seinen **Sprachen**\n• 🎯 Seinen **Interessen**\n• 👔 Seinem **Recruiter-Profil**`,
      mg: () => `Izaho dia **Saphire** 💎. Mamaly momba:\n• 👤 Iza i Harry\n• 💻 Ny **fahaizany**\n• 🎓 Ny **fanamarinany**\n• 📂 Ny **tetikasany**\n• 💼 Ny **tolotra**\n• 📞 Ny **fifandraisana**\n• 🌍 Ny **fiteny**\n• 🎯 Ny **zavatra tiany**\n• 👔 Ny **mombamomba azy**`
    },

    horaires: {
      fr: () => `Horaires flexibles ⏰. Contactez-le : ${KB.contact.email}`,
      en: () => `Flexible hours ⏰. Contact: ${KB.contact.email}`,
      de: () => `Flexible Arbeitszeiten ⏰. Kontakt: ${KB.contact.email}`,
      mg: () => `Malalaka ny ora ⏰. Mifandraisa: ${KB.contact.email}`
    },

    age: {
      fr: () => `Je n'ai pas cette info 🤔. Contactez Harry : ${KB.contact.email}`,
      en: () => `I don't have this info 🤔. Contact: ${KB.contact.email}`,
      de: () => `Ich habe diese Info nicht 🤔. Kontakt: ${KB.contact.email}`,
      mg: () => `Tsy manana io fampahalalana io aho 🤔. Mifandraisa: ${KB.contact.email}`
    }
  };

  /* ==========================================================
     3. INTENTIONS
     ========================================================== */
  const INTENTS = [
    { id: 'salutation', keywords: ['bonjour','salut','bjr','slt','cc','coucou','hey','hello','hi','bonsoir','yo','wsh','allo','hallo','guten tag','guten morgen','guten abend','manao ahoana','salama','manahoana'] },
    { id: 'remerciement', keywords: ['merci','thanks','thx','mrc','cool','top','super','genial','parfait','nickel','bravo','excellent','danke','vielen dank','misaotra'] },
    { id: 'aurevoir', keywords: ['aurevoir','au revoir','bye','a plus','aplus','ciao','tchao','bonne journee','bonne soiree','adieu','tschuess','auf wiedersehen','veloma','mandrapihaona'] },

    { id: 'saphire_info', keywords: ['saphire info','info saphire','a propos saphire','a propos de saphire','presentation saphire','cest quoi saphire','tu es quoi','tu es un ia','tu es une ia','es tu ia','es tu une ia','tu es une intelligence artificielle','tu es un robot','tu es un bot','tes limites','ta limite','tu peux faire quoi','tu es en developpement','projet ia','ia en cours','quel ia'] },
    { id: 'qui_est_saphire', keywords: ['saphire','qui es tu','qui est saphire','cest qui saphire','tu es qui','c ki toi','ki es tu','who are you','wer bist du','iza ianao'] },

    { id: 'recruteur_profil', keywords: ['recruteur','recruteuse','recrutement','si tu es recruteur','vue recruteur','regard recruteur','profil recruteur','pour un recruteur','comme recruteur','si vous etiez recruteur','si vous etes recruteur','comment recruter','recruiter'] },
    { id: 'pourquoi_recruter', keywords: ['pourquoi le recruter','pourquoi harry','pourquoi choisir harry','interet de recruter','avantages harry','ses atouts','ses forces','ses points forts','ce quil apporte'] },
    { id: 'exemples_questions', keywords: ['question a poser','questions a poser','quoi demander','que demander','exemple question','exemple de question','suggestion question','que puis je demander','que peux tu repondre','quel genre de question','quel type de question','quelles questions'] },

    /* ---------- EMPLACEMENT ACTUEL ---------- */
    { id: 'emplacement_actuel', keywords: ['emplacement actuel','ou est il actuellement','ou est harry actuellement','ou se trouve','ou se trouve harry','localisation actuelle','il est ou en ce moment','il habite ou actuellement','current location','aktueller standort','toerana ankehitriny'] },

    /* ---------- DIPLÔMES ---------- */
    { id: 'diplomes', keywords: ['diplome','diplomes','diplome obtenu','diplomes obtenus','quel est son diplome','quel est sont diplome','quel diplome','quel sont ses diplome','quel sont sont diplome','ses diplomes','ces diplomes','liste diplome','liste des diplomes','citer mes diplome','citer ses diplome','quels diplomes','degree','degrees','diplom','abschluss','diplaoma','diplaomany'] },

    /* ---------- CERTIFICATIONS SEULES ---------- */
    { id: 'certifications_seules', keywords: ['certification obtenue','certifications obtenues','quel est sa certification','quel sont ses certification','ses certifications','ces certifications','liste certification','liste des certifications','citer mes certification','citer ses certification','quelles certifications','certificat obtenu','certificats obtenus','mes certificats','certificates','zertifikate','fanamarinana'] },

    { id: 'identite', keywords: ['qui','etes','vous','toi','tu','nom','prenom','identite','presente','presentation','profil','connaitre','connais','presentez','qui es','qui est','qui etes','parle moi de toi','harry','yves','rakotoniaina','c ki harry','qui est harry','presentation harry','profil harry','who','about','wer','ueber','iza','momba anao'] },

    { id: 'localisation', keywords: ['ou','habite','vit','localise','localisation','adresse','ville','pays','endroit','situe','region','madagascar','antananarivo','tana','habite ou','vit ou','tu es ou','ou es tu','where','wo','wohnort','aiza'] },
    { id: 'disponibilite', keywords: ['dispo','disponible','disponibilite','mobilite','libre','ouvert','recherche','opportunite','embauche','recrutement','tu es dispo','libre quand','available','verfuegbar','misy','vonona'] },

    { id: 'contact', keywords: ['contact','contacter','contacte','joindre','parler','echanger','discuter','mail','email','telephone','numero','tel','phone','appel','appeler','comment contacter','comment te contacter','comment le contacter','kontakt','fifandraisana','mifandraisa'] },
    { id: 'email', keywords: ['email','mail','adresse mail','adresse email','courriel','gmail','envoyer mail','ecrire','ecrire a harry','son email','son mail','e-mail','mailaka'] },
    { id: 'whatsapp', keywords: ['whatsapp','whats','watsap','whatsap','wa','numero whatsapp','son whatsapp'] },
    { id: 'linkedin', keywords: ['linkedin','linked','linkdin','reseau pro','son linkedin'] },
    { id: 'gitlab', keywords: ['gitlab','git','code','repository','repo','github','son gitlab','ses codes','ses projets'] },
    { id: 'credly', keywords: ['credly','badge','badges','certification','certificat','cisco','certif','ses badges'] },

     { id: 'cv_generate_guide', keywords: [
      'generer cv','generer mon cv','generer le cv','creer cv','creer mon cv',
      'faire mon cv','faire cv','faire un cv','pdf cv','cv pdf',
      'comment generer cv','comment creer cv','comment faire cv',
      'generate cv','generate my cv','create cv','make cv',
      'lebenslauf erstellen','cv erstellen',
      'mamorona cv','manao cv','mamorona ny cv'
    ]},

    { id: 'cv', keywords: ['cv','resume','curriculum','vitae','telecharger','telecharge','document','fichier','pdf','mon cv','ton cv','voir cv','son cv','telecharger cv','version cv','lebenslauf'] },

    { id: 'competences', keywords: ['competence','competences','savoir faire','sait faire','fort','maitrise','connait','skills','skill','expertise','domaine','specialite','ses competences','tes competences','faehigkeiten','fahaizana'] },
    { id: 'competences_support', keywords: ['support it','systemes','systeme','admin','administration','windows','linux','active directory','glpi','office 365','microsoft 365','proxmox','vmware','reseau','tcp','dhcp','dns','support systeme'] },
    
    { id: 'competences_applicatifs', keywords: [
      'applicatif','application','dev','developpement',
      'code','programmation','programmeur','coder',
      'langage','langages','langage de programmation',
      'python','django','flask','react','reactjs','react js',
      'net','csharp','c sharp','javascript','js','html','css','html5','css3',
      'sql','postgres','postgresql','informix',
      'git','bash','powershell','script',
      'framework','frameworks','stack','fullstack','full stack',
      'frontend','front end','backend','back end',
      'competence dev','competences dev','competence developpement',
      'competences developpement','ses competences dev',
      'ses competences developpement','ses langages','techno dev',
      'skills in development','dev skills','development skills',
      'programming skills','coding skills',
      'programmierkenntnisse','entwicklungsfähigkeiten',
      'fahaizana famoronana','fahaizany amin ny famoronana'
    ]},

        /* ---------- ✅ COMPÉTENCES DEV DÉDIÉE (prioritaire) ---------- */
    { id: 'competences_dev_detail', keywords: [
      'competence en developpement','competences en developpement',
      'competence developpement','competences developpement',
      'competence dev','competences dev',
      'competence en dev','competences en dev',
      'skill en dev','skills en dev',
      'ses competences en developpement','ses competences de dev',
      'ses competences dev','ses skills dev',
      'development skills','dev skills','skills in development',
      'programming skills','coding skills',
      'entwicklungsfähigkeiten','programmierkenntnisse',
      'fahaizana amin ny famoronana','fahaizana famoronana'
    ]},
    
    { id: 'techno_dev', keywords: ['techno dev','technologie dev','stack','frontend','backend','fullstack','frameworks','outils dev','stack technique'] },
    { id: 'techno_support', keywords: ['techno support','technologie support','outils support','outil support','ses outils','outils it'] },

    { id: 'annees_experience', keywords: ['combien d experience','combien dexperience','combien d annees','nombre d annees','nombre d experience','nb annees','nb experience','combien de temps','depuis combien de temps','depuis quand','combien d annee','quel experience','combien experience','how many years','how long','wie viele jahre','wie lange','firy taona','firy ny taona','taona firy'] },

    { id: 'experiences', keywords: ['experience','experiences','parcours','carriere','travaille','travail','entreprise','societe','boulot','emploi','job','poste','missions','ses experiences','son parcours','ou a t il travaille','erfahrung'] },
    { id: 'experience_actuelle', keywords: ['actuel','actuelle','en ce moment','maintenant','actuellement','travaille actuellement','poste actuel','job actuel','travaille ou','ou travaille t il'] },

    { id: 'certifications', keywords: ['certification','certifications','formation','formations','certificat','diplome','diplomes','etude','etudes','ecole','universite','cursus','parcours scolaire','zertifizierung'] },

    { id: 'projets', keywords: ['projet','projets','realisation','realisations','portfolio','app','application','site','developpe','developpement','creation','travaux','ses projets','ses realisations','projekte'] },
    { id: 'services', keywords: ['service','services','propose','offre','prestation','prestations','fait quoi','tu fais','peut faire','aide','aider','proposer','ses services','dienstleistungen','tolotra'] },
    { id: 'freelance', keywords: ['freelance','free lance','independant','mission','missions','travaille seul'] },
    { id: 'tarif', keywords: ['tarif','tarifs','prix','cout','devis','facture','facturer','gratuit','gratis','combien ca coute','combien cout','ses tarifs','prix prestation','preis','combien pour'] },

    { id: 'langues', keywords: ['langue','langues','parle','parler','francais','anglais','allemand','malagasy','traduction','ses langues','quelles langues','sprachen','fiteny'] },
    { id: 'interets', keywords: ['interet','interets','centre d interet','centres d interet','loisir','loisirs','passe temps','hobby','hobbies','aime','passion','passionne','interesse','ce qui l interesse','zavatra tiany','interessen'] },

    { id: 'aide', keywords: ['aide','aider','peux tu','peut tu','tu peux','tu sais','tu sais faire','que sais tu','que peux tu','capable','a quoi sers','que faire','hilfe'] },
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
        if (normalized === kwNorm) score += 15;
        else if (normalized.includes(kwNorm)) {
          score += kwNorm.includes(' ') ? 8 : 3;
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
     5. DÉTECTION ANNÉE
     ========================================================== */
  function detectYear(text) {
    const match = normalize(text).match(/\b(20\d{2})\b/);
    return match ? match[1] : null;
  }

  function getEmploiParAnnee(annee) {
    if (!annee) return null;
    return KB.emploi_par_annee[annee] || null;
  }

  function generateEmploiDateResponse(annee) {
    const emploi = getEmploiParAnnee(annee);
    const lang = CURRENT_LANG;

    if (!emploi) {
      const notFound = {
        fr: `Je n'ai pas d'info pour **${annee}** 🤔. Harry a commencé en **2020**. Contact : ${KB.contact.email}`,
        en: `No info for **${annee}** 🤔. Harry started in **2020**. Contact: ${KB.contact.email}`,
        de: `Keine Info für **${annee}** 🤔. Kontakt: ${KB.contact.email}`,
        mg: `Tsy manana vaovao ho an'ny **${annee}** aho 🤔. Mifandraisa: ${KB.contact.email}`
      };
      return notFound[lang] || notFound.fr;
    }

    const templates = {
      fr: `📅 **En ${annee}, Harry occupait le poste suivant** :\n\n${emploi}`,
      en: `📅 **In ${annee}, Harry held the following position**:\n\n${emploi}`,
      de: `📅 **Im Jahr ${annee} hatte Harry folgende Position**:\n\n${emploi}`,
      mg: `📅 **Tamin'ny ${annee}** :\n\n${emploi}`
    };
    return templates[lang] || templates.fr;
  }

  /* ==========================================================
     6. DÉTECTION OUI / NON
     ========================================================== */
  function isYes(text) {
    const t = normalize(text);
    return ['oui','oui svp','oui stp','yes','yeah','yep','ok','d accord','daccord','vas y','vas-y','sure','ja','ja bitte','eny','azafady']
      .some(k => t === k || t.includes(k));
  }

  function isNo(text) {
    const t = normalize(text);
    return ['non','no','pas besoin','non merci','nein','tsia','tsia misaotra']
      .some(k => t === k || t.includes(k));
  }

    /* ==========================================================
     ✅ DÉTECTION DE DEMANDE DE CV / LANGUE
     ========================================================== */

  /* Détecte si l'utilisateur demande une version spécifique du CV */
  function detectCVVersion(text) {
    const t = normalize(text);
    const cl = KB.cv_details.choix_langue;

    /* Priorité 1 : Photo (avant "français" car "français avec photo" contient "français") */
    if (cl.fr_photo.some(k => t.includes(normalize(k)))) {
      return KB.cv_details.versions.find(v => v.code === 'fr_photo');
    }

    /* Priorité 2 : Anglais */
    if (cl.en.some(k => t.includes(normalize(k)))) {
      return KB.cv_details.versions.find(v => v.code === 'en');
    }

    /* Priorité 3 : Français */
    if (cl.fr.some(k => t.includes(normalize(k)))) {
      return KB.cv_details.versions.find(v => v.code === 'fr');
    }

    return null;
  }

    /* ==========================================================
     ✅ SCROLL VERS LA SECTION RÉSUMÉ
     Ferme le chat d'abord, puis scrolle
     ========================================================== */
  function scrollToResumeSection() {
    const win = document.getElementById('chatbot-window');
    const backdrop = document.getElementById('chatbot-backdrop');

    /* 1. Fermer la modal du chat */
    if (win) win.classList.add('chatbot-hidden');

    /* 2. Fermer aussi l'état étendu si actif */
    if (win && win.classList.contains('chatbot-expanded')) {
      win.classList.remove('chatbot-expanded');
      if (backdrop) backdrop.classList.remove('active');
    }

    /* 3. Scroll fluide vers la section Résumé */
    setTimeout(() => {
      const resumeSection = document.getElementById('resume');
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        /* 4. Effet visuel : surligner la section temporairement */
        resumeSection.style.transition = 'box-shadow 0.5s ease';
        resumeSection.style.boxShadow = '0 0 0 4px rgba(20, 157, 221, 0.5)';
        setTimeout(() => {
          resumeSection.style.boxShadow = '';
        }, 2000);
      }
    }, 300);

      /* 5. Afficher un bouton "Retour au chat" flottant */
    showReturnToChatButton();
  }

  /* ==========================================================
     ✅ BOUTON "RETOUR AU CHAT" FLOTTANT
     ========================================================== */
  function showReturnToChatButton() {
    /* Supprimer s'il existe déjà */
    const existing = document.getElementById('chatbot-return-btn');
    if (existing) existing.remove();

    const btn = document.createElement('button');
    btn.id = 'chatbot-return-btn';
    btn.innerHTML = '<i class="bi bi-chat-dots-fill"></i> Revenir au chat';
    btn.onclick = function () {
      btn.remove();
      const win = document.getElementById('chatbot-window');
      if (win) win.classList.remove('chatbot-hidden');
    };

    document.body.appendChild(btn);

    /* Auto-suppression après 30s */
    setTimeout(() => {
      if (btn.parentNode) btn.remove();
    }, 30000);
  }

  /* Affiche le lien de téléchargement d'un CV */
  function showCVDownloadLink(version) {
    if (!version) return;
    const fn = REPLIES.cv_download_link[CURRENT_LANG] || REPLIES.cv_download_link.fr;
    typeMessage(formatMessage(fn(version)), 12);
  }

  /* ==========================================================
     7. FALLBACK
     ========================================================== */
  function getFallback() {
    const messages = {
      fr: [
        `Hmm, je ne suis pas certaine d'avoir bien compris 🤔. Pouvez-vous reformuler ?`,
        `Je n'ai pas compris 💭. Essayez : "Qui est Harry ?", "Ses diplômes", "Ses certifications", "Comment le contacter".`
      ],
      en: [
        `Hmm, I'm not sure I understood 🤔. Could you rephrase?`,
        `I didn't understand 💭. Try: "Who is Harry?", "His degrees", "His certifications".`
      ],
      de: [
        `Hmm, ich bin nicht sicher, ob ich verstanden habe 🤔.`,
        `Ich habe nicht verstanden 💭. Versuchen Sie: "Wer ist Harry?".`
      ],
      mg: [
        `Hmm, tsy azoko tsara angamba 🤔. Azonao averina ve?`,
        `Tsy azoko 💭. Andramo: "Iza i Harry?".`
      ]
    };
    const list = messages[CURRENT_LANG] || messages.fr;
    return list[Math.floor(Math.random() * list.length)];
  }

  /* ==========================================================
     8. UI TEXT
     ========================================================== */
    /* ==========================================================
     8. UI TEXT
     ========================================================== */
  const UI_TEXT = {
    fr: {
      welcome: 'Bonjour 👋 Je suis **Saphire**, l\'assistante virtuelle de Harry. Posez-moi une question sur son parcours, ses compétences, ses diplômes, ses certifications, ses services ou pour le contacter.',
      placeholder: 'Posez votre question...',
      thinking: 'Saphire réfléchit',
      typing: 'Saphire écrit',
      chips: [
        ['Qui est Harry ?','👤 Qui est Harry ?'],
        ['Ses diplômes ?','🎓 Ses diplômes'],
        ['Ses certifications ?','🏆 Ses certifications'],
        ['Comment le contacter ?','📞 Le contacter']
      ]
    },
    en: {
      welcome: 'Hello 👋 I\'m **Saphire**, Harry\'s virtual assistant. Ask me anything about his background, skills, degrees, certifications, services or how to contact him.',
      placeholder: 'Ask your question...',
      thinking: 'Saphire is thinking',
      typing: 'Saphire is typing',
      chips: [
        ['Who is Harry?','👤 Who is Harry?'],
        ['His degrees?','🎓 His degrees'],
        ['His certifications?','🏆 His certifications'],
        ['How to contact him?','📞 Contact him']
      ]
    },
    de: {
      welcome: 'Hallo 👋 Ich bin **Saphire**, Harrys virtuelle Assistentin. Fragen Sie mich nach seinem Werdegang, Fähigkeiten, Diplomen, Zertifizierungen, Diensten oder Kontakt.',
      placeholder: 'Stellen Sie Ihre Frage...',
      thinking: 'Saphire denkt nach',
      typing: 'Saphire schreibt',
      chips: [
        ['Wer ist Harry?','👤 Wer ist Harry?'],
        ['Seine Diplome?','🎓 Seine Diplome'],
        ['Seine Zertifizierungen?','🏆 Zertifizierungen'],
        ['Kontakt?','📞 Kontakt']
      ]
    },
    mg: {
      welcome: 'Manao ahoana 👋 Izaho dia **Saphire**, mpanampy an\'i Harry. Anontanio aho momba ny fintinarany, fahaizany, diplaomany, fanamarinany, tolotra na fifandraisana aminy.',
      placeholder: 'Anontanio...',
      thinking: 'Mieritreritra i Saphire',
      typing: 'Manoratra i Saphire',
      chips: [
        ['Iza i Harry?','👤 Iza i Harry?'],
        ['Ny diplaomany?','🎓 Ny diplaomany'],
        ['Ny fanamarinany?','🏆 Fanamarinana'],
        ['Fifandraisana?','📞 Mifandraisa']
      ]
    }
  };

  /* ==========================================================
     9. CRÉATION DE L'INTERFACE (avec sidebar)
     ========================================================== */
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

        <!-- ✅ SIDEBAR DES CONVERSATIONS -->
        <aside class="chatbot-sidebar" id="chatbot-sidebar">
          <div class="chatbot-sidebar-header">
            <div class="chatbot-sidebar-brand">
              <i class="bi bi-gem"></i>
              <span>Saphire</span>
            </div>
            <button class="chatbot-new-chat" id="chatbot-new-chat" title="Nouvelle conversation">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <div class="chatbot-sidebar-conversations" id="chatbot-conversations"></div>
          <div class="chatbot-sidebar-footer">
            <div class="chatbot-sidebar-user">
              <div class="chatbot-sidebar-avatar">V</div>
              <span>Visiteur</span>
            </div>
          </div>
        </aside>

        <!-- ZONE PRINCIPALE -->
        <div class="chatbot-main">
          <div class="chatbot-header">
            <div class="chatbot-header-avatar"><i class="bi bi-gem"></i></div>
            <div class="chatbot-header-info">
              <h4>Saphire <span class="chatbot-ai-tag">IA</span></h4>
              <span class="chatbot-status">
                <span class="chatbot-dot"></span> <span data-chatbot-status>En ligne</span>
              </span>
            </div>
            <div class="chatbot-header-actions">
              <button id="chatbot-expand" aria-label="Agrandir" title="Agrandir">
                <i class="bi bi-arrows-angle-expand"></i>
              </button>
              <button id="chatbot-close" aria-label="Fermer">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <div class="chatbot-messages" id="chatbot-messages">
            <div class="chatbot-msg chatbot-msg-bot">${ui.welcome}</div>
            <div class="chatbot-suggestions" id="chatbot-suggestions">${chipsHtml}</div>
          </div>

          <div class="chatbot-input-wrap">
            <textarea id="chatbot-input" placeholder="${ui.placeholder}" autocomplete="off" rows="1" maxlength="500"></textarea>
            <button id="chatbot-send" aria-label="Envoyer"><i class="bi bi-send-fill"></i></button>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(wrap);

    renderConversations();
  }

  /* ==========================================================
     10. GESTION DES CONVERSATIONS
     ========================================================== */
  const conversations = [{
    id: 'default',
    title: 'Nouvelle conversation',
    createdAt: Date.now()
  }];
  let currentConvId = 'default';

  function renderConversations() {
    const container = document.getElementById('chatbot-conversations');
    if (!container) return;
    container.innerHTML = conversations.map(c => `
      <div class="chatbot-conversation ${c.id === currentConvId ? 'active' : ''}" data-id="${c.id}">
        <i class="bi bi-chat-left-text"></i>
        <span class="chatbot-conversation-text">${c.title}</span>
      </div>
    `).join('');

    container.querySelectorAll('.chatbot-conversation').forEach(el => {
      el.addEventListener('click', () => {
        currentConvId = el.getAttribute('data-id');
        renderConversations();
      });
    });
  }

  function updateCurrentConversationTitle(text) {
    const conv = conversations.find(c => c.id === currentConvId);
    if (conv && conv.title === 'Nouvelle conversation') {
      conv.title = text.length > 28 ? text.substring(0, 28) + '…' : text;
      renderConversations();
    }
  }

  function createNewConversation() {
    const id = 'conv-' + Date.now();
    conversations.unshift({
      id,
      title: 'Nouvelle conversation',
      createdAt: Date.now()
    });
    currentConvId = id;
    renderConversations();

    const messages = document.getElementById('chatbot-messages');
    if (messages) {
      const ui = UI_TEXT[CURRENT_LANG] || UI_TEXT.fr;
      const chipsHtml = ui.chips.map(c =>
        `<button class="chatbot-chip" data-q="${c[0]}">${c[1]}</button>`
      ).join('');
      messages.innerHTML = `
        <div class="chatbot-msg chatbot-msg-bot">${ui.welcome}</div>
        <div class="chatbot-suggestions" id="chatbot-suggestions">${chipsHtml}</div>
      `;
      const sugg = document.getElementById('chatbot-suggestions');
      if (sugg) {
        sugg.addEventListener('click', function (e) {
          const chip = e.target.closest('.chatbot-chip');
          if (!chip) return;
          const q = chip.getAttribute('data-q');
          if (q) handleSend(q);
        });
      }
    }
  }

  /* ==========================================================
     11. RECONSTRUIRE LA MODAL (changement de langue)
     ========================================================== */
  function rebuildUI() {
    const oldWin = document.getElementById('chatbot-window');
    const wasOpen = oldWin && !oldWin.classList.contains('chatbot-hidden');
    const wasExpanded = oldWin && oldWin.classList.contains('chatbot-expanded');

    const old = document.getElementById('chatbot-wrapper');
    if (old) old.remove();
    const backdrop = document.getElementById('chatbot-backdrop');
    if (backdrop) backdrop.remove();

    createChatbotUI();
    attachEvents();

    const newWin = document.getElementById('chatbot-window');
    if (newWin && wasOpen) newWin.classList.remove('chatbot-hidden');
    if (newWin && wasExpanded) {
      newWin.classList.add('chatbot-expanded');
      const bd = document.getElementById('chatbot-backdrop');
      if (bd) bd.classList.add('active');
      toggleExpandIcon(true);
    }
  }

  /* ==========================================================
     12. AFFICHAGE DES MESSAGES
     ========================================================== */
    function formatMessage(text) {
      return String(text)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|[^\s)]+\.pdf)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
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
     13. AUTO-RESIZE DU TEXTAREA
     ========================================================== */
  function autoResizeInput() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    input.style.height = 'auto';
    const maxHeight = 120;
    input.style.height = Math.min(input.scrollHeight, maxHeight) + 'px';
  }

    /* ==========================================================
     ✅ FONCTIONS : THINKING + TYPING PROGRESSIF
     ========================================================== */

  /* Affiche un indicateur "Thinking..." */
  function showThinking() {
    const messages = document.getElementById('chatbot-messages');
    const ui = UI_TEXT[CURRENT_LANG] || UI_TEXT.fr;

    const thinking = document.createElement('div');
    thinking.className = 'chatbot-msg chatbot-msg-bot chatbot-thinking';
    thinking.id = 'chatbot-thinking';
    thinking.innerHTML = `
      <span class="chatbot-thinking-dot"></span>
      <span class="chatbot-thinking-text">${ui.thinking}</span>
      <span class="chatbot-thinking-dots">
        <span></span><span></span><span></span>
      </span>
    `;
    messages.appendChild(thinking);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideThinking() {
    const t = document.getElementById('chatbot-thinking');
    if (t) t.remove();
  }

  /* Effet d'écriture progressive (type ChatGPT) */
  function typeMessage(html, speed) {
    speed = speed || 18;
    const messages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg chatbot-msg-bot chatbot-typing-live';
    messages.appendChild(msg);

    // Parser le HTML pour taper lettre par lettre, en gardant les balises
    const tokens = [];
    let i = 0;
    while (i < html.length) {
      if (html[i] === '<') {
        const close = html.indexOf('>', i);
        if (close !== -1) {
          tokens.push(html.substring(i, close + 1));
          i = close + 1;
          continue;
        }
      }
      tokens.push(html[i]);
      i++;
    }

    let current = '';
    let index = 0;

    function step() {
      if (index >= tokens.length) {
        msg.classList.remove('chatbot-typing-live');
        return;
      }
      const chunk = tokens[index];
      current += chunk;
      msg.innerHTML = current;
      messages.scrollTop = messages.scrollHeight;
      index++;

      // Skip delay for tags
      const delay = chunk.startsWith('<') ? 0 : speed;
      setTimeout(step, delay);
    }

    step();
  }

  /* ==========================================================
     14. ENVOI D'UN MESSAGE (avec Thinking + Typing progressif)
  ========================================================== */
  let awaitingProofAnswer = false;
  let awaitingCVVersion = false; 

    function handleSend(customText) {
    const input = document.getElementById('chatbot-input');
    const text = (customText || input.value).trim();
    if (!text) return;

    /* 1. Message utilisateur */
    addMessage(text, 'user');
    if (!customText) input.value = '';
    if (!customText) autoResizeInput();

    updateCurrentConversationTitle(text);

    const sugg = document.getElementById('chatbot-suggestions');
    if (sugg) sugg.style.display = 'none';

    /* 2. Thinking */
    showThinking();

    setTimeout(() => {
      hideThinking();

      let responseHtml = '';

      /* ==================================================
         ✅ A. EN ATTENTE DE VERSION CV
         ================================================== */
      if (awaitingCVVersion) {
        const t = normalize(text);

        /* Annulation */
        if (isNo(text) || ['annuler','stop','cancel','abbrechen','aoka'].some(k => t.includes(k))) {
          const fn = REPLIES.cv_cancel[CURRENT_LANG] || REPLIES.cv_cancel.fr;
          responseHtml = fn();
          awaitingCVVersion = false;
        } else {
          /* Détecter la version demandée */
          const version = detectCVVersion(text);
          if (version) {
            const fn = REPLIES.cv_download_link[CURRENT_LANG] || REPLIES.cv_download_link.fr;
            responseHtml = fn(version);
            awaitingCVVersion = false;
          } else {
            /* Redemander */
            const fn = REPLIES.cv_choose_language[CURRENT_LANG] || REPLIES.cv_choose_language.fr;
            responseHtml = fn();
          }
        }

        typeMessage(formatMessage(responseHtml), 12);
        return;
      }

      /* ==================================================
         ✅ B. EN ATTENTE OUI/NON POUR PREUVES CERTIFICATIONS
         ================================================== */
      if (awaitingProofAnswer) {
        if (isYes(text)) {
          const fn = REPLIES.preuves_certifications[CURRENT_LANG] || REPLIES.preuves_certifications.fr;
          responseHtml = fn();
        } else if (isNo(text)) {
          const fn = REPLIES.aucune_preuve[CURRENT_LANG] || REPLIES.aucune_preuve.fr;
          responseHtml = fn();
        } else {
          responseHtml = getFallback();
        }
        awaitingProofAnswer = false;
        typeMessage(formatMessage(responseHtml), 12);
        return;
      }

      /* ==================================================
         ✅ C. INTENTION "GÉNÉRATION CV"
         ================================================== */
      const intent = findBestIntent(text);

      if (intent && intent.id === 'cv_generate_guide') {
        const fn = REPLIES.cv_generate_guide[CURRENT_LANG] || REPLIES.cv_generate_guide.fr;
        responseHtml = fn();

        /* 1. Afficher la réponse */
        typeMessage(formatMessage(responseHtml), 12);

        /* 2. Attendre la fin du typing (~2.5s) puis scroller */
        setTimeout(() => {
          scrollToResumeSection();
        }, 2600);

        /* 3. Passer en attente de choix de version */
        awaitingCVVersion = true;
        return;
      }


      /* ==================================================
         D. DÉTECTION ANNÉE (date)
         ================================================== */
      const year = detectYear(text);
      const normalizedText = normalize(text);
      const hasDateKeyword = ['en ','dans ','au ','was ','war ','tamin'].some(p => normalizedText.includes(p))
                             || year !== null;

      if (year && (hasDateKeyword || normalizedText.includes('poste') || normalizedText.includes('travail') || normalizedText.includes('job'))) {
        responseHtml = generateEmploiDateResponse(year);
        typeMessage(formatMessage(responseHtml), 12);
        return;
      }

      /* ==================================================
         E. INTENTION NORMALE
         ================================================== */
      if (intent && REPLIES[intent.id]) {
        const fn = REPLIES[intent.id][CURRENT_LANG] || REPLIES[intent.id].fr;
        responseHtml = fn();

        if (intent.id === 'certifications_seules') {
          awaitingProofAnswer = true;
        }
      } else {
        responseHtml = getFallback();
      }

      typeMessage(formatMessage(responseHtml), 12);

    }, 1400);
  }

  /* ==========================================================
     15. TOGGLE ICÔNE EXPAND
     ========================================================== */
  function toggleExpandIcon(isExpanded) {
    const expandBtn = document.getElementById('chatbot-expand');
    if (!expandBtn) return;
    const icon = expandBtn.querySelector('i');
    if (!icon) return;
    if (isExpanded) {
      icon.classList.remove('bi-arrows-angle-expand');
      icon.classList.add('bi-arrows-angle-contract');
      expandBtn.setAttribute('title', 'Réduire');
    } else {
      icon.classList.remove('bi-arrows-angle-contract');
      icon.classList.add('bi-arrows-angle-expand');
      expandBtn.setAttribute('title', 'Agrandir');
    }
  }

  /* ==========================================================
     16. FERMER L'ÉTAT ÉTENDU
     ========================================================== */
  function closeExpanded() {
    const win = document.getElementById('chatbot-window');
    const bd = document.getElementById('chatbot-backdrop');
    if (win) win.classList.remove('chatbot-expanded');
    if (bd) bd.classList.remove('active');
    toggleExpandIcon(false);
  }

  /* ==========================================================
     17. ATTACHER LES ÉVÉNEMENTS
     ========================================================== */
  function attachEvents() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const win = document.getElementById('chatbot-window');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const sugg = document.getElementById('chatbot-suggestions');
    const expandBtn = document.getElementById('chatbot-expand');
    const newChatBtn = document.getElementById('chatbot-new-chat');

    if (!toggle || !close) return;

    toggle.addEventListener('click', () => win.classList.toggle('chatbot-hidden'));
    close.addEventListener('click', () => {
      win.classList.add('chatbot-hidden');
      if (win.classList.contains('chatbot-expanded')) closeExpanded();
    });

    send.addEventListener('click', () => handleSend());

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    input.addEventListener('input', autoResizeInput);

    if (sugg) {
      sugg.addEventListener('click', function (e) {
        const chip = e.target.closest('.chatbot-chip');
        if (!chip) return;
        const q = chip.getAttribute('data-q');
        if (q) handleSend(q);
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isExpanded = win.classList.toggle('chatbot-expanded');

        let backdrop = document.getElementById('chatbot-backdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.id = 'chatbot-backdrop';
          document.body.appendChild(backdrop);
          backdrop.addEventListener('click', closeExpanded);
        }
        backdrop.classList.toggle('active', isExpanded);
        toggleExpandIcon(isExpanded);
      });
    }

    if (newChatBtn) {
      newChatBtn.addEventListener('click', createNewConversation);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (win.classList.contains('chatbot-expanded')) {
          closeExpanded();
        } else if (!win.classList.contains('chatbot-hidden')) {
          win.classList.add('chatbot-hidden');
        }
      }
    });
  }

  /* ==========================================================
     18. INITIALISATION
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    createChatbotUI();
    attachEvents();

    window.addEventListener('languageChanged', function (e) {
      const lang = e.detail && e.detail.lang;
      if (lang && SUPPORTED_LANGS.includes(lang)) {
        CURRENT_LANG = lang;
        console.log('🌐 Saphire change de langue →', lang);
        rebuildUI();
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lang = this.dataset.lang;
        if (lang && SUPPORTED_LANGS.includes(lang)) {
          CURRENT_LANG = lang;
          setTimeout(rebuildUI, 100);
        }
      });
    });

    console.log('💎 Saphire multilingue initialisée (langue : ' + CURRENT_LANG + ')');
  });
})();