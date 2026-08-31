// ==========================================================
// ESPACE PRIVÉ - CORRIGÉ (fermeture propre du modal)
// ==========================================================

// ----- MOT DE PASSE -----
const ADMIN_PASSWORD = "admin123";

// ----- RÉFÉRENCES DOM -----
const adminMenuLink = document.getElementById('adminMenuLink');
const adminModalEl = document.getElementById('adminModal');
const adminPasswordInput = document.getElementById('adminPassword');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminError = document.getElementById('adminError');
const storedMessagesContainer = document.getElementById('storedMessagesContainer');
const messagesList = document.getElementById('messagesList');

// ----- FONCTION MODALE D'INFORMATION -----
function showInfoModal(message, type) {
  var modalEl = document.getElementById('infoModal');
  var header = document.getElementById('infoModalHeader');
  var icon = document.getElementById('infoModalIcon');
  var title = document.getElementById('infoModalTitle');
  var msg = document.getElementById('infoModalMessage');

  var types = {
    error: { color: '#dc3545', icon: 'fa-times-circle', title: 'Erreur' },
    warning: { color: '#ffc107', icon: 'fa-exclamation-triangle', title: 'Attention' },
    info: { color: '#149ddd', icon: 'fa-info-circle', title: 'Information' },
    success: { color: '#28a745', icon: 'fa-check-circle', title: 'Succès' }
  };

  var config = types[type] || types.info;
  header.style.background = config.color;
  icon.className = 'fas ' + config.icon;
  icon.style.color = config.color;
  title.innerHTML = '<i class="fas ' + config.icon + ' me-2"></i>' + config.title;
  msg.textContent = message;

  var modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// ----- FONCTION POUR FERMER PROPREMENT LE MODAL ADMIN -----
function closeAdminModal() {
  var modal = bootstrap.Modal.getInstance(adminModalEl);
  if (modal) {
    modal.hide();
    // Forcer la suppression de l'overlay
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

// ----- OUVERTURE DU MODAL ADMIN -----
if (adminMenuLink) {
  adminMenuLink.addEventListener('click', function(event) {
    event.preventDefault();
    // S'assurer qu'aucun overlay ne traîne
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    var modal = new bootstrap.Modal(adminModalEl);
    modal.show();
    adminPasswordInput.value = '';
    adminError.style.display = 'none';
  });
}

// ----- FERMETURE DU MODAL AVEC LE BOUTON "Annuler" -----
var cancelBtn = document.querySelector('#adminModal .btn-secondary');
if (cancelBtn) {
  cancelBtn.addEventListener('click', function() {
    closeAdminModal();
  });
}

// ----- FERMETURE DU MODAL AVEC LA CROIX (btn-close) -----
var closeBtn = document.querySelector('#adminModal .btn-close');
if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeAdminModal();
  });
}

// ----- FERMETURE DU MODAL EN CLIQUANT À L'EXTÉRIEUR -----
adminModalEl.addEventListener('click', function(event) {
  if (event.target === adminModalEl) {
    closeAdminModal();
  }
});

// ----- FERMETURE DU MODAL AVEC LA TOUCHE ESC -----
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    var modal = bootstrap.Modal.getInstance(adminModalEl);
    if (modal) {
      closeAdminModal();
    }
  }
});

// ----- CONNEXION ADMIN -----
if (adminLoginBtn) {
  adminLoginBtn.addEventListener('click', function() {
    var pwd = adminPasswordInput.value;
    if (pwd === ADMIN_PASSWORD) {
      closeAdminModal();

      storedMessagesContainer.style.display = 'block';
      loadMessages();

      adminMenuLink.innerHTML = '<i class="bi bi-check-circle navicon"></i> Espace Privée(con)';
      adminMenuLink.style.color = '#28a745';

      var adminToggle = document.getElementById('adminToggle');
      if (adminToggle) {
        adminToggle.innerHTML = '<i class="fas fa-unlock"></i>';
        adminToggle.classList.remove('btn-outline-secondary');
        adminToggle.classList.add('btn-success');
        adminToggle.style.color = '#fff';
      }

      sessionStorage.setItem('admin_logged', 'true');
      showInfoModal('Connexion réussie ! Bienvenue dans l\'espace administrateur.', 'success');
    } else {
      adminError.style.display = 'block';
      adminPasswordInput.value = '';
      adminPasswordInput.focus();
      showInfoModal('Mot de passe incorrect. Veuillez réessayer.', 'error');
    }
  });
}

