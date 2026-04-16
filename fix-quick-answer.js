const fs = require('fs');
const path = require('path');
const dir = __dirname;

// ── Quick Answer per page ─────────────────────────────────────────────────
const QA = {
  'best-iptv-canada.html':       ['Best IPTV Canada 2026',       "iptvv.online is Canada's top-rated IPTV service — 25,000+ channels, TSN 1–5, Sportsnet, RDS, CBC, 4K Ultra HD. From <strong>$12.99 CAD/month</strong>. Free 24h trial, no credit card."],
  'channels.html':               ['IPTV Canada Channels',        "iptvv.online includes 25,000+ live channels: TSN 1–5, all Sportsnet, RDS, CBC, CTV, TVA, and 500+ French channels. 4K Ultra HD on every plan. From <strong>$12.99 CAD/month</strong>."],
  'cheap-iptv-canada.html':      ['Cheap IPTV Canada 2026',      "iptvv.online starts at <strong>$12.99 CAD/month</strong>. The 6-month plan at $44.99 ($7.50/mo) is Canada's best IPTV value. Free 24h trial, no credit card, 30-day money-back guarantee."],
  'free-iptv-trial-30-days.html':['Free IPTV Trial 30 Days',     "iptvv.online offers a free 24-hour trial (no credit card) plus a <strong>30-day money-back guarantee</strong> on all plans. Full access to 25,000+ channels from $12.99 CAD/month."],
  'free-trial.html':             ['Free IPTV Trial Canada',       "iptvv.online offers a free 24-hour IPTV trial with full access to all 25,000+ channels. <strong>No credit card required</strong>. Instant activation in under 5 minutes."],
  'index.html':                  ['IPTV Canada 2026',             "iptvv.online is Canada's #1 IPTV service — 25,000+ live channels, TSN 1–5, RDS, CBC, Sportsnet in 4K Ultra HD. From <strong>$12.99 CAD/month</strong>. Free 24h trial, no credit card."],
  'iptv-4k-canada.html':         ['4K IPTV Canada 2026',          "iptvv.online streams all 25,000+ channels in <strong>4K Ultra HD</strong> on every plan at no extra charge. Works on any 4K-compatible device. From $12.99 CAD/month. Free 24h trial."],
  'iptv-calgary.html':           ['IPTV Calgary 2026',            "iptvv.online delivers TSN, Sportsnet (Flames, Stampeders, Roughnecks), CBC, CTV and 25,000+ channels in Calgary. From <strong>$12.99 CAD/month</strong>. Free 24h trial, no credit card."],
  'iptv-ottawa.html':            ['IPTV Ottawa 2026',             "iptvv.online streams TSN, Sportsnet (Senators), CBC, CTV and 25,000+ channels in Ottawa. From <strong>$12.99 CAD/month</strong>. Free 24h trial, no credit card."],
  'iptv-smart-tv-canada.html':   ['IPTV Smart TV Canada 2026',   "iptvv.online works on Samsung, LG, and Android Smart TVs via IPTV Smarters Pro. No extra hardware needed. 25,000+ channels in 4K. From <strong>$12.99 CAD/month</strong>. Free 24h trial."],
  'iptv-sports-canada.html':     ['IPTV Sports Canada 2026',      "iptvv.online includes all Canadian sports live: TSN 1–5, Sportsnet (East, Pacific, Ontario, 360, ONE), RDS, TVA Sports — zero blackouts. From <strong>$12.99 CAD/month</strong>. Free 24h trial."],
  'iptv-vancouver.html':         ['IPTV Vancouver 2026',          "iptvv.online streams TSN, Sportsnet Pacific (Canucks, BC Lions), CBC, CTV and 25,000+ channels in Vancouver. From <strong>$12.99 CAD/month</strong>. Free 24h trial, no credit card."],
  'iptv-vs-cable-canada.html':   ['IPTV vs Cable Canada 2026',   "IPTV Canada costs <strong>$12.99/month</strong> vs cable at $80–$120/month. Same Canadian channels (TSN, Sportsnet, RDS), more content, zero regional blackouts. Try iptvv.online free for 24h."],
  'iptv-vs-netflix-canada.html': ['IPTV vs Netflix Canada 2026', "iptvv.online IPTV gives you live TV + 120,000+ on-demand titles for <strong>$12.99 CAD/month</strong> vs Netflix Canada at $16.99–$22.99. TSN, RDS, CBC, Sportsnet all included."],
  'is-iptv-legal-canada.html':   ['Is IPTV Legal in Canada?',    "Yes — using a <strong>licensed IPTV service</strong> in Canada is completely legal. iptvv.online operates as a licensed reseller with full terms of service. From $12.99 CAD/month. Free 24h trial."],
  'pricing.html':                ['IPTV Canada Pricing 2026',     "iptvv.online: <strong>$12.99 CAD/month</strong> (1 connection) · $39.99 for 3 months · $44.99 for 6 months — BEST VALUE · $69.99/year (4 connections). Free 24h trial. Interac e-Transfer accepted."],
};

