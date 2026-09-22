/**
 * Cuts review-friendly previews out of a rendered master file.
 *
 * Some players/video previews struggle with a single 3-minute, video-only MP4,
 * so this produces:
 *   1. a compatibility re-encode of the whole film (yuv420p, limited range,
 *      bt709, 1s keyframes, faststart)
 *   2. one clip per scene, so a scene can be reviewed on its own
 *   3. a full-length GIF and a film strip PNG, for viewers that cap long video
 *
 * Usage: node scripts/make-preview-clips.mjs <master.mp4> <outDir>
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg";
const ffprobe = "node_modules/@remotion/compositor-linux-x64-gnu/ffprobe";

const [master, outDir] = process.argv.slice(2);

if (!master || !outDir) {
  console.error("usage: node scripts/make-preview-clips.mjs <master.mp4> <outDir>");
  process.exit(1);
}

/**
 * Scene windows in the finished film (seconds), taken from the
 * TransitionSeries timeline — each start is the midpoint of the transition
 * that introduces the scene.
 */
const CLIPS = [
  { name: "01-opening", start: 0, duration: 9.0 },
  { name: "02-repository", start: 8.77, duration: 16.0 },
  { name: "03-structure", start: 24.5, duration: 22.0 },
  { name: "04-workflow", start: 46.27, duration: 24.0 },
  { name: "05-frame-driven", start: 70.0, duration: 24.0 },
  { name: "06-timing", start: 93.77, duration: 24.0 },
  { name: "07-layout", start: 117.5, duration: 22.0 },
  { name: "08-more-skills", start: 139.27, duration: 20.0 },
  { name: "09-closing", start: 159.0, duration: 21.0 },
];

const run = (bin, args) =>
  execFileSync(bin, args, { stdio: ["ignore", "ignore", "pipe"] });

const probe = (file) => {
  const out = execFileSync(ffprobe, [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=codec_name,pix_fmt,color_range,width,height,r_frame_rate",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1",
    file,
  ]).toString();
  return out.trim().split("\n").join(" ");
};

fs.mkdirSync(outDir, { recursive: true });

const film = path.join(outDir, "motion-skill-explainer-3min.mp4");
run(ffmpeg, [
  "-hide_banner",
  "-loglevel",
  "error",
  "-y",
  "-i",
  master,
  "-c:v",
  "libx264",
  "-preset",
  "veryfast",
  "-crf",
  "20",
  "-pix_fmt",
  "yuv420p",
  "-vf",
  "scale=out_range=tv",
  "-color_range",
  "tv",
  "-colorspace",
  "bt709",
  "-color_primaries",
  "bt709",
  "-color_trc",
  "bt709",
  "-g",
  "60",
  "-keyint_min",
  "60",
  "-sc_threshold",
  "0",
  "-movflags",
  "+faststart",
  "-an",
  film,
]);
console.log("film   ", path.basename(film), "|", probe(film));

const scenesDir = path.join(outDir, "scenes");
fs.mkdirSync(scenesDir, { recursive: true });

for (const clip of CLIPS) {
  const target = path.join(scenesDir, `${clip.name}.mp4`);
  run(ffmpeg, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    String(clip.start),
    "-i",
    film,
    "-t",
    String(clip.duration),
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "20",
    "-g",
    "60",
    "-movflags",
    "+faststart",
    "-an",
    target,
  ]);
  console.log("scene  ", clip.name.padEnd(16), "|", probe(target));
}