// ----- VALIDER AVEC LA TOUCHE ENTRÉE -----
if (adminPasswordInput) {
  adminPasswordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      adminLoginBtn.click();
    }
  });
}

// ----- BOUTON FLOTTANT ADMIN -----
var adminToggleBtn = document.getElementById('adminToggle');
if (adminToggleBtn) {
  adminToggleBtn.addEventListener('click', function() {
    // Nettoyer les overlays existants
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    if (sessionStorage.getItem('admin_logged') === 'true') {
      storedMessagesContainer.style.display = 'block';
      loadMessages();
      showInfoModal('Bienvenue dans l\'espace administrateur.', 'info');
    } else {
      var modal = new bootstrap.Modal(adminModalEl);
      modal.show();
      adminPasswordInput.value = '';
      adminError.style.display = 'none';
    }
  });
}

// ----- RESTAURER LA SESSION -----
if (sessionStorage.getItem('admin_logged') === 'true') {
  storedMessagesContainer.style.display = 'block';
  adminMenuLink.innerHTML = '<i class="bi bi-check-circle navicon"></i> Espace Privée(con)';
  adminMenuLink.style.color = '#28a745';
  var adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    adminToggle.innerHTML = '<i class="fas fa-unlock"></i>';
    adminToggle.classList.remove('btn-outline-secondary');
    adminToggle.classList.add('btn-success');
    adminToggle.style.color = '#fff';
  }
  loadMessages();
}

// ----- CHARGER LES MESSAGES -----
function loadMessages() {
  var stored = localStorage.getItem('contactMessages');
  if (!stored) {
    messagesList.innerHTML = '<p class="text-muted">Aucun message enregistré.</p>';
    return;
  }
  try {
    var messages = JSON.parse(stored);
    if (messages.length === 0) {
      messagesList.innerHTML = '<p class="text-muted">Aucun message enregistré.</p>';
      return;
    }
    var html = '<div class="table-responsive">' +
      '<table class="table table-hover">' +
      '<thead><tr><th>#</th><th>Date</th><th>Nom</th><th>Email</th><th>Sujet</th><th>Message</th></tr></thead>' +
      '<tbody>';
    for (var i = 0; i < messages.length; i++) {
      var msg = messages[i];
      html += '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + (msg.date || '-') + '</td>' +
        '<td>' + msg.name + '</td>' +
        '<td>' + msg.email + '</td>' +
        '<td>' + msg.subject + '</td>' +
        '<td>' + msg.message.substring(0, 60) + (msg.message.length > 60 ? '…' : '') + '</td>' +
        '</tr>';
    }
    html += '</tbody></table></div>';
    messagesList.innerHTML = html;
  } catch (e) {
    messagesList.innerHTML = '<p class="text-danger">Erreur de chargement des messages.</p>';
  }
}

// ----- TÉLÉCHARGER LES MESSAGES -----
function downloadMessages() {
  var stored = localStorage.getItem('contactMessages');
  if (!stored) {
    showInfoModal('Aucun message à télécharger.', 'warning');
    return;
  }
  var messages = JSON.parse(stored);
  if (messages.length === 0) {
    showInfoModal('Aucun message à télécharger.', 'warning');
    return;
  }
  var txt = '=== MESSAGES ENREGISTRÉS ===\n\n';
  for (var i = 0; i < messages.length; i++) {
    var msg = messages[i];
    txt += 'Message ' + (i + 1) + '\n';
    txt += 'Date   : ' + (msg.date || 'Non spécifiée') + '\n';
    txt += 'Nom    : ' + msg.name + '\n';
    txt += 'Email  : ' + msg.email + '\n';
    txt += 'Sujet  : ' + msg.subject + '\n';
    txt += 'Message: ' + msg.message + '\n';
    txt += '--------------------------\n\n';
  }
  var blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'messages_' + new Date().toISOString().slice(0, 10) + '.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showInfoModal('Téléchargement terminé avec succès.', 'success');
}

// ----- EFFACER TOUS LES MESSAGES -----
function clearMessages() {
  var stored = localStorage.getItem('contactMessages');
  if (!stored || JSON.parse(stored).length === 0) {
    showInfoModal('Aucun message à supprimer.', 'warning');
    return;
  }
  if (confirm('Supprimer définitivement tous les messages ?')) {
    localStorage.removeItem('contactMessages');
    loadMessages();
    showInfoModal('Tous les messages ont été supprimés.', 'success');
  }
}

