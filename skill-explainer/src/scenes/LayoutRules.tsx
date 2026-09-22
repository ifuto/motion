import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

const CALLOUTS: { text: string; color: string; bg: string }[] = [
  {
    text: "セーフエリア: 左右80px・上下100px",
    color: COLORS.accent,
    bg: COLORS.accentSoft,
  },
  {
    text: "見出し ≥84px / 重要テキスト ≥44px",
    color: COLORS.violet,
    bg: COLORS.violetSoft,
  },
  {
    text: "1シーンの注目点はひとつだけ",
    color: COLORS.good,
    bg: COLORS.goodSoft,
  },
];

const MOCK = { x: 290, y: 450, w: 500, h: 889 };
// Safe-area inset scaled to the mock: 80/1080 and 100/1920 of the mock size.
const INSET_X = Math.round((80 / 1080) * MOCK.w);
const INSET_Y = Math.round((100 / 1920) * MOCK.h);

/**
 * 7080 – 8400 (22s): video-first layout rules.
 * One focal point: the phone mockup showing the safe area.
 */
export const LayoutRules: React.FC = () => {
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

  const mockScale = interpolate(frame, [80, 136], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });
  const mockOpacity = interpolate(frame, [80, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const safeOpacity = interpolate(frame, [260, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const safeDash = `${interpolate(frame, [260, 460], [1400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  })} 0`;

  const innerOpacity = interpolate(frame, [400, 450], [0, 1], {
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
          VIDEO-FIRST LAYOUT
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          動画として設計する
        </div>
      </div>

      {/* Phone mockup */}
      <div
        style={{
          position: "absolute",
          left: MOCK.x,
          top: MOCK.y,
          width: MOCK.w,
          height: MOCK.h,
          opacity: mockOpacity,
          scale: `${mockScale}`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.card,
            border: `6px solid ${COLORS.ink}`,
            borderRadius: 56,
            boxShadow: "0 32px 80px rgba(15, 23, 42, 0.16)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              translate: "-50% 0px",
              width: 180,
              height: 34,
              borderRadius: 999,
              backgroundColor: COLORS.line,
            }}
          />

          {/* Safe area (dashed) */}
          <svg
            width={MOCK.w}
            height={MOCK.h}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: safeOpacity,
            }}
          >
            <rect
              x={INSET_X}
              y={INSET_Y}
              width={MOCK.w - INSET_X * 2}
              height={MOCK.h - INSET_Y * 2}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={4}
              strokeDasharray={safeDash}
              rx={28}
            />
          </svg>

          {/* Sample content inside the safe area */}
          <div
            style={{
              position: "absolute",
              left: INSET_X + 30,
              top: INSET_Y + 60,
              right: INSET_X + 30,
              opacity: innerOpacity,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 26,
                borderRadius: 999,
                backgroundColor: COLORS.accentSoft,
                marginBottom: 36,
              }}
            />
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.25,
                color: COLORS.ink,
              }}
            >
              大きな見出し
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 34,
                fontWeight: 500,
                color: COLORS.sub,
                lineHeight: 1.5,
              }}
            >
              重要な要素はセーフエリア内に
            </div>

            {/* Fake blocks to suggest layout */}
            <div style={{ marginTop: 60, display: "flex", gap: 20 }}>
              <div
                style={{
                  flex: 1,
                  height: 200,
                  borderRadius: 24,
                  backgroundColor: COLORS.accentSoft,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 200,
                  borderRadius: 24,
                  backgroundColor: COLORS.violetSoft,
                }}
              />
            </div>
            <div
              style={{
                marginTop: 24,
                height: 120,
                borderRadius: 24,
                backgroundColor: "#EEF2F7",
              }}
            />
          </div>

          {/* Scale hint */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: MONO,
              fontSize: 28,
              color: COLORS.sub,
              opacity: innerOpacity,
            }}
          >
            1080 × 1920
          </div>
        </div>
      </div>

      {/* Dimension label next to the mock */}
      <div
        style={{
          position: "absolute",
          left: MOCK.x + MOCK.w + 24,
          top: MOCK.y + MOCK.h / 2 - 60,
          opacity: safeOpacity,
          width: 160,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.accent,
            lineHeight: 1.4,
          }}
        >
          safe
          <br />
          area
        </div>
      </div>

      {/* Callouts */}
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 1400,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {CALLOUTS.map((c, i) => {
          const start = 520 + i * 160;
          const opacity = interpolate(frame, [start, start + 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const translate = interpolate(
            frame,
            [start, start + 52],
            ["0px 44px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            },
          );
          return (
            <div
              key={c.text}
              style={{
                opacity,
                translate,
                backgroundColor: c.bg,
                color: c.color,
                borderRadius: 24,
                padding: "30px 40px",
                fontSize: 42,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 24,
                lineHeight: 1.35,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: c.color,
                  flexShrink: 0,
                }}
              />
              {c.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
