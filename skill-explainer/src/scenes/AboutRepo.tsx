import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

const TREE_LINES: { text: string; indent: number }[] = [
  { text: "motion/", indent: 0 },
  { text: "└─ skills/", indent: 0 },
  { text: "   └─ remotion-best-practices/", indent: 0 },
  { text: "      ├─ SKILL.md", indent: 0 },
  { text: "      ├─ remotion-create/", indent: 0 },
  { text: "      ├─ remotion-markup/", indent: 0 },
  { text: "      ├─ remotion-render/", indent: 0 },
  { text: "      ├─ remotion-studio/", indent: 0 },
  { text: "      └─ remotion-docs/", indent: 0 },
];

const NOTES: { text: string; color: string; bg: string }[] = [
  {
    text: "エージェント向けの制作ガイド",
    color: COLORS.accent,
    bg: COLORS.accentSoft,
  },
  {
    text: "ベストプラクティスをコードで担保",
    color: COLORS.violet,
    bg: COLORS.violetSoft,
  },
];

/**
 * 480 – 1440 (16s): what this repository is.
 * One focal point: the repository file tree.
 */
export const AboutRepo: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [30, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslate = interpolate(
    frame,
    [30, 66],
    ["0px 36px", "0px 0px"],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

  const cardScale = interpolate(frame, [80, 124], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });
  const cardOpacity = interpolate(frame, [80, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ padding: "120px 96px" }}>
      <div style={{ opacity: titleOpacity, translate: titleTranslate }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 6,
            color: COLORS.accent,
            marginBottom: 18,
          }}
        >
          ABOUT THIS REPOSITORY
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          このリポジトリ
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 46,
            fontWeight: 500,
            color: COLORS.sub,
            lineHeight: 1.55,
          }}
        >
          エージェントが Remotion で動画を
          <br />
          正しく作るための「Skill」集です。
        </div>
      </div>

      <div
        style={{
          marginTop: 64,
          opacity: cardOpacity,
          scale: `${cardScale}`,
          backgroundColor: COLORS.card,
          borderRadius: 32,
          border: `2px solid ${COLORS.line}`,
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
          padding: "56px 52px",
        }}
      >
        {TREE_LINES.map((line, i) => {
          const start = 130 + i * 34;
          const lineOpacity = interpolate(frame, [start, start + 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const lineTranslate = interpolate(
            frame,
            [start, start + 26],
            ["0px 18px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            },
          );
          const isRouter = line.text.includes("SKILL.md");
          return (
            <div
              key={line.text}
              style={{
                opacity: lineOpacity,
                translate: lineTranslate,
                fontFamily: MONO,
                fontSize: 40,
                lineHeight: 1.75,
                fontWeight: isRouter ? 700 : 400,
                color: isRouter ? COLORS.accent : COLORS.ink,
                whiteSpace: "pre",
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {NOTES.map((note, i) => {
          const start = 560 + i * 90;
          const noteOpacity = interpolate(frame, [start, start + 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const noteTranslate = interpolate(
            frame,
            [start, start + 32],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            },
          );
          return (
            <div
              key={note.text}
              style={{
                opacity: noteOpacity,
                translate: noteTranslate,
                backgroundColor: note.bg,
                color: note.color,
                borderRadius: 24,
                padding: "34px 40px",
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1.4,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: note.color,
                  flexShrink: 0,
                }}
              />
              {note.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
