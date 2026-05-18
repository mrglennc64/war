export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  features: string[];
  category?: string;
};

export type PricingTier = {
  slug: string;
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  highlighted?: boolean;
};

export type WeeklyReport = {
  slug: string;
  title: string;
  week: string;
  summary: string;
  pdfUrl: string;
  date: string;
};

export type PamPlanItem = {
  cadence: string;
  description: string;
};
