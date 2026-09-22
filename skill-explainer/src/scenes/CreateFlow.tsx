import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

type Step = {
  title: string;
  code: string;
  note?: string;
};

const STEPS: Step[] = [
  { title: "プロジェクトを作成", code: "npx create-video" },
  { title: "Composition を書く", code: "React + interpolate()" },
  { title: "Studio でプレビュー", code: "npx remotion studio" },
  {
    title: "書き出し（依頼時のみ）",
    code: "npx remotion render",
    note: "明示的な依頼があったら",
  },
];

const STEP_STARTS = [140, 400, 660, 920];
const RAIL_TOP = 500;
const RAIL_BOTTOM = 1620;
const STEP_GAP = 300;

/**
 * 2760 – 4200 (24s): the four-step production flow.
 * One focal point: the vertical stepper progressing top to bottom.
 */
export const CreateFlow: React.FC = () => {
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

  const railGrow = interpolate(frame, [140, 1160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
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
          WORKFLOW
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          動画づくりの流れ
        </div>
      </div>

      {/* Vertical rail */}
      <div
        style={{
          position: "absolute",
          left: 148,
          top: RAIL_TOP,
          width: 6,
          height: RAIL_BOTTOM - RAIL_TOP,
          backgroundColor: COLORS.line,
          borderRadius: 999,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 148,
          top: RAIL_TOP,
          width: 6,
          height: RAIL_BOTTOM - RAIL_TOP,
          borderRadius: 999,
          background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.violet})`,
          scale: `1 ${railGrow}`,
          transformOrigin: "top",
        }}
      />

      {STEPS.map((step, i) => {
        const start = STEP_STARTS[i];
        const y = RAIL_TOP + i * STEP_GAP;

        const circleScale = interpolate(frame, [start, start + 44], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          output: "perceptual-scale",
        });
        const textOpacity = interpolate(
          frame,
          [start + 14, start + 48],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const textTranslate = interpolate(
          frame,
          [start + 14, start + 48],
          ["0px 30px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          },
        );
        const chipOpacity = interpolate(
          frame,
          [start + 40, start + 74],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const isLast = i === STEPS.length - 1;
        const pulse = isLast
          ? 0.5 + 0.5 * Math.sin((frame - start) / 14)
          : 0;

        return (
          <div key={step.title}>
            {/* Number circle */}
            <div
              style={{
                position: "absolute",
                left: 100,
                top: y - 52,
                width: 104,
                height: 104,
                borderRadius: "50%",
                backgroundColor: isLast ? COLORS.violet : COLORS.accent,
                color: "#FFFFFF",
                fontSize: 52,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: `${circleScale}`,
                boxShadow: isLast
                  ? `0 0 0 ${10 + pulse * 14}px rgba(124, 58, 237, ${0.14 * pulse})`
                  : "0 12px 30px rgba(37, 99, 235, 0.35)",
                zIndex: 2,
              }}
            >
              {i + 1}
            </div>

            {/* Text block */}
            <div
              style={{
                position: "absolute",
                left: 250,
                top: y - 70,
                width: 740,
                opacity: textOpacity,
                translate: textTranslate,
              }}
            >
              <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.3 }}>
                {step.title}
              </div>
              <div
                style={{
                  marginTop: 18,
                  opacity: chipOpacity,
                  display: "inline-block",
                  fontFamily: MONO,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.accent,
                  backgroundColor: COLORS.accentSoft,
                  borderRadius: 16,
                  padding: "16px 26px",
                }}
              >
                {step.code}
              </div>
              {step.note ? (
                <div
                  style={{
                    marginTop: 18,
                    marginLeft: 16,
                    opacity: chipOpacity,
                    display: "inline-block",
                    fontSize: 34,
                    fontWeight: 700,
                    color: COLORS.amber,
                    backgroundColor: COLORS.amberSoft,
                    borderRadius: 16,
                    padding: "16px 26px",
                    verticalAlign: "middle",
                  }}
                >
                  ⚠ {step.note}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
