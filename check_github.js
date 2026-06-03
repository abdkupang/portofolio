const fs = require('fs');
const https = require('https');

// Read data.js
const code = fs.readFileSync('c:/laragon/www/portofolio/data.js', 'utf8');
// Extract PROJECTS array
const match = code.match(/const PROJECTS = (\[[\s\S]*?\]);/);
if (!match) {
  console.log('Could not find PROJECTS array');
  process.exit(1);
}

// Evaluate to get the array
let PROJECTS;
try {
  eval('PROJECTS = ' + match[1]);
} catch(e) {
  console.log('Error parsing PROJECTS', e);
  process.exit(1);
}

// Read image folders
const folders = fs.readdirSync('c:/laragon/www/portofolio/image', {withFileTypes: true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('Total image folders:', folders.length);

async function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url || url === 'https://github.com/abdkupang') {
       resolve(false);
       return;
    }
    
    https.get(url, (res) => {
      // 200 OK, 301/302 Redirect
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const notPushed = [];
  
  for (const folder of folders) {
    const proj = PROJECTS.find(p => p.folder === folder);
    
    if (!proj) {
       console.log('- Folder: ' + folder + ' (NOT FOUND IN data.js)');
       notPushed.push({ folder, reason: 'Not listed in data.js' });
       continue;
    }
    
    const url = proj.github;
    
    if (url === 'https://github.com/abdkupang') {
       notPushed.push({ folder, title: proj.title, reason: 'Only profile URL given' });
       continue;
    }
    
    const isUp = await checkUrl(url);
    if (!isUp) {
       notPushed.push({ folder, title: proj.title, url, reason: '404 Not Found' });
    }
  }
  
  console.log('\n--- PROJEK YANG BELUM DI-PUSH KE GITHUB ---');
  if (notPushed.length === 0) {
    console.log('Semua projek sudah ada di GitHub!');
  } else {
    notPushed.forEach(p => {
      console.log(`- ${p.title || p.folder} (${p.folder}) -> ${p.reason}`);
    });
  }
}

run();
