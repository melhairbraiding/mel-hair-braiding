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

// ── Inject social links wherever .social-links exists ──
function renderSocials(container) {
  if (!container) return;
  container.innerHTML = `
    <a href="https://www.facebook.com/profile.php?id=100069341483920" target="_blank" rel="noopener" class="social-link" aria-label="Facebook">
      <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
    </a>
    <a href="https://www.instagram.com/mel_hair_braiding/" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
      <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="var(--bg)"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--bg)" stroke-width="2"/></svg>
    </a>
    <a href="https://www.tiktok.com/@melhairbraiding" target="_blank" rel="noopener" class="social-link" aria-label="TikTok">
      <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
    </a>`;
}
document.querySelectorAll('.social-links').forEach(renderSocials);
