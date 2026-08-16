import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

import { anim, ease, keys } from "../lib/motion";
import { BODY, SERIF } from "../lib/fonts";
import { BlobField } from "../lib/BlobField";

// frames 335-397: "I've worked with over" on dark, then a warm mesh rises
// from the bottom and the serif counter runs up to 100+.
export const Scene06Counter: React.FC = () => {
  const frame = useCurrentFrame();

  const track = anim(frame, 1, 13, [0.16, 0.02], { easing: ease.outQuart });
  // the line shrinks and migrates to the top as the counter takes over
  const riseT = anim(frame, 21, 29, [0, 1], { easing: ease.inOutCubic });
  const lineY = 205 - riseT * 85;
  const lineFs = 30 - riseT * 12;

  // counter values keyed to the readings visible in the ref (59, 78, 92...)
  const count = Math.round(
    keys(frame, [
      [25, 0],
      [33, 59],
      [37, 78],
      [41, 92],
      [45, 99],
      [49, 100],
    ]),
  );

  const counterO = anim(frame, 27, 33, [0, 1]);
  const auroraO = anim(frame, 21, 30, [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* phase A dark bg */}
      <BlobField
        base="rgb(6,0,16)"
        blobs={[
          { cx: 190, cy: 60, rx: 220, ry: 140, sigma: 60, fill: "rgb(70,0,160)", opacity: 0.9 },
          { cx: 620, cy: 300, rx: 260, ry: 180, sigma: 70, fill: "rgb(24,4,52)", opacity: 0.85 },
        ]}
      />
      {/* phase B/C warm mesh, fading in as it rises */}
      {/* the warm mesh rises in from the bottom edge, it doesn't crossfade */}
      <AbsoluteFill
        style={{
          opacity: auroraO,
          transform: `translateY(${(1 - auroraO) * 300}px)`,
        }}
      >
        <BlobField
          base="rgb(245,59,204)"
          blobs={[
            { cx: 282, cy: 70, rx: 357, ry: 410, sigma: 36.2, fill: "rgb(182,149,208)", opacity: 0.76 },
            { cx: 614, cy: 15, rx: 292, ry: 276, sigma: 42.2, fill: "rgb(244,62,26)", opacity: 0.88 },
            { cx: 359, cy: 162, rx: 142, ry: 114, sigma: 68.4, fill: "rgb(255,206,137)" },
            { cx: 70, cy: 298, rx: 257, ry: 169, sigma: 63.9, fill: "rgb(136,0,255)" },
            { cx: 107, cy: 12, rx: 273, ry: 111, sigma: 169.3, fill: "rgb(122,11,242)" },
            { cx: 93, cy: 93, rx: 96, ry: 43, sigma: 35, fill: "rgb(141,37,255)", opacity: 0.92 },
          ]}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: 368,
          top: lineY,
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: lineFs,
          letterSpacing: `${track}em`,
          color: riseT > 0.5 ? "#241d2c" : "#ffffff",
          opacity: anim(frame, 0, 3, [0, 1]),
        }}
      >
        I've worked with over
      </div>

      {frame >= 27 ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 380,
              top: 202,
              transform: "translate(-50%, -50%)",
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: 123,
              color: "#181120",
              opacity: counterO,
              whiteSpace: "nowrap",
            }}
          >
            {count}+
          </div>
          <div
            style={{
              position: "absolute",
              left: 370,
              top: 352,
              transform: "translate(-50%, -50%)",
              fontFamily: BODY,
              fontWeight: 700,
              fontSize: 36,
              color: "#1c1526",
              opacity: counterO,
            }}
          >
            Clients
          </div>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
