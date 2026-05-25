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

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Page hero entrance ──
setTimeout(() => document.querySelector('.page-hero')?.classList.add('loaded'), 100);

// ── NAV: load branding from JSON ──
async function loadBranding() {
  try {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    const res = await fetch(`${prefix}content/branding.json`);
    if (!res.ok) return;
    const b = await res.json();
    // Logo
    const logoEl = document.querySelector('.nav-logo');
    if (logoEl) {
      if (b.logoImage) {
        logoEl.innerHTML = `<img src="${prefix}${b.logoImage}" alt="${b.siteName}" style="height:38px;object-fit:contain;">`;
      } else {
        logoEl.innerHTML = `${b.logoText || 'MHB'} <span>${b.siteName || 'Mel Hair Braiding'}</span>`;
      }
    }
    // Footer
    const fLogo = document.querySelector('.footer-logo');
    if (fLogo) {
      if (b.logoImage) {
        fLogo.innerHTML = `<img src="${prefix}${b.logoImage}" alt="${b.siteName}" style="height:44px;object-fit:contain;margin-bottom:.5rem;">`;
      } else {
        fLogo.innerHTML = `${b.logoText || 'MHB'} <span>${b.siteName || 'Mel Hair Braiding'}</span>`;
      }
    }
    const fTag = document.querySelector('.footer-tagline');
    if (fTag && b.footerTagline) fTag.textContent = b.footerTagline;
  } catch(e) {}
}
loadBranding();
