// ---------- mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- scroll-spy on nav links ----------
const sections = ['about', 'experience', 'projects', 'skills', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navAnchors = document.querySelectorAll('.navlinks a');

function updateActiveNav() {
  let currentId = null;
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) currentId = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---------- footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();