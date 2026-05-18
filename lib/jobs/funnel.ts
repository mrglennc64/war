import * as cheerio from "cheerio";
import { fetchPage } from "./fetch";
import type { Finding, JobResult } from "./types";
import { scoreFromFindings } from "./audit";

const CHECKOUT_KEYWORDS = [
  "checkout",
  "cart",
  "buy",
  "purchase",
  "subscribe",
  "pricing",
  "plans",
  "order",
  "payment",
];

const PAYMENT_PROVIDERS = [
  { key: "stripe", pattern: /js\.stripe\.com|stripe-js/i },
  { key: "klarna", pattern: /klarna(?:\.com|cdn)/i },
  { key: "paypal", pattern: /paypal\.com|paypalobjects/i },
  { key: "shopify", pattern: /shopify\.com|cdn\.shopify/i },
  { key: "swish", pattern: /swish-handel|swishpayments/i },
];

export async function runFunnel(url: string): Promise<JobResult> {
  const page = await fetchPage(url);
  const $ = cheerio.load(page.html);
  const findings: Finding[] = [];
  const origin = new URL(page.finalUrl).origin;

  // Detect payment providers in scripts / iframes
  const providers: string[] = [];
  $("script[src], iframe[src], link[href]").each((_, el) => {
    const src = $(el).attr("src") ?? $(el).attr("href") ?? "";
    for (const p of PAYMENT_PROVIDERS) {
      if (p.pattern.test(src) && !providers.includes(p.key)) {
        providers.push(p.key);
      }
    }
  });
  if (providers.length > 0) {
    findings.push({
      severity: "ok",
      label: `Payment provider detected: ${providers.join(", ")}`,
    });
  } else {
    findings.push({
      severity: "warn",
      label: "No common payment provider script detected",
      detail: "Stripe / Klarna / PayPal / Shopify / Swish not found in the HTML.",
    });
  }

  // Find checkout/cart-style links
  const checkoutLinks = new Set<string>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const text = $(el).text().toLowerCase();
    const lower = href.toLowerCase();
    if (
      CHECKOUT_KEYWORDS.some((k) => lower.includes(k) || text.includes(k))
    ) {
      try {
        const u = new URL(href, page.finalUrl);
        if (u.origin === origin) checkoutLinks.add(u.pathname);
      } catch {
        // ignore
      }
    }
  });
  if (checkoutLinks.size > 0) {
    findings.push({
      severity: "ok",
      label: `${checkoutLinks.size} checkout-style path(s) detected`,
      detail: [...checkoutLinks].slice(0, 5).join(" · "),
    });
  } else {
    findings.push({
      severity: "warn",
      label: "No checkout / cart / pricing path detected",
    });
  }

  // Trust signals
  const lowerHtml = page.html.toLowerCase();
  const trust = {
    https: page.finalUrl.startsWith("https://"),
    privacy: /href="[^"]*privacy/i.test(page.html),
    terms: /href="[^"]*(terms|villkor|tos)/i.test(page.html),
    contact: /href="[^"]*(contact|kontakt)/i.test(page.html) || /mailto:/i.test(page.html),
    refund: /(refund|return|återbetal|reklamation)/i.test(lowerHtml),
  };
  const trustCount = Object.values(trust).filter(Boolean).length;
  findings.push({
    severity: trustCount >= 4 ? "ok" : trustCount >= 2 ? "warn" : "issue",
    label: `Trust signals: ${trustCount} / 5`,
    detail: Object.entries(trust)
      .map(([k, v]) => `${k}:${v ? "✓" : "✗"}`)
      .join(" · "),
  });

  // CTA on homepage
  const heroButtons = $("a, button")
    .toArray()
    .filter((el) => {
      const t = $(el).text().trim().toLowerCase();
      return /^(get|start|try|buy|sign|book|contact)/.test(t);
    });
  if (heroButtons.length === 0) {
    findings.push({ severity: "warn", label: "No imperative CTA copy in headers/buttons" });
  } else {
    findings.push({
      severity: "ok",
      label: `${heroButtons.length} CTA element(s) detected`,
      detail: heroButtons
        .slice(0, 3)
        .map((el) => $(el).text().trim())
        .join(" · "),
    });
  }

  return {
    score: scoreFromFindings(findings),
    summary: `Funnel scan of ${origin}. ${providers.length} payment provider(s) · ${checkoutLinks.size} checkout path(s) · ${trustCount}/5 trust signals.`,
    findings,
    details: { providers, checkoutLinks: [...checkoutLinks], trust },
  };
}
