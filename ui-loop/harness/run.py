"""Capture and check the existing Aurora Clips page at four browser widths."""

import argparse
import json
import re
import threading
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / "landing"
OUT = ROOT / "ui-loop"
LIVE_URL = "https://dinethnethsaramusic-code.github.io/aurora-landing/"
WIDTHS = (375, 768, 1280, 1920)
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def inspect_page(page):
    return page.evaluate("""() => {
      const text = s => document.querySelector(s)?.textContent.trim() || '';
      const buttons = [...document.querySelectorAll('[data-plan-button]')].map(x => ({plan:x.dataset.planButton,label:x.querySelector('[data-buy-label]')?.textContent.trim(),href:x.getAttribute('href')}));
      const target = x => {const r=x.getBoundingClientRect();return {text:x.textContent.trim().slice(0,40),width:Math.round(r.width),height:Math.round(r.height)}};
      const form = document.querySelector('.waitlist-form[action]');
      const signupReady = !!form && !form.action.includes('TODO_') && !!form.querySelector('button[type="submit"]:not(:disabled)');
      return {title:document.title,h1:text('h1'),heroLead:text('.hero .lead'),meta:document.querySelector('meta[name=description]')?.content||'',buttons,heroCta:target(document.querySelector('.hero .button-primary')),signupReady,overflow:document.documentElement.scrollWidth>innerWidth,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(x=>!document.getElementById(x.getAttribute('href').slice(1))).map(x=>x.getAttribute('href')),focusTargets:[...document.querySelectorAll('.header-link,.price-card .button,.faq-list summary,.site-footer nav a')].map(target).filter(x=>x.width<44||x.height<44)};
    }""")


def run(url, label):
    shots = OUT / "screenshots"
    cards = OUT / "scorecards"
    shots.mkdir(parents=True, exist_ok=True)
    cards.mkdir(parents=True, exist_ok=True)
    report = {"label": label, "source": url, "timestamp_utc": datetime.now(timezone.utc).isoformat(), "viewports": [], "console_errors": [], "failed_requests": [], "screenshots": []}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=str(EDGE) if EDGE.exists() else None)
        for width in WIDTHS:
            page = browser.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
            page.on("console", lambda message: report["console_errors"].append(message.text) if message.type == "error" else None)
            page.on("pageerror", lambda error: report["console_errors"].append(str(error)))
            page.on("requestfailed", lambda request: report["failed_requests"].append(request.url))
            response = page.goto(url, wait_until="domcontentloaded", timeout=30000)
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(600)
            info = inspect_page(page)
            info["width"] = width
            info["http_status"] = response.status if response else None
            report["viewports"].append(info)
            for kind, full in (("fold", False), ("full", True)):
                path = shots / f"{label}-{width}-{kind}.png"
                page.screenshot(path=str(path), full_page=full, timeout=60000)
                report["screenshots"].append(str(path.relative_to(ROOT)).replace("\\", "/"))
            page.close()
        reduced = browser.new_page(viewport={"width": 375, "height": 900}, reduced_motion="reduce")
        reduced.goto(url, wait_until="domcontentloaded", timeout=30000)
        report["reduced_motion"] = reduced.evaluate("""() => ({scroll:getComputedStyle(document.documentElement).scrollBehavior,animations:['.demo-bar','.demo-arrow','.demo-outputs > div'].map(s=>getComputedStyle(document.querySelector(s)).animationDuration)})""")
        reduced.close()
        browser.close()
    report["checks"] = {
        "all_http_200": all(v["http_status"] == 200 for v in report["viewports"]),
        "no_overflow": all(not v["overflow"] for v in report["viewports"]),
        "no_broken_page_anchors": all(not v["brokenAnchors"] for v in report["viewports"]),
        "no_console_errors": not report["console_errors"],
        "tap_targets_44px": not report["viewports"][0]["focusTargets"],
        "reduced_motion_off": report["reduced_motion"]["scroll"] != "smooth" and all(value == "0s" for value in report["reduced_motion"]["animations"]),
        "checkout_or_waitlist_usable": any(v["buttons"] and any(not b["href"].startswith("#waitlist") for b in v["buttons"]) or v["signupReady"] for v in report["viewports"]),
    }
    (cards / f"{label}.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    lines = [f"# {label} — Aurora Clips page", "", f"Source: {url}", f"Captured: {report['timestamp_utc']}", "", "| Check | Result |", "| --- | --- |"]
    lines += [f"| {key} | {'pass' if value else 'fail'} |" for key, value in report["checks"].items()]
    lines += ["", "| Width | Hero CTA | Plan CTAs | Signup ready |", "| ---: | --- | --- | --- |"]
    lines += [f"| {v['width']} | {v['heroCta']['text']} | {', '.join(b['label'] for b in v['buttons'])} | {v['signupReady']} |" for v in report["viewports"]]
    lines += ["", "## Screenshots", ""] + [f"- `{path}`" for path in report["screenshots"]]
    lines += ["", "## Exceptions", "", f"Console errors: {report['console_errors']}", f"Failed requests: {report['failed_requests']}", f"Small tap targets at 375px: {report['viewports'][0]['focusTargets']}"]
    (cards / f"{label}.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines[:17]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", choices=("live", "local"), required=True)
    parser.add_argument("--label", required=True)
    args = parser.parse_args()
    if not re.fullmatch(r"[a-z0-9-]+", args.label):
        parser.error("label must contain lowercase letters, digits, or hyphens")
    if args.source == "live":
        run(LIVE_URL, args.label)
    else:
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(SITE)))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            run(f"http://127.0.0.1:{server.server_address[1]}/", args.label)
        finally:
            server.shutdown()


if __name__ == "__main__":
    main()
