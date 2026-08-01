// Run with: npx tsx test-db.ts — dbCore against node:sqlite.

// @ts-expect-error node builtins have no types under Expo's tsconfig; tsx runs it fine
import assert from 'node:assert/strict';
// @ts-expect-error same
import { DatabaseSync } from 'node:sqlite';

import {
  ALL_KV_SQL,
  DEL_KV_SQL,
  flagKey,
  keyKey,
  MIGRATIONS,
  pageKey,
  RESET_SQL,
  rowsToState,
  SET_KV_SQL,
  TARGET_DB_VERSION,
  type KvRow,
} from './src/dbCore';

const db = new DatabaseSync(':memory:');

// migrations run cleanly and are idempotent per-version
let v = 0;
while (v < TARGET_DB_VERSION) {
  for (const sql of MIGRATIONS[v]) db.exec(sql);
  v += 1;
}

const set = db.prepare(SET_KV_SQL);
set.run(flagKey('introDone'), '1');
set.run(keyKey('W3'), '1');
set.run(pageKey(3), '1');
set.run(keyKey('W3'), '1'); // upsert, not duplicate

const rows = db.prepare(ALL_KV_SQL).all() as KvRow[];
assert.equal(rows.length, 3);
const { flags, kv } = rowsToState(rows);
assert.ok(flags.has('introDone'));
assert.equal(kv.get(keyKey('W3')), '1');
assert.equal(kv.get(pageKey(3)), '1');

db.prepare(DEL_KV_SQL).run(keyKey('W3'));
assert.equal((db.prepare(ALL_KV_SQL).all() as KvRow[]).length, 2);
db.prepare(RESET_SQL).run();
assert.equal((db.prepare(ALL_KV_SQL).all() as KvRow[]).length, 0);

console.log('test-db: ok');
