(() => {
  const html = document.documentElement;
  const button = document.querySelector('.language');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.header nav');

  function setLanguage(language) {
    const ar = language === 'ar';
    html.lang = language;
    html.dir = ar ? 'rtl' : 'ltr';
    document.body.dir = html.dir;
    document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
      element.innerHTML = element.dataset[ar ? 'ar' : 'en'];
    });
    button.innerHTML = ar ? 'EN <b>↗</b>' : 'عربي <b>↗</b>';
    button.setAttribute('aria-label', ar ? 'Switch to English' : 'التبديل إلى الإنجليزية');
    document.title = ar ? 'عبدالله خالد إبراهيم — معرض الأعمال' : 'Abdullah Khaled Ibrahim — Portfolio';
    try { localStorage.setItem('aki-language', language); } catch (_) {}
  }
  button.addEventListener('click', () => setLanguage(html.lang === 'ar' ? 'en' : 'ar'));
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  }));
  try { if (localStorage.getItem('aki-language') === 'ar') setLanguage('ar'); } catch (_) {}

  const bar = document.querySelector('.progress');
  const updateProgress = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${range > 0 ? scrollY / range * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.project,.about-copy,.principles>div,.skill-list>div,.learn-card,.edu-card').forEach((item) => {
    item.classList.add('reveal'); observer.observe(item);
  });
  document.querySelectorAll('.learn-card').forEach((card) => card.addEventListener('pointermove', (event) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - box.left}px`);
    card.style.setProperty('--my', `${event.clientY - box.top}px`);
  }));
  const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach((link) => {
      const active = link.hash === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('#work,#about,#skills,#learning,#contact').forEach((section) => sectionObserver.observe(section));
})();

