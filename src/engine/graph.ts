// src/engine/graph.ts
// Pure module: dependency-graph math over Page[]. No expo imports.
// Keys are ingredients, not doors: attackability is the ONLY thing the graph
// gates. Browsing is never gated (doctrine 10b).

import type { KeyId, Page } from '../models';

/** key -> page id that produces it. Throws on duplicate producers: every key
 *  has exactly one source (single-sourced instruments are the tier bosses). */
export function producers(pages: Page[]): Map<KeyId, number> {
  const out = new Map<KeyId, number>();
  for (const p of pages)
    for (const k of p.produces) {
      if (out.has(k)) throw new Error(`duplicate producer for ${k}`);
      out.set(k, p.id);
    }
  return out;
}

/** A page is attackable when every consumed key has been earned. */
export const isAttackable = (p: Page, earned: ReadonlySet<KeyId>): boolean =>
  p.consumes.every((k) => earned.has(k));

/** Fixpoint solve: which pages could be completed from a starting key set,
 *  never touching `blocked` page ids. Models a player who solves everything
 *  they can — used by tests to prove frontier claims, and by dev tooling. */
export function reachable(
  pages: Page[],
  blocked: ReadonlySet<number> = new Set(),
  startKeys: readonly KeyId[] = [],
): Set<number> {
  const earned = new Set<KeyId>(startKeys);
  const solved = new Set<number>();
  let moved = true;
  while (moved) {
    moved = false;
    for (const p of pages) {
      if (solved.has(p.id) || blocked.has(p.id)) continue;
      if (!isAttackable(p, earned)) continue;
      solved.add(p.id);
      for (const k of p.produces) earned.add(k);
      moved = true;
    }
  }
  return solved;
}

/** Dependency depth: 0 = root. Throws on cycles (visiting guard). */
export function layers(pages: Page[]): Map<number, number> {
  const prod = producers(pages);
  const byId = new Map(pages.map((p) => [p.id, p]));
  const memo = new Map<number, number>();
  const visiting = new Set<number>();

  function layerOf(p: Page): number {
    const hit = memo.get(p.id);
    if (hit !== undefined) return hit;
    if (visiting.has(p.id)) throw new Error(`cycle through page ${p.id}`);
    visiting.add(p.id);
    let l = 0;
    for (const k of p.consumes) {
      const src = byId.get(prod.get(k)!)!;
      l = Math.max(l, layerOf(src) + 1);
    }
    visiting.delete(p.id);
    memo.set(p.id, l);
    return l;
  }

  for (const p of pages) layerOf(p);
  return memo;
}
