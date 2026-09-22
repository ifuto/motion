import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 01 — Opening (540 frames / 9 s)
 *
 * A blue plate drops over the sheet, lifts away, and the title is revealed
 * left-to-right by two hard wipes. Every value is an inline interpolate().
 */
export const Opening: React.FC = () => {
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

      {/* Folio: running head + spec */}
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
          opacity: interpolate(frame, [44, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
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
          opacity: interpolate(frame, [44, 56], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        1080 × 1920 / 60 FPS
      </Interactive.Div>
      <div style={{ position: "absolute", left: 0, top: 168, width: 1080, height: 2, backgroundColor: "#0B0B0C" }} />

      {/* Title: two lines, each wiped in from the left by a clipping window */}
      <Interactive.Div
        name="Title line 1"
        style={{ position: "absolute", left: 88, top: 300, width: 904, height: 132, overflow: "hidden" }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 30,
            translate: interpolate(frame, [50, 78], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span style={{ fontSize: 124, fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.9 }}>Remotion</span>
          <span style={{ width: 62, height: 62, backgroundColor: "#0B0B0C" }} />
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Title line 2"
        style={{ position: "absolute", left: 88, top: 440, width: 904, height: 118, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            color: "#1F3BFF",
            fontSize: 124,
            fontWeight: 900,
            letterSpacing: "-0.045em",
            lineHeight: 0.9,
            translate: interpolate(frame, [66, 94], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Agent Skill
        </span>
      </Interactive.Div>

      {/* Section rule grows in from the left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 618,
          height: 8,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [82, 118], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Lead"
        style={{
          position: "absolute",
          left: 88,
          top: 690,
          display: "flex",
          alignItems: "stretch",
          gap: 26,
          height: 150,
          opacity: interpolate(frame, [100, 114], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [100, 124], ["-40px 0px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ width: 10, backgroundColor: "#1F3BFF" }} />
        <span>
          <span style={{ display: "block", fontSize: 46, fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.35 }}>
            エージェントのための動画制作ガイド
          </span>
          <span
            style={{
              display: "block",
              marginTop: 16,
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(11, 11, 12, 0.55)",
            }}
          >
            MULTI-SCENE EXPLAINER · SKILL V4.0.526
          </span>
        </span>
      </Interactive.Div>

      {/* Contents, printed like a table of contents */}
      <Interactive.Div name="Contents" style={{ position: "absolute", left: 88, top: 1010, display: "flex", gap: 20 }}>
        <span
          style={{
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#1F3BFF",
            width: 132,
            paddingTop: 9,
          }}
        >
          CONTENTS
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {["02 REPOSITORY", "03 STRUCTURE", "04 WORKFLOW", "05 MARKUP", "06 LAYOUT"].map((entry, index) => (
            <span
              key={entry}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(11, 11, 12, 0.62)",
                opacity: interpolate(frame, [126 + index * 8, 138 + index * 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(frame, [126 + index * 8, 152 + index * 8], ["-24px 0px", "0px 0px"], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span style={{ width: 22, height: 22, backgroundColor: "#1F3BFF" }} />
              {entry}
            </span>
          ))}
        </span>
      </Interactive.Div>

      {/* Blue plate, bleeding off the right edge */}
      <Interactive.Div
        name="Spec plate"
        style={{
          position: "absolute",
          left: 840,
          top: 1180,
          width: 320,
          height: 320,
          backgroundColor: "#1F3BFF",
          color: "#F2F0EB",
          padding: 30,
          boxSizing: "border-box",
          scale: interpolate(frame, [180, 198], [0.82, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: interpolate(frame, [180, 202], ["-5deg", "0deg"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ display: "block", fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace', fontSize: 86, fontWeight: 700, lineHeight: 1 }}>
          180
        </span>
        <span style={{ display: "block", height: 4, backgroundColor: "#F2F0EB", marginTop: 10, width: 120 }} />
        <span
          style={{
            display: "block",
            marginTop: 14,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.2em",
          }}
        >
          SECONDS
        </span>
        <span
          style={{
            display: "block",
            marginTop: 12,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.2em",
            opacity: 0.75,
          }}
        >
          9 SCENES
        </span>
      </Interactive.Div>

      {/* Footer rule + labels */}
      <div style={{ position: "absolute", left: 0, top: 1620, width: 1080, height: 2, backgroundColor: "#0B0B0C" }} />
      <Interactive.Div
        name="Footer left"
        style={{
          position: "absolute",
          left: 88,
          top: 1656,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.18em",
          opacity: interpolate(frame, [206, 220], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [206, 230], ["0px 26px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        2D MOTION EXPLAINER
      </Interactive.Div>
      <Interactive.Div
        name="Footer right"
        style={{
          position: "absolute",
          right: 88,
          top: 1656,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#1F3BFF",
          opacity: interpolate(frame, [214, 228], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [214, 238], ["0px 26px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        AGENTS · REACT · FRAMES
      </Interactive.Div>

      {/* Closing punctuation of the page */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 18,
          backgroundColor: "#1F3BFF",
          width: interpolate(frame, [420, 496], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* The blue curtain that opens the film */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "#1F3BFF",
          translate: interpolate(frame, [0, 20, 40, 60], ["0px 1920px", "0px 0px", "0px 0px", "0px -1920px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
