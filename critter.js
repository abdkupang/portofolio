/* ═══════════════════════════════════════════════════════════
   critter.js — Ami, asisten kecil + item yang bisa dijatuhkan
   • Ami: dicolek, diseret & dilempar, matanya mengikuti pointer,
     berkomentar sesuai bagian halaman yang sedang dilihat
   • Item di tiap bagian bisa diseret (desktop: langsung, HP: tahan
     sebentar lalu geser) dan dijatuhkan → Ami terbang membereskannya
   • Heatmap GitHub bisa dicoret-coret → Ami menyapu
   • Bar skill bisa digeser → Ami mengembalikan levelnya
   Item yang diseret adalah SALINAN (tidak terpotong kartu), aslinya
   disembunyikan sampai dibereskan. Semua pakai transform/WAAPI.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sfx = (n, a) => { try { window.SFX && window.SFX.play(n, a); } catch (_) {} };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const path = (location.pathname.split('/').pop() || 'index.html');
  const isDetail = /project-detail/.test(path), isList = /projects\.html/.test(path);

  /* ───────── Gaya tambahan ───────── */
  const DRAG_SEL = '.section-eyebrow, .info-row, .tech-badge, .contact-link-icon, .contact-link, .footer .nav-logo, .footer-links a, ' +
    '.hero-stat, .hero-role, .hero-hi, .hero-eyebrow, .hero-photo, .hero-chip, .hero-bubble, .fi-num, .filter-label, .filter-btn, ' +
    '.page-h1 em, .tag, .d-tags-label, .d-readme-label, .d-progress, .badge, .gh-profile-link, .btn, .link-view-all, .skill-item, ' +
    '.back-btn, .page-back';
  const PERCH_SEL = '.btn, .link-view-all, .filter-btn, .project-card, .featured-item, .skill-item, .contact-link, .contact-form, ' +
    '.about-info, .gh-contrib-wrap, .hero-photo, .hero-stat, .hero-chip, .hero-bubble, .section-title, .page-h1, .hero-h1, .d-visual, ' +
    '.d-readme, .footer-links a, .tech-badge, .info-row, .nav-inner, .form-control, .marquee-wrap, .section-eyebrow, .tag, .badge, img';
  const NO_DRAG = '.nav, .ami-chat, .physics-hint, .music-toggle, .sfx-toggle';
  const css = document.createElement('style');
  css.textContent = `.ami .t-wrench,.ami .t-broom{display:none}
  .ami.tool-wrench .t-wrench,.ami.tool-broom .t-broom{display:inline}
  .ami{touch-action:none}
  ${DRAG_SEL}{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
  .skill-track{-webkit-user-select:none;user-select:none}`;
  document.head.appendChild(css);

  /* ───────── Ami: DOM ───────── */
  const SVG = `<svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">
    <g class="ami-prop"><path d="M32 15V6" stroke="#1B1A2E" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="21" cy="5" rx="10" ry="3.2" fill="#FF6B5B" stroke="#1B1A2E" stroke-width="2.4"/>
      <ellipse cx="43" cy="5" rx="10" ry="3.2" fill="#FF6B5B" stroke="#1B1A2E" stroke-width="2.4"/></g>
    <ellipse class="ami-foot-l" cx="22" cy="64" rx="8" ry="4.6" fill="#FF6B5B" stroke="#1B1A2E" stroke-width="2.5"/>
    <ellipse class="ami-foot-r" cx="42" cy="64" rx="8" ry="4.6" fill="#FF6B5B" stroke="#1B1A2E" stroke-width="2.5"/>
    <ellipse cx="5" cy="43" rx="4.6" ry="6.2" fill="#FFD23F" stroke="#1B1A2E" stroke-width="2.5"/>
    <rect x="7" y="14" width="50" height="46" rx="17" fill="#FFD23F" stroke="#1B1A2E" stroke-width="3.2"/>
    <g class="ami-arm-r"><ellipse cx="59" cy="43" rx="4.6" ry="6.2" fill="#FFD23F" stroke="#1B1A2E" stroke-width="2.5"/>
      <g class="ami-tool" transform="translate(59 40)">
        <g class="t-wrench"><path d="M2 -3L13 -15" stroke="#66647F" stroke-width="4.5" stroke-linecap="round"/><circle cx="14.5" cy="-16.5" r="5" fill="none" stroke="#66647F" stroke-width="3.2"/></g>
        <g class="t-broom"><path d="M2 -3L14 -17" stroke="#B57A4E" stroke-width="3.2" stroke-linecap="round"/><path d="M10 -13L22 -7L16 -22Z" fill="#C8F560" stroke="#1B1A2E" stroke-width="2" stroke-linejoin="round"/></g>
      </g></g>
    <g class="ami-eyes"><ellipse cx="23" cy="33" rx="6.2" ry="7.2" fill="#fff" stroke="#1B1A2E" stroke-width="2.4"/>
      <ellipse cx="41" cy="33" rx="6.2" ry="7.2" fill="#fff" stroke="#1B1A2E" stroke-width="2.4"/>
      <g class="ami-pupil"><circle cx="23.5" cy="34" r="3.1" fill="#1B1A2E"/><circle cx="41.5" cy="34" r="3.1" fill="#1B1A2E"/></g></g>
    <g class="eyes-x" stroke="#1B1A2E" stroke-width="2.8" stroke-linecap="round"><path d="M19 29l8 8M27 29l-8 8M37 29l8 8M45 29l-8 8"/></g>
    <ellipse cx="14" cy="45" rx="4" ry="2.8" fill="#FF6B5B" opacity=".65"/><ellipse cx="50" cy="45" rx="4" ry="2.8" fill="#FF6B5B" opacity=".65"/>
    <path class="m-smile" d="M25 45Q32 53 39 45" fill="none" stroke="#1B1A2E" stroke-width="3" stroke-linecap="round"/>
    <ellipse class="m-o" cx="32" cy="48" rx="3.6" ry="4.4" fill="#1B1A2E"/>
    <path class="m-x" d="M24 48q4 -5 8 0t8 0" fill="none" stroke="#1B1A2E" stroke-width="2.8" stroke-linecap="round"/>
  </svg>`;
  const ami = document.createElement('div');
  ami.className = 'ami';
  ami.tabIndex = 0;
  ami.setAttribute('role', 'button');
  ami.setAttribute('aria-label', 'Ami, asisten kecil. Tekan untuk menyapa');
  ami.innerHTML = `<div class="ami-shadow"></div><div class="ami-flip"><div class="ami-body">${SVG}</div></div><div class="ami-z" aria-hidden="true">z</div><div class="ami-say" aria-live="polite"></div>`;
  document.body.appendChild(ami);
  const sayEl = $('.ami-say', ami), pupil = $('.ami-pupil', ami);

  const A = { x: -120, y: 0, anim: null, held: false, since: 0, token: 0, lift: 0 };
  let perch = null, acting = false, sleepLock = 0;
  let sz = { w: 60, h: 68 };
  const W = () => innerWidth, H = () => innerHeight;
  const ground = () => H() - sz.h - 12 - A.lift;
  const rightLimit = () => W() - sz.w - (W() > 860 ? 92 : 12);
  const T = (x, y) => `translate3d(${x}px,${y}px,0)`;
  function place(x, y) { A.x = x; A.y = y; ami.style.transform = T(x, y); }
  function measure() { sz = { w: ami.offsetWidth || 60, h: ami.offsetHeight || 68 }; }
  measure();
  place(-120, ground());
  const setDir = dx => { if (Math.abs(dx) > 4) ami.style.setProperty('--dir', dx < 0 ? -1 : 1); };

  function sync() {                                    // ambil posisi terkini kalau sedang bergerak
    if (!A.anim) return;
    try {
      const m = new DOMMatrix(getComputedStyle(ami).transform);
      A.x = m.m41; A.y = m.m42;
    } catch (_) {}
    A.anim.cancel(); A.anim = null; place(A.x, A.y);
  }
  function unperch() { if (perch) { perch = null; ami.classList.remove('perched'); } }
  function move(tx, ty, o) {
    o = o || {};
    return new Promise(res => {
      if (!o.keepPerch) unperch();
      sync();
      const dx = tx - A.x, dy = ty - A.y, dist = Math.hypot(dx, dy);
      if (dist < 3) { place(tx, ty); return res(true); }
      const fly = o.fly || ty < ground() - 14;
      const dur = reduce ? 1 : clamp(dist / (fly ? .6 : .3), 220, 1700);
      setDir(dx);
      ami.classList.toggle('flying', fly);
      ami.classList.toggle('walking', !fly);
      const fr = [{ transform: T(A.x, A.y) }];
      if (fly && dist > 140 && !reduce) fr.push({ transform: T(A.x + dx / 2, A.y + dy / 2 - 26), offset: .5 });
      fr.push({ transform: T(tx, ty) });
      const an = ami.animate(fr, { duration: dur, easing: 'cubic-bezier(.4,0,.2,1)' });
      A.anim = an;
      an.onfinish = () => { if (A.anim === an) A.anim = null; place(tx, ty); ami.classList.remove('flying', 'walking'); res(true); };
      an.oncancel = () => { ami.classList.remove('flying', 'walking'); res(false); };
    });
  }

  /* ───────── Bicara ───────── */
  let sayT = 0;
  function say(t, ms) {
    sayEl.textContent = t;
    const x = A.x;
    sayEl.style.setProperty('--sx', x < 90 ? '-8%' : x > W() - 190 ? '-88%' : '-32%');
    sayEl.classList.toggle('below', A.y < 90);
    sayEl.classList.add('show');
    clearTimeout(sayT);
    sayT = setTimeout(() => sayEl.classList.remove('show'), ms || 2600);
  }
  function wake() {
    if (Date.now() < sleepLock) return;
    A.since = 0;
    if (ami.classList.contains('sleeping')) { ami.classList.remove('sleeping'); say('Hm? Oh, hai lagi!', 1500); }
  }

  /* ───────── Mata mengikuti pointer ───────── */
  let mx = W() / 2, my = H() / 2, lookRaf = 0;
  function look() {
    lookRaf = 0;
    const cx = A.x + sz.w / 2, cy = A.y + sz.h * .5;
    const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 150) * 2.8;
    const flip = (ami.style.getPropertyValue('--dir') || '1') === '-1' ? -1 : 1;
    pupil.style.transform = `translate(${(dx / d) * k * flip}px,${(dy / d) * k}px)`;
  }
  document.addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY; if (!lookRaf) lookRaf = requestAnimationFrame(look);
    if (A.since > 2) wake(); A.since = 0;
  }, { passive: true });
  ['keydown', 'scroll'].forEach(ev => window.addEventListener(ev, () => { if (A.since > 2) wake(); A.since = 0; }, { passive: true }));

  /* ───────── Colek ───────── */
  const POKE = ['Eh! Geli tau 😆', 'Hehe, halo!', 'Ada yang bisa kubantu?', 'Colek lagi dong!', 'Aku Ami, asisten kecilmu.', 'Tarik aku juga bisa lho!', 'Bip bop! 🤖'];
  let pokes = [];
  function dizzy(ms) {
    ami.classList.add('dizzy'); sfx('dizzy'); say('Pusiiing…', 1600);
    setTimeout(() => { ami.classList.remove('dizzy'); say('Hehe, udah gapapa.', 1600); }, ms || 2200);
  }
  function poke() {
    wake();
    ami.classList.remove('squish'); void ami.offsetWidth; ami.classList.add('squish');
    setTimeout(() => ami.classList.remove('squish'), 520);
    sfx('squeak');
    const now = Date.now();
    pokes = pokes.filter(t => now - t < 3000); pokes.push(now);
    if (window.FX) window.FX.burst(A.x + sz.w / 2, A.y + 14, 6, 50);
    if (pokes.length >= 5) { pokes = []; dizzy(2200); } else say(pick(POKE), 1800);
  }
  ami.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke(); if (chat.hidden) openChat(true); } });

  /* ───────── Mondar-mandir & tidur ───────── */
  let nextWander = rnd(5, 9), idleN = 0;
  setInterval(() => {
    if (document.hidden) return;
    A.since++;
    if (busy || A.held || drag || acting || perch) { idleN = 0; if (!perch || A.since < 40) return; }
    idleN++;
    if (A.since > 40 && !ami.classList.contains('sleeping')) { ami.classList.add('sleeping'); return; }
    if (ami.classList.contains('sleeping') || reduce) return;
    if (idleN >= nextWander) {
      idleN = 0; nextWander = rnd(5, 10);
      move(rnd(10, Math.max(20, rightLimit())), ground());
    }
  }, 1000);
  window.addEventListener('resize', () => {
    measure();
    if (!busy && !A.held && !A.anim) place(clamp(A.x, 6, Math.max(10, rightLimit())), ground());
  }, { passive: true });

  /* ───────── Salinan item (ghost) ───────── */
  const PROPS = ['color', 'background-color', 'background-image', 'background-size', 'background-position', 'background-repeat',
    'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
    'box-shadow', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-align', 'text-shadow',
    'text-transform', 'text-decoration-line', 'white-space', 'display', 'flex-direction', 'flex-wrap', 'align-items',
    'justify-content', 'column-gap', 'row-gap', 'flex-grow', 'flex-shrink', 'flex-basis', 'opacity', 'fill', 'stroke',
    'stroke-width', 'overflow', 'vertical-align', 'box-sizing', 'width', 'height', 'object-fit', 'grid-template-columns'];
  function inline(src, dst) {
    const cs = getComputedStyle(src);
    let t = '';
    for (const p of PROPS) t += p + ':' + cs.getPropertyValue(p) + ';';
    dst.style.cssText = t;
    dst.removeAttribute('id'); dst.removeAttribute('href'); dst.removeAttribute('onclick');
    dst.setAttribute('tabindex', '-1');
    const a = src.children, b = dst.children;
    for (let i = 0; i < a.length && i < b.length; i++) inline(a[i], b[i]);
  }
  const ghosts = new Set();
  const gT = (g, x, y, rot, sc) =>
    `translate3d(${x == null ? g.x : x}px,${y == null ? g.y : y}px,0) ${g.base} rotate(${(rot == null ? g.rot : rot) + g.baseRot}deg)${sc != null ? ' scale(' + sc + ')' : ''}`;
  const render = g => { g.el.style.transform = gT(g); };

  function makeGhost(src) {
    const r = src.getBoundingClientRect();
    const cs = getComputedStyle(src);
    const el = src.cloneNode(true);
    inline(src, el);
    const g = {
      el, src, w: r.width, h: r.height, x: r.left + scrollX, y: r.top + scrollY, rot: 0,
      base: cs.transform && cs.transform !== 'none' ? cs.transform : '',
      baseRot: cs.rotate && cs.rotate !== 'none' ? parseFloat(cs.rotate) || 0 : 0,
      state: 'held', vx: 0, vy: 0,
    };
    el.style.cssText += `;position:absolute;left:0;top:0;margin:0;width:${r.width}px;height:${r.height}px;box-sizing:border-box;visibility:visible`;
    el.classList.add('ami-ghost', 'held');
    el.__g = g;
    document.body.appendChild(el);
    src.style.visibility = 'hidden';
    ghosts.add(g);
    render(g);
    return g;
  }
  function origPos(g) { const r = g.src.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, r }; }
  function dropGhost(g) {                              // hapus salinan, tampilkan asli
    g.src.style.visibility = ''; g.el.remove(); ghosts.delete(g);
    g.src.classList.remove('ami-wiggle'); void g.src.offsetWidth; g.src.classList.add('ami-wiggle');
    setTimeout(() => g.src.classList.remove('ami-wiggle'), 600);
  }

  /* ───────── Fisika jatuh ───────── */
  function fall(g, vx, vy) {
    g.state = 'falling';
    g.el.classList.remove('held');
    const maxX = Math.max(0, document.documentElement.clientWidth - g.w);
    const floor = Math.max(g.y, scrollY + H() - g.h - 6);
    vx = clamp(vx, -2.2, 2.2); vy = clamp(vy, -2.2, 2.2);
    let spin = vx * .22 + rnd(-.05, .05), last = performance.now(), t0 = last, hits = 0;
    const G = .0021;
    if (reduce) { g.y = floor; g.rot = rnd(-12, 12); render(g); return settle(g); }
    (function frame(now) {
      if (g.state !== 'falling') return;
      const dt = Math.min(32, now - last); last = now;
      vy += G * dt; g.x += vx * dt; g.y += vy * dt; g.rot += spin * dt;
      if (g.x < 0) { g.x = 0; vx = Math.abs(vx) * .6; }
      if (g.x > maxX) { g.x = maxX; vx = -Math.abs(vx) * .6; }
      if (g.y >= floor) {
        g.y = floor;
        if (vy > .28) { hits++; sfx('bounce', clamp(vy, .25, 1)); vy = -vy * .42; vx *= .8; spin *= .55; }
        else { vy = 0; vx *= .86; spin *= .8; }
      }
      render(g);
      const rest = g.y >= floor && Math.abs(vy) < .01 && Math.abs(vx) < .02 && Math.abs(spin) < .02;
      if (rest || now - t0 > 3200) {
        g.rot = ((g.rot % 360) + 540) % 360 - 180;
        g.rot = clamp(g.rot, -25, 25) || rnd(-14, 14);
        render(g); return settle(g);
      }
      requestAnimationFrame(frame);
    })(last);
  }
  function settle(g) {
    sfx('settle');
    const o = origPos(g);
    if (Math.hypot(g.x - o.x, g.y - o.y) < 30) {       // dijatuhkan pas di tempat asal
      g.state = 'carried';
      const an = g.el.animate([{ transform: gT(g) }, { transform: gT(g, o.x, o.y, 0) }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
      an.onfinish = () => { dropGhost(g); sfx('success'); };
      return;
    }
    g.state = 'mess';
    g.el.classList.add('mess');
    if (queue.every(m => m.g !== g)) enqueue({ type: 'ghost', g, ready: Date.now() + 1500 });
    if (!busy) say(pick(['Wah, jatuh!', 'Ups, berantakan…', 'Waduh!']), 1500);
  }

  /* ───────── Antrian pekerjaan Ami ───────── */
  const queue = [];
  let busy = false;
  function enqueue(m) { m.created = Date.now(); queue.push(m); work(); }
  const FIXED = ['Beres! ✨', 'Rapi lagi~', 'Hup! Kembali ke tempatnya.', 'Jangan dirusak terus ya 😆', 'Ami on duty 🛠️', 'Sip, sudah kuberesin!'];
  function visibleOf(m) {
    let r;
    if (m.type === 'ghost') {
      const y = m.g.y - scrollY, o = m.g.src.getBoundingClientRect();
      return (y > -m.g.h * .5 && y < H() - 8) || (o.bottom > 0 && o.top < H() - 8);
    }
    if (m.type === 'cells') { r = m.cells[0] && m.cells[0].getBoundingClientRect(); }
    else if (m.type === 'skill') r = m.item.getBoundingClientRect();
    return !!r && r.bottom > 0 && r.top < H() - 8;
  }
  async function work() {
    if (busy) return;
    busy = true;
    try {
      while (queue.length) {
        if (A.held || (drag && drag.started)) { await wait(400); continue; }
        const now = Date.now();
        const ready = queue.filter(m => !m.removed && m.ready <= now);
        queue.splice(0, queue.length, ...queue.filter(m => !m.removed));
        if (!queue.length) break;
        if (!ready.length) { await wait(250); continue; }
        const vis = ready.filter(visibleOf);
        let m = vis[0];
        if (!m) {
          const old = ready.find(x => now - x.created > 4000);
          if (!old) { await wait(700); continue; }
          m = old; m.silent = true;
        }
        queue.splice(queue.indexOf(m), 1);
        if (m.type === 'ghost') await fixGhost(m);
        else if (m.type === 'cells') await fixCells(m);
        else if (m.type === 'skill') await fixSkill(m);
        await wait(250);
      }
    } finally {
      ami.classList.remove('tool-wrench', 'tool-broom');
      busy = false;
      if (!A.held && !drag) { await move(clamp(A.x, 8, Math.max(10, rightLimit())), ground()); }
    }
  }
  const standY = r => (r.top - sz.h + 10 < 6 ? r.bottom + 2 : r.top - sz.h + 10);
  const standX = r => clamp(r.left + r.width / 2 - sz.w / 2, 4, W() - sz.w - 4);

  async function fixGhost(m) {
    const g = m.g;
    if (!ghosts.has(g)) return;
    g.state = 'carried'; g.el.classList.add('carried'); g.el.classList.remove('mess');
    const gy = g.y - scrollY;
    const ghostVis = gy > -g.h * .5 && gy < H() - 8;
    let o = origPos(g), r = o.r;
    const origVis = r.bottom > 0 && r.top < H() - 8;
    if (!origVis && !ghostVis) {                       // dua-duanya di luar layar → kembalikan diam-diam
      g.el.remove(); ghosts.delete(g); g.src.style.visibility = ''; return;
    }
    if (!ghostVis) {                                   // item tertinggal di tempat lain, tapi tempat asalnya sedang terlihat
      say('Eh, ada yang ketinggalan! Kujemput~', 1600);
      await move(standX(r), standY(r), { fly: true });
      ami.classList.add('tool-wrench'); sfx('grab');
      g.x = o.x; g.y = o.y; g.rot = 0;
      const an = g.el.animate([{ transform: gT(g, o.x, o.y, 0, .15), opacity: 0 }, { transform: gT(g, o.x, o.y, 0, 1.12), opacity: 1, offset: .7 }, { transform: gT(g, o.x, o.y, 0, 1), opacity: 1 }],
        { duration: reduce ? 1 : 520, easing: 'cubic-bezier(.34,1.4,.5,1)', fill: 'forwards' });
      await an.finished.catch(() => {});
    } else {
      const gv = { left: g.x - scrollX, top: g.y - scrollY, width: g.w, height: g.h };
      say(pick(['Tenang, kuambil ya!', 'Hup! Kuamankan.', 'Sebentar, Ami datang!']), 1500);
      await move(standX(gv), standY(gv), { fly: true });
      if (A.held) { g.state = 'mess'; g.el.classList.remove('carried'); g.el.classList.add('mess'); queue.push(m); return; }
      ami.classList.add('tool-wrench'); sfx('grab');
      await wait(220);
      o = origPos(g); r = o.r;
      if (!(r.bottom > 0 && r.top < H())) {            // asal tak terlihat lagi → kantongi
        const an = g.el.animate([{ transform: gT(g), opacity: 1 }, { transform: gT(g, g.x, g.y - 30, 0, .2), opacity: 0 }], { duration: 300, easing: 'ease-in', fill: 'forwards' });
        await an.finished.catch(() => {});
        dropGhost(g); sfx('fix'); say('Sudah kukembalikan ke tempatnya!', 2000);
        return;
      }
      const an = g.el.animate([{ transform: gT(g) }, { transform: gT(g, o.x, o.y, 0) }],
        { duration: reduce ? 1 : 780, easing: 'cubic-bezier(.34,1.35,.5,1)', fill: 'forwards' });
      await Promise.all([an.finished.catch(() => {}), move(standX(r), standY(r), { fly: true })]);
    }
    dropGhost(g);
    sfx('fix');
    ami.classList.remove('happy'); void ami.offsetWidth; ami.classList.add('happy');
    setTimeout(() => ami.classList.remove('happy'), 600);
    if (window.FX) window.FX.burst(r.left + r.width / 2, r.top + r.height / 2, 8, 60);
    say(pick(FIXED), 2000);
    await wait(500);
  }

  /* ───────── Heatmap GitHub: coret & sapu ───────── */
  const lvl = c => +((c.className.match(/gh-l(\d)/) || [0, 0])[1]);
  let paintN = 0, painted = new Set(), paintT = 0, mouseDown = false, lastType = 'mouse';
  function paint(c, max) {
    if (!c || !c.classList || !c.classList.contains('gh-cell')) return;
    if (c.dataset.o == null) c.dataset.o = lvl(c);
    const l = lvl(c), nl = max ? 4 : (l + 1) % 5;
    if (nl === l && c.classList.contains('painted')) return;
    c.className = 'gh-cell gh-l' + nl + ' painted';
    c.classList.remove('ami-wiggle'); void c.offsetWidth; c.classList.add('ami-wiggle');
    sfx('paint', paintN++);
    painted.add(c);
    clearTimeout(paintT);
    paintT = setTimeout(() => {
      const cells = [...painted].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      painted = new Set(); paintN = 0;
      if (cells.length) enqueue({ type: 'cells', cells, ready: Date.now() });
    }, 2300);
  }
  const restoreCell = c => { c.className = 'gh-cell gh-l' + (c.dataset.o || 0); c.classList.add('ami-wiggle'); };
  document.addEventListener('pointerdown', e => {
    lastType = e.pointerType;
    const c = e.target.closest && e.target.closest('.gh-cell');
    if (c && e.pointerType === 'mouse' && e.button === 0) { mouseDown = true; paint(c, false); }
  });
  document.addEventListener('pointerover', e => {
    if (!mouseDown) return;
    const c = e.target.closest && e.target.closest('.gh-cell');
    if (c) paint(c, true);
  });
  document.addEventListener('pointerup', () => { mouseDown = false; });
  document.addEventListener('click', e => {
    const c = e.target.closest && e.target.closest('.gh-cell');
    if (c && lastType !== 'mouse') paint(c, false);
  });
  async function fixCells(m) {
    say('Sapu sapu~', 1500);
    ami.classList.add('tool-broom');
    let n = 0;
    for (const c of m.cells) {
      if (A.held) { m.cells.forEach(restoreCell); return; }
      const r = c.getBoundingClientRect();
      const vis = r.right > 0 && r.left < W() && r.bottom > 0 && r.top < H();
      if (!vis || n > 16) { restoreCell(c); continue; }
      n++;
      await move(clamp(r.left - sz.w / 2 + 6, 2, W() - sz.w - 2), clamp(r.top - sz.h + 6, 4, H() - sz.h), { fly: true });
      restoreCell(c); sfx('sweep');
    }
    ami.classList.remove('tool-broom');
    sfx('fix'); ami.classList.add('happy'); setTimeout(() => ami.classList.remove('happy'), 600);
    say('Bersih! ✨', 1800);
  }

  /* ───────── Bar skill: geser & kembalikan ───────── */
  let scrub = null;
  document.addEventListener('pointerdown', e => {
    const tr = e.target.closest && e.target.closest('.skill-track');
    if (!tr || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const item = tr.closest('.skill-item'), fill = $('.skill-fill', item), pct = $('.skill-pct', item);
    if (!fill || !parseFloat(fill.style.width)) return;
    const prev = queue.find(m => m.type === 'skill' && m.item === item);
    if (prev) prev.removed = true;
    scrub = { tr, item, fill, pct, orig: +fill.dataset.w, lastTick: -99, id: e.pointerId };
    try { tr.setPointerCapture(e.pointerId); } catch (_) {}
    e.preventDefault();
    setScrub(e.clientX);
    sfx('grab');
  });
  function setScrub(cx) {
    if (!scrub) return;
    const r = scrub.tr.getBoundingClientRect();
    const v = Math.round(clamp((cx - r.left) / r.width * 100, 3, 100));
    scrub.fill.style.transition = 'none';
    scrub.fill.style.width = v + '%';
    scrub.pct.textContent = v + '%';
    if (Math.abs(v - scrub.lastTick) >= 3) { scrub.lastTick = v; sfx('scrub', v); }
    scrub.v = v;
  }
  document.addEventListener('pointermove', e => { if (scrub && e.pointerId === scrub.id) setScrub(e.clientX); });
  const endScrub = () => {
    if (!scrub) return;
    const s = scrub; scrub = null;
    requestAnimationFrame(() => { s.fill.style.transition = ''; });
    if (s.v != null && s.v !== s.orig) {
      sfx('drop');
      enqueue({ type: 'skill', item: s.item, fill: s.fill, pct: s.pct, orig: s.orig, ready: Date.now() + 1400 });
    }
  };
  document.addEventListener('pointerup', endScrub);
  document.addEventListener('pointercancel', endScrub);
  async function fixSkill(m) {
    const r = m.item.getBoundingClientRect();
    say('Eits, level aslinya jangan diubah~', 1700);
    ami.classList.add('tool-wrench');
    await move(standX(r), standY(r), { fly: true });
    const from = parseFloat(m.fill.style.width) || m.orig;
    m.fill.style.width = m.orig + '%';
    const t0 = performance.now(), dur = reduce ? 1 : 650;
    await new Promise(res => (function step(t) {
      const k = clamp((t - t0) / dur, 0, 1);
      m.pct.textContent = Math.round(from + (m.orig - from) * k) + '%';
      k < 1 ? requestAnimationFrame(step) : res();
    })(t0));
    m.pct.textContent = m.orig + '%';
    sfx('fix'); ami.classList.add('happy'); setTimeout(() => ami.classList.remove('happy'), 600);
    say(pick(FIXED), 1800);
  }

  /* ───────── Mesin seret (item, salinan, Ami) ───────── */
  let drag = null, blockClick = 0;
  document.addEventListener('click', e => {
    if (Date.now() < blockClick) { e.stopPropagation(); e.preventDefault(); }
  }, true);
  document.addEventListener('touchmove', e => { if (drag && drag.started && e.cancelable) e.preventDefault(); }, { passive: false });
  document.addEventListener('contextmenu', e => { if (drag && (drag.touch || drag.started)) e.preventDefault(); });
  document.addEventListener('selectstart', e => { if (drag && drag.started) e.preventDefault(); });

  document.addEventListener('pointerdown', e => {
    if (drag || scrub) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const t = e.target;
    if (!t.closest) return;
    const isAmi = t.closest('.ami'), gEl = t.closest('.ami-ghost');
    const item = !isAmi && !gEl ? t.closest(DRAG_SEL) : null;
    if (!isAmi && !gEl && !item) return;
    if (item && (item.closest(NO_DRAG) || item.style.visibility === 'hidden')) return;
    const touch = e.pointerType !== 'mouse';
    drag = { id: e.pointerId, kind: isAmi ? 'ami' : gEl ? 'ghost' : 'item', el: isAmi || gEl || item, sx: e.clientX, sy: e.clientY,
      touch, started: false, pts: [], px: e.clientX, py: e.clientY };
    if (!touch) e.preventDefault();
    if (touch && drag.kind === 'item') drag.timer = setTimeout(begin, 230);
  });

  function begin() {
    if (!drag || drag.started) return;
    clearTimeout(drag.timer);
    drag.started = true;
    wake();
    if (drag.kind === 'item') {
      drag.g = makeGhost(drag.el);
    } else if (drag.kind === 'ghost') {
      drag.g = drag.el.__g;
      if (!drag.g) { drag = null; return; }
      drag.g.state = 'held'; drag.g.el.classList.add('held'); drag.g.el.classList.remove('mess');
      queue.forEach(m => { if (m.g === drag.g) m.removed = true; });
    }
    if (drag.g) {
      drag.offX = drag.px + scrollX - drag.g.x; drag.offY = drag.py + scrollY - drag.g.y;
      drag.g.el.classList.add('held');
      try { drag.g.el.setPointerCapture(drag.id); } catch (_) {}
    } else {                                           // Ami diangkat
      A.held = true; unperch(); sync(); ami.classList.add('held', 'o');
      ami.classList.remove('flying', 'walking');
      drag.offX = sz.w / 2; drag.offY = sz.h * .4;
      try { ami.setPointerCapture(drag.id); } catch (_) {}
      say('Eeeh, turunin!', 1400);
    }
    sfx(drag.g ? 'grab' : 'squeak');
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (_) {} }
  }

  let moveRaf = 0;
  document.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.px = e.clientX; drag.py = e.clientY;
    if (!drag.started) {
      const d = Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy);
      if (drag.touch && drag.kind === 'item') { if (d > 10) { clearTimeout(drag.timer); drag = null; } return; }
      if (d > 5) begin();
      if (!drag || !drag.started) return;
    }
    const now = performance.now();
    drag.pts.push({ t: now, x: e.clientX, y: e.clientY });
    while (drag.pts.length > 2 && now - drag.pts[0].t > 90) drag.pts.shift();
    if (!moveRaf) moveRaf = requestAnimationFrame(applyDrag);
  }, { passive: true });

  function applyDrag() {
    moveRaf = 0;
    if (!drag || !drag.started) return;
    const g = drag.g;
    if (g) {
      const maxX = Math.max(0, document.documentElement.clientWidth - g.w);
      g.x = clamp(drag.px + scrollX - drag.offX, 0, maxX);
      g.y = clamp(drag.py + scrollY - drag.offY, 0, document.documentElement.scrollHeight - g.h);
      const p = drag.pts, n = p.length;
      const vx = n > 1 ? (p[n - 1].x - p[0].x) / Math.max(16, p[n - 1].t - p[0].t) : 0;
      g.rot += (clamp(vx * 9, -18, 18) - g.rot) * .3;
      render(g);
    } else {
      place(clamp(drag.px - drag.offX, 0, W() - sz.w), clamp(drag.py - drag.offY, 0, H() - sz.h));
    }
  }

  function velocity() {
    const p = drag.pts, n = p.length;
    if (n < 2) return { vx: 0, vy: 0 };
    const dt = Math.max(16, p[n - 1].t - p[0].t);
    return { vx: (p[n - 1].x - p[0].x) / dt, vy: (p[n - 1].y - p[0].y) / dt };
  }
  function endDrag(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const d = drag; drag = null;
    clearTimeout(d.timer);
    if (!d.started) { if (d.kind === 'ami' && e && e.type === 'pointerup') { poke(); if (chat.hidden) openChat(true); } return; }
    blockClick = Date.now() + 400;
    const v = (() => { drag = d; const r = velocity(); drag = null; return r; })();
    if (d.g) { fall(d.g, v.vx, v.vy); sfx('drop'); }
    else dropAmi(v, d.px, d.py);
  }
  document.addEventListener('pointerup', endDrag);
  document.addEventListener('pointercancel', endDrag);

  async function dropAmi(v, px, py) {
    ami.classList.remove('held', 'o');
    const tgt = perchTargetAt(px, py);
    if (tgt) {
      const r = tgt.getBoundingClientRect();
      const tx = clamp(px - sz.w / 2, Math.max(2, r.left), Math.max(2, Math.min(W() - sz.w - 2, r.right - sz.w)));
      await move(tx, perchY(r), { fly: true, keepPerch: true });
      A.held = false;
      perchOn(tgt, tx - r.left);
      sfx('settle');
      say(pick(['Pemandangan dari sini bagus!', 'Aku di atas! 😎', 'Hup, naik!', 'Nyaman juga di sini~']), 2200);
      if (queue.length) work();
      return;
    }
    const fast = Math.hypot(v.vx, v.vy) > 1.4;
    const gy = ground(), dist = gy - A.y;
    const tx = clamp(A.x + v.vx * 160, 4, Math.max(8, rightLimit()));
    if (dist > 6) {
      const dur = reduce ? 1 : clamp(Math.sqrt(dist) * 28, 160, 650);
      setDir(tx - A.x);
      const an = ami.animate([{ transform: T(A.x, A.y), easing: 'cubic-bezier(.5,0,1,.6)' }, { transform: T(tx, gy), offset: .72 },
        { transform: T(tx, gy - 22), offset: .86, easing: 'ease-out' }, { transform: T(tx, gy) }], { duration: dur + 260 });
      A.anim = an;
      await an.finished.catch(() => {});
      if (A.anim === an) A.anim = null;
    }
    place(tx, gy);
    A.held = false;
    sfx('thud');
    ami.classList.remove('squish'); void ami.offsetWidth; ami.classList.add('squish');
    setTimeout(() => ami.classList.remove('squish'), 520);
    if (fast || dist > H() * .45) dizzy(1800); else say(pick(['Fiuh, mendarat!', 'Hup!', 'Jangan dilempar-lempar dong 😅']), 1800);
    if (queue.length) work();
  }


  /* ───────── Bertengger di atas elemen ───────── */
  const perchY = r => Math.max(4, r.top - sz.h + 9);
  function perchTargetAt(x, y) {
    const els = document.elementsFromPoint(x, y);
    for (const e of els) {
      if (e.closest('.ami, .ami-ghost, .ami-chat, .physics-hint, .wipe')) continue;
      const p = e.closest(PERCH_SEL);
      if (p) return p;
    }
    return null;
  }
  function perchOn(el, ox) {
    const r = el.getBoundingClientRect();
    perch = { el, ox: clamp(ox, 0, Math.max(0, r.width - sz.w)) };
    ami.classList.add('perched');
    place(clamp(r.left + perch.ox, 2, W() - sz.w - 2), perchY(r));
  }
  let perchRaf = 0;
  function perchUpdate() {
    perchRaf = 0;
    if (!perch || A.held || A.anim) return;
    const r = perch.el.getBoundingClientRect();
    if (!perch.el.isConnected || r.width === 0 || r.bottom < 40 || r.top > H() - 30) {
      unperch();
      say('Yah, ketinggalan~ Aku turun dulu.', 1800);
      move(clamp(A.x, 8, Math.max(10, rightLimit())), ground());
      return;
    }
    place(clamp(r.left + perch.ox, 2, W() - sz.w - 2), perchY(r));
  }
  const perchTick = () => { if (perch && !perchRaf) perchRaf = requestAnimationFrame(perchUpdate); };
  window.addEventListener('scroll', perchTick, { passive: true });
  window.addEventListener('resize', perchTick, { passive: true });
  function nearestVisible(sel) {
    const mid = H() / 2;
    return $$(sel).filter(e => { if (e.closest(NO_DRAG) && !e.matches('.nav-inner')) return false; const r = e.getBoundingClientRect(); return r.width > 20 && r.height > 12 && r.bottom > 60 && r.top < H() - 80 && getComputedStyle(e).visibility !== 'hidden'; })
      .sort((a, b) => Math.abs(a.getBoundingClientRect().top - mid) - Math.abs(b.getBoundingClientRect().top - mid))[0];
  }
  async function perchNearest(sel, label) {
    const el = nearestVisible(sel);
    if (!el) return `Aku nggak lihat ${label} di layar. Coba gulir dulu ya!`;
    const r = el.getBoundingClientRect();
    const tx = clamp(r.left + r.width / 2 - sz.w / 2, 2, W() - sz.w - 2);
    await move(tx, perchY(r), { fly: true, keepPerch: true });
    perchOn(el, tx - r.left);
    sfx('settle');
    return `Sampai! Aku di atas ${label} 😎`;
  }

  /* ───────── Ngobrol & perintah ───────── */
  const chat = document.createElement('div');
  chat.className = 'ami-chat';
  chat.hidden = true;
  chat.setAttribute('role', 'dialog');
  chat.setAttribute('aria-label', 'Ngobrol dengan Ami');
  const CHIPS = [['👋 Halo', 'halo'], ['🦘 Lompat', 'lompat'], ['💃 Menari', 'menari'], ['🧭 Ke Skill', 'ke skill'], ['📬 Ke Kontak', 'ke kontak'],
    ['🙈 Berantakin', 'berantakin'], ['🧹 Beresin', 'beresin'], ['🔼 Naik ke tombol', 'naik ke tombol'], ['🏃 Ikuti kursor', 'ikuti aku'],
    ['🎵 Musik', 'musik'], ['😂 Lelucon', 'lelucon'], ['🎤 Nyanyi', 'nyanyi'], ['😴 Tidur', 'tidur'], ['⬇️ Turun', 'turun']];
  chat.innerHTML = `<div class="ami-chat-head"><strong>Ngobrol sama Ami</strong><button type="button" class="ami-chat-x" aria-label="Tutup obrolan">×</button></div>
    <div class="ami-chat-log" aria-live="polite"></div>
    <div class="ami-chat-chips">${CHIPS.map(c => `<button type="button" data-cmd="${c[1]}">${c[0]}</button>`).join('')}</div>
    <form class="ami-chat-form"><input type="text" maxlength="80" placeholder="Ketik: lompat, ke skill, naik ke tombol…" autocomplete="off" enterkeyhint="send" aria-label="Pesan untuk Ami"><button type="submit">Kirim</button></form>`;
  document.body.appendChild(chat);
  const logEl = $('.ami-chat-log', chat), input = $('input', chat);
  function logLine(who, text) {
    const d = document.createElement('div');
    d.className = 'l-' + who; d.textContent = text; logEl.appendChild(d);
    while (logEl.children.length > 5) logEl.firstChild.remove();
    logEl.scrollTop = logEl.scrollHeight;
  }
  function relift() {
    A.lift = chat.hidden ? 0 : chat.offsetHeight + 8;
    if (!perch && !busy && !A.held && !A.anim) move(clamp(A.x, 6, Math.max(10, rightLimit())), ground());
  }
  function openChat(v) {
    chat.hidden = !v;
    sfx(v ? 'menuOpen' : 'menuClose');
    relift();
    if (v) { if (!logEl.children.length) { logLine('ami', 'Hai! Aku Ami 👋 Ketik perintah atau pilih tombol di bawah.'); } if (matchMedia('(hover:hover)').matches) input.focus({ preventScroll: true }); }
  }
  $('.ami-chat-x', chat).addEventListener('click', () => openChat(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !chat.hidden) openChat(false); });
  $('.ami-chat-chips', chat).addEventListener('click', e => { const b = e.target.closest('button[data-cmd]'); if (b) ask(b.dataset.cmd); });
  $('form', chat).addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (v) { input.value = ''; ask(v); } });
  window.addEventListener('resize', () => { if (!chat.hidden) relift(); }, { passive: true });

  const JOKES = ['Kenapa programmer suka gelap? Karena cahaya menarik bug 🐛', 'Ada 10 jenis orang: yang ngerti biner dan yang enggak.',
    'Aku nggak takut bug. Aku cuma takut deploy hari Jumat 😅', 'CSS itu gampang… sampai kamu mau center sebuah div.',
    'Git commit -m "fix" — doa terpendek seorang developer 🙏', 'Aku bukan malas, aku lagi hemat energi mode ngoding.'];
  const hop = async n => {
    const x = A.x, y = A.y;
    for (let i = 0; i < n; i++) {
      const an = ami.animate([{ transform: T(x, y) }, { transform: T(x, y - 54), offset: .5 }, { transform: T(x, y) }], { duration: reduce ? 1 : 420, easing: 'ease-out' });
      sfx('pop'); await an.finished.catch(() => {});
    }
    place(x, y);
  };
  const act = async fn => { acting = true; try { await fn(); } finally { acting = false; } };
  const goSection = id => {
    const el = document.getElementById(id);
    if (!el) {
      if (isDetail || isList) { setTimeout(() => { location.href = 'index.html#' + id; }, 900); return 'Itu ada di beranda. Ayo kita ke sana!'; }
      return 'Bagian itu nggak ada di halaman ini.';
    }
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    ami.classList.add('happy'); setTimeout(() => ami.classList.remove('happy'), 600);
    return 'Ikuti aku! Kita meluncur ke sana 🚀';
  };
  const NOTES = [392, 440, 494, 587, 659, 784, 659, 587, 494, 440, 392];
  const RULES = [
    [/terima ?kasih|makasih|thanks|thx|tengkyu/, () => 'Sama-sama! 💛'],
    [/siapa (kamu|ami)|kamu siapa|perkenalan|nama(mu| kamu)/, () => 'Aku Ami, asisten kecil di portofolio Abdillah. Hobiku: terbang, beres-beres, dan ngobrol!'],
    [/siapa (abdillah|pemilik|dia)|tentang abdillah|\bbio\b|pemilik/, () => 'Abdillah Mukhair Ismail — mahasiswa S1 Teknik Informatika Universitas Dipa Makassar, full-stack web developer.'],
    [/whatsapp|\bwa\b|email|hubungi|kontak/, () => { const r = goSection('contact'); return 'WhatsApp +62 821-9648-1822 atau email abdillahmukhairismail@gmail.com. ' + (document.getElementById('contact') ? 'Kita ke sana!' : r); }],
    [/(skill|keahlian|kemampuan)/, () => goSection('skills')],
    [/(aktivitas|github|kontribusi)/, () => goSection('github')],
    [/(tentang|about)/, () => goSection('about')],
    [/(proyek|karya|project|portofolio)/, () => (isList ? 'Kamu sudah di halaman semua proyek!' : document.getElementById('projects') ? goSection('projects') : (setTimeout(() => { location.href = 'projects.html'; }, 900), 'Menuju daftar proyek…'))],
    [/(atas|awal|beranda|home|top)\b/, () => { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return 'Kembali ke atas!'; }],
    [/(footer|paling bawah|dasar halaman)/, () => { scrollTo({ top: document.documentElement.scrollHeight, behavior: reduce ? 'auto' : 'smooth' }); return 'Meluncur ke bawah!'; }],
    [/naik.*(tombol|button)/, () => perchNearest('.btn, .link-view-all, .filter-btn', 'tombol')],
    [/naik.*(kartu|card|proyek|kotak)/, () => perchNearest('.project-card, .featured-item, .skill-item, .contact-link', 'kartu')],
    [/naik.*(foto|gambar)/, () => perchNearest('.hero-photo, .d-visual, .card-desktop-thumb, .fi-desktop', 'foto')],
    [/naik.*(judul|tulisan|heading)/, () => perchNearest('.section-title, .page-h1, .hero-h1, .d-title', 'judul')],
    [/\bnaik|hinggap|bertengger/, () => perchNearest(PERCH_SEL, 'sesuatu')],
    [/turun|lantai|jangan di atas/, async () => { unperch(); await move(clamp(A.x, 8, Math.max(10, rightLimit())), ground()); return 'Sudah turun!'; }],
    [/lompat|loncat|jump/, async () => { await act(() => hop(3)); return 'Hup hup hup!'; }],
    [/menari|joget|dance|goyang/, () => act(async () => {
      ami.classList.add('dance'); for (let i = 0; i < NOTES.length; i++) { sfx('letter', i % 8); await wait(210); }
      await wait(600); ami.classList.remove('dance'); return null; }).then(() => 'Fiuh, capek tapi seru! 💃')],
    [/putar|muter|spin|salto|jungkir/, () => act(async () => { ami.classList.add('spin'); sfx('whoosh'); await wait(1000); ami.classList.remove('spin'); }).then(() => 'Wheee!')],
    [/terbang|melayang|keliling/, () => act(async () => {
      for (const [fx, fy] of [[.15, .25], [.8, .2], [.85, .6], [.2, .55]]) await move(W() * fx - sz.w / 2, H() * fy, { fly: true });
      await move(clamp(A.x, 8, Math.max(10, rightLimit())), ground());
    }).then(() => 'Pemandangan dari atas keren!')],
    [/ikut|follow|kejar/, () => act(async () => {
      say('Aku ikuti kursormu!', 1500);
      const end = Date.now() + 9000;
      while (Date.now() < end && !A.held) { await move(clamp(mx - sz.w / 2, 2, W() - sz.w - 2), clamp(my - sz.h - 14, 4, H() - sz.h), { fly: true }); await wait(120); }
      await move(clamp(A.x, 8, Math.max(10, rightLimit())), ground());
    }).then(() => 'Capek ngejar, hehe.')],
    [/sembunyi|ngumpet|hilang/, () => act(async () => {
      ami.style.transition = 'opacity .3s'; ami.style.opacity = '0'; await wait(3500);
      ami.style.opacity = ''; sfx('pop'); ami.classList.add('happy'); setTimeout(() => ami.classList.remove('happy'), 600); await wait(300); ami.style.transition = '';
    }).then(() => 'Cilukba! 👀')],
    [/tidur|ngantuk|istirahat/, () => { sleepLock = Date.now() + 6000; A.since = 99; ami.classList.add('sleeping'); return 'Zzz… (aku bangun kalau kamu colek)'; }],
    [/bangun|wake/, () => { sleepLock = 0; wake(); ami.classList.remove('sleeping'); return 'Aku bangun!'; }],
    [/berantak|acak|rusak|jatuhin|nakal/, () => { mischief(); return 'Hihi, ups… nggak sengaja 🙈'; }],
    [/beres|rapi|bersih|perbaiki|kembalikan/, () => { if (!queue.length) return 'Sudah rapi kok! ✨ Coba jatuhkan sesuatu dulu.'; queue.forEach(m => { m.ready = 0; }); work(); return 'Siap, langsung kubereskan!'; }],
    [/(matikan|mati|stop|diam|off|berhenti).*(musik|lagu|bgm|backsound)|(musik|lagu|bgm|backsound).*(mati|stop|off|diam)/, () => { window.Music && window.Music.setOn(false); return 'Musiknya kumatikan 🔇'; }],
    [/musik|lagu|bgm|backsound|putar/, () => { if (window.Music) { window.Music.setOn(true); window.Music.start && window.Music.start(); } return 'Musik santai dinyalakan 🎵'; }],
    [/lelucon|jokes?|lucu|bercanda|ketawa/, () => pick(JOKES)],
    [/nyanyi|sing|bernyanyi/, () => act(async () => { for (let i = 0; i < 8; i++) { say('♪'.repeat(1 + (i % 3)), 400); sfx('letter', [0, 2, 4, 5, 4, 2, 3, 1][i]); await wait(260); } }).then(() => 'La la la~ 🎤')],
    [/\b(halo|hai|hi|hello|hey|hei|pagi|siang|sore|malam)\b/, () => { ami.classList.add('waving'); setTimeout(() => ami.classList.remove('waving'), 1700); return 'Halo juga! Senang ketemu kamu 👋'; }],
    [/apa kabar|gimana kabar/, () => 'Baik banget! Baling-balingku lagi segar 🚁'],
    [/bisa apa|bantu|help|bantuan|perintah/, () => 'Aku bisa: lompat, menari, terbang, ikuti kursor, naik ke tombol/kartu/foto, ke skill/kontak/proyek, berantakin & beresin, musik, lelucon, nyanyi!'],
  ];
  async function ask(text) {
    logLine('me', text);
    A.since = 0; wake();
    const q = text.toLowerCase();
    let reply = null, hit = false;
    for (const [re, fn] of RULES) {
      if (re.test(q)) { hit = true; try { reply = await fn(); } catch (_) { reply = 'Ups, ada yang error.'; } break; }
    }
    if (!hit) reply = pick(['Hmm, aku belum paham itu 😅 Coba: "lompat", "ke skill", "naik ke tombol", atau "musik".', 'Belum ngerti nih. Ketik "bantuan" buat lihat daftar perintahku!']);
    if (reply) { logLine('ami', reply); say(reply, clamp(reply.length * 55, 2200, 6500)); sfx('bubble'); }
  }
  function mischief() {
    const items = $$(DRAG_SEL).filter(e => {
      if (e.closest(NO_DRAG) || e.closest('.ami-ghost') || e.style.visibility === 'hidden') return false;
      const r = e.getBoundingClientRect(); return r.width > 16 && r.height > 12 && r.top > 70 && r.bottom < H() - 20 && r.width < W() * .9;
    }).sort(() => Math.random() - .5).slice(0, 4);
    items.forEach((el, i) => setTimeout(() => {
      const g = makeGhost(el); sfx('grab');
      fall(g, rnd(-1.1, 1.1), rnd(-1.5, -.6));
    }, i * 220));
    if (!items.length) say('Nggak ada yang bisa kuberantakin di layar ini 😅', 2000);
  }

  /* ───────── Komentar sesuai bagian / halaman ───────── */
  const LINES = {
    hero: 'Halo! Aku Ami 👋 Colek aku, atau tarik apa saja!',
    about: 'Tahan & geser catatannya — nanti kurapikan lagi.',
    github: 'Ketuk kotak-kotaknya buat ngecat. Aku yang nyapu!',
    skills: 'Coba geser bar-nya… level aslinya kujaga ya 😤',
    projects: 'Lencana teknologinya bisa dilempar. Awas jatuh!',
    contact: 'Mau ngobrol? Isi formnya, Ami tunggu 📬',
  };
  const said = new Set();
  if ('IntersectionObserver' in window && !isList && !isDetail) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      const id = en.target.id;
      if (!en.isIntersecting || said.has(id) || !LINES[id] || id === 'hero') return;
      said.add(id);
      setTimeout(() => { if (!busy && !A.held && !drag) say(LINES[id], 3400); }, 700);
    }), { rootMargin: '-40% 0px -50% 0px' });
    $$('section[id]').forEach(s => io.observe(s));
  }
  if (isList) {
    document.addEventListener('click', e => {
      if (!e.target.closest || !e.target.closest('.filter-btn')) return;
      setTimeout(() => {
        const n = $$('.project-card').filter(c => !c.classList.contains('hidden')).length;
        if (!busy) say(n ? `Ketemu ${n} proyek!` : 'Hmm, belum ada proyek di sini.', 2200);
      }, 300);
    });
  }

  /* ───────── Masuk panggung ───────── */
  (async function intro() {
    await wait(reduce ? 200 : 1500);
    await move(16, ground());
    ami.classList.add('waving'); setTimeout(() => ami.classList.remove('waving'), 1700);
    say(isList ? 'Ini semua karyaku! Lempar lencananya kalau berani 😎'
      : isDetail ? 'Tag & labelnya bisa digeser lho. Coba!' : LINES.hero, 3800);
    setTimeout(() => {
      try { if (sessionStorage.getItem('ami-hint')) return; sessionStorage.setItem('ami-hint', '1'); } catch (_) {}
      const h = document.createElement('div');
      h.className = 'physics-hint';
      h.textContent = matchMedia('(hover:hover)').matches ? 'Seret item apa saja lalu lepas — Ami yang membereskan' : 'Tahan item lalu geser & lepas — Ami yang membereskan';
      document.body.appendChild(h);
      setTimeout(() => { h.style.opacity = '0'; setTimeout(() => h.remove(), 500); }, 4600);
    }, 4200);
  })();

  window.Ami = { say, poke, ask };
})();
