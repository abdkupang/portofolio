/* ═══════════════════════════════════════════════════════════
   gate.js — layar "Ketuk untuk masuk"
   Browser WAJIB menunggu satu sentuhan/klik sebelum boleh
   mengeluarkan suara. Layar ini memakai sentuhan itu untuk
   langsung memicu: whoosh pembuka, musik latar, dan semua efek
   suara (termasuk saat scroll). Tidak muncul kalau browser
   sudah mengizinkan suara, atau sudah pernah dilewati di sesi ini.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const root = document.documentElement;
  let resolve = () => {};
  window.GateReady = new Promise(r => { resolve = r; });

  let seen = false;
  try { seen = sessionStorage.getItem('gate-done') === '1'; } catch (_) {}
  if (seen || /bot|crawl|spider|lighthouse|pagespeed|facebookexternalhit|slurp/i.test(navigator.userAgent)) return resolve();

  const css = document.createElement('style');
  css.textContent = `
  html.gated{overflow:hidden}
  html.gated body > :not(.gate), html.gated body > :not(.gate) *{animation-play-state:paused !important}
  .gate{position:fixed;inset:0;z-index:99990;display:grid;place-items:center;padding:20px;background:var(--cream,#FFF8EC);
    background-image:radial-gradient(rgba(27,26,46,.16) 2px,transparent 2.5px);background-size:28px 28px;
    transition:opacity .45s ease,transform .45s cubic-bezier(.16,1,.3,1)}
  .gate.out{opacity:0;transform:scale(1.07);pointer-events:none}
  .gate-card{width:min(380px,100%);text-align:center;padding:30px 24px 24px;background:var(--paper,#fff);border:2.5px solid var(--ink,#1B1A2E);
    border-radius:28px;box-shadow:7px 7px 0 var(--ink,#1B1A2E);animation:gateIn .6s cubic-bezier(.34,1.4,.5,1) both}
  @keyframes gateIn{from{transform:translateY(30px) scale(.92);opacity:0}}
  .gate-logo{display:block;margin:0 auto;width:84px;height:auto;animation:gateBob 1.6s ease-in-out infinite}
  @keyframes gateBob{50%{transform:translateY(-8px) rotate(-4deg)}}
  .gate-name{margin:14px 0 6px;font:400 32px/1.05 var(--font-display,'Bagel Fat One',sans-serif);color:var(--ink,#1B1A2E)}
  .gate-sub{margin:0 0 20px;font:600 15px/1.5 var(--font-body,'Plus Jakarta Sans',sans-serif);color:var(--ink-2,#3A3857)}
  .gate-go{display:inline-flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px 20px;border-radius:999px;cursor:pointer;
    background:var(--coral,#FF6B5B);color:#fff;border:2.5px solid var(--ink,#1B1A2E);box-shadow:4px 4px 0 var(--ink,#1B1A2E);
    font:800 17px var(--font-body,'Plus Jakarta Sans',sans-serif);transition:transform .15s,box-shadow .15s;-webkit-tap-highlight-color:transparent}
  .gate-go:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink,#1B1A2E)}
  .gate-go svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
  .gate-go::after{content:'';position:absolute}
  .gate-mute{display:block;margin:14px auto 0;padding:6px 10px;background:none;border:0;cursor:pointer;color:var(--ink-3,#66647F);
    font:700 13px var(--font-body,'Plus Jakarta Sans',sans-serif);text-decoration:underline;text-underline-offset:3px}
  @media (prefers-reduced-motion:reduce){.gate-card,.gate-logo{animation:none}}`;
  document.head.appendChild(css);

  const gate = document.createElement('div');
  gate.className = 'gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-label', 'Masuk ke portofolio');
  gate.innerHTML = `<div class="gate-card">
    <img class="gate-logo" src="logo.svg" alt="" width="84" height="90">
    <p class="gate-name">Abdillah Mukhair</p>
    <p class="gate-sub">Portofolio interaktif lengkap dengan musik, efek suara, dan maskot kecil bernama Ami.</p>
    <button type="button" class="gate-go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>Ketuk untuk masuk</button>
    <button type="button" class="gate-mute">Masuk tanpa suara</button></div>`;
  root.classList.add('gated');
  document.body.appendChild(gate);
  const go = gate.querySelector('.gate-go');
  try { go.focus({ preventScroll: true }); } catch (_) {}

  let closed = false;
  function close(withSound) {
    if (closed) return;
    closed = true;
    try { sessionStorage.setItem('gate-done', '1'); } catch (_) {}
    if (withSound) {
      try { window.SFX && window.SFX.setEnabled(true); } catch (_) {}
      try { window.Music && window.Music.setOn(true); } catch (_) {}
      try { window.SFX && window.SFX.wake && window.SFX.wake(); } catch (_) {}   // buka audio + whoosh pembuka
      try { window.Music && window.Music.start(); } catch (_) {}
    } else {
      try { window.SFX && window.SFX.setEnabled(false); } catch (_) {}
      try { window.Music && window.Music.setOn(false); } catch (_) {}
    }
    gate.classList.add('out');
    root.classList.remove('gated');
    window.dispatchEvent(new Event('gate-open'));
    setTimeout(() => { gate.remove(); resolve(); }, 480);
  }
  go.addEventListener('click', () => close(true));
  gate.querySelector('.gate-mute').addEventListener('click', () => close(false));

  // browser yang mengizinkan autoplay → tidak perlu layar ini
  setTimeout(() => {
    if (closed) return;
    const ok = window.SFX && window.SFX.running && window.SFX.running();
    if (ok) { closed = true; try { sessionStorage.setItem('gate-done', '1'); } catch (_) {} gate.remove(); root.classList.remove('gated'); window.dispatchEvent(new Event('gate-open')); resolve(); }
  }, 450);
})();
