const fs = require('fs');
const path = require('path');
const dir = __dirname;

// ── Inline styles for table ───────────────────────────────────────────────
const TS  = 'style="width:100%;border-collapse:collapse;font-size:13px;min-width:520px"';
const TH  = 'style="padding:12px 16px;text-align:left;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.07);background:#12121e"';
const THU = 'style="padding:12px 16px;text-align:left;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.07);background:rgba(0,229,255,.08);color:#00e5ff"';
const TD  = 'style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,.04);color:rgba(255,255,255,.78)"';
const TDU = 'style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(0,229,255,.03)"';
const YES = '<span style="color:#22d3a0;font-weight:700">✔</span>';
const NO  = '<span style="color:rgba(255,255,255,.2)">✗</span>';
const CAD = '<span style="font-family:monospace;font-weight:700;color:#00e5ff">$12.99 CAD</span>';
const WRAP_OPEN  = '<div style="overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,.07);margin:28px 0 44px">';
const WRAP_CLOSE = '</div>';

// ── Table definitions per page ────────────────────────────────────────────
function getTable(file) {
  const f = file.toLowerCase();

  // ── GEO: Ontario / Toronto / Ottawa ─────────────────────────────────────
  if (f.includes('ontario') || f.includes('toronto') || f.includes('ottawa')) {
    return buildTable(
      'IPTV vs Bell Fibe / Rogers Ignite — Ontario',
      ['Feature', 'iptvv.online IPTV', 'Bell Fibe TV', 'Rogers Ignite TV'],
      [
        ['Monthly Price', CAD, '$85–$115 CAD', '$90–$120 CAD'],
        ['Live Channels', '25,000+', '~120 channels', '~130 channels'],
        ['TSN 1–5', YES+' Included', 'Sports add-on +$20', 'Sports add-on +$25'],
        ['Sportsnet All', YES+' Included', 'Sports add-on', 'Sports add-on'],
        ['4K Ultra HD', YES+' All plans', 'Extra cost', 'Extra cost'],
        ['French Channels (RDS)', YES+' 500+', 'Partial', 'Limited'],
        ['No Contract', YES, NO+' 2-year term', NO+' 2-year term'],
        ['Regional Blackouts', YES+' Zero', 'Yes', 'Yes'],
        ['Free Trial (no card)', YES+' 24h', NO, NO],
        ['Interac e-Transfer', YES, NO, NO],
      ]
    );
  }

  // ── GEO: Quebec / Montreal ───────────────────────────────────────────────
  if (f.includes('quebec') || f.includes('montreal')) {
    return buildTable(
      'IPTV vs Videotron / Bell — Québec',
      ['Feature', 'iptvv.online IPTV', 'Videotron Helix', 'Bell Fibe Québec'],
      [
        ['Monthly Price', CAD, '$80–$110 CAD', '$85–$115 CAD'],
        ['Live Channels', '25,000+', '~120 channels', '~130 channels'],
        ['RDS / RDS2', YES+' Included', 'Sports add-on', 'Sports add-on +$20'],
        ['TVA Sports', YES+' Included', 'Sports add-on', 'Sports add-on'],
        ['French Channels', YES+' 500+', 'Partial selection', 'Partial selection'],
        ['TSN 1–5', YES, 'Sports add-on', 'Sports add-on'],
        ['4K Ultra HD', YES+' All plans', 'Extra cost', 'Extra cost'],
        ['No Contract', YES, NO+' 2-year term', NO+' 2-year term'],
        ['Free Trial (no card)', YES+' 24h', NO, NO],
      ]
    );
  }

  // ── GEO: Alberta / Calgary ───────────────────────────────────────────────
  if (f.includes('alberta') || f.includes('calgary')) {
    return buildTable(
      'IPTV vs Shaw/Rogers / Telus Optik — Alberta',
      ['Feature', 'iptvv.online IPTV', 'Shaw BlueCurve / Rogers', 'Telus Optik TV'],
      [
        ['Monthly Price', CAD, '$85–$115 CAD', '$80–$110 CAD'],
        ['Live Channels', '25,000+', '~130 channels', '~120 channels'],
        ['TSN 1–5 (Flames, Stamps)', YES+' Included', 'Sports add-on +$20', 'Sports add-on +$18'],
        ['Sportsnet Pacific/Prairies', YES+' Included', 'Partial', 'Partial'],
        ['4K Ultra HD', YES+' All plans', 'Limited', 'Limited'],
        ['French Channels (RDS)', YES+' 500+', 'Limited', 'Limited'],
        ['No Contract', YES, NO+' 2-year term', NO+' 2-year term'],
        ['Regional Blackouts', YES+' Zero', 'Yes', 'Yes'],
        ['Free Trial (no card)', YES+' 24h', NO, NO],
      ]
    );
  }

  // ── GEO: BC / Vancouver ──────────────────────────────────────────────────
  if (f.includes('iptv-bc') || f.includes('vancouver')) {
    return buildTable(
      'IPTV vs Shaw/Rogers / Telus Optik — BC',
      ['Feature', 'iptvv.online IPTV', 'Shaw BlueCurve / Rogers', 'Telus Optik TV'],
      [
        ['Monthly Price', CAD, '$85–$115 CAD', '$80–$110 CAD'],
        ['Live Channels', '25,000+', '~130 channels', '~120 channels'],
        ['TSN 1–5 (Canucks, Lions)', YES+' Included', 'Sports add-on +$20', 'Sports add-on +$18'],
        ['Sportsnet Pacific', YES+' Included', 'Partial', 'Partial'],
        ['4K Ultra HD', YES+' All plans', 'Limited', 'Limited'],
        ['French Channels (RDS)', YES+' 500+', 'Limited', 'Limited'],
        ['No Contract', YES, NO+' 2-year term', NO+' 2-year term'],
        ['Regional Blackouts', YES+' Zero', 'Yes', 'Yes'],
        ['Free Trial (no card)', YES+' 24h', NO, NO],
      ]
    );
  }

  // ── Sports ───────────────────────────────────────────────────────────────
  if (f.includes('sports') || f.includes('nhl')) {
    return buildTable(
      'IPTV Sports vs Cable Sports Packages — Canada 2026',
      ['Feature', 'iptvv.online IPTV', 'Bell Fibe + Sports', 'Rogers + Sports'],
      [
        ['Monthly Price', CAD, '$105–$135 CAD', '$110–$140 CAD'],
        ['TSN 1–5', YES, YES+' Add-on', YES+' Add-on'],
        ['Sportsnet (all 5)', YES, YES+' Add-on', YES+' Add-on'],
        ['RDS / TVA Sports', YES, 'Add-on', 'Not available'],
        ['NFL / NBA / MLB', YES, 'Partial', 'Partial'],
        ['4K Sports', YES+' All games', 'Limited', 'Limited'],
        ['Regional Blackouts', YES+' Zero', 'Yes', 'Yes'],
        ['No Contract', YES, NO, NO],
        ['Free Trial', YES+' 24h no card', NO, NO],
      ]
    );
  }

  // ── French Channels ──────────────────────────────────────────────────────
  if (f.includes('french')) {
    return buildTable(
      'French IPTV Canada — iptvv.online vs Other Options',
      ['Feature', 'iptvv.online IPTV', 'Videotron Helix', 'Other IPTV Services'],
      [
        ['French Channels Count', '500+ channels', '~80 channels', '~50–100 channels'],
        ['RDS / RDS2', YES, YES+' Add-on', 'Varies'],
        ['TVA Sports', YES, YES+' Add-on', 'Varies'],
        ['ICI Radio-Canada', YES, YES, 'Varies'],
        ['TVA / Noovo / LCN', YES, YES, 'Varies'],
        ['Canal D / Historia', YES, 'Partial', 'Rare'],
        ['French Customer Support', YES+' EN/FR 24/7', 'FR only (business hours)', 'EN only'],
        ['Monthly Price', CAD, '$85–$110 CAD', '$15–$25 CAD'],
        ['No Contract', YES, NO, 'Varies'],
      ]
    );
  }

  // ── 4K ───────────────────────────────────────────────────────────────────
  if (f.includes('4k')) {
    return buildTable(
      '4K IPTV vs 4K Cable vs 4K Satellite — Canada 2026',
      ['Feature', 'iptvv.online 4K IPTV', '4K Cable (Bell/Rogers)', '4K Satellite (Bell)'],
      [
        ['Monthly Price', CAD, '$95–$130 CAD', '$100–$140 CAD'],
        ['4K Channels', '25,000+ in 4K', '~10–20 4K channels', '~10–15 4K channels'],
        ['4K Sports (TSN, Sportsnet)', YES+' All plans', 'Extra fee', 'Extra fee'],
        ['4K Ultra HD on all content', YES, 'Premium tier only', 'Premium tier only'],
        ['Internet Required', YES, YES+' Plus cable', YES+' Dish install required'],
        ['No Special Hardware', YES, NO+' Box required', NO+' Dish required'],
        ['No Contract', YES, NO, NO],
        ['Free Trial', YES+' 24h no card', NO, NO],
      ]
    );
  }

  // ── Smart TV ─────────────────────────────────────────────────────────────
  if (f.includes('smart-tv')) {
    return buildTable(
      'IPTV Apps for Smart TV — Canada 2026',
      ['App', 'iptvv.online + Smarters', 'TATA Play (Samsung)', 'Built-in Streaming Apps'],
      [
        ['Live Canadian TV', YES+' 25,000+ channels', 'Limited', 'No live TV'],
        ['TSN / RDS / CBC', YES, NO, 'Partial (app-by-app)'],
        ['Monthly Cost', CAD, 'Free (no CA content)', '$5–$20/app'],
        ['Works on Samsung TV', YES, YES, YES],
        ['Works on LG TV', YES, NO, YES],
        ['Works on Android TV', YES, NO, YES],
        ['4K Ultra HD', YES, 'HD only', 'Varies by app'],
        ['Catch-up TV', YES+' 7 days', NO, 'Varies'],
        ['No Subscriptions per Channel', YES+' All-in-one', NO, NO],
      ]
    );
  }

  // ── Legal / VPN ──────────────────────────────────────────────────────────
  if (f.includes('legal') || f.includes('vpn') || f.includes('legit')) {
    return buildTable(
      'Legal IPTV vs Illegal IPTV — What to Know',
      ['Feature', 'Legal IPTV (iptvv.online)', 'Unlicensed "Free" IPTV'],
      [
        ['Licensed & Legal', YES, NO],
        ['Stable Uptime (99.9%)', YES, 'Often 70–90% — frequent outages'],
        ['Customer Support', YES+' 24/7 EN/FR', 'None or unresponsive'],
        ['Money-Back Guarantee', YES+' 30 days', NO],
        ['Free Trial (no card)', YES+' 24h', 'No — or fake "free"'],
        ['Risk of Legal Action', YES+' None', 'Possible — copyright infringement'],
        ['Payment Security', YES+' Interac, Visa, PayPal', 'Often crypto only — no refunds'],
        ['TSN, RDS, CBC Reliability', YES+' 100% stable', 'Frequent freezing or missing'],
      ]
    );
  }

  // ── free-trial fallback ─────────────────────────────────────────────────
  return buildTable(
    'iptvv.online IPTV vs Cable — Canada 2026',
    ['Feature', 'iptvv.online IPTV', 'Bell Fibe TV', 'Rogers Ignite TV'],
    [
      ['Monthly Price', CAD, '$85–$115 CAD', '$90–$120 CAD'],
      ['Live Channels', '25,000+', '~120 channels', '~130 channels'],
      ['TSN 1–5', YES+' Included', 'Sports add-on', 'Sports add-on'],
      ['4K Ultra HD', YES+' All plans', 'Extra cost', 'Extra cost'],
      ['No Contract', YES, NO+' 2-year term', NO+' 2-year term'],
      ['Free Trial (no card)', YES+' 24h', NO, NO],
    ]
  );
}

