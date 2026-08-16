import React from "react";
import { Player } from "@remotion/player";
import { SPEC, Template } from "../../src/template";

export const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>Portfolio Intro</h1>
        <p style={{ fontSize: 14, opacity: 0.7, marginTop: 6 }}>
          A video template recreated in Remotion — playing live in your
          browser, not a video file.
        </p>
      </div>

      <div
        style={{
          width: "min(92vw, 900px)",
          aspectRatio: `${SPEC.width} / ${SPEC.height}`,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
        }}
      >
        <Player
          component={Template}
          inputProps={{ name: "Prince" }}
          durationInFrames={SPEC.durationInFrames}
          fps={SPEC.fps}
          compositionWidth={SPEC.width}
          compositionHeight={SPEC.height}
          style={{ width: "100%", height: "100%" }}
          controls
          loop
          autoPlay
        />
      </div>

      <p style={{ fontSize: 13, opacity: 0.6 }}>
        <a
          href="https://github.com/ShreyaNP544/remotion-template"
          style={{ color: "#b9a5f0" }}
        >
          source on GitHub
        </a>
        {" · "}
        <a
          href="https://in.pinterest.com/pin/1125125919704254375/"
          style={{ color: "#b9a5f0" }}
        >
          original reference
        </a>
      </p>
    </div>
  );
};
