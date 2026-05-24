"use client";

import Link from "next/link";
import type { Channel, Job, Run } from "@/lib/jobs/types";
import { channels, channelLabels } from "@/lib/jobs/types";
import { ScoreRing } from "@/app/portal/components/ScoreRing";
import { useLocale, useT } from "@/app/i18n/LocaleProvider";

type StatusKey = "pass" | "watch" | "critical";

function statusForJob(job: Job): StatusKey {
  const f = job.result?.findings ?? [];
  if (f.some((x) => x.severity === "issue")) return "critical";
  if (f.some((x) => x.severity === "warn")) return "watch";
  return "pass";
}

const channelLabelsSv: Record<Channel, string> = {
  audit: "Granskning & CRO",
  seo: "SEO / tekniskt",
  funnel: "Funnel / betalning (statisk)",
  email: "E-post",
  deliverability: "E-postleverans (DNS)",
  social: "Sociala medier",
  browser: "Syntetisk webbläsarkontroll",
};

export function ScanTeaserView({ run }: { run: Run }) {
  const { locale } = useLocale();
  const t = useT();
  const sv = locale === "sv";

  const completed = channels
    .map((ch) => run.jobs[ch])
    .filter((j) => j.status === "done" && j.result);
  const pending = channels.length - completed.length;

  const allFindings = completed.flatMap((j) =>
    (j.result?.findings ?? []).map((f) => ({ ...f, channel: j.channel }))
  );
  const issueFindings = allFindings.filter((f) => f.severity === "issue");
  const warnFindings = allFindings.filter((f) => f.severity === "warn");
  const passCount = allFindings.filter((f) => f.severity === "ok").length;

  // Teaser: show first 2 critical, then 1 watch. Lock the rest.
  const unblurred = [...issueFindings.slice(0, 2), ...warnFindings.slice(0, 1)];
  const lockedCount = Math.max(
    0,
    issueFindings.length + warnFindings.length - unblurred.length
  );

  const overallScore =
    completed.length === 0
      ? 0
      : Math.round(
          completed.reduce((s, j) => s + (j.result?.score ?? 0), 0) /
            completed.length
        );

  const stillScanning = pending > 0;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-text hover:text-wa-primary"
          >
            Web Assessment Agency
          </Link>
          <span className="text-xs text-text-muted">
            {sv ? "Gratis skanning" : "Free scan"}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <section className="rounded-xl border border-border bg-surface p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-wa-primary">
                {sv ? "Resultat — gratis skanning" : "Free scan result"}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
                {run.customer}
              </h1>
              <p className="mt-2 break-all font-mono text-sm text-text-muted">
                {run.url}
              </p>
              {stillScanning ? (
                <p className="mt-5 max-w-2xl text-sm text-text-muted">
                  {sv
                    ? `Skanningen pågår fortfarande. ${completed.length} av ${channels.length} kanaler klara — ladda om sidan om en stund.`
                    : `Scan still running. ${completed.length} of ${channels.length} channels done — refresh in a moment.`}
                </p>
              ) : (
                <p className="mt-5 max-w-2xl text-sm text-text-muted">
                  {sv
                    ? `Alla ${channels.length} kanaler granskade. Två synliga fynd nedan; resten låsta i fullversionen.`
                    : `All ${channels.length} channels reviewed. Two visible findings below; the rest are locked in the full audit.`}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                <span>
                  {sv ? "Kritiska:" : "Critical:"}{" "}
                  <span className="font-semibold text-text">
                    {issueFindings.length}
                  </span>
                </span>
                <span>
                  {sv ? "Bevakas:" : "Watch:"}{" "}
                  <span className="font-semibold text-text">
                    {warnFindings.length}
                  </span>
                </span>
                <span>
                  {sv ? "Stabila:" : "Passing:"}{" "}
                  <span className="font-semibold text-text">{passCount}</span>
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <ScoreRing score={overallScore} size={140} stroke={12} />
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-text">
            {sv ? "Kanalöversikt" : "Channel overview"}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {sv
              ? "Status per kanal. Detaljer per fynd är låsta i den fullständiga rapporten."
              : "Per-channel status. Per-finding details are locked in the full report."}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {channels.map((ch) => {
              const job = run.jobs[ch];
              const status = statusForJob(job);
              const label = sv ? channelLabelsSv[ch] : channelLabels[ch];
              const statusLabel =
                status === "critical"
                  ? sv
                    ? "Kritiska"
                    : "Critical"
                  : status === "watch"
                  ? sv
                    ? "Bevakas"
                    : "Watch"
                  : sv
                  ? "Stabil"
                  : "Pass";
              const cls =
                status === "critical"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : status === "watch"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-green-50 text-green-700 border-green-200";
              return (
                <div
                  key={ch}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 shadow-sm"
                >
                  <span className="text-sm font-medium text-text">{label}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text">
            {sv ? "Synliga fynd" : "Visible findings"}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {sv
              ? "Smakprov från rapporten — fullständig analys kräver ett konto."
              : "A sample from the report — full analysis requires an account."}
          </p>
          {unblurred.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">
              {sv
                ? "Inga kritiska eller bevakningsfynd hittills."
                : "No critical or watch findings so far."}
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {unblurred.map((f, i) => {
                const dotCls =
                  f.severity === "issue" ? "bg-red-500" : "bg-yellow-500";
                const channelName = sv
                  ? channelLabelsSv[f.channel]
                  : channelLabels[f.channel];
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-md border border-border bg-bg px-4 py-3"
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${dotCls}`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text">{f.label}</p>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {channelName}
                      </p>
                      {f.detail && (
                        <p className="mt-1 text-xs text-text-muted">
                          {f.detail}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {lockedCount > 0 && (
            <div className="mt-6 rounded-lg border border-dashed border-border bg-bg/60 px-5 py-4 text-center">
              <p className="text-sm font-medium text-text">
                {sv
                  ? `🔒 ${lockedCount} fler fynd är låsta`
                  : `🔒 ${lockedCount} more findings are locked`}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                {sv
                  ? "Lås upp den fullständiga rapporten med ett konto."
                  : "Unlock the full report with an account."}
              </p>
            </div>
          )}
        </section>

        <section className="mt-10 rounded-xl border border-wa-primary bg-wa-primary-soft p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-text">
                {sv
                  ? "Lås upp den fullständiga granskningen"
                  : "Unlock the full audit"}
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                {sv
                  ? "Alla fynd, kvalitetspoäng, PDF-rapport och veckorytm."
                  : "Every finding, quality scoring, PDF report, and weekly cadence."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md bg-wa-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-wa-primary-dark"
              >
                {t("services.seePricing")}
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-wa-primary px-5 py-2.5 text-sm font-medium text-wa-primary hover:bg-wa-primary/10"
              >
                {sv ? "Så fungerar det" : "How it works"}
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-border pt-6 text-xs text-text-muted">
          <p>
            {sv
              ? "Genererad av Pam · gratis skanning är begränsad till 1 per e-post per 30 dagar."
              : "Generated by Pam · free scan is limited to 1 per email per 30 days."}
          </p>
        </footer>
      </main>
    </div>
  );
}
