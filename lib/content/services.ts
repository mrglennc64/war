import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "full-website-assessment",
    name: "Full Website Assessment",
    shortDescription:
      "Full review of structure, content, layout, and errors across mobile and desktop.",
    features: [
      "Content accuracy and clarity",
      "Navigation and structure review",
      "Mobile and desktop layout checks",
      "Broken links, metadata, missing fields",
      "Rewrite recommendations",
    ],
    category: "Audit",
  },
  {
    slug: "payment-ab-testing",
    name: "Payment Page A/B Testing",
    shortDescription:
      "Test headlines, CTAs, layout and trust elements on payment pages.",
    features: [
      "Headline and CTA variants",
      "Layout and trust elements",
      "Conversion tracking",
      "Winning version recommendation",
    ],
    category: "Conversion",
  },
  {
    slug: "email-automation-review",
    name: "Email Automation Review",
    shortDescription:
      "Check triggers, sequences, copy clarity, and performance of email flows.",
    features: [
      "Trigger validation",
      "Sequence structure",
      "Copy clarity",
      "Rewrite suggestions",
    ],
    category: "Automation",
  },
  {
    slug: "weekly-social-content",
    name: "Weekly Social Media Content",
    shortDescription:
      "3–5 platform-ready posts per week with simple visuals.",
    features: [
      "3–5 posts per week",
      "Platform-ready text",
      "Simple visuals",
    ],
    category: "Content",
  },
  {
    slug: "before-after-health-report",
    name: "Before/After Health Report",
    shortDescription:
      "Snapshot and comparison report showing measurable improvement after intervention.",
    features: [
      "Content snapshot",
      "Structure comparison",
      "Trust indicators",
      "Improvement summary",
    ],
    category: "Reporting",
  },
  {
    slug: "platform-monitoring",
    name: "Platform Monitoring",
    shortDescription:
      "Weekly scans for errors, content drift, and broken flows with action lists.",
    features: [
      "Weekly scans",
      "Error detection",
      "Change tracking",
      "Action list",
    ],
    category: "Monitoring",
  },
];
