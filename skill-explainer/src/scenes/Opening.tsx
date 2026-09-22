import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

/**
 * 0 – 480 (8s): title card.
 * One focal point: the name of the skill.
 */
export const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  const pillOpacity = interpolate(frame, [24, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillTranslate = interpolate(frame, [24, 52], ["0px 24px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const l1Opacity = interpolate(frame, [56, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l1Translate = interpolate(frame, [56, 88], ["0px 48px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const l2Opacity = interpolate(frame, [78, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l2Translate = interpolate(frame, [78, 110], ["0px 48px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const barScale = interpolate(frame, [118, 158], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });

  const subOpacity = interpolate(frame, [150, 186], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subTranslate = interpolate(frame, [150, 186], ["0px 32px", "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const metaOpacity = interpolate(frame, [196, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 96px",
      }}
    >
      <div
        style={{
          opacity: pillOpacity,
          translate: pillTranslate,
          fontFamily: MONO,
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: 6,
          color: COLORS.accent,
          backgroundColor: COLORS.accentSoft,
          borderRadius: 999,
          padding: "18px 44px",
        }}
      >
        ifuto / motion
      </div>

      <div
        style={{
          marginTop: 64,
          fontSize: 118,
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: -2,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: l1Opacity,
            translate: l1Translate,
          }}
        >
          Remotion
        </div>
        <div
          style={{
            opacity: l2Opacity,
            translate: l2Translate,
            color: COLORS.accent,
          }}
        >
          Agent Skill
        </div>
      </div>

      <div
        style={{
          marginTop: 56,
          width: 180,
          height: 12,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.violet})`,
          scale: `${barScale} 1`,
        }}
      />

      <div
        style={{
          marginTop: 56,
          opacity: subOpacity,
          translate: subTranslate,
          fontSize: 50,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        エージェントのための
        <br />
        動画制作ガイド
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 130,
          opacity: metaOpacity,
          fontFamily: MONO,
          fontSize: 34,
          color: COLORS.sub,
          letterSpacing: 2,
        }}
      >
        2D Motion Explainer · 1080×1920 · 60fps
      </div>
    </AbsoluteFill>
  );
};
