#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
iptvv.online IPTV Canada — Daily SERP Monitoring Script
═══════════════════════════════════════════════════════════════
Purpose  : Track daily Google rankings for target keywords in Canada.
           Monitor competitor positions vs iptvv.online IPTV.
           Send email/Slack alerts on significant ranking changes.
Usage    : python serp_monitor.py
           python serp_monitor.py --report
           python serp_monitor.py --schedule
           python serp_monitor.py --demo
Install  : pip install serpapi requests pandas python-dotenv schedule
Cron     : 0 8 * * * cd /path/to/project && python serp_monitor.py
═══════════════════════════════════════════════════════════════
"""

import os, json, time, datetime, argparse, sqlite3, smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from typing import Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

# ═══════════════════════════════════════════════════════════
# CONFIGURATION — Edit these or use .env file
# ═══════════════════════════════════════════════════════════

SERPAPI_KEY   = os.getenv("SERPAPI_KEY", "YOUR_SERPAPI_KEY_HERE")
SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK", "")
EMAIL_FROM    = os.getenv("EMAIL_FROM", "")
EMAIL_TO      = os.getenv("EMAIL_TO", "")
EMAIL_PASS    = os.getenv("EMAIL_PASS", "")
EMAIL_SMTP    = os.getenv("EMAIL_SMTP", "smtp.gmail.com")
EMAIL_PORT    = int(os.getenv("EMAIL_PORT", "587"))

YOUR_DOMAIN   = "northstreamiptv.ca"

TARGET_KEYWORDS = [
    # Primary money keywords
    "IPTV Canada",
    "best IPTV Canada",
    "cheap IPTV Canada",
    "IPTV subscription Canada",
    # Province / city
    "IPTV Ontario",
    "IPTV Toronto",
    "IPTV Quebec",
    "IPTV Montreal",
    "IPTV Alberta",
    "IPTV Calgary",
    "IPTV Vancouver",
    "IPTV British Columbia",
    # Informational
    "is IPTV legal Canada",
    "IPTV vs Netflix Canada",
    "IPTV vs cable Canada",
    "French channels IPTV Canada",
    # Device / long-tail
    "IPTV Firestick Canada",
    "IPTV Smart TV Canada",
    "best IPTV app Canada",
    "IPTV 4K Canada",
    "free IPTV trial Canada",
    "IPTV Canada 2026",
    "IPTV service Montreal",
    "legal IPTV alternatives Canada",
    "IPTV Canada hockey",
]

COMPETITORS = [
    "iptvv.ca",
    "iptvcad.ca",
    "modeiptv.ca",
    "bestiptv.ca",
    "iptvcanada.tv",
]

SEARCH_PARAMS = {
    "engine": "google",
    "gl": "ca",
    "hl": "en",
    "google_domain": "google.ca",
    "location": "Canada",
    "num": "20",
}

ALERT_DROP     = 5
ALERT_GAIN     = 5
STRIKING_MIN   = 11
STRIKING_MAX   = 20
DB_PATH        = Path("data/serp_rankings.db")

# ═══════════════════════════════════════════════════════════
# DATABASE
# ═══════════════════════════════════════════════════════════

def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS rankings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL, keyword TEXT NOT NULL,
        domain TEXT NOT NULL, position INTEGER,
        url TEXT, title TEXT,
        UNIQUE(date, keyword, domain))""")
    c.execute("""CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT, keyword TEXT, domain TEXT,
        old_pos INTEGER, new_pos INTEGER,
        change INTEGER, type TEXT)""")
    conn.commit(); conn.close()

def save_ranking(date, keyword, domain, position, url="", title=""):
    conn = sqlite3.connect(DB_PATH)
    conn.execute("INSERT OR REPLACE INTO rankings (date,keyword,domain,position,url,title) VALUES (?,?,?,?,?,?)",
                 (date, keyword, domain, position, url, title))
    conn.commit(); conn.close()

def get_prev_pos(keyword, domain) -> Optional[int]:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT position FROM rankings WHERE keyword=? AND domain=? ORDER BY date DESC LIMIT 1 OFFSET 1",
              (keyword, domain))
    row = c.fetchone(); conn.close()
    return row[0] if row else None

