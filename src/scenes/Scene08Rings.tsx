import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

import { anim, ease } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 504-570: blurry grayscale ripple rings, slowly pulsing. the words
// glow in one by one, slide out left, then the whole thing collapses.
const WORDS: Array<{ text: string; at: number; out: number; color: string; glow: string }> = [
  { text: "Future", at: 4, out: 50, color: "#ff4038", glow: "rgba(255,40,40,0.8)" },
  { text: "of", at: 6, out: 53, color: "#f3eef7", glow: "rgba(255,255,255,0.5)" },
  { text: "work?", at: 10, out: 56, color: "#f3eef7", glow: "rgba(255,255,255,0.5)" },
  { text: "You're", at: 14, out: 59, color: "#cdb4ff", glow: "rgba(160,110,255,0.8)" },
  { text: "in.", at: 17, out: 62, color: "#8f57ff", glow: "rgba(120,60,255,0.9)" },
];

export const Scene08Rings: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = 1 + 0.035 * Math.sin((frame / 30) * Math.PI);
  const collapse = anim(frame, 62, 67, [1, 0.4], { easing: ease.inQuint });
  const s = pulse * collapse;

  return (
    <AbsoluteFill style={{ background: "#101010", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${s})`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* ring field fitted with scripts/fit_bg.py — hand-built rings kept
            missing the lopsided lighting */}
        <BlobField
          base="rgb(46,47,48)"
          blobs={[
            { cx: 247, cy: -1, rx: 267, ry: 144, sigma: 35, fill: "rgb(184,184,184)" },
            { cx: 395, cy: 104, rx: 121, ry: 37, sigma: 35, fill: "rgb(255,255,255)" },
            { cx: 419, cy: 52, rx: 250, ry: 45, sigma: 35, fill: "rgb(157,156,156)" },
            { cx: 154, cy: 223, rx: 536, ry: 73, sigma: 35, fill: "rgb(0,0,0)" },
            { cx: 56, cy: 291, rx: 123, ry: 251, sigma: 35, fill: "rgb(59,58,57)", opacity: 0.59 },
            { cx: 625, cy: -29, rx: 601, ry: 59, sigma: 59.7, fill: "rgb(0,0,0)" },
            { cx: 369, cy: 410, rx: 217, ry: 131, sigma: 42, fill: "rgb(105,104,104)" },
            { cx: 51, cy: 24, rx: 240, ry: 148, sigma: 52.6, fill: "rgb(41,41,41)", opacity: 0.84 },
          ]}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 368,
          top: 207,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: "0.02em",
        }}
      >
        {WORDS.map(({ text, at, out, color, glow }) => {
          const oIn = anim(frame, at, at + 4, [0, 1]);
          const oOut = anim(frame, out, out + 5, [1, 0]);
          const slide = anim(frame, out, out + 6, [0, -70], { easing: ease.inQuint });
          return (
            <span
              key={text}
              style={{
                display: "inline-block",
                marginRight: "0.3em",
                color,
                opacity: oIn * oOut,
                transform: `translateX(${slide}px)`,
                textShadow: `0 0 10px ${glow}, 0 0 22px ${glow}`,
              }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
