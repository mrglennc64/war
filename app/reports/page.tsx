import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { weeklyReports } from "@/lib/content/weekly-reports";

export const metadata: Metadata = {
  title: "Weekly Reports — Web Assessment Agency",
  description:
    "Weekly assessment reports — structured PDFs covering content, payments, email, and monitoring.",
};

export default function ReportsPage() {
  const sorted = [...weeklyReports].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section className="pt-16">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Weekly Assessment Report
        </h1>
        <p className="mt-3 max-w-2xl text-text-muted">
          Download the structured weekly report used for all client assessments. Pam publishes a new one each week.
        </p>

        <ul className="mt-10 space-y-3">
          {sorted.map((r) => (
            <li
              key={r.slug}
              className="rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    {r.week} · {r.date}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-text">
                    <Link
                      href={`/reports/${r.slug}`}
                      className="hover:text-wa-primary"
                    >
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-text-muted">
                    {r.summary}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/reports/${r.slug}`}
                    className="inline-flex items-center justify-center rounded-md border border-wa-primary px-4 py-2 text-sm font-medium text-wa-primary transition-colors hover:bg-wa-primary-soft"
                  >
                    Details
                  </Link>
                  <Link
                    href={r.pdfUrl}
                    className="inline-flex items-center justify-center rounded-md bg-wa-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-wa-primary-dark"
                  >
                    PDF
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