# ═══════════════════════════════════════════════════════════
# SERP FETCHING
# ═══════════════════════════════════════════════════════════

def fetch_serp(keyword: str) -> dict:
    if SERPAPI_KEY == "YOUR_SERPAPI_KEY_HERE":
        return {}
    try:
        r = requests.get("https://serpapi.com/search",
                         params={**SEARCH_PARAMS, "q": keyword, "api_key": SERPAPI_KEY},
                         timeout=15)
        r.raise_for_status()
        data = r.json()
        return {} if "error" in data else data
    except Exception as e:
        print(f"  ❌ Error fetching '{keyword}': {e}")
        return {}

def extract_domain(url: str) -> str:
    return url.replace("https://","").replace("http://","").replace("www.","").split("/")[0].lower()

def find_pos(serp_data: dict, domain: str) -> tuple:
    for r in serp_data.get("organic_results", []):
        rd = extract_domain(r.get("link", ""))
        if domain in rd or rd in domain:
            return r.get("position"), r.get("link", ""), r.get("title", "")
    return None, "", ""

# ═══════════════════════════════════════════════════════════
# ALERTS
# ═══════════════════════════════════════════════════════════

def check_alerts(keyword, domain, new_pos, today):
    old_pos = get_prev_pos(keyword, domain)
    if old_pos is None or new_pos is None:
        return
    change = old_pos - new_pos
    if change >= ALERT_GAIN:
        msg = f"🚀 GAIN +{change}: '{keyword}' {domain} #{old_pos}→#{new_pos}"
        print(f"  {msg}")
        _log_alert(today, keyword, domain, old_pos, new_pos, change, "gain")
        _slack(msg, "good")
    elif change <= -ALERT_DROP:
        msg = f"📉 DROP {change}: '{keyword}' {domain} #{old_pos}→#{new_pos}"
        print(f"  {msg}")
        _log_alert(today, keyword, domain, old_pos, new_pos, change, "drop")
        _slack(msg, "danger")

def _log_alert(date, keyword, domain, old_pos, new_pos, change, atype):
    conn = sqlite3.connect(DB_PATH)
    conn.execute("INSERT INTO alerts VALUES (NULL,?,?,?,?,?,?,?)",
                 (date, keyword, domain, old_pos, new_pos, change, atype))
    conn.commit(); conn.close()

def _slack(message: str, color: str = "warning"):
    if not SLACK_WEBHOOK: return
    try:
        requests.post(SLACK_WEBHOOK, json={"attachments": [{"color": color, "text": message}]}, timeout=5)
    except: pass

# ═══════════════════════════════════════════════════════════
# REPORT
# ═══════════════════════════════════════════════════════════

def generate_html_report(today: str) -> str:
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute("SELECT keyword,domain,position,url FROM rankings WHERE date=? ORDER BY keyword,position", (today,)).fetchall()
    conn.close()
    if not rows: return "<p>No data.</p>"

    kw_data = {}
    for kw, domain, pos, url in rows:
        kw_data.setdefault(kw, {})[domain] = {"pos": pos, "url": url}

    striking = [(kw, d[YOUR_DOMAIN]["pos"]) for kw, d in kw_data.items()
                if d.get(YOUR_DOMAIN, {}).get("pos") and STRIKING_MIN <= d[YOUR_DOMAIN]["pos"] <= STRIKING_MAX]
    striking.sort(key=lambda x: x[1])

    top3  = sum(1 for kw, d in kw_data.items() if d.get(YOUR_DOMAIN, {}).get("pos", 99) <= 3)
    top10 = sum(1 for kw, d in kw_data.items() if d.get(YOUR_DOMAIN, {}).get("pos", 99) <= 10)
    total = len(kw_data)

    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>iptvv.online Rankings {today}</title>
