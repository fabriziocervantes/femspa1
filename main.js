// Fem Spa Cancún · interactions
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll (fade + float up) and gold veins drawing in
  if (document.documentElement.classList.contains('js-motion')) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-visible');
      io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal], [data-vein]').forEach(el => io.observe(el));
  }

  // Ritual menu tabs
  const tabs = [...document.querySelectorAll('.tab')];
  const select = tab => tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const next = tabs[(i + d + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });

  // Slow review carousel
  const reviews = [...document.querySelectorAll('.review')];
  const dots = [...document.querySelectorAll('.dot')];
  let current = 0, timer;
  const show = i => {
    current = i;
    reviews.forEach((r, k) => { r.classList.toggle('is-active', k === i); r.setAttribute('aria-hidden', k !== i); });
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i));
  };
  const start = () => { if (!reduce) timer = setInterval(() => show((current + 1) % reviews.length), 7000); };
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); show(i); start(); }));
  start();
})();
