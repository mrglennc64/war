/**
 * Renders a real-data health report PDF from a completed Run.
 * Same visual language as public/reports/sample-report.pdf but populated
 * with the actual job results from /ops/runs/[id].
 */
import {
  Document,
  Page,
  Text,
  View,
  Svg,
  Circle,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { channels, channelLabels, type Channel, type Job, type Run } from "@/lib/jobs/types";

// ── Tokens ──────────────────────────────────────────────────────────────
const C = {
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  surface: "#ffffff",
  bg: "#f7f9fb",
  primary: "#1f6feb",
  primarySoft: "#e3edff",
  ok: "#16a34a",
  okSoft: "#dcfce7",
  okBorder: "#bbf7d0",
  warn: "#ca8a04",
  warnSoft: "#fef9c3",
  warnBorder: "#fde68a",
  danger: "#dc2626",
  dangerSoft: "#fee2e2",
  dangerBorder: "#fecaca",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.text,
    backgroundColor: C.surface,
  },

  pillRow: { flexDirection: "row", marginBottom: 14 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: { fontSize: 9, fontFamily: "Helvetica-Bold" },

  h1: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.text, marginBottom: 6 },
  sub: { fontSize: 10, color: C.muted, lineHeight: 1.45 },

  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
  },
  heroLeft: { flex: 1, paddingRight: 18 },

  sectionLabel: {
    fontSize: 10,
    color: C.primary,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  breakdown: {
    padding: 12,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    marginBottom: 16,
  },

  kpiRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  kpi: {
    width: "32%",
    padding: 10,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
  },
  kpiLabel: {
    fontSize: 7,
    color: C.muted,
    letterSpacing: 1,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  kpiValue: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.text },
  kpiSub: { fontSize: 8, color: C.muted, marginTop: 3 },

  sectionHead: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 8,
  },

  channelBlock: {
    marginBottom: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
  },
  channelHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  channelTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.text },
  channelScoreBox: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.bg,
  },
  channelScoreText: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.text },
  channelSummary: { fontSize: 9.5, color: C.muted, marginTop: 4, marginBottom: 6, lineHeight: 1.45 },

  findingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 3,
  },
  findingDot: {
    width: 10,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 1,
  },
  findingText: { flex: 1, fontSize: 9.5, color: C.text, lineHeight: 1.4 },
  findingDetail: { color: C.muted },

  audit: {
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    marginTop: 14,
    marginBottom: 14,
  },
  auditLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  auditText: { fontSize: 9, color: C.muted, lineHeight: 1.5 },

  footer: {
    textAlign: "center",
    fontSize: 8,
    color: C.muted,
    marginTop: 4,
  },
});

// ── Score helpers ───────────────────────────────────────────────────────
function statusFor(score: number) {
  if (score >= 85) return { label: "HEALTHY", border: C.okBorder, bg: C.okSoft, fg: C.ok };
  if (score >= 60) return { label: "NEEDS WORK", border: C.warnBorder, bg: C.warnSoft, fg: C.warn };
  return { label: "CRITICAL ISSUES", border: C.dangerBorder, bg: C.dangerSoft, fg: C.danger };
}

function findingDot(severity: "ok" | "warn" | "issue") {
  if (severity === "ok") return { ch: "·", color: C.ok };
  if (severity === "warn") return { ch: "·", color: C.warn };
  return { ch: "·", color: C.danger };
}

// ── Score ring ──────────────────────────────────────────────────────────
function ScoreCircle({
  score,
  max = 100,
  size = 92,
  stroke = 7,
}: {
  score: number;
  max?: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (score / max);
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute" }}>
        <Circle cx={cx} cy={cy} r={r} stroke={C.primarySoft} strokeWidth={stroke} fill="none" />
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={C.primary}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </Svg>
      <Text style={{ fontSize: 26, fontFamily: "Helvetica-Bold", color: C.text }}>{score}</Text>
      <Text style={{ fontSize: 7, color: C.muted, marginTop: 1 }}>{`/ ${max}`}</Text>
    </View>
  );
}

// ── Layout pieces ───────────────────────────────────────────────────────
function HeaderPill({ score }: { score: number }) {
  const s = statusFor(score);
  return (
    <View style={styles.pillRow}>
      <View
        style={[styles.pill, { borderColor: s.border, backgroundColor: s.bg }] as never}
      >
        <Text style={[styles.pillText, { color: s.fg }] as never}>✓  {s.label}</Text>
      </View>
    </View>
  );
}

function Hero({ run, overallScore }: { run: Run; overallScore: number }) {
  const completed = channels
    .map((ch) => run.jobs[ch])
    .filter((j) => j.status === "done" || j.status === "failed");
  const allFindings = completed.flatMap((j) => j.result?.findings ?? []);
  const issues = allFindings.filter((f) => f.severity === "issue").length;
  const warns = allFindings.filter((f) => f.severity === "warn").length;
  const oks = allFindings.filter((f) => f.severity === "ok").length;

  return (
    <View style={styles.hero}>
      <View style={styles.heroLeft}>
        <Text style={styles.h1}>{run.customer} — Health Report</Text>
        <Text style={styles.sub}>
          {run.url} · {new Date(run.createdAt).toISOString().split("T")[0]} · {completed.length} channels analyzed
        </Text>
        <Text style={[styles.sub, { marginTop: 8 }] as never}>
          {issues} critical · {warns} watch · {oks} passing · run {run.id}
        </Text>
      </View>
      <ScoreCircle score={overallScore} />
    </View>
  );
}

