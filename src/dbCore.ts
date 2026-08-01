// src/dbCore.ts
// Pure module: SQL schema/migrations and helpers. No expo imports so it can
// be tested in Node against node:sqlite. All game state is a kv store:
// flags ("flag:<name>" = "1"), earned restoration keys ("key:<KeyId>" = "1";
// the damage log renders labels from content, doctrine 7 — the software
// keeps the keys, recall is never the challenge), solved pages
// ("page:<id>" = "1"), and first-view markers ("seen:<id>" = "1") for
// anomaly beats that trigger on a page's first opening.

/** Each entry is the batch of statements that upgrades user_version N-1 -> N.
 *  MIGRATIONS[0] builds version 1. Append only; never edit shipped entries. */
export const MIGRATIONS: string[][] = [
  [
    `CREATE TABLE IF NOT EXISTS kv (
      k TEXT PRIMARY KEY,
      v TEXT NOT NULL
    )`,
  ],
];

export const TARGET_DB_VERSION = MIGRATIONS.length;

export const SET_KV_SQL = `INSERT INTO kv (k, v) VALUES (?, ?)
  ON CONFLICT(k) DO UPDATE SET v = excluded.v`;
export const GET_KV_SQL = 'SELECT v FROM kv WHERE k = ?';
export const ALL_KV_SQL = 'SELECT k, v FROM kv';
export const DEL_KV_SQL = 'DELETE FROM kv WHERE k = ?';
export const RESET_SQL = 'DELETE FROM kv';

export interface KvRow {
  k: string;
  v: string;
}

export const flagKey = (f: string): string => `flag:${f}`;
export const keyKey = (id: string): string => `key:${id}`;
export const pageKey = (id: number): string => `page:${id}`;
export const seenKey = (id: number): string => `seen:${id}`;

export function rowsToState(rows: KvRow[]): {
  flags: Set<string>;
  kv: Map<string, string>;
} {
  const flags = new Set<string>();
  const kv = new Map<string, string>();
  for (const { k, v } of rows) {
    if (k.startsWith('flag:')) flags.add(k.slice('flag:'.length));
    else kv.set(k, v);
  }
  return { flags, kv };
}
