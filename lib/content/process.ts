export type ProcessStep = {
  n: number;
  title: string;
  description: string;
  output: string;
  who: "Us" | "Pam" | "You";
  durationDays: number;
};

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Discovery & access",
    description:
      "Short kickoff call to map your sites, payment flow, email tool, and analytics. We get read-only access — never write access — to the systems we'll review.",
    output: "Access checklist · signed scope · success metrics",
    who: "You",
    durationDays: 1,
  },
  {
    n: 2,
    title: "Baseline assessment",
    description:
      "Pam runs the first deep crawl. We layer human review on top — structure, content clarity, mobile/desktop, payment trust signals, broken links, metadata.",
    output: "Baseline health report (PDF) · before-state snapshot",
    who: "Us",
    durationDays: 3,
  },
  {
    n: 3,
    title: "Tenant confirmation",
    description:
      "You review every proposed change in a corrections worksheet — accept, reject, or edit. Nothing ships until you confirm.",
    output: "Corrections worksheet · approved change list",
    who: "You",
    durationDays: 2,
  },
  {
    n: 4,
    title: "Apply & verify",
    description:
      "We implement the approved changes — payment A/B variants, copy rewrites, broken-link fixes, email sequence patches, metadata updates. Each change is verified before it goes live.",
    output: "Live changes · verification log",
    who: "Us",
    durationDays: 3,
  },
  {
    n: 5,
    title: "Weekly cycle starts",
    description:
      "Pam takes over the cadence: daily crawl, weekly deep scan, A/B monitoring, email validation. You get a structured weekly report every Friday.",
    output: "Weekly report (PDF) · action items",
    who: "Pam",
    durationDays: 7,
  },
  {
    n: 6,
    title: "Ongoing operations",
    description:
      "Every change continues to require your sign-off. Triggers — conversion drops, content drift, automation failures — escalate to a human on our side immediately.",
    output: "Monthly deep review · before/after report on request",
    who: "Pam",
    durationDays: 30,
  },
];

export type Cadence = {
  frequency: string;
  what: string;
  trigger: string;
};

export const cadenceTable: Cadence[] = [
  { frequency: "Daily", what: "Site crawl · error detection · uptime check", trigger: "Automatic — 04:00 local" },
  { frequency: "Weekly", what: "Full scan · A/B test review · email validation · weekly report", trigger: "Automatic — Friday 09:00" },
  { frequency: "Monthly", what: "Deep content review · before/after report", trigger: "Automatic — first of month" },
  { frequency: "On trigger", what: "Conversion drop · page change · automation failure", trigger: "Threshold breached" },
];

export const guarantees: { title: string; description: string }[] = [
  {
    title: "Read-only by default",
    description:
      "We get read access. You retain write access. Changes ship through your existing publishing flow, with your sign-off.",
  },
  {
    title: "Nothing ships without tenant sign-off",
    description:
      "Every change is shown to you in a worksheet first. You accept, reject, or edit. Pam only applies what you explicitly approved.",
  },
  {
    title: "Structured PDF report every Friday",
    description:
      "Same format every week — status pill, KPI tiles, validation checks, per-site status, audit trail. Skim it in 2 minutes.",
  },
  {
    title: "Human escalation on every trigger",
    description:
      "When Pam detects a conversion drop, content drift, or automation failure, a human on our side is paged before you are.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do you need admin or write access to our site?",
    a: "No. Read-only is enough for monitoring. For changes, we hand you a worksheet — you (or your team) publish through your existing flow.",
  },
  {
    q: "What does the first week look like?",
    a: "Day 1: kickoff and access. Days 2–4: baseline assessment. Days 5–6: you review the corrections worksheet. Day 7: approved changes go live and the weekly cadence begins.",
  },
  {
    q: "Which tools do you support?",
    a: "Most stacks. We've worked with Webflow, WordPress, Shopify, Stripe checkout, Klaviyo, ActiveCampaign, GA4, Plausible. If your stack isn't listed, ask.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes. Monthly plans, no lock-in. You keep all the reports we've generated.",
  },
];
