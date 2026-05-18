import type { Run } from "./types";

// Module-level in-memory store. Survives across requests within one Node
// process; lost on restart. Swap for Postgres when Pam goes live.
declare global {
  var __waRunStore: Map<string, Run> | undefined;
}

const store: Map<string, Run> =
  globalThis.__waRunStore ?? new Map<string, Run>();
globalThis.__waRunStore = store;

export function saveRun(run: Run) {
  store.set(run.id, run);
}

export function getRun(id: string): Run | undefined {
  return store.get(id);
}

export function listRuns(): Run[] {
  return [...store.values()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export function newRunId(): string {
  // Short, sortable, URL-safe: timestamp + 4 random chars.
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 6);
  return `${ts}${rnd}`;
}