// ----- DÉCONNEXION -----
function logout() {
  storedMessagesContainer.style.display = 'none';
  adminMenuLink.innerHTML = '<i class="bi bi-hdd-stack navicon"></i> Espace Privée';
  adminMenuLink.style.color = '';
  var adminToggle = document.getElementById('adminToggle');
  if (adminToggle) {
    adminToggle.innerHTML = '<i class="fas fa-lock"></i>';
    adminToggle.classList.remove('btn-success');
    adminToggle.classList.add('btn-outline-secondary');
    adminToggle.style.color = '';
  }
  sessionStorage.removeItem('admin_logged');
  messagesList.innerHTML = '<p class="text-muted">Aucun message enregistré.</p>';
  showInfoModal('Vous êtes déconnecté.', 'info');
}

// ----- GESTION DU FORMULAIRE DE CONTACT -----
function handleSubmit(event) {
  event.preventDefault();

  var name = document.getElementById('name-field').value.trim();
  var email = document.getElementById('email-field').value.trim();
  var subject = document.getElementById('subject-field').value.trim();
  var message = document.getElementById('message-field').value.trim();

  if (!name || !email || !subject || !message) {
    var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
    return false;
  }

  var newMessage = {
    date: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 8),
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  var messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  messages.push(newMessage);
  localStorage.setItem('contactMessages', JSON.stringify(messages));

  document.getElementById('confirmName').textContent = name;
  document.getElementById('confirmEmail').textContent = email;
  document.getElementById('confirmSubject').textContent = subject;
  document.getElementById('confirmMessage').textContent = message;

  var successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();

  document.getElementById('contactForm').reset();

  if (sessionStorage.getItem('admin_logged') === 'true') {
    loadMessages();
  }

  return false;
}

console.log('%c✅ Espace Privée fonctionnel - Fermeture propre du modal', 'font-size:16px;color:#28a745;font-weight:bold;');


// ==========================================================
// RÉSEAU DE NEURONES ABSTRAIT ANIMÉ - DISPERSION AU SURVOL
// CANVAS PUR - SANS DÉPENDANCE - ANIMATION CONTINUE
// ==========================================================

