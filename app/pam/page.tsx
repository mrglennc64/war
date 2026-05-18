import type { Metadata } from "next";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Button } from "../components/Button";
import {
  kpis,
  recentActivity,
  scheduledJobs,
  properties,
  issuesByWeek,
  type Severity,
  type ActivityEvent,
} from "@/lib/content/pam-plan";

export const metadata: Metadata = {
  title: "Inside Pam — the operations engine — Web Assessment Agency",
  description:
    "The operations layer that powers every customer's weekly report. Scheduled crawls, A/B test monitoring, email checks, and report generation — running underneath every tenant.",
};

const severityStyles: Record<Severity, { label: string; pill: string; dot: string }> = {
  ok: {
    label: "Healthy",
    pill: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  warn: {
    label: "Watch",
    pill: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  issue: {
    label: "Issues",
    pill: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
};

const kindBadge: Record<ActivityEvent["kind"], { label: string; cls: string }> = {
  report: { label: "REPORT", cls: "bg-wa-primary-soft text-wa-primary" },
  crawl: { label: "CRAWL", cls: "bg-blue-50 text-blue-700" },
  ab: { label: "A/B", cls: "bg-purple-50 text-purple-700" },
  email: { label: "EMAIL", cls: "bg-teal-50 text-teal-700" },
  monitor: { label: "MONITOR", cls: "bg-gray-100 text-gray-700" },
  alert: { label: "ALERT", cls: "bg-red-50 text-red-700" },
};

export default function PamPage() {
  const maxIssues = Math.max(...issuesByWeek.map((w) => w.issues));

  return (
    <Section className="pt-10 sm:pt-12">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-wa-primary bg-wa-primary-soft px-4 py-3">
          <p className="text-sm text-text">
            <span className="font-semibold">Looking for your account dashboard?</span>{" "}
            <span className="text-text-muted">
              This page shows the internal engine. Customers see their own data after signing in.
            </span>
          </p>
          <Button href="/login" variant="primary">Sign in to your account</Button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-wa-primary">
              Inside Pam · Operations engine
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-text">
              The automation layer behind every report
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              This is the operations console we run internally — scheduled crawls, A/B test monitoring, email checks, and report generation across all monitored tenants. Customers see a filtered view of their own account in the portal.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-green-500" />
            All systems operational
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-lg border border-border bg-surface p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                {k.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-text">{k.value}</p>
              {k.delta && (
                <p
                  className={`mt-1 text-xs ${
                    k.trend === "up"
                      ? "text-green-600"
                      : k.trend === "down"
                        ? "text-green-600"
                        : "text-text-muted"
                  }`}
                >
                  {k.trend === "up" ? "▲ " : k.trend === "down" ? "▼ " : ""}
                  {k.delta}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text">Recent activity</h2>
              <span className="text-xs text-text-muted">Last 48h</span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {recentActivity.map((e, i) => {
                const badge = kindBadge[e.kind];
                return (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <span
                      className={`mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text">{e.message}</p>
                    </div>
                    <span className="shrink-0 text-xs text-text-muted">{e.ago}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text">Upcoming jobs</h2>
            <ul className="mt-4 space-y-4">
              {scheduledJobs.map((j) => (
                <li key={j.name} className="border-l-2 border-wa-primary pl-3">
                  <p className="text-sm font-medium text-text">{j.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{j.cadence}</p>
                  <p className="mt-1 text-xs font-medium text-wa-primary">
                    Next: {j.nextRun}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-text">Issues found per week</h2>
            <span className="text-xs text-text-muted">Last 8 weeks</span>
          </div>
          <div className="mt-6 flex h-40 items-end gap-3">
            {issuesByWeek.map((w) => {
              const heightPct = (w.issues / maxIssues) * 100;
              return (
                <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-wa-primary transition-all"
                      style={{ height: `${heightPct}%` }}
                      aria-label={`${w.week}: ${w.issues} issues`}
                    />
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-text-muted">
                      {w.issues}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-text-muted">{w.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-base font-semibold text-text">Monitored properties</h2>
            <span className="text-xs text-text-muted">{properties.length} sites</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                  <th className="px-6 py-3">Domain</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last scan</th>
                  <th className="px-6 py-3">Issues</th>
                  <th className="px-6 py-3">Conv. Δ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.map((p) => {
                  const s = severityStyles[p.status];
                  return (
                    <tr key={p.domain} className="text-text">
                      <td className="px-6 py-3 font-medium">{p.domain}</td>
                      <td className="px-6 py-3 text-text-muted">{p.plan}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${s.pill}`}
                        >
                          <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-text-muted">{p.lastScan}</td>
                      <td className="px-6 py-3">{p.issues}</td>
                      <td className="px-6 py-3 text-text-muted">
                        {p.conversionDelta ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/portal">View sample customer dashboard</Button>
          <Button href="/reports" variant="outline">View weekly reports</Button>
          <Button href="/pricing" variant="outline">See pricing</Button>
        </div>

        <p className="mt-6 text-xs text-text-muted">
          Sample data across all tenants shown. The customer portal at{" "}
          <a href="/portal" className="text-wa-primary hover:underline">/portal</a>{" "}
          shows the per-account filtered view your tenants see when they sign in.
        </p>
      </Container>
    </Section>
  );
}
