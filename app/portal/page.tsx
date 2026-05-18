import type { Metadata } from "next";
import Link from "next/link";
import { PortalHeader } from "./components/PortalHeader";
import { ScoreRing } from "./components/ScoreRing";
import { tenants, type Severity, type ApprovalKind } from "@/lib/content/tenants";

export const metadata: Metadata = {
  title: "Dashboard — Web Assessment Agency",
};

// In a future iteration this comes from cookie/session. Hard-coded for the demo.
const ACTIVE_TENANT = "nordicpay";

const severityStyles: Record<Severity, { label: string; pill: string; dot: string }> = {
  ok: { label: "Healthy", pill: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500" },
  warn: { label: "Watch", pill: "bg-yellow-50 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  issue: { label: "Issues", pill: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};

const approvalBadge: Record<ApprovalKind, { label: string; cls: string }> = {
  copy: { label: "COPY", cls: "bg-blue-50 text-blue-700" },
  ab: { label: "A/B", cls: "bg-purple-50 text-purple-700" },
  metadata: { label: "META", cls: "bg-gray-100 text-gray-700" },
  "broken-link": { label: "LINK", cls: "bg-red-50 text-red-700" },
  email: { label: "EMAIL", cls: "bg-teal-50 text-teal-700" },
};

export default function PortalPage() {
  const tenant = tenants[ACTIVE_TENANT];
  const scoreDelta = tenant.score - tenant.scoreLastWeek;
  const maxHist = Math.max(...tenant.scoreHistory.map((p) => p.score));
  const minHist = Math.min(...tenant.scoreHistory.map((p) => p.score));
  const issuesOpen = tenant.sites.reduce((sum, s) => sum + s.issues, 0);

  return (
    <div className="min-h-screen bg-bg">
      <PortalHeader tenant={tenant} />

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-800">
          Demo tenant — sample data. Real data ships when Pam connects to your account.
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text">
              Welcome back, {tenant.accountManager.split(" ")[0]}.
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Here&apos;s where {tenant.name} stands this week. Last sync: 2 minutes ago.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-green-500" />
            Account healthy
          </div>
        </div>

        {/* Top row: score + KPIs */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                This week&apos;s score
              </p>
              <span
                className={`text-xs font-semibold ${
                  scoreDelta >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {scoreDelta >= 0 ? "▲" : "▼"} {Math.abs(scoreDelta)} pts
              </span>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <ScoreRing score={tenant.score} max={100} size={120} />
              <div className="text-sm text-text-muted">
                <p>
                  Last week:{" "}
                  <span className="font-medium text-text">{tenant.scoreLastWeek}</span>
                </p>
                <p className="mt-1">
                  Issues resolved:{" "}
                  <span className="font-medium text-text">3 of 3</span>
                </p>
                <p className="mt-1">
                  Next report:{" "}
                  <span className="font-medium text-text">{tenant.nextRun}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            <KpiTile
              label="Pending your approval"
              value={String(tenant.pendingApprovals.length)}
              hint="Action needed"
              accent="warn"
            />
            <KpiTile
              label="Sites monitored"
              value={String(tenant.sites.length)}
              hint={`${tenant.plan} plan`}
            />
            <KpiTile
              label="Open issues"
              value={String(issuesOpen)}
              hint={issuesOpen === 0 ? "All clear" : "See sites below"}
              accent={issuesOpen > 0 ? "warn" : "ok"}
            />
            <KpiTile
              label="Conversion Δ"
              value="+2.7%"
              hint="vs last week"
              accent="ok"
            />
          </div>
        </div>

        {/* Pending approvals — the action-needed section */}
        <section className="mt-8 rounded-lg border-2 border-wa-primary bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">
                Pending your approval
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Pam suggests {tenant.pendingApprovals.length} changes. Nothing ships until you sign off.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-md border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-muted"
              >
                Accept all
              </button>
              <button
                type="button"
                disabled
                className="rounded-md border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-muted"
              >
                Defer to next week
              </button>
            </div>
          </div>

          <ul className="mt-5 divide-y divide-border">
            {tenant.pendingApprovals.map((a) => {
              const b = approvalBadge[a.kind];
              return (
                <li key={a.id} className="py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ${b.cls}`}
                        >
                          {b.label}
                        </span>
                        <span className="text-xs text-text-muted">{a.site}</span>
                        <span className="text-xs text-text-muted">·</span>
                        <span className="text-xs text-text-muted">
                          submitted {a.submittedAgo}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-semibold text-text">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">
                        <span className="font-medium text-text">Proposal:</span>{" "}
                        {a.proposal}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">
                        <span className="font-medium text-text">Why:</span>{" "}
                        {a.rationale}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        className="rounded-md bg-wa-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-wa-primary-dark"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text hover:bg-bg"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Two columns: Sites + Latest report */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-text">Your sites</h2>
              <span className="text-xs text-text-muted">
                {tenant.sites.length} sites
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                    <th className="px-6 py-3">Domain</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last scan</th>
                    <th className="px-6 py-3">Issues</th>
                    <th className="px-6 py-3">Conv. Δ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tenant.sites.map((s) => {
                    const st = severityStyles[s.status];
                    return (
                      <tr key={s.domain}>
                        <td className="px-6 py-3 font-medium text-text">
                          {s.domain}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${st.pill}`}
                          >
                            <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-text-muted">
                          {s.lastScan}
                        </td>
                        <td className="px-6 py-3 text-text">{s.issues}</td>
                        <td className="px-6 py-3 text-text-muted">
                          {s.conversionDelta ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text">
                Latest weekly report
              </h2>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              {tenant.latestReport.week} · {tenant.latestReport.date}
            </p>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              {tenant.latestReport.summary}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                href={tenant.latestReport.pdfUrl}
                className="inline-flex items-center justify-center rounded-md bg-wa-primary px-3.5 py-2 text-sm font-medium text-white hover:bg-wa-primary-dark"
              >
                Download PDF
              </Link>
              <Link
                href={`/reports/${tenant.latestReport.slug}`}
                className="inline-flex items-center justify-center rounded-md border border-border px-3.5 py-2 text-sm font-medium text-text hover:bg-bg"
              >
                View online
              </Link>
            </div>
          </div>
        </div>

        {/* Score history + recent activity */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text">
                Score over time
              </h2>
              <span className="text-xs text-text-muted">Last 8 weeks</span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-3">
              {tenant.scoreHistory.map((p) => {
                const range = Math.max(1, maxHist - minHist);
                const heightPct = ((p.score - minHist + 5) / (range + 5)) * 100;
                const isCurrent = p.week === tenant.scoreHistory[tenant.scoreHistory.length - 1].week;
                return (
                  <div key={p.week} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex w-full flex-1 items-end">
                      <div
                        className={`w-full rounded-t ${isCurrent ? "bg-wa-primary" : "bg-wa-primary-soft"}`}
                        style={{ height: `${heightPct}%` }}
                        aria-label={`${p.week}: score ${p.score}`}
                      />
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-text">
                        {p.score}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-text-muted">
                      {p.week}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text">
                Recent activity
              </h2>
              <span className="text-xs text-text-muted">Last 7 days</span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {tenant.recentActivity.map((e, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-text">{e.message}</p>
                  </div>
                  <span className="shrink-0 text-xs text-text-muted">{e.ago}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted">
          <div>
            Account manager:{" "}
            <span className="text-text">{tenant.accountManager}</span> ·{" "}
            <a
              href={`mailto:${tenant.contactEmail}`}
              className="text-wa-primary hover:underline"
            >
              {tenant.contactEmail}
            </a>
          </div>
          <div>
            Quiet hours: <span className="text-text">{tenant.quietHours}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function KpiTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: "ok" | "warn";
}) {
  const accentClass =
    accent === "warn"
      ? "text-yellow-700"
      : accent === "ok"
        ? "text-green-600"
        : "text-text-muted";
  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-text">{value}</p>
      {hint && <p className={`mt-1 text-xs ${accentClass}`}>{hint}</p>}
    </div>
  );
}
