const fs = require('fs');
const path = require('path');

const version = process.env.VITE_APP_VERSION || '';

if (version) {
  const htmlPath = path.join(__dirname, '..', 'dist', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  fs.writeFileSync(htmlPath, html.replace('</head>', `<meta name="app-version" content="${version}"></head>`));
  console.log(`✅ Injected app-version: ${version}`);
} else {
  console.log('ℹ️ No VITE_APP_VERSION set, skipping meta tag injection');
}
