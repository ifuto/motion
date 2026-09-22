import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 08 — Going deeper (1200 frames / 20 s)
 *
 * A contact sheet of the neighbouring skills. SKILL.md stays the single
 * entrance; everything else is pulled in only when the task needs it.
 */

const SKILLS = [
  { name: "Maps", jp: "地図と3D空間" },
  { name: "Multimedia", jp: "動画・音声の合成" },
  { name: "Captions", jp: "字幕の生成" },
  { name: "Interactivity", jp: "操作できるUI" },
  { name: "Rendering", jp: "書き出しの最適化" },
  { name: "Studio", jp: "プレビュー環境" },
  { name: "Upgrade", jp: "バージョン更新" },
] as const;

const COLUMN_X = [88, 552];
const ROW_Y = [860, 1074, 1288, 1502];

export const MoreSkills: React.FC = () => {
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
        SECTION 08 / 09
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
        08
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
          さらに深く
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
        必要に応じて、スキルをロードする
      </Interactive.Div>

      {/* The single entrance */}
      <Interactive.Div
        name="SKILL.md plate"
        from={60}
        style={{
          position: "absolute",
          left: 88,
          top: 560,
          width: 904,
          height: 132,
          backgroundColor: "#0B0B0C",
          color: "#F2F0EB",
          display: "flex",
          alignItems: "center",
          paddingLeft: 30,
          boxSizing: "border-box",
          gap: 26,
          overflow: "hidden",
          scale: interpolate(frame, [60, 84], [0.96, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ width: 14, height: 76, backgroundColor: "#1F3BFF" }} />
        <span
          style={{
            display: "block",
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "0.06em",
            translate: interpolate(frame, [72, 110], ["-40px 0px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          SKILL.md
        </span>
        <span
          style={{
            display: "block",
            fontSize: 30,
            fontWeight: 500,
            color: "rgba(242, 240, 235, 0.7)",
            opacity: interpolate(frame, [96, 116], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ← タスクに応じて振り分ける入口
        </span>
      </Interactive.Div>

      {/* Contact sheet of neighbouring skills */}
      {SKILLS.map((skill, index) => (
        <Interactive.Div
          key={skill.name}
          name={skill.name}
          from={140 + index * 10}
          durationInFrames={1200}
          style={{
            position: "absolute",
            left: COLUMN_X[index % 2],
            top: ROW_Y[Math.floor(index / 2)],
            width: 440,
            height: 190,
            border: "2px solid #0B0B0C",
            padding: 24,
            boxSizing: "border-box",
            scale: interpolate(frame, [140 + index * 10, 166 + index * 10], [0.94, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1F3BFF",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              display: "block",
              marginTop: 10,
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {skill.name}
          </span>
          <span
            style={{
              display: "block",
              marginTop: 8,
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(11, 11, 12, 0.6)",
            }}
          >
            {skill.jp}
          </span>
        </Interactive.Div>
      ))}

      {/* Closing tile, printed in blue */}
      <Interactive.Div
        name="Closing tile"
        from={470}
        style={{
          position: "absolute",
          left: 552,
          top: 1502,
          width: 440,
          height: 190,
          backgroundColor: "#1F3BFF",
          color: "#F2F0EB",
          padding: 24,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-end",
          fontSize: 30,
          fontWeight: 700,
          lineHeight: 1.35,
          overflow: "hidden",
          scale: interpolate(frame, [470, 500], [0.94, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span
          style={{
            display: "block",
            translate: interpolate(frame, [486, 520], ["0px 40px", "0px 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          必要なときだけ、
          <br />
          必要なものを。
        </span>
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1740,
          height: 10,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [900, 980], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
