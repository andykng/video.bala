/**
 * Mulberry32 — fast, deterministic PRNG.
 * Returns a closure that generates floats in [0, 1).
 * Same seed → same sequence every render (critical for Remotion).
 */
export function mulberry32(seed: number): () => number {
  let s = seed;
  return (): number => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}
