const fs = require('fs');
const path = require('path');

// ── SEE ALSO per page ─────────────────────────────────────────────────────
const SEE_ALSO = {
  'index.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
  ],
  'best-iptv-canada.html': [
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/iptv-vs-cable-canada.html',text:'IPTV vs Cable'},
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'cheap-iptv-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/pricing.html',text:'View All Plans'},
    {href:'/iptv-vs-cable-canada.html',text:'IPTV vs Cable Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
    {href:'/channels.html',text:'Channel List'},
  ],
  'free-trial.html': [
    {href:'/pricing.html',text:'View All Plans'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/iptv-firestick-canada.html',text:'Set Up on Firestick'},
    {href:'/iptv-smart-tv-canada.html',text:'Set Up on Smart TV'},
  ],
  'free-iptv-trial-30-days.html': [
    {href:'/free-trial.html',text:'Free 24h Trial'},
    {href:'/pricing.html',text:'View All Plans'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/checkout.html',text:'Subscribe Now'},
  ],
  'channels.html': [
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/french-channels-iptv-canada.html',text:'French Channels'},
    {href:'/iptv-4k-canada.html',text:'4K IPTV Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'pricing.html': [
    {href:'/free-trial.html',text:'Free 24h Trial'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/checkout.html',text:'Subscribe Now'},
  ],
  'is-iptv-legal-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best Legal IPTV Canada'},
    {href:'/legal-iptv-canada.html',text:'Legal IPTV Canada'},
    {href:'/is-canada-iptv-legit.html',text:'Is Canada IPTV Legit?'},
    {href:'/canada-iptv-crackdown.html',text:'IPTV Crackdown Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'tsn-iptv-canada.html': [
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/nhl-iptv-canada.html',text:'NHL IPTV Canada'},
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'rds-iptv-canada.html': [
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/french-channels-iptv-canada.html',text:'French Channels IPTV'},
    {href:'/iptv-quebec.html',text:'IPTV Québec'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'french-channels-iptv-canada.html': [
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/iptv-quebec.html',text:'IPTV Québec'},
    {href:'/iptv-montreal.html',text:'IPTV Montréal'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'legal-iptv-canada.html': [
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/is-canada-iptv-legit.html',text:'Is Canada IPTV Legit?'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/canada-iptv-crackdown.html',text:'IPTV Crackdown 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-sports-canada.html': [
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/nhl-iptv-canada.html',text:'NHL IPTV Canada'},
    {href:'/iptv-4k-canada.html',text:'4K IPTV Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-4k-canada.html': [
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/iptv-smart-tv-canada.html',text:'IPTV on Smart TV'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-firestick-canada.html': [
    {href:'/iptv-smart-tv-canada.html',text:'IPTV on Smart TV'},
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-smart-tv-canada.html': [
    {href:'/iptv-firestick-canada.html',text:'IPTV on Firestick'},
    {href:'/iptv-samsung-tv-canada.html',text:'IPTV Samsung TV'},
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-vs-cable-canada.html': [
    {href:'/iptv-vs-netflix-canada.html',text:'IPTV vs Netflix Canada'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/pricing.html',text:'IPTV Pricing'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-vs-netflix-canada.html': [
    {href:'/iptv-vs-cable-canada.html',text:'IPTV vs Cable Canada'},
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-ontario.html': [
    {href:'/iptv-toronto.html',text:'IPTV Toronto'},
    {href:'/iptv-ottawa.html',text:'IPTV Ottawa'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-quebec.html': [
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/french-channels-iptv-canada.html',text:'French Channels IPTV'},
    {href:'/iptv-montreal.html',text:'IPTV Montréal'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-alberta.html': [
    {href:'/iptv-calgary.html',text:'IPTV Calgary'},
    {href:'/iptv-bc.html',text:'IPTV BC'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-bc.html': [
    {href:'/iptv-vancouver.html',text:'IPTV Vancouver'},
    {href:'/iptv-alberta.html',text:'IPTV Alberta'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-toronto.html': [
    {href:'/iptv-ontario.html',text:'IPTV Ontario'},
    {href:'/iptv-ottawa.html',text:'IPTV Ottawa'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-montreal.html': [
    {href:'/iptv-quebec.html',text:'IPTV Québec'},
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/french-channels-iptv-canada.html',text:'French Channels'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-calgary.html': [
    {href:'/iptv-alberta.html',text:'IPTV Alberta'},
    {href:'/iptv-vancouver.html',text:'IPTV Vancouver'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-ottawa.html': [
    {href:'/iptv-ontario.html',text:'IPTV Ontario'},
    {href:'/iptv-toronto.html',text:'IPTV Toronto'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-vancouver.html': [
    {href:'/iptv-bc.html',text:'IPTV BC'},
    {href:'/iptv-calgary.html',text:'IPTV Calgary'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'what-is-iptv-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/iptv-vs-cable-canada.html',text:'IPTV vs Cable Canada'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-smarters-canada.html': [
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/iptv-smart-tv-canada.html',text:'IPTV Smart TV Canada'},
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/canada-iptv-m3u.html',text:'Canada IPTV M3U'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'do-i-need-vpn-for-iptv.html': [
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/what-is-iptv-canada.html',text:'What is IPTV Canada?'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'blog.html': [
    {href:'/canada-iptv-crackdown.html',text:'IPTV Crackdown Canada 2026'},
    {href:'/is-canada-iptv-legit.html',text:'Is Canada IPTV Legit?'},
    {href:'/canada-iptv-m3u.html',text:'Canada IPTV M3U Guide'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'contact.html': [
    {href:'/free-trial.html',text:'Start Free Trial'},
    {href:'/pricing.html',text:'View Plans'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/blog.html',text:'IPTV Blog'},
  ],
  'checkout.html': [
    {href:'/pricing.html',text:'View All Plans'},
    {href:'/free-trial.html',text:'Free 24h Trial First'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/contact.html',text:'Need Help?'},
  ],
  'canada-iptv-app.html': [
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/canada-iptv-box.html',text:'Best IPTV Box Canada'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/canada-iptv-m3u.html',text:'Canada IPTV M3U'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'canada-iptv-box.html': [
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/iptv-smart-tv-canada.html',text:'IPTV Smart TV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'canada-iptv-crackdown.html': [
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/legal-iptv-canada.html',text:'Legal IPTV Canada'},
    {href:'/is-canada-iptv-legit.html',text:'Is Canada IPTV Legit?'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'canada-iptv-m3u.html': [
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'is-canada-iptv-legit.html': [
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/canada-iptv-crackdown.html',text:'IPTV Crackdown 2026'},
    {href:'/legal-iptv-canada.html',text:'Legal IPTV Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'nhl-iptv-canada.html': [
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/rds-iptv-canada.html',text:'RDS IPTV Canada'},
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/cheap-iptv-canada.html',text:'Cheap IPTV Canada'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-canada-premium.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/iptv-4k-canada.html',text:'4K IPTV Canada'},
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-fox-canada.html': [
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-free-apk-canada.html': [
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-host-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/iptv-providers-canada.html',text:'IPTV Providers Canada'},
    {href:'/legal-iptv-canada.html',text:'Legal IPTV Canada'},
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-live-canada.html': [
    {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
    {href:'/iptv-sports-canada.html',text:'Sports Channels Canada'},
    {href:'/channels.html',text:'Full Channel List'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-providers-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/is-iptv-legal-canada.html',text:'Is IPTV Legal Canada?'},
    {href:'/iptv-vs-cable-canada.html',text:'IPTV vs Cable Canada'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-samsung-tv-canada.html': [
    {href:'/iptv-smart-tv-canada.html',text:'IPTV Smart TV Canada'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-sonix-canada.html': [
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/iptv-providers-canada.html',text:'IPTV Providers Canada'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'iptv-subscription-canada.html': [
    {href:'/pricing.html',text:'Plans & Pricing'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/cheap-iptv-canada.html',text:'Cheapest IPTV Canada'},
    {href:'/channels.html',text:'Channel List'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
  'play-iptv-canada.html': [
    {href:'/canada-iptv-app.html',text:'Best Canada IPTV App'},
    {href:'/iptv-smarters-canada.html',text:'IPTV Smarters Canada'},
    {href:'/iptv-firestick-canada.html',text:'IPTV Firestick Canada'},
    {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
    {href:'/free-trial.html',text:'Free 24h Trial'},
  ],
};

// ── STEPS per page ────────────────────────────────────────────────────────
const STEPS = {
  'index.html':{title:'How to Start Watching IPTV Canada',steps:[
    {n:'1',h:'Choose a Plan',p:'Pick Monthly ($12.99), 6-Month ($44.99), or Yearly ($69.99) at <a href="/pricing.html">iptvv.online/pricing</a>.'},
    {n:'2',h:'Activate Free Trial',p:'Get a free 24-hour trial via WhatsApp — no credit card required. Instant access to 25,000+ channels.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download the IPTV Smarters Pro app on your Firestick, Smart TV, Android, iPhone, or PC.'},
    {n:'4',h:'Watch Live TV',p:'Enter your M3U credentials, browse 25,000+ channels, and stream CBC, TSN, RDS in 4K.'},
  ]},
  'best-iptv-canada.html':{title:'How to Choose the Best IPTV Canada',steps:[
    {n:'1',h:'Compare Services',p:'Check uptime, Canadian channel count (TSN, RDS, CBC), and price. iptvv.online leads with 99.9% uptime and 25,000+ channels.'},
    {n:'2',h:'Test Free Trial',p:'All top services offer a trial. Get 24 hours free via WhatsApp — no card needed.'},
    {n:'3',h:'Check Device Support',p:'Confirm Firestick, Smart TV, Android, iOS are all supported before subscribing.'},
    {n:'4',h:'Subscribe & Install',p:'Choose a plan from $12.99 CAD/month and set up on your device in under 5 minutes.'},
  ]},
  'cheap-iptv-canada.html':{title:'How to Get Cheap IPTV in Canada',steps:[
    {n:'1',h:'Compare Plans',p:'Monthly ($12.99), 6-Month ($44.99 = $7.50/mo), Yearly ($69.99 = $5.83/mo). Longer = cheaper.'},
    {n:'2',h:'Use Free Trial',p:'Test before paying — 24-hour trial via WhatsApp, no credit card required.'},
    {n:'3',h:'Go Annual',p:'The $69.99/year plan saves 55% vs monthly — best value IPTV Canada has to offer.'},
    {n:'4',h:'Install & Save',p:'Set up on Firestick, Smart TV, or Android in under 5 minutes and cancel Rogers/Bell.'},
  ]},
  'free-trial.html':{title:'How to Activate Your Free IPTV Trial',steps:[
    {n:'1',h:'Click Free Trial',p:'Hit "Start Free Trial" — no credit card required. Instant activation via WhatsApp.'},
    {n:'2',h:'Receive Credentials',p:'Get your trial M3U URL on WhatsApp within 5 minutes.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro and enter your M3U credentials.'},
    {n:'4',h:'Test 25,000+ Channels',p:'Browse CBC, TSN, RDS, and 4K channels free for 24 hours. No commitment.'},
  ]},
  'free-iptv-trial-30-days.html':{title:'How to Get 30 Days Free IPTV Canada',steps:[
    {n:'1',h:'Start with 24h Trial',p:'Activate the free 24-hour trial via WhatsApp — instant, no credit card required.'},
    {n:'2',h:'Test All Channels',p:'Test CBC, TSN, RDS, 4K sports, and French channels during your trial period.'},
    {n:'3',h:'Subscribe Monthly',p:'If satisfied, subscribe for $12.99 CAD/month — cancel anytime with 30-day money back.'},
    {n:'4',h:'Enjoy Full Access',p:'25,000+ channels, TSN 1-5, RDS, 4K Ultra HD — all included, no contracts.'},
  ]},
  'channels.html':{title:'How to Browse the Full Channel List',steps:[
    {n:'1',h:'Activate Free Trial',p:'Start your 24h free trial to access the complete 25,000+ channel list instantly.'},
    {n:'2',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on your device and enter your M3U credentials.'},
    {n:'3',h:'Browse by Category',p:'Use the built-in EPG to filter Sports, News, Entertainment, Kids, and French channels.'},
    {n:'4',h:'Add to Favourites',p:'Bookmark TSN, CBC, RDS, and Sportsnet for one-tap access during live events.'},
  ]},
  'pricing.html':{title:'How to Subscribe to iptvv.online',steps:[
    {n:'1',h:'Select Your Plan',p:'Choose Monthly ($12.99), 6-Month ($44.99), or Yearly ($69.99). All plans: 25,000+ channels.'},
    {n:'2',h:'Complete Checkout',p:'Pay via credit card, PayPal, Crypto, or Interac e-Transfer. Instant activation after payment.'},
    {n:'3',h:'Receive Login Details',p:'Get your M3U URL and credentials by WhatsApp or email within 2 minutes.'},
    {n:'4',h:'Start Watching',p:'Install IPTV Smarters on Firestick, Smart TV, or Android and start streaming immediately.'},
  ]},
  'is-iptv-legal-canada.html':{title:'How to Use Legal IPTV in Canada',steps:[
    {n:'1',h:'Choose a Licensed Service',p:'Use only services that operate transparently with a real website, support, and pricing — like iptvv.online.'},
    {n:'2',h:'Avoid Piracy Services',p:'Steer clear of free IPTV services or Telegram-only sellers — these violate Canadian copyright law.'},
    {n:'3',h:'Subscribe to iptvv.online',p:'25,000+ channels with full compliance from $12.99 CAD/month. Free 24h trial available.'},
    {n:'4',h:'Watch with Confidence',p:'Enjoy CBC, CTV, TSN, RDS legally on Firestick, Smart TV, Android, or iOS — no legal risk.'},
  ]},
  'tsn-iptv-canada.html':{title:'How to Watch TSN Without Cable in Canada',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'All 5 TSN channels (TSN 1-5) included in every plan from $12.99 CAD/month.'},
    {n:'2',h:'Activate Free 24h Trial',p:'Test TSN 1-5 free for 24 hours via WhatsApp — no credit card, instant activation.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on your Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch TSN Live in 4K',p:'Stream every NHL game, CFL, NBA Raptors, and NFL on TSN — zero blackouts, 4K quality.'},
  ]},
  'rds-iptv-canada.html':{title:'Comment Regarder RDS Sans Câble',steps:[
    {n:'1',h:'S\'abonner à iptvv.online',p:'RDS, RDS2, et TVA Sports inclus dans tous les forfaits dès 12,99$ CAD/mois.'},
    {n:'2',h:'Essai Gratuit 24h',p:'Testez RDS gratuitement via WhatsApp — sans carte bancaire, activation instantanée.'},
    {n:'3',h:'Installer IPTV Smarters',p:'Téléchargez IPTV Smarters Pro sur votre Firestick, Smart TV, ou Android en 5 minutes.'},
    {n:'4',h:'Regarder RDS en 4K',p:'Chaque match des Canadiens, de la LCF, et du soccer sur RDS — sans coupures, qualité 4K.'},
  ]},
  'french-channels-iptv-canada.html':{title:'How to Get French IPTV Channels in Canada',steps:[
    {n:'1',h:'Choose iptvv.online',p:'500+ French Canadian channels: RDS, TVA, ICI Radio-Canada, RDI, Canal Vie, Évasion — all included.'},
    {n:'2',h:'Activate Free Trial',p:'Test all French channels free for 24 hours — no credit card needed.'},
    {n:'3',h:'Install IPTV Smarters',p:'Set up on your Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Filter by Language',p:'Use the "FR" category in IPTV Smarters to find all 500+ French channels instantly.'},
  ]},
  'legal-iptv-canada.html':{title:'How to Find a Legal IPTV Reseller in Canada',steps:[
    {n:'1',h:'Check for Real Website',p:'Legit resellers have a proper site, pricing page, and verifiable support — not just Telegram.'},
    {n:'2',h:'Look for Free Trial',p:'A legitimate service offers a risk-free trial. iptvv.online gives 24 hours free via WhatsApp.'},
    {n:'3',h:'Test Canadian Channels',p:'Verify CBC, CTV, TSN, and RDS all work in HD during the trial before subscribing.'},
    {n:'4',h:'Subscribe Securely',p:'Pay via Stripe, PayPal, or Interac e-Transfer. Never send crypto without a real website.'},
  ]},
  'iptv-sports-canada.html':{title:'How to Watch Canadian Sports on IPTV',steps:[
    {n:'1',h:'Get iptvv.online',p:'TSN 1-5, Sportsnet East/Ontario/West/Pacific, RDS, TVA Sports — all included from $12.99 CAD/month.'},
    {n:'2',h:'Activate Free Trial',p:'Test all sports channels for 24 hours free — NHL, CFL, NBA, MLB, all available.'},
    {n:'3',h:'Install on Your Device',p:'Set up IPTV Smarters on Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch in 4K',p:'Enable 4K quality in the app settings for NHL playoffs and CFL games in Ultra HD.'},
  ]},
  'iptv-4k-canada.html':{title:'How to Watch 4K IPTV in Canada',steps:[
    {n:'1',h:'Check Your Speed',p:'4K streaming needs at least 25 Mbps. Run a speed test at fast.com before subscribing.'},
    {n:'2',h:'Get a 4K Device',p:'Use a 4K Firestick, Apple TV 4K, Nvidia Shield, or any Android TV box with 4K support.'},
    {n:'3',h:'Subscribe to iptvv.online',p:'500+ 4K channels from $12.99 CAD/month. Activate the free 24h trial to test first.'},
    {n:'4',h:'Enable 4K in the App',p:'Open IPTV Smarters → Settings → Video Quality → select 4K / Ultra HD for supported channels.'},
  ]},
  'iptv-firestick-canada.html':{title:'How to Install IPTV on Firestick Canada',steps:[
    {n:'1',h:'Enable Unknown Sources',p:'Firestick Settings → My Fire TV → Developer Options → Apps from Unknown Sources → ON.'},
    {n:'2',h:'Install Downloader App',p:'Search "Downloader" in the Firestick store — it\'s free. Used to sideload IPTV Smarters.'},
    {n:'3',h:'Download IPTV Smarters Pro',p:'Open Downloader, enter the IPTV Smarters APK URL, download and install it.'},
    {n:'4',h:'Enter Your M3U URL',p:'Open IPTV Smarters → Add User via M3U URL → paste your iptvv.online M3U link → Done.'},
  ]},
  'iptv-smart-tv-canada.html':{title:'How to Install IPTV on Smart TV Canada',steps:[
    {n:'1',h:'Identify Your TV Brand',p:'Samsung (Tizen), LG (webOS), Sony/TCL (Android TV) — each has a different install method.'},
    {n:'2',h:'Install the App',p:'Samsung: Smart IPTV. LG: SS IPTV. Android TV: IPTV Smarters from Google Play.'},
    {n:'3',h:'Enter M3U Credentials',p:'Open the app → Settings → add your iptvv.online M3U URL and port credentials.'},
    {n:'4',h:'Watch 25,000+ Channels',p:'Browse live TV, sports, and 4K channels including CBC, TSN, RDS, and Sportsnet.'},
  ]},
  'iptv-vs-cable-canada.html':{title:'How to Switch from Cable to IPTV in Canada',steps:[
    {n:'1',h:'Cancel Cable',p:'Contact Rogers, Bell, or Videotron and cancel. No early termination for month-to-month plans.'},
    {n:'2',h:'Start IPTV Free Trial',p:'Activate your 24-hour iptvv.online trial — confirm all your channels are included.'},
    {n:'3',h:'Install on Your Device',p:'Set up IPTV Smarters on your existing Smart TV, Firestick, or Android box. No new hardware needed.'},
    {n:'4',h:'Enjoy 80%+ Savings',p:'Pay $12.99/month instead of $80–$150 for cable. Same CBC, TSN, RDS — zero blackouts.'},
  ]},
  'iptv-vs-netflix-canada.html':{title:'How to Use Both IPTV and Netflix in Canada',steps:[
    {n:'1',h:'Keep Netflix for VOD',p:'Netflix is great for on-demand series and movies. Keep it if you use it regularly.'},
    {n:'2',h:'Add IPTV for Live TV',p:'IPTV covers what Netflix misses: live CBC, TSN, NHL, news, and 4K sports in real time.'},
    {n:'3',h:'Install Both on Your TV',p:'Run IPTV Smarters and Netflix side by side on your Firestick, Smart TV, or Android.'},
    {n:'4',h:'Compare Total Cost',p:'IPTV ($12.99) + Netflix ($17) = $30/month. Cable alone = $80–$150/month. IPTV wins.'},
  ]},
  'iptv-ontario.html':{title:'How to Set Up IPTV in Ontario',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Ontario IPTV from $12.99 CAD/month — CP24, CityTV, TVO, CBC Ontario, all included.'},
    {n:'2',h:'Activate Free Trial',p:'Test all Ontario channels (Leafs on TSN/Sportsnet, CP24, CityTV) free for 24 hours.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on your Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Ontario TV in 4K',p:'Access CP24, CityTV Toronto, CBC Ontario, and all Toronto sports in HD and 4K.'},
  ]},
  'iptv-quebec.html':{title:'Comment installer IPTV au Québec',steps:[
    {n:'1',h:'Choisir iptvv.online',p:'RDS, TVA Sports, ICI Radio-Canada, Canal Vie, Évasion et 500+ chaînes françaises. Dès 12,99$/mois.'},
    {n:'2',h:'Essai gratuit 24h',p:'Testez RDS et TVA Sports gratuitement via WhatsApp — sans carte bancaire.'},
    {n:'3',h:'Installer IPTV Smarters',p:'Téléchargez IPTV Smarters Pro sur votre Firestick, Smart TV, ou Android en 5 minutes.'},
    {n:'4',h:'Regarder en 4K',p:'Profitez du hockey, du soccer et de toutes vos émissions québécoises en HD et 4K.'},
  ]},
  'iptv-alberta.html':{title:'How to Set Up IPTV in Alberta',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Alberta IPTV from $12.99 CAD/month — Flames & Oilers on Sportsnet West, Global Calgary, CTV Edmonton.'},
    {n:'2',h:'Activate Free Trial',p:'Test Flames and Oilers games on Sportsnet West free for 24 hours. No credit card.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on your Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Alberta TV in 4K',p:'Global Calgary, CTV Edmonton, CBC Alberta, and all Alberta sports in HD and 4K.'},
  ]},
  'iptv-bc.html':{title:'How to Set Up IPTV in BC',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'BC IPTV from $12.99 CAD/month — Canucks on Sportsnet Pacific, Global BC, CHEK TV.'},
    {n:'2',h:'Activate Free Trial',p:'Test Canucks games on Sportsnet Pacific free for 24 hours. No credit card needed.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch BC Local TV',p:'Access Global BC, CHEK TV, CBC Vancouver, and 4K sports without a cable contract.'},
  ]},
  'iptv-toronto.html':{title:'How to Set Up IPTV in Toronto',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Toronto IPTV from $12.99 CAD/month — CP24, CityTV, CBC Toronto, TSN, Sportsnet, all Leafs games.'},
    {n:'2',h:'Activate Free Trial',p:'Test all Toronto channels free for 24 hours — Leafs, CP24, CityTV, instant access.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Toronto TV in 4K',p:'Every Leafs game, Raptors, Blue Jays, CP24, CityTV — 25,000+ channels from your couch.'},
  ]},
  'iptv-montreal.html':{title:'Comment installer IPTV à Montréal',steps:[
    {n:'1',h:'Choisir iptvv.online',p:'IPTV Montréal dès 12,99$ CAD/mois — RDS, TVA Sports, ICI Radio-Canada, Noovo, matchs des Canadiens.'},
    {n:'2',h:'Essai gratuit 24h',p:'Testez RDS et TVA Sports gratuitement — sans carte bancaire, accès instantané.'},
    {n:'3',h:'Installer IPTV Smarters',p:'Téléchargez IPTV Smarters Pro sur Firestick, Smart TV, ou Android en 5 minutes.'},
    {n:'4',h:'Regarder en 4K',p:'Chaque match des Canadiens sur RDS/TVA Sports, ICI Radio-Canada, Noovo — tout en 4K.'},
  ]},
  'iptv-calgary.html':{title:'How to Set Up IPTV in Calgary',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Calgary IPTV from $12.99 CAD/month — Flames on Sportsnet West, Global Calgary, CTV Calgary.'},
    {n:'2',h:'Activate Free Trial',p:'Test Flames games and all Calgary local channels free for 24 hours. No credit card.'},
    {n:'3',h:'Install IPTV Smarters',p:'Set up IPTV Smarters on your Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Calgary TV in 4K',p:'Global Calgary, CTV Calgary, CBC Calgary, and Flames/Stamps games in HD and 4K.'},
  ]},
  'iptv-ottawa.html':{title:'How to Set Up IPTV in Ottawa',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Ottawa IPTV from $12.99 CAD/month — Senators on TSN/Sportsnet, CFRA News, CBC Ottawa, CTV Ottawa.'},
    {n:'2',h:'Activate Free Trial',p:'Test Senators games on TSN and all Ottawa channels free for 24 hours. No card needed.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Ottawa TV in 4K',p:'CTV Ottawa, CBC Ottawa, bilingual news, and all Ottawa sports in HD and 4K.'},
  ]},
  'iptv-vancouver.html':{title:'How to Set Up IPTV in Vancouver',steps:[
    {n:'1',h:'Subscribe to iptvv.online',p:'Vancouver IPTV from $12.99 CAD/month — Canucks on Sportsnet Pacific, Global BC, CBC Vancouver.'},
    {n:'2',h:'Activate Free Trial',p:'Test Canucks and Whitecaps coverage on Sportsnet Pacific free for 24 hours.'},
    {n:'3',h:'Install IPTV Smarters',p:'Download IPTV Smarters Pro on Firestick, Smart TV, or Android in 5 minutes.'},
    {n:'4',h:'Watch Vancouver TV in 4K',p:'Global BC, CBC Vancouver, CHEK TV, and all Vancouver sports in HD and 4K.'},
  ]},
  'what-is-iptv-canada.html':{title:'How to Start Watching IPTV in Canada',steps:[
    {n:'1',h:'Choose an IPTV Service',p:'Pick a trusted Canadian provider like iptvv.online — 25,000+ channels from $12.99 CAD/month.'},
    {n:'2',h:'Get Free Trial',p:'Test before paying — 24-hour free trial via WhatsApp, no credit card required.'},
    {n:'3',h:'Install an IPTV Player',p:'Download IPTV Smarters Pro or TiViMate on your Firestick, Smart TV, or phone.'},
    {n:'4',h:'Enter M3U Credentials',p:'Paste your M3U URL into the player and instantly access 25,000+ live channels.'},
  ]},
  'iptv-smarters-canada.html':{title:'How to Set Up IPTV Smarters in Canada',steps:[
    {n:'1',h:'Download IPTV Smarters Pro',p:'Available on Google Play, App Store, and Firestick store — free to download.'},
    {n:'2',h:'Get Your M3U Credentials',p:'Subscribe to iptvv.online or activate free trial to receive your M3U URL.'},
    {n:'3',h:'Add M3U URL to the App',p:'Open IPTV Smarters → Add User via M3U URL → paste your iptvv.online URL → Save.'},
    {n:'4',h:'Browse 25,000+ Channels',p:'All channels load including CBC, TSN, RDS, 4K sports, and French channels with EPG.'},
  ]},
  'do-i-need-vpn-for-iptv.html':{title:'How to Use IPTV Safely in Canada',steps:[
    {n:'1',h:'Choose a Legal Service',p:'Start with a licensed IPTV service like iptvv.online — this alone eliminates most legal risk.'},
    {n:'2',h:'Check Your ISP',p:'If your ISP (Rogers, Bell, Videotron) throttles streaming traffic, a VPN can fix buffering.'},
    {n:'3',h:'Install a VPN (Optional)',p:'NordVPN or ExpressVPN work well with IPTV in Canada — connect to a Canadian server.'},
    {n:'4',h:'Stream Without Worry',p:'With iptvv.online and optionally a VPN, you can stream CBC, TSN, and RDS with zero issues.'},
  ]},
  'blog.html':{title:'How to Stay Updated on IPTV Canada',steps:[
    {n:'1',h:'Bookmark This Blog',p:'Save iptvv.online/blog.html for weekly IPTV Canada news, guides, and reviews.'},
    {n:'2',h:'Read Latest Articles',p:'Check crackdown updates, M3U guides, device setup articles, and legal news below.'},
    {n:'3',h:'Share with Friends',p:'Know someone paying $100+/month for cable? Share the IPTV vs cable comparison article.'},
    {n:'4',h:'Start Free Trial',p:'Ready to cut the cord? Activate your free 24-hour iptvv.online trial below.'},
  ]},
  'contact.html':{title:'How to Contact iptvv.online Support',steps:[
    {n:'1',h:'WhatsApp (Fastest)',p:'Message us at <a href="https://wa.me/212776056268" target="_blank">WhatsApp +212776056268</a> — response within 5 minutes, 24/7.'},
    {n:'2',h:'Use the Contact Form',p:'Fill in your name, email, and message below. We respond within 1 hour.'},
    {n:'3',h:'Describe Your Issue',p:'Include your device type, IPTV player, and the channel or issue for faster support.'},
    {n:'4',h:'Get Resolved Fast',p:'Our bilingual EN/FR support team resolves 95% of issues within 30 minutes.'},
  ]},
  'checkout.html':{title:'How to Subscribe to iptvv.online',steps:[
    {n:'1',h:'Choose Your Plan',p:'Select Monthly ($12.99), 6-Month ($44.99), or Yearly ($69.99) — all include 25,000+ channels.'},
    {n:'2',h:'Complete Payment',p:'Pay via credit card, PayPal, crypto, or Interac e-Transfer. Secure checkout.'},
    {n:'3',h:'Receive Credentials',p:'Get your M3U URL on WhatsApp or email within 2 minutes of payment.'},
    {n:'4',h:'Start Watching',p:'Install IPTV Smarters on any device and start streaming immediately.'},
  ]},
};

// For remaining pages use a smart default based on filename
function defaultSteps(f) {
  return {title:'How to Get Started with iptvv.online',steps:[
    {n:'1',h:'Browse This Guide',p:'Read the full guide below to understand all options available on iptvv.online.'},
    {n:'2',h:'Activate Free Trial',p:'Get a free 24-hour trial via WhatsApp — no credit card required, instant access.'},
    {n:'3',h:'Install on Your Device',p:'Set up IPTV Smarters Pro on Firestick, Smart TV, Android, or iOS in 5 minutes.'},
    {n:'4',h:'Subscribe & Save',p:'Choose from $12.99 CAD/month — 25,000+ channels, TSN, RDS, CBC, 4K included.'},
  ]};
}

// ── QUICK ANSWER for pages missing it ────────────────────────────────────
const QUICK_ANSWERS = {
  'blog.html': {q:'Where can I find the latest IPTV Canada news?', a:'This blog covers IPTV Canada news weekly — legal updates, M3U guides, device setup tutorials, and service reviews. Everything you need to watch Canadian TV legally and affordably in 2026.'},
  'checkout.html': {q:'How do I subscribe to iptvv.online?', a:'Select your plan (from $12.99 CAD/month), complete secure payment via credit card, PayPal, or Interac e-Transfer, and receive your M3U credentials on WhatsApp within 2 minutes. Free 24h trial available — no card needed.'},
  'contact.html': {q:'How do I contact iptvv.online support?', a:'Contact us via WhatsApp at +212 776 056 268 — we respond within 5 minutes, 24/7. Our bilingual EN/FR team resolves setup issues, billing questions, and technical support in under 30 minutes.'},
};

// ── HTML BUILDERS ─────────────────────────────────────────────────────────
function buildSeeAlso(links) {
  const items = links.map(l =>
    `      <li><a href="${l.href}">${l.text}</a></li>`
  ).join('\n');
  return `
<!-- See Also -->
<section class="see-also" style="background:var(--bg2,#0a0a10);border-top:1px solid var(--border,rgba(255,255,255,.08));padding:36px 0">
  <div class="container">
    <h2 style="font-family:var(--fh,'Bebas Neue',cursive);font-size:clamp(20px,2.5vw,28px);letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px;color:var(--white,#fff)">See Also</h2>
    <ul style="list-style:none;display:flex;flex-wrap:wrap;gap:10px;padding:0;margin:0">
${items}
    </ul>
  </div>
</section>
<style>
.see-also ul li a{display:inline-block;padding:8px 16px;background:var(--card,rgba(255,255,255,.04));border:1px solid var(--border,rgba(255,255,255,.08));border-radius:100px;font-size:13px;font-weight:600;color:var(--white,#fff);transition:.2s;text-decoration:none}
.see-also ul li a:hover{border-color:var(--cyan,#00e5ff);color:var(--cyan,#00e5ff);background:rgba(0,229,255,.06)}
</style>`;
}

function buildSteps(cfg) {
  const items = cfg.steps.map(s => `
    <div style="display:flex;gap:14px;align-items:flex-start">
      <div style="min-width:34px;height:34px;border-radius:50%;background:var(--cyan,#00e5ff);color:#000;display:flex;align-items:center;justify-content:center;font-family:var(--fh,'Bebas Neue',cursive);font-size:17px;font-weight:700;flex-shrink:0">${s.n}</div>
      <div>
        <div style="font-weight:700;font-size:14px;margin-bottom:3px;color:var(--white,#fff)">${s.h}</div>
        <p style="color:var(--muted,rgba(255,255,255,.55));font-size:13px;margin:0;line-height:1.6">${s.p}</p>
      </div>
    </div>`).join('\n');
  return `
<!-- Steps Section -->
<div class="steps-section" style="margin:32px 0;background:var(--bg2,#0a0a10);border:1px solid var(--border,rgba(255,255,255,.08));border-radius:var(--r2,22px);padding:28px">
  <h2 style="font-family:var(--fh,'Bebas Neue',cursive);font-size:clamp(22px,3vw,34px);letter-spacing:.04em;text-transform:uppercase;margin-bottom:22px;color:var(--white,#fff)">${cfg.title}</h2>
  <div style="display:flex;flex-direction:column;gap:18px">
${items}
  </div>
</div>`;
}

function buildQuickAnswer(qa) {
  return `
<!-- Quick Answer -->
<div class="ab" style="background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.2);border-radius:var(--r2,22px);padding:20px 24px;margin:24px 0">
  <div style="font-family:var(--fm,'JetBrains Mono',monospace);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan,#00e5ff);margin-bottom:8px">📌 Quick Answer</div>
  <p style="font-weight:700;font-size:14px;margin-bottom:6px;color:var(--white,#fff)">${qa.q}</p>
  <p style="color:var(--muted,rgba(255,255,255,.55));font-size:13px;margin:0;line-height:1.65">${qa.a}</p>
</div>`;
}

// ── MAIN ──────────────────────────────────────────────────────────────────
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') &&
  !f.startsWith('404') && f !== 'googledda038c80d70f368.html');

let stats = {seeAlso:0, steps:0, qa:0, skip:0};

files.forEach(file => {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;

  // ── Quick Answer (only for pages missing it) ──
  if (!html.includes('class="ab"') && !html.includes('quick-answer') && !html.includes('Quick Answer')) {
    if (QUICK_ANSWERS[file]) {
      // Insert after first <h1 or after breadcrumb — before first <h2
      const h2idx = html.indexOf('<h2');
      if (h2idx !== -1) {
        html = html.slice(0, h2idx) + buildQuickAnswer(QUICK_ANSWERS[file]) + '\n' + html.slice(h2idx);
        stats.qa++;
      }
    }
  }

  // ── Steps (before faq-list → before </main> → before <footer) ──
  if (!html.includes('steps-section') && !html.includes('step-box') && !html.includes('howto')) {
    const cfg = STEPS[file] || defaultSteps(file);
    const faqIdx = html.indexOf('<div class="faq-list">');
    if (faqIdx !== -1) {
      // Find the <!-- FAQ comment or just insert before faq-list div
      const faqCommentIdx = html.lastIndexOf('<!-- FAQ', faqIdx);
      const insertAt = faqCommentIdx !== -1 && faqCommentIdx > faqIdx - 500 ? faqCommentIdx : faqIdx;
      html = html.slice(0, insertAt) + buildSteps(cfg) + '\n\n' + html.slice(insertAt);
      stats.steps++;
    } else {
      // Insert before </main> or before <footer
      const mainEnd = html.lastIndexOf('</main>');
      if (mainEnd !== -1) {
        html = html.slice(0, mainEnd) + buildSteps(cfg) + '\n\n' + html.slice(mainEnd);
        stats.steps++;
      } else {
        const footerIdx = html.lastIndexOf('<footer');
        if (footerIdx !== -1) {
          html = html.slice(0, footerIdx) + buildSteps(cfg) + '\n\n' + html.slice(footerIdx);
          stats.steps++;
        }
      }
    }
  }

  // ── See Also (before </main> → before <footer) ──
  if (!html.includes('see-also') && !html.includes('See Also')) {
    const links = SEE_ALSO[file] || [
      {href:'/best-iptv-canada.html',text:'Best IPTV Canada 2026'},
      {href:'/pricing.html',text:'Plans & Pricing'},
      {href:'/channels.html',text:'Channel List'},
      {href:'/tsn-iptv-canada.html',text:'TSN IPTV Canada'},
      {href:'/free-trial.html',text:'Free 24h Trial'},
    ];
    const mainEnd = html.lastIndexOf('</main>');
    if (mainEnd !== -1) {
      html = html.slice(0, mainEnd) + buildSeeAlso(links) + '\n' + html.slice(mainEnd);
      stats.seeAlso++;
    } else {
      const footerIdx = html.lastIndexOf('<footer');
      if (footerIdx !== -1) {
        html = html.slice(0, footerIdx) + buildSeeAlso(links) + '\n\n' + html.slice(footerIdx);
        stats.seeAlso++;
      }
    }
  }

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✅ ' + file);
  } else {
    stats.skip++;
  }
});

console.log('\n── DONE ──');
console.log('See Also:     ' + stats.seeAlso);
console.log('Steps:        ' + stats.steps);
console.log('Quick Answer: ' + stats.qa);
console.log('Skipped:      ' + stats.skip);
