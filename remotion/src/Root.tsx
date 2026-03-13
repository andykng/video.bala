import React from "react";
import { Composition } from "remotion";
import { BalaBalAwardsVideo } from "./BalaBalAwardsVideo";
import { DURATION_FRAMES, FPS, HEIGHT, WIDTH } from "./constants";

export const Root: React.FC = () => {
  return (
    <Composition
      id="BalaBalAwards"
      component={BalaBalAwardsVideo}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
