import type { Metadata } from "next";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import {
  processSteps,
  cadenceTable,
  guarantees,
  faqs,
} from "@/lib/content/process";

export const metadata: Metadata = {
  title: "How it works — Web Assessment Agency",
  description:
    "Six steps from kickoff to weekly cadence. Read-only access, tenant sign-off on every change, structured PDF report every Friday.",
};

const whoStyles: Record<string, string> = {
  Us: "bg-wa-primary-soft text-wa-primary",
  Pam: "bg-blue-50 text-blue-700",
  You: "bg-gray-100 text-gray-700",
};

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-16">
        <Container>
          <p className="text-xs font-medium uppercase tracking-wide text-wa-primary">
            How it works
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Six steps from kickoff to a weekly cadence
          </h1>
          <p className="mt-4 max-w-2xl text-text-muted">
            The first week is hands-on — we get oriented, baseline your sites, and ship the first round of approved changes. From week two, Pam runs the cadence and you get a structured report every Friday.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface pt-12">
        <Container>
          <h2 className="text-2xl font-semibold text-text">Process</h2>
          <ol className="mt-8 space-y-4">
            {processSteps.map((s) => (
              <li
                key={s.n}
                className="rounded-lg border border-border bg-bg p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-primary text-base font-bold text-white">
                    {s.n}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-text">
                        {s.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${whoStyles[s.who]}`}
                      >
                        {s.who}
                      </span>
                      <span className="text-xs text-text-muted">
                        ~{s.durationDays}{" "}
                        {s.durationDays === 1 ? "day" : "days"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {s.description}
                    </p>
                    <p className="mt-3 text-xs">
                      <span className="font-semibold uppercase tracking-wide text-text-muted">
                        Output:
                      </span>{" "}
                      <span className="text-text">{s.output}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <h2 className="text-2xl font-semibold text-text">Cadence</h2>
          <p className="mt-2 max-w-2xl text-text-muted">
            What runs when, and what triggers a human on our side.
          </p>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3">Frequency</th>
                  <th className="px-5 py-3">What runs</th>
                  <th className="px-5 py-3">Trigger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cadenceTable.map((c) => (
                  <tr key={c.frequency} className="align-top">
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-wa-primary-soft px-2.5 py-0.5 text-xs font-semibold text-wa-primary">
                        {c.frequency}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-text">{c.what}</td>
                    <td className="px-5 py-4 text-text-muted">{c.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <h2 className="text-2xl font-semibold text-text">Operating principles</h2>
          <p className="mt-2 max-w-2xl text-text-muted">
            What you can count on every week.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-lg border border-border bg-bg p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700"
                  >
                    ✓
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <h2 className="text-2xl font-semibold text-text">FAQ</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-border bg-surface p-5 shadow-sm open:shadow-md"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium text-text">{f.q}</h3>
                    <span
                      aria-hidden
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="rounded-lg border border-border bg-bg p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-text">
              Want to see the format first?
            </h2>
            <p className="mt-3 text-text-muted">
              The sample weekly report shows exactly what lands in your inbox every Friday.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/reports/sample-week-20">View sample report</Button>
              <Button href="/pricing" variant="outline">See pricing</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
