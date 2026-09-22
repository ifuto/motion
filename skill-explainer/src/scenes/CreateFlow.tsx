import { AbsoluteFill, Easing, Interactive, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 04 — The workflow (1440 frames / 24 s)
 *
 * Four steps on a printed vertical spine. Step 04 only ever happens when
 * somebody actually asks for a render, so it is drawn as a dashed outline
 * until the request arrives.
 */

const STEPS = [
  { title: "プロジェクトを作成", command: "$ npx create-video", note: "雛形と設定を一式つくる" },
  { title: "Composition を書く", command: "$ React + interpolate()", note: "シーンをコンポーネントで組む" },
  { title: "Studio でプレビュー", command: "$ npx remotion studio", note: "ブラウザで確認しながら調整する" },
  { title: "書き出し", command: "$ npx remotion render", note: "明示的な依頼があったら実行する" },
] as const;

const STEP_Y = [600, 860, 1120, 1380];

export const CreateFlow: React.FC = () => {
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
        SECTION 04 / 09
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
        04
      </Interactive.Div>

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
          動画づくりの流れ
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Lead"
        style={{
          position: "absolute",
          left: 88,
          top: 372,
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
        エージェントは、この順番で動画をつくる
      </Interactive.Div>

      {/* The spine */}
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 620,
          width: 8,
          backgroundColor: "#0B0B0C",
          height: interpolate(frame, [40, 130], [0, 804], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {STEPS.map((step, index) => (
        <Interactive.Div
          key={step.title}
          name={step.title}
          from={70 + index * 45}
          durationInFrames={1440}
          style={{
            position: "absolute",
            left: 88,
            top: STEP_Y[index],
            width: 904,
            height: 220,
            translate: interpolate(frame, [70 + index * 45, 106 + index * 45], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Badge */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 88,
              height: 88,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 40,
              fontWeight: 700,
              color: index === 3 ? "#1F3BFF" : "#F2F0EB",
              backgroundColor: index === 3 ? "#F2F0EB" : "#1F3BFF",
              border: index === 3 ? "4px solid #1F3BFF" : "none",
              boxSizing: "border-box",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            style={{
              position: "absolute",
              left: 128,
              top: 6,
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {step.title}
          </span>

          {/* Hard blue shadow, then the terminal block */}
          <span
            style={{
              position: "absolute",
              left: 136,
              top: 102,
              width: 720,
              height: 92,
              backgroundColor: "#1F3BFF",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 128,
              top: 94,
              width: 720,
              height: 92,
              display: "flex",
              alignItems: "center",
              paddingLeft: 28,
              boxSizing: "border-box",
              backgroundColor:
                index === 3
                  ? interpolateColors(frame, [0, 1210, 1240], ["#F2F0EB", "#F2F0EB", "#1F3BFF"])
                  : "#0B0B0C",
              border: index === 3 ? "4px solid #0B0B0C" : "none",
              color:
                index === 3
                  ? interpolateColors(frame, [0, 1210, 1240], ["#0B0B0C", "#0B0B0C", "#F2F0EB"])
                  : "#F2F0EB",
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: "-0.01em",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "block",
                whiteSpace: "nowrap",
                translate: interpolate(frame, [96 + index * 45, 132 + index * 45], ["-100% 0px", "0% 0px"], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {step.command}
            </span>
          </span>

          <span
            style={{
              position: "absolute",
              left: 128,
              top: 204,
              fontSize: 26,
              fontWeight: 500,
              color: "rgba(11, 11, 12, 0.6)",
              opacity: interpolate(frame, [116 + index * 45, 130 + index * 45], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {step.note}
          </span>

          {index === 3 ? (
            <span
              style={{
                position: "absolute",
                left: 380,
                top: 6,
                display: "flex",
                alignItems: "center",
                height: 48,
                width: 236,
                justifyContent: "center",
                backgroundColor: "#1F3BFF",
                color: "#F2F0EB",
                fontFamily: '"Noto Sans JP", sans-serif',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.04em",
                opacity: interpolate(frame, [1150, 1180], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [1150, 1180], [0.9, 1], {
                  easing: Easing.bezier(0.2, 0, 0, 1),
                  output: "perceptual-scale",
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              依頼時のみ
            </span>
          ) : null}
        </Interactive.Div>
      ))}

      {/* Closing rule */}
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
