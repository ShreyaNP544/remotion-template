import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import { anim, ease, pop, springs } from "../lib/motion";
import { BODY } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 0-79: "Hiiiiiiiiiii" key-cap bar pops in, swaps to the name at f49
const L = {
  barIn: 9,
  barSettled: 14,
  swap: 49,
  trackEnd: 64,
} as const;

export const Scene01Intro: React.FC<{ name?: string }> = ({
  name = "Prince",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // bar creeps up ~0.37px a frame while it holds
  const barTop = anim(frame, L.barSettled, L.swap, [192, 179], {
    easing: ease.linear,
  });
  const barScale = pop(frame, fps, L.barIn, springs.snap);

  // title tracking settles wide -> normal (widths 217 -> 188 in the ref)
  const track = anim(frame, L.swap, L.trackEnd, [0.09, -0.015]);
  const titleOpacity = anim(frame, L.swap, L.swap + 3, [0, 1], {
    easing: ease.outCubic,
  });

  return (
    <AbsoluteFill>
      <Background1 />

      {frame < L.swap ? (
        <div
          style={{
            position: "absolute",
            left: 368.5,
            top: barTop + 21,
            transform: `translate(-50%, -50%) scale(${barScale})`,
            width: 203,
            height: 42,
            borderRadius: 3,
            // dark on the left third, lifting to translucent lavender
            background:
              "linear-gradient(90deg, #8523fc 0%, #8523fc 26%, #9b4cf0 55%, #b470f8 92%, #b470f8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: 31,
              letterSpacing: "0.045em",
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            Hiiiiiiiiiii
          </span>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: 340,
            top: 212,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            fontFamily: BODY,
            fontWeight: 700,
            fontSize: 45,
            letterSpacing: `${track}em`,
            color: "#ffffff",
            opacity: titleOpacity,
          }}
        >
          I&rsquo;m {name}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Background1: React.FC = () => {
  const frame = useCurrentFrame();
  // the bright blob drifts (135,276) -> (282,312) over the scene, measured
  const bx = anim(frame, 0, 78, [135, 282], { easing: ease.linear });
  const by = anim(frame, 0, 78, [276, 312], { easing: ease.linear });

  // fitted at f30, where the core reads at (177,288) — only the core moves
  const dx = bx - 177;
  const dy = by - 288;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <BlobField
        base="rgb(62,8,226)"
        blobs={[
          { cx: 288, cy: 150, rx: 336, ry: 262, sigma: 101.1, fill: "rgb(149,17,255)", opacity: 0.94 },
          { cx: 488, cy: 45, rx: 250, ry: 51, sigma: 169, fill: "rgb(188,176,235)" },
          { cx: 364, cy: 390, rx: 189, ry: 199, sigma: 60.8, fill: "rgb(169,112,243)", opacity: 0.88 },
          { cx: 109 + dx, cy: 284 + dy, rx: 177, ry: 59, sigma: 35, fill: "rgb(243,255,242)" },
          { cx: -47, cy: 1, rx: 76, ry: 279, sigma: 83.4, fill: "rgb(255,255,232)", opacity: 0.77 },
          { cx: -20, cy: 171, rx: 131, ry: 238, sigma: 35, fill: "rgb(164,84,249)", opacity: 0.87 },
        ]}
      />
    </AbsoluteFill>
  );
};
