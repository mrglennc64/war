/**
 * Sample tenant data for the customer-facing /portal.
 * Schema is stable; once Pam is live, /api/portal/[tenant] returns the
 * same shape from the real database.
 */

export type TenantPlan = "Starter" | "Standard" | "Professional";
export type Severity = "ok" | "warn" | "issue";

export type TenantSite = {
  domain: string;
  status: Severity;
  lastScan: string;
  issues: number;
  conversionDelta?: string;
  lastScanSv?: string;
  conversionDeltaSv?: string;
};

export type ApprovalKind =
  | "copy"
  | "ab"
  | "metadata"
  | "broken-link"
  | "email";

export type PendingApproval = {
  id: string;
  site: string;
  kind: ApprovalKind;
  title: string;
  proposal: string;
  rationale: string;
  submittedAgo: string;
  titleSv?: string;
  proposalSv?: string;
  rationaleSv?: string;
  submittedAgoSv?: string;
};

export type TenantActivity = {
  ago: string;
  kind: "report" | "crawl" | "ab" | "email" | "monitor" | "alert";
  message: string;
  agoSv?: string;
  messageSv?: string;
};

export type Tenant = {
  slug: string;
  name: string;
  legalName: string;
  plan: TenantPlan;
  contactEmail: string;
  accountManager: string;
  score: number;
  scoreLastWeek: number;
  scoreHistory: { week: string; score: number }[];
  sites: TenantSite[];
  pendingApprovals: PendingApproval[];
  recentActivity: TenantActivity[];
  nextRun: string;
  quietHours: string;
  nextRunSv?: string;
  quietHoursSv?: string;
  latestReport: {
    slug: string;
    week: string;
    date: string;
    summary: string;
    pdfUrl: string;
    weekSv?: string;
    summarySv?: string;
    pdfUrlSv?: string;
  };
};

