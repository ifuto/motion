import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type SceneProps = {
  children: ReactNode;
  /** Length of this scene in frames (must match the parent <Sequence>). */
  duration: number;
  fadeIn?: number;
  fadeOut?: number;
};

/**
 * Wrapper that cross-fades a scene in and out on the global timeline.
 * The frame is relative to the parent <Sequence>.
 */
export const Scene: React.FC<SceneProps> = ({
  children,
  duration,
  fadeIn = 22,
  fadeOut = 30,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(
          frame,
          [0, fadeIn, duration - fadeOut, duration],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
