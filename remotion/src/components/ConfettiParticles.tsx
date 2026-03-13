import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { mulberry32 } from "../utils/seededRandom";

const COLORS = [
  "#D4AF37", "#FFD700", "#C8102E",
  "#FF2244", "#FFFFFF", "#FFF6A0", "#FF6B35",
];

interface Piece {
  x0: number;
  delay: number; // frame delay before appearing
  vy: number;    // px/frame base speed
  vx: number;    // px/frame horizontal drift
  gravity: number; // px/frame² acceleration
  rot0: number;  // initial rotation deg
  rotV: number;  // rotation speed deg/frame
  w: number;
  h: number;
  color: string;
}

interface Props {
  count?: number;
  seed?: number;
}

/**
 * Deterministic confetti burst — purely frame-driven, Remotion safe.
 */
export const ConfettiParticles: React.FC<Props> = ({
  count = 220,
  seed = 999,
}) => {
  const frame = useCurrentFrame();

  const pieces = useMemo<Piece[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      x0: rand() * 1080,
      delay: rand() * 70,
      vy: rand() * 9 + 5,
      vx: (rand() - 0.5) * 5,
      gravity: rand() * 0.18 + 0.04,
      rot0: rand() * 360,
      rotV: (rand() - 0.5) * 14,
      w: rand() * 22 + 10,
      h: rand() * 13 + 6,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    }));
  }, [count, seed]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {pieces.map((c, i) => {
        const f = Math.max(0, frame - c.delay);
        if (f === 0) return null;

        const x = c.x0 + c.vx * f;
        const y = -30 + c.vy * f + 0.5 * c.gravity * f * f;
        if (y > 1960) return null;

        const rot = c.rot0 + c.rotV * f;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: c.w,
              height: c.h,
              backgroundColor: c.color,
              transform: `rotate(${rot}deg)`,
              transformOrigin: "center center",
            }}
          />
        );
      })}
    </div>
  );
};
