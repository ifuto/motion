import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

// Colors are tuned for the dark code card (#0F172A background).
const CODE_LINES: { text: string; color: string }[] = [
  { text: "const frame = useCurrentFrame();", color: "#F8FAFC" },
  { text: "", color: "#F8FAFC" },
  { text: "return (", color: "#94A3B8" },
  { text: "  <div style={{", color: "#94A3B8" },
  { text: "    opacity: interpolate(", color: "#C4B5FD" },
  { text: "      frame, [0, 30], [0, 1],", color: "#93C5FD" },
  { text: "    ),", color: "#C4B5FD" },
  { text: "  }} />", color: "#94A3B8" },
  { text: ");", color: "#94A3B8" },
];

/**
 * 4200 – 5640 (24s): animations must be frame-driven.
 * One focal point: the frame-driven code pattern vs. CSS animation.
 */
export const MarkupFrame: React.FC = () => {
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

  const codeScale = interpolate(frame, [80, 126], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    output: "perceptual-scale",
  });
  const codeOpacity = interpolate(frame, [80, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bad card: slides in, then shakes off.
  const badOpacity = interpolate(frame, [640, 676], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badTranslate = interpolate(
    frame,
    [640, 690],
    ["0px -60px", "0px 0px"],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );
  const shakeDecay = interpolate(frame, [700, 820], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badRotate = `${Math.sin(frame / 2.2) * 5 * shakeDecay}deg`;

  // Good card: confident slide-in after the bad one.
  const goodOpacity = interpolate(frame, [860, 896], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const goodTranslate = interpolate(
    frame,
    [860, 910],
    ["0px 60px", "0px 0px"],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );
  const goodScale = interpolate(frame, [860, 920], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });

  const captionOpacity = interpolate(frame, [1080, 1130], [0, 1], {
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
          useCurrentFrame() + interpolate()
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          フレーム駆動で描く
        </div>
      </div>

      {/* Code card */}
      <div
        style={{
          marginTop: 56,
          opacity: codeOpacity,
          scale: `${codeScale}`,
          backgroundColor: "#0F172A",
          borderRadius: 32,
          padding: "52px 48px",
          boxShadow: "0 28px 70px rgba(15, 23, 42, 0.3)",
          minHeight: 560,
        }}
      >
        {CODE_LINES.map((line, i) => {
          const start = 120 + i * 26;
          const lineOpacity = interpolate(frame, [start, start + 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: lineOpacity,
                fontFamily: MONO,
                fontSize: 40,
                lineHeight: 1.7,
                fontWeight: i === 4 || i === 5 ? 700 : 400,
                color: line.color,
                whiteSpace: "pre",
              }}
            >
              {line.text || " "}
            </div>
          );
        })}
      </div>

      {/* Bad pattern */}
      <div
        style={{
          marginTop: 56,
          opacity: badOpacity,
          translate: badTranslate,
          rotate: badRotate,
          backgroundColor: COLORS.badSoft,
          border: `3px solid ${COLORS.bad}`,
          borderRadius: 28,
          padding: "40px 44px",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            backgroundColor: COLORS.bad,
            color: "#FFFFFF",
            fontSize: 56,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ×
        </div>
        <div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: COLORS.bad,
              lineHeight: 1.3,
            }}
          >
            CSS animation / transition
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.sub,
            }}
          >
            レンダー結果に反映されない
          </div>
        </div>
      </div>

      {/* Good pattern */}
      <div
        style={{
          marginTop: 36,
          opacity: goodOpacity,
          translate: goodTranslate,
          scale: `${goodScale}`,
          backgroundColor: COLORS.goodSoft,
          border: `3px solid ${COLORS.good}`,
          borderRadius: 28,
          padding: "40px 44px",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            backgroundColor: COLORS.good,
            color: "#FFFFFF",
            fontSize: 52,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ✓
        </div>
        <div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: COLORS.good,
              lineHeight: 1.3,
            }}
          >
            useCurrentFrame()
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.sub,
            }}
          >
            フレーム番号から値を補間する
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 48,
          opacity: captionOpacity,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        アニメーションは、すべて
        <br />
        「フレームの関数」として書く
      </div>
    </AbsoluteFill>
  );
};
