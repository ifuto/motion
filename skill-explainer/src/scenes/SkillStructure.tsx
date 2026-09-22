import { AbsoluteFill, Easing, Interactive, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 03 — Structure of the skill (1320 frames / 22 s)
 *
 * Six task folders, then a hard-stepped blue cursor that visits each one to
 * show that only the reference that is needed gets loaded.
 */

const FOLDERS = [
  { name: "remotion-create", jp: "プロジェクト作成" },
  { name: "remotion-markup", jp: "マークアップと演出" },
  { name: "remotion-render", jp: "書き出し" },
  { name: "remotion-studio", jp: "プレビュー環境" },
  { name: "remotion-docs", jp: "ドキュメント参照" },
  { name: "remotion-upgrade", jp: "バージョン更新" },
] as const;

const COLUMN_X = [88, 552];
const ROW_Y = [700, 934, 1168];

export const SkillStructure: React.FC = () => {
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
        SECTION 03 / 09
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
        03
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
          スキルの構造
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
        必要なファイルだけを、
        <br />
        必要なときに読み込む
      </Interactive.Div>

      {/* Stamp */}
      <Interactive.Div
        name="Stamp"
        from={210}
        style={{
          position: "absolute",
          left: 694,
          top: 486,
          width: 298,
          height: 108,
          border: "4px solid #1F3BFF",
          color: "#1F3BFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.18em",
          rotate: interpolate(frame, [210, 240], ["-9deg", "-4deg"], {
            easing: Easing.spring({ damping: 200 }),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [210, 232], [0.86, 1], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        ON DEMAND
      </Interactive.Div>

      {/* Folder grid */}
      {FOLDERS.map((folder, index) => {
        const x = COLUMN_X[index % 2];
        const y = ROW_Y[Math.floor(index / 2)];
        const stepStart = 210 + index * 84;

        return (
          <Interactive.Div
            key={folder.name}
            name={folder.name}
            from={60 + index * 8}
            durationInFrames={1320}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 440,
              height: 210,
              border: "2px solid #0B0B0C",
              backgroundColor:
                index === FOLDERS.length - 1
                  ? interpolateColors(frame, [0, stepStart, stepStart + 8], [
                      "rgba(11, 11, 12, 0)",
                      "rgba(11, 11, 12, 0)",
                      "#0B0B0C",
                    ])
                  : interpolateColors(
                      frame,
                      [0, stepStart, stepStart + 8, stepStart + 72, stepStart + 80],
                      [
                        "rgba(11, 11, 12, 0)",
                        "rgba(11, 11, 12, 0)",
                        "#0B0B0C",
                        "#0B0B0C",
                        "rgba(11, 11, 12, 0)",
                      ],
                    ),
              padding: 26,
              boxSizing: "border-box",
              scale: interpolate(frame, [60 + index * 8, 82 + index * 8], [0.94, 1], {
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
                marginTop: 12,
                fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color:
                  index === FOLDERS.length - 1
                    ? interpolateColors(frame, [0, stepStart, stepStart + 8], ["#0B0B0C", "#0B0B0C", "#F2F0EB"])
                    : interpolateColors(
                        frame,
                        [0, stepStart, stepStart + 8, stepStart + 72, stepStart + 80],
                        ["#0B0B0C", "#0B0B0C", "#F2F0EB", "#F2F0EB", "#0B0B0C"],
                      ),
              }}
            >
              {folder.name}
            </span>
            <span
              style={{
                display: "block",
                marginTop: 10,
                fontSize: 26,
                fontWeight: 500,
                color:
                  index === FOLDERS.length - 1
                    ? interpolateColors(frame, [0, stepStart, stepStart + 8], [
                        "rgba(11, 11, 12, 0.6)",
                        "rgba(11, 11, 12, 0.6)",
                        "rgba(242, 240, 235, 0.7)",
                      ])
                    : interpolateColors(
                        frame,
                        [0, stepStart, stepStart + 8, stepStart + 72, stepStart + 80],
                        [
                          "rgba(11, 11, 12, 0.6)",
                          "rgba(11, 11, 12, 0.6)",
                          "rgba(242, 240, 235, 0.7)",
                          "rgba(242, 240, 235, 0.7)",
                          "rgba(11, 11, 12, 0.6)",
                        ],
                      ),
              }}
            >
              {folder.jp}
            </span>
          </Interactive.Div>
        );
      })}

      {/* Hard-stepped cursor that visits every folder */}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: 690,
          width: 440,
          height: 10,
          backgroundColor: "#1F3BFF",
          translate: interpolate(
            frame,
            [180, 264, 348, 432, 516, 600],
            ["0px 0px", "464px 0px", "0px 234px", "464px 234px", "0px 468px", "464px 468px"],
            {
              easing: Easing.step1,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      />

      {/* Caption that swaps with the cursor */}
      {FOLDERS.map((folder, index) => (
        <Interactive.Div
          key={folder.name}
          name="Cursor caption"
          from={180 + index * 84}
          durationInFrames={84}
          style={{
            position: "absolute",
            left: 88,
            top: 1420,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ width: 22, height: 22, backgroundColor: "#1F3BFF" }} />
          {folder.name}
          <span style={{ color: "rgba(11, 11, 12, 0.55)" }}>を読み込む</span>
        </Interactive.Div>
      ))}

      {/* Closing band */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1520,
          width: 1080,
          height: 200,
          backgroundColor: "#0B0B0C",
          translate: interpolate(frame, [690, 750], ["0px 400px", "0px 0px"], {
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
          top: 1520,
          width: 22,
          height: 200,
          backgroundColor: "#1F3BFF",
          translate: interpolate(frame, [690, 750], ["0px 400px", "0px 0px"], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Band statement"
        from={760}
        style={{
          position: "absolute",
          left: 88,
          top: 1572,
          width: 904,
          color: "#F2F0EB",
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        タスク別に、リファレンスをロードする
      </Interactive.Div>
      <Interactive.Div
        name="Band label"
        from={760}
        style={{
          position: "absolute",
          right: 88,
          top: 1576,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#1F3BFF",
        }}
      >
        LOAD → READ → APPLY
      </Interactive.Div>
    </AbsoluteFill>
  );
};
