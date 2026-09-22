import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 07 — Design rules (1320 frames / 22 s)
 *
 * The frame itself is drawn as a technical drawing: trim, safe area,
 * dimension lines and a single focal point.
 */

export const LayoutRules: React.FC = () => {
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
        SECTION 07 / 09
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
        07
      </Interactive.Div>

      <Interactive.Div
        name="Headline"
        style={{ position: "absolute", left: 232, top: 216, width: 760, height: 150, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
            translate: interpolate(frame, [8, 34], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          動画として設計する
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
          lineHeight: 1.45,
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
        1080 × 1920 のフレームを、
        <br />
        設計図として見る
      </Interactive.Div>

      {/* Trim: 560 × 995 draws itself clockwise */}
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 600,
          height: 3,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [60, 110], [0, 560], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 817,
          top: 600,
          width: 3,
          backgroundColor: "#0B0B0C",
          height: interpolate(frame, [110, 160], [0, 995], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 1592,
          height: 3,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [160, 210], [0, 560], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 600,
          width: 3,
          backgroundColor: "#0B0B0C",
          height: interpolate(frame, [210, 260], [0, 995], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Dimension: 80px side margins */}
      <div
        style={{
          position: "absolute",
          left: 224,
          top: 644,
          width: 2,
          backgroundColor: "rgba(11, 11, 12, 0.45)",
          height: interpolate(frame, [300, 350], [0, 907], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Margin dimension"
        from={340}
        style={{
          position: "absolute",
          left: 176,
          top: 1040,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          fontWeight: 700,
          color: "rgba(11, 11, 12, 0.7)",
          rotate: "-90deg",
        }}
      >
        80px
      </Interactive.Div>

      {/* Dimension: 100px top margin */}
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 576,
          height: 2,
          backgroundColor: "rgba(11, 11, 12, 0.45)",
          width: interpolate(frame, [300, 350], [0, 490], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Top dimension"
        from={340}
        style={{
          position: "absolute",
          left: 500,
          top: 522,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          fontWeight: 700,
          color: "rgba(11, 11, 12, 0.7)",
        }}
      >
        100px
      </Interactive.Div>

      {/* Safe area: dashes snap in from the outside */}
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 644,
          borderTop: "3px dashed #1F3BFF",
          width: interpolate(frame, [380, 420], [0, 490], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 782,
          top: 644,
          borderLeft: "3px dashed #1F3BFF",
          height: interpolate(frame, [400, 440], [0, 907], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 1549,
          borderTop: "3px dashed #1F3BFF",
          width: interpolate(frame, [420, 460], [0, 490], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 644,
          borderLeft: "3px dashed #1F3BFF",
          height: interpolate(frame, [440, 480], [0, 907], {
            easing: Easing.bezier(0.2, 0, 0, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Headline block inside the drawing */}
      <Interactive.Div
        name="Headline block"
        from={500}
        style={{
          position: "absolute",
          left: 295,
          top: 700,
          width: 420,
          height: 76,
          backgroundColor: "#0B0B0C",
          color: "#F2F0EB",
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
          boxSizing: "border-box",
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        見出し ≥84px
      </Interactive.Div>

      {/* Single focal point */}
      <Interactive.Div
        name="Focal point"
        from={620}
        style={{
          position: "absolute",
          left: 727,
          top: 700,
          width: 76,
          height: 76,
          backgroundColor: "#1F3BFF",
          scale: interpolate(frame, [640, 664], [0.6, 1], {
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Focal label"
        from={660}
        style={{
          position: "absolute",
          left: 295,
          top: 800,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#1F3BFF",
        }}
      >
        注目点は、ひとつだけ
      </Interactive.Div>

      {/* Support text + body lines */}
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 880,
          height: 3,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [700, 750], [0, 300], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Support label"
        from={740}
        style={{
          position: "absolute",
          left: 295,
          top: 900,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 400,
          color: "rgba(11, 11, 12, 0.6)",
        }}
      >
        重要テキスト ≥44px
      </Interactive.Div>
      {[0, 1, 2, 3].map((line) => (
        <div
          key={line}
          style={{
            position: "absolute",
            left: 295,
            top: 990 + line * 56,
            height: 2,
            backgroundColor: "rgba(11, 11, 12, 0.28)",
            width: interpolate(frame, [800 + line * 30, 860 + line * 30], [0, line === 3 ? 300 : 487], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}

      {/* Bottom statement */}
      <Interactive.Div
        name="Safe area statement"
        style={{ position: "absolute", left: 88, top: 1660, width: 904, height: 66, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: "-0.01em",
            color: "#1F3BFF",
            translate: interpolate(frame, [1180, 1240], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          セーフエリア: 左右80px・上下100px
        </span>
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1760,
          height: 10,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [1240, 1300], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
