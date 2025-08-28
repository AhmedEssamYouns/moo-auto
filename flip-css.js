// flip-css.js (replace the top of the file)
const fs = require('fs');
const path = require('path');

// Resolve against the project root where this file lives
const buildDir   = path.resolve(__dirname, 'build');
const indexPath  = path.join(buildDir, 'index.html');
const cssDir     = path.join(buildDir, 'static', 'css');

if (!fs.existsSync(indexPath)) {
  console.warn('[flip-css] index.html not found at:', indexPath, '— skipping postbuild.');
  process.exit(0); // don’t fail the build
}

// Example: read/modify index.html (keep your current transform here)
let html = fs.readFileSync(indexPath, 'utf8');
// ... your transforms ...
fs.writeFileSync(indexPath, html, 'utf8');

// (Optional) loop CSS files if your script flips LTR/RTL/css customizations
if (fs.existsSync(cssDir)) {
  for (const file of fs.readdirSync(cssDir)) {
    if (!file.endsWith('.css')) continue;
    const p = path.join(cssDir, file);
    let css = fs.readFileSync(p, 'utf8');
    // ... your CSS transforms ...
    fs.writeFileSync(p, css, 'utf8');
  }
} else {
  console.warn('[flip-css] CSS dir not found:', cssDir, '— continuing.');
}

console.log('[flip-css] done.');
