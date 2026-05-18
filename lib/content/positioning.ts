export type CompetitorRow = {
  type: string;
  theyDo: string;
  weDo: string;
};

export const competitorComparison: CompetitorRow[] = [
  {
    type: "CRO Agencies",
    theyDo: "A/B tests, audits",
    weDo: "Plus email, content, automation, and payment flows",
  },
  {
    type: "SEO Audit Tools",
    theyDo: "Technical checks",
    weDo: "Plus human review, rewrite suggestions, UX, and flows",
  },
  {
    type: "Funnel Agencies",
    theyDo: "Landing page optimization",
    weDo: "Plus weekly monitoring and Pam automation",
  },
  {
    type: "Email Agencies",
    theyDo: "Email audits",
    weDo: "Combined email, site, payment, and content review",
  },
  {
    type: "Social Tools",
    theyDo: "Scheduling",
    weDo: "Actual ready-to-post content, not just tools",
  },
];
