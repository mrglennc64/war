export type ProcessStep = {
  n: number;
  title: string;
  description: string;
  output: string;
  who: "Us" | "Pam" | "You";
  durationDays: number;
  titleSv?: string;
  descriptionSv?: string;
  outputSv?: string;
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
    titleSv: "Discovery & access",
    descriptionSv:
      "Kort uppstartssamtal för att kartlägga webbplatser, betalflöde, e-postverktyg och analys. Vi får läsåtkomst — aldrig skrivåtkomst — till systemen vi granskar.",
    outputSv: "Access-checklista · signerad scope · mått för framgång",
  },
  {
    n: 2,
    title: "Baseline assessment",
    description:
      "Pam runs the first deep crawl. We layer human review on top — structure, content clarity, mobile/desktop, payment trust signals, broken links, metadata.",
    output: "Baseline health report (PDF) · before-state snapshot",
    who: "Us",
    durationDays: 3,
    titleSv: "Baseline-bedömning",
    descriptionSv:
      "Pam kör första djupscannen. Vi lägger på manuell granskning: struktur, tydlighet, mobil/desktop, betalningssignaler, trasiga länkar, metadata.",
    outputSv: "Baseline-hälsorapport (PDF) · before-state-snapshot",
  },
  {
    n: 3,
    title: "Tenant confirmation",
    description:
      "You review every proposed change in a corrections worksheet — accept, reject, or edit. Nothing ships until you confirm.",
    output: "Corrections worksheet · approved change list",
    who: "You",
    durationDays: 2,
    titleSv: "Tenant-bekräftelse",
    descriptionSv:
      "Du granskar alla föreslagna ändringar i ett korrigeringsark — acceptera, avvisa eller redigera. Inget går live utan ditt godkännande.",
    outputSv: "Korrigeringsark · godkänd ändringslista",
  },
  {
    n: 4,
    title: "Apply & verify",
    description:
      "We implement the approved changes — payment A/B variants, copy rewrites, broken-link fixes, email sequence patches, metadata updates. Each change is verified before it goes live.",
    output: "Live changes · verification log",
    who: "Us",
    durationDays: 3,
    titleSv: "Implementera & verifiera",
    descriptionSv:
      "Vi implementerar godkända ändringar — A/B-varianter, omskrivningar, länkfixar, e-postsekvenspatchar, metadata. Varje ändring verifieras innan publicering.",
    outputSv: "Live-ändringar · verifieringslogg",
  },
  {
    n: 5,
    title: "Weekly cycle starts",
    description:
      "Pam takes over the cadence: daily crawl, weekly deep scan, A/B monitoring, email validation. You get a structured weekly report every Friday.",
    output: "Weekly report (PDF) · action items",
    who: "Pam",
    durationDays: 7,
    titleSv: "Veckorytmen startar",
    descriptionSv:
      "Pam tar över rytmen: daglig crawl, veckoscan, A/B-övervakning, e-postvalidering. Du får en strukturerad veckorapport varje fredag.",
    outputSv: "Veckorapport (PDF) · åtgärdspunkter",
  },
  {
    n: 6,
    title: "Ongoing operations",
    description:
      "Every change continues to require your sign-off. Triggers — conversion drops, content drift, automation failures — escalate to a human on our side immediately.",
    output: "Monthly deep review · before/after report on request",
    who: "Pam",
    durationDays: 30,
    titleSv: "Löpande drift",
    descriptionSv:
      "Alla ändringar kräver fortsatt ditt godkännande. Triggers — konverteringsfall, innehållsdrift, automationsfel — eskaleras direkt till en människa hos oss.",
    outputSv: "Månatlig djupgranskning · before/after-rapport vid behov",
  },
];

export type Cadence = {
  frequency: string;
  what: string;
  trigger: string;
  frequencySv?: string;
  whatSv?: string;
  triggerSv?: string;
};

