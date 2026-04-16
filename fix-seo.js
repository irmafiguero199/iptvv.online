const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'googledda038c80d70f368.html' && f !== '404.html');

// Extract title and canonical from each file to build og tags dynamically
function getTitle(html) {
  const m = html.match(/<title>(.*?)<\/title>/i);
  return m ? m[1] : 'Best IPTV Canada 2026 — iptvv.online';
}

function getDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  return m ? m[1] : 'Canada\'s top-rated IPTV service. CBC, TSN, RDS, 25,000+ channels from $12.99 CAD/month.';
}

function getCanonical(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  return m ? m[1] : null;
}

function getFilename(html) {
  const c = getCanonical(html);
  if (c) return c;
  return 'https://iptvv.online/';
}

// Best image per page type
function getImage(filename) {
  if (filename.includes('nhl') || filename.includes('sports') || filename.includes('tsn') || filename.includes('rds')) return 'https://iptvv.online/best-iptv-canada.jpeg';
  if (filename.includes('free-trial') || filename.includes('trial')) return 'https://iptvv.online/best-iptv-canada-free-trial.jpeg';
  return 'https://iptvv.online/canada-iptv.jpeg';
}

let fixed = 0;
let skipped = 0;

files.forEach(file => {
  const filepath = path.join(dir, file);
  let html = fs.readFileSync(filepath, 'utf8');

  const hasOgImage = html.includes('og:image');
  const hasHreflang = html.includes('hreflang');
  const hasTwitterTitle = html.includes('twitter:title');

  if (hasOgImage && hasHreflang && hasTwitterTitle) {
    skipped++;
    return;
  }

  const title = getTitle(html);
  const desc = getDescription(html);
  const url = getFilename(html);
  const img = getImage(file);

  // Build the tags to insert after <link rel="canonical".../>
  let insertAfterCanonical = '';

  if (!hasHreflang) {
    insertAfterCanonical += `\n<link rel="alternate" hreflang="en-CA" href="${url}"/>`;
    insertAfterCanonical += `\n<link rel="alternate" hreflang="fr-CA" href="https://iptvv.online/fr/"/>`;
    insertAfterCanonical += `\n<link rel="alternate" hreflang="x-default" href="${url}"/>`;
  }

  if (!hasOgImage) {
    insertAfterCanonical += `\n<meta property="og:title" content="${title}"/>`;
    insertAfterCanonical += `\n<meta property="og:description" content="${desc}"/>`;
    insertAfterCanonical += `\n<meta property="og:url" content="${url}"/>`;
    insertAfterCanonical += `\n<meta property="og:type" content="website"/>`;
    insertAfterCanonical += `\n<meta property="og:image" content="${img}"/>`;
    insertAfterCanonical += `\n<meta property="og:image:width" content="1200"/>`;
    insertAfterCanonical += `\n<meta property="og:image:height" content="630"/>`;
    insertAfterCanonical += `\n<meta property="og:locale" content="en_CA"/>`;
    insertAfterCanonical += `\n<meta property="og:locale:alternate" content="fr_CA"/>`;
  }

  if (!hasTwitterTitle) {
    insertAfterCanonical += `\n<meta name="twitter:card" content="summary_large_image"/>`;
    insertAfterCanonical += `\n<meta name="twitter:title" content="${title}"/>`;
    insertAfterCanonical += `\n<meta name="twitter:description" content="${desc}"/>`;
    insertAfterCanonical += `\n<meta name="twitter:image" content="${img}"/>`;
  }

  if (insertAfterCanonical === '') {
    skipped++;
    return;
  }

  // Find canonical line and insert after it
  const canonicalRegex = /(<link\s+rel="canonical"[^>]*\/>)/i;
  if (canonicalRegex.test(html)) {
    html = html.replace(canonicalRegex, `$1${insertAfterCanonical}`);
  } else {
    // No canonical — insert after </title>
    html = html.replace(/(<\/title>)/i, `$1${insertAfterCanonical}`);
  }

  // Remove duplicate twitter:card if twitter:title added and twitter:card already existed
  const twitterCardMatches = html.match(/<meta name="twitter:card"[^>]*\/>/gi);
  if (twitterCardMatches && twitterCardMatches.length > 1) {
    // Remove first occurrence only
    html = html.replace(/<meta name="twitter:card"[^>]*\/>/, '');
  }

  fs.writeFileSync(filepath, html, 'utf8');
  fixed++;
  console.log(`✅ Fixed: ${file}`);
});

console.log(`\nDone: ${fixed} files fixed, ${skipped} already OK`);
