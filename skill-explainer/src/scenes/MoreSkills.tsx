import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

const ITEMS: { label: string; color: string }[] = [
  { label: "Maps", color: COLORS.accent },
  { label: "Multimedia", color: COLORS.violet },
  { label: "Captions", color: COLORS.good },
  { label: "Interactivity", color: COLORS.amber },
  { label: "Rendering", color: COLORS.accent },
  { label: "SaaS", color: COLORS.violet },
  { label: "Studio", color: COLORS.good },
  { label: "Upgrade", color: COLORS.amber },
];

const COL_X = [96, 564];
const ROW_Y = [640, 860, 1080, 1300];
const CHIP_W = 420;
const CHIP_H = 150;

/**
 * 8400 – 9600 (20s): other available skills.
 * One focal point: the grid of extra skill areas popping in.
 */
export const MoreSkills: React.FC = () => {
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
  const subtitleOpacity = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [820, 870], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionTranslate = interpolate(
    frame,
    [820, 870],
    ["0px 30px", "0px 0px"],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

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
          BEYOND THE BASICS
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          さらに深く
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 46,
            fontWeight: 500,
            color: COLORS.sub,
            opacity: subtitleOpacity,
            lineHeight: 1.5,
          }}
        >
          必要に応じて、スキルをロード
        </div>
      </div>

      {ITEMS.map((item, i) => {
        const start = 160 + i * 70;
        const opacity = interpolate(frame, [start, start + 34], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translate = interpolate(
          frame,
          [start, start + 50],
          ["0px 36px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          },
        );
        const scale = interpolate(frame, [start, start + 54], [0.88, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          output: "perceptual-scale",
        });
        const rotate = interpolate(frame, [start, start + 54], ["-3deg", "0deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });

        const col = i % 2;
        const row = Math.floor(i / 2);

        return (
          <div
            key={item.label}
            style={{
              position: "absolute",
              left: COL_X[col],
              top: ROW_Y[row],
              width: CHIP_W,
              height: CHIP_H,
              opacity,
              translate,
              scale: `${scale}`,
              rotate,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.card,
                border: `3px solid ${COLORS.line}`,
                borderRadius: 28,
                display: "flex",
                alignItems: "center",
                padding: "0 36px",
                gap: 26,
                boxShadow: "0 18px 44px rgba(15, 23, 42, 0.08)",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 44,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 200,
          opacity: captionOpacity,
          translate: captionTranslate,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        SKILL.md が
        <br />
        適切なリファレンスへ振り分ける
      </div>
    </AbsoluteFill>
  );
};
