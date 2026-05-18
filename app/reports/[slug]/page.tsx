import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../components/Container";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { weeklyReports } from "@/lib/content/weekly-reports";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return weeklyReports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = weeklyReports.find((r) => r.slug === slug);
  if (!report) return { title: "Report not found — Web Assessment Agency" };
  return {
    title: `${report.title} — Web Assessment Agency`,
    description: report.summary,
  };
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const report = weeklyReports.find((r) => r.slug === slug);
  if (!report) notFound();

  return (
    <Section className="pt-16">
      <Container>
        <Link
          href="/reports"
          className="inline-flex items-center text-sm text-text-muted hover:text-text"
        >
          ← All reports
        </Link>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {report.week} · {report.date}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text">
            {report.title}
          </h1>
          <p className="mt-4 max-w-2xl text-text-muted">{report.summary}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={report.pdfUrl}>Download PDF</Button>
          <Button href="/pam" variant="outline">How Pam generates this</Button>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-surface p-6 text-sm text-text-muted">
          <p>
            This is a placeholder report record. Once Pam is wired up, weekly reports will be written here automatically and the PDF link will point to Pam-generated output.
          </p>
        </div>
      </Container>
    </Section>
  );
}
