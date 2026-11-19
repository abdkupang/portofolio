/* ═══════════════════════════════════════════════════════
   sfx.js — Sound effects untuk semua interaksi
   ───────────────────────────────────────────────────────
   • Semua suara dibuat lewat Web Audio API (sintesis di kode),
     jadi TIDAK ada file audio yang harus diunduh / ditambah.
   • Mouse, sentuhan (mobile), dan keyboard (Tab, Enter, Space,
     mengetik, panah, Esc) semuanya punya suara sendiri.
   • Satu set listener di `document` (event delegation) → ringan,
     elemen baru yang dirender JS otomatis ikut dapat suara.
   • Tombol speaker (pojok kanan bawah / kanan atas di mobile)
     untuk mute; pilihan disimpan di localStorage.
   • API: SFX.play(name, arg) · SFX.setEnabled(bool) · SFX.isEnabled()
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.SFX) return;

  const noop = () => {};
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) {
    window.SFX = { play: noop, vibrate: noop, isEnabled: () => false, setEnabled: noop };
    return;
  }

  const STORE_KEY = 'portfolio-sfx';
  let enabled = true;
  try { enabled = localStorage.getItem(STORE_KEY) !== 'off'; } catch (_) {}

  let ctx = null, master = null, noiseBuf = null;
  let gestureUntil = 0;      // audio hanya boleh dibuka dalam jendela gesture user
  let unlocked = false;

  /* ── AudioContext (dibuat lazy, saat gesture pertama) ── */
  function ensure() {
    if (ctx) return ctx;
    try { ctx = new AC({ latencyHint: 'interactive' }); }
    catch (_) { try { ctx = new AC(); } catch (__) { return null; } }

    master = ctx.createGain();
    master.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();      // cegah clipping saat banyak suara
    comp.threshold.value = -14; comp.knee.value = 24;
    comp.ratio.value = 6; comp.attack.value = 0.003; comp.release.value = 0.12;
    master.connect(comp); comp.connect(ctx.destination);

    const len = ctx.sampleRate;                       // 1 detik white-noise
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }

  const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];
  function unlock() {
    gestureUntil = performance.now() + 250;
    const c = ensure();
    if (!c) return;
    if (c.state === 'suspended') c.resume().catch(noop);
    if (!unlocked) {
      try {                                           // trik "silent buffer" untuk iOS Safari
        const s = c.createBufferSource();
        s.buffer = c.createBuffer(1, 1, 22050);
        s.connect(c.destination);
        s.start(0);
      } catch (_) {}
    }
    if (c.state === 'running' && !unlocked) {
      unlocked = true;
      document.documentElement.classList.add('sfx-unlocked');
      UNLOCK_EVENTS.forEach(ev => document.removeEventListener(ev, unlock, true));
    }
  }
  UNLOCK_EVENTS.forEach(ev => document.addEventListener(ev, unlock, { capture: true, passive: true }));

  /* ── Synth primitives ── */
  function tone(o) {
    const t0 = ctx.currentTime + (o.at || 0);
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.freq, t0);
    if (o.end) osc.frequency.exponentialRampToValueAtTime(o.end, t0 + o.dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(o.vol, 0.0002), t0 + (o.attack || 0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + o.dur + 0.03);
  }

  function noise(o) {
    const t0 = ctx.currentTime + (o.at || 0);
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = o.ft || 'bandpass';
    f.frequency.setValueAtTime(o.f0, t0);
    if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t0 + o.dur);
    f.Q.value = o.q || 1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(o.vol, 0.0002), t0 + (o.attack || 0.006));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0, Math.random() * 0.6, o.dur + 0.03);
  }

  const PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  const CELL  = [330, 392, 440, 523.25, 659.25];     // heatmap GitHub: level 0-4

  /* ── Library suara ── */
  const S = {
    click()    { tone({ freq: 660, end: 380, type: 'triangle', dur: .07, vol: .17 });
                 noise({ dur: .02, vol: .05, f0: 3200, ft: 'highpass' }); },
    primary()  { tone({ freq: 520, end: 780, dur: .09, vol: .15 });
                 tone({ freq: 780, end: 1170, dur: .13, vol: .12, at: .05 }); },
    soft()     { tone({ freq: 440, end: 320, dur: .06, vol: .08 }); },
    tap()      { tone({ freq: 360, end: 260, dur: .05, vol: .05 }); },
    nav()      { tone({ freq: 880, end: 1320, type: 'triangle', dur: .08, vol: .12 });
                 noise({ dur: .2, vol: .035, f0: 500, f1: 2400, q: .8, at: .02 }); },
    toggle()   { tone({ freq: 560, end: 840, dur: .06, vol: .13 });
                 tone({ freq: 840, end: 840, dur: .05, vol: .06, at: .045 }); },
    card()     { tone({ freq: 310, end: 200, dur: .11, vol: .15 });
                 noise({ dur: .05, vol: .05, f0: 1200, q: 2 }); },
    external() { tone({ freq: 500, end: 1000, type: 'triangle', dur: .14, vol: .12 });
                 tone({ freq: 1000, end: 1500, dur: .12, vol: .08, at: .07 }); },
    blip()     { const n = PENTA[(Math.random() * PENTA.length) | 0];
                 tone({ freq: n, dur: .15, vol: .12 });
                 tone({ freq: n * 2, dur: .09, vol: .04 }); },
    cell(lv)   { const n = CELL[Math.max(0, Math.min(4, lv | 0))];
                 tone({ freq: n, dur: .11, vol: .07 }); },

    hover()     { tone({ freq: 1500 * (0.96 + Math.random() * .08), dur: .03, vol: .028, attack: .003 }); },
    hoverCard() { tone({ freq: 520, end: 600, dur: .05, vol: .03, attack: .004 }); },
    hoverBlip() { tone({ freq: 1900 * (0.95 + Math.random() * .1), dur: .04, vol: .035, attack: .003 }); },

    focus(dir) { const up = dir !== 'down';
                 tone({ freq: up ? 740 : 620, end: up ? 900 : 500, type: 'triangle', dur: .055, vol: .1 }); },
    focusField() { tone({ freq: 600, end: 900, dur: .08, vol: .09 }); },

    key()      { const f = 1700 + Math.random() * 700;
                 tone({ freq: f, end: f * .6, type: 'square', dur: .022, vol: .028 });
                 noise({ dur: .02, vol: .045, f0: 2600, ft: 'highpass' }); },
    keyBack()  { tone({ freq: 900, end: 480, type: 'square', dur: .03, vol: .03 });
                 noise({ dur: .025, vol: .04, f0: 1800, ft: 'highpass' }); },
    keyEnter() { tone({ freq: 440, end: 250, type: 'triangle', dur: .1, vol: .12 });
                 noise({ dur: .03, vol: .05, f0: 2000, ft: 'highpass' }); },
    scrollKey(){ tone({ freq: 700, end: 640, dur: .04, vol: .05 }); },
    back()     { tone({ freq: 480, end: 320, dur: .09, vol: .1 }); },

    menuOpen() { noise({ dur: .24, vol: .07, f0: 300, f1: 2600, q: 1.2 });
                 tone({ freq: 330, end: 700, dur: .17, vol: .12 }); },
    menuClose(){ noise({ dur: .2, vol: .06, f0: 2400, f1: 300, q: 1.2 });
                 tone({ freq: 700, end: 330, dur: .15, vol: .1 }); },

    grab()     { tone({ freq: 260, end: 360, dur: .09, vol: .13 }); },
    drop()     { tone({ freq: 420, end: 240, dur: .1, vol: .12 }); },
    bounce(v)  { v = v == null ? .6 : v;
                 tone({ freq: 190 + Math.random() * 30, end: 85, dur: .13, vol: .22 * v });
                 noise({ dur: .05, vol: .06 * v, f0: 700, q: 1.4 }); },
    settle()   { tone({ freq: 520, end: 640, dur: .08, vol: .08 }); },

    send()     { noise({ dur: .22, vol: .06, f0: 400, f1: 3000, q: 1 });
                 tone({ freq: 440, end: 880, dur: .18, vol: .1 }); },
    success()  { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
                   tone({ freq: f, dur: .24, vol: .12, at: i * .075 })); },
    error()    { tone({ freq: 220, end: 160, type: 'sawtooth', dur: .16, vol: .07 });
                 tone({ freq: 200, end: 140, type: 'sawtooth', dur: .2, vol: .07, at: .12 }); },
    chaos()    { noise({ dur: .6, vol: .12, f0: 900, f1: 120, q: .7 });
                 tone({ freq: 400, end: 70, type: 'sawtooth', dur: .5, vol: .1 }); },
    letter(i)  { const P = [392, 440, 494, 587, 659, 784, 880, 988];
                 const f = P[(i | 0) % P.length] * ((i | 0) >= P.length ? 1 : 1);
                 tone({ freq: f, dur: .18, vol: .13, attack: .004 });
                 tone({ freq: f * 2, dur: .09, vol: .04 }); },
    pop()      { tone({ freq: 300, end: 900, type: 'sine', dur: .11, vol: .16 });
                 noise({ dur: .04, vol: .05, f0: 2600, ft: 'highpass' }); },
    bubble()   { tone({ freq: 520, end: 760, type: 'triangle', dur: .08, vol: .13 });
                 tone({ freq: 760, end: 520, type: 'triangle', dur: .1, vol: .1, at: .07 }); },
    whoosh()   { noise({ dur: .42, vol: .09, f0: 300, f1: 3400, q: .9 });
                 tone({ freq: 220, end: 880, type: 'triangle', dur: .35, vol: .07 }); },
    squeak()   { tone({ freq: 700, end: 1250, type: 'square', dur: .07, vol: .06 });
                 tone({ freq: 1250, end: 900, type: 'square', dur: .08, vol: .05, at: .06 }); },
    fix()      { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone({ freq: f, type: 'triangle', dur: .13, vol: .12, at: i * .07 })); },
    sweep()    { noise({ dur: .26, vol: .07, f0: 2400, f1: 900, q: .8 }); },
    dizzy()    { tone({ freq: 520, end: 240, type: 'sawtooth', dur: .35, vol: .06 });
                 tone({ freq: 430, end: 200, type: 'sawtooth', dur: .35, vol: .05, at: .2 }); },
    paint(i)   { tone({ freq: 392 * Math.pow(1.1225, (i | 0) % 10), type: 'sine', dur: .1, vol: .1 }); },
    scrub(v)   { tone({ freq: 300 + (v | 0) * 7, type: 'triangle', dur: .045, vol: .06 }); },
    thud()     { tone({ freq: 130, end: 60, dur: .13, vol: .2 });
                 noise({ dur: .05, vol: .05, f0: 500, q: 1 }); },
    section()  { tone({ freq: 880, end: 1175, dur: .07, vol: .05, attack: .004 }); },
    on()       { tone({ freq: 520, end: 780, dur: .09, vol: .13 });
                 tone({ freq: 780, end: 1040, dur: .11, vol: .1, at: .06 }); },
    off()      { tone({ freq: 700, end: 400, dur: .1, vol: .12 }); },
  };

  /* ── Pemutar (throttle per nama supaya tidak numpuk) ── */
  const GAP = { hover: 40, hoverCard: 90, hoverBlip: 50, cell: 28, key: 16, keyBack: 20,
                scrollKey: 70, letter: 55, squeak: 90, fix: 200, sweep: 120, dizzy: 400, paint: 25, scrub: 35, thud: 70, section: 400, whoosh: 300, pop: 40, bubble: 60, focus: 40, focusField: 60, error: 250, tap: 60 };
  const last = Object.create(null);

  function play(name, arg) {
    if (!enabled) return;
    const fn = S[name];
    if (!fn) return;
    const now = performance.now();
    if (now - (last[name] || 0) < (GAP[name] || 22)) return;
    last[name] = now;
    const c = ensure();
    if (!c) return;
    if (c.state === 'running') { fn(arg); return; }
    // belum aktif: hanya boleh dibuka dari gesture user (hover tidak ikut antre)
    if (now < gestureUntil) c.resume().then(() => fn(arg)).catch(noop);
  }

  function vibrate(ms) {
    if (!enabled) return;
    try {
      if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(ms);
    } catch (_) {}
  }

  /* ── Klasifikasi elemen interaktif ── */
  const SEL = 'a[href], button, [role="button"], summary, select, input, textarea, label[for], ' +
              '.project-card, .featured-item, .skill-item, .tech-badge, .hero-stat, .hero-chip, ' +
              '.hero-photo, .d-desktop, .fi-desktop, .card-desktop-thumb, .contact-link, .gh-cell, .info-row, ' +
              '.ami, .ami-ghost, .ch, .hero-bubble, .marquee span, .hero-chip, .d-mobile, .fi-mobile, .card-mobile-thumb';

  function closestInteractive(t) {
    return t && t.closest ? t.closest(SEL) : null;
  }
  function kind(el) {
    if (el.closest('#sfxToggle') || el.matches('.nav-toggle')) return null;   // punya suara sendiri
    if (el.matches('.ami, .ami-ghost, .ch')) return null;                                      // fx.js memainkan nada per huruf
    if (el.matches('.hero-bubble')) return 'bubble';
    if (el.matches('.hero-chip')) return 'pop';
    if (el.matches('.marquee span, .d-mobile, .fi-mobile, .card-mobile-thumb')) return 'blip';
    if (el.matches('.gh-cell')) return 'cell';
    if (el.matches('.nav-link, .nav-logo, .footer-links a, .back-btn, .page-back, .link-view-all')) return 'nav';
    if (el.matches('.btn-primary, .nav-cta, .btn-dark, [type="submit"]')) return 'primary';
    if (el.matches('.filter-btn')) return 'toggle';
    if (el.matches('.tech-badge, .hero-stat, .hero-chip')) return 'blip';
    if (el.matches('.hero-photo, .d-desktop, .fi-desktop, .card-desktop-thumb')) return 'grab';
    if (el.matches('.project-card, .featured-item')) return 'card';
    if (el.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea, select')) return 'focusField';
    if (el.matches('a[target="_blank"]')) return 'external';
    if (el.matches('.skill-item, .contact-link, .info-row')) return 'soft';
    return 'click';
  }
  function cellLevel(el) {
    const m = /gh-l(\d)/.exec(el.className);
    return m ? +m[1] : 0;
  }
  function soundFor(el, pressed) {
    const k = kind(el);
    if (!k) return;
    if (k === 'cell') play('cell', cellLevel(el));
    else play(k === 'blip' && !pressed ? 'hoverBlip' : k);
  }

  /* ═════ POINTER (mouse / pen / touch) ═════ */
  let lastPointerType = 'mouse';
  let lastPointerDownAt = 0;

  // Mouse & pen: bunyi saat ditekan (responsif). Touch: bunyi saat tap selesai (di `click`),
  // supaya menggeser layar untuk scroll tidak memicu suara.
  document.addEventListener('pointerdown', e => {
    lastPointerType = e.pointerType || 'mouse';
    lastPointerDownAt = performance.now();
    if (lastPointerType === 'touch') return;
    if (e.button !== 0) return;
    const el = closestInteractive(e.target);
    if (!el) { play('tap'); return; }
    soundFor(el, true);
  }, true);

  // Hover (hanya mouse)
  let hoverEl = null;
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse' || e.buttons) return;
    const el = closestInteractive(e.target);
    if (el === hoverEl) return;
    hoverEl = el;
    if (!el) return;
    const k = kind(el);
    if (!k) return;
    if (k === 'cell') play('cell', cellLevel(el));
    else if (k === 'blip') play('hoverBlip');
    else if (k === 'card') play('hoverCard');
    else play('hover');
  }, true);

  /* ═════ CLICK: tap (touch) + aktivasi keyboard + tombol menu ═════ */
  document.addEventListener('click', e => {
    const toggler = e.target.closest && e.target.closest('.nav-toggle');
    if (toggler) {                                   // buka/tutup menu mobile, baik tap maupun Enter
      const links = document.getElementById('navLinks');
      play(links && links.classList.contains('open') ? 'menuOpen' : 'menuClose');
      if (lastPointerType === 'touch') vibrate(8);
      return;
    }
    if (!e.isTrusted) return;
    const touch = lastPointerType === 'touch' && performance.now() - lastPointerDownAt < 1200;
    const keyboard = e.detail === 0 && !touch && performance.now() - lastPointerDownAt > 500;
    if (!touch && !keyboard) return;
    const el = closestInteractive(e.target);
    if (!el) { if (touch) play('tap'); return; }
    soundFor(el, true);
    if (touch) vibrate(kind(el) === 'primary' ? 12 : 7);
  });

  /* ═════ KEYBOARD ═════ */
  let tabDir = 1;
  const TYPING = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    const typing = t && t.matches && t.matches(TYPING);

    if (typing) {
      if (e.key === 'Backspace' || e.key === 'Delete') play('keyBack');
      else if (e.key === 'Enter') play('keyEnter');
      else if (e.key.length === 1) play('key');
      return;
    }
    if (e.key === 'Tab') { tabDir = e.shiftKey ? -1 : 1; return; }      // suara fokus ada di `focusin`
    if (e.key === 'Escape') { play('back'); return; }

    const onControl = t && t.matches && t.matches('a[href], button, [role="button"], summary, select');
    if (onControl) return;                                              // Enter/Space → ditangani `click`
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
      play('scrollKey');
    }
  }, true);

  document.addEventListener('focusin', e => {
    const t = e.target;
    if (!t || !t.matches) return;
    let visible = false;
    try { visible = t.matches(':focus-visible'); } catch (_) {}
    if (!visible || t.id === 'sfxToggle') return;
    if (t.matches(TYPING)) play('focusField');
    else play('focus', tabDir < 0 ? 'down' : 'up');
  }, true);

  // Form kontak: pesan belum lengkap → bunyi error (event `invalid` tidak bubbling)
  document.addEventListener('invalid', () => play('error'), true);

  // Hemat baterai/CPU saat tab tidak terlihat
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend().catch(noop);
    else if (unlocked) ctx.resume().catch(noop);
  });

  /* ═════ TOMBOL MUTE ═════ */
  const ICON_ON  = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9 9 0 010 13"/></svg>';
  const ICON_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';

  const CSS = `
  .sfx-toggle{position:fixed;right:20px;bottom:20px;z-index:9500;width:48px;height:48px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;cursor:pointer;
    background:var(--lime,#C8F560);color:var(--ink,#1B1A2E);
    border:2.5px solid var(--ink,#1B1A2E);box-shadow:3px 3px 0 var(--ink,#1B1A2E);
    transition:transform .15s cubic-bezier(.16,1,.3,1),box-shadow .15s,background .2s;
    -webkit-tap-highlight-color:transparent}
  .sfx-toggle:hover{transform:translate(-1px,-2px) rotate(-6deg);box-shadow:5px 5px 0 var(--ink,#1B1A2E)}
  .sfx-toggle:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink,#1B1A2E)}
  .sfx-toggle:focus-visible{outline:3px solid var(--purple,#8B6CFF);outline-offset:3px}
  .sfx-toggle[aria-pressed="false"]{background:var(--paper-3,#F3E9D6);color:var(--ink-3,#66647F)}
  .sfx-toggle::after{content:'';position:absolute;inset:-6px;border-radius:50%;
    border:2.5px solid var(--coral,#FF6B5B);opacity:0;pointer-events:none}
  html:not(.sfx-unlocked) .sfx-toggle[aria-pressed="true"]::after{animation:sfxPulse 2.2s ease-out 1.2s 4}
  @keyframes sfxPulse{0%{opacity:.8;transform:scale(.9)}100%{opacity:0;transform:scale(1.5)}}
  @media (max-width:860px){
    .sfx-toggle{right:72px;bottom:auto;top:23px;width:40px;height:40px;box-shadow:2px 2px 0 var(--ink,#1B1A2E)}
    .sfx-toggle svg{width:17px;height:17px}
  }
  @media (prefers-reduced-motion:reduce){html:not(.sfx-unlocked) .sfx-toggle::after{animation:none}}`;

  function mountToggle() {
    if (document.getElementById('sfxToggle')) return;
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'sfxToggle';
    btn.type = 'button';
    btn.className = 'sfx-toggle';
    document.body.appendChild(btn);

    const paint = () => {
      btn.setAttribute('aria-pressed', String(enabled));
      btn.setAttribute('aria-label', enabled ? 'Matikan suara efek' : 'Nyalakan suara efek');
      btn.title = enabled ? 'Suara: nyala (klik untuk mute)' : 'Suara: mati (klik untuk menyalakan)';
      btn.innerHTML = enabled ? ICON_ON : ICON_OFF;
    };
    paint();

    btn.addEventListener('click', () => {
      unlock();
      if (enabled) { play('off'); enabled = false; }
      else { enabled = true; play('on'); }
      try { localStorage.setItem(STORE_KEY, enabled ? 'on' : 'off'); } catch (_) {}
      paint();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountToggle);
  else mountToggle();

  window.SFX = {
    play, vibrate,
    isEnabled: () => enabled,
    setEnabled(v) {
      enabled = !!v;
      try { localStorage.setItem(STORE_KEY, enabled ? 'on' : 'off'); } catch (_) {}
      const b = document.getElementById('sfxToggle');
      if (b) { b.setAttribute('aria-pressed', String(enabled)); b.innerHTML = enabled ? ICON_ON : ICON_OFF; }
    },
  };
})();
