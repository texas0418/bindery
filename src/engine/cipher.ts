// src/engine/cipher.ts
// Pure module. One string in this app states an answer in ASSEMBLED form:
// the Delivery epilogue, which names the recipient and the place together.
// Individual words shipping readable is conceded (restored passages are
// plaintext by necessity — the player must read them), but the synthesis is
// exactly what rule 15 protects: a `strings` pass must not hand over the
// warmest ending's answer fully composed.
//
// So the epilogue ships as ciphertext keyed by the player's own correct
// answer. No secret exists anywhere in the bundle: the key is only ever
// produced by solving. The epilogue renders only after a correct entry, so
// there is never a moment where the app needs to decrypt without the key.
//
// This is the same threat model as engine/hash: obfuscation, not secrecy.
// A datamine that already solved the puzzle can decrypt — which is fine,
// because that player earned it.

import { normalizeAnswer } from '../models';

import { saltedHash } from './hash';

/** Canonical key material from an accepted answer. Every accepted phrasing
 *  of a multi-part answer must reduce to the SAME key or the epilogue would
 *  decrypt for some correct players and not others — so this keeps only the
 *  two longest tokens, which are the parts every phrasing shares (optional
 *  qualifiers and street types are the short ones). test-content proves the
 *  invariant against the full accepted set. */
export function answerKey(raw: string): string {
  return normalizeAnswer(raw)
    .split(' ')
    .filter(Boolean)
    .sort((a, b) => b.length - a.length || (a < b ? -1 : 1))
    .slice(0, 2)
    .sort()
    .join(' ');
}

/** 16-bit keystream: successive salted-hash blocks over the key. */
function keystream(key: string, length: number): number[] {
  const out: number[] = [];
  for (let block = 0; out.length < length; block += 1) {
    const h = saltedHash('epilogue', key, String(block));
    for (let j = 0; j + 4 <= h.length && out.length < length; j += 4)
      out.push(parseInt(h.slice(j, j + 4), 16));
  }
  return out;
}

/** XOR over UTF-16 code units, hex-encoded — no text-encoding dependency,
 *  so the same code runs in Hermes and in Node's test process. */
export function encryptWithKey(plain: string, key: string): string {
  const ks = keystream(key, plain.length);
  let out = '';
  for (let i = 0; i < plain.length; i += 1)
    out += ((plain.charCodeAt(i) ^ ks[i]) & 0xffff).toString(16).padStart(4, '0');
  return out;
}

export function decryptWithKey(cipher: string, key: string): string {
  const n = Math.floor(cipher.length / 4);
  const ks = keystream(key, n);
  let out = '';
  for (let i = 0; i < n; i += 1)
    out += String.fromCharCode((parseInt(cipher.slice(i * 4, i * 4 + 4), 16) ^ ks[i]) & 0xffff);
  return out;
}
