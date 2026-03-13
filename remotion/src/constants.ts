// ─── Video Config ──────────────────────────────────────────────
export const FPS = 30;
export const DURATION_S = 30;
export const DURATION_FRAMES = FPS * DURATION_S; // 900
export const WIDTH = 1080;
export const HEIGHT = 1920;

// ─── Brand Colors ──────────────────────────────────────────────
export const C = {
  noir:  "#050505",
  rouge: "#C8102E",
  or:    "#D4AF37",
  or2:   "#FFD700",
  blanc: "#FFFFFF",
} as const;

// ─── Typography ────────────────────────────────────────────────
export const FONT = '"Arial Black", "Arial Bold", Gadget, Impact, sans-serif';

// ─── Sequence timing (absolute frames) ────────────────────────
//   Seq1: 0 – 4 s   → 0   – 119  (120 frames)
//   Seq2: 4 – 10 s  → 120 – 299  (180 frames)
//   Seq3: 10 – 16 s → 300 – 479  (180 frames)
//   Seq4: 16 – 24 s → 480 – 719  (240 frames)
//   Seq5: 24 – 30 s → 720 – 899  (180 frames)
export const SEQ1_FROM = 0;
export const SEQ1_DUR  = 120;

export const SEQ2_FROM = 120;
export const SEQ2_DUR  = 180;

export const SEQ3_FROM = 300;
export const SEQ3_DUR  = 180;

export const SEQ4_FROM = 480;
export const SEQ4_DUR  = 240;

export const SEQ5_FROM = 720;
export const SEQ5_DUR  = 180;
