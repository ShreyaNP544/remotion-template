import React from "react";
import { Composition } from "remotion";

import { SPEC, Template, templateSchema } from "./template";
import { fontsLoaded } from "./lib/fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Template"
      component={Template}
      schema={templateSchema}
      width={SPEC.width}
      height={SPEC.height}
      fps={SPEC.fps}
      durationInFrames={SPEC.durationInFrames}
      defaultProps={{
        name: "Prince",
      }}
      calculateMetadata={async () => {
        await fontsLoaded;
        return {};
      }}
    />
  );
};
