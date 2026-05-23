"use client";

import { Container } from "./components/Container";
import { Section } from "./components/Section";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { services } from "@/lib/content/services";
import { competitorComparison } from "@/lib/content/positioning";
import { useLocale, useT } from "./i18n/LocaleProvider";

export default function HomePage() {
  const previewServices = services.slice(0, 3);
  const { locale } = useLocale();
  const t = useT();
  const sv = locale === "sv";

  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text leading-[1.1]">
              {t("home.hero.h1")}
            </h1>
            <p className="mt-5 text-lg text-text-muted leading-relaxed">
              {t("home.hero.lead")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services">{t("home.hero.viewServices")}</Button>
              <Button href="/how-it-works" variant="outline">{t("home.hero.howItWorks")}</Button>
              <Button href="/pricing" variant="outline">{t("home.hero.pricing")}</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-wide text-wa-primary">
                {t("home.five.eyebrow")}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-text">
                {t("home.five.h2")}
              </h2>
              <p className="mt-3 text-text-muted">
                {t("home.five.lead")}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-bg shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3">{t("home.five.head.type")}</th>
                  <th className="px-5 py-3">{t("home.five.head.theyDo")}</th>
                  <th className="px-5 py-3">{t("home.five.head.weDo")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {competitorComparison.map((row) => (
                  <tr key={row.type} className="align-top">
                    <td className="px-5 py-4 font-medium text-text">
                      {sv && row.typeSv ? row.typeSv : row.type}
                    </td>
                    <td className="px-5 py-4 text-text-muted">
                      {sv && row.theyDoSv ? row.theyDoSv : row.theyDo}
                    </td>
                    <td className="px-5 py-4 text-text">
                      <span className="inline-flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-wa-primary"
                        />
                        <span>{sv && row.weDoSv ? row.weDoSv : row.weDo}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-text-muted">
            {t("home.five.tagline")}
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text">{t("home.core.h2")}</h2>
          <p className="mt-2 text-text-muted">{t("home.core.lead")}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {previewServices.map((s) => (
              <Card key={s.slug} title={sv && s.nameSv ? s.nameSv : s.name}>
                <p className="text-sm text-text-muted">
                  {sv && s.shortDescriptionSv ? s.shortDescriptionSv : s.shortDescription}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/services">{t("home.core.viewAll")}</Button>
          </div>
        </Container>
      </Section>

    </>
  );
}