// A full-length GIF and a film strip PNG: viewers that cap long videos still
// show these in full, and the strip makes the three-minute structure visible
// at a glance.
const fullGif = path.join(outDir, "motion-skill-explainer-3min.gif");
const palette = path.join(outDir, ".palette.png");
run(ffmpeg, [
  "-hide_banner",
  "-loglevel",
  "error",
  "-y",
  "-i",
  film,
  "-vf",
  "scale=150:-2:flags=lanczos,palettegen=max_colors=64:stats_mode=diff",
  palette,
]);
run(ffmpeg, [
  "-hide_banner",
  "-loglevel",
  "error",
  "-y",
  "-i",
  film,
  "-i",
  palette,
  "-r",
  "5",
  "-lavfi",
  "[0:v]scale=150:-2:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer",
  "-loop",
  "0",
  fullGif,
]);
fs.rmSync(palette, { force: true });
console.log("gif     full film        |", (fs.statSync(fullGif).size / 1024 / 1024).toFixed(2) + " MB");

const stillsDir = path.join(outDir, ".stills");
fs.rmSync(stillsDir, { recursive: true, force: true });
fs.mkdirSync(stillsDir, { recursive: true });
const total = Number(
  /duration=([\d.]+)/.exec(
    execFileSync(ffprobe, [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1",
      film,
    ]).toString(),
  )[1],
);
const step = 5;
const ticks = [];
for (let t = 0, i = 0; t < total; t += step, i++) {
  const still = path.join(stillsDir, `f${String(i).padStart(2, "0")}.png`);
  run(ffmpeg, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    String(t),
    "-i",
    film,
    "-frames:v",
    "1",
    "-vf",
    "scale=150:-2:flags=lanczos",
    still,
  ]);
  const label = `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, "0")}`;
  const scene = CLIPS.filter((c) => t >= c.start).pop();
  const captioned = path.join(stillsDir, `t${String(i).padStart(2, "0")}.png`);
  run("convert", [
    still,
    "-background",
    "#F2F0EB",
    "-fill",
    "#0B0B0C",
    "-font",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
    "-pointsize",
    "16",
    "label:" + `${label}  ${scene.name.toUpperCase().replace(/-/g, " ")}`,
    "-gravity",
    "center",
    "-append",
    captioned,
  ]);
  ticks.push(captioned);
}
const strip = path.join(outDir, "film-strip.png");
run("montage", [...ticks, "-tile", "6x6", "-geometry", "+10+10", "-background", "#FFFFFF", path.join(stillsDir, "grid.png")]);
run("convert", [
  path.join(stillsDir, "grid.png"),
  "-bordercolor",
  "#F2F0EB",
  "-border",
  "24",
  "-background",
  "#F2F0EB",
  "-fill",
  "#0B0B0C",
  "-font",
  "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
  "-pointsize",
  "30",
  "-gravity",
  "west",
  "label:" + `FILM STRIP — ${total.toFixed(1)}s / ${Math.round(total * 60)} frames / ${ticks.length} frames sampled every ${step}s`,
  "-gravity",
  "center",
  "-append",
  strip,
]);
fs.rmSync(stillsDir, { recursive: true, force: true });
console.log("strip   film-strip.png");

// The review page lets the browser itself report each file's duration.
const page = path.resolve("scripts/review-page.html");
if (fs.existsSync(page)) {
  fs.copyFileSync(page, path.join(outDir, "index.html"));
  console.log("page   ", "index.html");
}

// GIFs are a safety net for players that cap long videos: they are just
// images, so every viewer shows them in full. The sandbox ffmpeg is a minimal
// build, so frame dropping uses the output -r option and the palette is built
// with filter_complex (there is no fps filter).
if (!process.argv.includes("--no-gif")) {
  for (const clip of CLIPS) {
    const target = path.join(scenesDir, `${clip.name}.gif`);
    run(ffmpeg, [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-ss",
      String(clip.start),
      "-t",
      String(clip.duration),
      "-i",
      film,
      "-r",
      "10",
      "-filter_complex",
      "[0:v]scale=420:-2:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer",
      "-loop",
      "0",
      target,
    ]);
    console.log(
      "gif    ",
      clip.name.padEnd(16),
      "|",
      (fs.statSync(target).size / 1024 / 1024).toFixed(2) + " MB",
    );
  }
}
