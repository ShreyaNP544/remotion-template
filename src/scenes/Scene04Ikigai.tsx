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
import { BODY, SERIF } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 195-288. the paper card: ikigai -> internal scroll -> "a japanese
// concept" typing -> 3D float next to the checklist card, then both swing
// off right. one long shot, so it's one component.
const TYPED = "a japanese concept";

const MotionBlur: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  getRemotionEnvironment().isRendering ? (
    <Trail layers={3} lagInFrames={0.4} trailOpacity={0.4}>
      <AbsoluteFill>{children}</AbsoluteFill>
    </Trail>
  ) : (
    <AbsoluteFill>{children}</AbsoluteFill>
  );

export const Scene04Ikigai: React.FC = () => {
  const frame = useCurrentFrame();

  // lands wide and keeps receding the whole time (widths measured per frame)
  const width = keys(frame, [
    [3, 713],
    [9, 601],
    [15, 547],
    [25, 499],
    [35, 473],
    [45, 440],
    [51, 432],
    [91, 420],
  ]);
  const height = width * 0.385;
  const cy = keys(frame, [
    [7, 258],
    [15, 255],
    [45, 240],
    [91, 236],
  ]);
  // float phase: everything zooms ~1.45x while tilting, card drifts to the
  // left edge, then exits right at the very end
  const tilt = anim(frame, 51, 69, [0, 1], { easing: ease.inOutCubic });
  const zoom = 1 + tilt * 0.45;
  const zWidth = width * zoom;
  const exitT = anim(frame, 90, 93, [0, 1], { easing: ease.inQuint });
  const cardX = 367 - zWidth / 2 - tilt * 195 + exitT * 900;
  const rotY = tilt * 26 - exitT * 30;

  // the card bottom stays past the frame edge until the shrink catches up,
  // and it reads taller than its resting aspect while floating
  const zHeight = height * (1 + tilt * 0.85);
  const top =
    frame < 8
      ? keys(frame, [
          [0, 430],
          [3, 154],
          [7, 151],
        ])
      : cy + tilt * 42 - zHeight / 2;
  const drawHeight = frame < 12 ? Math.max(zHeight, 444 - top) : zHeight;

  // inner scroll (phase B), in card-heights
  const scrollT = anim(frame, 20, 24, [0, 1], { easing: ease.inOutQuart });
  const blur = frame >= 19 && frame <= 25 ? 14 * Math.sin(Math.PI * scrollT) : 0;

  const chars = Math.max(
    0,
    Math.min(TYPED.length, Math.floor((frame - 34) / 1.6)),
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Background4 />

      {/* leftovers of the scene-3 stack, tucking in as the paper card lands */}
      {frame < 60 ? (
        <>
          <Sliver
            top={87 + (top - 88 - 87) * anim(frame, 0, 6, [0, 1])}
            inset={(736 - width) / 2 + 85}
            color="#d9d3de"
            o={anim(frame, 34, 50, [1, 0])}
          />
          <Sliver
            top={100 + (top - 55 - 100) * anim(frame, 0, 6, [0, 1])}
            inset={(736 - width) / 2 + 52}
            color="#0a0a0b"
            o={anim(frame, 28, 44, [1, 0])}
          />
          <Sliver
            top={175 + (top - 13 - 175) * anim(frame, 0, 6, [0, 1])}
            inset={frame < 6 ? 30 : (736 - width) / 2 + 22}
            color="#e0560d"
            tall={frame < 10}
            o={anim(frame, 22, 38, [1, 0])}
          />
        </>
      ) : null}

      {/* motion blur for the entry and the internal scroll (render only —
          Trail is too heavy for live preview) */}
      <MotionBlur>
      <div style={{ position: "absolute", inset: 0, perspective: 900 }}>
        <div
          style={{
            position: "absolute",
            left: cardX,
            top,
            width: zWidth,
            height: drawHeight,
            borderRadius: 0.03 * zWidth,
            background: "#efe9e6",
            overflow: "hidden",
            transform: `rotateY(${rotY}deg) rotateX(${
              tilt * 4 + anim(frame, 0, 9, [-7, 0], { easing: ease.outCubic })
            }deg)`,
            transformOrigin: "50% 50%",
            boxShadow: "0 10px 30px rgba(20,0,40,0.5)",
          }}
        >
          <PaperSpecks />
          {/* phase A/B content: ikigai, scrolls away upward */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateY(${-scrollT * height * 1.1}px)`,
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          >
            {/* the word has its own zoom, bigger and lower during entry */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: `${keys(frame, [
                  [3, 64],
                  [15, 40],
                ])}%`,
                transform: "translate(-50%, -50%)",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize:
                  zWidth *
                  0.145 *
                  (keys(frame, [
                    [3, 0.59],
                    [15, 0.42],
                  ]) /
                    0.42),
                color: "#3a3336",
                letterSpacing: "0.01em",
              }}
            >
              ikigai
            </span>
            {/* ink-branch blot at the top edge of the paper */}
            <svg
              style={{ position: "absolute", left: "38%", top: 0, opacity: 0.75 }}
              width={zWidth * 0.22}
              height={zWidth * 0.06}
              viewBox="0 0 160 40"
            >
              <g stroke="#241f20" fill="none">
                <path d="M0 6 Q40 18 80 10 T160 16" strokeWidth={2.5} />
                <path d="M70 12 q8 10 2 22" strokeWidth={2} />
                <circle cx={58} cy={10} r={4} fill="#241f20" />
                <circle cx={92} cy={13} r={3} fill="#241f20" />
                <circle cx={78} cy={26} r={2.4} fill="#241f20" />
              </g>
            </svg>
          </div>
          {/* phase C/D content: arrives from below during the scroll */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateY(${(1 - scrollT) * height * 1.1}px)`,
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "5%",
                bottom: "9%",
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: zWidth * 0.032,
                color: "#2b2528",
              }}
            >
              <span style={{ color: "#e0560d" }}>E</span>dited
            </span>
            <span
              style={{
                position: "absolute",
                left: "16%",
                top: "38%",
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: zWidth * 0.055,
                color: "#3a3336",
                whiteSpace: "pre",
              }}
            >
              {TYPED.slice(0, chars)}
            </span>
            <KeyIllustration width={zWidth} />
            <ToriiSketch width={zWidth} />
          </div>
          {/* sakura photo panel slides over the card at abs 262 (local 66) */}
          <div
            style={{
              position: "absolute",
              left: "4%",
              top: `${anim(frame, 65, 73, [110, 9], { easing: ease.outQuint })}%`,
              width: "56%",
              height: "84%",
              background: "#0a0a0c",
              overflow: "hidden",
            }}
          >
            {/* b/w sakura artwork extracted from ref f270 */}
            <Img
              src={staticFile("cards/sakura.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* lavender checklist card (enters from right at abs 246, local 50) */}
        <ChecklistCard frame={frame} exitT={exitT} />
      </div>
      </MotionBlur>

      <BasedIn frame={frame} />
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------- pieces -- */

const Sliver: React.FC<{
  top: number;
  inset: number;
  color: string;
  o: number;
  tall?: boolean;
}> = ({ top, inset, color, o, tall }) => (
  <div
    style={{
      position: "absolute",
      left: inset,
      top,
      width: 736 - 2 * inset,
      height: tall ? 460 : 200,
      borderRadius: 18,
      background: color,
      opacity: o,
      boxShadow: "0 -8px 20px rgba(0,0,0,0.4)",
    }}
  />
);

// paper specks. seeded so every render is identical
const PaperSpecks: React.FC = () => {
  const dots: React.ReactNode[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 26; i++) {
    const x = rand() * 100;
    const y = rand() * 100;
    const s = 1 + rand() * 2;
    dots.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: s,
          height: s,
          borderRadius: "50%",
          background: "rgba(40,32,30,0.22)",
        }}
      />,
    );
  }
  return <>{dots}</>;
};