(function() {
  "use strict";

  // ----- ÉLÉMENTS -----
  var canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var width, height;
  var particles = [];
  var mouse = { x: null, y: null, radius: 280 };
  var animationId = null;
  var time = 0;

  // Détection mobile
  var isMobile = window.innerWidth < 768;
  var isLowPerf = window.innerWidth < 480;

  // ----- CONFIGURATION - RÉSEAU DE NEURONES DENSE -----
  var CONFIG = {
    particleCount: isLowPerf ? 80 : (isMobile ? 120 : 180),  // Plus de neurones
    connectionDistance: isLowPerf ? 140 : (isMobile ? 160 : 200), // Connexions plus lointaines
    particleSpeed: isLowPerf ? 0.3 : (isMobile ? 0.4 : 0.5),
    particleRadius: isLowPerf ? 2 : (isMobile ? 2.5 : 3),
    color: '#149ddd',
    glowIntensity: isLowPerf ? 0.2 : (isMobile ? 0.25 : 0.35),
    // Paramètres de dispersion
    dispersionRadius: 300,
    dispersionForce: 2.0,
    attractionForce: 0.5,
    returnSpeed: 0.03,
    // Nouveaux paramètres pour l'effet neurone
    pulseSpeed: 0.8,
    connectionOpacity: 0.8,
    glowRadius: 6
  };

  // ----- REDIMENSIONNEMENT -----
  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  // ----- CRÉATION DES NEURONES -----
  function createParticles() {
    particles = [];
    for (var i = 0; i < CONFIG.particleCount; i++) {
      var x = Math.random() * width;
      var y = Math.random() * height;
      particles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * CONFIG.particleSpeed * 2,
        vy: (Math.random() - 0.5) * CONFIG.particleSpeed * 2,
        radius: CONFIG.particleRadius * (0.6 + Math.random() * 0.8),
        baseRadius: CONFIG.particleRadius * (0.6 + Math.random() * 0.8),
        // Couleurs variées (bleu, cyan, violet)
        hue: 190 + Math.random() * 40,
        saturation: 70 + Math.random() * 30,
        lightness: 50 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
        // Pour les connexions
        connections: [],
        // État d'activation (pour l'effet neurone)
        active: Math.random() > 0.7,
        activationTimer: Math.random() * 200
      });
    }
  }

  // ----- ANIMATION CONTINUE -----
  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.01;

    // 1. Mise à jour des positions
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Pulsation continue
      var pulse = 1 + 0.25 * Math.sin(time * CONFIG.pulseSpeed + p.phase);
      p.radius = p.baseRadius * pulse;

      // Activation aléatoire des neurones
      p.activationTimer += 0.5;
      if (p.activationTimer > 150 + Math.random() * 100) {
        p.active = !p.active;
        p.activationTimer = 0;
      }

      // Mouvement brownien
      p.vx += (Math.random() - 0.5) * 0.025;
      p.vy += (Math.random() - 0.5) * 0.025;

      // Force de rappel
      var dxOrigin = p.originX - p.x;
      var dyOrigin = p.originY - p.y;
      var distOrigin = Math.sqrt(dxOrigin * dxOrigin + dyOrigin * dyOrigin);

      if (distOrigin > 1) {
        var returnForce = CONFIG.attractionForce * CONFIG.returnSpeed;
        p.vx += dxOrigin * returnForce * 0.02;
        p.vy += dyOrigin * returnForce * 0.02;
      }

      // Dispersion au survol
      if (mouse.x !== null && mouse.y !== null) {
        var dxMouse = mouse.x - p.x;
        var dyMouse = mouse.y - p.y;
        var distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        var mouseInfluence = Math.max(0, 1 - distToMouse / CONFIG.dispersionRadius);

        if (mouseInfluence > 0) {
          var angle = Math.atan2(dyMouse, dxMouse);
          var force = mouseInfluence * mouseInfluence * CONFIG.dispersionForce;
          p.vx -= Math.cos(angle) * force * 0.04;
          p.vy -= Math.sin(angle) * force * 0.04;

          // Activation des neurones proches de la souris
          if (mouseInfluence > 0.5) {
            p.active = true;
            p.radius = p.baseRadius * (1 + 0.6 * mouseInfluence);
          }
        }
      }

      // Friction
      p.vx *= 0.97;
      p.vy *= 0.97;

      // Application du mouvement
      p.x += p.vx;
      p.y += p.vy;

      // Limites de vitesse
      var maxSpeed = CONFIG.particleSpeed * 2;
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // Rebond
      if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
      if (p.x > width) { p.x = width; p.vx *= -0.5; }
      if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
      if (p.y > height) { p.y = height; p.vy *= -0.5; }
    }

    // 2. DESSIN DES CONNEXIONS (effet neurone)
    // Dessiner d'abord les connexions pour qu'elles soient derrière les neurones
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var p1 = particles[i];
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          var opacity = 1 - (dist / CONFIG.connectionDistance);
          
          // Plus de connexions quand les neurones sont actifs
          var activityBoost = (p1.active || p2.active) ? 1.3 : 1;
          var alpha = opacity * CONFIG.connectionOpacity * activityBoost;

          // Ligne principale
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(20, 157, 221, ' + alpha + ')';
          ctx.lineWidth = 1.2 + opacity * 0.8;
          ctx.stroke();

          // Effet de brillance pour les connexions actives
          if (opacity > 0.4 && (p1.active || p2.active)) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(100, 200, 255, ' + (alpha * 0.25) + ')';
            ctx.lineWidth = 4 + opacity * 2;
            ctx.stroke();
          }

          // Effet de synapse (points lumineux sur les connexions actives)
          if (opacity > 0.6 && (p1.active || p2.active)) {
            var midX = (p1.x + p2.x) / 2;
            var midY = (p1.y + p2.y) / 2;
            var pulse = 0.5 + 0.5 * Math.sin(time * 2 + dist * 0.01);
            
            var grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, 4 + pulse * 3);
            grad.addColorStop(0, 'rgba(100, 200, 255, ' + (0.4 * pulse) + ')');
            grad.addColorStop(1, 'rgba(20, 157, 221, 0)');
            ctx.beginPath();
            ctx.arc(midX, midY, 4 + pulse * 3, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }
        }
      }
    }

    // 3. DESSIN DES NEURONES
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Glow du neurone
      var glowRadius = p.radius * CONFIG.glowRadius;
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
      
      if (p.active) {
        // Neurone actif - plus lumineux
        gradient.addColorStop(0, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity * 1.5 + ')');
        gradient.addColorStop(0.3, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity * 0.8 + ')');
        gradient.addColorStop(1, 'rgba(20, 157, 221, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity + ')');
        gradient.addColorStop(0.5, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity * 0.4 + ')');
        gradient.addColorStop(1, 'rgba(20, 157, 221, 0)');
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Corps du neurone
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      
      var color;
      if (p.active) {
        // Neurone actif - plus brillant
        color = 'hsl(' + p.hue + ', ' + (p.saturation + 10) + '%, ' + Math.min(p.lightness + 20, 95) + '%)';
      } else {
        color = 'hsl(' + p.hue + ', ' + p.saturation + '%, ' + p.lightness + '%)';
      }
      ctx.fillStyle = color;
      
      // Ombre portée
      ctx.shadowColor = 'rgba(20, 157, 221, ' + (p.active ? 0.8 : 0.4) + ')';
      ctx.shadowBlur = p.active ? 25 : 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cœur lumineux
      var coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 0.6);
      if (p.active) {
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGrad.addColorStop(0.5, 'rgba(200, 230, 255, 0.6)');
        coreGrad.addColorStop(1, 'rgba(20, 157, 221, 0)');
      } else {
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        coreGrad.addColorStop(0.5, 'rgba(200, 230, 255, 0.3)');
        coreGrad.addColorStop(1, 'rgba(20, 157, 221, 0)');
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Anneau de neurone actif
      if (p.active) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(20, 157, 221, ' + (0.2 + 0.2 * Math.sin(time * 1.5 + p.phase)) + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Rayons des neurones (axones)
      if (p.active) {
        var numRays = 3 + Math.floor(Math.random() * 4);
        for (var r = 0; r < numRays; r++) {
          var angle = (r / numRays) * Math.PI * 2 + time * 0.5 + p.phase * 0.5;
          var rayLength = p.radius * 2.5 + 1 + Math.sin(time * 1.2 + p.phase + r) * 1;
          ctx.beginPath();
          ctx.moveTo(p.x + Math.cos(angle) * p.radius * 0.8, p.y + Math.sin(angle) * p.radius * 0.8);
          ctx.lineTo(p.x + Math.cos(angle) * rayLength, p.y + Math.sin(angle) * rayLength);
          ctx.strokeStyle = 'rgba(20, 157, 221, 0.2)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 4. HALO AUTOUR DE LA SOURIS (effet de champ neuronal)
    if (mouse.x !== null && mouse.y !== null) {
      // Gradient circulaire
      var grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, CONFIG.dispersionRadius);
      grad.addColorStop(0, 'rgba(20, 157, 221, 0.06)');
      grad.addColorStop(0.3, 'rgba(20, 157, 221, 0.04)');
      grad.addColorStop(0.7, 'rgba(20, 157, 221, 0.02)');
      grad.addColorStop(1, 'rgba(20, 157, 221, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, CONFIG.dispersionRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Lueur centrale
      var glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
      glow.addColorStop(0, 'rgba(20, 157, 221, 0.08)');
      glow.addColorStop(0.5, 'rgba(20, 157, 221, 0.04)');
      glow.addColorStop(1, 'rgba(20, 157, 221, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Anneau ondulant autour de la souris (comme une onde neuronale)
      var ringRadius = 40 + 20 * Math.sin(time * 1.5);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(20, 157, 221, 0.08)';
      ctx.lineWidth = 2;
      ctx.stroke();

      var ringRadius2 = 60 + 30 * Math.sin(time * 1.2 + 1);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ringRadius2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(20, 157, 221, 0.05)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // CONTINUER L'ANIMATION
    animationId = requestAnimationFrame(animate);
  }

  // ----- ÉVÉNEMENTS SOURIS -----
  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  // ----- ÉVÉNEMENTS TOUCH (mobile) -----
  function onTouchMove(e) {
    e.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
    if (touch) {
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    }
  }

  function onTouchEnd() {
    mouse.x = null;
    mouse.y = null;
  }

  // ----- REDIMENSIONNEMENT -----
  function onResize() {
    isMobile = window.innerWidth < 768;
    isLowPerf = window.innerWidth < 480;
    CONFIG.particleCount = isLowPerf ? 80 : (isMobile ? 120 : 180);
    CONFIG.connectionDistance = isLowPerf ? 140 : (isMobile ? 160 : 200);
    CONFIG.particleSpeed = isLowPerf ? 0.3 : (isMobile ? 0.4 : 0.5);
    CONFIG.particleRadius = isLowPerf ? 2 : (isMobile ? 2.5 : 3);
    CONFIG.glowIntensity = isLowPerf ? 0.2 : (isMobile ? 0.25 : 0.35);
    resize();
    createParticles();
  }

  // ----- INITIALISATION -----
  function init() {
    resize();
    createParticles();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();

    console.log('✅ Réseau de neurones abstrait - Animation continue');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==========================================================
// VERSION OPTIMISÉE POUR MOBILE
// ==========================================================

(function() {
  "use strict";

  var canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var width, height;
  var particles = [];
  var mouse = { x: null, y: null, radius: 150 };
  var animationId = null;

  // Détection mobile
  var isMobile = window.innerWidth < 768;
  var isLowPerf = window.innerWidth < 480;

  // Configuration adaptative
  var CONFIG = {
    particleCount: isLowPerf ? 40 : (isMobile ? 60 : 80),
    connectionDistance: isLowPerf ? 120 : (isMobile ? 140 : 160),
    particleSpeed: isLowPerf ? 0.4 : (isMobile ? 0.5 : 0.7),
    particleRadius: isLowPerf ? 1.8 : (isMobile ? 2 : 2.5),
    color: '#149ddd',
    glowIntensity: isLowPerf ? 0.08 : (isMobile ? 0.10 : 0.15)
  };

  // ... (le reste du code est identique)
})();


// ==========================================================
// SCRIPT COMPLET - RÉSEAU ABSTRAIT + EFFET TYPED
// ==========================================================

(function() {
  "use strict";

  // ==========================================================
  // 1. RÉSEAU ABSTRAIT ANIMÉ (CANVAS)
  // ==========================================================

  var canvas = document.getElementById('networkCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var width, height;
    var particles = [];
    var time = 0;
    var animationId = null;

    var isMobile = window.innerWidth < 768;
    var isLowPerf = window.innerWidth < 480;

    var CONFIG = {
      particleCount: isLowPerf ? 60 : (isMobile ? 90 : 140),
      connectionDistance: isLowPerf ? 150 : (isMobile ? 180 : 220),
      particleSpeed: isLowPerf ? 0.3 : (isMobile ? 0.4 : 0.5),
      particleRadius: isLowPerf ? 2 : (isMobile ? 2.5 : 3),
      glowIntensity: isLowPerf ? 0.2 : (isMobile ? 0.25 : 0.35),
      driftSpeed: 0.08,
      driftAmplitude: 0.3,
      waveSpeed: 0.015,
      waveAmplitude: 0.2
    };

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < CONFIG.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originX: Math.random() * width,
          originY: Math.random() * height,
          vx: (Math.random() - 0.5) * CONFIG.particleSpeed * 0.5,
          vy: (Math.random() - 0.5) * CONFIG.particleSpeed * 0.5,
          radius: CONFIG.particleRadius * (0.6 + Math.random() * 0.8),
          baseRadius: CONFIG.particleRadius * (0.6 + Math.random() * 0.8),
          hue: 190 + Math.random() * 40,
          saturation: 70 + Math.random() * 30,
          lightness: 55 + Math.random() * 25,
          phase: Math.random() * Math.PI * 2,
          driftOffsetX: Math.random() * 100,
          driftOffsetY: Math.random() * 100
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      var len = particles.length;

      // Mise à jour des positions
      for (var i = 0; i < len; i++) {
        var p = particles[i];

        var pulse = 1 + 0.15 * Math.sin(time * 0.8 + p.phase);
        p.radius = p.baseRadius * pulse;

        var globalDriftX = Math.sin(time * CONFIG.driftSpeed + p.driftOffsetX * 0.01) * CONFIG.driftAmplitude * 15;
        var globalDriftY = Math.cos(time * CONFIG.driftSpeed * 0.7 + p.driftOffsetY * 0.01) * CONFIG.driftAmplitude * 12;
        var waveX = Math.sin(p.originY * 0.003 + time * CONFIG.waveSpeed) * CONFIG.waveAmplitude * 20;
        var waveY = Math.cos(p.originX * 0.003 + time * CONFIG.waveSpeed * 0.8) * CONFIG.waveAmplitude * 18;

        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        var targetX = p.originX + globalDriftX + waveX;
        var targetY = p.originY + globalDriftY + waveY;
        var dxTarget = targetX - p.x;
        var dyTarget = targetY - p.y;

        if (Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget) > 0.5) {
          p.vx += dxTarget * 0.02;
          p.vy += dyTarget * 0.02;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        var maxSpeed = CONFIG.particleSpeed * 1.5;
        var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        var margin = 20;
        if (p.x < margin) { p.x = margin; p.vx *= -0.5; }
        if (p.x > width - margin) { p.x = width - margin; p.vx *= -0.5; }
        if (p.y < margin) { p.y = margin; p.vy *= -0.5; }
        if (p.y > height - margin) { p.y = height - margin; p.vy *= -0.5; }
      }

      // Connexions
      var connDist = CONFIG.connectionDistance;
      var connDistSq = connDist * connDist;
      var step = len > 120 ? 2 : 1;

      for (var i = 0; i < len; i += step) {
        var p1 = particles[i];
        for (var j = i + 1; j < len; j += step) {
          var p2 = particles[j];
          var dx = p1.x - p2.x;
          var dy = p1.y - p2.y;
          var distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            var dist = Math.sqrt(distSq);
            var opacity = 1 - (dist / connDist);
            var alpha = opacity * 0.5;
            var pulseConn = 0.8 + 0.2 * Math.sin(time * 0.5 + (p1.x + p2.x) * 0.01);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(20, 157, 221, ' + (alpha * pulseConn) + ')';
            ctx.lineWidth = 0.8 + opacity * 0.5;
            ctx.stroke();

            if (opacity > 0.5) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = 'rgba(20, 157, 221, ' + (alpha * 0.2 * pulseConn) + ')';
              ctx.lineWidth = 2 + opacity * 2;
              ctx.stroke();
            }
          }
        }
      }

      // Particules
      for (var i = 0; i < len; i++) {
        var p = particles[i];

        var glowR = p.radius * 8;
        var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        gradient.addColorStop(0, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity * 0.8 + ')');
        gradient.addColorStop(0.5, 'rgba(20, 157, 221, ' + CONFIG.glowIntensity * 0.3 + ')');
        gradient.addColorStop(1, 'rgba(20, 157, 221, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        var color = 'hsl(' + p.hue + ', ' + p.saturation + '%, ' + p.lightness + '%)';
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(20, 157, 221, 0.3)';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        var coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 0.5);
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        coreGrad.addColorStop(0.5, 'rgba(200, 230, 255, 0.3)');
        coreGrad.addColorStop(1, 'rgba(20, 157, 221, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    function initCanvas() {
      resize();
      createParticles();
      window.addEventListener('resize', function() {
        resize();
        createParticles();
      });
      animate();
    }

    // Démarrer le canvas
    initCanvas();
  }

  // ==========================================================
  // 2. EFFET TYPED - TEXTES QUI S'AFFICHENT LES UNS APRÈS LES AUTRES
  // ==========================================================

  // Attendre que le DOM soit chargé
  function initTyped() {
    var typedElement = document.querySelector('.typed');
    if (!typedElement) return;

    // Vérifier si Typed est disponible
    if (typeof Typed !== 'undefined') {
      var itemsString = typedElement.getAttribute('data-typed-items');
      var items = itemsString.split(',').map(function(item) {
        return item.trim();
      });

      new Typed('.typed', {
        strings: items,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
        smartBackspace: true
      });
      
      console.log('✅ Typed.js initialisé');
    } else {
      // Fallback - version manuelle sans Typed.js
      console.warn('⚠️ Typed.js non chargé, utilisation du fallback');
      var fallbackItems = typedElement.getAttribute('data-typed-items').split(', ');
      var currentIndex = 0;
      var charIndex = 0;
      var isDeleting = false;
      var speed = 80;
      var deleteSpeed = 40;
      var pauseDelay = 1500;

      function typeEffect() {
        var currentWord = fallbackItems[currentIndex];
        var displayText = currentWord.substring(0, charIndex);
        typedElement.textContent = displayText;

        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            charIndex++;
            speed = 80 + Math.random() * 40;
            setTimeout(typeEffect, speed);
          } else {
            isDeleting = true;
            setTimeout(typeEffect, pauseDelay);
          }
        } else {
          if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, deleteSpeed);
          } else {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % fallbackItems.length;
            setTimeout(typeEffect, 300);
          }
        }
      }

      if (fallbackItems.length > 0) {
        setTimeout(typeEffect, 500);
      }
    }
  }

  // Démarrer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyped);
  } else {
    initTyped();
  }

  console.log('✅ Réseau abstrait + Effet Typed initialisés');
})();


// ==========================================================
// CARROUSEL DE TÉMOIGNAGES - SECTION STATS
// ==========================================================

(function() {
  // Liste des témoignages professionnels
  const testimonials = [
    {
      text: "Grâce à une expertise polyvalente en développement logiciel, administration de bases de données et support informatique, je suis capable d'intervenir sur différentes composantes d'un système d'information, de sa conception à sa maintenance.",
      author: "RAKOTONIAINA Harry Yves",
      role: "Coordinateur Support IT & Développeur"
    },
    {
      text: "Développeur full-stack passionné, je conçois des solutions web sur mesure alliant performance, sécurité et expérience utilisateur. Mon approche agile garantit des livrables de qualité dans les délais impartis.",
      author: "RAKOTONIAINA Harry Yves",
      role: "Full-Stack Developer"
    },
    {
      text: "Expert en support IT et en gestion d'infrastructures, j'optimise les processus et assure la continuité des services. Ma capacité à résoudre les problèmes complexes rapidement est un atout majeur pour toute équipe.",
      author: "RAKOTONIAINA Harry Yves",
      role: "IT Support"
    },
    {
      text: "Polyvalent et rigoureux, je maîtrise l'ensemble du cycle de vie d'un projet : de l'analyse des besoins au déploiement, en passant par le développement et la maintenance. Un interlocuteur fiable pour vos projets numériques.",
      author: "RAKOTONIAINA Harry Yves",
      role: "Technical Lead"
    },
    {
      text: "Passionné par l'innovation et les nouvelles technologies, je suis constamment en veille pour intégrer les meilleures pratiques et outils. Mon objectif : apporter une valeur ajoutée tangible à chaque projet.",
      author: "RAKOTONIAINA Harry Yves",
      role: "Tech Innovator & Solution Architect"
    }
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  let autoPlayInterval = null;

  const textEl = document.getElementById('testimonialText');
  const authorNameEl = document.getElementById('authorName');
  const authorRoleEl = document.getElementById('authorRole');
  const dots = document.querySelectorAll('.dot');

  // Mise à jour du témoignage
  function updateTestimonial(index, animate = true) {
    if (isTransitioning) return;
    isTransitioning = true;

    const data = testimonials[index];
    if (!data) return;

    // Mettre à jour les dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    if (animate) {
      // Animation de fondu
      textEl.classList.remove('fade-in');
      textEl.classList.add('fade-out');

      setTimeout(() => {
        textEl.textContent = data.text;
        authorNameEl.textContent = data.author;
        authorRoleEl.textContent = data.role;

        textEl.classList.remove('fade-out');
        textEl.classList.add('fade-in');
        isTransitioning = false;
      }, 400);
    } else {
      textEl.textContent = data.text;
      authorNameEl.textContent = data.author;
      authorRoleEl.textContent = data.role;
      textEl.classList.add('fade-in');
      isTransitioning = false;
    }
  }

  // Aller au témoignage suivant
  function nextTestimonial() {
    if (isTransitioning) return;
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial(currentIndex, true);
  }

  // Aller à un témoignage spécifique
  function goToTestimonial(index) {
    if (isTransitioning || index === currentIndex) return;
    currentIndex = index;
    updateTestimonial(currentIndex, true);
    resetAutoPlay();
  }

  // Réinitialiser l'autoplay
  function resetAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    autoPlayInterval = setInterval(nextTestimonial, 5000);
  }

  // Initialisation
  function init() {
    // Afficher le premier témoignage
    updateTestimonial(0, false);

    // Événements sur les dots
    dots.forEach((dot) => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        goToTestimonial(index);
      });
    });

    // Démarrer l'autoplay
    resetAutoPlay();

    // Pause sur hover
    const card = document.getElementById('testimonialCard');
    card.addEventListener('mouseenter', function() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    });
    card.addEventListener('mouseleave', function() {
      if (!autoPlayInterval) {
        resetAutoPlay();
      }
    });
  }

  // Lancer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ==========================================================
// ACCORDÉON - FONCTIONNEL
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  var accordions = document.querySelectorAll('.accordion');

  accordions.forEach(function(accordion) {
    accordion.addEventListener('click', function() {
      // Basculer la classe active sur le bouton
      this.classList.toggle('active');

      // Récupérer le panneau suivant
      var panel = this.nextElementSibling;

      // Vérifier si le panneau a la classe active
      if (panel.classList.contains('active')) {
        // Fermer le panneau
        panel.classList.remove('active');
        panel.style.maxHeight = 0;
      } else {
        // Fermer tous les autres panneaux
        var allPanels = document.querySelectorAll('.panel');
        allPanels.forEach(function(p) {
          if (p !== panel) {
            p.classList.remove('active');
            p.style.maxHeight = 0;
            p.previousElementSibling.classList.remove('active');
          }
        });

        // Ouvrir le panneau
        panel.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Ouvrir le premier accordéon par défaut
  var firstAccordion = document.querySelector('.accordion.active');
  if (firstAccordion) {
    var firstPanel = firstAccordion.nextElementSibling;
    if (firstPanel) {
      firstPanel.classList.add('active');
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }
}); 