<style>
body{{font-family:-apple-system,sans-serif;max-width:1100px;margin:0 auto;padding:24px;background:#f5f5f5;color:#333}}
h1{{background:#050508;color:#00e5ff;padding:20px 24px;border-radius:10px;font-size:24px;margin-bottom:24px}}
h2{{border-bottom:2px solid #00e5ff;padding-bottom:8px;color:#050508}}
.summary{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:30px}}
.card{{background:white;border-radius:10px;padding:20px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.08)}}
.card-num{{font-size:42px;font-weight:800}}
.card-label{{font-size:12px;color:#666;margin-top:4px}}
table{{width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;margin-bottom:30px;box-shadow:0 2px 8px rgba(0,0,0,.08)}}
th{{background:#050508;color:#00e5ff;padding:12px 16px;text-align:left;font-size:11px;letter-spacing:.08em;text-transform:uppercase}}
td{{padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:13px}}
tr:last-child td{{border-bottom:none}}
.top3{{color:#2e7d32;font-weight:800}}
.top10{{color:#1565c0;font-weight:700}}
.striking{{color:#e65100}}
.none{{color:#bbb}}
</style></head><body>
<h1>📊 iptvv.online IPTV — Daily Rankings · {today}</h1>
<div class="summary">
<div class="card"><div class="card-num" style="color:#2e7d32">{top3}</div><div class="card-label">Top 3</div></div>
<div class="card"><div class="card-num" style="color:#1565c0">{top10}</div><div class="card-label">Top 10</div></div>
<div class="card"><div class="card-num" style="color:#e65100">{len(striking)}</div><div class="card-label">Striking Distance</div></div>
<div class="card"><div class="card-num" style="color:#333">{total}</div><div class="card-label">Keywords Tracked</div></div>
</div>"""

    if striking:
        html += "<h2>🎯 Striking Distance Keywords — Easy Quick Wins</h2>"
        html += "<table><thead><tr><th>Keyword</th><th>Position</th><th>Action</th></tr></thead><tbody>"
        for kw, pos in striking:
            html += f"<tr><td><strong>{kw}</strong></td><td class='striking'>#{pos}</td><td>Add 3 internal links + expand content by 500 words</td></tr>"
        html += "</tbody></table>"

    html += "<h2>📈 Full Rankings</h2>"
    html += f"<table><thead><tr><th>Keyword</th><th>{YOUR_DOMAIN} (You)</th>"
    for c in COMPETITORS:
        html += f"<th>{c}</th>"
    html += "</tr></thead><tbody>"

    for kw, domains in sorted(kw_data.items()):
        html += f"<tr><td><strong>{kw}</strong></td>"
        p = domains.get(YOUR_DOMAIN, {}).get("pos")
        if p:
            cls = "top3" if p<=3 else ("top10" if p<=10 else "striking")
            html += f"<td class='{cls}'>#{p}</td>"
        else:
            html += "<td class='none'>—</td>"
        for comp in COMPETITORS:
            cp = domains.get(comp, {}).get("pos")
            html += f"<td>{'#'+str(cp) if cp else '—'}</td>"
        html += "</tr>"

    html += f"</tbody></table><p style='color:#999;font-size:12px'>iptvv.online IPTV SERP Monitor · {today}</p></body></html>"
    return html

# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

def run_check():
    today = datetime.date.today().isoformat()
    print(f"\n{'='*55}")
    print(f" 🇨🇦 iptvv.online SERP Monitor — {today}")
    print(f"{'='*55}")
    init_db()

    if SERPAPI_KEY == "YOUR_SERPAPI_KEY_HERE":
        print("\n❌ No SerpAPI key found!")
        print("  1. Get free key at https://serpapi.com")
        print("  2. Create .env file: SERPAPI_KEY=your_key_here")
        print("  3. Run again\n")
        print("Running demo instead...\n")
        run_demo()
        return

    all_results = {}
    for kw in TARGET_KEYWORDS:
        print(f"\n🔍 '{kw}'")
        data = fetch_serp(kw)
        if not data:
            continue
        all_results[kw] = {}
        for domain in [YOUR_DOMAIN] + COMPETITORS:
            pos, url, title = find_pos(data, domain)
            all_results[kw][domain] = {"pos": pos, "url": url}
            save_ranking(today, kw, domain, pos, url, title)
            if domain == YOUR_DOMAIN:
                print(f"  ✅ YOU: {'#'+str(pos) if pos else 'Not top 20'}")
            else:
                print(f"  🔴 {domain}: {'#'+str(pos) if pos else '—'}")
        check_alerts(kw, YOUR_DOMAIN, all_results[kw].get(YOUR_DOMAIN, {}).get("pos"), today)
        time.sleep(2)

    # Generate report
    Path("reports").mkdir(exist_ok=True)
    report = generate_html_report(today)
    rpath = Path(f"reports/serp-report-{today}.html")
    rpath.write_text(report, encoding="utf-8")
    print(f"\n✅ Report: {rpath}")

    if HAS_PANDAS:
        conn = sqlite3.connect(DB_PATH)
        df = pd.read_sql_query("SELECT * FROM rankings WHERE date=?", conn, params=(today,))
        conn.close()
        df.to_csv(f"reports/serp-{today}.csv", index=False)
        print(f"✅ CSV: reports/serp-{today}.csv")

    # Terminal summary
    print(f"\n{'='*55}")
    print(f" RANKING SUMMARY — {YOUR_DOMAIN}")
    print(f"{'='*55}")
    striking = []
    for kw, domains in sorted(all_results.items()):
        p = domains.get(YOUR_DOMAIN, {}).get("pos")
        icon = "🥇" if p and p<=3 else ("✅" if p and p<=10 else ("⚠️ " if p and p<=20 else "❌"))
        best_comp = min([(d,domains[d]["pos"]) for d in COMPETITORS if domains.get(d,{}).get("pos")], key=lambda x:x[1], default=None)
        comp_str = f"{best_comp[0]} #{best_comp[1]}" if best_comp else "—"
        print(f"{icon} {kw:<40} {'#'+str(p) if p else '—':<10} {comp_str}")
        if p and STRIKING_MIN <= p <= STRIKING_MAX:
            striking.append((kw, p))

    if striking:
        print(f"\n{'='*55}")
        print(" 🎯 QUICK WINS (positions 11-20):")
        for kw, p in sorted(striking, key=lambda x:x[1]):
            print(f"  → #{p} '{kw}'")


def run_demo():
    """Demo mode — shows output format without API key."""
    print(f"{'='*55}")
    print(f" DEMO: This is what your daily output looks like")
    print(f"{'='*55}")
    demo = [
        ("IPTV Canada",           4,  "iptvv.ca", 2),
        ("best IPTV Canada",      8,  "iptvv.ca", 1),
        ("cheap IPTV Canada",    12,  "iptvcad.ca", 5),
        ("IPTV Ontario",          6,  "iptvv.ca", 3),
        ("IPTV Toronto",          9,  "modeiptv.ca", 4),
        ("is IPTV legal Canada", 15,  "None", None),
        ("free IPTV trial",      11,  "iptvv.ca", 6),
        ("IPTV Montreal",         5,  "iptvv.ca", 1),
    ]
    for kw, p, comp, cp in demo:
        icon = "🥇" if p<=3 else ("✅" if p<=10 else ("⚠️ " if p<=20 else "❌"))
        comp_str = f"{comp} #{cp}" if cp else "Not ranked"
        print(f"{icon} {kw:<40} #{p:<9} {comp_str}")

    print(f"\n🎯 Striking Distance: cheap IPTV Canada (#12), is IPTV legal Canada (#15), free IPTV trial (#11)")
    print(f"\n💡 Set SERPAPI_KEY in .env to get real data!")


# ═══════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="iptvv.online IPTV SERP Monitor")
    parser.add_argument("--report",   action="store_true", help="Generate report from DB only")
    parser.add_argument("--schedule", action="store_true", help="Run daily at 08:00")
    parser.add_argument("--demo",     action="store_true", help="Show demo (no API key needed)")
    args = parser.parse_args()

    if args.demo:
        run_demo()
    elif args.report:
        init_db()
        today = datetime.date.today().isoformat()
        Path("reports").mkdir(exist_ok=True)
        r = generate_html_report(today)
        p = Path(f"reports/serp-report-{today}.html")
        p.write_text(r, encoding="utf-8")
        print(f"✅ Report: {p}")
    elif args.schedule:
        try:
            import schedule as sch
            print("⏰ Scheduled daily at 08:00. Ctrl+C to stop.")
            sch.every().day.at("08:00").do(run_check)
            while True:
                sch.run_pending()
                time.sleep(60)
        except ImportError:
            print("Run: pip install schedule")
    else:
        run_check()
