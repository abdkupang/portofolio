/* ═══════════════════════════════════════════════
   PORTFOLIO v3 — script.js
   Fixed: detail layout, mobile preview, cursor game
═══════════════════════════════════════════════ */
'use strict';

/* ── SVG ICONS ─────────────────────────────── */
const IC = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
  info:   `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  arrow:  `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  tag:    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  doc:    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
};

/* ── MARKDOWN PARSER ──────────────────────── */
function md(text) {
  if (!text) return '';
  let h = text;
  // strip shield badges and images
  h = h.replace(/\[!\[.*?\]\(https?:\/\/img\.shields\.io[^)]*\)\]\([^)]*\)/g, '');
  h = h.replace(/!\[.*?\]\([^)]*\)/g, '');
  // fenced code blocks
  h = h.replace(/```[\w]*\n([\s\S]*?)```/g, (_, c) => `<pre><code>${esc(c.trim())}</code></pre>`);
  // tables
  h = h.replace(/((?:\|[^\n]+\|\n)+)/g, block => {
    const rows = block.trim().split('\n').filter(r => !/^\|[\s\-:|]+\|$/.test(r));
    const html = rows.map((row, i) => {
      const cells = row.split('|').slice(1, -1).map(c => c.trim());
      const T = i === 0 ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${T}>${inline(c)}</${T}>`).join('') + '</tr>';
    }).join('');
    return `<div class="md-table-wrap"><table>${html}</table></div>`;
  });
  // headings
  h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm,   '<h1>$1</h1>');
  // hr
  h = h.replace(/^---+$/gm, '<hr>');
  // blockquote
  h = h.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  // unordered list
  h = h.replace(/((?:^[ \t]*[-*+] .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${inline(l.replace(/^[ \t]*[-*+] /,''))}</li>`);
    return `<ul>${items.join('')}</ul>`;
  });
  // ordered list
  h = h.replace(/((?:^\d+\. .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${inline(l.replace(/^\d+\. /,''))}</li>`);
    return `<ol>${items.join('')}</ol>`;
  });
  // paragraphs
  const blocks = h.split(/\n\n+/);
  h = blocks.map(b => {
    b = b.trim();
    if (!b) return '';
    if (/^<(h[1-6]|ul|ol|pre|div|blockquote|hr)/.test(b)) return b;
    return `<p>${inline(b.replace(/\n/g,' '))}</p>`;
  }).join('\n');
  return h;
}
function inline(t) {
  return t
    .replace(/`([^`]+)`/g,       '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,     '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ── FILTER KEYS ──────────────────────────── */
function filterKeys(p) {
  const keys = new Set();
  [...p.tags.primary, ...p.tags.full].forEach(t => {
    const lo = t.toLowerCase();
    if (lo.includes('next.js') || lo.includes('nextjs')) keys.add('nextjs');
    else if (lo.includes('vue'))        keys.add('vue');
    else if (lo.includes('node'))       keys.add('nodejs');
    else if (lo.includes('typescript')) keys.add('typescript');
    else if (lo.includes('php'))        keys.add('php');
    else if (lo.includes('javascript') || lo === 'js') keys.add('javascript');
    keys.add(lo.replace(/[^a-z0-9]/g,''));
  });
  return [...keys].join(' ');
}

/* ═══════════════════════════════════════════
   RENDER: SKILLS
═══════════════════════════════════════════ */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill-item reveal">
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" data-w="${s.pct}"></div>
      </div>
    </div>`).join('');
  grid.querySelectorAll('.reveal').forEach(el => RO.observe(el));
  grid.querySelectorAll('.skill-item').forEach(el => SO.observe(el));
}

/* ═══════════════════════════════════════════
   RENDER: FEATURED (homepage)
═══════════════════════════════════════════ */
function renderFeatured() {
  const list = document.getElementById('featuredList');
  if (!list) return;
  const featured = PROJECTS.filter(p => p.featured).slice(0, 3);

  list.innerHTML = featured.map((p, i) => `
    <article class="featured-item reveal" style="--d:${(i*.1).toFixed(2)}s">
      <div class="fi-visual">
        <!-- Desktop: full width base -->
        <div class="fi-desktop">
          <img src="image/${p.folder}/desktop.png" alt="${p.title} desktop" loading="lazy"
               onerror="this.parentElement.style.background='var(--paper-3)'">
        </div>
        <!-- Mobile: floating overlay, only if has mobile image -->
        ${p.hasMobile ? `
        <div class="fi-mobile">
          <img src="image/${p.folder}/mobile.png" alt="${p.title} mobile" loading="lazy">
        </div>` : ''}
      </div>
      <div class="fi-info">
        <div class="fi-num">0${i+1}</div>
        <h3 class="fi-title">${p.title}</h3>
        <p class="fi-subtitle">${p.subtitle}</p>
        <p class="fi-desc">${p.desc}</p>
        <div class="fi-tags">
          ${p.tags.primary.slice(0,3).map(t =>
            window.TECH_ICONS ? TECH_ICONS.badge(t,'sm') : `<span class="tag tag-primary">${t}</span>`
          ).join('')}
        </div>
        <div class="fi-status">
          <span class="badge badge-${p.status}">${p.status==='done'?'Selesai':'In Progress'}</span>
          <div class="fi-progress-wrap">
            <div class="fi-progress-track">
              <div class="fi-progress-fill" style="width:${p.progress}%"></div>
            </div>
            <span class="fi-progress-pct">${p.progress}%</span>
          </div>
        </div>
        <div class="fi-actions">
          <a href="project-detail.html?id=${p.id}" class="btn btn-primary btn-sm">${IC.info} Detail</a>
          <a href="${p.github}" target="_blank" class="btn btn-ghost btn-sm">${IC.github} Code</a>
        </div>
      </div>
    </article>`).join('');

  list.querySelectorAll('.reveal').forEach(el => RO.observe(el));
}

/* ═══════════════════════════════════════════
   RENDER: ALL PROJECTS GRID
═══════════════════════════════════════════ */
function renderAllProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card reveal" style="--d:${((i%3)*.07).toFixed(2)}s" data-filter-keys="${filterKeys(p)}">
      <div class="card-visual ${p.hasMobile ? '' : 'no-mobile'}">
        <!-- Desktop: full width base -->
        <div class="card-desktop-thumb">
          <img src="image/${p.folder}/desktop.png" alt="${p.title}" loading="lazy"
               onerror="this.parentElement.style.background='var(--paper-3)'">
        </div>
        <!-- Mobile: floating overlay bottom-right -->
        ${p.hasMobile ? `
        <div class="card-mobile-thumb">
          <img src="image/${p.folder}/mobile.png" alt="${p.title} mobile" loading="lazy">
        </div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${p.title}</h3>
          <span class="badge badge-${p.status}">${p.status==='done'?'Selesai':'In Progress'}</span>
        </div>
        <p class="card-sub">${p.subtitle}</p>
        <p class="card-desc">${p.desc}</p>
        <div class="card-tags">
          ${p.tags.primary.slice(0,3).map(t =>
            window.TECH_ICONS ? TECH_ICONS.badge(t,'sm') : `<span class="tag tag-primary">${t}</span>`
          ).join('')}
        </div>
        <div class="card-actions">
          <a href="project-detail.html?id=${p.id}" class="btn btn-primary btn-sm">${IC.info} Detail</a>
          <a href="${p.github}" target="_blank" class="btn btn-ghost btn-sm">${IC.github} Code</a>
        </div>
      </div>
    </article>`).join('');

  grid.querySelectorAll('.reveal').forEach(el => RO.observe(el));
}

/* ═══════════════════════════════════════════
   RENDER: PROJECT DETAIL
═══════════════════════════════════════════ */
function renderDetail(id) {
  const wrap    = document.getElementById('detailContent');
  const topAct  = document.getElementById('detailTopActions');
  if (!wrap) return;

  const p = PROJECTS.find(x => x.id === id);
  if (!p) {
    wrap.innerHTML = `<div class="detail-error"><p>Proyek tidak ditemukan.</p><a href="projects.html" class="btn btn-primary">← Kembali</a></div>`;
    return;
  }

  document.title = `${p.title} — AMI Portfolio`;
  if (topAct) topAct.innerHTML = `<a href="${p.github}" target="_blank" class="btn btn-primary btn-sm">${IC.github} GitHub</a>`;

  /* Visual HTML — desktop full width, mobile floating overlay */
  const visualHtml = p.hasMobile
    ? `<div class="detail-screens">
        <!-- Desktop: full width -->
        <div class="detail-desktop-wrap">
          <img src="image/${p.folder}/desktop.png" alt="${p.title} — desktop"
               onerror="this.parentElement.style.background='var(--paper-3)'">
        </div>
        <!-- Mobile: floating overlay phone -->
        <div class="detail-mobile-frame">
          <img src="image/${p.folder}/mobile.png" alt="${p.title} — mobile">
        </div>
        <p class="detail-mobile-caption">Desktop &amp; Mobile Preview</p>
      </div>`
    : `<div class="detail-screens no-mobile">
        <div class="detail-desktop-wrap">
          <img src="image/${p.folder}/desktop.png" alt="${p.title}"
               onerror="this.parentElement.style.background='var(--paper-3)'">
        </div>
        <p class="detail-mobile-caption">Desktop Preview</p>
      </div>`;

  /* Full tags HTML */
  const primaryTags = p.tags.primary.map(t => `<span class="tag tag-primary">${t}</span>`).join('');
  const restTags    = p.tags.full.filter(t => !p.tags.primary.includes(t))
                                 .map(t => `<span class="tag">${t}</span>`).join('');

  wrap.innerHTML = `
    <!-- HEADER -->
    <div class="detail-header reveal">
      <div class="detail-title-row">
        <h1 class="detail-h1">${p.title}</h1>
        <span class="badge badge-${p.status}">${p.status==='done'?'Selesai':'In Progress'}</span>
      </div>
      <p class="detail-subtitle">${p.subtitle}</p>
      <div class="detail-progress-row">
        <span class="detail-progress-label">Progress</span>
        <div class="detail-progress-track">
          <div class="detail-progress-fill" id="dpFill" data-w="${p.progress}"></div>
        </div>
        <span class="detail-progress-pct">${p.progress}%</span>
      </div>
    </div>

    <!-- VISUAL -->
    <div class="detail-visual-section reveal" style="--d:.1s">
      ${visualHtml}
    </div>

    <!-- TAGS -->
    <div class="detail-tags-section reveal" style="--d:.18s">
      <div class="detail-tags-label">${IC.tag} Tech Stack &amp; Tools</div>
      <div class="detail-tags-list">
        ${primaryTags}${restTags}
      </div>
    </div>

    <!-- README -->
    <div class="readme-section reveal" style="--d:.24s">
      <div class="readme-label">${IC.doc} Dokumentasi</div>
      <div class="readme-content">${md(p.readme)}</div>
    </div>

    <!-- CTA -->
    <div class="detail-cta reveal" style="--d:.32s">
      <a href="${p.github}" target="_blank" class="btn btn-primary">${IC.github} Lihat di GitHub</a>
      <a href="projects.html" class="btn btn-outline">← Semua Proyek</a>
    </div>`;

  wrap.querySelectorAll('.reveal').forEach(el => RO.observe(el));

  /* Animate progress fill */
  setTimeout(() => {
    const f = document.getElementById('dpFill');
    if (f) f.style.width = f.dataset.w + '%';
  }, 600);
}

/* ═══════════════════════════════════════════
   OBSERVERS
═══════════════════════════════════════════ */
/* Reveal observer */
const RO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); RO.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

/* Skill bar observer */
const SO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const f = e.target.querySelector('.skill-fill');
      if (f) setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 150);
      SO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

/* ═══════════════════════════════════════════
   CURSOR GAME — particle trail + magnet + repel
═══════════════════════════════════════════ */
function initCursorGame() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot    = document.getElementById('cursor-dot');
  const ring   = document.getElementById('cursor-ring');
  let canvas   = document.getElementById('cursor-trail-canvas');

  /* Create canvas if not in HTML */
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9990;';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let mx = -300, my = -300;          // mouse pos
  let rx = -300, ry = -300;          // ring pos (lagged)
  let mode = 'normal';               // 'normal' | 'hover' | 'click'
  const particles = [];

  /* Mouse tracking */
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    // Spawn particle on move
    spawnParticle(mx, my);
  });
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  /* Click burst */
  document.addEventListener('click', () => {
    for (let i = 0; i < 8; i++) spawnParticle(mx, my, true);
  });

  /* Hover states */
  const interactSel = 'a, button, .btn, .filter-btn, .project-card, .featured-item, .skill-item, .nav-link';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactSel)) {
      mode = 'hover';
      dot.style.width        = '22px';
      dot.style.height       = '22px';
      dot.style.background   = 'transparent';
      dot.style.border       = '2px solid var(--ink)';
      dot.style.borderRadius = '50%';
      ring.style.width       = '56px';
      ring.style.height      = '56px';
      ring.style.borderColor = 'rgba(37,99,235,.35)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactSel)) {
      mode = 'normal';
      dot.style.width        = '8px';
      dot.style.height       = '8px';
      dot.style.background   = 'var(--ink)';
      dot.style.border       = 'none';
      ring.style.width       = '40px';
      ring.style.height      = '40px';
      ring.style.borderColor = 'rgba(14,14,13,.2)';
    }
  });

  /* Particle class */
  class Particle {
    constructor(x, y, burst = false) {
      this.x  = x + (Math.random() - .5) * (burst ? 24 : 4);
      this.y  = y + (Math.random() - .5) * (burst ? 24 : 4);
      this.vx = (Math.random() - .5) * (burst ? 4 : 1.2);
      this.vy = (Math.random() - .5) * (burst ? 4 : 1.2) - (burst ? 1 : .4);
      this.life = 1;
      this.decay = burst ? .04 + Math.random() * .04 : .055 + Math.random() * .03;
      this.r    = burst ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2;
      this.color = burst ? `hsl(${220 + Math.random()*40},80%,60%)` : `rgba(14,14,13,`;
      this.isBurst = burst;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += .05;     // gravity
      this.vx *= .96;
      this.life -= this.decay;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life) * .6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.isBurst ? this.color : `rgba(14,14,13,${this.life*.4})`;
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnParticle(x, y, burst = false) {
    if (particles.length < 120) particles.push(new Particle(x, y, burst));
  }

  /* Magnetic attraction: nav links pull ring */
  function getMagneticOffset(el) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    const dx = cx - mx; const dy = cy - my;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 80) {
      const strength = (80 - dist) / 80;
      return { ox: dx * strength * .4, oy: dy * strength * .4 };
    }
    return { ox: 0, oy: 0 };
  }

  /* Repel: cards push ring away */
  function getRepelOffset() {
    const cards = document.querySelectorAll('.project-card, .featured-item');
    let totalX = 0, totalY = 0;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width/2, cy = r.top + r.height/2;
      const dx = mx - cx, dy = my - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 140 && dist > 0) {
        const push = (140 - dist) / 140;
        totalX += (dx / dist) * push * 18;
        totalY += (dy / dist) * push * 18;
      }
    });
    return { ox: totalX, oy: totalY };
  }

  /* Main animation loop */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Update + draw particles */
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    /* Ring smooth follow with magnetic / repel effect */
    let targetX = mx, targetY = my;

    /* Magnetic pull from nav links */
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(el => {
      const { ox, oy } = getMagneticOffset(el);
      targetX += ox; targetY += oy;
    });

    /* Repel from cards */
    const { ox: repX, oy: repY } = getRepelOffset();
    targetX += repX; targetY += repY;

    rx += (targetX - rx) * .12;
    ry += (targetY - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(animate);
  }
  animate();

  /* Cursor hint removed as requested by user */
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL — count up stats
═══════════════════════════════════════════ */
function initCountUp() {
  const nums = document.querySelectorAll('.stat-num');
  const C = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw);
      if (isNaN(num)) return;
      const suffix = raw.replace(String(num), '');
      let cur = 0;
      const dur = 1200;
      const step = dur / 60;
      const inc  = num / (dur / step);
      const timer = setInterval(() => {
        cur = Math.min(cur + inc, num);
        el.textContent = Math.round(cur) + suffix;
        if (cur >= num) clearInterval(timer);
      }, step);
      C.unobserve(el);
    });
  }, { threshold: .8 });
  nums.forEach(n => C.observe(n));
}

/* ═══════════════════════════════════════════
   HERO PARALLAX
═══════════════════════════════════════════ */
function initParallax() {
  const h1 = document.querySelector('.hero-h1');
  const desc = document.querySelector('.hero-desc');
  if (!h1) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      h1.style.transform   = `translateY(${y * .11}px)`;
      h1.style.opacity     = `${Math.max(0, 1 - y/window.innerHeight * 1.5)}`;
      if (desc) desc.style.transform = `translateY(${y * .06}px)`;
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════
   NAV
═══════════════════════════════════════════ */
function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
    updateActiveNav();
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links?.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      links.classList.remove('open');
      toggle?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', e => {
    if (links?.classList.contains('open') && !links.contains(e.target) && !toggle?.contains(e.target)) {
      links.classList.remove('open');
      toggle?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  if (window.scrollY > 24) nav.classList.add('scrolled');
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const offset   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - offset - 80) cur = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    const h = l.getAttribute('href') || '';
    l.classList.toggle('active', h === `#${cur}` || h === `index.html#${cur}`);
  });
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
      window.scrollTo({ top: t.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════
   FILTER (projects page)
═══════════════════════════════════════════ */
function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card[data-filter-keys]').forEach(card => {
        const show = f === 'all' || (card.dataset.filterKeys || '').includes(f);
        card.classList.toggle('hidden', !show);
        if (show) {
          card.classList.remove('visible');
          requestAnimationFrame(() => setTimeout(() => card.classList.add('visible'), 40));
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Mengirim...'; btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '✓ Pesan Terkirim!';
      btn.style.background = 'var(--green)';
      form.reset();
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3500);
    }, 1400);
  });
}

/* ═══════════════════════════════════════════
   BOOT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  /* Observe all static .reveal elements */
  document.querySelectorAll('.reveal').forEach(el => RO.observe(el));

  /* All pages */
  initNav();
  initSmoothScroll();
  initContactForm();
  initCursorGame();

  /* Homepage */
  if (!path.includes('projects.html') && !path.includes('project-detail.html')) {
    renderSkills();
    renderFeatured();
    initParallax();
    initCountUp();
  }

  /* Projects page */
  if (path.includes('projects.html')) {
    document.getElementById('nav')?.classList.add('scrolled');
    renderAllProjects();
    initFilter();
    initCountUp();
  }

  /* Detail page */
  if (path.includes('project-detail.html')) {
    document.getElementById('nav')?.classList.add('scrolled');
    const id = new URLSearchParams(window.location.search).get('id');
    renderDetail(id);
  }

  /* Trigger already-visible reveals */
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40) {
        const d = parseFloat(el.style.getPropertyValue('--d') || '0') * 1000;
        setTimeout(() => el.classList.add('visible'), d + 60);
      }
    });
  }, 120);

  /* Fire event so physics.js can init after dynamic content is rendered */
  setTimeout(() => window.dispatchEvent(new Event('portfolioRendered')), 300);
});
