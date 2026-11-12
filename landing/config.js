// Edit plan details here. Use only verified live checkout URLs; never commit test-mode links.
const AURORA_PRICING = Object.freeze({
  currency: "USD",
  launchEndDate: "", // [TODO: launch end date, YYYY-MM-DD]; leave empty until confirmed.
  checkoutUrls: Object.freeze({
    CHECKOUT_URL_LIFETIME: "",
    CHECKOUT_URL_YEARLY: "",
    CHECKOUT_URL_MONTHLY: ""
  }),
  plans: Object.freeze({
    lifetime: Object.freeze({name: "Lifetime", price: 129, afterLaunchPrice: 149, period: "one time"}),
    yearly: Object.freeze({name: "Yearly", price: 79, period: "per year"}),
    monthly: Object.freeze({name: "Monthly", price: 12.99, period: "per month"})
  })
});
