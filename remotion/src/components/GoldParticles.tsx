import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { mulberry32 } from "../utils/seededRandom";

interface Particle {
  x0: number;   // initial x in px
  y0: number;   // initial y in px
  vx: number;   // px/frame
  vy: number;   // px/frame (negative = upward)
  r: number;    // radius px
  color: string;
  phase: number; // initial phase for alpha twinkle
  alphaBase: number;
  isStar: boolean; // render cross sparkle
}

interface Props {
  count?: number;
  seed?: number;
}

/**
 * Deterministic gold particle field — positions are pure functions of frame,
 * so every render of the same frame produces the same output (Remotion safe).
 */
export const GoldParticles: React.FC<Props> = ({ count = 100, seed = 42 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => {
      const r = rand() * 5 + 2;
      return {
        x0: rand() * 1080,
        y0: rand() * 1920,
        vx: (rand() - 0.5) * 0.8,
        vy: -(rand() * 1.5 + 0.3),
        r,
        color:
          rand() < 0.65
            ? "#D4AF37"
            : rand() < 0.5
            ? "#FFD700"
            : "#C8102E",
        phase: rand() * Math.PI * 2,
        alphaBase: rand() * 0.55 + 0.25,
        isStar: r > 5.5,
      };
    });
  }, [count, seed]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {particles.map((p, i) => {
        const x = ((p.x0 + p.vx * frame) % 1080 + 1080) % 1080;
        const y = ((p.y0 + p.vy * frame) % 1920 + 1920) % 1920;
        const alpha =
          p.alphaBase * (0.6 + 0.4 * Math.sin(p.phase + frame * 0.08));

        return (
          <React.Fragment key={i}>
            {/* Core dot */}
            <div
              style={{
                position: "absolute",
                left: x - p.r,
                top: y - p.r,
                width: p.r * 2,
                height: p.r * 2,
                borderRadius: "50%",
                backgroundColor: p.color,
                opacity: alpha,
              }}
            />
            {/* Cross sparkle for larger particles */}
            {p.isStar && (
              <>
                <div
                  style={{
                    position: "absolute",
                    left: x - 0.75,
                    top: y - p.r * 2.2,
                    width: 1.5,
                    height: p.r * 4.4,
                    backgroundColor: p.color,
                    opacity: alpha * 0.45,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: x - p.r * 2.2,
                    top: y - 0.75,
                    width: p.r * 4.4,
                    height: 1.5,
                    backgroundColor: p.color,
                    opacity: alpha * 0.45,
                  }}
                />
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
