(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__head, .profile__grid, .timeline__item, .pcard, .stack-layer, .certs, .title-block'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- hero schematic parallax ---------- */
  const schematic = document.getElementById('schematic');
  if (schematic && !prefersReduced && window.matchMedia('(hover: hover)').matches) {
    const layers = schematic.querySelectorAll('.s-layer');
    let raf = null;

    schematic.addEventListener('mousemove', (e) => {
      const rect = schematic.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0);
          const tx = x * depth;
          const ty = y * depth;
          layer.style.transform = `translate(${tx}px, ${ty}px)`;
        });
      });
    });

    schematic.addEventListener('mouseleave', () => {
      layers.forEach((layer) => { layer.style.transform = 'translate(0, 0)'; });
    });
  }

  /* ---------- placeholder social links ---------- */
  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
})();
