import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

import { anim } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 289-334: light aurora, the sentence appears word by word with a
// soft blur-in. first clause lands quickly, the second waits half a second.
const WORDS: Array<[string, number]> = [
  ["I'm", 0],
  ["looking", 1],
  ["to", 3],
  ["work", 17],
  ["on", 19],
  ["your", 22],
  ["projects.", 24],
];

export const Scene05Looking: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* fitted with scripts/fit_bg.py */}
      <BlobField
        base="rgb(73,17,226)"
        blobs={[
          { cx: 243, cy: 194, rx: 382, ry: 235, sigma: 35, fill: "rgb(219,163,255)", opacity: 0.89 },
          { cx: 483, cy: 133, rx: 207, ry: 90, sigma: 40.2, fill: "rgb(255,255,255)" },
          { cx: 357, cy: 206, rx: 294, ry: 302, sigma: 49.5, fill: "rgb(225,193,254)", opacity: 0.76 },
          { cx: 100, cy: 320, rx: 535, ry: 86, sigma: 47.1, fill: "rgb(251,249,254)", opacity: 0.83 },
          { cx: 67, cy: 130, rx: 36, ry: 87, sigma: 35, fill: "rgb(176,85,255)" },
          { cx: 20, cy: 13, rx: 161, ry: 74, sigma: 63.5, fill: "rgb(149,16,254)", opacity: 0.94 },
        ]}
      />
      <div
        style={{
          position: "absolute",
          left: 368,
          top: 215,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 29,
          letterSpacing: "0.02em",
          color: "#221f28",
        }}
      >
        {WORDS.map(([w, at]) => {
          const o = anim(frame, at, at + 4, [0, 1]);
          const b = anim(frame, at, at + 6, [7, 0]);
          return (
            <span
              key={w}
              style={{
                opacity: o,
                filter: b > 0.2 ? `blur(${b}px)` : undefined,
                display: "inline-block",
                marginRight: "0.28em",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