const KeyIllustration: React.FC<{ width: number }> = ({ width }) => (
  <svg
    style={{ position: "absolute", left: "38%", top: "48%" }}
    width={width * 0.3}
    height={width * 0.12}
    viewBox="0 0 200 70"
  >
    <g stroke="#2f2a2c" strokeWidth={3} fill="none">
      <circle cx={38} cy={35} r={20} />
      <circle cx={38} cy={35} r={9} fill="#2f2a2c" opacity={0.75} />
      <line x1={58} y1={35} x2={175} y2={35} strokeWidth={5} />
      <line x1={148} y1={35} x2={148} y2={52} strokeWidth={5} />
      <line x1={166} y1={35} x2={166} y2={55} strokeWidth={5} />
    </g>
  </svg>
);

const ToriiSketch: React.FC<{ width: number }> = ({ width }) => (
  <svg
    style={{ position: "absolute", right: "3%", top: "8%", opacity: 0.18 }}
    width={width * 0.14}
    height={width * 0.12}
    viewBox="0 0 100 80"
  >
    <g stroke="#4a4245" strokeWidth={3} fill="none">
      <path d="M5 18 Q50 8 95 18" />
      <line x1={12} y1={30} x2={88} y2={30} />
      <line x1={25} y1={30} x2={22} y2={78} />
      <line x1={75} y1={30} x2={78} y2={78} />
    </g>
  </svg>
);

const CHECKS = [
  "Turning Raw Footage into Real Emotion.",
  "Bringing stories to life",
  "Your visuals, refined to perfection.",
  "Where raw footage becomes real magic.",
];

