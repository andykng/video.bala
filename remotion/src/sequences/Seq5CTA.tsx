/**
 * Seq5 — Call to Action (24 – 30 s | 180 frames)
 *
 * • Confetti bursts from frame 0 (ConfettiParticles)
 * • "RÉSERVE TA PLACE!" springs in + continuous pulse (frame 4 →)
 * • Red/gold divider (frame 22–38)
 * • "tickets.cg" shimmer logo springs in (frame 34–55)
 * • Official tagline fades up (frame 58–76)
 * • Bala Bala Awards + 2025 ribbon at bottom (frame 72–90)
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
import { ConfettiParticles } from "../components/ConfettiParticles";

export const Seq5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = seqFade(frame, durationInFrames, 6, 4);

  // ── "RÉSERVE TA PLACE!" spring pop
  const ctaScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0.3,
    to: 1,
  });
  const ctaOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Continuous pulse after pop
  const pulseMagnitude =
    ctaOpacity >= 1 ? 0.04 * Math.sin(frame * 0.18) : 0;
  const ctaBrightness = 1 + 0.3 * Math.abs(Math.sin(frame * 0.18));

  // ── Divider
  const divScale = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── tickets.cg logo
  const siteScale = spring({
    frame: Math.max(0, frame - 34),
    fps,
    config: { stiffness: 190, damping: 17 },
    from: 0.3,
    to: 1,
  });
  const siteOpacity = interpolate(frame, [34, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shimmerPos = 200 - ((frame * 4) % 400);

  // ── Official tagline
  const tagOpacity = interpolate(frame, [58, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [58, 76], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Bottom event ribbon
  const bottomOpacity = interpolate(frame, [72, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomY = interpolate(frame, [72, 90], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        background:
          "radial-gradient(ellipse 100% 80% at 50% 50%, #1a0005 0%, #050505 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* ── Confetti */}
      <ConfettiParticles count={220} seed={777} />

      {/* ── "RÉSERVE TA PLACE!" */}
      <div
        style={{
          fontFamily: FONT,
          fontSize: 130,
          fontWeight: 900,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 3,
          lineHeight: 0.9,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale + pulseMagnitude})`,
          filter: `brightness(${ctaBrightness})`,
        }}
      >
        <span style={{ color: C.blanc }}>RÉSERVE</span>
        <br />
        <span style={{ color: C.or2 }}>TA </span>
        <span style={{ color: C.rouge }}>PLACE !</span>
      </div>

      {/* ── Divider */}
      <div
        style={{
          width: 620,
          height: 5,
          background: `linear-gradient(90deg, transparent, ${C.or}, ${C.rouge}, ${C.or}, transparent)`,
          margin: "50px auto",
          transform: `scaleX(${divScale})`,
          transformOrigin: "center",
        }}
      />

      {/* ── tickets.cg */}
      <div
        style={{
          textAlign: "center",
          opacity: siteOpacity,
          transform: `scale(${siteScale})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 168,
            fontWeight: 900,
            textTransform: "lowercase",
            background: `linear-gradient(135deg, ${C.rouge} 0%, ${C.or} 35%, ${C.or2} 55%, ${C.or} 75%, ${C.rouge} 100%)`,
            backgroundSize: "300% 100%",
            backgroundPosition: `${shimmerPos}% center`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: -3,
            filter: "drop-shadow(0 0 35px rgba(212,175,55,0.65))",
            lineHeight: 1,
          }}
        >
          tickets.cg
        </div>

        {/* Official tagline */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 38,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginTop: 18,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          Billetterie officielle du Congo Brazzaville
        </div>
      </div>

      {/* ── Bottom ribbon */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 56,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${C.or}, ${C.or2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          ✦ BALA BALA AWARDS ✦
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 42,
            color: C.rouge,
            letterSpacing: 10,
            marginTop: 6,
          }}
        >
          2025
        </div>
      </div>
    </AbsoluteFill>
  );
};
