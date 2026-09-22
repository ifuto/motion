import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/**
 * Shared light background: soft drifting gradient blobs + a faint dot grid.
 * All motion is driven by useCurrentFrame().
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const x1 = Math.sin(frame / 85) * 40;
  const y1 = Math.cos(frame / 110) * 30;
  const x2 = Math.sin(frame / 95 + 2) * 50;
  const y2 = Math.cos(frame / 75 + 1) * 35;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15, 23, 42, 0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.16), rgba(37, 99, 235, 0))",
          left: -180,
          top: -140,
          translate: `${x1}px ${y1}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.13), rgba(124, 58, 237, 0))",
          right: -260,
          bottom: -180,
          translate: `${x2}px ${y2}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22, 163, 74, 0.08), rgba(22, 163, 74, 0))",
          right: -120,
          top: 700,
          translate: `${-x1}px ${y2}px`,
        }}
      />
    </AbsoluteFill>
  );
};
