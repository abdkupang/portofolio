/* ─────────────────────────────────────────────────────
   physics.js  v4
   Rules:
   • Card hover → subtle glow/lift only (NO 3D tilt on card)
   • Image hover inside card → 3D tilt + scale on IMAGE only
   • Drag is only on images, not cards (cards stay clickable)
   • Profile photo: z-index 99999 when dragged (above navbar)
   • Mobile phone overlays: contained, not draggable (just CSS)
   • Magnetic effect on buttons only
   • Ripple on click
   • Chaos mode: G×3
───────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Desktop only ── */
  const isFine = window.matchMedia('(pointer:fine)').matches;

  /* ── UTILS ── */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  /* ─────────────────────────────────────────────────
     RIPPLE
  ───────────────────────────────────────────────── */
  function spawnRipple(x, y, color = 'rgba(14,14,13,.10)') {
    const el = Object.assign(document.createElement('div'), {});
    Object.assign(el.style, {
      position:      'fixed',
      left:          x + 'px',
      top:           y + 'px',
      width:         '6px',
      height:        '6px',
      borderRadius:  '50%',
      background:    color,
      transform:     'translate(-50%,-50%) scale(1)',
      pointerEvents: 'none',
      zIndex:        '8000',
      opacity:       '0.7',
      transition:    'transform .55s ease-out, opacity .55s ease-out',
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translate(-50%,-50%) scale(22)';
      el.style.opacity   = '0';
    });
    setTimeout(() => el.remove(), 600);
  }

  /* ─────────────────────────────────────────────────
     DRAG ENGINE — only for images
  ───────────────────────────────────────────────── */
  let dragging = null;

  function makeDraggable(img, opts = {}) {
    const { isProfilePhoto = false } = opts;

    img.style.cursor     = 'grab';
    img.style.userSelect = 'none';
    img.style.willChange = 'transform';
    img.draggable        = false; // disable native drag

    /* current physics state */
    let tx = 0, ty = 0, rot = 0, sc = 1;
    let vx = 0, vy = 0;
    let rafId = null;

    function applyT() {
      img.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${sc})`;
    }

    /* —— hover wobble —— */
    img.addEventListener('mouseenter', () => {
      if (dragging) return;
      img.style.transition = 'transform .2s';
      rot = (Math.random() - .5) * 5;
      sc  = 1.05;
      applyT();
      setTimeout(() => { img.style.transition = ''; }, 220);
    });

    img.addEventListener('mouseleave', () => {
      if (dragging) return;
      /* spring back immediately on mouseleave if not dragged */
      img.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
      tx = 0; ty = 0; rot = 0; sc = 1;
      applyT();
      setTimeout(() => { img.style.transition = ''; }, 380);
    });

    /* —— mousedown → start drag —— */
    img.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation(); /* don't let card receive this */

      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      img.style.transition = '';
      img.style.cursor     = 'grabbing';

      /* z-index strategy */
      if (isProfilePhoto) {
        /* Profile photo must float above EVERYTHING — nav is z:200 */
        img.style.position = 'relative';
        img.style.zIndex   = '99999';
      } else {
        img.style.zIndex = '500';
      }

      dragging = {
        img, isProfilePhoto,
        startX: e.clientX - tx,
        startY: e.clientY - ty,
        prevX:  e.clientX,
        prevY:  e.clientY,
        velX:   0, velY: 0,
      };

      spawnRipple(e.clientX, e.clientY, 'rgba(37,99,235,.18)');
    });

    /* —— spring back —— */
    function springBack(initVx, initVy) {
      vx = initVx * 0.25;
      vy = initVy * 0.25;

      function tick() {
        const stiffness = 0.14;
        const friction  = 0.82;

        vx = vx * friction - tx * stiffness;
        vy = vy * friction - ty * stiffness;
        tx += vx; ty += vy;
        rot = rot * 0.80;
        sc  = sc + (1 - sc) * 0.18;
        applyT();

        const done = Math.abs(tx)  < 0.25 && Math.abs(ty)  < 0.25 &&
                     Math.abs(vx)  < 0.25 && Math.abs(vy)  < 0.25 &&
                     Math.abs(rot) < 0.1;

        if (done) {
          tx = 0; ty = 0; rot = 0; sc = 1;
          applyT();
          img.style.zIndex   = '';
          img.style.position = '';
          return;
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    /* —— throw animation —— */
    function throwAnim(throwVx, throwVy) {
      vx  = throwVx * 0.55;
      vy  = throwVy * 0.55;
      const friction = 0.94;
      const gravity  = 0.35;
      let   bounces  = 0;

      function tick() {
        vy  += gravity;
        vx  *= friction;
        tx  += vx; ty += vy;
        rot += vx * 0.7;
        rot *= 0.96;
        sc   = sc + (1 - sc) * 0.06;
        applyT();

        /* viewport bounce */
        const r  = img.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (r.bottom > vh && bounces < 4) {
          vy   = -Math.abs(vy) * 0.45;
          ty  -= (r.bottom - vh);
          vx  *= 0.75;
          bounces++;
        }
        if (r.right  > vw) { vx = -Math.abs(vx) * 0.55; }
        if (r.left   < 0)  { vx =  Math.abs(vx) * 0.55; }
        if (r.top    < 0)  { vy =  Math.abs(vy) * 0.4; }

        const settled = Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3 && r.bottom >= vh - 4;
        if (settled || bounces >= 4) {
          springBack(vx, vy);
          return;
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    /* expose for mouseup handler */
    img._physRelease = (relVx, relVy) => {
      img.style.cursor = 'grab';
      const speed = Math.sqrt(relVx ** 2 + relVy ** 2);
      if (speed > 2.5) {
        throwAnim(relVx, relVy);
      } else {
        springBack(relVx, relVy);
      }
    };
    img._getTx = () => tx;
    img._getTy = () => ty;
    img._setTx = v => { tx = v; };
    img._setTy = v => { ty = v; };
    img._setRot = v => { rot = v; };
    img._setSc  = v => { sc = v; };
    img._applyT = applyT;
  }

  /* —— Global mouse tracking for drag —— */
  let mouseVx = 0, mouseVy = 0, prevMx = 0, prevMy = 0;
  window.addEventListener('mousemove', (e) => {
    mouseVx = e.clientX - prevMx;
    mouseVy = e.clientY - prevMy;
    prevMx  = e.clientX;
    prevMy  = e.clientY;

    if (!dragging) return;
    const d  = dragging;
    const nx = e.clientX - d.startX;
    const ny = e.clientY - d.startY;
    d.velX   = nx - d.img._getTx();
    d.velY   = ny - d.img._getTy();
    d.img._setTx(nx);
    d.img._setTy(ny);
    d.img._setRot(clamp(mouseVx * 1.8, -30, 30));
    d.img._setSc(1.06);
    d.img._applyT();
  }, { passive: true });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    const d = dragging;
    dragging = null;
    d.img._physRelease(d.velX, d.velY);
  });

  /* ─────────────────────────────────────────────────
     IMAGE HOVER — 3D tilt on the IMAGE element itself
     (NOT on the card — cards must stay clickable)
  ───────────────────────────────────────────────── */
  function initImageHoverTilt() {
    /* Desktop screenshots */
    document.querySelectorAll('.fi-desktop, .card-desktop-thumb, .d-desktop, .detail-dsk').forEach(wrap => {
      const img = wrap.querySelector('img');
      if (!img) return;

      wrap.addEventListener('mousemove', (e) => {
        if (dragging) return;
        const r  = wrap.getBoundingClientRect();
        const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
        const tX =  dy * 8;
        const tY = -dx * 8;
        img.style.transition = 'transform .12s';
        img.style.transform  = `perspective(600px) rotateX(${tX}deg) rotateY(${tY}deg) scale(1.06)`;
      });

      wrap.addEventListener('mouseleave', () => {
        img.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
        img.style.transform  = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────
     CARD HOVER — lift + glow only, NO tilt, NO pointer-events block
  ───────────────────────────────────────────────── */
  function initCardHover() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition  = 'transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s';
        card.style.transform   = 'translateY(-6px)';
        card.style.boxShadow   = '0 24px 64px rgba(0,0,0,.10)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition  = 'transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s';
        card.style.transform   = '';
        card.style.boxShadow   = '';
      });
    });

    /* Featured item: subtle scale only */
    document.querySelectorAll('.featured-item').forEach(fi => {
      fi.addEventListener('mouseenter', () => {
        fi.style.transition  = 'background .2s';
        fi.style.background  = 'rgba(14,14,13,.015)';
      });
      fi.addEventListener('mouseleave', () => {
        fi.style.background = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────
     MAGNETIC BUTTONS
  ───────────────────────────────────────────────── */
  function makeMagnetic(el, strength = 0.32) {
    let ox = 0, oy = 0;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      ox = (e.clientX - (r.left + r.width  / 2)) * strength;
      oy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transition = 'transform .12s';
      el.style.transform  = `translate(${ox}px,${oy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
      el.style.transform  = '';
    });
    el.addEventListener('mousedown', () => {
      el.style.transition = 'transform .08s';
      el.style.transform  = `translate(${ox*.5}px,${oy*.5}px) scale(.95)`;
    });
    el.addEventListener('mouseup', () => {
      el.style.transition = 'transform .2s cubic-bezier(.16,1,.3,1)';
      el.style.transform  = `translate(${ox}px,${oy}px)`;
    });
  }

  function initMagneticButtons() {
    document.querySelectorAll('.btn, .nav-cta').forEach(el => makeMagnetic(el, 0.28));
    document.querySelectorAll('.filter-btn').forEach(el => makeMagnetic(el, 0.22));
    document.querySelectorAll('.nav-link, .nav-logo').forEach(el => makeMagnetic(el, 0.18));
  }

  /* ─────────────────────────────────────────────────
     BADGE HOVER PHYSICS
  ───────────────────────────────────────────────── */
  function initBadgePhysics() {
    document.addEventListener('mouseover', (e) => {
      const b = e.target.closest('.tech-badge');
      if (!b) return;
      b.style.transition  = 'transform .15s, box-shadow .15s';
      b.style.transform   = 'translateY(-3px) scale(1.09)';
      b.style.boxShadow   = '0 6px 20px rgba(0,0,0,.22)';
    });
    document.addEventListener('mouseout', (e) => {
      const b = e.target.closest('.tech-badge');
      if (!b) return;
      b.style.transition  = 'transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s';
      b.style.transform   = '';
      b.style.boxShadow   = '0 1px 4px rgba(0,0,0,.18)';
    });
    document.addEventListener('mousedown', (e) => {
      const b = e.target.closest('.tech-badge');
      if (!b) return;
      b.style.transform = 'scale(.9)';
    });
    document.addEventListener('mouseup', (e) => {
      const b = e.target.closest('.tech-badge');
      if (!b) return;
      b.style.transform = 'translateY(-3px) scale(1.09)';
    });
  }

  /* ─────────────────────────────────────────────────
     SKILL BAR INTERACTION
  ───────────────────────────────────────────────── */
  function initSkillBars() {
    document.querySelectorAll('.skill-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const fill = item.querySelector('.skill-fill');
        if (fill) {
          fill.style.transition = 'background .2s, box-shadow .2s';
          fill.style.background = '#2563eb';
          fill.style.boxShadow  = '0 0 10px rgba(37,99,235,.4)';
        }
        item.style.transition = 'background .2s';
        item.style.background = 'var(--paper-2)';
      });
      item.addEventListener('mouseleave', () => {
        const fill = item.querySelector('.skill-fill');
        if (fill) {
          fill.style.background = '';
          fill.style.boxShadow  = '';
        }
        item.style.background = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────
     FLOATING HERO STATS
  ───────────────────────────────────────────────── */
  function initFloatingStats() {
    document.querySelectorAll('.hero-stat').forEach((el, i) => {
      let phase = i * 1.2;
      (function tick() {
        phase += 0.016;
        el.style.transform = `translateY(${Math.sin(phase) * 4}px)`;
        requestAnimationFrame(tick);
      })();
    });
  }

  /* ─────────────────────────────────────────────────
     GLOBAL CLICK RIPPLE
  ───────────────────────────────────────────────── */
  function initRipple() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('a, button, .btn, .filter-btn')) {
        spawnRipple(e.clientX, e.clientY, 'rgba(37,99,235,.16)');
      } else {
        spawnRipple(e.clientX, e.clientY, 'rgba(14,14,13,.07)');
      }
    });
  }

  /* ─────────────────────────────────────────────────
     CHAOS MODE — press G×3
  ───────────────────────────────────────────────── */
  let gCount = 0, gTimer = null;
  const chaosEls = [];
  let chaosActive = false;

  function triggerChaos() {
    if (chaosActive) return;
    chaosActive = true;

    const targets = [
      ...document.querySelectorAll('.project-card'),
      ...document.querySelectorAll('.featured-item'),
      ...document.querySelectorAll('.about-photo'),
      ...document.querySelectorAll('.hero-stat'),
    ];

    targets.forEach(el => {
      const ox = 0, oy = 0;
      let cx = 0, cy = 0;
      let cvx = (Math.random() - .5) * 14;
      let cvy = (Math.random() - .5) * 10 - 4;
      let crot = 0, cvrot = (Math.random() - .5) * 12;
      let alive = true;

      chaosEls.push({ el, alive, reset: () => {
        alive = false;
        el.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
        el.style.transform  = '';
        setTimeout(() => { el.style.transition = ''; }, 750);
      }});

      el.style.position = 'relative';
      el.style.zIndex   = '200';

      (function tick() {
        if (!alive) return;
        cvy  += 0.5;
        cvx  *= 0.98;
        cx   += cvx; cy += cvy;
        crot += cvrot; cvrot *= 0.97;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const r  = el.getBoundingClientRect();
        if (r.bottom > vh) { cvy = -Math.abs(cvy) * .4; cy -= (r.bottom - vh); cvx *= .7; }
        if (r.right  > vw) { cvx = -Math.abs(cvx) * .5; }
        if (r.left   < 0)  { cvx =  Math.abs(cvx) * .5; }

        el.style.transform = `translate(${cx}px,${cy}px) rotate(${crot}deg)`;
        requestAnimationFrame(tick);
      })();
    });

    /* Auto-reset after 5s */
    setTimeout(resetChaos, 5000);
    showToast('🌪 Chaos mode! Tekan Esc untuk kembali');
  }

  function resetChaos() {
    chaosActive = false;
    chaosEls.forEach(item => item.reset());
    chaosEls.length = 0;
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { resetChaos(); return; }
    if (e.key.toLowerCase() === 'g') {
      gCount++;
      clearTimeout(gTimer);
      gTimer = setTimeout(() => { gCount = 0; }, 900);
      if (gCount >= 3) { gCount = 0; triggerChaos(); }
    }
  });

  /* ─────────────────────────────────────────────────
     HINT TOAST
  ───────────────────────────────────────────────── */
  function showToast(msg, duration = 4500) {
    const el = document.createElement('div');
    el.className = 'physics-hint';
    el.textContent = msg;
    el.style.opacity = '0';
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 450);
    }, duration);
  }

  /* ─────────────────────────────────────────────────
     INIT ALL — called after DOM is ready + re-called
     after dynamic renders via 'portfolioRendered'
  ───────────────────────────────────────────────── */
  function init() {
    /* —— DRAG: only on actual image elements —— */

    /* Project desktop screenshots */
    document.querySelectorAll('.fi-desktop img, .card-desktop-thumb img, .d-desktop img').forEach(img => {
      if (img._physInited) return;
      img._physInited = true;
      /* let parent wrapper stay overflow:hidden for clipping */
      makeDraggable(img, { isProfilePhoto: false });
    });

    /* Profile photo — must float above navbar */
    document.querySelectorAll('.about-photo img').forEach(img => {
      if (img._physInited) return;
      img._physInited = true;
      /* Allow the photo to leave its container visually */
      const container = img.closest('.about-photo');
      if (container) {
        container.style.overflow = 'visible';
        container.style.zIndex   = '99998'; /* just below dragging state */
      }
      const wrap = img.closest('.about-photo-wrap');
      if (wrap) wrap.style.overflow = 'visible';
      makeDraggable(img, { isProfilePhoto: true });
    });

    /* —— IMAGE TILT: hover on wrappers tilt the inner img —— */
    initImageHoverTilt();

    /* —— CARD: only lift, never intercept clicks —— */
    initCardHover();

    /* —— MAGNETIC BUTTONS —— */
    if (isFine) initMagneticButtons();

    /* —— BADGE PHYSICS —— */
    initBadgePhysics();

    /* —— SKILL BARS —— */
    initSkillBars();

    /* —— FLOATING STATS (homepage only) —— */
    if (document.querySelector('.hero-stat')) initFloatingStats();

    /* —— RIPPLE —— */
    initRipple();
  }

  /* Boot */
  function boot() {
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Re-init when dynamic content rendered */
  window.addEventListener('portfolioRendered', () => setTimeout(init, 100));

  /* Export */
  window.PhysicsEngine = { spawnRipple, triggerChaos, resetChaos, showToast };

})();
