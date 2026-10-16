(() => {
  const page = document.documentElement;
  const languageButton = document.querySelector('.language');
  const menuButton = document.querySelector('.menu');
  const navigation = document.querySelector('.topbar nav');
  const progress = document.querySelector('.progress');

  function setLanguage(language) {
    const arabic = language === 'ar';
    page.lang = language;
    page.dir = arabic ? 'rtl' : 'ltr';
    document.body.dir = page.dir;

    document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
      element.innerHTML = element.dataset[arabic ? 'ar' : 'en'];
    });

    languageButton.innerHTML = arabic ? 'EN <b>↗</b>' : 'عربي <b>↗</b>';
    languageButton.setAttribute('aria-label', arabic ? 'Switch to English' : 'التبديل إلى الإنجليزية');
    document.title = arabic
      ? 'عبدالله خالد إبراهيم — معرض الأعمال'
      : 'Abdullah Khaled Ibrahim — Portfolio';

    try {
      localStorage.setItem('aki-new-language', language);
    } catch {
      // The switch remains usable when browser storage is disabled.
    }
  }

  languageButton.addEventListener('click', () => {
    setLanguage(page.lang === 'ar' ? 'en' : 'ar');
  });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    navigation.classList.toggle('open', isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  try {
    if (localStorage.getItem('aki-new-language') === 'ar') setLanguage('ar');
  } catch {
    // English remains the default when storage is unavailable.
  }

  document.querySelector('#year').textContent = new Date().getFullYear();

  function updateProgress() {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const amount = range > 0 ? (window.scrollY / range) * 100 : 0;
    progress.style.width = amount + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (!('IntersectionObserver' in window)) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.project, .about-copy, .principles article, .skill-list article, .learning-list article, .school').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach((link) => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-38% 0px -52% 0px' });

  document.querySelectorAll('#work, #about, #skills, #path, #contact').forEach((section) => {
    activeObserver.observe(section);
  });
})();


