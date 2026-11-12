const buyButtons = document.querySelectorAll("[data-buy-button]");

if (CHECKOUT_URL.trim()) {
  try {
    const checkout = new URL(CHECKOUT_URL);
    if (checkout.protocol !== "https:") throw new Error("Checkout must use HTTPS");
    checkout.searchParams.set("embed", "1");

    for (const element of document.querySelectorAll("[data-checkout-open]")) {
      element.textContent = element.dataset.checkoutOpen;
    }
    const waitlist = document.querySelector("[data-waitlist-section]");
    if (waitlist) waitlist.hidden = true;

    for (const button of buyButtons) {
      button.href = checkout.href;
      button.querySelector("[data-buy-label]").textContent = "Buy Aurora Clips";
      if (typeof window.createLemonSqueezy === "function") {
        button.classList.add("lemonsqueezy-button");
      }
    }

    // Lemon.js runs first because these scripts are deferred in document order.
    // Without it, the same anchors still open the hosted checkout normally.
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  } catch (error) {
    console.error("Invalid CHECKOUT_URL; keeping waitlist links.", error);
  }
}
