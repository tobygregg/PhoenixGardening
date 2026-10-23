/* ─────────────────────────────────────────────────────────────
   Phoenix Gardening GSY – site scripts (no libraries needed)
   Sections: header · mobile menu · scroll reveal · services ·
   before/after slider · gallery toggles · seasons · lightbox · form
   ───────────────────────────────────────────────────────────── */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: solid background once you scroll ---------- */
  const header = $('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menu = $('[data-menu]');
  const openBtn = $('[data-menu-open]');
  const setMenu = (open) => {
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-menu-close]').focus(); else openBtn.focus();
  };
  openBtn.addEventListener('click', () => setMenu(true));
  $('[data-menu-close]').addEventListener('click', () => setMenu(false));
  $$('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.classList.contains('hidden')) setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Phoenix emblem: feathers appear one after another ---------- */
  $$('.phoenix-build').forEach((svg) => {
    $$('path, circle', svg).forEach((p, i) => { p.style.animationDelay = `${1500 + i * 70}ms`; });
  });

  /* ---------- Services: show the photo for the service you point at ---------- */
  const rows = $$('[data-svc]');
  const caption = $('[data-svc-caption]');
  const activate = (row) => {
    rows.forEach((r) => r.setAttribute('aria-current', String(r === row)));
    $$('[data-svc-img]').forEach((img) => img.classList.toggle('is-active', img.dataset.svcImg === row.dataset.svc));
    if (caption) caption.textContent = row.dataset.caption;
  };
  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => activate(row));
    row.addEventListener('focus', () => activate(row));
    row.addEventListener('click', () => activate(row));
  });

  /* ---------- Before / after slider ---------- */
  $$('[data-ba]').forEach((ba) => {
    const range = $('[data-ba-range]', ba);
    const set = (v) => ba.style.setProperty('--pos', `${v}%`);
    range.addEventListener('input', () => set(range.value));
    set(range.value);
    // A gentle nudge the first time it scrolls into view, so people know it moves
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const frames = [50, 62, 70, 62, 38, 30, 38, 50];
        frames.forEach((v, i) => setTimeout(() => { if (!ba.dataset.touched) { range.value = v; set(v); } }, 700 + i * 160));
      }, { threshold: 0.6 });
      io.observe(ba);
      range.addEventListener('pointerdown', () => { ba.dataset.touched = '1'; });
    }
  });

  /* ---------- Gallery before / after toggles ---------- */
  $$('[data-toggle]').forEach((card) => {
    const after = $('[data-toggle-after]', card);
    const btns = $$('[data-toggle-btn]', card);
    btns.forEach((b) => b.addEventListener('click', () => {
      const showAfter = b.dataset.toggleBtn === 'after';
      after.classList.toggle('opacity-0', !showAfter);
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    }));
  });

  /* ---------- Seasons planner (edit the text here) ---------- */
  const ICON = (d) => `<svg viewBox="0 0 24 24" class="h-11 w-11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SEASONS = {
    spring: {
      title: 'Spring',
      text: 'The garden wakes up and the grass starts growing again. First cuts of the year, weeding borders before they take hold, and shaping shrubs ready for summer.',
      tags: ['Mowing', 'Weeding & strimming', 'Pruning'],
      icon: ICON('<path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>'),
      sun: [100, 129],
    },
    summer: {
      title: 'Summer',
      text: 'Peak growing season. Regular mowing keeps lawns lush, and hedges get their main trim once nesting birds have moved on.',
      tags: ['Mowing', 'Hedge cutting', 'Weeding & strimming'],
      icon: ICON('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'),
      sun: [300, 68],
    },
    autumn: {
      title: 'Autumn',
      text: 'Cut hedges back for a tidy winter, strim down overgrown banks, and clear slippery moss and algae from patios before the wet weather sets in.',
      tags: ['Hedge cutting', 'Weeding & strimming', 'Pressure washing'],
      icon: ICON('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'),
      sun: [500, 68],
    },
    winter: {
      title: 'Winter',
      text: "With the leaves down and trees dormant, it's the ideal time for tree surgery and structural pruning, plus a deep clean of paths and patios.",
      tags: ['Tree surgery', 'Pruning', 'Pressure washing'],
      icon: ICON('<path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>'),
      sun: [700, 129],
    },
  };
  const seasonRoot = $('[data-seasons]');
  if (seasonRoot) {
    const m = new Date().getMonth(); // 0 = Jan
    const now = m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter';
    const tabs = $$('[data-season]', seasonRoot);
    const show = (key) => {
      const s = SEASONS[key];
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.season === key)));
      $('[data-season-title]', seasonRoot).textContent = s.title;
      $('[data-season-text]', seasonRoot).textContent = s.text;
      $('[data-season-icon]', seasonRoot).innerHTML = s.icon;
      $('[data-season-tags]', seasonRoot).innerHTML = s.tags.map((t) => `<li class="chip">${t}</li>`).join('');
      $('[data-season-now]', seasonRoot).hidden = key !== now;
      $('[data-sun]', seasonRoot).style.transform = `translate(${s.sun[0]}px, ${s.sun[1]}px)`;
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t.dataset.season));
      t.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus(); show(next.dataset.season);
      });
    });
    show(now);
  }

  /* ---------- Lightbox ---------- */
  const dlg = $('[data-lightbox-dialog]');
  const dlgImg = $('[data-lightbox-img]');
  $$('[data-lightbox]').forEach((btn) => btn.addEventListener('click', () => {
    const thumb = $('img', btn);
    dlgImg.src = btn.dataset.lightbox;
    dlgImg.alt = thumb ? thumb.alt : '';
    dlg.showModal();
  }));
  $('[data-lightbox-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  /* ---------- Quote buttons pre-tick a service ---------- */
  $$('[data-quote-service]').forEach((a) => a.addEventListener('click', () => {
    const box = $(`input[name="Services[]"][value="${a.dataset.quoteService}"]`);
    if (box) box.checked = true;
  }));

  /* ---------- Contact form ---------- */
  const form = $('[data-form]');
  if (form) {
    // Send people back to this site's thank-you page, whatever domain it's on
    if (location.protocol.startsWith('http')) $('[data-next]', form).value = `${location.origin}/thank-you.html`;
    const err = $('[data-form-error]', form);
    form.addEventListener('submit', (e) => {
      const name = form.elements.Name.value.trim();
      const phone = form.elements.Phone.value.trim();
      const email = form.elements.email.value.trim();
      let msg = '';
      if (!name) msg = 'Add your name so we know who to reply to.';
      else if (phone.replace(/\D/g, '').length < 6) msg = 'Add a phone number so we can call you back.';
      else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msg = 'Check your email address, it looks incomplete.';
      if (msg) {
        e.preventDefault();
        err.textContent = msg;
        err.classList.remove('hidden');
        return;
      }
      err.classList.add('hidden');
      $('[data-form-label]', form).textContent = 'Sending…';
      $('[data-form-submit]', form).disabled = true;
    });
  }

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
