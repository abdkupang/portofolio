/* ─────────────────────────────────────────────────
   tech-icons.js  v2
   Smart tech badge renderer with brand SVG icons.
   Usage: TECH_ICONS.badge('PHP', 'sm'|'md'|'lg')
───────────────────────────────────────────────── */
window.TECH_ICONS = (function () {
  'use strict';

  /* ── BRAND COLORS ── */
  const COLORS = {
    php:         '#4F5B93',
    javascript:  '#323330',  // dark bg for yellow icon
    typescript:  '#3178C6',
    nodejs:      '#215732',
    vuejs:       '#35495E',
    nextjs:      '#000000',
    react:       '#20232A',
    mysql:       '#00618A',
    postgresql:  '#2F5F8F',
    supabase:    '#1C1C1C',
    tailwindcss: '#0F172A',
    bootstrap:   '#7952B3',
    laravel:     '#FF2D20',
    expressjs:   '#000000',
    pinia:       '#35495E',
    vite:        '#1E1E2E',
    docker:      '#1D63ED',
    git:         '#F05032',
    github:      '#181717',
    discordapi:  '#404EED',
    midtrans:    '#003580',
    pwa:         '#5A0FC8',
    chartjs:     '#212121',
    kmeans:      '#C04000',
    vercel:      '#000000',
    klingai:     '#3730A3',
    googleveo:   '#1A73E8',
    huggingface: '#FF9D00',
    replicate:   '#1A1A1A',
    axios:       '#5A29E4',
    zustand:     '#2C2A26',
    framermotion:'#0055FF',
    recharts:    '#1A3A4A',
    css:         '#1572B6',
    html:        '#E34F26',
    fontawesome: '#2B5797',
    apache:      '#9C1A1A',
    mariadb:     '#003545',
    oauth2:      '#EB5424',
    sse:         '#065F46',
    phpmailer:   '#3E4B6E',
    composer:    '#5A3C1E',
    mpdf:        '#2C4A7C',
    jwt:         '#000000',
    bcrypt:      '#1E3A5F',
    pdo:         '#4F5B93',
    multer:      '#1A1A2E',
    phpspreadsheet: '#1E6B3E',
    vueRouter:   '#35495E',
    mysqli:      '#00618A',
    default:     '#374151',
  };

  /* ── SVG ICON MAP ── key: normalized tag name */
  const ICONS = {
    php: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><ellipse cx="64" cy="64" rx="60" ry="36" fill="#8892BF"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="white" font-weight="700" font-size="38" font-family="Arial">php</text></svg>`,

    javascript: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><text x="16" y="22" text-anchor="middle" fill="#323330" font-weight="700" font-size="18" font-family="Arial">JS</text></svg>`,

    typescript: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="4" fill="#3178C6"/><text x="16" y="22" text-anchor="middle" fill="white" font-weight="700" font-size="18" font-family="Arial">TS</text></svg>`,

    nodejs: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#339933" d="M64 4L10 34.7v58.6L64 124l54-30.7V34.7z"/><path fill="white" d="M46 82c0 3.5 2 5.3 5 5.3 2.5 0 4-1 5.2-3.5l4.8 2.8C58.8 90.5 55 92 50 92c-7 0-12-4.6-12-13.3V60h8v22zm18-22h8l8 14 8-14h8L84 100h-8L68 60z"/></svg>`,

    vuejs: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#42B883" d="M78.8 12L64 36.7 49.2 12H2.7L64 117.2 125.3 12z"/><path fill="#35495E" d="M78.8 12L64 36.7 49.2 12H26.4L64 79.5 101.6 12z"/></svg>`,

    nextjs: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#000"/><path fill="white" d="M107 104L47 22H22v84h18V46l52 66zM88 22h18v84H88z"/></svg>`,

    react: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="12" fill="#61DAFB"/><ellipse cx="64" cy="64" rx="62" ry="22" fill="none" stroke="#61DAFB" stroke-width="5"/><ellipse cx="64" cy="64" rx="62" ry="22" fill="none" stroke="#61DAFB" stroke-width="5" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="62" ry="22" fill="none" stroke="#61DAFB" stroke-width="5" transform="rotate(120 64 64)"/></svg>`,

    mysql: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#00618A" d="M2 25.6c12.1-1.4 21.2.8 28.4 6.5-3.2 3.4-5.9 7-8 11-5.2-5-11.2-8.5-20.4-10.3V25.6zm45.7 2c4.3 0 8.5.7 11.4 2.2v13.3c-3.1-1.5-6.5-2.2-10.3-2.2-7.3 0-12.4 3.5-12.4 8.4 0 5 5.1 8.4 12.4 8.4 3.8 0 7.2-.7 10.3-2.2v13.3c-2.9 1.5-7.1 2.2-11.4 2.2-14.6 0-24.2-8.4-24.2-21.7.1-13.2 9.7-21.7 24.2-21.7zm30.1.7h13.5V97H77.8V28.3zm32 0h13.5V97h-13.5V28.3zM2 51.9c9.9 1.2 17.2 4.9 22.5 11.3-3.4 3.8-6.7 7.8-9.3 12.2-3.9-5.3-8.1-9.2-13.2-11.4V51.9z" fill="#4479A1"/></svg>`,

    postgresql: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#4169E1" d="M64 10C34.2 10 10 34.2 10 64s24.2 54 54 54 54-24.2 54-54S93.8 10 64 10zm0 10c10.4 0 20 3.3 27.8 8.8L20.8 91.8C15.3 84 12 74.4 12 64c0-28.7 23.3-52 52-52zm0 96c-10.4 0-20-3.3-27.8-8.8l71-73C113 42.1 116 52 116 64c0 28.7-23.3 52-52 52z"/></svg>`,

    supabase: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3ECF8E"/><stop offset="100%" stop-color="#1a9e6b"/></linearGradient></defs><path fill="url(#sg1)" d="M74 8L16 82c-2.4 3.1-.2 7.6 3.7 7.6H60v31c0 3.9 4.8 5.9 7.4 3.1L126 48c2.4-3.1.2-7.6-3.7-7.6H82V9c0-3.9-4.8-5.9-7.4 3.1"/><path fill="url(#sg1)" d="M74 8L16 82c-2.4 3.1-.2 7.6 3.7 7.6H60v31c0 3.9 4.8 5.9 7.4 3.1L126 48c2.4-3.1.2-7.6-3.7-7.6H82V9"/></svg>`,

    tailwindcss: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#06B6D4" d="M64 16c-17.7 0-29.5 8.9-35.5 26.7 5.9-8.9 12.8-12.2 20.7-10.1 4.5 1.2 7.7 4.6 11.3 8.3 6.2 6.6 13.5 14.3 30.5 14.3 17.7 0 29.5-8.9 35.5-26.7-5.9 8.9-12.8 12.2-20.7 10.1-4.5-1.2-7.7-4.6-11.3-8.3C88.3 23.7 81 16 64 16zm-35.5 39.2C10.8 55.2-1 64.1-7 81.9c5.9-8.9 12.8-12.2 20.7-10.1 4.5 1.2 7.7 4.6 11.3 8.3 6.2 6.6 13.5 14.3 30.5 14.3 17.7 0 29.5-8.9 35.5-26.7-5.9 8.9-12.8 12.2-20.7 10.1-4.5-1.2-7.7-4.6-11.3-8.3-6.2-6.6-13.5-14.3-30.5-14.3z"/></svg>`,

    bootstrap: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="18" fill="#7952B3"/><path fill="white" d="M34 24h36c7.7 0 13.8 2 18 6s6.3 9.4 6.3 16c0 4.3-1.1 8-3.2 11.2-2.1 3.2-5 5.6-8.6 7.2v.4c4.8 1.5 8.5 4 11 7.5s3.8 7.8 3.8 12.9c0 7.2-2.5 12.9-7.5 17.1s-11.8 6.3-20.5 6.3H34V24zm16.5 34.2h17c4.2 0 7.5-.9 9.8-2.6 2.3-1.7 3.5-4.3 3.5-7.7 0-3.3-1.1-5.7-3.4-7.4-2.2-1.7-5.5-2.6-10-2.6H50.5v20.3zm0 35.6H69c4.7 0 8.2-1 10.7-3 2.4-2 3.7-4.8 3.7-8.5 0-3.7-1.3-6.6-3.8-8.7-2.5-2-6.2-3-11-3H50.5v23.2z"/></svg>`,

    laravel: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#FF2D20" d="M106.5 34.6c.1.4.1.8.1 1.1v27.6c0 1.4-.7 2.7-2 3.4L83 79.3v27c0 1.4-.8 2.7-2 3.4L25.4 123c-.3.2-.6.2-.9.3-.1 0-.2.1-.3.1-.3 0-.7-.1-1-.2L7.1 114c-1.3-.7-2.1-2.1-2.1-3.5V16.2c0-.4.1-.8.2-1.2.1-.2.1-.4.2-.6.1-.2.2-.4.4-.6.1-.2.3-.3.4-.5.2-.2.4-.3.5-.4L23.7 4.7c1.3-.8 3-.8 4.3 0l17 9.9.4.5c.2.1.3.3.4.5.2.2.3.4.4.6.1.2.2.4.2.6 0 .4.1.8.1 1.2v51.5L63 61.2V33.5c0-.4 0-.8.1-1.2.1-.2.1-.4.2-.6.1-.2.2-.4.4-.6.1-.2.3-.3.4-.5.2-.2.4-.3.5-.4l17-9.9c1.3-.8 3-.8 4.3 0l17 9.9z"/></svg>`,

    expressjs: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="8" fill="#000"/><text x="64" y="74" text-anchor="middle" fill="white" font-weight="600" font-size="24" font-family="Arial">Express</text></svg>`,

    pinia: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="60" fill="#FFD859"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" fill="#35495E" font-weight="700" font-size="28" font-family="Arial">Pinia</text></svg>`,

    vite: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vg" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#41D1FF"/><stop offset="100%" stop-color="#BD34FE"/></linearGradient></defs><path fill="url(#vg)" d="M120 22L67 118c-1 1.9-3.7 1.9-4.7 0L8 22c-1.1-2 .4-4.5 2.6-4.3l52 5.1 50-5.1c2.2-.2 3.7 2.3 2.4 4.3z"/><path fill="#41D1FF" opacity=".8" d="M78 6l-14 26L50 6H78z"/></svg>`,

    git: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F05032" d="M124.7 58.4L69.6 3.3c-2.9-2.9-7.7-2.9-10.6 0l-10.5 10.5 13.3 13.3c3.1-1 6.6-.3 9 2.1 2.5 2.5 3.2 6 2.1 9L86.2 51.5c3.1-1 6.6-.3 9 2.1 3.4 3.4 3.4 8.8 0 12.2-3.4 3.4-8.8 3.4-12.2 0-2.6-2.6-3.3-6.4-2-9.6L67.6 42.8v33c.8.4 1.6.9 2.3 1.6 3.4 3.4 3.4 8.8 0 12.2-3.4 3.4-8.8 3.4-12.2 0-3.4-3.4-3.4-8.8 0-12.2.9-.9 1.9-1.6 3-2V42.1c-1.1-.4-2.1-1.1-3-2-2.6-2.6-3.3-6.5-2-9.7L42.5 17.1 3.3 56.3c-2.9 2.9-2.9 7.7 0 10.6l55.2 55.2c2.9 2.9 7.7 2.9 10.6 0l55.6-55.6c2.9-2.9 2.9-7.7 0-10.1z"/></svg>`,

    github: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M64 5C31.5 5 5 31.5 5 64c0 26 16.9 48 40.4 55.8 2.9.5 4-1.3 4-2.8v-10c-16.3 3.5-19.8-7.9-19.8-7.9-2.7-6.8-6.5-8.6-6.5-8.6-5.3-3.6.4-3.5.4-3.5 5.9.4 9 6 9 6 5.2 8.9 13.7 6.3 17 4.8.5-3.8 2-6.3 3.7-7.8-13-1.5-26.6-6.5-26.6-28.8 0-6.4 2.3-11.6 6-15.7-.6-1.5-2.6-7.4.6-15.4 0 0 4.9-1.6 16 6 4.6-1.3 9.6-1.9 14.5-1.9 4.9 0 9.9.7 14.5 1.9 11.1-7.5 16-6 16-6 3.2 8 1.2 13.9.6 15.4 3.7 4.1 6 9.3 6 15.7 0 22.4-13.7 27.3-26.7 28.7 2.1 1.8 4 5.4 4 10.9v16.2c0 1.6 1.1 3.4 4 2.8C106.1 112 123 90 123 64 123 31.5 96.5 5 64 5z"/></svg>`,

    discordapi: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#5865F2" d="M107.7 23.8A104 104 0 0081.6 16c-1.1 2-2.4 4.8-3.3 7-8.2-1.2-16.3-1.2-24.4 0-.9-2.2-2.2-4.9-3.3-7C42 17.6 33.6 20.4 26.3 24.1 9.5 53 5.2 81.2 7.4 109c10.2 7.5 20 12 29.8 15 2.4-3.3 4.6-6.8 6.4-10.5-3.5-1.3-6.8-2.9-10-4.8.8-.6 1.6-1.2 2.4-1.8 19.4 9 40.4 9 59.5 0 .8.6 1.6 1.3 2.4 1.8-3.2 1.9-6.5 3.5-10 4.8 1.9 3.7 4 7.2 6.4 10.5 9.7-3 19.6-7.5 29.8-15 2.5-31.7-4.4-59.7-17-85.2zm-73.6 68c-5.3 0-9.7-4.9-9.7-10.8 0-5.9 4.3-10.8 9.7-10.8 5.4 0 9.8 4.9 9.7 10.8 0 5.9-4.3 10.8-9.7 10.8zm35.9 0c-5.3 0-9.7-4.9-9.7-10.8 0-5.9 4.3-10.8 9.7-10.8 5.4 0 9.8 4.9 9.7 10.8 0 5.9-4.3 10.8-9.7 10.8z"/></svg>`,

    midtrans: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#003580"/><path fill="white" d="M18 38h92v14H18zm0 19h92v14H18zm0 19h64v14H18z"/></svg>`,

    pwa: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#5A0FC8"/><text x="64" y="74" text-anchor="middle" fill="white" font-weight="900" font-size="34" font-family="Arial">PWA</text></svg>`,

    chartjs: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="60" fill="#fff" stroke="#E0E0E0" stroke-width="2"/><path fill="#FF6384" d="M64 64L64 10A54 54 0 01106 91Z"/><path fill="#36A2EB" d="M64 64L106 91A54 54 0 0122 91Z"/><path fill="#FFCE56" d="M64 64L22 91A54 54 0 0164 10Z"/></svg>`,

    kmeans: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="38" cy="45" r="14" fill="#EF4444" opacity=".85"/><circle cx="90" cy="42" r="14" fill="#3B82F6" opacity=".85"/><circle cx="62" cy="90" r="14" fill="#10B981" opacity=".85"/><line x1="38" y1="45" x2="62" y2="90" stroke="#EF4444" stroke-width="2" opacity=".5"/><line x1="90" y1="42" x2="62" y2="90" stroke="#3B82F6" stroke-width="2" opacity=".5"/><circle cx="38" cy="25" r="5" fill="#EF4444"/><circle cx="22" cy="55" r="5" fill="#EF4444"/><circle cx="55" cy="30" r="5" fill="#3B82F6"/><circle cx="102" cy="58" r="5" fill="#3B82F6"/><circle cx="50" cy="105" r="5" fill="#10B981"/><circle cx="78" cy="108" r="5" fill="#10B981"/></svg>`,

    vercel: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#000"/><path fill="white" d="M64 20L108 100H20z"/></svg>`,

    klingai: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="kg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#4338CA"/></linearGradient></defs><circle cx="64" cy="64" r="62" fill="url(#kg)"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="700" font-size="42" font-family="Arial">K</text></svg>`,

    googleveo: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#4285F4"/><path fill="white" d="M90 44H72L64 60l-8-16H38l26 40z"/><path fill="white" opacity=".5" d="M64 84l26-40H72L64 60l-8-16H38z" transform="scale(-1,1) translate(-128,0)"/></svg>`,

    huggingface: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#FFD21E"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-size="60">🤗</text></svg>`,

    replicate: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#0F0F0F"/><rect x="22" y="22" width="20" height="84" rx="3" fill="white"/><rect x="54" y="22" width="20" height="62" rx="3" fill="white"/><rect x="86" y="22" width="20" height="44" rx="3" fill="white"/></svg>`,

    axios: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#5A29E4"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="600" font-size="26" font-family="Arial">axios</text></svg>`,

    zustand: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#443E38"/><circle cx="64" cy="64" r="34" fill="#F59E0B"/><circle cx="64" cy="64" r="16" fill="#443E38"/></svg>`,

    framermotion: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#0055FF"/><path fill="white" d="M24 20h80v36H56L24 92V20zm32 36l48 52H24l32-52z"/></svg>`,

    recharts: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#22B5BF" opacity=".12"/><rect x="18" y="58" width="18" height="50" rx="3" fill="#22B5BF"/><rect x="46" y="38" width="18" height="70" rx="3" fill="#22B5BF"/><rect x="74" y="18" width="18" height="90" rx="3" fill="#22B5BF"/><rect x="102" y="46" width="18" height="62" rx="3" fill="#22B5BF"/></svg>`,

    css: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#1572B6" d="M20 114L8 4h112L108 114 64 126z"/><path fill="#33A9DC" d="M64 117l35.6-9.9 8-89.7H64z"/><path fill="white" d="M64 65H49l-1.1-12H64V42H34.5l.3 3.2 3.1 34.5H64V65zm0 20.4v11.7l-.1.1-15.5-4.2-.9-11H37l1.8 20.5 25.2 7z"/><path fill="#EBEBEB" d="M64 65v14.7h14.2L77 95l-13 3.5v11.7l25.2-7 2.8-31.5H64zM64 42v11.2H94.1l.3-3.2.6-7.2.3-.8H64z"/></svg>`,

    html: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#E44D26" d="M20 114L8 4h112L108 114 64 126z"/><path fill="#F16529" d="M64 117l35.6-9.9 8-89.7H64z"/><path fill="white" d="M64 65H48.3l-1-12H64V42H36l.3 3.2 3 33.5H64V65zm0 19v13.3l-.1.1-14-3.9-.9-10.5H39l1.8 19.3 23.2 6.5z"/><path fill="#EBEBEB" d="M64 65v14.7h14.7l-1.4 15L64 98.2v13.3l23.8-6.5.2-2.2 2.8-31.5H64zM64 42v11.2h29.2l.2-3.2.6-7.2.3-.8H64z"/></svg>`,

    fontawesome: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#528DD7"/><text x="50%" y="68%" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="64" font-weight="900" font-family="Georgia,serif">f</text></svg>`,

    apache: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="8" fill="#D22128"/><text x="64" y="50" text-anchor="middle" fill="white" font-weight="700" font-size="18" font-family="Arial">Apache</text><text x="64" y="80" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="15" font-family="Arial">httpd</text></svg>`,

    mariadb: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="8" fill="#003545"/><path fill="#C0765A" stroke="#C0765A" stroke-width="3" fill="none" d="M16 90 Q40 45 66 38 Q92 30 116 44"/><path fill="#C0765A" d="M16 90 Q40 55 66 50 Q92 45 116 58" stroke="#C0765A" stroke-width="5" fill="none"/></svg>`,

    oauth2: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="14" fill="#EB5424"/><text x="64" y="60" text-anchor="middle" fill="white" font-weight="700" font-size="20" font-family="Arial">OAuth</text><text x="64" y="84" text-anchor="middle" fill="rgba(255,255,255,.8)" font-size="18" font-family="Arial">2.0</text></svg>`,

    sse: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="10" fill="#10B981"/><path fill="none" stroke="#10B981" stroke-width="5" d="M44 64A20 20 0 0 1 84 64"/><path fill="none" stroke="#10B981" stroke-width="5" d="M28 64A36 36 0 0 1 100 64" opacity=".7"/><path fill="none" stroke="#10B981" stroke-width="5" d="M12 64A52 52 0 0 1 116 64" opacity=".4"/></svg>`,

    phpmailer: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="12" fill="#8892BF"/><rect x="14" y="36" width="100" height="68" rx="8" fill="rgba(0,0,0,.25)"/><path fill="white" d="M14 44l50 36 50-36v-8L64 70 14 36z"/></svg>`,

    composer: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#F2A400"/><path fill="white" d="M40 44l24-14 24 14v28l-24 14-24-14z" opacity=".3"/><text x="50%" y="62%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="700" font-size="20" font-family="Arial">PHP</text></svg>`,

    mpdf: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#CC1B1B"/><text x="64" y="56" text-anchor="middle" fill="white" font-weight="700" font-size="22" font-family="Arial">mPDF</text><path fill="rgba(255,255,255,.3)" d="M34 70h60v4H34zm0 12h40v4H34z"/></svg>`,

    jwt: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#000"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#FB015B" font-weight="700" font-size="28" font-family="Arial">JWT</text></svg>`,

    bcrypt: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#1E3A5F"/><path fill="rgba(255,255,255,.15)" d="M40 32h48v64H40z" rx="4"/><path fill="white" d="M52 56h24M52 64h18M52 72h20" stroke="white" stroke-width="3" stroke-linecap="round"/><rect x="52" y="44" width="8" height="12" rx="2" fill="white" opacity=".6"/></svg>`,

    pdo: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#4F5B93"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="700" font-size="32" font-family="Arial">PDO</text></svg>`,

    multer: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#1A1A2E"/><path fill="#4CAF50" d="M44 76l20-28 16 20 10-12 14 20z"/><rect x="34" y="86" width="60" height="8" rx="3" fill="rgba(255,255,255,.3)"/></svg>`,

    phpspreadsheet: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="10" fill="#1E6B3E"/><rect x="18" y="30" width="92" height="68" rx="4" fill="rgba(255,255,255,.12)"/><path fill="white" opacity=".7" d="M18 50h92M18 70h92M58 30v68" stroke="rgba(255,255,255,.3)" stroke-width="1"/><text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="700" font-size="14" font-family="Arial">XLS</text></svg>`,

    fonnte: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="62" fill="#25D366"/><path fill="white" d="M88 40c-13.2-13.2-34.6-13.2-47.8 0C28.8 51.4 27 67.2 33.2 80.4L26 102l22-7.2C60 100.7 75 99 86.4 87.6 99.2 74.8 99.2 53.2 86.4 40zM64 88.4c-5.4 0-10.7-1.4-15.3-4.1l-1.1-.7-11.4 3 3-11.1-.7-1.1c-2.9-4.7-4.4-10-4.4-15.6C34 42.2 48 28 64 28c16 0 30 14 30 30.8S80 88.4 64 88.4zm16.5-23.3c-.9-.5-5.3-2.6-6.1-2.9-.8-.3-1.4-.5-2 .5-.6.9-2.3 2.9-2.8 3.5-.5.6-1 .7-1.9.2-.9-.5-3.8-1.4-7.2-4.5-2.7-2.4-4.5-5.3-5-6.2-.5-.9-.1-1.4.4-1.9.4-.4.9-1 1.4-1.5.5-.6.6-1 .9-1.7.3-.6.2-1.2-.1-1.7-.3-.5-2-4.8-2.7-6.6-.7-1.8-1.5-1.5-2-.2-.6 1.2-2.2 5.5-2.2 8.2 0 2.7 2.2 5.4 3.2 7.2 1 1.8 5.4 8.7 13 12.3 1.8.8 3.2 1.3 4.3 1.6 1.8.6 3.4.5 4.7.3 1.4-.2 4.4-1.8 5-3.6.6-1.8.6-3.3.4-3.6-.2-.3-.8-.5-1.7-1z"/></svg>`,

    htaccess: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="8" fill="#4A4A8A"/><text x="64" y="52" text-anchor="middle" fill="white" font-weight="700" font-size="15" font-family="Arial">.htaccess</text><text x="64" y="78" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="13" font-family="Arial">Router</text></svg>`,

    mysqli: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><ellipse cx="64" cy="44" rx="46" ry="18" fill="#4479A1"/><path fill="#4479A1" d="M18 44v40c0 10 20 18 46 18s46-8 46-18V44c0 10-20 18-46 18S18 54 18 44z"/><text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="700" font-size="16" font-family="Arial">MySQLi</text></svg>`,

    default: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="58" fill="none" stroke="#6B7280" stroke-width="6"/><circle cx="64" cy="48" r="8" fill="#6B7280"/><rect x="58" y="62" width="12" height="30" rx="4" fill="#6B7280"/></svg>`,
  };

  /* ── SMART NORMALIZE ──
     Handles "PHP 8.x", "Next.js 13", "Tailwind CSS (CDN)", etc.
  ── */
  function norm(name) {
    return name
      .toLowerCase()
      // strip version numbers and suffixes
      .replace(/\s+\d+(\.\d+)*(x|\+)?$/, '')
      .replace(/\s+(cdn|api|v\d+(\.\d+)*|sdk|cli|orm|ui)$/g, '')
      .replace(/\s+(native|vanilla|smtp|algorithm|real-time|router)$/g, '')
      .replace(/[.\-\s]+/g, '')  // remove dots, dashes, spaces
      .trim();
  }

  /* ── ICON LOOKUP with fallbacks ── */
  function getIcon(name) {
    const key = norm(name);
    if (ICONS[key]) return ICONS[key];

    // Fallback: try first word
    const firstWord = norm(name.split(/[\s\-\.]/)[0]);
    if (ICONS[firstWord]) return ICONS[firstWord];

    // Known aliases
    const aliases = {
      'node': 'nodejs', 'vue': 'vuejs', 'vue3': 'vuejs',
      'vuerouter': 'vuejs', 'next': 'nextjs', 'nextjs13': 'nextjs',
      'nextjs15': 'nextjs', 'tailwind': 'tailwindcss', 'tailwindcss(cdn)': 'tailwindcss',
      'js': 'javascript', 'ts': 'typescript', 'vanillajavascript': 'javascript',
      'mysq': 'mysql', 'mysql8': 'mysql', 'mysql80': 'mysql', 'mysql8x': 'mysql',
      'mariad': 'mariadb', 'mysqli': 'mysqli',
      'express': 'expressjs', 'expressjs': 'expressjs',
      'phpmailersmtp': 'phpmailer', 'phpnative': 'php', 'php8': 'php',
      'php74': 'php', 'php80': 'php',
      'bootstraps': 'bootstrap', 'bootstrap53': 'bootstrap', 'bootstrap5': 'bootstrap',
      'fontawesome6': 'fontawesome', 'fontawesome64': 'fontawesome',
      'googleveo2': 'googleveo', 'googleveo': 'googleveo',
      'klingai': 'klingai', 'klingaiv': 'klingai',
      'huggingfaceapi': 'huggingface',
      'ssereal': 'sse', 'sserealt': 'sse',
      'chartjs': 'chartjs', 'chartjs': 'chartjs',
      'kmeansalgorithm': 'kmeans', 'k-means': 'kmeans',
      'phpspreadsheet': 'phpspreadsheet',
      'fonnte': 'fonnte', 'fonntewhatsapp': 'fonnte',
      'htaccessrouter': 'htaccess',
      'bcrypt': 'bcrypt', 'jsonwebtoken': 'jwt', 'multer': 'multer',
      'pdo': 'pdo', 'mysqli': 'mysqli',
      'framer': 'framermotion', 'framermotion': 'framermotion',
      'mpdf': 'mpdf', 'sessionauth': 'jwt',
    };

    const aliasKey = aliases[key] || aliases[firstWord];
    if (aliasKey && ICONS[aliasKey]) return ICONS[aliasKey];

    return ICONS.default;
  }

  function getColor(name) {
    const key = norm(name);
    const firstWord = norm(name.split(/[\s\-\.]/)[0]);
    return COLORS[key] || COLORS[firstWord] || COLORS.default;
  }

  function textColor(bg) {
    if (!bg || bg.length < 4) return '#fff';
    const h = bg.replace('#', '');
    const r = parseInt(h.substr(0,2)||'33', 16);
    const g = parseInt(h.substr(2,2)||'33', 16);
    const b = parseInt(h.substr(4,2)||'33', 16);
    return (0.299*r + 0.587*g + 0.114*b) / 255 > 0.55 ? '#111' : '#fff';
  }

  /* ── BADGE RENDERER ── */
  function badge(name, size = 'md') {
    const bg  = getColor(name);
    const fg  = textColor(bg);
    const svg = getIcon(name);

    const S = {
      sm: { p: '3px 9px',   fs: '10.5px', is: '14px', gap: '5px', r: '100px' },
      md: { p: '5px 12px',  fs: '11.5px', is: '16px', gap: '6px', r: '100px' },
      lg: { p: '8px 16px',  fs: '13px',   is: '20px', gap: '8px', r: '100px' },
    }[size] || { p: '5px 12px', fs: '11.5px', is: '16px', gap: '6px', r: '100px' };

    return `<span class="tech-badge" data-tech="${name}" style="
      display:inline-flex;align-items:center;gap:${S.gap};
      padding:${S.p};border-radius:${S.r};
      background:${bg};color:${fg};
      box-shadow:0 1px 4px rgba(0,0,0,.22);
      user-select:none;vertical-align:middle;
      transition:transform .15s,box-shadow .15s;
      "><span style="
        display:inline-flex;align-items:center;justify-content:center;
        width:${S.is};height:${S.is};flex-shrink:0;border-radius:3px;overflow:hidden;
      ">${svg}</span><span style="
        font-family:'JetBrains Mono',monospace;
        font-size:${S.fs};font-weight:500;letter-spacing:.01em;white-space:nowrap;
      ">${name}</span></span>`;
  }

  return { badge, getIcon, getColor };
})();
