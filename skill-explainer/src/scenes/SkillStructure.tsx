import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MONO } from "../theme";

/**
 * Hub (SKILL.md) fans out to six reference cards.
 * Positions are absolute inside a 1080×1920 frame.
 */
const HUB = { x: 140, y: 470, w: 800, h: 210 };

const CARDS: { label: string; x: number; y: number }[] = [
  { label: "remotion-create", x: 96, y: 850 },
  { label: "remotion-markup", x: 564, y: 850 },
  { label: "remotion-render", x: 96, y: 1130 },
  { label: "remotion-studio", x: 564, y: 1130 },
  { label: "remotion-docs", x: 96, y: 1410 },
  { label: "remotion-upgrade", x: 564, y: 1410 },
];

const CARD_W = 420;
const CARD_H = 160;

/**
 * 1440 – 2760 (22s): the skill is a router.
 * One focal point: SKILL.md distributing to reference files.
 */
export const SkillStructure: React.FC = () => {
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

  const hubScale = interpolate(frame, [80, 130], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    output: "perceptual-scale",
  });
  const hubOpacity = interpolate(frame, [80, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [1040, 1090], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionTranslate = interpolate(
    frame,
    [1040, 1090],
    ["0px 28px", "0px 0px"],
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
          STRUCTURE
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.2 }}>
          スキルの構造
        </div>
      </div>

      {/* Connectors: drawn from the hub to each card */}
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        {CARDS.map((card, i) => {
          const start = 320 + i * 70;
          const draw = interpolate(frame, [start, start + 50], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          });
          const fromX = HUB.x + HUB.w / 2;
          const fromY = HUB.y + HUB.h;
          const toX = card.x + CARD_W / 2;
          const toY = card.y;
          const midY = (fromY + toY) / 2;
          return (
            <path
              key={card.label}
              d={`M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={1}
              pathLength={1}
              strokeDashoffset={draw}
              opacity={0.55}
            />
          );
        })}
      </svg>

      {/* Hub card */}
      <div
        style={{
          position: "absolute",
          left: HUB.x,
          top: HUB.y,
          width: HUB.w,
          height: HUB.h,
          opacity: hubOpacity,
          scale: `${hubScale}`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.ink,
            color: "#FFFFFF",
            borderRadius: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 28px 70px rgba(15, 23, 42, 0.28)",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            SKILL.md
          </div>
          <div style={{ fontSize: 40, fontWeight: 500, opacity: 0.82 }}>
            タスク別にリファレンスをロード
          </div>
        </div>
      </div>

      {/* Reference cards */}
      {CARDS.map((card, i) => {
        const start = 320 + i * 70;
        const cardOpacity = interpolate(frame, [start, start + 34], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const cardTranslate = interpolate(
          frame,
          [start, start + 50],
          ["0px 36px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          },
        );
        const cardScale = interpolate(frame, [start, start + 50], [0.92, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.4, 0.64, 1),
          output: "perceptual-scale",
        });
        return (
          <div
            key={card.label}
            style={{
              position: "absolute",
              left: card.x,
              top: card.y,
              width: CARD_W,
              height: CARD_H,
              opacity: cardOpacity,
              translate: cardTranslate,
              scale: `${cardScale}`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.card,
                border: `3px solid ${COLORS.line}`,
                borderLeft: `10px solid ${COLORS.accent}`,
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 30px",
                gap: 8,
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.07)",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.ink,
                  whiteSpace: "nowrap",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 400,
                  color: COLORS.sub,
                }}
              >
                REFERENCE.md
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
          bottom: 170,
          opacity: captionOpacity,
          translate: captionTranslate,
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.sub,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        必要なファイルだけを、
        <br />
        必要なときに読み込む
      </div>
    </AbsoluteFill>
  );
};
