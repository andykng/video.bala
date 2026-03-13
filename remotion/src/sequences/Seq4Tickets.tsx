/**
 * Seq4 — Tickets.CG Spotlight (16 – 24 s | 240 frames)
 *
 * • Red scan line sweeps top → bottom (frame 0–32)
 * • "🎟️ VOS BILLETS SUR" fades up (frame 24–40)
 * • TICKETS.CG logo springs in (frame 30–55)
 * • Border line reveals (frame 60–78)
 * • Features slide in from left, staggered (frame 62 →, +18/item)
 * • Price badge springs in (frame 140–160)
 * • Background pulses between dark-red tones subtly
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "../constants";
import { seqFade } from "../utils/seqFade";

const FEATURES = [
  { icon: "✅", text: "Airtel Money & MTN Money" },
  { icon: "✅", text: "QR Code sécurisé anti-fraude" },
  { icon: "✅", text: "Achat en quelques clics" },
  { icon: "✅", text: "Livraison instantanée" },
];

export const Seq4Tickets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = seqFade(frame, durationInFrames, 6, 8);

  // ── Background subtle pulse
  const bgLightness = 0.08 + 0.04 * Math.sin(frame * 0.07);

  // ── Scan line
  const scanY = interpolate(frame, [0, 32], [-4, 1924], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Pre-text
  const preOpacity = interpolate(frame, [24, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preY = interpolate(frame, [24, 40], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Logo
  const logoScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { stiffness: 200, damping: 18 },
    from: 0.3,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Border
  const borderScale = interpolate(frame, [60, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Price badge
  const priceScale = spring({
    frame: Math.max(0, frame - 140),
    fps,
    config: { stiffness: 220, damping: 20 },
    from: 0.5,
    to: 1,
  });
  const priceOpacity = interpolate(frame, [140, 158], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shimmer for tickets.cg logo
  const shimmerPos = 200 - ((frame * 3) % 400);

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(40,0,5,${bgLightness + 0.15}) 0%, #0d0000 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      {/* ── Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 5,
          background: `linear-gradient(90deg, transparent, ${C.rouge}, ${C.or}, ${C.rouge}, transparent)`,
          boxShadow: `0 0 28px ${C.rouge}`,
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* ── "VOS BILLETS SUR" */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 50,
          color: C.or,
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: preOpacity,
          transform: `translateY(${preY}px)`,
          marginBottom: 22,
        }}
      >
        🎟️ VOS BILLETS SUR
      </div>

      {/* ── TICKETS.CG logo */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 148,
          fontWeight: 900,
          textTransform: "uppercase",
          background: `linear-gradient(135deg, ${C.rouge} 0%, #ff2244 25%, ${C.or} 55%, ${C.or2} 75%, ${C.or} 100%)`,
          backgroundSize: "300% 100%",
          backgroundPosition: `${shimmerPos}% center`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          letterSpacing: -2,
          filter: "drop-shadow(0 0 50px rgba(200,16,46,0.75))",
          lineHeight: 1,
        }}
      >
        TICKETS
        <span
          style={{
            background: `linear-gradient(135deg, ${C.or}, ${C.or2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          .CG
        </span>
      </div>

      {/* ── Border */}
      <div
        style={{
          width: 820,
          height: 5,
          background: `linear-gradient(90deg, transparent, ${C.rouge}, ${C.or}, ${C.rouge}, transparent)`,
          margin: "30px auto 44px",
          transform: `scaleX(${borderScale})`,
          transformOrigin: "center",
        }}
      />

      {/* ── Features list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          width: 920,
        }}
      >
        {FEATURES.map((feat, i) => {
          const f0 = 62 + i * 18;
          const featOpacity = interpolate(frame, [f0, f0 + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const featX = interpolate(frame, [f0, f0 + 16], [-80, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                padding: "26px 40px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(212,175,55,0.25)`,
                borderRadius: 20,
                opacity: featOpacity,
                transform: `translateX(${featX}px)`,
              }}
            >
              <span style={{ fontSize: 50, flexShrink: 0 }}>{feat.icon}</span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 44,
                  color: C.blanc,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {feat.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Price badge */}
      <div
        style={{
          marginTop: 48,
          padding: "28px 80px",
          background: `linear-gradient(135deg, ${C.rouge}, #a00020)`,
          border: `3px solid ${C.or}`,
          borderRadius: 100,
          textAlign: "center",
          opacity: priceOpacity,
          transform: `scale(${priceScale})`,
          boxShadow: `0 0 60px rgba(200,16,46,0.5)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          À partir de
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 80,
            fontWeight: 900,
            color: C.or2,
            letterSpacing: 2,
          }}
        >
          2 000 F
        </div>
      </div>
    </AbsoluteFill>
  );
};
