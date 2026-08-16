import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { BODY } from "./lib/fonts";
import { Scene01Intro } from "./scenes/Scene01Intro";
import { Scene02Typewriter } from "./scenes/Scene02Typewriter";
import { Scene03Cards } from "./scenes/Scene03Cards";
import { Scene04Ikigai } from "./scenes/Scene04Ikigai";
import { Scene05Looking } from "./scenes/Scene05Looking";
import { Scene06Counter } from "./scenes/Scene06Counter";
import { Scene07Words } from "./scenes/Scene07Words";
import { Scene08Rings } from "./scenes/Scene08Rings";
import { Scene09Outro } from "./scenes/Scene09Outro";


export const SPEC = {
  width: 736,
  height: 414,
  fps: 30,
  durationInFrames: 649,
} as const;

export const T = {
  s1Intro: [0, 80], // hi bar -> "I'm Prince"
  s2Typewriter: [80, 161], // input box + "A motion designer"
  s3Cards: [161, 195], // 7-card stack
  s4Ikigai: [195, 289], // paper card -> japanese concept -> 3D float pair
  s5Looking: [289, 335], // aurora, "I'm looking to work..."
  s6Counter: [335, 398], // "I've worked with over" 100+ clients
  s7Words: [398, 504], // Proficient with / 5 / Editing / Softwares
  s8Rings: [504, 571], // ripple rings, "Future of work? You're in."
  s9Outro: [571, 649], // let's collaborate + button + sweep to black
} as const;

const dur = (k: keyof typeof T) => T[k][1] - T[k][0];

export const templateSchema = z.object({
  name: z.string(),
});

export type TemplateProps = z.infer<typeof templateSchema>;

export const Template: React.FC<TemplateProps> = ({ name }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", fontFamily: BODY }}>
      <Sequence name="1 Intro" from={T.s1Intro[0]} durationInFrames={dur("s1Intro")}>
        <Scene01Intro name={name} />
      </Sequence>
      <Sequence name="2 Typewriter" from={T.s2Typewriter[0]} durationInFrames={dur("s2Typewriter")}>
        <Scene02Typewriter />
      </Sequence>
      <Sequence name="3 Cards" from={T.s3Cards[0]} durationInFrames={dur("s3Cards")}>
        <Scene03Cards />
      </Sequence>
      <Sequence name="4 Ikigai" from={T.s4Ikigai[0]} durationInFrames={dur("s4Ikigai")}>
        <Scene04Ikigai />
      </Sequence>
      <Sequence name="5 Looking" from={T.s5Looking[0]} durationInFrames={dur("s5Looking")}>
        <Scene05Looking />
      </Sequence>
      <Sequence name="6 Counter" from={T.s6Counter[0]} durationInFrames={dur("s6Counter")}>
        <Scene06Counter />
      </Sequence>
      <Sequence name="7 Words" from={T.s7Words[0]} durationInFrames={dur("s7Words")}>
        <Scene07Words />
      </Sequence>
      <Sequence name="8 Rings" from={T.s8Rings[0]} durationInFrames={dur("s8Rings")}>
        <Scene08Rings />
      </Sequence>
      <Sequence name="9 Outro" from={T.s9Outro[0]} durationInFrames={dur("s9Outro")}>
        <Scene09Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