function buildTable(title, headers, rows) {
  const thStyle = (i) => i === 1 ? THU : TH;
  const tdStyle = (i) => i === 1 ? TDU : TD;

  const headerHTML = headers.map((h, i) =>
    `<th ${thStyle(i)}>${h}</th>`
  ).join('');

  const rowsHTML = rows.map(row =>
    '<tr>' + row.map((cell, i) => `<td ${tdStyle(i)}>${cell}</td>`).join('') + '</tr>'
  ).join('\n        ');

  return `
<!-- COMPARISON TABLE -->
<div style="margin:44px 0">
  <h2 style="font-family:'Bebas Neue',cursive;font-size:clamp(26px,3.2vw,40px);letter-spacing:.02em;text-transform:uppercase;margin-bottom:8px">Side-by-Side <span style="color:#00e5ff">Comparison</span></h2>
  <p style="font-size:14px;color:rgba(255,255,255,.55);margin-bottom:20px">${title}</p>
  ${WRAP_OPEN}
    <table ${TS}>
      <thead><tr>${headerHTML}</tr></thead>
      <tbody>
        ${rowsHTML}
      </tbody>
    </table>
  ${WRAP_CLOSE}
</div>`;
}

// ── Pages to fix ──────────────────────────────────────────────────────────
const TARGETS = [
  'do-i-need-vpn-for-iptv.html',
  'free-trial.html',
  'french-channels-iptv-canada.html',
  'iptv-4k-canada.html',
  'iptv-alberta.html',
  'iptv-bc.html',
  'iptv-montreal.html',
  'iptv-ontario.html',
  'iptv-ottawa.html',
  'iptv-quebec.html',
  'iptv-smart-tv-canada.html',
  'iptv-sports-canada.html',
  'iptv-toronto.html',
  'iptv-vancouver.html',
  'is-iptv-legal-canada.html',
  'legal-iptv-canada.html',
];

let fixed = 0;

TARGETS.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`⚠  Not found: ${file}`); return; }

  let html = fs.readFileSync(fp, 'utf8');

  // Skip if already has a table
  if (html.includes('<table') || html.includes('comp-table') || html.includes('Comparison')) {
    console.log(`⏭  Already has table: ${file}`);
    return;
  }

  const tableHTML = getTable(file);

  // Insert before Steps section, or before FAQ, or before CTA, or before footer
  let inserted = false;
  const insertPoints = [
    '<!-- STEPS SECTION -->',
    'class="faq-list"',
    'class="faq-item',
    'class="cta-box"',
    'class="cta-b"',
    '<footer',
  ];

  for (const point of insertPoints) {
    if (html.includes(point)) {
      html = html.replace(point, tableHTML + '\n' + point);
      inserted = true;
      break;
    }
  }

  if (inserted) {
    fs.writeFileSync(fp, html, 'utf8');
    fixed++;
    console.log(`✅ Table added: ${file}`);
  } else {
    console.log(`⚠  No insertion point: ${file}`);
  }
});

console.log(`\n── DONE ──`);
console.log(`Comparison tables added: ${fixed} pages`);
