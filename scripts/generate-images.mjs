import fs from "node:fs";
import zlib from "node:zlib";

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(width, height, pixelFn) {
  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 3);
    raw[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelFn(x, y);
      const o = rowStart + 1 + x * 3;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

const og = png(1200, 630, (x, y) => {
  const ty = y / 630;
  const tx = x / 1200;
  let r = lerp(13, 24, ty);
  let g = lerp(15, 26, ty);
  let b = lerp(32, 48, ty);
  const wave = Math.sin(x / 90 + y / 140) * 0.5 + 0.5;
  r += wave * 10;
  g += wave * 12;
  b += wave * 18;
  if (y > 500 && y < 512 && x > 80 && x < 80 + tx * 900) return [225, 70, 49];
  if (x > 80 && x < 92 && y > 120 && y < 460) return [43, 82, 226];
  return [r, g, b];
});
fs.writeFileSync("public/og.png", og);
fs.copyFileSync("public/og.png", "dist/og.png");

const fav = png(32, 32, (x, y) => {
  const dx = x - 16;
  const dy = y - 16;
  if (dx * dx + dy * dy < 144) return [43, 82, 226];
  if (dx * dx + dy * dy < 60 && y < 16) return [225, 70, 49];
  return [13, 15, 20];
});

const S = 32;
const bmpHeader = Buffer.alloc(40);
bmpHeader.writeUInt32LE(40, 0);
bmpHeader.writeInt32LE(S, 4);
bmpHeader.writeInt32LE(S * 2, 8);
bmpHeader.writeUInt16LE(1, 12);
bmpHeader.writeUInt16LE(24, 14);
const rowSize = S * 3;
const maskRowSize = S / 8;
const pixelBytes = (rowSize + maskRowSize) * S;
bmpHeader.writeUInt32LE(pixelBytes, 20);

const favPixels = Buffer.alloc(pixelBytes);
for (let y = 0; y < S; y++) {
  for (let x = 0; x < S; x++) {
    const dx = x - 16;
    const dy = y - 16;
    let rgb = [13, 15, 20];
    if (dx * dx + dy * dy < 144) rgb = [43, 82, 226];
    if (dx * dx + dy * dy < 60 && y < 16) rgb = [225, 70, 49];
    const row = S - 1 - y;
    const o = row * (rowSize + maskRowSize) + x * 3;
    favPixels[o] = rgb[2];
    favPixels[o + 1] = rgb[1];
    favPixels[o + 2] = rgb[0];
  }
}

const icoHeader = Buffer.from([0, 0, 1, 0, 1, 0, S, S, 0, 0, 1, 0, 24, 0]);
const dirEntry = Buffer.alloc(8);
dirEntry.writeUInt32LE(40 + pixelBytes, 0);
dirEntry.writeUInt32LE(6 + 16, 4);
fs.writeFileSync("public/favicon.ico", Buffer.concat([icoHeader, dirEntry, bmpHeader, favPixels]));
fs.copyFileSync("public/favicon.ico", "dist/favicon.ico");

console.log("og.png + favicon.ico generated");
