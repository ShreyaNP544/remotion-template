import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

import { anim, ease, keys } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 80-160. the input box types "A video editor," while the camera pulls
// back, pans off left, then "A motion designer" types word by word.
const FULL_TEXT = "A video editor,";

const L = {
  zoomEnd: 10, // f90
  comma: 22, // f102
  wordsStart: 40, // f120
} as const;

export const Scene02Typewriter: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background2 />
      {frame < L.wordsStart ? <TypeBox /> : <WordType />}
    </AbsoluteFill>
  );
};

const TypeBox: React.FC = () => {
  const frame = useCurrentFrame();

  // 10 chars already there at f80, one more every ~1.8 frames, comma last
  const chars =
    frame >= L.comma ? 15 : Math.min(14, 10 + Math.round(frame * 0.55));

  // caret stays solid while typing, then blinks on a 15-frame cycle
  const caretOn = frame < 7 || (frame - 14 + 30) % 15 < 8;

  // zoom-out: text cap height goes 54px -> 27px between f80 and f90
  const scale = anim(frame, 0, L.zoomEnd, [2, 1], { easing: ease.outQuint });

  // pan-left exit, keyed off the caret position in the ref
  const panX = keys(frame, [
    [21, 0],
    [29, -44],
    [31, -71],
    [33, -103],
    [35, -148],
    [36, -176],
    [39, -337],
    [40, -430],
  ]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "261px 215px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 100 + panX,
          top: 172,
          width: 532,
          height: 70,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(140,60,255,0.07)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 25,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: 30,
              letterSpacing: "0.075em",
              color: "#ffffff",
              lineHeight: 1,
              whiteSpace: "pre",
            }}
          >
            {FULL_TEXT.slice(0, chars)}
          </span>
          <div
            style={{
              width: 3,
              height: 31,
              marginLeft: 4,
              marginTop: 2,
              background: "#e2ff4a",
              opacity: caretOn ? 1 : 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const WordType: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - L.wordsStart;

  // the whole line drifts left and scales up a touch as it settles
  const cx = keys(frame, [
    [L.wordsStart, 521],
    [L.wordsStart + 20, 423],
    [L.wordsStart + 32, 368],
  ]);
  const scale = keys(frame, [
    [L.wordsStart, 0.98],
    [L.wordsStart + 20, 1.0],
    [L.wordsStart + 35, 1.11],
  ]);

  const words: Array<[string, number]> = [
    ["A", 0],
    ["motion", 7],
    ["designer", 15],
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: 208,
        transform: `translate(-50%, -50%) scale(${scale})`,
        whiteSpace: "nowrap",
        fontFamily: BODY,
        fontWeight: 600,
        fontSize: 27,
        letterSpacing: "0.05em",
        color: "#ffffff",
        lineHeight: 1.2,
      }}
    >
      {words.map(([w, at], i) => {
        const visible = local >= at;
        return visible ? (
          <span key={w} style={{ opacity: anim(local, at, at + 3, [0, 1]) }}>
            {i > 0 ? " " : ""}
            {w}
          </span>
        ) : null;
      })}
    </div>
  );
};

// two fitted keyframes (f100 and f140) crossfaded while the glow migrates
const Background2: React.FC = () => {
  const frame = useCurrentFrame();
  const glowDy =
    anim(frame, 0, 46, [95, 162], { easing: ease.inOutCubic }) - 124.5;
  const lateO = anim(frame, 25, 45, [0, 1], { easing: ease.inOutCubic });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <BlobField
        base="rgb(1,0,4)"
        blobs={[
          { cx: 280, cy: 86 + glowDy, rx: 181, ry: 83, sigma: 35, fill: "rgb(119,0,255)" },
          { cx: 472, cy: 55, rx: 253, ry: 174, sigma: 70.8, fill: "rgb(31,0,66)", opacity: 0.92 },
          { cx: 288, cy: 294, rx: 229, ry: 113, sigma: 57.9, fill: "rgb(37,0,82)" },
          { cx: -54, cy: 304, rx: 207, ry: 101, sigma: 35, fill: "rgb(6,0,17)" },
          { cx: -16, cy: 161 + glowDy, rx: 195, ry: 24, sigma: 35, fill: "rgb(124,0,255)", opacity: 0.49 },
          { cx: 111, cy: 39, rx: 414, ry: 34, sigma: 35, fill: "rgb(53,0,116)" },
        ]}
      />
      <AbsoluteFill style={{ opacity: lateO }}>
        <BlobField
          base="rgb(5,0,13)"
          blobs={[
            { cx: 212, cy: 111, rx: 80, ry: 78, sigma: 35, fill: "rgb(0,0,0)" },
            { cx: 487, cy: 54, rx: 232, ry: 200, sigma: 86.4, fill: "rgb(32,0,72)", opacity: 0.95 },
            { cx: 318, cy: 269, rx: 196, ry: 141, sigma: 45.1, fill: "rgb(39,0,87)", opacity: 0.94 },
            { cx: -11, cy: 158, rx: 188, ry: 66, sigma: 35, fill: "rgb(133,0,255)" },
            { cx: 115, cy: 207, rx: 142, ry: 50, sigma: 35, fill: "rgb(116,0,255)", opacity: 0.76 },
            { cx: -44, cy: 15, rx: 146, ry: 276, sigma: 35, fill: "rgb(57,0,130)", opacity: 0.84 },
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
