import React from "react";
import { Trail } from "@remotion/motion-blur";
import {
  AbsoluteFill,
  getRemotionEnvironment,
  Img,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { anim, ease, keys } from "../lib/motion";
import { BlobField } from "../lib/BlobField";

// Trail re-renders its children several times per frame, which is too heavy
// for live preview — only blur when actually rendering
const MotionBlur: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  getRemotionEnvironment().isRendering ? (
    <Trail layers={4} lagInFrames={0.35} trailOpacity={0.35}>
      <AbsoluteFill>{children}</AbsoluteFill>
    </Trail>
  ) : (
    <AbsoluteFill>{children}</AbsoluteFill>
  );

// frames 161-194: seven cards slide up from the bottom, each one covering
// the last. card faces are cropped straight out of public/ref (see README).
const ENTER = [0, 2, 5, 12, 18, 24, 30] as const; // local enter frames
const ENTER_DUR = 6;

const CARD_RADIUS = 22;

export const Scene03Cards: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background3 />
      {/* motion blur on the fast slide-ups */}
      <MotionBlur>
      {CARDS.map((content, i) => {
        const enterAt = ENTER[i] ?? 0;
        if (frame < enterAt) {
          return null;
        }
        const t = frame - enterAt;

        // cards never actually rest in the ref — fast entry, then a slow
        // continuous drift up and back through the stack
        const top = keys(t, [
          [0, 430],
          [2, 220],
          [4, 150],
          [13, 100],
          [19, 87],
          [25, 80],
          [34, 76],
        ]);
        const inset = keys(t, [
          [0, 30],
          [4, 30],
          [13, 95],
          [19, 140],
          [25, 168],
          [34, 188],
        ]);

        const isPhone = i === 3;
        const width = isPhone ? 200 : 736 - 2 * inset;
        const left = isPhone ? 268 : inset;
        const phoneLift = isPhone
          ? keys(t, [
              [0, -60],
              [6, -60],
              [10, 0],
              [16, 25],
            ])
          : 0;

        // receded cards get shaded from the top, but only once a full-width
        // card lands in front. the narrow phone shades nothing.
        const coveringFull = ENTER.filter(
          (e, j) => j > i && j !== 3 && frame >= e,
        );
        const shade =
          coveringFull.length === 0
            ? 0
            : anim(frame, Math.min(...coveringFull), Math.min(...coveringFull) + ENTER_DUR, [0, 1], {
                easing: ease.outCubic,
              }) *
              Math.min(1, 0.75 + 0.25 * coveringFull.length);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left,
              top: top + phoneLift,
              width,
              height: 460,
              borderRadius: isPhone ? 10 : CARD_RADIUS,
              overflow: "hidden",
              boxShadow:
                "0 -10px 26px rgba(0,0,0,0.45), 0 -3px 8px rgba(0,0,0,0.3)",
            }}
          >
            {content}
            <AbsoluteFill
              style={{
                opacity: shade,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.52) 0px, rgba(0,0,0,0.30) 55px, rgba(0,0,0,0.22) 110px, rgba(0,0,0,0.22) 100%)",
              }}
            />
          </div>
        );
      })}
      </MotionBlur>
    </AbsoluteFill>
  );
};

// the portrait "video": 6 frames cropped from the ref, played while the card
// is front. Trail passes fractional frames, hence the floor.
const PortraitVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.max(0, Math.min(5, Math.floor(frame - 12)));
  return (
    <AbsoluteFill style={{ background: "#15130f" }}>
      <Img
        src={staticFile(`cards/portrait_${idx}.png`)}
        style={{ width: "100%", display: "block" }}
      />
    </AbsoluteFill>
  );
};

const face = (name: string, bg: string, key: string) => (
  <AbsoluteFill key={key} style={{ background: bg }}>
    <Img
      src={staticFile(`cards/${name}.png`)}
      style={{ width: "100%", display: "block" }}
    />
  </AbsoluteFill>
);

const CARDS: React.ReactNode[] = [
  <AbsoluteFill key="c1" style={{ background: "#a9d8a4" }} />, // mint green
  face("office", "#a89372", "c2"), // overhead office + "Welcome" monitor
  face("tablet", "#f4f2ef", "c3"), // white card, tablet saying hello
  <PortraitVideo key="c4" />,
  face("think", "#f2f0ed", "c5"), // "you ever think ?"
  face("black", "#000000", "c6"), // Ai / Ps / creativity
  face("food", "#f2600c", "c7"), // orange food card
];

// deep purple backdrop, brighter upper left. mostly hidden behind the stack.
const Background3: React.FC = () => (
  <BlobField
    base="rgb(28,0,62)"
    blobs={[
      { cx: 60, cy: 140, rx: 190, ry: 210, sigma: 55, fill: "rgb(82,10,175)" },
      { cx: 690, cy: 60, rx: 170, ry: 130, sigma: 70, fill: "rgb(35,4,80)", opacity: 0.8 },
      { cx: 620, cy: 300, rx: 260, ry: 160, sigma: 60, fill: "rgb(10,0,26)", opacity: 0.9 },
    ]}
  />
);
