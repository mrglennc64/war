import type { Metadata } from "next";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services — Web Assessment Agency",
  description:
    "Six structured services: website assessment, payment A/B testing, email review, weekly social content, before/after report, and platform monitoring.",
};

export default function ServicesPage() {
  return (
    <Section className="pt-16">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Full Service Overview
        </h1>
        <p className="mt-3 max-w-2xl text-text-muted">
          Six structured services, each delivered on a predictable cadence with concrete output.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} title={s.name}>
              <p className="text-sm text-text-muted">{s.shortDescription}</p>
              <ul className="mt-4 space-y-2 text-sm text-text">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-wa-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/pricing">See Pricing</Button>
          <Button href="/pam" variant="outline">Pam Automation</Button>
        </div>
      </Container>
    </Section>
  );
}
