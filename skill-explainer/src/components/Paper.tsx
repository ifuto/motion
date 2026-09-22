import { AbsoluteFill } from "remotion";

/**
 * The sheet every scene is printed on.
 *
 * Brutal-editorial art direction:
 *   paper #F2F0EB · ink #0B0B0C · electric blue #1F3BFF
 *
 * A single 60px engineering grid is the only texture — no gradients, no blobs.
 * Styles stay inline literals so Remotion Studio can edit them.
 */
export const Paper: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2F0EB" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(11, 11, 12, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 11, 12, 0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(11, 11, 12, 0.12) 0px, rgba(11, 11, 12, 0.12) 1px, transparent 1px, transparent 300px)",
        }}
      />
    </AbsoluteFill>
  );
};