function ChannelKpis({ run }: { run: Run }) {
  return (
    <View style={styles.kpiRow}>
      {channels.map((ch) => {
        const job = run.jobs[ch];
        const score = job.result?.score;
        const isDone = job.status === "done";
        return (
          <View key={ch} style={styles.kpi}>
            <Text style={styles.kpiLabel}>{channelLabels[ch]}</Text>
            <Text style={styles.kpiValue}>{isDone && score !== undefined ? score : "—"}</Text>
            <Text style={styles.kpiSub}>
              {isDone
                ? `${job.result?.findings.length ?? 0} finding(s)`
                : job.status === "failed"
                  ? "failed"
                  : job.status}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function ChannelSection({ ch, job }: { ch: Channel; job: Job }) {
  const findings = job.result?.findings ?? [];
  return (
    <View style={styles.channelBlock} wrap={true}>
      <View style={styles.channelHead}>
        <Text style={styles.channelTitle}>{channelLabels[ch]}</Text>
        {job.result && (
          <View style={styles.channelScoreBox}>
            <Text style={styles.channelScoreText}>{job.result.score} / 100</Text>
          </View>
        )}
      </View>
      {job.result?.summary && (
        <Text style={styles.channelSummary}>{job.result.summary}</Text>
      )}
      {job.status === "failed" && (
        <Text style={[styles.channelSummary, { color: C.danger }] as never}>
          Job failed: {job.error}
        </Text>
      )}
      {findings.map((f, i) => {
        const d = findingDot(f.severity);
        return (
          <View key={i} style={styles.findingRow}>
            <Text style={[styles.findingDot, { color: d.color }] as never}>●</Text>
            <Text style={styles.findingText}>
              {f.label}
              {f.detail && (
                <Text style={styles.findingDetail}>{` — ${f.detail}`}</Text>
              )}
            </Text>
          </View>
        );
      })}
      {ch === "social" &&
        Array.isArray(
          (job.result?.details as { drafts?: unknown } | undefined)?.drafts
        ) && (
          <DraftPosts
            drafts={
              (job.result!.details as {
                drafts: { platform: string; text: string }[];
              }).drafts
            }
          />
        )}
    </View>
  );
}

function DraftPosts({
  drafts,
}: {
  drafts: { platform: string; text: string }[];
}) {
  return (
    <View style={{ marginTop: 8, gap: 6 }}>
      {drafts.map((d, i) => (
        <View
          key={i}
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: C.border,
            borderRadius: 6,
            backgroundColor: C.bg,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontFamily: "Helvetica-Bold",
              color: C.primary,
              letterSpacing: 1,
              marginBottom: 3,
            }}
          >
            {d.platform.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 9, color: C.text, lineHeight: 1.4 }}>
            {d.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

function AuditTrail({ run }: { run: Run }) {
  return (
    <View style={styles.audit}>
      <Text style={styles.auditLabel}>Audit trail</Text>
      <Text style={styles.auditText}>
        Generated by Pam on {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC. Run identifier:{" "}
        {run.id}. Findings are derived from an automated scan of {run.url} — static HTML parse plus headless browser render. Operator review is recommended before sharing externally.
      </Text>
    </View>
  );
}

function Footer() {
  return (
    <Text style={styles.footer}>
      Web Assessment Agency · webassessment.agency · Generated by Pam
    </Text>
  );
}

// ── Document ────────────────────────────────────────────────────────────
function HealthReport({ run }: { run: Run }) {
  const completed = channels
    .map((ch) => run.jobs[ch])
    .filter((j) => j.status === "done" && j.result);
  const overallScore =
    completed.length === 0
      ? 0
      : Math.round(
          completed.reduce((s, j) => s + (j.result?.score ?? 0), 0) /
            completed.length
        );

  return (
    <Document
      title={`Health Report — ${run.customer}`}
      author="Web Assessment Agency"
      subject={`Health report for ${run.url}`}
    >
      <Page size="A4" style={styles.page}>
        <HeaderPill score={overallScore} />
        <Hero run={run} overallScore={overallScore} />
        <Text style={styles.sectionLabel}>Channel scores</Text>
        <ChannelKpis run={run} />
        <Text style={styles.sectionHead}>1. Channel findings</Text>
        {channels.slice(0, 3).map((ch) => (
          <ChannelSection key={ch} ch={ch} job={run.jobs[ch]} />
        ))}
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHead}>1. Channel findings (continued)</Text>
        {channels.slice(3).map((ch) => (
          <ChannelSection key={ch} ch={ch} job={run.jobs[ch]} />
        ))}
        <AuditTrail run={run} />
        <Footer />
      </Page>
    </Document>
  );
}

export async function renderHealthReportPdf(run: Run): Promise<Buffer> {
  return await renderToBuffer(<HealthReport run={run} />);
}
