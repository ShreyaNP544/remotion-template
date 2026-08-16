import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import { anim, keys, pop, springs } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 571-648: light outro. words stagger in, the blue button pops, then
// a purple circle wipes everything from the right and it all goes to black.
const WORDS: Array<[string, number]> = [
  ["Let's", 0],
  ["collaborate", 1],
  ["and", 2],
  ["create", 3],
  ["something", 4],
  ["amazing", 6],
];

export const Scene09Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnScale = pop(frame, fps, 21, springs.bouncy);
  // soft-edged circle wipe from the right; the page dims underneath it
  const sweepR = keys(frame, [
    [55, 0],
    [59, 250],
    [67, 550],
    [71, 1150],
  ]);
  const dimO = anim(frame, 62, 70, [0, 0.55]);
  const blackO = anim(frame, 69, 72, [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* fitted with scripts/fit_bg.py; the button is a real element below,
          not part of the background */}
      <BlobField
        base="rgb(204,202,252)"
        blobs={[
          { cx: 260, cy: 70, rx: 190, ry: 90, sigma: 35, fill: "rgb(239,255,238)" },
          { cx: 458, cy: 31, rx: 230, ry: 320, sigma: 67.7, fill: "rgb(226,212,246)", opacity: 0.82 },
          { cx: 123, cy: 368, rx: 376, ry: 99, sigma: 35, fill: "rgb(223,199,250)" },
          { cx: 2, cy: 207, rx: 307, ry: 17, sigma: 45.1, fill: "rgb(255,140,229)", opacity: 0.66 },
          { cx: 1, cy: 89, rx: 153, ry: 51, sigma: 86.1, fill: "rgb(255,230,246)" },
        ]}
      />

      <div
        style={{
          position: "absolute",
          left: 368,
          top: 205,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: "0.01em",
          color: "#221e2b",
        }}
      >
        {WORDS.map(([w, at]) => (
          <span
            key={w}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              opacity: anim(frame, at, at + 3, [0, 1]),
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {frame >= 21 ? (
        <div
          style={{
            position: "absolute",
            left: 368,
            top: 251,
            transform: `translate(-50%, -50%) scale(${btnScale})`,
            background: "#107cfe",
            borderRadius: 6,
            padding: "5px 14px",
            fontFamily: BODY,
            fontWeight: 600,
            fontSize: 10,
            color: "#ffffff",
            boxShadow: "0 2px 8px rgba(16,90,220,0.4)",
          }}
        >
          Get in touch.
        </div>
      ) : null}

      {/* purple sweep: soft-edged circle expanding from the right */}
      {sweepR > 1 ? (
        <div
          style={{
            position: "absolute",
            left: 860 - sweepR,
            top: 180 - sweepR,
            width: sweepR * 2,
            height: sweepR * 2,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #5b21c8 0%, #5b21c8 72%, rgba(91,33,200,0) 100%)",
          }}
        />
      ) : null}
      <AbsoluteFill style={{ background: "#000000", opacity: dimO }} />
      <AbsoluteFill style={{ background: "#000000", opacity: blackO }} />
    </AbsoluteFill>
  );
};
