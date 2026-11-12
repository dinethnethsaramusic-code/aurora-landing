# Aurora Clips landing page review

## Strategy

**Buyer:** Solo creators, streamers, podcasters, and small-channel editors who already have long recordings, use Windows, and are comfortable bringing an AI provider key.

**Main promise:** Make more captioned vertical clips from the footage you already own, on your own PC, with lifetime and subscription choices.

**Top objections:** (1) Will it make clips from my recordings? (2) How much setup is involved? (3) What else will I pay? (4) Can I trust the output without examples? (5) What happens to my files, license, and money after purchase?

| Funnel step | Objection answered | Copy decision |
| --- | --- | --- |
| Hero | What is it, and is it for me? | Outcome first, Windows and own-key requirement in the first screen. |
| Pain | Why change? | Name manual clipping work and the subscription/credit model without naming competitors. |
| How it works | How hard is it? | Three steps, with the buyer making the final selection. |
| Proof | Does it work? | Clearly labeled real-footage and screenshot slots; no invented results. |
| Why pay once | What do I get versus a subscription? | License continuity, no Aurora minute meter, local-file control. |
| Requirements | What's the catch? | Windows, AI provider charges, beta features, and who should not buy. |
| Pricing | What exactly is the offer? | Lifetime, Yearly, and Monthly plans; terms, refund, and delivery status. |
| FAQ | What could stop me? | Direct answers to setup, cost, rights, Mac, privacy, cancellation, and license questions. |
| Final CTA | Is it safe to decide? | Refund and device terms immediately under the CTA; delivery warning visible. |

## Copy options

**Recommended hero:** “More shorts from the videos you already made.” CTA: “Buy Aurora Clips” (or “Join the waitlist” when checkout is empty). It names the desired output and starts from the visitor's existing footage.

Alternative hero A: “Turn your long recording into clips worth reviewing.” CTA: “See Aurora Clips.”

Alternative hero B: “Your next short is already in your last video.” CTA: “See the clipping workflow.”

**Current pricing section:** “Start with the plan that fits.” Lifetime leads the three cards; Yearly and Monthly are lower-commitment alternatives. Each button uses its own URL or the waitlist.

Alternative pricing A: “One Aurora payment. More clips from your footage.” CTA: “Get the one-time license.”

Alternative pricing B: “Keep your version or stay subscribed.” CTA: “Compare the plans.”

The Lifetime CTAs carry the lifetime reassurance line. Each plan card states its own refund window, two-device limit, and absence of per-minute credits. The header links to the offer rather than directly to checkout.

## Replace before launch

- Set the three verified live checkout URLs in `landing/config.js`; all are empty by default. Confirm their checkout amounts match the config prices.
- Set `[TODO: launch end date, YYYY-MM-DD]` in `landing/config.js` only after the date is confirmed. While empty, the page shows the launch price without a deadline.
- `[TODO: confirm recommended specs]` and `[TODO: confirm]` for Windows RAM and free disk guidance. Verify against a licensed build.
- `[TODO: confirm delivery date and method before launch]`. Set a real delivery process and timing before taking payment; the current release does not provide immediate licensed access.
- `[TODO: confirm device replacement process.]` after end-to-end activation testing.
- `[TODO: email]` and `[TODO: legal seller name]` in the footer; replace the support anchor with the real `mailto:` link.
- `https://example.com/TODO_WAITLIST_FORM_ACTION` and `[TODO: replace form action and enable the button.]` if the checkout URL is cleared and waitlist mode is used. Verify form action, field names, consent language, and unsubscribe flow.
- Hero workflow visual, before/after source footage and matching exported clip, and studio screenshot placeholders. Use approved real footage and accessible captions or alt text. No invented output or testimonials.
- The `/thanks/` page still contains its own delivery, support, and minimum-spec TODOs. Configure the checkout success redirect to `/aurora-landing/thanks/` after fulfillment is working.
- Existing Terms, Privacy, and Refund pages retain seller, support, legal, and fulfillment TODOs. Review these alongside the live offer.

## Claims checklist

| Page claim | Support in supplied product facts / repo | Verification needed before selling |
| --- | --- | --- |
| Long videos to captioned 9:16 clips | Product brief; current customer guide describes local import, rendering, and download. | Confirm licensed ZIP can run the full flow. |
| Word timestamps, AI-assisted selection and scoring | Product brief; pipeline description. | Verify against release build. |
| Automatic reframing, burned-in captions and hooks, thumbnails, title/description suggestions | Product brief. | Capture real export proof. |
| Runs on a Windows 11 PC; no Mac version | Product brief and customer guide. | Confirm supported Windows versions and specs. |
| Local files are core; YouTube/Twitch/Kick link import beta | Product brief and customer guide. | Do not promote link import as reliable. |
| Docker advanced/beta; social publishing experimental and off by default | Product brief and customer guide. | Keep outside the main offer. |
| Lifetime one-time payment includes all 1.x updates; owned version keeps working | Owner pricing instruction. | Align checkout, terms, fulfillment, and release licensing. |
| Yearly and Monthly include the app and updates while subscribed | Owner pricing instruction. | Confirm subscription license expiry and cancellation behavior. |
| Two devices per license | Product brief. | Live activation and device replacement need testing. |
| 14-day refund on Lifetime purchase and on first subscription payment | Owner pricing instruction. | Align each live product, renewal policy, and refund page. |
| No Aurora per-minute credits or product minute quota | Product brief; customer guide says no Aurora per-minute billing. | Preserve PC/disk/time/provider limits in adjacent copy. |
| Customer uses own OpenAI-compatible AI provider key and pays that provider separately | Product brief and customer guide. | Name supported providers only after verified. |
| Source video files stay on the PC; the stored API key, selected text, and optional frames go directly to the chosen provider | Product brief plus customer guide privacy details. | Validate release network behavior and privacy policy. |
| Footage must be owned or authorized | Product brief and customer guide. | Keep beside link-import references. |
| Licensed download and live activation not yet ready | `docs/licensing.md` release guard and current customer guide. | Replace warning only after live fulfillment passes. |

