/* ═══════════════════════════════════════════════════════════
   music.js — backsound santai ala game farming (komposisi orisinal)
   Dibuat langsung dengan Web Audio: tanpa file audio, tanpa hak cipta.
   • melodi "pluck" + bel kecil, bass lembut, pad hangat, gema pendek
   • mulai setelah sentuhan/klik pertama (aturan browser), fade-in halus
   • tombol 🎵 di samping tombol suara; pilihan disimpan
   • berhenti sendiri saat tab disembunyikan
   API: window.Music.toggle() / .setOn(bool) / .isOn()
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.Music) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  const noop = () => {};
  if (!AC) { window.Music = { toggle: noop, setOn: noop, isOn: () => false }; return; }

  const KEY = 'portfolio-music';
  let on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (_) {}
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ctx = null, out = null, timer = 0, started = false, step = 0, nextT = 0, pass = 0;
  const BPM = 84, EIGHTH = 60 / BPM / 2;
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  /* 8 birama · 8 not per birama (0 = jeda) */
  const CHORDS = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62], [60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
  const BASS = [48, 45, 41, 43, 48, 45, 41, 43];
  const MEL = [
    [72, 0, 67, 0, 64, 67, 72, 0],
    [69, 0, 72, 0, 76, 72, 69, 0],
    [72, 0, 69, 0, 65, 69, 72, 0],
    [74, 0, 71, 0, 67, 71, 74, 0],
    [76, 0, 74, 72, 74, 0, 67, 0],
    [72, 0, 69, 72, 76, 0, 72, 0],
    [69, 72, 77, 0, 76, 72, 69, 0],
    [71, 74, 0, 71, 67, 0, 62, 0],
  ];

  function init() {
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
    const echo = ctx.createDelay(1); echo.delayTime.value = EIGHTH * 1.5;
    const fb = ctx.createGain(); fb.gain.value = 0.28;
    const wet = ctx.createGain(); wet.gain.value = 0.32;
    out.connect(lp); lp.connect(ctx.destination);
    out.connect(echo); echo.connect(fb); fb.connect(echo); echo.connect(wet); wet.connect(lp);
  }

  function env(osc, t, dur, vol, attack) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + (attack || 0.006));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(out);
    osc.start(t); osc.stop(t + dur + 0.05);
  }
  function pluck(m, t, vol) {
    const f = mtof(m);
    const a = ctx.createOscillator(); a.type = 'triangle'; a.frequency.value = f; env(a, t, 0.7, vol);
    const b = ctx.createOscillator(); b.type = 'sine'; b.frequency.value = f * 2; env(b, t, 0.35, vol * 0.28);
  }
  function bass(m, t, vol) {
    const a = ctx.createOscillator(); a.type = 'sine'; a.frequency.value = mtof(m); env(a, t, EIGHTH * 3.6, vol, 0.012);
  }
  function pad(notes, t, dur, vol) {
    notes.forEach((m, i) => {
      const a = ctx.createOscillator(); a.type = 'triangle'; a.frequency.value = mtof(m - 12); a.detune.value = (i - 1) * 6;
      env(a, t, dur, vol, dur * 0.35);
    });
  }
  function tick(t, vol) {
    const a = ctx.createOscillator(); a.type = 'sine'; a.frequency.setValueAtTime(900, t); a.frequency.exponentialRampToValueAtTime(500, t + 0.04);
    env(a, t, 0.06, vol, 0.002);
  }

  function schedule() {
    if (!ctx || ctx.state !== 'running') { nextT = ctx ? ctx.currentTime + 0.1 : 0; return; }
    if (nextT < ctx.currentTime) nextT = ctx.currentTime + 0.05;
    while (nextT < ctx.currentTime + 0.45) {
      const bar = Math.floor(step / 8) % 8, slot = step % 8, t = nextT;
      if (slot === 0) pad(CHORDS[bar], t, EIGHTH * 8.4, 0.05);
      if (slot === 0 || slot === 4) bass(BASS[bar], t, slot === 0 ? 0.16 : 0.1);
      if (slot === 2 || slot === 6) tick(t, 0.025);
      const m = MEL[bar][slot];
      if (m) pluck(m + (pass % 2 && slot === 0 ? 0 : 0), t, 0.11);
      else if (pass % 2 && Math.random() < 0.4) pluck(CHORDS[bar][(Math.random() * 3) | 0] + 12, t, 0.055);
      step++; if (step % 64 === 0) pass++;
      nextT += EIGHTH;
    }
  }

  function start() {
    if (!on || started) return;
    if (!ctx) init();
    ctx.resume().then(() => {
      if (!on) return;
      started = true;
      nextT = ctx.currentTime + 0.2;
      clearInterval(timer); timer = setInterval(schedule, 120);
      out.gain.cancelScheduledValues(ctx.currentTime);
      out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), ctx.currentTime);
      out.gain.exponentialRampToValueAtTime(0.55, ctx.currentTime + 2.5);
    }).catch(noop);
  }
  function stop() {
    if (!ctx || !started) return;
    started = false;
    out.gain.cancelScheduledValues(ctx.currentTime);
    out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), ctx.currentTime);
    out.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    setTimeout(() => { if (!started) { clearInterval(timer); timer = 0; } }, 600);
  }

  /* tombol */
  const ICON_ON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="17" cy="16" r="3" fill="currentColor"/></svg>';
  const ICON_OFF = ICON_ON.replace('</svg>', '<path d="M3 3l18 18"/></svg>');
  const css = document.createElement('style');
  css.textContent = `.music-toggle{position:fixed;right:20px;bottom:78px;z-index:9500;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;
    background:var(--sky,#A7D8FF);color:var(--ink,#1B1A2E);border:2.5px solid var(--ink,#1B1A2E);box-shadow:3px 3px 0 var(--ink,#1B1A2E);
    transition:transform .15s cubic-bezier(.16,1,.3,1),box-shadow .15s,background .2s;-webkit-tap-highlight-color:transparent}
  .music-toggle:hover{transform:translate(-1px,-2px) rotate(6deg);box-shadow:5px 5px 0 var(--ink,#1B1A2E)}
  .music-toggle:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink,#1B1A2E)}
  .music-toggle:focus-visible{outline:3px solid var(--purple,#8B6CFF);outline-offset:3px}
  .music-toggle[aria-pressed="false"]{background:var(--paper-3,#F3E9D6);color:var(--ink-3,#66647F)}
  @media (max-width:860px){.music-toggle{right:120px;bottom:auto;top:23px;width:40px;height:40px;box-shadow:2px 2px 0 var(--ink,#1B1A2E)}.music-toggle svg{width:17px;height:17px}}`;
  document.head.appendChild(css);
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'music-toggle'; btn.id = 'musicToggle';
  function paint() {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Matikan musik latar' : 'Nyalakan musik latar');
    btn.title = on ? 'Musik: nyala' : 'Musik: mati';
    btn.innerHTML = on ? ICON_ON : ICON_OFF;
  }
  function setOn(v) {
    on = !!v;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (_) {}
    paint();
    on ? start() : stop();
  }
  btn.addEventListener('click', () => { setOn(!on); try { window.SFX && window.SFX.play(on ? 'on' : 'off'); } catch (_) {} });
  paint();
  document.body.appendChild(btn);

  /* mulai setelah gestur pertama */
  const first = () => { ['pointerdown', 'keydown', 'touchend'].forEach(e => window.removeEventListener(e, first, true)); start(); };
  ['pointerdown', 'keydown', 'touchend'].forEach(e => window.addEventListener(e, first, true));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (started) { stop(); started = false; window.__musicWasOn = true; } }
    else if (on && window.__musicWasOn) { window.__musicWasOn = false; start(); }
  });
  window.Music = { toggle: () => setOn(!on), setOn, isOn: () => on, start };
})();
