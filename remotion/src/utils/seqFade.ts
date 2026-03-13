import { interpolate } from "remotion";

/**
 * Returns an opacity value that fades the sequence in and out.
 * @param frame          current frame (relative to sequence start)
 * @param durationInFrames total sequence duration
 * @param fadeIn         frames for fade-in (default 8)
 * @param fadeOut        frames for fade-out (default 8)
 */
export function seqFade(
  frame: number,
  durationInFrames: number,
  fadeIn = 8,
  fadeOut = 8
): number {
  return interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}
