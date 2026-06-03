/* ─────────────────────────────────────────────────
   detail.js — Project Detail Page Script
   Standalone, no dependency on script.js
───────────────────────────────────────────────── */
'use strict';

/* ── ICONS ── */
const IC = {
  github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
  tag:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  doc:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  mon:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  phone:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  back:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
};

/* ── MARKDOWN PARSER ── */
function parseMd(text) {
  if (!text) return '';
  let h = text;

  // strip shields/images
  h = h.replace(/\[!\[.*?\]\(https?:\/\/img\.shields\.io[^)]*\)\]\([^)]*\)/g, '');
  h = h.replace(/!\[.*?\]\([^)]*\)/g, '');

  // fenced code blocks
  h = h.replace(/```[\w]*\n([\s\S]*?)```/g, (_, c) =>
    `<pre><code>${c.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`
  );

  // tables
  h = h.replace(/((?:\|[^\n]+\|\n)+)/g, block => {
    const rows = block.trim().split('\n').filter(r => !/^\|[\s\-:|]+\|$/.test(r));
    const trs = rows.map((row, i) => {
      const cells = row.split('|').slice(1,-1).map(c => c.trim());
      const T = i === 0 ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${T}>${inl(c)}</${T}>`).join('') + '</tr>';
    }).join('');
    return `<div class="md-table"><table>${trs}</table></div>`;
  });

  // headings
  h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm,   '<h1>$1</h1>');

  // hr
  h = h.replace(/^---+$/gm, '<hr>');

  // blockquote
  h = h.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // unordered list
  h = h.replace(/((?:^[ \t]*[-*+] .+\n?)+)/gm, block => {
    const items = block.trim().split('\n')
      .map(l => `<li>${inl(l.replace(/^[ \t]*[-*+] /,''))}</li>`);
    return `<ul>${items.join('')}</ul>`;
  });

  // ordered list
  h = h.replace(/((?:^\d+\. .+\n?)+)/gm, block => {
    const items = block.trim().split('\n')
      .map(l => `<li>${inl(l.replace(/^\d+\. /,''))}</li>`);
    return `<ol>${items.join('')}</ol>`;
  });

  // paragraphs
  h = h.split(/\n\n+/).map(b => {
    b = b.trim();
    if (!b) return '';
    if (/^<(h[1-6]|ul|ol|pre|div|blockquote|hr)/.test(b)) return b;
    return `<p>${inl(b.replace(/\n/g,' '))}</p>`;
  }).join('\n');

  return h;
}

function inl(t) {
  return t
    .replace(/`([^`]+)`/g,       '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,     '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
             '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/* ── RENDER DETAIL ── */
function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const el     = document.getElementById('detail');
  const topAct = document.getElementById('topActions');

  // Resolve PROJECTS from window or direct const (both work)
  const projectsList = (typeof PROJECTS !== 'undefined' ? PROJECTS : null)
                    || window.PROJECTS
                    || null;
  if (!projectsList) {
    el.className = 'd-error';
    el.innerHTML = `<h2>Data tidak tersedia</h2><p>Pastikan file data.js sudah dimuat.</p><br>
      <a href="projects.html" class="btn btn-dark">${IC.back} Kembali</a>`;
    return;
  }

  // Error: no ID
  if (!id) {
    el.className = 'd-error';
    el.innerHTML = `<h2>Proyek tidak ditemukan</h2><p>URL tidak memiliki parameter ID.</p><br>
      <a href="projects.html" class="btn btn-dark">${IC.back} Kembali</a>`;
    return;
  }

  const p = projectsList.find(x => x.id === id);

  // Error: ID not in data
  if (!p) {
    el.className = 'd-error';
    el.innerHTML = `<h2>Proyek tidak ditemukan</h2>
      <p>Proyek dengan ID <code>${id}</code> tidak ada.</p><br>
      <a href="projects.html" class="btn btn-dark">${IC.back} Kembali</a>`;
    return;
  }

  // Set page title
  document.title = `${p.title} — AMI Portfolio`;

  // Top action button (GitHub)
  if (topAct) {
    topAct.innerHTML = `
      <a href="${p.github}" target="_blank" rel="noopener"
         class="btn btn-dark btn-sm">
        ${IC.github} GitHub
      </a>`;
  }

  // Tags HTML
  const TI = window.TECH_ICONS;
  const primaryTagsHtml = p.tags.primary
    .map(t => TI ? TI.badge(t, 'md') : `<span class="tag tag-p">${t}</span>`)
    .join('');
  const restTagsHtml = p.tags.full
    .filter(t => !p.tags.primary.includes(t))
    .map(t => TI ? TI.badge(t, 'md') : `<span class="tag">${t}</span>`)
    .join('');

  // Caption text
  const captionText = p.hasMobile
    ? `${IC.mon} Desktop &nbsp;+&nbsp; ${IC.phone} Mobile Preview`
    : `${IC.mon} Desktop Preview`;

  // Build full HTML string — each block separate, no nesting issues
  el.className = '';
  el.innerHTML = `

    <!-- ════════ HEADER ════════ -->
    <div class="d-header rev" style="--d:0s">
      <div class="d-title-row">
        <h1 class="d-title">${p.title}</h1>
        <span class="badge badge-${p.status}">
          ${p.status === 'done' ? 'Selesai' : 'In Progress'}
        </span>
      </div>
      <p class="d-subtitle">${p.subtitle}</p>
      <div class="d-progress">
        <span class="d-progress-label">Progress</span>
        <div class="d-progress-track">
          <div class="d-progress-fill" id="dpFill" data-w="${p.progress}"></div>
        </div>
        <span class="d-progress-pct">${p.progress}%</span>
      </div>
    </div>

    <!-- ════════ VISUAL ════════
         .d-visual = position:relative context
         .d-desktop = full-width screenshot
         .d-mobile  = absolute overlay phone (only if hasMobile)
         .d-visual-caption = below visual in flow
    ═══════════════════════════ -->
    <div class="rev" style="--d:.08s">
      <div class="d-visual ${p.hasMobile ? 'has-mobile' : ''}">

        <!-- Desktop: full width, rounded, no overflow on parent -->
        <div class="d-desktop">
          <img
            src="image/${p.folder}/desktop.png"
            alt="${p.title} — tampilan desktop"
            loading="lazy"
            onerror="this.parentElement.style.background='#e8e7e2';this.style.display='none'">
        </div>

        ${p.hasMobile ? `
        <!-- Mobile phone: absolute overlay, bottom-right corner -->
        <div class="d-mobile">
          <img
            src="image/${p.folder}/mobile.png"
            alt="${p.title} — tampilan mobile"
            loading="lazy"
            onerror="this.parentElement.style.display='none'">
        </div>` : ''}

      </div>
      <!-- Caption lives OUTSIDE .d-visual so it's never clipped -->
      <p class="d-visual-caption">${captionText}</p>
    </div>

    <!-- ════════ TECH STACK & TAGS ════════ -->
    <div class="d-tags rev" style="--d:.15s">
      <div class="d-tags-label">${IC.tag} Tech Stack &amp; Tools</div>
      <div class="d-tags-list">${primaryTagsHtml}${restTagsHtml}</div>
    </div>

    <!-- ════════ README / DOCS ════════ -->
    <div class="d-readme rev" style="--d:.22s">
      <div class="d-readme-label">${IC.doc} Dokumentasi</div>
      <div class="d-readme-content">${parseMd(p.readme)}</div>
    </div>

    <!-- ════════ CTA ════════ -->
    <div class="d-cta rev" style="--d:.29s">
      <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-dark">
        ${IC.github} Lihat di GitHub
      </a>
      <a href="projects.html" class="btn btn-border">
        ${IC.back} Semua Proyek
      </a>
    </div>

  `;

  // Fire physics reinit event
  setTimeout(() => window.dispatchEvent(new Event('portfolioRendered')), 400);

  // Trigger reveal animations
  requestAnimationFrame(() => {
    // Static back-row
    document.querySelectorAll('.page > .rev').forEach(el => {
      setTimeout(() => el.classList.add('in'), 60);
    });
    // Dynamic content inside #detail
    document.querySelectorAll('#detail .rev').forEach(el => {
      const d = parseFloat(el.style.getPropertyValue('--d') || '0') * 1000;
      setTimeout(() => el.classList.add('in'), d + 80);
    });
  });

  // Animate progress bar after short delay
  setTimeout(() => {
    const fill = document.getElementById('dpFill');
    if (fill) fill.style.width = fill.dataset.w + '%';
  }, 700);
}

/* ── NAV ── */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (links.classList.contains('open')
        && !links.contains(e.target)
        && !toggle.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── CURSOR GAME ── */
function initCursor() {
  if (!window.matchMedia('(pointer:fine)').matches) return;

  const dot  = document.getElementById('cd');
  const ring = document.getElementById('cr');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  const pts = [];

  // Mouse tracking
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    // spawn trail particle
    if (pts.length < 80) {
      pts.push({ x: mx, y: my, life: 1, r: 1.5 + Math.random() * 2 });
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  // Click burst
  document.addEventListener('click', () => {
    for (let i = 0; i < 8; i++) {
      pts.push({
        x: mx + (Math.random() - .5) * 20,
        y: my + (Math.random() - .5) * 20,
        vx: (Math.random() - .5) * 5,
        vy: (Math.random() - .5) * 5 - 1.5,
        life: 1, r: 2 + Math.random() * 3, burst: true,
      });
    }
  });

  // Hover states
  const sel = 'a, button, .btn, .tag, .d-mobile, .d-desktop, .skill-item';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(sel)) {
      dot.style.width      = '20px';
      dot.style.height     = '20px';
      dot.style.background = 'transparent';
      dot.style.border     = '2px solid var(--ink)';
      ring.style.width     = '52px';
      ring.style.height    = '52px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(sel)) {
      dot.style.width      = '8px';
      dot.style.height     = '8px';
      dot.style.background = 'var(--ink)';
      dot.style.border     = 'none';
      ring.style.width     = '38px';
      ring.style.height    = '38px';
    }
  });

  // Particle canvas
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9990;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  // Animation loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      p.life -= p.burst ? .042 : .058;
      if (p.burst) {
        p.x  += p.vx || 0;
        p.y  += p.vy || 0;
        p.vy  = (p.vy || 0) + .08;
        p.vx *= .95;
      }
      if (p.life <= 0) { pts.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life) * .55;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.burst
        ? `hsl(${215 + Math.random() * 50}, 75%, 60%)`
        : 'rgba(14,14,13,.7)';
      ctx.fill();
      ctx.restore();
    }

    // Ring follows mouse with smooth lag
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(loop);
  }
  loop();
}

/* ── BOOT ── */
// Scripts are loaded at end of <body>, DOM is already ready.
// Use requestAnimationFrame to ensure all synchronous script execution
// (including data.js) has completed before we read PROJECTS.
function boot() {
  initNav();
  initCursor();
  renderDetail();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  // DOM already loaded (scripts deferred or at bottom of body)
  boot();
}
