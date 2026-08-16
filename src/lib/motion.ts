import { Easing, interpolate, spring } from "remotion";

// the curves that actually show up in these templates. linear and the css
// default "ease" basically never do.
export const ease = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
  outCubic: Easing.bezier(0.33, 1, 0.68, 1),
  inQuint: Easing.bezier(0.64, 0, 0.78, 0),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
  inOutQuart: Easing.bezier(0.76, 0, 0.24, 1),
  linear: Easing.linear,
} as const;

type AnimOptions = {
  easing?: (t: number) => number;
};

// clamped interpolate with measured in/out frames
export const anim = (
  frame: number,
  from: number,
  to: number,
  output: readonly [number, number],
  { easing = ease.outExpo }: AnimOptions = {},
): number =>
  interpolate(frame, [from, to], output as [number, number], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// multi-keyframe version, for anything that moves more than once
export const keys = (
  frame: number,
  points: readonly (readonly [number, number])[],
  { easing = ease.inOutCubic }: AnimOptions = {},
): number =>
  interpolate(
    frame,
    points.map((p) => p[0]),
    points.map((p) => p[1]),
    { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

export const springs = {
  snap: { damping: 200, mass: 0.6, stiffness: 180 },
  bouncy: { damping: 12, mass: 0.8, stiffness: 120 },
} as const;

export const pop = (
  frame: number,
  fps: number,
  delay: number,
  config: (typeof springs)[keyof typeof springs] = springs.snap,
): number => spring({ frame: frame - delay, fps, config });