export const nordicpay: Tenant = {
  slug: "nordicpay",
  name: "Nordicpay",
  legalName: "Nordicpay AB",
  plan: "Standard",
  contactEmail: "ops@nordicpay.se",
  accountManager: "Karin Lindgren",
  score: 98,
  scoreLastWeek: 92,
  scoreHistory: [
    { week: "W13", score: 78 },
    { week: "W14", score: 82 },
    { week: "W15", score: 85 },
    { week: "W16", score: 88 },
    { week: "W17", score: 91 },
    { week: "W18", score: 92 },
    { week: "W19", score: 92 },
    { week: "W20", score: 98 },
  ],
  sites: [
    {
      domain: "nordicpay.se",
      status: "ok",
      lastScan: "2h ago",
      issues: 0,
      conversionDelta: "+4.1%",
      lastScanSv: "2h sedan",
      conversionDeltaSv: "+4,1%",
    },
    {
      domain: "checkout.nordicpay.se",
      status: "warn",
      lastScan: "2h ago",
      issues: 1,
      conversionDelta: "+1.2%",
      lastScanSv: "2h sedan",
      conversionDeltaSv: "+1,2%",
    },
    {
      domain: "support.nordicpay.se",
      status: "ok",
      lastScan: "2h ago",
      issues: 0,
      lastScanSv: "2h sedan",
    },
  ],
  pendingApprovals: [
    {
      id: "ap-2031",
      site: "nordicpay.se",
      kind: "ab",
      title: "Roll Variant B to 100% on /payment",
      proposal:
        "Replace current 50/50 split with Variant B (shorter headline + trust row).",
      rationale:
        "Variant B has won 6 consecutive days at 95% statistical confidence with +4.1% conversion lift.",
      submittedAgo: "4h ago",
      titleSv: "Rulla Variant B till 100 % på /payment",
      proposalSv:
        "Ersätt nuvarande 50/50-split med Variant B (kortare rubrik + trust-rad).",
      rationaleSv:
        "Variant B har vunnit 6 dagar i rad med 95 % statistisk säkerhet och +4,1 % konverteringslyft.",
      submittedAgoSv: "för 4 h sedan",
    },
    {
      id: "ap-2032",
      site: "checkout.nordicpay.se",
      kind: "broken-link",
      title: "Remove broken link in checkout confirmation email",
      proposal:
        "Strip the link to /products/old-promo from the confirmation template — page returned 404 for 12 days.",
      rationale:
        "404 link in a transactional email erodes trust. No traffic value remains.",
      submittedAgo: "1d ago",
      titleSv: "Ta bort trasig länk i checkout-bekräftelsemejl",
      proposalSv:
        "Ta bort länken till /products/old-promo i bekräftelsemallen — sidan har returnerat 404 i 12 dagar.",
      rationaleSv:
        "404-länk i transaktionsmejl minskar förtroendet. Ingen trafiknytta kvar.",
      submittedAgoSv: "för 1 dag sedan",
    },
    {
      id: "ap-2033",
      site: "nordicpay.se",
      kind: "copy",
      title: "Rewrite hero paragraph on /pricing",
      proposal:
        "Tighten the hero paragraph from 38 words to 22; lead with 'predictable monthly billing.'",
      rationale:
        "Bounce rate on /pricing is 18% above site average; current copy buries the lede.",
      submittedAgo: "2d ago",
      titleSv: "Skriv om hero-texten på /pricing",
      proposalSv:
        "Kort ned hero-texten från 38 ord till 22; börja med “förutsägbar månadsdebitering.”",
      rationaleSv:
        "Bounce rate på /pricing är 18 % över sajtens snitt; nuvarande text döljer huvudbudskapet.",
      submittedAgoSv: "för 2 dagar sedan",
    },
  ],
  recentActivity: [
    {
      ago: "1h ago",
      kind: "crawl",
      message: "Daily crawl complete — 3 sites · 1 issue",
      agoSv: "1h sedan",
      messageSv: "Daily crawl klar — 3 webbplatser · 1 ärende",
    },
    {
      ago: "4h ago",
      kind: "ab",
      message: "Variant B reached 95% confidence on /payment (+4.1%)",
      agoSv: "4h sedan",
      messageSv: "Variant B nådde 95 % säkerhet på /payment (+4,1 %)",
    },
    {
      ago: "1d ago",
      kind: "alert",
      message:
        "Broken link detected in checkout confirmation email — pending approval",
      agoSv: "1d sedan",
      messageSv:
        "Trasig länk upptäckt i checkout-mejl — väntar godkännande",
    },
    {
      ago: "2d ago",
      kind: "email",
      message: "Onboarding sequence E1–E3 latency confirmed under 30s",
      agoSv: "2d sedan",
      messageSv: "Onboarding-sekvens E1–E3: latens under 30s",
    },
    {
      ago: "3d ago",
      kind: "report",
      message: "Weekly report — Week 19 published",
      agoSv: "3d sedan",
      messageSv: "Veckorapport — Vecka 19 publicerad",
    },
    {
      ago: "4d ago",
      kind: "monitor",
      message: "Metadata change detected on /pricing (logged)",
      agoSv: "4d sedan",
      messageSv: "Metadataändring upptäckt på /pricing (loggad)",
    },
  ],
  nextRun: "Fri 09:00 — Weekly report",
  nextRunSv: "Fre 09:00 — Veckorapport",
  quietHours: "21:00 – 07:00 (Europe/Stockholm)",
  quietHoursSv: "21:00 – 07:00 (Europe/Stockholm)",
  latestReport: {
    slug: "sample-week-20",
    week: "Week 20",
    date: "2026-05-18",
    summary:
      "All channels reviewed — 0 critical issues. 4 improvements shipped this week, 2 A/B tests concluded, score +6 vs last week.",
    pdfUrl: "/reports/sample-report.pdf",
    weekSv: "Vecka 20",
    summarySv:
      "Alla kanaler granskade — 0 kritiska ärenden. 4 förbättringar publicerade denna vecka, 2 A/B-tester avslutade, poäng +6 jämfört med förra veckan.",
    pdfUrlSv: "/reports/sample-report-sv.pdf",
  },
};

// Index for /api/portal/[tenant] later — for now, one tenant.
export const tenants: Record<string, Tenant> = {
  [nordicpay.slug]: nordicpay,
};
