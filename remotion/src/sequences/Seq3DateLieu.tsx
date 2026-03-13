/**
 * Seq3 — Date & Lieu (10 – 16 s | 180 frames)
 *
 * • Spotlight beam fades in from top (frame 0–20)
 * • 📅 emoji drops in (frame 6–20)
 * • "1ER MARS" scales in on X axis (frame 18–42)
 * • "2025" fades up in red (frame 35–52)
 * • Gold divider reveals (frame 60–78)
 * • 📍 emoji drops in (frame 82–96)
 * • "Centre Culturel Zola" fades up (frame 90–110)
 * • "BRAZZAVILLE" fades up gold (frame 106–124)
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

export const Seq3DateLieu: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = seqFade(frame, durationInFrames, 8, 8);

  // ── Spotlight beam
  const beamOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Date emoji drop
  const dateEmojiOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dateEmojiY = interpolate(frame, [6, 20], [-70, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── "1ER MARS" scaleX reveal
  const dateScale = interpolate(frame, [18, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dateOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Year
  const yearOpacity = interpolate(frame, [35, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yearY = interpolate(frame, [35, 52], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Divider
  const divScale = interpolate(frame, [60, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Location emoji
  const locEmojiOpacity = interpolate(frame, [82, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const locEmojiY = interpolate(frame, [82, 96], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Location name
  const locNameOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const locNameY = interpolate(frame, [90, 110], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── City
  const cityOpacity = interpolate(frame, [106, 124], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cityY = interpolate(frame, [106, 124], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        background:
          "linear-gradient(180deg, #0a0000 0%, #1a0010 50%, #0a0000 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Spotlight beam from top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 8,
          height: "75%",
          background: `linear-gradient(180deg, rgba(212,175,55,0.55) 0%, transparent 100%)`,
          filter: "blur(22px)",
          opacity: beamOpacity,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── DATE block */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
        {/* 📅 Emoji */}
        <div
          style={{
            fontSize: 90,
            opacity: dateEmojiOpacity,
            transform: `translateY(${dateEmojiY}px)`,
            marginBottom: 8,
          }}
        >
          📅
        </div>

        {/* "1ER MARS" */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 185,
            fontWeight: 900,
            textTransform: "uppercase",
            background: `linear-gradient(135deg, ${C.or} 0%, ${C.or2} 50%, ${C.or} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 0.84,
            opacity: dateOpacity,
            transform: `scaleX(${dateScale})`,
            transformOrigin: "center",
            letterSpacing: -4,
            filter: "drop-shadow(0 0 30px rgba(212,175,55,0.6))",
          }}
        >
          1ER
          <br />
          MARS
        </div>

        {/* Year */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 68,
            color: C.rouge,
            letterSpacing: 20,
            textTransform: "uppercase",
            fontWeight: 900,
            opacity: yearOpacity,
            transform: `translateY(${yearY}px)`,
            marginTop: 10,
          }}
        >
          2 0 2 5
        </div>
      </div>

      {/* ── Gold divider */}
      <div
        style={{
          width: 520,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${C.or}, transparent)`,
          margin: "52px auto",
          transform: `scaleX(${divScale})`,
          transformOrigin: "center",
        }}
      />

      {/* ── LIEU block */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
        {/* 📍 Emoji */}
        <div
          style={{
            fontSize: 78,
            opacity: locEmojiOpacity,
            transform: `translateY(${locEmojiY}px)`,
            marginBottom: 10,
          }}
        >
          📍
        </div>

        {/* Venue name */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 74,
            fontWeight: 900,
            color: C.blanc,
            textTransform: "uppercase",
            letterSpacing: 2,
            lineHeight: 1.1,
            opacity: locNameOpacity,
            transform: `translateY(${locNameY}px)`,
          }}
        >
          Centre Culturel
          <br />
          Zola
        </div>

        {/* City */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 52,
            color: C.or,
            letterSpacing: 10,
            textTransform: "uppercase",
            fontWeight: 900,
            marginTop: 14,
            opacity: cityOpacity,
            transform: `translateY(${cityY}px)`,
          }}
        >
          BRAZZAVILLE
        </div>
      </div>
    </AbsoluteFill>
  );
};
