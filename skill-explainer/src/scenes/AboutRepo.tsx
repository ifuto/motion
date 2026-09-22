import { AbsoluteFill, Easing, Interactive, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 02 — The repository (960 frames / 16 s)
 *
 * The repo is set as a typeset tree: rows land one after another, then
 * SKILL.md is flooded with blue — the entry point of the whole skill.
 */

const ROWS = [
  { label: "motion/", indent: 0, size: 34, strong: true },
  { label: "skills/", indent: 44, size: 32, strong: false },
  { label: "remotion-best-practices/", indent: 88, size: 32, strong: true },
  { label: "SKILL.md", indent: 132, size: 34, strong: true },
  { label: "remotion-create/", indent: 132, size: 32, strong: false },
  { label: "remotion-markup/", indent: 132, size: 32, strong: false },
  { label: "remotion-render/", indent: 132, size: 32, strong: false },
  { label: "remotion-studio/", indent: 132, size: 32, strong: false },
  { label: "remotion-docs/", indent: 132, size: 32, strong: false },
] as const;

export const AboutRepo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F2F0EB",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#0B0B0C",
        overflow: "hidden",
      }}
    >
      <Paper />

      <Interactive.Div
        name="Folio"
        style={{
          position: "absolute",
          left: 88,
          top: 100,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.2em",
        }}
      >
        <span style={{ width: 18, height: 18, backgroundColor: "#1F3BFF" }} />
        IFUTO / MOTION
      </Interactive.Div>
      <Interactive.Div
        name="Folio meta"
        style={{
          position: "absolute",
          right: 88,
          top: 104,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "rgba(11, 11, 12, 0.55)",
        }}
      >
        SECTION 02 / 09
      </Interactive.Div>
      <div style={{ position: "absolute", left: 0, top: 168, width: 1080, height: 2, backgroundColor: "#0B0B0C" }} />

      {/* Number badge */}
      <div style={{ position: "absolute", left: 100, top: 236, width: 104, height: 104, backgroundColor: "#0B0B0C" }} />
      <Interactive.Div
        name="Section number"
        style={{
          position: "absolute",
          left: 88,
          top: 224,
          width: 104,
          height: 104,
          backgroundColor: "#1F3BFF",
          color: "#F2F0EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 52,
          fontWeight: 700,
          scale: interpolate(frame, [0, 14], [0.7, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        02
      </Interactive.Div>

      {/* Headline in two masked lines */}
      <Interactive.Div
        name="Headline"
        style={{ position: "absolute", left: 232, top: 216, width: 760, height: 150, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            translate: interpolate(frame, [8, 34], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          このリポジトリ
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Lead"
        style={{
          position: "absolute",
          left: 88,
          top: 380,
          width: 904,
          fontSize: 46,
          fontWeight: 500,
          lineHeight: 1.5,
          opacity: interpolate(frame, [40, 54], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [40, 64], ["0px 28px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        エージェントが Remotion で動画を
        <br />
        正しく作るための「Skill」集です。
      </Interactive.Div>

      {/* Typeset tree */}
      <div style={{ position: "absolute", left: 118, top: 892, width: 2, height: 496, backgroundColor: "rgba(11, 11, 12, 0.3)" }} />
      <div style={{ position: "absolute", left: 162, top: 954, width: 2, height: 434, backgroundColor: "rgba(11, 11, 12, 0.3)" }} />
      <div style={{ position: "absolute", left: 88, top: 830, width: 904 }}>
        {ROWS.map((row, index) => (
          <Interactive.Div
            key={row.label}
            name={row.label}
            from={130 + index * 8}
            durationInFrames={960}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              height: 62,
              marginLeft: row.indent,
              paddingLeft: 24,
              borderBottom: "1px solid rgba(11, 11, 12, 0.18)",
              backgroundColor:
                index === 3
                  ? interpolateColors(frame, [0, 255, 263], ["rgba(31, 59, 255, 0)", "rgba(31, 59, 255, 0)", "#1F3BFF"])
                  : "transparent",
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: row.size,
              fontWeight: row.strong ? 700 : 400,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ width: 12, height: 12, backgroundColor: index < 2 ? "#0B0B0C" : "#1F3BFF" }} />
            <span
              style={{
                color:
                  index === 3
                    ? interpolateColors(frame, [0, 255, 263], ["#0B0B0C", "#0B0B0C", "#F2F0EB"])
                    : "#0B0B0C",
              }}
            >
              {row.label}
            </span>
            {index === 3 ? (
              <span
                style={{
                  marginLeft: "auto",
                  paddingRight: 24,
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#F2F0EB",
                  opacity: interpolate(frame, [262, 282], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                ← ここから読む
              </span>
            ) : null}
          </Interactive.Div>
        ))}
      </div>

      {/* Closing band */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1480,
          width: 1080,
          height: 210,
          backgroundColor: "#0B0B0C",
          translate: interpolate(frame, [620, 680], ["0px 440px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1480,
          width: 22,
          height: 210,
          backgroundColor: "#1F3BFF",
          translate: interpolate(frame, [620, 680], ["0px 440px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Band label"
        from={676}
        style={{
          position: "absolute",
          left: 88,
          top: 1524,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "rgba(242, 240, 235, 0.6)",
        }}
      >
        GUIDE FOR AGENTS
      </Interactive.Div>
      <Interactive.Div
        name="Band statement"
        from={690}
        style={{
          position: "absolute",
          left: 88,
          top: 1568,
          width: 904,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#F2F0EB",
        }}
      >
        ベストプラクティスを、コードで担保する
      </Interactive.Div>
    </AbsoluteFill>
  );
};