All checkout URLs in `landing/config.js` are empty until the three live products are configured. The previous single lifetime checkout URL was removed; none of the new checkout flows has been tested.

## Complete TODO inventory in published pages

### `landing/index.html`

- `[TODO: confirm recommended specs]`
- `[TODO: confirm delivery date and method before launch]`
- `[TODO: replace form action and enable the button.]`
- `[TODO: confirm]`
- `[TODO: confirm whether switching is available, whether prior payments count toward the lifetime price, and how to change plans.]`
- `[TODO: confirm device replacement process.]`
- `[TODO: email]`
- `[TODO: legal seller name]`

### `landing/privacy.html`

- `[TODO: verify every data flow in the shipping build, add the seller’s legal identity and contact details, and have a qualified lawyer review this policy before collecting customer data.]`
- `[TODO: your legal name]`
- `[TODO: your support email]`
- `[TODO: add a mailing address and any legally required privacy contact.]`
- `[TODO: confirm local transcription in the shipping build, storage locations, retention and deletion controls.]`
- `[TODO: document cloud-worker data flows before offering it.]`
- `[TODO: confirm whether requests contain transcript text only or also frame samples or other data; verify key storage on every supported operating system.]`
- `[TODO: confirm the exact Lemon Squeezy data fields shared with us and their retention.]`
- `[TODO: confirm the precise request fields, hash construction, frequency, retention, and offline behavior in the shipping build.]`
- `[TODO: GitHub Pages or Cloudflare Pages]`
- `[TODO: verify the release build has no analytics, crash reporting, or other telemetry.]`
- `[TODO: name MailerLite or Brevo, link its privacy policy, describe retention, and confirm consent wording before enabling the form.]`
- `[TODO: review GitHub Pages data handling and any analytics or cookies added later.]`
- `[TODO: support email]`
- `[TODO: state retention periods, legal basis, international transfers, and applicable rights after legal review.]`
- `[TODO: confirm customer notification process.]`
- `[TODO: email]`

### `landing/refund.html`

- `[TODO: verify the 14-day windows for all plans in Lemon Squeezy, add the real support email, and obtain lawyer review before opening checkout.]`
- `[TODO: confirm whether later renewal payments are refundable.]`
- `[TODO: lawyer review]`
- `[TODO: support email]`
- `[TODO: confirm whether buyers can request refunds directly through Lemon Squeezy and state the expected response and processing times.]`
- `[TODO: confirm installed-app behavior after subscription expiry]`
- `[TODO: confirm cancellation instructions and any required renewal notice.]`
- `[TODO: verify that license deactivation is automatic or performed reliably by the seller.]`
- `[TODO: your legal name]`
- `[TODO: your support email]`
- `[TODO: add any legally required seller address and jurisdiction-specific consumer-rights wording.]`
- `[TODO: email]`

### `landing/terms.html`

- `[TODO: have a qualified lawyer review these terms, add the seller’s legal name, address, governing law, and effective date before accepting payments.]`
- `[TODO: your legal name]`
- `[TODO: your support email]`
- `[TODO: confirm the exact edition and whether commercial use is included.]`
- `[TODO: lawyer review]`
- `[TODO: describe reset/replacement process and any limits]`
- `[TODO: test key delivery, subscription status checks, and activation limits before sale.]`
- `[TODO: obtain product-specific legal and payment-provider review before offering link import.]`
- `[TODO: describe the final supported providers and the exact data sent.]`
- `[TODO: confirm installed-app behavior after subscription expiry]`
- `[TODO: confirm cancellation route, renewal notices, offline use, reinstall/activation, and support period.]`
- `[TODO: legal review of warranty, liability, and consumer-rights wording.]`
- `[TODO: confirm treatment of later renewals and required consumer rights.]`
- `[TODO: confirm how existing customers will be notified of material changes.]`
- `[TODO: email]`

### `landing/thanks/index.html`

- `[TODO: confirm delivery timing and method before accepting payment.]`
- `[TODO: confirm subscription cancellation route and installed-app behavior after expiry.]`
- `[TODO: add the verified licensed-release download link before sales open.]`
- `[TODO: confirm minimum RAM and free disk space before sales open.]`
- `[TODO: support email]`
- `[TODO: email]`
