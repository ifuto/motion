import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

/**
 * Looping demo dots (period 150 frames).
 * Linear vs. spring-eased travel across the same track.
 */
const Lane: React.FC<{
  label: string;
  color: string;
  progress: number;
}> = ({ label, color, progress }) => {
  const trackW = 460;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div
        style={{
          width: 150,
          fontSize: 34,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "right",
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "relative",
          width: trackW,
          height: 14,
          borderRadius: 999,
          backgroundColor: COLORS.line,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -13,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: color,
            translate: `${progress * (trackW - 40)}px 0px`,
          }}
        />
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 30,
          color: COLORS.sub,
          width: 90,
        }}
      >
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
};

/**
 * 5640 – 7080 (24s): timing & style rules.
 * One focal point: three stacked rule cards appearing in order.
 */
export const MarkupStyle: React.FC = () => {
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

  const cardReveal = (start: number) => {
    const opacity = interpolate(frame, [start, start + 34], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const translate = interpolate(
      frame,
      [start, start + 50],
      ["0px 44px", "0px 0px"],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      },
    );
    const scale = interpolate(frame, [start, start + 50], [0.95, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
      output: "perceptual-scale",
    });
    return { opacity, translate, scale: `${scale}` };
  };

  // Demo dots: loop every 150 frames.
  const loop = frame % 150;
  const linearProgress = interpolate(loop, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const springProgress = interpolate(loop, [0, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const cardBase: React.CSSProperties = {
    backgroundColor: COLORS.card,
    border: `2px solid ${COLORS.line}`,
    borderRadius: 32,
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.07)",
    padding: "44px 48px",
  };

  const badge = (text: string, color: string, bg: string): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: MONO,
    fontSize: 34,
    fontWeight: 700,
    color,
    backgroundColor: bg,
    borderRadius: 14,
    padding: "12px 22px",
    marginRight: 16,
    marginTop: 16,
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
          TIMING & STYLE
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          タイミングと書き方
        </div>
      </div>

      {/* Card A: easing */}
      <div
        style={{
          marginTop: 64,
          ...cardReveal(60),
          ...cardBase,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.3 }}>
          イージングで質感を決める
        </div>
        <div style={{ marginTop: 6 }}>
          <span style={badge("Easing.bezier()", COLORS.accent, COLORS.accentSoft)}>
            Easing.bezier()
          </span>
          <span style={badge("Easing.spring()", COLORS.violet, COLORS.violetSoft)}>
            Easing.spring()
          </span>
        </div>
        <div
          style={{
            marginTop: 34,
            display: "flex",
            flexDirection: "column",
            gap: 34,
          }}
        >
          <Lane
            label="linear"
            color={COLORS.sub}
            progress={linearProgress}
          />
          <Lane
            label="spring"
            color={COLORS.accent}
            progress={springProgress}
          />
        </div>
      </div>

      {/* Card B: inline interpolate */}
      <div
        style={{
          marginTop: 44,
          ...cardReveal(520),
          ...cardBase,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.3 }}>
          interpolate は style にインライン
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            fontWeight: 500,
            color: COLORS.sub,
            lineHeight: 1.5,
          }}
        >
          Studio 上で値を直接触りやすい
        </div>
        <div>
          <span style={badge("style={{ … }}", COLORS.good, COLORS.goodSoft)}>
            style={"{ … }"}
          </span>
        </div>
      </div>

      {/* Card C: transform properties */}
      <div
        style={{
          marginTop: 44,
          ...cardReveal(940),
          ...cardBase,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.3 }}>
          transform 文字列は使わない
        </div>
        <div style={{ marginTop: 6 }}>
          <span style={badge("scale", COLORS.accent, COLORS.accentSoft)}>scale</span>
          <span style={badge("translate", COLORS.accent, COLORS.accentSoft)}>
            translate
          </span>
          <span style={badge("rotate", COLORS.accent, COLORS.accentSoft)}>
            rotate
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.violet,
          }}
        >
          scale には perceptual-scale を
        </div>
      </div>
    </AbsoluteFill>
  );
};
