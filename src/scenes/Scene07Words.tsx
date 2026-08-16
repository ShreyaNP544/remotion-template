import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

import { keys } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 398-503: big white words zoom down from oversized. every word's
// width was traced per frame; widthKeys is [localFrame, px] and calW is what
// the word renders at when scale is 1.
type Word = {
  text: string;
  at: number;
  fs: number;
  calW: number;
  widthKeys: ReadonlyArray<readonly [number, number]>;
  cyKeys: ReadonlyArray<readonly [number, number]>;
  cxKeys: ReadonlyArray<readonly [number, number]>;
};

const WORDS: Word[] = [
  {
    text: "Proficient with",
    at: 1,
    fs: 130,
    calW: 871,
    widthKeys: [
      [1, 1500],
      [4, 735],
      [7, 690],
      [10, 615],
      [13, 566],
      [16, 529],
      [19, 494],
      [22, 438],
    ],
    cyKeys: [
      [2, 248],
      [4, 236],
      [10, 230],
      [22, 222],
    ],
    cxKeys: [
      [1, 368],
      [7, 374],
      [22, 372],
    ],
  },
  {
    text: "5",
    at: 25,
    fs: 287,
    calW: 133,
    widthKeys: [
      [25, 130],
      [26, 110],
      [29, 95],
      [32, 88],
      [35, 83],
      [38, 80],
      [41, 76],
      [44, 72],
      [47, 64],
    ],
    cyKeys: [
      [26, 196],
      [35, 199],
      [47, 200],
    ],
    cxKeys: [
      [26, 377],
      [47, 373],
    ],
  },
  {
    text: "Editing",
    at: 49,
    fs: 235,
    calW: 728,
    widthKeys: [
      [49, 900],
      [51, 629],
      [54, 576],
      [57, 547],
      [60, 525],
      [63, 504],
      [66, 478],
      [69, 437],
      [72, 336],
      [75, 260],
    ],
    cyKeys: [
      [51, 220],
      [72, 214],
    ],
    cxKeys: [
      [49, 372],
      [75, 372],
    ],
  },
  {
    text: "Softwares",
    at: 77,
    fs: 160,
    calW: 741,
    widthKeys: [
      [77, 900],
      [78, 629],
      [81, 576],
      [84, 547],
      [87, 527],
      [90, 510],
      [93, 491],
      [96, 461],
      [99, 392],
      [102, 251],
    ],
    cyKeys: [
      [78, 210],
      [102, 208],
    ],
    // this one slides left while shrinking into the cut
    cxKeys: [
      [78, 371],
      [90, 368],
      [93, 362],
      [96, 354],
      [99, 337],
      [102, 302],
    ],
  },
];

export const Scene07Words: React.FC = () => {
  const frame = useCurrentFrame();

  const active = [...WORDS].reverse().find((w) => frame >= w.at) ?? WORDS[0]!;
  const scale = keys(frame, active.widthKeys) / active.calW;
  const cx = keys(frame, active.cxKeys);
  const cy = keys(frame, active.cyKeys);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* fitted with scripts/fit_bg.py */}
      <BlobField
        base="rgb(0,0,6)"
        blobs={[
          { cx: 316, cy: 65, rx: 303, ry: 264, sigma: 103.6, fill: "rgb(101,0,219)" },
          { cx: 653, cy: 87, rx: 375, ry: 64, sigma: 74.5, fill: "rgb(45,0,102)" },
          { cx: 516, cy: 233, rx: 192, ry: 164, sigma: 133.3, fill: "rgb(0,0,0)", opacity: 0.96 },
          { cx: -61, cy: 295, rx: 144, ry: 152, sigma: 70.5, fill: "rgb(0,0,0)", opacity: 0.87 },
          { cx: -12, cy: 124, rx: 82, ry: 112, sigma: 60.7, fill: "rgb(45,0,97)" },
          { cx: 213, cy: -8, rx: 331, ry: 43, sigma: 35, fill: "rgb(40,0,88)", opacity: 0.56 },
        ]}
      />
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%, -50%) scale(${scale})`,
          whiteSpace: "nowrap",
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: active.fs,
          letterSpacing: "0.01em",
          color: "#ffffff",
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
