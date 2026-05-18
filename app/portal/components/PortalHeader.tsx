import Link from "next/link";
import type { Tenant } from "@/lib/content/tenants";

export function PortalHeader({ tenant }: { tenant: Tenant }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-text hover:text-wa-primary"
          >
            Web Assessment Agency
          </Link>
          <span className="text-text-muted">/</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-wa-primary-soft text-xs font-bold text-wa-primary"
            >
              {tenant.name.slice(0, 1)}
            </span>
            <span className="text-sm font-medium text-text">
              {tenant.legalName}
            </span>
            <span className="rounded-full bg-wa-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-wa-primary">
              {tenant.plan}
            </span>
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/portal"
            className="text-text hover:text-wa-primary"
            aria-current="page"
          >
            Dashboard
          </Link>
          <Link href="/portal" className="text-text-muted hover:text-text">
            Reports
          </Link>
          <Link href="/portal" className="text-text-muted hover:text-text">
            Settings
          </Link>
          <span className="h-5 w-px bg-border" aria-hidden />
          <Link
            href="/login"
            className="text-xs text-text-muted hover:text-text"
          >
            Sign out
          </Link>
        </nav>
      </div>
    </header>
  );
}
