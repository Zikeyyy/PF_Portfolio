/* ── script.js ── Portfolio interactivity ── */

// ─── Year in footer ────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Mobile hamburger ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Active nav highlight ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActive() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActive);
setActive();

// ─── Reveal on scroll ──────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards & timeline items
      const delay = entry.target.closest('.cards-grid, .projects-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── Photo fallback ────────────────────────────────────
const heroPhoto = document.getElementById('heroPhoto');
const placeholder = document.getElementById('photoPlaceholder');
if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  });
  heroPhoto.addEventListener('load', () => {
    if (placeholder) placeholder.style.display = 'none';
    heroPhoto.style.display = 'block';
  });
  // Trigger check on init
  if (!heroPhoto.complete || heroPhoto.naturalWidth === 0) {
    heroPhoto.dispatchEvent(new Event('error'));
  }
}

// ─── Contact form (demo) ───────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const btn  = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending…</span>';

  // Simulate async send (replace with your form backend / Formspree / Netlify Forms)
  setTimeout(() => {
    note.textContent = '✓ Message sent! I will get back to you soon.';
    btn.innerHTML = '<span>Message Sent</span>';
    btn.style.background = '#22c55e';
    e.target.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      btn.style.background = '';
      note.textContent = '';
    }, 4000);
  }, 1200);
}
