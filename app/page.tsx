import { Container } from "./components/Container";
import { Section } from "./components/Section";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { services } from "@/lib/content/services";
import { competitorComparison } from "@/lib/content/positioning";

export default function HomePage() {
  const previewServices = services.slice(0, 3);

  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text leading-[1.1]">
              Web Assessment for Clear, Stable and High-Performing Websites
            </h1>
            <p className="mt-5 text-lg text-text-muted leading-relaxed">
              We analyze websites, payment flows, email automations and weekly content. Focus: stability, clarity, and measurable improvements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services">View Full Services</Button>
              <Button href="/how-it-works" variant="outline">How it works</Button>
              <Button href="/pricing" variant="outline">Pricing</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-wide text-wa-primary">
                Five agencies in one
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-text">
                One operational partner instead of five separate vendors
              </h2>
              <p className="mt-3 text-text-muted">
                Most teams stitch together a CRO agency, an SEO tool, a funnel consultant, an email auditor, and a social scheduler. We deliver all of it on a single weekly cadence — with a clean, operational, Scandinavian tone.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-bg shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3">Competitor type</th>
                  <th className="px-5 py-3">What they do</th>
                  <th className="px-5 py-3">What we do better</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {competitorComparison.map((row) => (
                  <tr key={row.type} className="align-top">
                    <td className="px-5 py-4 font-medium text-text">{row.type}</td>
                    <td className="px-5 py-4 text-text-muted">{row.theyDo}</td>
                    <td className="px-5 py-4 text-text">
                      <span className="inline-flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-wa-primary"
                        />
                        <span>{row.weDo}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-text-muted">
            Five capabilities, one partner, one weekly report.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text">Core Services</h2>
          <p className="mt-2 text-text-muted">A focused selection of what we ship every month.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {previewServices.map((s) => (
              <Card key={s.slug} title={s.name}>
                <p className="text-sm text-text-muted">{s.shortDescription}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/services">View All Services</Button>
          </div>
        </Container>
      </Section>

    </>
  );
}
