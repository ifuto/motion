import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 09 — Closing (1260 frames / 21 s)
 *
 * The ink plate rises over the sheet and the film signs off with the two
 * lines that matter: follow the skill, then render on request.
 */
export const Closing: React.FC = () => {
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
        SECTION 09 / 09
      </Interactive.Div>
      <div style={{ position: "absolute", left: 0, top: 168, width: 1080, height: 2, backgroundColor: "#0B0B0C" }} />

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
        09
      </Interactive.Div>

      <Interactive.Div
        name="Call to action"
        style={{ position: "absolute", left: 232, top: 216, width: 760, height: 150, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 82,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            translate: interpolate(frame, [8, 34], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          はじめよう
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Repository address"
        from={40}
        style={{
          position: "absolute",
          left: 88,
          top: 400,
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ width: 22, height: 22, backgroundColor: "#1F3BFF" }} />
        github.com/ifuto/motion/
      </Interactive.Div>
      <Interactive.Div
        name="Skill path"
        from={70}
        style={{
          position: "absolute",
          left: 130,
          top: 482,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 32,
          fontWeight: 400,
          color: "rgba(11, 11, 12, 0.6)",
        }}
      >
        skills/remotion-best-practices/SKILL.md
      </Interactive.Div>
      <Interactive.Div
        name="CTA line"
        from={100}
        style={{
          position: "absolute",
          left: 88,
          top: 560,
          fontSize: 44,
          fontWeight: 700,
          color: "#1F3BFF",
        }}
      >
        README と SKILL.md から始めよう
      </Interactive.Div>

      {/* The ink plate rises */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 660,
          width: 1080,
          height: 1260,
          backgroundColor: "#0B0B0C",
          translate: interpolate(frame, [180, 250], ["0px 1260px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Interactive.Div
          name="Statement line 1"
          from={280}
          style={{ position: "absolute", left: 88, top: 132, width: 904, height: 126, overflow: "hidden" }}
        >
          <span
            style={{
              display: "block",
              color: "#F2F0EB",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              translate: interpolate(frame, [300, 340], ["-100% 0px", "0% 0px"], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Skill に従って、
          </span>
        </Interactive.Div>

        <div
          style={{
            position: "absolute",
            left: 88,
            top: 268,
            width: 24,
            height: 108,
            backgroundColor: "#1F3BFF",
            scale: interpolate(frame, [400, 440], [0, 1], {
              easing: Easing.bezier(0.2, 0, 0, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <Interactive.Div
          name="Statement line 2"
          style={{ position: "absolute", left: 132, top: 254, width: 860, height: 126, overflow: "hidden" }}
        >
          <span
            style={{
              display: "block",
              color: "#F2F0EB",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              translate: interpolate(frame, [380, 420], ["-100% 0px", "0% 0px"], {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            動画をつくる。
          </span>
        </Interactive.Div>

        <Interactive.Div
          name="Colophon"
          from={880}
          style={{
            position: "absolute",
            left: 88,
            top: 590,
            width: 904,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: "0.16em",
            color: "rgba(242, 240, 235, 0.55)",
          }}
        >
          MOTION SKILL EXPLAINER · 1080 × 1920 · 60 FPS · 10800 FRAMES
        </Interactive.Div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 420,
            height: 8,
            backgroundColor: "#1F3BFF",
            width: interpolate(frame, [470, 540], [0, 1080], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        <Interactive.Div
          name="Render on request"
          from={560}
          style={{
            position: "absolute",
            left: 88,
            top: 476,
            width: 904,
            color: "#F2F0EB",
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.45,
          }}
        >
          書き出しは、依頼があったときだけ。
        </Interactive.Div>

        <Interactive.Div
          name="Footer mono"
          from={640}
          style={{
            position: "absolute",
            left: 88,
            top: 940,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "rgba(242, 240, 235, 0.6)",
          }}
        >
          <span style={{ width: 16, height: 16, backgroundColor: "#1F3BFF" }} />
          FRAME-DRIVEN · REACT · REMOTION
        </Interactive.Div>
        <Interactive.Div
          name="End mark"
          from={680}
          style={{
            position: "absolute",
            right: 88,
            top: 940,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#F2F0EB",
          }}
        >
          END
          <span style={{ width: 16, height: 16, backgroundColor: "#1F3BFF" }} />
        </Interactive.Div>
      </div>

      {/* Closing punctuation */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 18,
          backgroundColor: "#1F3BFF",
          width: interpolate(frame, [1100, 1180], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
