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

// ---------- image sliders ----------
document.querySelectorAll('[data-slider]').forEach(slider => {
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('[data-dir="-1"]');
  const next = slider.querySelector('[data-dir="1"]');
  const dots = Array.from(slider.querySelectorAll('.slider-dot'));
  const count = slider.querySelector('.slider-count');
  const title = slider.querySelector('.slider-title');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let ticking = false;

  function render() {
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
      if (i === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    count.textContent = (index + 1) + ' / ' + slides.length;
    title.textContent = slides[index].dataset.title || '';
  }

  function goTo(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: index * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    render();
  }

  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== index) { index = i; render(); }
      ticking = false;
    });
  }, { passive: true });

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
  });
  window.addEventListener('resize', () => {
    track.scrollTo({ left: index * track.clientWidth, behavior: 'auto' });
  });
  render();
});

// ---------- footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
