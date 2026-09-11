/* =========================================
   1. GRANDE MODAL — Badges & Certificats
   ========================================= */
const certModal = document.getElementById('certModal');
const openCertModal = document.getElementById('openCertModal');
const closeCertModal = document.getElementById('closeCertModal');

openCertModal.addEventListener('click', () => {
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCertModal.addEventListener('click', () => {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Fermer en cliquant sur le fond sombre
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* =========================================
   2. PETITE MODAL — Lien de vérification
   ========================================= */
const linkModal = document.getElementById('linkModal');
const closeLinkModal = document.getElementById('closeLinkModal');
const verifyUrlInput = document.getElementById('verifyUrlInput');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const copyFeedback = document.getElementById('copyFeedback');

// Ouvre la petite modal quand on clique sur "Verify link"
document.querySelectorAll('.verify-link').forEach((btn) => {
    btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url') || 'https://example.com/verify/1987';
        verifyUrlInput.value = url;              // 👈 remplace ici par ta vraie URL
        copyFeedback.textContent = '';
        copyUrlBtn.textContent = 'Copy';
        copyUrlBtn.classList.remove('copied');
        linkModal.classList.add('active');
    });
});

// Fermer la petite modal
closeLinkModal.addEventListener('click', () => {
    linkModal.classList.remove('active');
});

linkModal.addEventListener('click', (e) => {
    if (e.target === linkModal) {
        linkModal.classList.remove('active');
    }
});

/* =========================================
   3. Copier le lien dans le presse-papier
   ========================================= */
copyUrlBtn.addEventListener('click', async () => {
    const url = verifyUrlInput.value;
    try {
        await navigator.clipboard.writeText(url);
        copyUrlBtn.textContent = 'Copied ✓';
        copyUrlBtn.classList.add('copied');
        copyFeedback.textContent = 'Lien copié dans le presse-papier !';
        setTimeout(() => {
            copyUrlBtn.textContent = 'Copy';
            copyUrlBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // Fallback pour anciens navigateurs
        verifyUrlInput.select();
        document.execCommand('copy');
        copyFeedback.textContent = 'Lien copié !';
    }
});

/* =========================================
   4. Fermer avec la touche Échap
   ========================================= */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (linkModal.classList.contains('active')) {
            linkModal.classList.remove('active');
        } else if (certModal.classList.contains('active')) {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

console.log("Modal Certificate chargée ✅");