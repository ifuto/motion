import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../components/Paper";

/**
 * 06 — Timing and style (1440 frames / 24 s)
 *
 * Three rules, printed one under the other, each with its own proof:
 * an easing curve, an inline interpolate(), and the three transform
 * properties that the Studio can actually edit.
 */

const ROWS_Y = [680, 1010, 1340];

export const MarkupStyle: React.FC = () => {
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
        SECTION 06 / 09
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
        06
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
          タイミングと書き方
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
        動きの質感は、書き方で決まる
      </Interactive.Div>

      {/* ---- 01 easing ---- */}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[0],
          height: 2,
          backgroundColor: "rgba(11, 11, 12, 0.35)",
          width: interpolate(frame, [60, 110], [0, 904], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Row 01"
        from={72}
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[0] + 34,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 40,
          fontWeight: 700,
          color: "#1F3BFF",
        }}
      >
        01
      </Interactive.Div>
      <Interactive.Div
        name="Rule 01 — easing"
        style={{ position: "absolute", left: 196, top: ROWS_Y[0] + 18, width: 796, height: 84, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            translate: interpolate(frame, [76, 118], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          イージングで質感を決める
        </span>
      </Interactive.Div>

      <Interactive.Svg
        name="Easing graph"
        width={420}
        height={170}
        viewBox="0 0 420 170"
        style={{ position: "absolute", left: 196, top: ROWS_Y[0] + 110 }}
      >
        <Interactive.Line name="Grid v1" x1={105} y1={0} x2={105} y2={166} stroke="rgba(11, 11, 12, 0.16)" strokeWidth={1} />
        <Interactive.Line name="Grid v2" x1={210} y1={0} x2={210} y2={166} stroke="rgba(11, 11, 12, 0.16)" strokeWidth={1} />
        <Interactive.Line name="Grid v3" x1={315} y1={0} x2={315} y2={166} stroke="rgba(11, 11, 12, 0.16)" strokeWidth={1} />
        <Interactive.Line name="Grid h1" x1={0} y1={55} x2={416} y2={55} stroke="rgba(11, 11, 12, 0.16)" strokeWidth={1} />
        <Interactive.Line name="Grid h2" x1={0} y1={110} x2={416} y2={110} stroke="rgba(11, 11, 12, 0.16)" strokeWidth={1} />
        <Interactive.Line name="Axis x" x1={0} y1={166} x2={416} y2={166} stroke="#0B0B0C" strokeWidth={3} />
        <Interactive.Line name="Axis y" x1={0} y1={0} x2={0} y2={166} stroke="#0B0B0C" strokeWidth={3} />
        <Interactive.Path
          name="Easing.bezier curve"
          d="M 6 162 C 150 162, 300 14, 414 8"
          fill="none"
          stroke="#1F3BFF"
          strokeWidth={6}
          strokeDasharray={1000}
          strokeDashoffset={interpolate(frame, [150, 420], [1000, 0], {
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <Interactive.Line
          name="Linear reference"
          x1={6}
          y1={162}
          x2={414}
          y2={8}
          stroke="rgba(11, 11, 12, 0.35)"
          strokeWidth={3}
          strokeDasharray={12}
        />
      </Interactive.Svg>

      <Interactive.Div
        name="Easing chips"
        from={104}
        style={{ position: "absolute", left: 656, top: ROWS_Y[0] + 146, display: "flex", flexDirection: "column", gap: 16 }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            paddingLeft: 20,
            paddingRight: 20,
            border: "2px solid #0B0B0C",
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Easing.bezier()
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            paddingLeft: 20,
            paddingRight: 20,
            border: "2px solid #1F3BFF",
            color: "#1F3BFF",
            fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Easing.spring()
        </span>
      </Interactive.Div>

      {/* ---- 02 inline interpolate ---- */}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[1],
          height: 2,
          backgroundColor: "rgba(11, 11, 12, 0.35)",
          width: interpolate(frame, [440, 490], [0, 904], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Row 02"
        from={452}
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[1] + 34,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 40,
          fontWeight: 700,
          color: "#1F3BFF",
        }}
      >
        02
      </Interactive.Div>
      <Interactive.Div
        name="Rule 02 — inline"
        style={{ position: "absolute", left: 196, top: ROWS_Y[1] + 18, width: 796, height: 84, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            translate: interpolate(frame, [456, 498], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          interpolate は style にインライン
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Inline example"
        from={500}
        style={{
          position: "absolute",
          left: 196,
          top: ROWS_Y[1] + 108,
          width: 796,
          height: 104,
          display: "flex",
          alignItems: "center",
          paddingLeft: 28,
          boxSizing: "border-box",
          backgroundColor: "#0B0B0C",
          color: "#F2F0EB",
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 26,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            whiteSpace: "nowrap",
            translate: interpolate(frame, [520, 560], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {'style={{ opacity: interpolate(frame, [0, 30], [0, 1]) }}'}
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Inline note"
        from={560}
        style={{
          position: "absolute",
          left: 196,
          top: ROWS_Y[1] + 232,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 400,
          color: "rgba(11, 11, 12, 0.6)",
        }}
      >
        Studio 上で、値を直接触れる
      </Interactive.Div>

      {/* ---- 03 transform properties ---- */}
      <div
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[2],
          height: 2,
          backgroundColor: "rgba(11, 11, 12, 0.35)",
          width: interpolate(frame, [840, 890], [0, 904], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Row 03"
        from={852}
        style={{
          position: "absolute",
          left: 88,
          top: ROWS_Y[2] + 34,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 40,
          fontWeight: 700,
          color: "#1F3BFF",
        }}
      >
        03
      </Interactive.Div>
      <Interactive.Div
        name="Rule 03 — no transform strings"
        style={{ position: "absolute", left: 196, top: ROWS_Y[2] + 18, width: 796, height: 84, overflow: "hidden" }}
      >
        <span
          style={{
            display: "block",
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            translate: interpolate(frame, [856, 898], ["-100% 0px", "0% 0px"], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          transform 文字列は使わない
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Struck transform"
        from={900}
        style={{
          position: "absolute",
          left: 196,
          top: ROWS_Y[2] + 112,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 28,
          fontWeight: 400,
          color: "rgba(11, 11, 12, 0.75)",
        }}
      >
        transform: translateY(120px)
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 20,
            height: 6,
            backgroundColor: "#0B0B0C",
            width: interpolate(frame, [920, 980], [0, 402], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Transform chips"
        from={960}
        style={{
          position: "absolute",
          left: 196,
          top: ROWS_Y[2] + 172,
          display: "flex",
          gap: 18,
        }}
      >
        {["scale", "translate", "rotate"].map((property) => (
          <span
            key={property}
            style={{
              display: "flex",
              alignItems: "center",
              height: 60,
              paddingLeft: 22,
              paddingRight: 22,
              border: "3px solid #1F3BFF",
              color: "#1F3BFF",
              fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {property}
          </span>
        ))}
      </Interactive.Div>
      <Interactive.Div
        name="Perceptual note"
        from={1010}
        style={{
          position: "absolute",
          left: 196,
          top: ROWS_Y[2] + 258,
          fontFamily: '"JetBrains Mono", "Noto Sans JP", monospace',
          fontSize: 24,
          fontWeight: 400,
          color: "rgba(11, 11, 12, 0.6)",
        }}
      >
        scale には output: 'perceptual-scale' を
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1740,
          height: 10,
          backgroundColor: "#0B0B0C",
          width: interpolate(frame, [1240, 1320], [0, 1080], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
