document.addEventListener('DOMContentLoaded', function() {
    const acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // Basculer la classe "active" sur le bouton
            this.classList.toggle("active");

            // Récupérer le panneau suivant
            const panel = this.nextElementSibling;

            // Si le panneau a déjà la classe "open", on le ferme, sinon on l'ouvre
            if (panel.classList.contains("open")) {
                panel.classList.remove("open");
                // On remet maxHeight à 0 pour la transition
                panel.style.maxHeight = 0;
            } else {
                // Fermer tous les autres panneaux (optionnel, pour un accordéon classique)
                // Si vous voulez un comportement "exclusif" (un seul ouvert à la fois), décommentez :
                /*
                const allPanels = document.querySelectorAll('.panel');
                allPanels.forEach(p => {
                    if (p !== panel) {
                        p.classList.remove('open');
                        p.style.maxHeight = 0;
                        p.previousElementSibling.classList.remove('active');
                    }
                });
                */

                // Ouvrir le panneau : on ajoute la classe et on fixe maxHeight à scrollHeight
                panel.classList.add("open");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});


// ==========================================================
// GESTION DU FORMULAIRE DE CONTACT
// ==========================================================

// ----- GESTION DU FORMULAIRE (sauvegarde dans localStorage) -----
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name-field').value.trim();
    const email = document.getElementById('email-field').value.trim();
    const subject = document.getElementById('subject-field').value.trim();
    const message = document.getElementById('message-field').value.trim();

    if (!name || !email || !subject || !message) {
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return false;
    }

    // Préparer les données
    const newMessage = {
        date: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 8),
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Récupérer les anciens messages ou créer un tableau vide
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Remplir la modale de confirmation
    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmSubject').textContent = subject;
    document.getElementById('confirmMessage').textContent = message;

    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    document.getElementById('contactForm').reset();

    // Si l'admin est connecté, rafraîchir la liste des messages
    if (sessionStorage.getItem('admin_logged') === 'true' && typeof loadMessages === 'function') {
        loadMessages();
    }

    return false;
}
// ==========================================================
// CHARGEMENT AUTO DES DONNÉES (facultatif)
// ==========================================================
// Si vous voulez pré-remplir avec les dernières données enregistrées
// (décommentez pour activer)
/*
document.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('lastContact');
    if (saved) {
        const data = JSON.parse(saved);
        // Vous pouvez pré-remplir les champs si vous le souhaitez
        // document.getElementById('name-field').value = data.name || '';
        // etc.
    }
});
*/


const typedElement = document.querySelector('.typed');
        const items = typedElement.getAttribute('data-typed-items').split(', ');
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentItem = items[currentIndex];

            if (!isDeleting) {
                // Ajouter des caractères (effet de frappe)
                if (charIndex < currentItem.length) {
                    typedElement.textContent = currentItem.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(type, 100); // Vitesse de frappe
                } else {
                    // Pause avant de commencer à effacer
                    isDeleting = true;
                    setTimeout(type, 1000); // Pause avant effacement
                }
            } else {
                // Effacer des caractères
                if (charIndex > 0) {
                    typedElement.textContent = currentItem.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(type, 50); // Vitesse d’effacement
                } else {
                    // Passer au mot suivant
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % items.length; // Boucle sur les items
                    setTimeout(type, 500); // Pause avant le prochain mot
                }
            }
        }

        // Démarrer l’effet
        if (items.length > 0) {
            type();
        }

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // /**
  //  * Preloader
  //  */
  // const preloader = document.querySelector('#preloader');
  // if (preloader) {
  //   window.addEventListener('load', () => {
  //     preloader.remove();
  //   });
  // }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// save data input by input::

function saveData() {

  var username = document.getElementById('name-field').value;
  var email = document.getElementById('email-field').value;
  var objects = document.getElementById('subject-field').value;
  var messages = document.getElementById('message-field').value;

  if (username == '' || email == '' || objects == '' || messages == '') {
    alert("Il semble que tout les champs est vide");
  }
  else {
    alert("Donné bien enregistrer");
  }
  
}

