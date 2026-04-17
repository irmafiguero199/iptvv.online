const fs = require('fs');
const path = require('path');
const dir = __dirname;

// Fix: canonical tag injected inside meta content/title attributes
// Root cause: JS replace() treated $1 in canonical href as backreference,
// replacing "$1" in price strings like "$12.99" with the canonical tag
// Leaves "2.99" or ",500" after the canonical → need to restore "$1" prefix

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let fixed = 0;

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  // Process line by line — only fix lines that have both content/title AND canonical tag
  const lines = html.split('\n');
  const fixedLines = lines.map(line => {
    if ((line.includes('content="') || line.includes('title="')) &&
        line.includes('<link rel="canonical"')) {
      // Remove the canonical tag and restore $1 prefix
      return line.replace(/<link rel="canonical" href="[^"]+" ?\/>/g, '$1');
    }
    return line;
  });
  html = fixedLines.join('\n');

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    fixed++;
    console.log(`✅ Fixed: ${file}`);
  }
});

console.log(`\n── DONE ──`);
console.log(`Fixed: ${fixed} pages`);
