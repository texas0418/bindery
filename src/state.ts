// src/state.ts
// The one mutable store: flags + kv, persisted through db.ts, subscribed to
// with useSyncExternalStore. Screens read; solving pages writes.

import { useSyncExternalStore } from 'react';

import { flagKey, keyKey, pageKey, rowsToState, seenKey } from './dbCore';
import { delKv, loadAll, migrate, resetAll, setKv } from './db';
import type { Flag, KeyId } from './models';

let flags = new Set<string>();
let kv = new Map<string, string>();
let version = 0;
const listeners = new Set<() => void>();

export function initState(): void {
  migrate();
  const loaded = rowsToState(loadAll());
  flags = loaded.flags;
  kv = loaded.kv;
  bump();
}

function bump(): void {
  version += 1;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void): (() => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Screens re-render on ANY state change; the store is small enough. */
export const useWorldVersion = (): number =>
  useSyncExternalStore(subscribe, () => version);

export const hasFlag = (f: Flag): boolean => flags.has(f);

export function setFlag(f: Flag, on = true): void {
  if (on === flags.has(f)) return;
  if (on) {
    flags.add(f);
    setKv(flagKey(f), '1');
  } else {
    flags.delete(f);
    delKv(flagKey(f));
  }
  bump();
}

export const getKv = (k: string): string | undefined => kv.get(k);

export function putKv(k: string, v: string): void {
  kv.set(k, v);
  setKv(k, v);
  bump();
}

// ——— restoration keys (the damage log) ———
// Doctrine 7: the software keeps every earned key; recall is never the
// challenge. Keys are ingredients — consuming never spends (doctrine 10b).

export const hasKey = (id: KeyId): boolean => kv.has(keyKey(id));

export function earnKey(id: KeyId): void {
  if (hasKey(id)) return;
  putKv(keyKey(id), '1');
}

export function earnedKeys(): Set<KeyId> {
  const out = new Set<KeyId>();
  for (const k of kv.keys())
    if (k.startsWith('key:')) out.add(k.slice('key:'.length) as KeyId);
  return out;
}

// ——— pages ———

export const pageSolved = (id: number): boolean => kv.get(pageKey(id)) === '1';
export const setPageSolved = (id: number): void => putKv(pageKey(id), '1');

/** First-open marker: anomaly beats fire once, on a page's first viewing. */
export const pageSeen = (id: number): boolean => kv.has(seenKey(id));
export const markPageSeen = (id: number): void => {
  if (!pageSeen(id)) putKv(seenKey(id), '1');
};

/** Settings > "Return to intake" — wipes the workstation clean. */
export function resetWorld(): void {
  resetAll();
  flags = new Set();
  kv = new Map();
  bump();
}