const ChecklistCard: React.FC<{ frame: number; exitT: number }> = ({
  frame,
  exitT,
}) => {
  if (frame < 51) {
    return null;
  }
  const inT = anim(frame, 51, 59, [0, 1], { easing: ease.outQuint });
  // grows with the same float-zoom as the paper card
  const grow = anim(frame, 51, 69, [0, 1], { easing: ease.inOutCubic });
  const left = 378 - grow * 4 + (1 - inT) * 380 + exitT * 900;
  const titleWords = ["Your", "Visual", "Storyteller"];
  const z = 1 + grow * 0.42;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 128 - grow * 12,
        width: 300 * z,
        height: 230 * z,
        borderRadius: 12 * z,
        background: "linear-gradient(160deg, #efeafc 0%, #ddd2fa 60%, #cfc0f6 100%)",
        transform: `rotateY(${-10 + exitT * -25}deg) rotateX(3deg)`,
        boxShadow: "0 10px 26px rgba(20,0,40,0.45)",
        padding: `${14 * z}px ${16 * z}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: 19 * z,
          backgroundImage: "linear-gradient(90deg, #7b4bf0, #a86df5)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {"✦ "}
        {titleWords.map((w, i) => (
          <span key={w} style={{ opacity: anim(frame, 54 + i * 6, 57 + i * 6, [0, 1]) }}>
            {w}{" "}
          </span>
        ))}
      </div>
      {CHECKS.map((c, i) => (
        <div
          key={c}
          style={{
            marginTop: 9 * z,
            marginLeft: 2,
            padding: `${6 * z}px ${9 * z}px`,
            borderRadius: 7 * z,
            background: "rgba(255,255,255,0.85)",
            fontFamily: BODY,
            fontWeight: 500,
            fontSize: 10.5 * z,
            color: "#3c3550",
            boxShadow: "0 1px 3px rgba(60,30,120,0.18)",
            opacity: anim(frame, 58 + i * 5, 62 + i * 5, [0, 1]),
            transform: `translateY(${(1 - anim(frame, 58 + i * 5, 62 + i * 5, [0, 1])) * 10}px)`,
          }}
        >
          <span style={{ color: "#8a63f2", marginRight: 5 }}>+</span>
          {c}
        </div>
      ))}
    </div>
  );
};

const BasedIn: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 47) {
    return null;
  }
  const words: Array<[string, number]> = [
    ["Based", 47],
    ["in", 51],
    ["Nigeria", 55],
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 368,
        top: anim(frame, 51, 70, [34, 84], { easing: ease.inOutCubic }),
        transform: "translate(-50%, -50%)",
        whiteSpace: "nowrap",
        fontFamily: BODY,
        fontWeight: 600,
        fontSize: anim(frame, 51, 70, [15, 17.5], { easing: ease.inOutCubic }),
        color: "#ffffff",
      }}
    >
      {words.map(([w, at]) => (
        <span key={w} style={{ opacity: anim(frame, at, at + 3, [0, 1]) }}>
          {w}{" "}
        </span>
      ))}
      {/* white flag glyph, drawn inline (emoji don't render headless) */}
      <svg
        width={19}
        height={15}
        viewBox="0 0 19 15"
        style={{ opacity: anim(frame, 58, 61, [0, 1]), verticalAlign: "-2px" }}
      >
        <path d="M2 1 v13" stroke="#ffffff" strokeWidth={1.6} />
        <path d="M3 1.5 Q7 0 9.5 1.5 T16.5 2 V8 Q12 6.6 9.5 8 T3 7.5 Z" fill="#ffffff" />
      </svg>
    </div>
  );
};

const Background4: React.FC = () => {
  const frame = useCurrentFrame();
  // a pale glow creeps up from the lower left near the end, and the top-left
  // brightens once the cards float
  const glowO = anim(frame, 56, 80, [0, 0.5]);
  const brightO = anim(frame, 51, 69, [0, 0.9]);
  return (
    <BlobField
      base="rgb(20,0,45)"
      blobs={[
        { cx: 40, cy: 160, rx: 200, ry: 260, sigma: 60, fill: "rgb(58,0,122)" },
        { cx: 360, cy: 20, rx: 300, ry: 90, sigma: 60, fill: "rgb(49,0,97)", opacity: 0.9 },
        { cx: 700, cy: 120, rx: 180, ry: 200, sigma: 70, fill: "rgb(10,0,30)", opacity: 0.95 },
        { cx: 620, cy: 260, rx: 120, ry: 90, sigma: 55, fill: "rgb(73,18,95)", opacity: 0.7 },
        { cx: 500, cy: 400, rx: 300, ry: 70, sigma: 55, fill: "rgb(12,0,28)", opacity: 0.9 },
        { cx: 180, cy: 440, rx: 320, ry: 130, sigma: 70, fill: "rgb(226,214,246)", opacity: glowO },
        { cx: 140, cy: 90, rx: 280, ry: 200, sigma: 65, fill: "rgb(92,40,200)", opacity: brightO },
      ]}
    />
  );
};
