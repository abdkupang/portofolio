const fs = require('fs');

const projectsData = {
  autopost: {
    tags: ['PHP', 'MySQL', 'JavaScript', 'PWA', 'Midtrans API'],
    dataTags: 'php javascript mysql pwa midtrans',
    stackTable: `| Stack | Keterangan |
|-------|-----------|
| PHP Native | Backend server-side logic |
| MySQL | Database management |
| JavaScript | Frontend interactivity |
| PWA | Progressive Web App features |
| Midtrans API | Payment Gateway |`
  },
  'ai-video-generator': {
    tags: ['Next.js', 'React', 'Google Veo 2 API', 'Replicate API'],
    dataTags: 'nextjs react javascript api'
  },
  komikstation: {
    tags: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
    dataTags: 'php mysql css javascript'
  },
  nontonfilm: {
    tags: ['PHP', 'MySQL', 'JavaScript', 'MVC Pattern'],
    dataTags: 'php mysql javascript mvc'
  },
  'aeterna-pool': {
    tags: ['Vue.js', 'Express.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    dataTags: 'vuejs expressjs nodejs mysql tailwind',
    stackTable: `| Stack | Keterangan |
|-------|-----------|
| Vue.js 3 | Frontend Framework |
| Express.js | Backend Framework (Node.js) |
| MySQL | Database |
| Pinia | State Management |
| Tailwind CSS | CSS Framework |`
  },
  'aeterna-project': {
    tags: ['Vue.js', 'Express.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    dataTags: 'vuejs expressjs nodejs mysql tailwind',
    stackTable: `| Stack | Keterangan |
|-------|-----------|
| Vue.js 3 | Frontend Framework |
| Express.js | Backend Framework (Node.js) |
| MySQL | Database |
| Pinia | State Management |
| Tailwind CSS | CSS Framework |`
  },
  aksesoris: {
    tags: ['PHP', 'MySQL', 'JavaScript', 'PHPMailer'],
    dataTags: 'php mysql javascript phpmailer'
  },
  fs31: {
    tags: ['PHP', 'MySQL', 'K-Means', 'Chart.js', 'MPDF'],
    dataTags: 'php mysql javascript kmeans'
  },
  'penjualan-buku': {
    tags: ['PHP', 'MySQL', 'JavaScript', 'PHPMailer'],
    dataTags: 'php mysql javascript phpmailer'
  },
  'rekam-medis': {
    tags: ['PHP', 'MySQL', 'JavaScript'],
    dataTags: 'php mysql javascript'
  },
  'toko-sembako': {
    tags: ['PHP', 'MySQL', 'JavaScript'],
    dataTags: 'php mysql javascript'
  },
  'penjualan-kaos': {
    tags: ['PHP', 'MySQL', 'JavaScript', 'PHPMailer'],
    dataTags: 'php mysql javascript phpmailer'
  },
  'penyewaan-camp': {
    tags: ['PHP', 'MySQL', 'JavaScript', 'PHPMailer'],
    dataTags: 'php mysql javascript phpmailer'
  },
  sepatu: {
    tags: ['PHP', 'MySQL', 'JavaScript'],
    dataTags: 'php mysql javascript'
  }
};

// 1. UPDATE project-detail.html
let detailHtml = fs.readFileSync('project-detail.html', 'utf8');

for (const [id, data] of Object.entries(projectsData)) {
  // Update tags
  const tagsRegex = new RegExp(`('${id}':\\s*\\{[\\s\\S]*?tags:\\s*\\[)([^\\]]+)(\\])`, 'g');
  detailHtml = detailHtml.replace(tagsRegex, `$1${data.tags.map(t => "'" + t + "'").join(', ')}$3`);

  // Update stack tables
  if (data.stackTable) {
    // Find the readme and replace the technology table
    const tableRegex = /\| Stack \| Keterangan \|\n\|-------\|-----------\|\n(\|.*?\|\n)+/g;
    
    // We need to limit this to the specific project's readme.
    // Instead of complex regex, let's just do a specific replace per project if needed
    // Since only autopost and aeterna have stackTable, we can target their specific table
  }
}

// More reliable replacement for stack tables
if (detailHtml.includes('php artisan migrate')) {
  detailHtml = detailHtml.replace('php artisan migrate', '# Import database autopost.sql ke MySQL\\n# Sesuaikan config.php dengan detail database Anda');
}

// Replace Autopost table
detailHtml = detailHtml.replace(/\| Stack \| Keterangan \|\n\|-------\|-----------\|\n\| PHP \| Backend server-side logic \|\n\| MySQL \| Database management \|\n\| JavaScript \| Frontend interactivity \|\n\| Bootstrap \| UI framework \|/g, projectsData['autopost'].stackTable);

// Replace AeternaPool table
detailHtml = detailHtml.replace(/\| Stack \| Keterangan \|\n\|-------\|-----------\|\n\| PHP \| Backend \|\n\| MySQL \| Database \|\n\| JavaScript \| UI Interactivity \|\n\| Bootstrap \| CSS Framework \|/g, projectsData['aeterna-pool'].stackTable);

fs.writeFileSync('project-detail.html', detailHtml);

// 2. UPDATE projects.html
let projectsHtml = fs.readFileSync('projects.html', 'utf8');

// The project cards in projects.html have structure like:
// <div class="project-card reveal-up" data-tags="php javascript mysql" style="--d:.05s">
// <div class="card-tags">
//   <span class="tag">PHP</span><span class="tag">MySQL</span><span class="tag">JavaScript</span>
// </div>

const projectMapping = {
  'AutoPost': 'autopost',
  'AI Video Generator': 'ai-video-generator',
  'KomikStation': 'komikstation',
  'NontonFilm': 'nontonfilm',
  'AeternaPool': 'aeterna-pool',
  'Aeterna Project': 'aeterna-project',
  'Toko Aksesoris': 'aksesoris',
  'FS31 Soccer School': 'fs31',
  'Penjualan Buku': 'penjualan-buku',
  'Rekam Medis': 'rekam-medis',
  'Toko Sembako': 'toko-sembako',
  'Penjualan Kaos': 'penjualan-kaos',
  'Penyewaan Alat Camp': 'penyewaan-camp',
  'Toko Sepatu': 'sepatu'
};

const cardsRegex = /<div class="project-card reveal-up" data-tags="([^"]*)"([^>]*)>([\s\S]*?)<h3 class="card-title">([^<]+)<\/h3>([\s\S]*?)<div class="card-tags">\s*(.*?)\s*<\/div>/g;

projectsHtml = projectsHtml.replace(cardsRegex, (match, dataTags, restOfDiv, preTitle, title, postTitle, cardTags) => {
  const projectId = projectMapping[title.trim()];
  if (projectId && projectsData[projectId]) {
    const data = projectsData[projectId];
    const newCardTags = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
    return `<div class="project-card reveal-up" data-tags="${data.dataTags}"${restOfDiv}>${preTitle}<h3 class="card-title">${title}</h3>${postTitle}<div class="card-tags">\n              ${newCardTags}\n            </div>`;
  }
  return match;
});

fs.writeFileSync('projects.html', projectsHtml);

console.log('Update complete.');
