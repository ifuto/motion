/**
 * Tiny static file server with HTTP range support, used to review rendered
 * previews in the browser (the sandbox exposes it as a live preview).
 *
 *   node scripts/preview-server.mjs [dir] [port]
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "/home/user/preview");
const port = Number(process.argv[3] ?? 4321);

const types = {
  ".html": "text/html; charset=utf-8",
  ".mp4": "video/mp4",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".css": "text/css",
  ".js": "text/javascript",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const target = path.join(root, urlPath === "/" ? "index.html" : urlPath);

    if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      res.writeHead(404).end("not found");
      return;
    }

    const size = fs.statSync(target).size;
    const type = types[path.extname(target)] ?? "application/octet-stream";
    const range = req.headers.range;

    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);
      const start = match?.[1] ? Number(match[1]) : 0;
      const end = match?.[2] ? Number(match[2]) : size - 1;
      res.writeHead(206, {
        "Content-Type": type,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": end - start + 1,
        "Cache-Control": "no-store",
      });
      fs.createReadStream(target, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Content-Length": size,
      "Cache-Control": "no-store",
    });
    fs.createReadStream(target).pipe(res);
  })
  .listen(port, "0.0.0.0", () => console.log(`preview server on http://0.0.0.0:${port} → ${root}`));
