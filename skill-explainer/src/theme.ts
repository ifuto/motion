export const COLORS = {
  bg: "#F7F8FB",
  card: "#FFFFFF",
  ink: "#0F172A",
  sub: "#64748B",
  line: "#E2E8F0",
  accent: "#2563EB",
  accentSoft: "#DBEAFE",
  violet: "#7C3AED",
  violetSoft: "#EDE9FE",
  good: "#16A34A",
  goodSoft: "#DCFCE7",
  bad: "#DC2626",
  badSoft: "#FEE2E2",
  amber: "#D97706",
  amberSoft: "#FEF3C7",
} as const;

export const FONT = `"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif`;
export const MONO = `"JetBrains Mono", "DejaVu Sans Mono", monospace`;

// Safe area for a 1080px-wide composition: ≥80px sides, ≥100px top/bottom.
export const SAFE = { x: 96, y: 120 } as const;
