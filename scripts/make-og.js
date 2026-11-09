const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const W = 1200;
const H = 630;
const buf = Buffer.alloc(W * H * 3, 0);

function set(x, y, r, g, b) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  buf[i] = r;
  buf[i + 1] = g;
  buf[i + 2] = b;
}

function fill(x, y, w, h, r, g, b) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) set(xx, yy, r, g, b);
  }
}

const FONT = {
  A: [14, 17, 17, 31, 17, 17, 17],
  B: [30, 17, 17, 30, 17, 17, 30],
  C: [14, 17, 16, 16, 16, 17, 14],
  D: [30, 17, 17, 17, 17, 17, 30],
  E: [31, 16, 16, 30, 16, 16, 31],
  F: [31, 16, 16, 30, 16, 16, 16],
  G: [14, 17, 16, 23, 17, 17, 14],
  H: [17, 17, 17, 31, 17, 17, 17],
  I: [14, 4, 4, 4, 4, 4, 14],
  J: [7, 2, 2, 2, 2, 18, 12],
  K: [17, 18, 20, 24, 20, 18, 17],
  L: [16, 16, 16, 16, 16, 16, 31],
  M: [17, 27, 21, 21, 17, 17, 17],
  N: [17, 25, 21, 19, 17, 17, 17],
  O: [14, 17, 17, 17, 17, 17, 14],
  P: [30, 17, 17, 30, 16, 16, 16],
  R: [30, 17, 17, 30, 20, 18, 17],
  S: [15, 16, 16, 14, 1, 1, 30],
  T: [31, 4, 4, 4, 4, 4, 4],
  U: [17, 17, 17, 17, 17, 17, 14],
  V: [17, 17, 17, 17, 17, 10, 4],
  Y: [17, 17, 10, 4, 4, 4, 4],
  '0': [14, 17, 19, 21, 25, 17, 14],
  '1': [4, 12, 4, 4, 4, 4, 14],
  '2': [14, 17, 1, 2, 4, 8, 31],
  '3': [30, 1, 1, 14, 1, 1, 30],
  ' ': [0, 0, 0, 0, 0, 0, 0],
  '.': [0, 0, 0, 0, 0, 12, 12],
  '-': [0, 0, 0, 14, 0, 0, 0],
};

function textWidth(text, scale) {
  return [...text].reduce((sum, char) => sum + ((FONT[char] ? 6 : 4) * scale), 0);
}

function drawText(text, x, y, scale, color) {
  let cursor = x;
  for (const char of text) {
    const glyph = FONT[char] || FONT[' '];
    for (let row = 0; row < 7; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        if ((glyph[row] >> (4 - col)) & 1) {
          fill(cursor + col * scale, y + row * scale, scale, scale, color[0], color[1], color[2]);
        }
      }
    }
    cursor += 6 * scale;
  }
}

fill(0, 0, W, H, 21, 32, 51);
fill(0, 0, W, 8, 154, 78, 36);
fill(72, 150, 640, 300, 247, 249, 251);
for (let y = 150; y < 450; y += 24) fill(72, y, 640, 1, 211, 219, 228);
for (let x = 72; x < 712; x += 24) fill(x, 150, 1, 300, 211, 219, 228);
fill(72, 150, 8, 300, 31, 78, 121);

const title = '3D SCAN TO BIM';
drawText(title, 96, 190, 6, [21, 32, 51]);
drawText('TEREPI FELMERES', 96, 270, 4, [31, 78, 121]);
drawText('PONTFELHO ATADAS', 96, 320, 4, [31, 78, 121]);
drawText('EGYEZTETETT ATADAS', 96, 390, 3, [154, 78, 36]);

const rand = (() => {
  let seed = 42;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
})();
for (let i = 0; i < 700; i += 1) {
  const x = 760 + Math.floor(rand() * 360);
  const y = 140 + Math.floor(rand() * 360);
  const inBuilding = x > 820 && x < 1080 && y > 180 && y < 460 && (y > 300 || (x > 900 && x < 1020));
  if (!inBuilding && rand() > 0.35) continue;
  const shade = inBuilding ? 232 : 170;
  fill(x, y, 3, 3, shade, shade + 8, 240);
}
drawText('3DSCANT0BIM.HU'.replace('0', 'O'), 72, 520, 3, [215, 222, 234]);

function crc32(data) {
  let c = ~0;
  for (let i = 0; i < data.length; i += 1) {
    c ^= data[i];
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}

const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y += 1) {
  const start = y * (W * 3 + 1);
  raw[start] = 0;
  buf.copy(raw, start + 1, y * W * 3, (y + 1) * W * 3);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const out = path.join(__dirname, '..', 'public', 'images', 'og.png');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log(`OG kép: ${out} (${png.length} bájt)`);
void textWidth;