export const cadenceTable: Cadence[] = [
  {
    frequency: "Daily",
    what: "Site crawl · error detection · uptime check",
    trigger: "Automatic — 04:00 local",
    frequencySv: "Dagligen",
    whatSv: "Site-crawl · felkontroll · uptime",
    triggerSv: "Automatiskt — 04:00 lokal tid",
  },
  {
    frequency: "Weekly",
    what: "Full scan · A/B test review · email validation · weekly report",
    trigger: "Automatic — Friday 09:00",
    frequencySv: "Veckovis",
    whatSv: "Full scan · A/B-granskning · e-postvalidering · veckorapport",
    triggerSv: "Automatiskt — fredag 09:00",
  },
  {
    frequency: "Monthly",
    what: "Deep content review · before/after report",
    trigger: "Automatic — first of month",
    frequencySv: "Månadsvis",
    whatSv: "Djup innehållsgranskning · before/after-rapport",
    triggerSv: "Automatiskt — första dagen i månaden",
  },
  {
    frequency: "On trigger",
    what: "Conversion drop · page change · automation failure",
    trigger: "Threshold breached",
    frequencySv: "Vid trigger",
    whatSv: "Konverteringsfall · sidändring · automationsfel",
    triggerSv: "Tröskel passerad",
  },
];

export type Guarantee = {
  title: string;
  description: string;
  titleSv?: string;
  descriptionSv?: string;
};

export const guarantees: Guarantee[] = [
  {
    title: "Read-only by default",
    description:
      "We get read access. You retain write access. Changes ship through your existing publishing flow, with your sign-off.",
    titleSv: "Läsåtkomst som standard",
    descriptionSv:
      "Vi har läsåtkomst. Du behåller skrivåtkomst. Ändringar publiceras via ditt befintliga publiceringsflöde, med ditt godkännande.",
  },
  {
    title: "Nothing ships without tenant sign-off",
    description:
      "Every change is shown to you in a worksheet first. You accept, reject, or edit. Pam only applies what you explicitly approved.",
    titleSv: "Inget går live utan ditt godkännande",
    descriptionSv:
      "Alla ändringar visas i ett korrigeringsark. Du accepterar, avvisar eller redigerar. Pam publicerar endast det du godkänt.",
  },
  {
    title: "Structured PDF report every Friday",
    description:
      "Same format every week — status pill, KPI tiles, validation checks, per-site status, audit trail. Skim it in 2 minutes.",
    titleSv: "Strukturerad PDF-rapport varje fredag",
    descriptionSv:
      "Samma format varje vecka — status, KPI-rutor, valideringar, per-site-status, revisionsspår. Går att skumma på två minuter.",
  },
  {
    title: "Human escalation on every trigger",
    description:
      "When Pam detects a conversion drop, content drift, or automation failure, a human on our side is paged before you are.",
    titleSv: "Mänsklig eskalering vid varje trigger",
    descriptionSv:
      "När Pam ser konverteringsfall, innehållsdrift eller automationsfel, pingas en människa hos oss innan du får aviseringen.",
  },
];

export type Faq = {
  q: string;
  a: string;
  qSv?: string;
  aSv?: string;
};

export const faqs: Faq[] = [
  {
    q: "Do you need admin or write access to our site?",
    a: "No. Read-only is enough for monitoring. For changes, we hand you a worksheet — you (or your team) publish through your existing flow.",
    qSv: "Behöver ni admin- eller skrivåtkomst till vår webbplats?",
    aSv: "Nej. Läsåtkomst räcker för övervakning. För ändringar får du ett korrigeringsark — du (eller ditt team) publicerar via ert befintliga flöde.",
  },
  {
    q: "What does the first week look like?",
    a: "Day 1: kickoff and access. Days 2–4: baseline assessment. Days 5–6: you review the corrections worksheet. Day 7: approved changes go live and the weekly cadence begins.",
    qSv: "Hur ser första veckan ut?",
    aSv: "Dag 1: uppstart och åtkomst. Dag 2–4: baseline-bedömning. Dag 5–6: du granskar korrigeringsarket. Dag 7: godkända ändringar går live och veckorytmen startar.",
  },
  {
    q: "Which tools do you support?",
    a: "Most stacks. We've worked with Webflow, WordPress, Shopify, Stripe checkout, Klaviyo, ActiveCampaign, GA4, Plausible. If your stack isn't listed, ask.",
    qSv: "Vilka verktyg stödjer ni?",
    aSv: "De flesta stackar. Vi har arbetat med Webflow, WordPress, Shopify, Stripe checkout, Klaviyo, ActiveCampaign, GA4, Plausible. Saknas din stack — fråga.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes. Monthly plans, no lock-in. You keep all the reports we've generated.",
    qSv: "Kan vi avsluta när som helst?",
    aSv: "Ja. Månatliga avtal, ingen bindningstid. Du behåller alla rapporter vi tagit fram.",
  },
];
