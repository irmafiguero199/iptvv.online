#!/usr/bin/env python3
"""
Google Indexing API Script — iptvv.online
Run: pip install google-auth google-auth-httplib2 requests
Then: python3 index-iptvv-online.py
"""

import json
import time
import requests

# ═══════════════════════════════════════
# CONFIG
# ═══════════════════════════════════════
SERVICE_ACCOUNT_FILE = "indexing-api-othman-ece37b941340.json"
DOMAIN = "https://iptvv.online"

URLS = [
    # ── CORE PAGES ──────────────────────────────────────────
    f"{DOMAIN}/",
    f"{DOMAIN}/pricing.html",
    f"{DOMAIN}/channels.html",
    f"{DOMAIN}/free-trial.html",
    f"{DOMAIN}/contact.html",
    f"{DOMAIN}/blog.html",

    # ── TOP SEO PAGES ────────────────────────────────────────
    f"{DOMAIN}/best-iptv-canada.html",
    f"{DOMAIN}/cheap-iptv-canada.html",
    f"{DOMAIN}/tsn-iptv-canada.html",
    f"{DOMAIN}/rds-iptv-canada.html",
    f"{DOMAIN}/nhl-iptv-canada.html",
    f"{DOMAIN}/legal-iptv-canada.html",
    f"{DOMAIN}/is-iptv-legal-canada.html",
    f"{DOMAIN}/is-canada-iptv-legit.html",
    f"{DOMAIN}/what-is-iptv-canada.html",
    f"{DOMAIN}/free-iptv-trial-30-days.html",

    # ── DEVICE PAGES ─────────────────────────────────────────
    f"{DOMAIN}/iptv-firestick-canada.html",
    f"{DOMAIN}/iptv-samsung-tv-canada.html",
    f"{DOMAIN}/iptv-smart-tv-canada.html",
    f"{DOMAIN}/iptv-smarters-canada.html",

    # ── SPORTS & CHANNELS ────────────────────────────────────
    f"{DOMAIN}/iptv-sports-canada.html",
    f"{DOMAIN}/iptv-4k-canada.html",
    f"{DOMAIN}/french-channels-iptv-canada.html",

    # ── COMPARISON PAGES ─────────────────────────────────────
    f"{DOMAIN}/iptv-vs-cable-canada.html",
    f"{DOMAIN}/iptv-vs-netflix-canada.html",
    f"{DOMAIN}/iptv-providers-canada.html",
    f"{DOMAIN}/iptv-canada-premium.html",

    # ── COMPETITOR KEYWORD PAGES ─────────────────────────────
    f"{DOMAIN}/iptv-sonix-canada.html",
    f"{DOMAIN}/iptv-fox-canada.html",
    f"{DOMAIN}/iptv-host-canada.html",
    f"{DOMAIN}/play-iptv-canada.html",
    f"{DOMAIN}/iptv-live-canada.html",
    f"{DOMAIN}/iptv-free-apk-canada.html",

    # ── PROVINCE / CITY PAGES ────────────────────────────────
    f"{DOMAIN}/iptv-ontario.html",
    f"{DOMAIN}/iptv-quebec.html",
    f"{DOMAIN}/iptv-alberta.html",
    f"{DOMAIN}/iptv-bc.html",
    f"{DOMAIN}/iptv-toronto.html",
    f"{DOMAIN}/iptv-montreal.html",
    f"{DOMAIN}/iptv-calgary.html",
    f"{DOMAIN}/iptv-ottawa.html",
    f"{DOMAIN}/iptv-vancouver.html",

    # ── CANADA IPTV SERIES ───────────────────────────────────
    f"{DOMAIN}/canada-iptv-app.html",
    f"{DOMAIN}/canada-iptv-box.html",
    f"{DOMAIN}/canada-iptv-m3u.html",
    f"{DOMAIN}/canada-iptv-crackdown.html",

    # ── SUBSCRIPTION & INFO PAGES ────────────────────────────
    f"{DOMAIN}/iptv-subscription-canada.html",
    f"{DOMAIN}/iptv-providers-canada.html",
    f"{DOMAIN}/do-i-need-vpn-for-iptv.html",
    f"{DOMAIN}/iptv-subscription-canada.html",
]

# Remove duplicates while preserving order
seen = set()
URLS = [u for u in URLS if not (u in seen or seen.add(u))]

# ═══════════════════════════════════════
# GET ACCESS TOKEN
# ═══════════════════════════════════════
def get_access_token():
    try:
        from google.oauth2 import service_account
        import google.auth.transport.requests

        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=["https://www.googleapis.com/auth/indexing"]
        )
        request = google.auth.transport.requests.Request()
        credentials.refresh(request)
        return credentials.token
    except ImportError:
        print("❌ Missing packages!")
        print("Run: pip install google-auth google-auth-httplib2")
        exit(1)

# ═══════════════════════════════════════
# SUBMIT URL
# ═══════════════════════════════════════
def submit_url(url, token):
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    body = {
        "url": url,
        "type": "URL_UPDATED"
    }
    response = requests.post(endpoint, headers=headers, json=body)
    return response.status_code, response.json()

# ═══════════════════════════════════════
# MAIN
# ═══════════════════════════════════════
def main():
    print("=" * 55)
    print("  Google Indexing API — iptvv.online")
    print("=" * 55)
    print(f"\n📋 Total URLs to submit: {len(URLS)}\n")

    print("🔑 Getting access token...")
    token = get_access_token()
    print("✅ Token obtained!\n")

    success = 0
    failed = 0

    for i, url in enumerate(URLS, 1):
        status, response = submit_url(url, token)

        if status == 200:
            success += 1
            print(f"✅ [{i:02d}/{len(URLS)}] {url.replace(DOMAIN, '')}")
        else:
            failed += 1
            error = response.get('error', {}).get('message', 'Unknown error')
            print(f"❌ [{i:02d}/{len(URLS)}] {url.replace(DOMAIN, '')} — {error}")

        # Rate limit: max 200 requests/day
        time.sleep(0.5)

    print("\n" + "=" * 55)
    print(f"  ✅ Success: {success}/{len(URLS)}")
    print(f"  ❌ Failed:  {failed}/{len(URLS)}")
    print("=" * 55)
    print("\n⏳ Google will index pages within 24-48 hours")
    print("📊 Check Search Console → Coverage for status")

if __name__ == "__main__":
    main()
