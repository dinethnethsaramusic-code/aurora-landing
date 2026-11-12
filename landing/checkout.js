(() => {
  const config = AURORA_PRICING;
  const plans = config.plans;
  const money = (value) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: config.currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value);

  const endDate = /^\d{4}-\d{2}-\d{2}$/.test(config.launchEndDate) ? config.launchEndDate : "";
  const today = new Date();
  const localToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  const launchEnded = Boolean(endDate && localToday >= endDate);
  const lifetimePrice = launchEnded ? plans.lifetime.afterLaunchPrice : plans.lifetime.price;
  const currentPrice = {lifetime: lifetimePrice, yearly: plans.yearly.price, monthly: plans.monthly.price};

  document.querySelectorAll("[data-price]").forEach((element) => {
    const value = currentPrice[element.dataset.price];
    if (value !== undefined) element.textContent = money(value);
  });
  document.querySelectorAll("[data-plan-name]").forEach((element) => {
    const plan = plans[element.dataset.planName];
    if (plan) element.textContent = plan.name;
  });
  document.querySelectorAll("[data-plan-period]").forEach((element) => {
    const plan = plans[element.dataset.planPeriod];
    if (plan) element.textContent = plan.period;
  });
  document.querySelectorAll("[data-launch-note]").forEach((element) => {
    if (endDate && !launchEnded) {
      element.textContent = `Launch price ends ${endDate}; then ${money(plans.lifetime.afterLaunchPrice)}.`;
      element.hidden = false;
    } else {
      element.hidden = true;
    }
  });

  const comparison = document.querySelector("[data-price-comparison]");
  if (comparison) {
    comparison.textContent = `${plans.lifetime.name} costs about ${Math.round(lifetimePrice / plans.monthly.price)} months of ${plans.monthly.name} or ${(lifetimePrice / plans.yearly.price).toFixed(1)} years of ${plans.yearly.name}.`;
  }

  const metaDescription = `Aurora Clips: ${plans.lifetime.name} ${money(lifetimePrice)} once, ${plans.yearly.name} ${money(plans.yearly.price)}/year, or ${plans.monthly.name} ${money(plans.monthly.price)}/month. Turn long videos into captioned clips on your Windows PC.`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && document.querySelector("[data-pricing-page]")) meta.content = metaDescription;
  for (const property of ["og:description", "twitter:description"]) {
    const tag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
    if (tag && document.querySelector("[data-pricing-page]")) tag.content = metaDescription;
  }

  let needsWaitlist = false;
  let hasOverlay = false;
  document.querySelectorAll("[data-plan-button]").forEach((button) => {
    const plan = plans[button.dataset.planButton];
    if (!plan) return;
    const label = button.querySelector("[data-buy-label]");
    button.href = document.querySelector("[data-waitlist-section]") ? "#waitlist" : "./index.html#waitlist";
    if (label) label.textContent = "Join the waitlist";
    const checkoutUrl = config.checkoutUrls[`CHECKOUT_URL_${button.dataset.planButton.toUpperCase()}`];
    if (!checkoutUrl.trim()) { needsWaitlist = true; return; }
    try {
      const url = new URL(checkoutUrl);
      if (url.protocol !== "https:" || !url.hostname.endsWith(".lemonsqueezy.com")) throw new Error("Use a Lemon Squeezy HTTPS URL");
      url.searchParams.set("embed", "1");
      button.href = url.href;
      if (label) label.textContent = `Buy ${plan.name}`;
      if (typeof window.createLemonSqueezy === "function") {
        button.classList.add("lemonsqueezy-button");
        hasOverlay = true;
      }
    } catch (error) {
      needsWaitlist = true;
      console.error(`Invalid ${plan.name} checkout URL; keeping waitlist link.`, error);
    }
  });
  const waitlist = document.querySelector("[data-waitlist-section]");
  if (waitlist && !needsWaitlist) waitlist.hidden = true;
  if (hasOverlay) window.createLemonSqueezy();

  const faq = document.querySelector("[data-faq-list]");
  const jsonLd = document.querySelector("#faq-jsonld");
  if (faq && jsonLd) {
    const mainEntity = Array.from(faq.querySelectorAll("details"))
      .filter((detail) => !detail.querySelector("p").textContent.includes("[TODO:"))
      .map((detail) => ({
      "@type": "Question",
      name: detail.querySelector("summary").textContent.trim(),
      acceptedAnswer: {"@type": "Answer", text: detail.querySelector("p").textContent.trim()}
    }));
    jsonLd.textContent = JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", mainEntity});
  }
})();
