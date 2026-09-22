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

// ---------- scroll-spy on the right-side dock nav ----------
const sectionIds = ['top', 'experience', 'education', 'projects', 'skills', 'contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const dockItems = document.querySelectorAll('.dock-item');

function updateActiveDock() {
  let currentId = sections[0] ? sections[0].id : null;
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) currentId = sec.id;
  });
  dockItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === currentId);
  });
}
window.addEventListener('scroll', updateActiveDock, { passive: true });
updateActiveDock();

// ---------- scroll-spy on the detail-page sticky subnav ----------
const detailSections = document.querySelectorAll('.detail-section[id]');
const subnavLinks = document.querySelectorAll('.detail-subnav a');
if (detailSections.length && subnavLinks.length) {
  function updateActiveSubnav() {
    let currentId = detailSections[0].id;
    const scrollPos = window.scrollY + 120;
    detailSections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    subnavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', updateActiveSubnav, { passive: true });
  updateActiveSubnav();
}

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