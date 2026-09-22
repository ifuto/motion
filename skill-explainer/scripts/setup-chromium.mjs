/**
 * Re-creates the standalone Chromium used for rendering in this sandbox.
 *
 * The sandbox has no network access to Chrome-for-Testing, so we unpack the
 * brotli bundles that ship with @sparticuz/chromium:
 *   chromium.br     -> /tmp/chromium/chrome-linux/chrome
 *   al2023.tar.br   -> shared libraries (NSS etc.) -> /usr/local/lib
 *
 * Run with: node scripts/setup-chromium.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { brotliDecompressSync } from "node:zlib";

const BIN = path.resolve("node_modules/@sparticuz/chromium/bin");
const CHROMIUM_DIR = "/tmp/chromium";
const LIB_DIR = "/usr/local/lib";

const decompressTo = (source, target) => {
  const out = brotliDecompressSync(fs.readFileSync(source));
  fs.writeFileSync(target, out);
  return out.length;
};

const extract = (tarball, destination) => {
  fs.mkdirSync(destination, { recursive: true });
  execFileSync("tar", ["-xf", tarball, "-C", destination], {
    stdio: "inherit",
  });
};

// 1. Chromium itself. chromium.br decompresses straight to the ELF binary.
const chromeBinary = path.join(CHROMIUM_DIR, "chrome-linux/chrome");
if (fs.existsSync(chromeBinary)) {
  console.log("chromium already present");
} else {
  fs.mkdirSync(path.dirname(chromeBinary), { recursive: true });
  const size = decompressTo(path.join(BIN, "chromium.br"), chromeBinary);
  fs.chmodSync(chromeBinary, 0o755);
  console.log(`chromium.br -> ${chromeBinary} (${size} bytes)`);
}

// 1b. Software GL + font config that must sit next to the binary.
for (const [archive, label] of [
  ["swiftshader.tar.br", "swiftshader"],
  ["fonts.tar.br", "fonts"],
]) {
  const tar = `/tmp/${label}.tar`;
  decompressTo(path.join(BIN, archive), tar);
  extract(tar, path.join(CHROMIUM_DIR, "chrome-linux"));
  fs.rmSync(tar, { force: true });
}

// 2. Shared libraries (libnss3, libnspr4, ...).
for (const [archive, label] of [["al2023.tar.br", "al2023"]]) {
  const tar = `/tmp/${label}.tar`;
  decompressTo(path.join(BIN, archive), tar);
  extract(tar, "/tmp");

  const libSource = path.join("/tmp/lib");
  if (fs.existsSync(libSource)) {
    for (const file of fs.readdirSync(libSource)) {
      fs.copyFileSync(path.join(libSource, file), path.join(LIB_DIR, file));
    }
    console.log(`${label}: copied ${fs.readdirSync(libSource).length} files`);
  }
  fs.rmSync(tar, { force: true });
  fs.rmSync(libSource, { recursive: true, force: true });
}

// 3. Make the new libraries visible to the dynamic linker.
fs.writeFileSync("/tmp/usrlocal.conf", "/usr/local/lib\n");
try {
  execFileSync("sudo", [
    "sh",
    "-c",
    "cp /tmp/usrlocal.conf /etc/ld.so.conf.d/usrlocal.conf && ldconfig -v >/dev/null 2>&1 || ldconfig",
  ]);
  console.log("ldconfig ok");
} catch {
  console.log("ldconfig failed — set LD_LIBRARY_PATH=/usr/local/lib instead");
}

console.log(
  execFileSync(path.join(CHROMIUM_DIR, "chrome-linux/chrome"), ["--version"], {
    encoding: "utf8",
  }).trim(),
);
