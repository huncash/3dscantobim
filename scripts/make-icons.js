const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const NAVY = [21, 32, 51, 255];
const LINE = [215, 227, 240, 255];
const POINT = [208, 106, 63, 255];

function png(size, rgba) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const start = y * (size * 4 + 1);
    raw[start] = 0;
    rgba.copy(raw, start + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

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

function draw(size) {
  const data = Buffer.alloc(size * size * 4);
  const scale = size / 48;
  function px(x, y, color) {
    const xx = Math.round(x);
    const yy = Math.round(y);
    if (xx < 0 || yy < 0 || xx >= size || yy >= size) return;
    const i = (yy * size + xx) * 4;
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
    data[i + 3] = color[3];
  }
  function disc(cx, cy, radius, color) {
    const r = Math.max(radius, 0.6);
    for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y += 1) {
      for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x += 1) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) px(x, y, color);
      }
    }
  }
  function stroke(x1, y1, x2, y2, width, color) {
    const steps = Math.max(2, Math.ceil(Math.hypot(x2 - x1, y2 - y1) * 2));
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      disc(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, width / 2, color);
    }
  }
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) px(x, y, NAVY);
  }
  const margin = 6 * scale;
  const weight = Math.max(1.2, 1.6 * scale);
  stroke(margin, margin, size - margin, margin, weight, LINE);
  stroke(size - margin, margin, size - margin, size - margin, weight, LINE);
  stroke(size - margin, size - margin, margin, size - margin, weight, LINE);
  stroke(margin, size - margin, margin, margin, weight, LINE);
  const X = (value) => value * scale;
  const Y = (value) => value * scale;
  const lineWeight = Math.max(1.1, 1.5 * scale);
  stroke(X(14), Y(34), X(14), Y(18), lineWeight, LINE);
  stroke(X(14), Y(18), X(24), Y(12), lineWeight, LINE);
  stroke(X(24), Y(12), X(34), Y(18), lineWeight, LINE);
  stroke(X(34), Y(18), X(34), Y(34), lineWeight, LINE);
  stroke(X(14), Y(24), X(34), Y(24), lineWeight * 0.8, LINE);
  stroke(X(24), Y(12), X(24), Y(34), lineWeight * 0.8, LINE);
  disc(X(24), Y(24), Math.max(1.5, 2.2 * scale), POINT);
  return png(size, data);
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = [];
  for (const image of images) {
    const entry = Buffer.alloc(16);
    entry[0] = image.size >= 256 ? 0 : image.size;
    entry[1] = image.size >= 256 ? 0 : image.size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += image.png.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

const publicDir = path.join(__dirname, '..', 'public');
const files = [
  [16, 'favicon-16.png'],
  [32, 'favicon-32.png'],
  [48, 'favicon-48.png'],
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
  [512, 'icon-512.png'],
];
const written = [];
for (const [size, name] of files) {
  const file = draw(size);
  fs.writeFileSync(path.join(publicDir, name), file);
  written.push(`${name} ${file.length}`);
}
const icoFile = ico([
  { size: 16, png: fs.readFileSync(path.join(publicDir, 'favicon-16.png')) },
  { size: 32, png: fs.readFileSync(path.join(publicDir, 'favicon-32.png')) },
  { size: 48, png: fs.readFileSync(path.join(publicDir, 'favicon-48.png')) },
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);
console.log(written.join('\n'));
console.log(`favicon.ico ${icoFile.length}`);
