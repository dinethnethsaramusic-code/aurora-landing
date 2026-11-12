# Round 0 — published page baseline

The baseline was captured from the **actual published GitHub Pages URL**, then from an unedited local copy of `main`. The live page and `main` share the same headline and dark/lime design. This loop keeps that design and changes its existing `landing/index.html`, CSS, and JS.

Run `python ui-loop/harness/run.py --source live --label live-baseline` for fresh live screenshots, or `--source local --label local-baseline` for the checked-out site. Each run captures full-page and above-the-fold screenshots at 375, 768, 1280, and 1920px in ignored `ui-loop/screenshots/` and writes a scorecard in `ui-loop/scorecards/`.

## Funnel and top objections

The existing page has a strong hero, illustrative output, three-step workflow, proof placeholders, local ownership rationale, requirements, three configured price cards, FAQ, and final CTA. The largest conversion problem is a **dead end**: all configured checkout URLs are empty, so the hero and plan CTAs say “Join the waitlist,” but the signup button is disabled. Other concerns: the hero does not show separate AI provider cost; license/refund/device/setup details exceed the supplied facts; beta import and experimental publishing appear in the main requirements funnel; the rightmost illustrated clip is partly clipped at desktop width; some tap targets and contrast are weak; two legal-page navigation anchors point to missing sections. No genuine demo output is available yet.

## Baseline checks

| Check | Published live page |
| --- | --- |
| HTTP at all four widths | Pass |
| Page overflow / console errors / broken same-page anchors | None observed |
| 44px tap targets | Fail |
| Reduced motion | Pass for existing styles |
| Usable checkout or waitlist terminal action | Fail |

Baseline screenshots and the exact measured results are in `scorecards/live-baseline.md` and `scorecards/local-baseline.md`. These are browser checks, not conversion measurements. The first change will preserve the live hero and route visitors to plan details until a real checkout or waitlist is available.
