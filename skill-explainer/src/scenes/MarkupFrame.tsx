import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 05 — Frame-driven markup (1440 frames / 24 s)
 *
 * The browser's own animation engine is useless for rendering, so every value
 * is read from the current frame. A blue square snaps along a track to show
 * what a per-frame value looks like.
 */

const CODE_LINES = [
  "const frame = useCurrentFrame();",
  "const opacity = interpolate(frame, [0, 30], [0, 1]);",
  "const x = interpolate(frame, [0, 60], [0, 400]);",
] as const;

const TICK_X = [0, 181, 362, 543, 724, 904];
const TICK_LABEL = ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"];

export const MarkupFrame: React.FC = () => {
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
        SECTION 05 / 09
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
        05
      </Interactive.Div>

      <Interactive.Div
        name="Headline"
        style={{ position: "absolute", left: 232, top: 216, width: 760, height: 150, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
            translate: interpolate(frame, [8, 34], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          フレーム駆動で描く
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Lead"
        style={{
          position: "absolute",
          left: 88,
          top: 384,
          width: 904,
          fontSize: 46,
          fontWeight: 500,
          lineHeight: 1.45,
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
        アニメーションは、すべて
        <br />
        <span style={{ color: "#1F3BFF" }}>「フレームの関数」</span>
        として書く
      </Interactive.Div>

      {/* Code block */}
      <Interactive.Div
        name="Code block"
        style={{
          position: "absolute",
          left: 88,
          top: 620,
          width: 904,
          height: 292,
          backgroundColor: "#0B0B0C",
          padding: 34,
          boxSizing: "border-box",
          display: "flex",
          gap: 26,
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#1F3BFF",
            opacity: interpolate(frame, [70, 84], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span>01</span>
          <span>02</span>
          <span>03</span>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 18, width: 780, overflow: "hidden" }}>
          {CODE_LINES.map((line, index) => (
            <span key={line} style={{ display: "block", height: 34, overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  whiteSpace: "nowrap",
                  fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
                  fontSize: 27,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "#F2F0EB",
                  translate: interpolate(frame, [86 + index * 34, 124 + index * 34], ["-100% 0px", "0% 0px"], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </span>
      </Interactive.Div>

      {/* Track: the value snaps to a new number every second */}
      <Interactive.Div
        name="Track label"
        style={{
          position: "absolute",
          left: 88,
          top: 930,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#1F3BFF",
          opacity: interpolate(frame, [600, 620], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        USECURRENTFRAME() + INTERPOLATE()
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 1064,
          height: 8,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [620, 700], [0, 904], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      {TICK_X.map((x, index) => (
        <span
          key={x}
          style={{
            position: "absolute",
            left: 88 + x - 2,
            top: 1064,
            width: 4,
            height: 40,
            backgroundColor: "rgba(11, 11, 12, 0.45)",
            opacity: interpolate(frame, [640 + index * 6, 654 + index * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}
      {TICK_LABEL.map((label, index) => (
        <span
          key={label}
          style={{
            position: "absolute",
            left: 88 + TICK_X[index] - 24,
            top: 1120,
            width: 60,
            textAlign: "center",
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(11, 11, 12, 0.55)",
            opacity: interpolate(frame, [652 + index * 6, 666 + index * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {label}
        </span>
      ))}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 1010,
          width: 68,
          height: 68,
          backgroundColor: "#1F3BFF",
          translate: interpolate(
            frame,
            [740, 800, 860, 920, 980, 1040],
            ["0px 0px", "181px 0px", "362px 0px", "543px 0px", "724px 0px", "904px 0px"],
            { easing: Easing.step1, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          opacity: interpolate(frame, [700, 730], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* The wrong way */}
      <Interactive.Div
        name="CSS animation strike"
        from={1120}
        style={{
          position: "absolute",
          left: 88,
          top: 1260,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <span
          style={{
            width: 96,
            height: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0B0B0C",
            color: "#F2F0EB",
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          NG
        </span>
        <span>
          <span style={{ position: "relative", display: "block" }}>
            <span style={{ display: "block", fontSize: 60, fontWeight: 900, letterSpacing: "-0.02em" }}>
              CSS animation / transition
            </span>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 40,
                height: 8,
                backgroundColor: "#0B0B0C",
                width: interpolate(frame, [1200, 1280], [0, 636], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            />
          </span>
          <span
            style={{
              display: "block",
              marginTop: 22,
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(11, 11, 12, 0.6)",
              opacity: interpolate(frame, [1230, 1248], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            レンダー結果に反映されない
          </span>
        </span>
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1700,
          height: 10,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [1320, 1400], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
