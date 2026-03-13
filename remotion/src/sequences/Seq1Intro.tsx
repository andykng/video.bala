/**
 * Seq1 — Intro Choc (0 – 4 s | 120 frames)
 *
 * • "Brazzaville présente" fades up (frame 5–18)
 * • "LA SCÈNE / CONGOLAISE" char-by-char reveal (frame 18–75)
 * • Glitch flashes at frames 24–26 and 60–62
 * • Gold divider line scales in (frame 68–82)
 * • "S'ÉVEILLE" rises in red (frame 74–88)
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "../constants";
import { seqFade } from "../utils/seqFade";

const CHAR_DELAY = 3; // frames between each character's appearance

function CharReveal({
  text,
  startFrame,
  size,
  color,
  letterSpacing = 4,
}: {
  text: string;
  startFrame: number;
  size: number;
  color: string;
  letterSpacing?: number;
}) {
  const frame = useCurrentFrame();
  return (
    <span style={{ display: "block", lineHeight: 1.05, overflow: "hidden" }}>
      {text.split("").map((char, i) => {
        const f0 = startFrame + i * CHAR_DELAY;
        const progress = interpolate(frame, [f0, f0 + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [70, 0])}px)`,
              fontFamily: FONT,
              fontSize: size,
              fontWeight: 900,
              color,
              letterSpacing,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

export const Seq1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = seqFade(frame, durationInFrames, 4, 6);

  // "Brazzaville présente"
  const preOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preY = interpolate(frame, [5, 18], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gold divider
  const lineScale = interpolate(frame, [68, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "S'ÉVEILLE"
  const sOpacity = interpolate(frame, [74, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sY = interpolate(frame, [74, 88], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch — deterministic frames
  const isGlitch = [24, 25, 26, 60, 61, 62].includes(frame);
  const glitchY1 = ((frame * 17) % 55) + 12;
  const glitchY2 = ((frame * 13) % 40) + 50;

  // Word 2 starts after word 1 finishes
  // "L'EXCELLENCE" = 12 chars × 3 frames = 36 frames
  const word1Len = "L'EXCELLENCE".length;
  const word2Start = 18 + word1Len * CHAR_DELAY + 4;

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: C.noir,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Pre-text */}
      <div
        style={{
          opacity: preOpacity,
          transform: `translateY(${preY}px)`,
          fontFamily: FONT,
          fontSize: 38,
          color: C.or,
          letterSpacing: 14,
          textTransform: "uppercase",
          marginBottom: 44,
        }}
      >
        ✦ Brazzaville présente ✦
      </div>

      {/* Main words — char by char */}
      <div style={{ textAlign: "center" }}>
        <CharReveal
          text="L'EXCELLENCE"
          startFrame={18}
          size={108}
          color={C.blanc}
          letterSpacing={4}
        />
        <CharReveal
          text="CONGOLAISE"
          startFrame={word2Start}
          size={108}
          color={C.blanc}
          letterSpacing={4}
        />
      </div>

      {/* Gold divider */}
      <div
        style={{
          width: 620,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${C.or}, transparent)`,
          transform: `scaleX(${lineScale})`,
          transformOrigin: "center",
          marginTop: 54,
        }}
      />

      {/* EN LUMIÈRE */}
      <div
        style={{
          opacity: sOpacity,
          transform: `translateY(${sY}px)`,
          fontFamily: FONT,
          fontSize: 72,
          fontWeight: 900,
          color: C.rouge,
          letterSpacing: 14,
          textTransform: "uppercase",
          marginTop: 26,
        }}
      >
        EN LUMIÈRE
      </div>

      {/* Glitch overlays */}
      {isGlitch && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(200,16,46,0.16)",
              clipPath: `polygon(0 ${glitchY1}%, 100% ${glitchY1}%, 100% ${glitchY1 + 11}%, 0 ${glitchY1 + 11}%)`,
              zIndex: 20,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(212,175,55,0.09)",
              clipPath: `polygon(0 ${glitchY2}%, 100% ${glitchY2}%, 100% ${glitchY2 + 7}%, 0 ${glitchY2 + 7}%)`,
              zIndex: 20,
            }}
          />
          {/* Horizontal RGB shift */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(transparent 0%, rgba(200,16,46,0.06) 49%, transparent 51%)",
              zIndex: 19,
              transform: `translateX(${frame % 2 === 0 ? 6 : -6}px)`,
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
