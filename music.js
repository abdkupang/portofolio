/* ═══════════════════════════════════════════════════════════
   music.js — musik latar santai ala game pertanian (komposisi asli)
   • Dibuat langsung lewat Web Audio (tanpa file audio):
     gitar petik arpeggio, seruling bervibrato, pad senar lembut,
     bass hangat, shaker tipis, bel kecil, dan gema ruangan.
   • G mayor, 86 BPM, 16 birama yang berulang (A: tenang, B: lebih cerah).
   • Otomatis menyala begitu browser mengizinkan: langsung kalau
     boleh autoplay, kalau tidak → pada sentuhan/klik/tombol pertama
     di mana pun (tidak perlu menekan tombol musik).
   • Tombol musik di navbar; pilihan disimpan di localStorage.
   • API: Music.toggle() · setOn(bool) · isOn() · start()
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.Music) return;
  const noop = () => {};
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { window.Music = { toggle: noop, setOn: noop, isOn: () => false, start: noop }; return; }

  const KEY = 'portofolio-music-v2';
  let on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (_) {}

  const BPM = 86, E = 60 / BPM / 2;                       // E = satu not seperdelapan
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ── Harmoni: bass (b), nada arpeggio (a), nada pad (p) ── */
  const CH = {
    G:  { b: 43, a: [55, 59, 62, 67, 71], p: [55, 59, 62] },
    Em: { b: 40, a: [52, 55, 59, 64, 67], p: [55, 59, 64] },
    C:  { b: 48, a: [55, 60, 64, 67, 72], p: [55, 60, 64] },
    D:  { b: 50, a: [57, 62, 66, 69, 74], p: [57, 62, 66] },
    Am: { b: 45, a: [57, 60, 64, 69, 72], p: [57, 60, 64] },
    GB: { b: 47, a: [55, 59, 62, 67, 71], p: [55, 59, 62] },
  };
  const PROG = ['G', 'Em', 'C', 'D', 'G', 'Em', 'Am', 'D', 'C', 'GB', 'Am', 'G', 'C', 'D', 'Em', 'D'];
  const ARP = [0, 2, 3, 2, 4, 3, 2, 1];
  /* melodi seruling: [slot, midi, panjang (dalam seperdelapan)] */
  const MEL = [
    [[0, 71, 2], [2, 74, 2], [4, 79, 4]],
    [[0, 76, 2], [2, 74, 1], [3, 71, 1], [4, 76, 4]],
    [[0, 72, 2], [2, 76, 2], [4, 74, 2], [6, 72, 2]],
    [[0, 74, 3], [3, 71, 1], [4, 69, 4]],
    [[0, 71, 2], [2, 74, 2], [4, 79, 2], [6, 78, 2]],
    [[0, 76, 3], [3, 74, 1], [4, 71, 2], [6, 67, 2]],
    [[0, 69, 2], [2, 72, 2], [4, 76, 2], [6, 74, 2]],
    [[0, 74, 2], [2, 72, 1], [3, 71, 1], [4, 69, 4]],
    [[0, 76, 2], [2, 79, 2], [4, 76, 2], [6, 72, 2]],
    [[0, 74, 2], [2, 71, 2], [4, 74, 4]],
    [[0, 72, 2], [2, 76, 2], [4, 81, 3], [7, 79, 1]],
    [[0, 79, 4], [4, 74, 2], [6, 71, 2]],
    [[0, 72, 2], [2, 76, 2], [4, 79, 2], [6, 76, 2]],
    [[0, 78, 2], [2, 74, 2], [4, 78, 2], [6, 81, 2]],
    [[0, 79, 2], [2, 76, 2], [4, 71, 2], [6, 76, 2]],
    [[0, 74, 4], [4, 69, 2], [6, 74, 2]],
  ];

  /* ── Mesin suara: bisa dipakai AudioContext biasa maupun Offline ── */
  function impulse(c, sec, decay) {
    const len = Math.floor(c.sampleRate * sec), buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  function engine(c, dest) {
    const bus = c.createGain();
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7200; lp.Q.value = .4;
    bus.connect(lp);
    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 20; comp.ratio.value = 3; comp.attack.value = .01; comp.release.value = .25;
    const conv = c.createConvolver(); conv.buffer = impulse(c, 2.8, 2.4);
    const wlp = c.createBiquadFilter(); wlp.type = 'lowpass'; wlp.frequency.value = 3000;
    const wet = c.createGain(); wet.gain.value = .34;
    lp.connect(comp); lp.connect(wlp); wlp.connect(conv); conv.connect(wet); wet.connect(comp);
    comp.connect(dest);

    const nlen = c.sampleRate, nbuf = c.createBuffer(1, nlen, c.sampleRate), nd = nbuf.getChannelData(0);
    for (let i = 0; i < nlen; i++) nd[i] = Math.random() * 2 - 1;

    const env = (g, t, peak, a, hold, rel) => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + a);
      g.gain.setValueAtTime(peak, t + a + hold);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + rel);
    };

    /* gitar petik */
    function pluck(freq, t, vol, dur) {
      dur = dur || 1.15;
      const o1 = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
      o1.type = 'triangle'; o2.type = 'sawtooth';
      o1.frequency.value = freq; o2.frequency.value = freq; o2.detune.value = 5; g2.gain.value = .3;
      f.type = 'lowpass'; f.Q.value = .8;
      f.frequency.setValueAtTime(Math.min(5200, freq * 7), t);
      f.frequency.exponentialRampToValueAtTime(Math.max(500, freq * 1.5), t + .55);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + .006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o1.connect(f); o2.connect(g2); g2.connect(f); f.connect(g); g.connect(bus);
      o1.start(t); o2.start(t); o1.stop(t + dur + .05); o2.stop(t + dur + .05);
    }
    /* seruling */
    function flute(freq, t, len, vol) {
      const o = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain(), g = c.createGain();
      const lfo = c.createOscillator(), lg = c.createGain();
      o.type = 'sine'; o2.type = 'sine'; o.frequency.value = freq; o2.frequency.value = freq * 2; g2.gain.value = .14;
      lfo.frequency.value = 5.1; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(8, t + Math.min(.55, len));
      lfo.connect(lg); lg.connect(o.detune); lg.connect(o2.detune);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + .08);
      g.gain.setValueAtTime(vol * .92, t + Math.max(.1, len - .12));
      g.gain.exponentialRampToValueAtTime(0.0001, t + len + .28);
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(bus);
      // hembusan napas
      const ns = c.createBufferSource(), nf = c.createBiquadFilter(), ng = c.createGain();
      ns.buffer = nbuf; nf.type = 'bandpass'; nf.frequency.value = Math.min(6000, freq * 2.4); nf.Q.value = 2.5;
      ng.gain.setValueAtTime(0.0001, t); ng.gain.exponentialRampToValueAtTime(vol * .16, t + .03); ng.gain.exponentialRampToValueAtTime(0.0001, t + .22);
      ns.connect(nf); nf.connect(ng); ng.connect(bus); ns.start(t, Math.random() * .5, .3);
      o.start(t); o2.start(t); lfo.start(t);
      const end = t + len + .35; o.stop(end); o2.stop(end); lfo.stop(end);
    }
    /* pad senar lembut */
    function pad(notes, t, len, vol) {
      notes.forEach(n => {
        [-7, 7].forEach(dt => {
          const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
          o.type = 'sawtooth'; o.frequency.value = mtof(n); o.detune.value = dt;
          f.type = 'lowpass'; f.frequency.value = 760; f.Q.value = .5;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(vol, t + 1.1);
          g.gain.setValueAtTime(vol, t + len - .6);
          g.gain.exponentialRampToValueAtTime(0.0001, t + len + 1.2);
          o.connect(f); f.connect(g); g.connect(bus);
          o.start(t); o.stop(t + len + 1.3);
        });
      });
    }
    /* bass hangat */
    function bass(freq, t, len, vol) {
      const o = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain(), f = c.createBiquadFilter(), g = c.createGain();
      o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = freq; o2.frequency.value = freq; g2.gain.value = .3;
      f.type = 'lowpass'; f.frequency.value = 700;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + .014);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      o.connect(f); o2.connect(g2); g2.connect(f); f.connect(g); g.connect(bus);
      o.start(t); o2.start(t); o.stop(t + len + .05); o2.stop(t + len + .05);
    }
    /* shaker tipis */
    function shaker(t, vol) {
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = nbuf; f.type = 'highpass'; f.frequency.value = 6500; f.Q.value = .4;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(0.0001, t + .07);
      s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random() * .6, .12);
    }
    /* bel kecil (glockenspiel) */
    function bell(freq, t, vol) {
      [[1, 1], [4.01, .16]].forEach(([m, k]) => {
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = freq * m;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol * k, t + .003); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5 / m * (m > 1 ? 2 : 1));
        o.connect(g); g.connect(bus); o.start(t); o.stop(t + 1.6);
      });
    }

    function step(n, t) {
      const bar = Math.floor(n / 8) % 16, slot = n % 8, loop = Math.floor(n / 128);
      const name = PROG[bar], ch = CH[name];
      const j = t + rnd(0, .007);
      // gitar
      pluck(mtof(ch.a[ARP[slot]]), j, slot === 0 ? .11 : slot % 2 ? .06 : .08);
      if (slot === 0) {
        bass(mtof(ch.b), t, E * 3.8, .17);
        pad(ch.p, t, E * 8, .012);
      }
      if (slot === 4) bass(mtof(ch.b + 7), t, E * 3, .1);
      if (slot === 2 || slot === 6) shaker(t, .011);
      // seruling (loop ganjil: 4 birama pertama istirahat → ruang bernapas)
      if (!(loop % 2 && bar < 4)) {
        MEL[bar].forEach(e => { if (e[0] === slot) flute(mtof(e[1]), t + rnd(0, .012), e[2] * E * .96, .125); });
      }
      // bel di bagian B
      if (bar >= 8 && bar % 2 === 0 && slot === 6) bell(mtof(ch.a[3] + 12), t, .04);
      if (bar === 15 && slot === 7) bell(mtof(81), t, .03);
    }
    return { step };
  }

  /* ── Pemutar ── */
  let ctx = null, out = null, eng = null, timer = 0, started = false, nextT = 0, stepN = 0;
  function init() {
    try { ctx = new AC({ latencyHint: 'playback' }); } catch (_) { try { ctx = new AC(); } catch (__) { ctx = null; return; } }
    out = ctx.createGain(); out.gain.value = 0.0001; out.connect(ctx.destination);
    eng = engine(ctx, out);
  }
  function schedule() {
    while (nextT < ctx.currentTime + .6) { eng.step(stepN++, nextT); nextT += E; }
  }
  const GEST = ['pointerdown', 'pointerup', 'mousedown', 'touchstart', 'touchend', 'click', 'keydown'];
  function listen(v) { GEST.forEach(e => (v ? window.addEventListener(e, kick, { capture: true, passive: true }) : window.removeEventListener(e, kick, true))); }
  function kick() { tryStart(); }

  function begin() {
    if (started || !on || !ctx) return;
    started = true;
    listen(false);
    btn && btn.classList.remove('pending');
    nextT = ctx.currentTime + .15;
    clearInterval(timer); timer = setInterval(schedule, 100); schedule();
    const t = ctx.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), t);
    out.gain.exponentialRampToValueAtTime(.62, t + 2.2);
  }
  function tryStart() {
    if (!on || started || document.hidden) return;
    if (!ctx) init();
    if (!ctx) return;
    if (ctx.state === 'running') return begin();
    ctx.resume().then(() => { if (ctx.state === 'running') begin(); }).catch(noop);
  }
  function stop() {
    if (!ctx || !started) return;
    started = false;
    const t = ctx.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), t);
    out.gain.exponentialRampToValueAtTime(0.0001, t + .5);
    setTimeout(() => { if (!started) { clearInterval(timer); timer = 0; } }, 650);
  }

  /* ── Tombol di navbar ── */
  const ICON_ON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="17" cy="16" r="3" fill="currentColor"/></svg>';
  const ICON_OFF = ICON_ON.replace('</svg>', '<path d="M3 3l18 18"/></svg>');
  const css = document.createElement('style');
  css.textContent = `.music-toggle{position:fixed;right:20px;bottom:78px;z-index:9500;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;
    background:var(--sky,#A7D8FF);color:var(--ink,#1B1A2E);border:2.5px solid var(--ink,#1B1A2E);box-shadow:3px 3px 0 var(--ink,#1B1A2E);
    transition:transform .15s cubic-bezier(.16,1,.3,1),box-shadow .15s,background .2s;-webkit-tap-highlight-color:transparent}
  .music-toggle:hover{transform:translate(-1px,-2px) rotate(6deg);box-shadow:5px 5px 0 var(--ink,#1B1A2E)}
  .music-toggle:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--ink,#1B1A2E)}
  .music-toggle:focus-visible{outline:3px solid var(--purple,#8B6CFF);outline-offset:3px}
  .music-toggle[aria-pressed="false"]{background:var(--paper-3,#F3E9D6);color:var(--ink-3,#66647F)}
  .music-toggle::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2.5px solid var(--coral,#FF6B5B);opacity:0;pointer-events:none}
  .music-toggle.pending::after{animation:musPulse 1.8s ease-out infinite}
  @keyframes musPulse{0%{opacity:.85;transform:scale(.9)}100%{opacity:0;transform:scale(1.5)}}
  @media (max-width:860px){.music-toggle{right:120px;bottom:auto;top:23px;width:40px;height:40px;box-shadow:2px 2px 0 var(--ink,#1B1A2E)}.music-toggle svg{width:17px;height:17px}}
  @media (prefers-reduced-motion:reduce){.music-toggle.pending::after{animation:none}}`;
  document.head.appendChild(css);
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'music-toggle'; btn.id = 'musicToggle';
  function paint() {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Matikan musik latar' : 'Nyalakan musik latar');
    btn.title = on ? 'Musik: nyala' : 'Musik: mati';
    btn.innerHTML = on ? ICON_ON : ICON_OFF;
    btn.classList.toggle('pending', on && !started);
  }
  function setOn(v) {
    on = !!v;
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (_) {}
    if (on) { listen(true); tryStart(); } else { stop(); listen(false); }
    paint();
  }
  btn.addEventListener('click', () => {
    // musik "nyala" tapi browser belum mengizinkan suara → tekan pertama cukup membangunkannya
    if (on && !started) { tryStart(); return; }
    setOn(!on);
    try { window.SFX && window.SFX.play(on ? 'on' : 'off'); } catch (_) {}
  });
  paint();
  document.body.appendChild(btn);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (started) { stop(); window.__musicWasOn = true; } }
    else if (on) { window.__musicWasOn = false; listen(true); tryStart(); }
  });

  if (on) { listen(true); tryStart(); }                  // langsung coba (boleh jika autoplay diizinkan)

  window.Music = {
    toggle: () => setOn(!on), setOn, isOn: () => on, start: tryStart, isPlaying: () => started,
    __render: async sec => {                             // hanya untuk pengujian
      const oc = new OfflineAudioContext(2, Math.floor(44100 * sec), 44100);
      const e = engine(oc, oc.destination);
      for (let n = 0, t = .05; t < sec - 1; n++, t += E) e.step(n, t);
      return oc.startRendering();
    },
  };
})();
