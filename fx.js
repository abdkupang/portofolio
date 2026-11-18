/* ═══════════════════════════════════════════════════════════
   fx.js — interaksi & transisi ("Sticker Desk")
   • tirai transisi antar halaman (masuk & keluar)
   • bar progres scroll, navbar yang sembunyi saat scroll turun
   • indikator menu yang meluncur (desktop)
   • header: huruf nama yang melompat + bernada, stiker yang meledak
     jadi confetti, balon ucapan, paralaks mengikuti pointer
   • bunyi tiap interaksi lewat window.SFX (sfx.js)
   Semua animasi memakai transform/opacity (WAAPI / CSS) — ringan.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const sfx = (n, a) => { try { window.SFX && window.SFX.play(n, a); } catch (_) {} };
  const COLORS = ['#FF6B5B', '#FFD23F', '#2EC4B6', '#8B6CFF', '#C8F560', '#A7D8FF'];
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ───────── Confetti / percikan ───────── */
  let live = 0;
  function burst(x, y, n, spread) {
    if (reduce || live > 48) return;
    n = Math.min(n || 10, 48 - live);
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.className = 'fx-confetti';
      const c = COLORS[(Math.random() * COLORS.length) | 0];
      const s = 7 + Math.random() * 7;
      el.style.cssText = `left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;background:${c};border-radius:${Math.random() < .5 ? '50%' : '3px'}`;
      document.body.appendChild(el);
      live++;
      const a = Math.random() * Math.PI * 2, d = (spread || 90) * (.5 + Math.random());
      const dx = Math.cos(a) * d, dy = Math.sin(a) * d - 30;
      const anim = el.animate([
        { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) rotate(${(Math.random() - .5) * 540}deg) scale(1)`, opacity: 1, offset: .55 },
        { transform: `translate(${dx * 1.1}px,${dy + 70}px) rotate(${(Math.random() - .5) * 720}deg) scale(.4)`, opacity: 0 },
      ], { duration: 700 + Math.random() * 350, easing: 'cubic-bezier(.2,.7,.3,1)' });
      anim.onfinish = () => { el.remove(); live--; };
    }
  }
  window.FX = { burst };

  /* ───────── Tirai transisi halaman ───────── */
  const wipe = $('.wipe');
  function clearWipe() {
    if (!wipe) return;
    wipe.classList.remove('out-anim');
    wipe.classList.add('done');
  }
  if (wipe) {
    if (reduce) clearWipe();
    else {
      const last = wipe.querySelector('i:nth-child(1)');
      last && last.addEventListener('animationend', clearWipe, { once: true });
      setTimeout(clearWipe, 1800);                       // jaring pengaman
    }
  }
  // balik dari halaman lain lewat tombol Back (bfcache) → buka tirai lagi
  window.addEventListener('pageshow', e => { if (e.persisted) clearWipe(); });

  let leaving = false;
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || leaving || e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href') || '';
    if (/^(mailto:|tel:|javascript:|#)/.test(href)) return;
    let u; try { u = new URL(a.href, location.href); } catch (_) { return; }
    if (u.origin !== location.origin) return;
    const same = u.pathname === location.pathname;
    if (same) return;                                    // anchor di halaman yang sama → smooth scroll biasa
    if (reduce || !wipe) return;
    e.preventDefault();
    leaving = true;
    sfx('whoosh');
    wipe.classList.remove('done', 'in-anim');
    void wipe.offsetWidth;
    wipe.classList.add('out-anim');
    setTimeout(() => { location.href = u.href; }, 560);
    setTimeout(() => { leaving = false; }, 3000);        // kalau navigasi batal
  });

  /* ───────── Scroll: progres + navbar ───────── */
  const bar = $('#scrollProgress');
  const nav = $('#nav');
  let lastY = window.scrollY, tick = false;
  function onScroll() {
    tick = false;
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (nav) {
      const menuOpen = $('#navLinks') && $('#navLinks').classList.contains('open');
      nav.classList.toggle('hide', !menuOpen && y > lastY + 4 && y > 360);
      if (y < lastY - 4 || y < 360) nav.classList.remove('hide');
    }
    lastY = y;
  }
  window.addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ───────── Indikator menu yang meluncur (desktop) ───────── */
  const links = $('#navLinks');
  if (links && !reduce) {
    const ind = document.createElement('span');
    ind.className = 'nav-ind';
    ind.setAttribute('aria-hidden', 'true');
    links.appendChild(ind);
    const place = el => {
      if (!el || innerWidth <= 860) { if (ind.classList.contains('on')) ind.classList.remove('on'); return; }
      ind.style.width = el.offsetWidth + 'px';
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
      if (!ind.classList.contains('on')) ind.classList.add('on');
    };
    const active = () => $('.nav-link.active', links);
    $$('.nav-link', links).forEach(l => {
      l.addEventListener('pointerenter', () => place(l));
      l.addEventListener('focus', () => place(l));
    });
    links.addEventListener('pointerleave', () => place(active()));
    links.addEventListener('focusout', () => place(active()));
    new MutationObserver(ms => { if (ms.some(m => m.target !== ind)) place(active()); }).observe(links, { subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', () => place(active()), { passive: true });
    window.addEventListener('load', () => place(active()));
    place(active());
  }

  /* ───────── Bunyi saat pindah bagian ───────── */
  if ('IntersectionObserver' in window) {
    let cur = null;
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting || cur === en.target.id) return;
      const first = cur === null; cur = en.target.id;
      if (!first && window.scrollY > 40) sfx('section');
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id], body > section[id], section[id]').forEach(s => io.observe(s));
  }

  /* ───────── Pita teknologi: gandakan isi supaya mulus ───────── */
  const mq = $('#marquee');
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ───────── HEADER INTERAKTIF ───────── */
  const hero = $('#hero');
  if (!hero) return;

  // 1) pecah nama jadi huruf
  let idx = 0;
  $$('.hero-name', hero).forEach(w => {
    const txt = w.textContent.trim();
    w.textContent = '';
    for (const c of txt) {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      s.style.setProperty('--i', idx);
      s.style.setProperty('--r0', ((Math.random() - .5) * 40).toFixed(0) + 'deg');
      s.dataset.n = idx++;
      w.appendChild(s);
    }
  });
  const pop = ch => {
    ch.style.setProperty('--r', ((Math.random() < .5 ? -1 : 1) * (6 + Math.random() * 8)).toFixed(0) + 'deg');
    ch.classList.remove('pop'); void ch.offsetWidth; ch.classList.add('pop');
    sfx('letter', +ch.dataset.n);
  };
  const h1 = $('#heroName');
  if (h1) {
    h1.addEventListener('animationend', e => { if (e.target.classList.contains('pop')) e.target.classList.remove('pop'); });
    if (fine) h1.addEventListener('pointerover', e => {                    // mouse: lewati huruf → lompat + nada
      const ch = e.target.closest && e.target.closest('.ch');
      if (ch && e.pointerType === 'mouse') pop(ch);
    });
    h1.addEventListener('pointerdown', e => {                              // sentuh / klik: lompat + confetti kecil
      const ch = e.target.closest && e.target.closest('.ch');
      if (!ch) return;
      pop(ch);
      const r = ch.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 3, 7, 60);
    });
  }

  // 2) teks peran yang berganti
  const role = $('#heroRole span');
  if (role && !reduce) {
    const words = ['Full-Stack Web Developer', 'Laravel Builder', 'Vibes Coder', 'Next.js Tinkerer'];
    let k = 0;
    setInterval(() => {
      if (document.hidden) return;
      role.className = 'out';
      setTimeout(() => { k = (k + 1) % words.length; role.textContent = words[k]; role.className = 'in'; }, 280);
    }, 2800);
  }

  // 3) balon ucapan
  const bubble = $('#heroBubble');
  if (bubble) {
    const msgs = ['Ayo bikin sesuatu yang keren!', 'Punya ide? Ceritain dong.', 'Kopi dulu, baru ngoding ☕', 'Klik stikernya, coba deh!', 'Website cepat & rapi, itu spesialku.'];
    let m = 0;
    bubble.addEventListener('click', () => {
      m = (m + 1) % msgs.length;
      bubble.classList.remove('swap'); void bubble.offsetWidth; bubble.classList.add('swap');
      setTimeout(() => { bubble.textContent = msgs[m]; }, 140);
      const r = bubble.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 8, 70);
    });
    bubble.addEventListener('animationend', e => { if (e.animationName === 'bubbleSwap') bubble.classList.remove('swap'); });
  }

  // 4) stiker meledak jadi confetti
  $$('.hero-chip', hero).forEach(c => {
    c.addEventListener('click', e => {
      if (c.dataset.dragged === '1') return;
      c.classList.remove('boom'); void c.offsetWidth; c.classList.add('boom');
      const r = c.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 12, 100);
    });
    c.addEventListener('animationend', e => { if (e.animationName === 'stickerBoom') c.classList.remove('boom'); });
  });

  // 5) paralaks halus mengikuti pointer
  const vis = $('#heroVisual');
  const layers = vis ? $$('[data-depth]', vis) : [];
  if (vis && layers.length && !reduce) {
    let px = 0, py = 0, raf = 0;
    const apply = () => {
      raf = 0;
      layers.forEach(l => {
        const d = +l.dataset.depth || 10;
        l.style.setProperty('--px', (px * d).toFixed(1));
        l.style.setProperty('--py', (py * d).toFixed(1));
      });
    };
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - .5;
      py = (e.clientY - r.top) / r.height - .5;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { px = py = 0; if (!raf) raf = requestAnimationFrame(apply); });
  }

  // 6) ketukan di layar sentuh → percikan kecil (mouse sudah punya jejak kursor)
  if (!fine) {
    document.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'touch') return;
      burst(e.clientX, e.clientY, 5, 44);
    }, { passive: true });
  }
})();
