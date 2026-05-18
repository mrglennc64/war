"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Container } from "./Container";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/pam", label: "Pam Automation" },
  { href: "/reports", label: "Weekly Report" },
];

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrollSnapshot = () => window.scrollY > 4;
const getScrollServerSnapshot = () => false;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );

  // Hide the marketing nav on logged-in portal routes, login pages, ops
  // tools, and customer-facing shared reports.
  if (
    pathname.startsWith("/portal") ||
    pathname.startsWith("/ops") ||
    pathname.startsWith("/r/") ||
    pathname === "/login"
  )
    return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-surface/85 backdrop-blur transition-shadow ${
        scrolled
          ? "shadow-sm border-b border-border"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-text"
          onClick={closeMenu}
        >
          Web Assessment Agency
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                isActive(l.href)
                  ? "text-wa-primary"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-md border border-wa-primary px-3 py-1.5 text-xs font-medium text-wa-primary hover:bg-wa-primary-soft"
          >
            Sign in
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-text"
        >
          <span
            aria-hidden
            className="block h-0.5 w-4 bg-current relative before:content-[''] before:absolute before:left-0 before:-top-1.5 before:h-0.5 before:w-4 before:bg-current after:content-[''] after:absolute after:left-0 after:top-1.5 after:h-0.5 after:w-4 after:bg-current"
          />
        </button>
      </Container>

      <div
        className={`md:hidden overflow-hidden border-t border-border bg-surface transition-[max-height] duration-200 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`rounded-md px-2 py-2 text-sm ${
                isActive(l.href)
                  ? "text-wa-primary bg-wa-primary-soft"
                  : "text-text-muted hover:text-text hover:bg-bg"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={closeMenu}
            className="mt-2 rounded-md border border-wa-primary px-2 py-2 text-sm font-medium text-wa-primary hover:bg-wa-primary-soft"
          >
            Sign in
          </Link>
        </Container>
      </div>
    </header>
  );
}