const CTA_HTML = `
<!-- CTA BOX -->
<div style="background:linear-gradient(135deg,rgba(0,229,255,.1),rgba(0,100,140,.1));border:1px solid rgba(0,229,255,.2);border-radius:22px;padding:48px;text-align:center;margin:48px 0">
  <h2 style="font-family:'Bebas Neue',cursive;font-size:clamp(34px,4vw,52px);letter-spacing:.02em;text-transform:uppercase;margin-bottom:12px">Start Your <span style="color:#00e5ff">Free Trial Today</span></h2>
  <p style="color:rgba(255,255,255,.55);font-size:15px;margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto">24 hours full access. No credit card. No contract. Cancel anytime.</p>
  <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
    <a href="/free-trial.html" style="display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:100px;font-weight:700;font-size:15px;background:#00e5ff;color:#050508;text-decoration:none">🎁 Free 24h Trial</a>
    <a href="https://wa.me/212776056268?text=Hi!%20I%20want%20to%20subscribe%20to%20iptvv.online%20IPTV%20Canada." target="_blank" style="display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:100px;font-weight:700;font-size:15px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.2);text-decoration:none">💬 WhatsApp Us</a>
  </div>
</div>`;

let qaAdded = 0;
let ctaAdded = 0;

Object.entries(QA).forEach(([file, [keyword, answer]]) => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) { console.log(`⚠  Not found: ${file}`); return; }

  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. Quick Answer — skip if already has one
  if (!html.includes('class="ab"') && !html.includes('Quick Answer')) {
    const qaHTML = `
<!-- QUICK ANSWER -->
<div style="background:linear-gradient(135deg,rgba(0,229,255,.07),rgba(0,100,140,.06));border:1px solid rgba(0,229,255,.25);border-radius:14px;padding:22px 26px;margin:32px 0">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#00e5ff;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px">📌 Quick Answer</div>
  <p style="font-size:15px;line-height:1.75;color:rgba(255,255,255,.85)"><strong>${keyword}</strong> — ${answer}</p>
</div>`;

    if (html.includes('</h1>')) {
      html = html.replace('</h1>', '</h1>' + qaHTML);
      qaAdded++;
      changed = true;
      console.log(`✅ QA: ${file}`);
    } else {
      console.log(`⚠  No h1 in: ${file}`);
    }
  }

  // 2. CTA box — only for pricing.html
  if (file === 'pricing.html') {
    const hasCTA = html.includes('cta-box') || html.includes('cta-b"') || html.includes('cta-banner');
    if (!hasCTA) {
      // Insert before faq-list
      if (html.includes('class="faq-list"')) {
        html = html.replace('class="faq-list"', 'class="faq-list-placeholder"');
        html = html.replace('class="faq-list-placeholder"', CTA_HTML.trim() + '\n<div class="faq-list"');
        // cleanup the extra opening div tag
        html = html.replace('<div class="faq-list"', '<div class="faq-list"');
        ctaAdded++;
        changed = true;
        console.log(`✅ CTA: pricing.html`);
      }
    }
  }

  if (changed) fs.writeFileSync(fp, html, 'utf8');
});

console.log(`\n── DONE ──`);
console.log(`Quick Answer added : ${qaAdded} pages`);
console.log(`CTA added          : ${ctaAdded} pages`);
