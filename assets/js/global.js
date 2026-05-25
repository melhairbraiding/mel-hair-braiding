// ── NAV scroll state ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger ──
const burger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  burger.classList.toggle('active');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ── Active nav link ──
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') && currentPage.includes(a.getAttribute('href').replace('../','').replace('index.html',''))) {
    a.classList.add('active');
  }
});

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Page hero parallax entrance ──
document.querySelector('.page-hero')?.classList.add('loaded');
