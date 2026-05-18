import type { PricingTier } from "@/lib/types";

export const pricingTiers: PricingTier[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "499 SEK",
    billingCycle: "per month",
    features: [
      "Monthly website scan",
      "Content accuracy check",
      "Improvement list",
    ],
    ctaHref: "mailto:hello@webassessment.agency?subject=Starter%20plan",
    ctaLabel: "Get Starter",
  },
  {
    slug: "standard",
    name: "Standard",
    price: "1,499 SEK",
    billingCycle: "per month",
    features: [
      "Everything in Starter",
      "Payment A/B test",
      "Email automation review",
      "Weekly social content",
      "Weekly report",
    ],
    ctaHref: "mailto:hello@webassessment.agency?subject=Standard%20plan",
    ctaLabel: "Get Standard",
    highlighted: true,
  },
  {
    slug: "professional",
    name: "Professional",
    price: "2,999 SEK",
    billingCycle: "per month",
    features: [
      "Everything in Standard",
      "Before/after report",
      "Platform monitoring",
      "Priority support",
    ],
    ctaHref: "mailto:hello@webassessment.agency?subject=Professional%20plan",
    ctaLabel: "Get Professional",
  },
];
