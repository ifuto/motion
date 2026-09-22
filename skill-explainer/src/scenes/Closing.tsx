import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

/**
 * 9600 – 10800 (20s): closing.
 * One focal point: the call to action + repository pointer.
 */
export const Closing: React.FC = () => {
  const frame = useCurrentFrame();

  const l1Opacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l1Translate = interpolate(frame, [60, 100], ["0px 44px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const l2Opacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l2Translate = interpolate(frame, [100, 140], ["0px 44px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const barScale = interpolate(frame, [170, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });

  const cardOpacity = interpolate(frame, [250, 295], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardTranslate = interpolate(
    frame,
    [250, 305],
    ["0px 50px", "0px 0px"],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );
  const cardScale = interpolate(frame, [250, 310], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    output: "perceptual-scale",
  });

  const footOpacity = interpolate(frame, [520, 570], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 0.6 + 0.4 * Math.sin(frame / 20);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 96px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.35,
            opacity: l1Opacity,
            translate: l1Translate,
          }}
        >
          Skill に従って、
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.35,
            color: COLORS.accent,
            opacity: l2Opacity,
            translate: l2Translate,
          }}
        >
          動画をつくる。
        </div>

        <div
          style={{
            margin: "56px auto 0",
            width: 200,
            height: 12,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.violet})`,
            scale: `${barScale} 1`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 80,
          width: "100%",
          opacity: cardOpacity,
          translate: cardTranslate,
          scale: `${cardScale}`,
          backgroundColor: COLORS.card,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 32,
          boxShadow: "0 28px 70px rgba(15, 23, 42, 0.1)",
          padding: "56px 52px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.accent,
            wordBreak: "break-all",
          }}
        >
          github.com/ifuto/motion
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: MONO,
            fontSize: 34,
            color: COLORS.sub,
            wordBreak: "break-all",
          }}
        >
          skills/remotion-best-practices
        </div>
        <div
          style={{
            marginTop: 30,
            display: "inline-block",
            fontFamily: MONO,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.violet,
            backgroundColor: COLORS.violetSoft,
            borderRadius: 999,
            padding: "12px 30px",
          }}
        >
          SKILL.md v4.0.526
        </div>
      </div>

      <div
        style={{
          marginTop: 70,
          opacity: footOpacity,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        README と SKILL.md から始めよう
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          fontFamily: MONO,
          fontSize: 32,
          color: COLORS.accent,
          opacity: pulse,
          letterSpacing: 3,
        }}
      >
        ● end
      </div>
    </AbsoluteFill>
  );
};
