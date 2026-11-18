/* ═══════════════════════════════════════════════════════
   cursor.js — Kursor custom (dot + ring + jejak partikel)
   Dipakai bersama oleh semua halaman (menggantikan versi
   lama di script.js & detail.js).

   Kenapa ringan:
   • posisi digerakkan dengan transform (GPU), bukan left/top (layout)
   • TIDAK ada getBoundingClientRect / querySelectorAll tiap frame
   • loop requestAnimationFrame berhenti sendiri saat kursor diam
   • jejak partikel dibatasi jumlah & frekuensinya
   Hanya aktif di perangkat dengan mouse (hover:hover + pointer:fine).
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  const dot  = document.getElementById('cursor-dot')  || document.getElementById('cd');
  const ring = document.getElementById('cursor-ring') || document.getElementById('cr');
  if (!dot || !ring) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('cursor-on');

  /* Style kursor (satu tempat untuk semua halaman) */
  const css = document.createElement('style');
  css.textContent = `
  #cursor-dot,#cd,#cursor-ring,#cr{position:fixed;top:0;left:0;pointer-events:none;border-radius:50%;
    opacity:0;transform:translate3d(-100px,-100px,0);will-change:transform;transition:opacity .25s,scale .25s cubic-bezier(.16,1,.3,1),
    background-color .2s,border-color .2s}
  #cursor-dot,#cd{z-index:9999;width:8px;height:8px;margin:-4px 0 0 -4px;background:var(--coral,#FF6B5B);border:2px solid var(--ink,#1B1A2E)}
  #cursor-ring,#cr{z-index:9998;width:40px;height:40px;margin:-20px 0 0 -20px;border:2px solid rgba(27,26,46,.35)}
  html.cursor-on.cur-visible #cursor-dot,html.cursor-on.cur-visible #cd,
  html.cursor-on.cur-visible #cursor-ring,html.cursor-on.cur-visible #cr{opacity:1}
  html.cur-hover #cursor-dot,html.cur-hover #cd{scale:2.4;background:var(--yellow,#FFD23F)}
  html.cur-hover #cursor-ring,html.cur-hover #cr{scale:1.35;border-color:var(--purple,#8B6CFF)}
  html.cur-down #cursor-dot,html.cur-down #cd{scale:.7}
  html.cur-down #cursor-ring,html.cur-down #cr{scale:.78}
  #cursor-trail-canvas{position:fixed;inset:0;pointer-events:none;z-index:9990}`;
  document.head.appendChild(css);

  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-trail-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const HOVER_SEL = 'a, button, .btn, .filter-btn, .project-card, .featured-item, .skill-item, .ch, .hero-bubble, .contact-link, ' +
                    '.nav-link, .tech-badge, .hero-photo, .hero-chip, .hero-stat, .d-desktop, input, textarea';

  let mx = -100, my = -100, rx = -100, ry = -100;
  let running = false, lastSpawn = 0;
  const parts = [];
  const CL = ['#FF6B5B', '#FFD23F', '#2EC4B6', '#8B6CFF', '#C8F560'];

  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

  function spawn(x, y, burst) {
    if (parts.length > 48) return;
    parts.push({
      x: x + (Math.random() - .5) * (burst ? 20 : 4),
      y: y + (Math.random() - .5) * (burst ? 20 : 4),
      vx: (Math.random() - .5) * (burst ? 4.5 : 1.1),
      vy: (Math.random() - .5) * (burst ? 4.5 : 1.1) - (burst ? 1.2 : .3),
      life: 1,
      decay: burst ? .045 + Math.random() * .035 : .07 + Math.random() * .03,
      r: burst ? 2 + Math.random() * 2.6 : 1.4 + Math.random() * 1.6,
      burst,
      h: 0,
    });
  }

  function frame() {
    rx += (mx - rx) * .22;
    ry += (my - ry) * .22;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;

    let drew = false;
    if (parts.length) {
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .96; p.life -= p.decay;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * (p.burst ? .65 : .4);
        ctx.fillStyle = p.burst ? CL[(p.r * 7 | 0) % CL.length] : '#1B1A2E';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      drew = true;
      if (!parts.length) ctx.clearRect(0, 0, W, H);
    }

    // berhenti total kalau ring sudah sampai & tidak ada partikel → 0% CPU saat diam
    if (parts.length || Math.abs(mx - rx) > .15 || Math.abs(my - ry) > .15) requestAnimationFrame(frame);
    else running = false;
    return drew;
  }

  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    if (!root.classList.contains('cur-visible')) { rx = mx; ry = my; root.classList.add('cur-visible'); }
    const now = e.timeStamp;
    if (!reduceMotion && now - lastSpawn > 30) { lastSpawn = now; spawn(mx, my, false); }
    kick();
  }, { passive: true });

  // Tampil hanya setelah ada gerakan mouse (posisi diketahui); sembunyi saat keluar jendela.
  root.addEventListener('mouseleave', () => root.classList.remove('cur-visible'));

  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    root.classList.toggle('cur-hover', !!(e.target.closest && e.target.closest(HOVER_SEL)));
  }, { passive: true });

  document.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') root.classList.add('cur-down');
  }, { passive: true });
  document.addEventListener('pointerup', () => root.classList.remove('cur-down'), { passive: true });

  document.addEventListener('click', e => {
    if (reduceMotion || !e.isTrusted || e.detail === 0) return;
    for (let i = 0; i < 8; i++) spawn(mx, my, true);
    kick();
  });
})();
