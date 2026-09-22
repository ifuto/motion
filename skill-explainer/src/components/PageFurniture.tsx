import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Sheet furniture that stays put while the pages turn:
 * a blue progress rule on the top edge plus printer's registration marks.
 */
export const PageFurniture: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const mark = "rgba(11, 11, 12, 0.45)";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Progress rule on the top edge */}
      <AbsoluteFill
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: "auto",
          height: 10,
          backgroundColor: "rgba(11, 11, 12, 0.14)",
        }}
      />
      <AbsoluteFill
        style={{
          top: 0,
          left: 0,
          right: "auto",
          bottom: "auto",
          height: 10,
          width: interpolate(frame, [0, durationInFrames], ["0%", "100%"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          backgroundColor: "#1F3BFF",
        }}
      />

      {/* Registration marks */}
      <div style={{ position: "absolute", left: 36, top: 36, width: 46, height: 2, backgroundColor: mark }} />
      <div style={{ position: "absolute", left: 36, top: 36, width: 2, height: 46, backgroundColor: mark }} />
      <div style={{ position: "absolute", right: 36, top: 36, width: 46, height: 2, backgroundColor: mark }} />
      <div style={{ position: "absolute", right: 36, top: 36, width: 2, height: 46, backgroundColor: mark }} />
      <div style={{ position: "absolute", left: 36, bottom: 36, width: 46, height: 2, backgroundColor: mark }} />
      <div style={{ position: "absolute", left: 36, bottom: 36, width: 2, height: 46, backgroundColor: mark }} />
      <div style={{ position: "absolute", right: 36, bottom: 36, width: 46, height: 2, backgroundColor: mark }} />
      <div style={{ position: "absolute", right: 36, bottom: 36, width: 2, height: 46, backgroundColor: mark }} />
    </AbsoluteFill>
  );
};
