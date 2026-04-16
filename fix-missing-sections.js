const fs = require('fs');
const path = require('path');
const dir = __dirname;

const SKIP = ['404.html','googledda038c80d70f368.html','checkout.html','blog.html',
  'contact.html','canada-iptv-app.html','canada-iptv-box.html',
  'canada-iptv-crackdown.html','canada-iptv-m3u.html','is-canada-iptv-legit.html',
  'fix-seo.js','fix-missing-sections.js'];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !SKIP.includes(f));

// ── Related links per page type ───────────────────────────────────────────
function getRelatedLinks(file) {
  const f = file.toLowerCase();
  let links = [];

  if (f.includes('toronto'))
    links = ['/iptv-ontario.html|IPTV Ontario','/iptv-ottawa.html|IPTV Ottawa','/tsn-iptv-canada.html|TSN IPTV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('montreal'))
    links = ['/iptv-quebec.html|IPTV Québec','/rds-iptv-canada.html|RDS IPTV','/french-channels-iptv-canada.html|French Channels','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('calgary'))
    links = ['/iptv-alberta.html|IPTV Alberta','/tsn-iptv-canada.html|TSN IPTV','/iptv-sports-canada.html|IPTV Sports','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('ottawa'))
    links = ['/iptv-ontario.html|IPTV Ontario','/iptv-toronto.html|IPTV Toronto','/tsn-iptv-canada.html|TSN IPTV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('vancouver'))
    links = ['/iptv-bc.html|IPTV BC','/tsn-iptv-canada.html|TSN IPTV','/iptv-sports-canada.html|IPTV Sports','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('ontario'))
    links = ['/iptv-toronto.html|IPTV Toronto','/iptv-ottawa.html|IPTV Ottawa','/tsn-iptv-canada.html|TSN IPTV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('quebec'))
    links = ['/iptv-montreal.html|IPTV Montréal','/rds-iptv-canada.html|RDS IPTV','/french-channels-iptv-canada.html|French Channels','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('alberta'))
    links = ['/iptv-calgary.html|IPTV Calgary','/tsn-iptv-canada.html|TSN IPTV','/iptv-sports-canada.html|IPTV Sports','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('iptv-bc'))
    links = ['/iptv-vancouver.html|IPTV Vancouver','/tsn-iptv-canada.html|TSN IPTV','/iptv-sports-canada.html|IPTV Sports','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('tsn'))
    links = ['/rds-iptv-canada.html|RDS IPTV','/nhl-iptv-canada.html|NHL IPTV','/iptv-sports-canada.html|IPTV Sports Canada','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('rds'))
    links = ['/tsn-iptv-canada.html|TSN IPTV','/french-channels-iptv-canada.html|French Channels','/iptv-montreal.html|IPTV Montréal','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('nhl'))
    links = ['/tsn-iptv-canada.html|TSN IPTV','/iptv-sports-canada.html|IPTV Sports','/iptv-canada.html|IPTV Canada','/best-iptv-canada.html|Best IPTV Canada'];
  else if (f.includes('sports'))
    links = ['/tsn-iptv-canada.html|TSN IPTV','/rds-iptv-canada.html|RDS IPTV','/nhl-iptv-canada.html|NHL IPTV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('4k'))
    links = ['/best-iptv-canada.html|Best IPTV Canada','/iptv-firestick-canada.html|IPTV Firestick','/iptv-smart-tv-canada.html|IPTV Smart TV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('french'))
    links = ['/rds-iptv-canada.html|RDS IPTV','/iptv-montreal.html|IPTV Montréal','/iptv-quebec.html|IPTV Québec','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('firestick'))
    links = ['/iptv-smart-tv-canada.html|IPTV Smart TV','/iptv-smarters-canada.html|IPTV Smarters','/iptv-canada.html|IPTV Canada','/best-iptv-canada.html|Best IPTV Canada'];
  else if (f.includes('smart-tv'))
    links = ['/iptv-firestick-canada.html|IPTV Firestick','/iptv-samsung-tv-canada.html|Samsung TV IPTV','/iptv-smarters-canada.html|IPTV Smarters','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('smarters'))
    links = ['/iptv-firestick-canada.html|IPTV Firestick','/iptv-smart-tv-canada.html|IPTV Smart TV','/what-is-iptv-canada.html|What is IPTV','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('samsung'))
    links = ['/iptv-smart-tv-canada.html|IPTV Smart TV','/iptv-firestick-canada.html|IPTV Firestick','/iptv-smarters-canada.html|IPTV Smarters','/iptv-canada.html|IPTV Canada'];
  else if (f.includes('legal') || f.includes('legit') || f.includes('vpn'))
    links = ['/best-iptv-canada.html|Best IPTV Canada','/what-is-iptv-canada.html|What is IPTV','/iptv-canada.html|IPTV Canada','/channels.html|All Channels'];
  else if (f.includes('vs-cable') || f.includes('vs-netflix'))
    links = ['/best-iptv-canada.html|Best IPTV Canada','/cheap-iptv-canada.html|Cheap IPTV Canada','/iptv-canada.html|IPTV Canada','/channels.html|All Channels'];
  else if (f.includes('cheap'))
    links = ['/best-iptv-canada.html|Best IPTV Canada','/pricing.html|Pricing','/iptv-canada.html|IPTV Canada','/channels.html|All Channels'];
  else if (f.includes('trial') || f.includes('free'))
    links = ['/pricing.html|Pricing','/channels.html|All Channels','/iptv-canada.html|IPTV Canada','/best-iptv-canada.html|Best IPTV Canada'];
  else if (f.includes('subscription') || f.includes('premium') || f.includes('providers'))
    links = ['/pricing.html|Pricing','/best-iptv-canada.html|Best IPTV Canada','/iptv-canada.html|IPTV Canada','/channels.html|All Channels'];
  else
    links = ['/best-iptv-canada.html|Best IPTV Canada','/channels.html|All Channels','/iptv-canada.html|IPTV Canada','/tsn-iptv-canada.html|TSN IPTV'];

  // Always append free-trial + pricing if not already in list
  if (!links.some(l => l.includes('free-trial'))) links.push('/free-trial.html|Free 24h Trial');
  if (!links.some(l => l.includes('pricing')))    links.push('/pricing.html|Pricing');

  return links.map(l => {
    const [href, text] = l.split('|');
    return `<a href="${href}" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;color:#fff;text-decoration:none">${text}</a>`;
  }).join('\n      ');
}

// ── Steps content per page type ────────────────────────────────────────────
function getStepsContent(file) {
  const f = file.toLowerCase();
  let title = 'How to Get Started';
  let titleAccent = 'with IPTV Canada';
  let steps = [
    ['Request Your Free 24h Trial','Visit <a href="/free-trial.html" style="color:#00e5ff">iptvv.online/free-trial.html</a> — no credit card. We activate your account within minutes.'],
    ['Choose Your Device','Works on Firestick, Smart TV, Android, iPhone, Apple TV, MAG box, or PC. No special hardware needed.'],
    ['Install IPTV Smarters Pro','Download IPTV Smarters Pro (free) from your app store. Enter the login we send you — takes 2 minutes.'],
    ['Start Streaming','Browse 25,000+ live channels, 120,000+ on-demand titles, and catch-up TV. No contracts, cancel anytime.'],
  ];

  if (f.includes('legal') || f.includes('legit')) {
    title = 'How to Choose'; titleAccent = 'a Legal IPTV Service';
    steps = [
      ['Check the Provider is Licensed','Look for clear terms of service, a real support channel, and transparent pricing in CAD.'],
      ['Look for a Free Trial or Refund Policy','Legitimate services offer a 24h trial or 30-day money-back guarantee — iptvv.online offers both.'],
      ['Avoid Free Premium Services','If a service offers TSN, Sportsnet, RDS for free — it\'s almost certainly unlicensed. Paid licensed services start at $12.99 CAD.'],
      ['Try iptvv.online Free for 24 Hours','Canada\'s #1 legal IPTV reseller. No credit card trial — full access to all 25,000+ channels.'],
    ];
  } else if (f.includes('vpn')) {
    title = 'Do You Need a VPN'; titleAccent = 'for IPTV in Canada?';
    steps = [
      ['Get Your iptvv.online Subscription','Start with a free 24h trial — no credit card. iptvv.online works without a VPN on any Canadian ISP.'],
      ['Optional: Choose a Trusted VPN','If you want extra privacy, ExpressVPN or NordVPN both work with IPTV Smarters. Avoid free VPNs.'],
      ['Connect to a Canadian Server','For best speeds, connect to a Canadian VPN server before launching your IPTV app.'],
      ['Stream Without Interruptions','iptvv.online delivers 4K quality with or without a VPN on Bell, Rogers, Videotron, or Telus.'],
    ];
  } else if (f.includes('vs-cable')) {
    title = 'How to Switch'; titleAccent = 'from Cable to IPTV';
    steps = [
      ['Try IPTV Free for 24 Hours','Get your free trial at iptvv.online/free-trial.html. Compare side-by-side with your current cable.'],
      ['Note Your Cable Contract End Date','Call Bell/Rogers/Videotron to find your cancellation date — no early fees if you\'re out of contract.'],
      ['Set Up IPTV on Your TV','Install IPTV Smarters on your Smart TV, Firestick, or Android box in under 2 minutes.'],
      ['Cancel Cable and Save $60–$100/Month','Same Canadian channels. More content. Zero blackouts. At $12.99/month vs $80–$120/month.'],
    ];
  } else if (f.includes('vs-netflix')) {
    title = 'IPTV vs Netflix'; titleAccent = 'How to Get Both';
    steps = [
      ['Get Your Free IPTV Trial','Visit iptvv.online/free-trial.html — full access to live TV + on-demand. No card required.'],
      ['Install IPTV Smarters Pro','Free app on any device. Enter your login — setup in 2 minutes.'],
      ['Keep or Drop Netflix','IPTV gives you 120,000+ movies and series on-demand. Many subscribers cancel Netflix after switching.'],
      ['Save $15–$50/Month','IPTV at $12.99 CAD/month replaces both cable TV and most streaming services.'],
    ];
  } else if (f.includes('sports') || f.includes('nhl') || f.includes('tsn') || f.includes('rds')) {
    title = 'How to Watch'; titleAccent = 'Canadian Sports on IPTV';
    steps = [
      ['Get Your Free 24h Trial','Full access to TSN 1–5, Sportsnet, RDS, TVA Sports — no credit card at <a href="/free-trial.html" style="color:#00e5ff">free-trial.html</a>.'],
      ['Install on Your TV or Device','Download IPTV Smarters Pro on Firestick, Smart TV, or phone. Login in 2 minutes.'],
      ['Browse the Sports EPG Guide','Filter channels by sport or team. TSN, Sportsnet, RDS schedules updated in real-time.'],
      ['Watch Live with Zero Blackouts','Every NHL, CFL, NBA, MLB game live — no regional blackouts, no extra sports packages needed.'],
    ];
  } else if (f.includes('ontario') || f.includes('quebec') || f.includes('alberta') || f.includes('iptv-bc') ||
             f.includes('toronto') || f.includes('montreal') || f.includes('calgary') || f.includes('ottawa') || f.includes('vancouver')) {
    title = 'How to Get IPTV'; titleAccent = 'in Canada';
    steps = [
      ['Get Your Free 24h Trial','Visit <a href="/free-trial.html" style="color:#00e5ff">iptvv.online/free-trial.html</a> — no credit card. Full access to all Canadian channels.'],
      ['Choose Your Device','Works on any device: Firestick, Smart TV, Android, iPhone, Apple TV, MAG box, or PC.'],
      ['Install IPTV Smarters Pro','Free app from your device\'s app store. Enter your login — setup takes under 2 minutes.'],
      ['Stream Local + National Channels','CBC, CTV, TSN, Sportsnet, RDS and 25,000+ channels. No contracts. Cancel anytime.'],
    ];
  } else if (f.includes('4k')) {
    title = 'How to Watch'; titleAccent = '4K IPTV in Canada';
    steps = [
      ['Check Your Internet Speed','4K streaming needs 25 Mbps or more. Bell Fibe, Rogers Ignite, and Telus PureFibre all qualify.'],
      ['Get Your Free 24h Trial','Visit <a href="/free-trial.html" style="color:#00e5ff">iptvv.online/free-trial.html</a> — all plans include 4K Ultra HD at no extra cost.'],
      ['Use a 4K-Compatible Device','Apple TV 4K, Nvidia Shield, Firestick 4K Max, or any 4K Android TV box. All work with IPTV Smarters.'],
      ['Enable 4K in App Settings','In IPTV Smarters, select your 4K channel playlist. Enjoy 4K HDR on CBC, TSN, and more.'],
    ];
  } else if (f.includes('cheap') || f.includes('pricing') || f.includes('subscription') || f.includes('premium')) {
    title = 'How to Save Money'; titleAccent = 'on IPTV Canada';
    steps = [
      ['Compare Plans Before Buying','iptvv.online starts at $12.99 CAD/month. The 6-month plan at $44.99 saves you the most.'],
      ['Use the Free Trial First','Test all 25,000+ channels free for 24h at <a href="/free-trial.html" style="color:#00e5ff">free-trial.html</a> — no card, no risk.'],
      ['Choose the 6-Month Plan','$44.99 CAD for 3 connections ($7.50/month each) — the best value on any Canadian IPTV plan.'],
      ['Pay with Interac e-Transfer','No credit card fees. Just send an Interac payment and we activate in minutes.'],
    ];
  }

  const stepsHTML = steps.map(([title, desc], i) => `
    <div style="display:flex;gap:18px;align-items:flex-start;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px 22px">
      <div style="min-width:38px;height:38px;border-radius:50%;background:rgba(0,229,255,.12);border:2px solid #00e5ff;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',cursive;font-size:20px;color:#00e5ff;flex-shrink:0">${i+1}</div>
      <div>
        <div style="font-weight:800;font-size:15px;margin-bottom:5px">${title}</div>
        <div style="font-size:13px;color:rgba(255,255,255,.55);line-height:1.7">${desc}</div>
      </div>
    </div>`).join('');

  return `
<!-- STEPS SECTION -->
<div style="margin:44px 0">
  <h2 style="font-family:'Bebas Neue',cursive;font-size:clamp(28px,3.5vw,44px);letter-spacing:.02em;text-transform:uppercase;margin-bottom:24px">${title} <span style="color:#00e5ff">${titleAccent}</span></h2>
  <div style="display:flex;flex-direction:column;gap:14px">
    ${stepsHTML}
  </div>
</div>`;
}

// ── Build See Also HTML ───────────────────────────────────────────────────
function buildSeeAlso(file) {
  const links = getRelatedLinks(file);
  return `
<!-- SEE ALSO -->
<div style="max-width:1140px;margin:0 auto;padding:0 24px 48px">
  <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px 24px;margin:32px 0">
    <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:12px">📖 Related Guides</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${links}
    </div>
  </div>
</div>`;
}

// ── Main loop ─────────────────────────────────────────────────────────────
let seeAlsoAdded = 0;
let stepsAdded = 0;

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. SEE ALSO — skip if already present
  const hasSeeAlso = html.includes('see-also') || html.includes('Related Guides');
  if (!hasSeeAlso) {
    // Insert just before <footer
    if (html.includes('<footer')) {
      html = html.replace(/(<footer)/, buildSeeAlso(file) + '\n$1');
      seeAlsoAdded++;
      changed = true;
    }
  }

  // 2. STEPS — skip if already present
  const hasSteps = html.includes('class="steps"') || html.includes('class="step "') ||
                   html.includes('<!-- STEPS') || html.includes('step-num');
  if (!hasSteps) {
    const stepsHTML = getStepsContent(file);
    // Try inserting before faq-list → faq-item → cta-box → cta-b → footer
    if (html.includes('class="faq-list"')) {
      html = html.replace(/(<div class="faq-list")/, stepsHTML + '\n$1');
      stepsAdded++; changed = true;
    } else if (html.includes('class="faq-item')) {
      html = html.replace(/(<div class="faq-item)/, stepsHTML + '\n$1');
      stepsAdded++; changed = true;
    } else if (html.includes('class="cta-box"')) {
      html = html.replace(/(<div class="cta-box")/, stepsHTML + '\n$1');
      stepsAdded++; changed = true;
    } else if (html.includes('class="cta-b"')) {
      html = html.replace(/(<div class="cta-b")/, stepsHTML + '\n$1');
      stepsAdded++; changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    const seeAlsoTag = !hasSeeAlso ? '[SEE-ALSO]' : '';
    const stepsTag   = !hasSteps   ? '[STEPS]'    : '';
    console.log(`✅ ${file} ${seeAlsoTag} ${stepsTag}`);
  }
});

console.log(`\n── DONE ──`);
console.log(`See Also added : ${seeAlsoAdded} pages`);
console.log(`Steps added    : ${stepsAdded} pages`);
