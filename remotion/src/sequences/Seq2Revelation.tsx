/**
 * Seq2 — Révélation événement (4 – 10 s | 180 frames)
 *
 * • Gold glow ring pulses behind logo (frame 5 →)
 * • "BALA BALA AWARDS" springs in with overshoot (frame 5–40)
 * • Subtitle fades up (frame 28–44)
 * • Tagline fades up (frame 38–54)
 * • Red/gold decoration line reveals (frame 32–52)
 * • Category badges appear staggered then scroll (frame 50 →)
 */
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "../constants";
import { seqFade } from "../utils/seqFade";

const CATEGORIES = [
  "🏆 Révélation",
  "⭐ Étoiles",
  "👩‍🎤 Best Women",
  "🎵 Meilleur Beat",
  "🥁 Tam-Tam",
  "🎧 DJs",
  "👗 Mode",
  "📱 Médias en ligne",
];

export const Seq2Revelation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = seqFade(frame, durationInFrames, 8, 8);

  // ── Logo spring
  const logoScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { stiffness: 180, damping: 16 },
    from: 0.3,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [5, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Glow ring
  const ringOpacity =
    interpolate(frame, [5, 28], [0, 0.55], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    (0.55 + 0.45 * Math.sin(frame * 0.09));

  // ── Subtitle / tagline / line
  const subOpacity = interpolate(frame, [28, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [28, 44], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [38, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [38, 54], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineScale = interpolate(frame, [32, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Categories strip
  const CAT_START = 52;
  const catOpacity = interpolate(frame, [CAT_START, CAT_START + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Each category item is ~300px wide including gap
  const ITEM_W = 310;
  const singleSetW = CATEGORIES.length * ITEM_W;
  const rawScroll = Math.max(0, (frame - CAT_START) * 2.8);
  const stripX = -(rawScroll % singleSetW);

  // Triple the categories for seamless loop
  const visibleCats = useMemo(
    () => [...CATEGORIES, ...CATEGORIES, ...CATEGORIES],
    []
  );

  return (
    <AbsoluteFill
      style={{
        opacity,
        background:
          "radial-gradient(ellipse 80% 55% at 50% 38%, #1a0005 0%, #050505 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: 60,
      }}
    >
      {/* ── Logo wrapper */}
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -55,
            borderRadius: "50%",
            border: `3px solid ${C.or}`,
            opacity: ringOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 150,
            fontWeight: 900,
            textTransform: "uppercase",
            background: `linear-gradient(135deg, ${C.or} 0%, ${C.or2} 40%, #fff6a0 60%, ${C.or} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 0.88,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            letterSpacing: -2,
            filter: "drop-shadow(0 0 44px rgba(212,175,55,0.8))",
            textAlign: "center",
          }}
        >
          BALA BALA
          <br />
          AWARDS
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 46,
          color: C.blanc,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginTop: 34,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Cérémonie Culturelle Congolaise
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 34,
          color: C.or,
          fontStyle: "italic",
          letterSpacing: 2,
          marginTop: 14,
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          textAlign: "center",
        }}
      >
        Musique · Mode · Médias · Arts · Humour
      </div>

      {/* Decoration line */}
      <div
        style={{
          width: 700,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${C.rouge}, ${C.or}, ${C.rouge}, transparent)`,
          margin: "42px auto 0",
          transform: `scaleX(${lineScale})`,
          transformOrigin: "center",
        }}
      />

      {/* ── Category strip */}
      <div
        style={{
          marginTop: 52,
          overflow: "hidden",
          width: "100%",
          opacity: catOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 28,
            paddingLeft: 40,
            transform: `translateX(${stripX}px)`,
            whiteSpace: "nowrap",
          }}
        >
          {visibleCats.map((cat, i) => (
            <div
              key={i}
              style={{
                fontFamily: FONT,
                fontSize: 44,
                color: C.blanc,
                padding: "16px 40px",
                border: `2px solid ${C.or}`,
                borderRadius: 60,
                background: "rgba(212,175,55,0.08)",
                letterSpacing: 2,
                flexShrink: 0,
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
