/* ─────────────────────────────────────────────────────
   physics.js  v5  (ringan + mobile + sound)

   • Drag & lempar gambar → Pointer Events (mouse/pen). Di layar
     sentuh, tap pada gambar = memantul (scroll tetap normal).
   • Foto profil di hero bisa diseret/dilempar, naik di atas navbar.
   • Tilt 3D saat hover screenshot (di-throttle per frame).
   • Tombol magnetik, ripple, chaos mode (G×3) memakai event delegation
     yang dipasang SEKALI. Versi lama memasang ulang listener tiap
     `portfolioRendered` → menumpuk dan bikin lag.
   • Efek hover kartu / badge / skill dipindah ke CSS (tanpa JS).
   • Suara lewat window.SFX (sfx.js), aman bila tidak termuat.
───────────────────────────────────────────────────── */
(function () {
  'use strict';

  const fine   = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp  = (v, a, b) => Math.max(a, Math.min(b, v));
  const sfx    = (name, arg) => { try { window.SFX && window.SFX.play(name, arg); } catch (_) {} };

  /* ── RIPPLE (Web Animations, maksimal 5 sekaligus) ── */
  let liveRipples = 0;
  function spawnRipple(x, y, color) {
    if (liveRipples >= 5) return;
    liveRipples++;
    const el = document.createElement('div');
    el.style.cssText =
      `position:fixed;left:${x}px;top:${y}px;width:140px;height:140px;margin:-70px 0 0 -70px;` +
      `border-radius:50%;background:${color || 'rgba(14,14,13,.10)'};pointer-events:none;z-index:8000;`;
    document.body.appendChild(el);
    const a = el.animate(
      [{ transform: 'scale(.04)', opacity: .7 }, { transform: 'scale(1)', opacity: 0 }],
      { duration: 520, easing: 'ease-out' }
    );
    a.onfinish = a.oncancel = () => { el.remove(); liveRipples--; };
  }

  /* ─────────────────────────────────────────────────
     DRAG ENGINE (gambar)
  ───────────────────────────────────────────────── */
  let dragging = null;
  let prevMx = 0, mouseVx = 0;

  window.addEventListener('pointermove', e => {
    mouseVx = e.clientX - prevMx;
    prevMx  = e.clientX;
    if (!dragging || e.pointerId !== dragging.pointerId) return;
    const d = dragging;
    const nx = e.clientX - d.startX;
    const ny = e.clientY - d.startY;
    d.velX = nx - d.ctl.x();
    d.velY = ny - d.ctl.y();
    d.ctl.drag(nx, ny, clamp(mouseVx * 1.8, -30, 30));
  }, { passive: true });

  function endDrag(e) {
    if (!dragging || e.pointerId !== dragging.pointerId) return;
    const d = dragging;
    dragging = null;
    d.ctl.release(d.velX, d.velY);
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  function makeDraggable(img) {
    const lift = img.closest('.hero-photo');           // container yang ikut naik di atas navbar
    let tx = 0, ty = 0, rot = 0, sc = 1, tiltX = 0, tiltY = 0;
    let vx = 0, vy = 0, rafId = 0, busy = false, touchStart = null;

    img.draggable = false;
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    if (fine) img.style.cursor = 'grab';

    function apply() {
      const tilt = (tiltX || tiltY) ? `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ` : '';
      img.style.transform = `${tilt}translate3d(${tx}px,${ty}px,0) rotate(${rot}deg) scale(${sc})`;
    }
    const setTransition = t => { img.style.transition = t; };
    function stopAnim() { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } }

    function settleDone() {
      tx = ty = rot = tiltX = tiltY = 0; sc = 1;
      apply();
      busy = false;
      img.style.zIndex = '';
      img.style.position = '';
      img.style.willChange = '';
      img.style.transform = '';
      if (lift) lift.style.zIndex = '';
    }

    function springBack(initVx, initVy) {
      vx = initVx * .25; vy = initVy * .25;
      (function tick() {
        vx = vx * .82 - tx * .14;
        vy = vy * .82 - ty * .14;
        tx += vx; ty += vy;
        rot *= .8;
        sc += (1 - sc) * .18;
        apply();
        const done = Math.abs(tx) < .25 && Math.abs(ty) < .25 &&
                     Math.abs(vx) < .25 && Math.abs(vy) < .25 && Math.abs(rot) < .1;
        if (done) { settleDone(); sfx('settle'); return; }
        rafId = requestAnimationFrame(tick);
      })();
    }

    function throwAnim(tvx, tvy) {
      vx = tvx * .55; vy = tvy * .55;
      let bounces = 0;
      (function tick() {
        vy += .35; vx *= .94;
        tx += vx; ty += vy;
        rot += vx * .7; rot *= .96;
        sc += (1 - sc) * .06;
        apply();

        const r = img.getBoundingClientRect();       // 1 elemen saja, hanya saat dilempar
        const vw = window.innerWidth, vh = window.innerHeight;
        if (r.bottom > vh && bounces < 4) {
          sfx('bounce', clamp(Math.abs(vy) / 14, .25, 1));
          vy = -Math.abs(vy) * .45; ty -= (r.bottom - vh); vx *= .75; bounces++;
        }
        if (r.right > vw) { vx = -Math.abs(vx) * .55; sfx('bounce', .35); }
        if (r.left < 0)   { vx =  Math.abs(vx) * .55; sfx('bounce', .35); }
        if (r.top < 0)    { vy =  Math.abs(vy) * .4; }

        if ((Math.abs(vx) < .3 && Math.abs(vy) < .3 && r.bottom >= vh - 4) || bounces >= 4) {
          springBack(vx, vy);
          return;
        }
        rafId = requestAnimationFrame(tick);
      })();
    }

    /* hover wobble (mouse saja) */
    if (fine) {
      img.addEventListener('pointerenter', e => {
        if (e.pointerType !== 'mouse' || dragging || busy) return;
        img.style.willChange = 'transform';
        setTransition('transform .2s');
        rot = (Math.random() - .5) * 5; sc = 1.05;
        apply();
      });
      img.addEventListener('pointerleave', e => {
        if (e.pointerType !== 'mouse' || dragging || busy) return;
        setTransition('transform .35s cubic-bezier(.16,1,.3,1)');
        tx = ty = rot = tiltX = tiltY = 0; sc = 1;
        apply();
        setTimeout(() => { if (!dragging && !busy) { setTransition(''); img.style.willChange = ''; img.style.transform = ''; } }, 400);
      });
    }

    /* mulai drag (mouse/pen) atau catat tap (touch) */
    img.addEventListener('pointerdown', e => {
      if (e.pointerType === 'touch') { touchStart = { t: performance.now(), x: e.clientX, y: e.clientY }; return; }
      if (e.button !== 0) return;
      e.preventDefault();
      stopAnim();
      setTransition('');
      busy = true;
      img.style.cursor = 'grabbing';
      img.style.willChange = 'transform';
      if (lift) {
        lift.style.zIndex = '99998';
        img.style.position = 'relative';
        img.style.zIndex = '99999';
      } else {
        img.style.zIndex = '500';
      }
      try { img.setPointerCapture(e.pointerId); } catch (_) {}
      dragging = { ctl, pointerId: e.pointerId, startX: e.clientX - tx, startY: e.clientY - ty, velX: 0, velY: 0 };
      spawnRipple(e.clientX, e.clientY, 'rgba(37,99,235,.18)');
    });

    /* tap di layar sentuh → memantul */
    img.addEventListener('pointerup', e => {
      if (e.pointerType !== 'touch' || !touchStart) return;
      const quick = performance.now() - touchStart.t < 350 &&
                    Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y) < 10;
      touchStart = null;
      if (!quick || reduce || busy) return;
      busy = true;
      const a = img.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.07) rotate(-2.5deg)', offset: .35 },
        { transform: 'scale(.97) rotate(1.5deg)',   offset: .7 },
        { transform: 'scale(1) rotate(0deg)' },
      ], { duration: 520, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      a.onfinish = a.oncancel = () => { busy = false; };
    });
    img.addEventListener('pointercancel', () => { touchStart = null; });

    const ctl = {
      x: () => tx,
      y: () => ty,
      drag(nx, ny, r) { tx = nx; ty = ny; rot = r; sc = 1.06; apply(); },
      release(rvx, rvy) {
        img.style.cursor = fine ? 'grab' : '';
        sfx('drop');
        Math.hypot(rvx, rvy) > 2.5 ? throwAnim(rvx, rvy) : springBack(rvx, rvy);
      },
      tilt(x, y) {
        if (busy && !dragging) return;
        if (dragging) return;
        tiltX = x; tiltY = y; rot = 0; sc = 1.06;
        img.style.willChange = 'transform';
        setTransition('transform .12s ease-out');
        apply();
      },
    };
    return ctl;
  }

  /* ─────────────────────────────────────────────────
     TILT 3D screenshot (throttle: 1× per frame)
  ───────────────────────────────────────────────── */
  function initImageHoverTilt() {
    document.querySelectorAll('.fi-desktop, .card-desktop-thumb, .d-desktop, .detail-dsk').forEach(wrap => {
      if (wrap._tilt) return;
      const img = wrap.querySelector('img');
      if (!img || !img._ctl) return;
      wrap._tilt = true;
      let raf = 0, ex = 0, ey = 0;
      wrap.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse' || dragging) return;
        ex = e.clientX; ey = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r  = wrap.getBoundingClientRect();
          const dx = (ex - r.left - r.width  / 2) / (r.width  / 2);
          const dy = (ey - r.top  - r.height / 2) / (r.height / 2);
          img._ctl.tilt(dy * 8, -dx * 8);
        });
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────────────
     GLOBAL (dipasang sekali): magnetic, ripple, chaos
  ───────────────────────────────────────────────── */
  function setupMagnetic() {
    const SEL = '.btn, .nav-cta, .filter-btn, .nav-link, .nav-logo';
    const strength = el => el.matches('.nav-link, .nav-logo') ? .18 : el.matches('.filter-btn') ? .22 : .28;
    let cur = null, ox = 0, oy = 0, raf = 0, ev = null;

    function leave() {
      if (!cur) return;
      const el = cur;
      el.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
      el.style.transform = '';
      setTimeout(() => { if (el !== cur) el.style.transition = ''; }, 420);
      cur = null; ox = oy = 0;
    }

    document.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || dragging) return;
      const el = e.target.closest ? e.target.closest(SEL) : null;
      if (el !== cur) { leave(); cur = el; if (cur) cur.style.transition = 'transform .12s'; }
      if (!cur) return;
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!cur || !ev) return;
        const r = cur.getBoundingClientRect();
        const k = strength(cur);
        ox = (ev.clientX - (r.left + r.width  / 2 - ox)) * k;   // koreksi offset sendiri → tidak "melayang"
        oy = (ev.clientY - (r.top  + r.height / 2 - oy)) * k;
        cur.style.transform = `translate(${ox}px,${oy}px)`;
      });
    }, { passive: true });

    document.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || !cur) return;
      cur.style.transition = 'transform .08s';
      cur.style.transform = `translate(${ox * .5}px,${oy * .5}px) scale(.95)`;
    }, { passive: true });
    document.addEventListener('pointerup', e => {
      if (e.pointerType !== 'mouse' || !cur) return;
      cur.style.transition = 'transform .2s cubic-bezier(.16,1,.3,1)';
      cur.style.transform = `translate(${ox}px,${oy}px)`;
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
  }

  function setupRipple() {
    document.addEventListener('click', e => {
      if (!e.isTrusted || e.detail === 0) return;
      const onControl = e.target.closest && e.target.closest('a, button, .btn, .filter-btn');
      spawnRipple(e.clientX, e.clientY, onControl ? 'rgba(37,99,235,.16)' : 'rgba(14,14,13,.07)');
    }, { passive: true });
  }

  /* ── CHAOS MODE — tekan G tiga kali ── */
  let gCount = 0, gTimer = null, chaosActive = false, chaosTimer = null;
  const chaosEls = [];

  function triggerChaos() {
    if (chaosActive || reduce) return;
    chaosActive = true;
    sfx('chaos');

    const targets = document.querySelectorAll('.project-card, .featured-item, .hero-photo, .hero-stat, .hero-chip');
    targets.forEach(el => {
      let cx = 0, cy = 0, crot = 0, alive = true;
      let cvx = (Math.random() - .5) * 14;
      let cvy = (Math.random() - .5) * 10 - 4;
      let cvrot = (Math.random() - .5) * 12;
      const prevPos = el.style.position, prevZ = el.style.zIndex;

      chaosEls.push({ reset() {
        alive = false;
        el.style.animation = '';
        el.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; el.style.position = prevPos; el.style.zIndex = prevZ; }, 750);
      } });

      el.style.animation = 'none';
      if (!el.matches('.hero-chip, .hero-photo')) el.style.position = 'relative';
      el.style.zIndex = '200';

      (function tick() {
        if (!alive) return;
        cvy += .5; cvx *= .98;
        cx += cvx; cy += cvy;
        crot += cvrot; cvrot *= .97;
        const r = el.getBoundingClientRect();
        const vw = window.innerWidth, vh = window.innerHeight;
        if (r.bottom > vh) { cvy = -Math.abs(cvy) * .4; cy -= (r.bottom - vh); cvx *= .7; }
        if (r.right > vw)  { cvx = -Math.abs(cvx) * .5; }
        if (r.left < 0)    { cvx =  Math.abs(cvx) * .5; }
        el.style.transform = `translate(${cx}px,${cy}px) rotate(${crot}deg)`;
        requestAnimationFrame(tick);
      })();
    });

    chaosTimer = setTimeout(resetChaos, 5000);
    showToast('🌪 Chaos mode! Tekan Esc untuk kembali');
  }

  function resetChaos() {
    clearTimeout(chaosTimer);
    chaosActive = false;
    chaosEls.forEach(item => item.reset());
    chaosEls.length = 0;
  }

  function setupChaosKeys() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { resetChaos(); return; }
      if (e.key.toLowerCase() !== 'g' || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && t.matches && t.matches('input, textarea, select, [contenteditable="true"]')) return;  // jangan ganggu saat mengetik
      gCount++;
      clearTimeout(gTimer);
      gTimer = setTimeout(() => { gCount = 0; }, 900);
      if (gCount >= 3) { gCount = 0; triggerChaos(); }
    });
  }

  /* ── TOAST ── */
  function showToast(msg, duration) {
    const el = document.createElement('div');
    el.className = 'physics-hint';
    el.textContent = msg;
    el.setAttribute('role', 'status');
    el.style.opacity = '0';
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 450);
    }, duration || 4500);
  }

  /* ─────────────────────────────────────────────────
     INIT — aman dipanggil berulang (hanya memproses elemen baru)
  ───────────────────────────────────────────────── */
  function init() {
    document.querySelectorAll(
      '.fi-desktop img, .card-desktop-thumb img, .d-desktop img, .hero-photo img'
    ).forEach(img => {
      if (img._ctl) return;
      img._ctl = makeDraggable(img);
    });
    if (fine) initImageHoverTilt();
  }

  let globalDone = false;
  function boot() {
    if (!globalDone) {
      globalDone = true;
      if (fine) setupMagnetic();
      setupRipple();
      setupChaosKeys();
    }
    init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('portfolioRendered', () => setTimeout(init, 100));

  window.PhysicsEngine = { spawnRipple, triggerChaos, resetChaos, showToast };
})();
