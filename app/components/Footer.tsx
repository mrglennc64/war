"use client";

import { usePathname } from "next/navigation";
import { Container } from "./Container";

export function Footer() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/portal") ||
    pathname.startsWith("/ops") ||
    pathname === "/login"
  )
    return null;

  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">
          Web Assessment Agency — structured, repeatable checks for websites and SaaS platforms.
        </p>
        <p className="text-xs text-text-muted">© {year}</p>
      </Container>
    </footer>
  );
}
