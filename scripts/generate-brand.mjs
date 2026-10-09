import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import * as fontkit from "fontkit";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "public/brand");
mkdirSync(output, { recursive: true });
const regular = fontkit.openSync(
  join(
    root,
    "node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff",
  ),
);
const bold = fontkit.openSync(
  join(
    root,
    "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff",
  ),
);
const mono = fontkit.openSync(
  join(
    root,
    "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  ),
);
const paper = "#f4f1e9",
  green = "#264c3b",
  ink = "#20251f";
const wrap = (width, height, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${content}</svg>`;
const mark = (x, y, size, color) =>
  `<g transform="translate(${x} ${y}) scale(${size / 40})" fill="none" stroke="${color}" stroke-width="2.8"><path d="M9 7v13c0 8 6 12 14 12h8M9 20c0-8 6-12 14-12h8M22 20h9"/><g fill="${color}" stroke="none"><circle cx="9" cy="7" r="3.5"/><circle cx="31" cy="8" r="3.5"/><circle cx="31" cy="20" r="3.5"/><circle cx="31" cy="32" r="3.5"/></g></g>`;
function text(value, x, baseline, size, color, font = regular, spacing = 0) {
  const layout = font.layout(value);
  const scale = size / font.unitsPerEm;
  let offset = 0;
  const paths = layout.glyphs
    .map((glyph, index) => {
      const position = layout.positions[index];
      const path = `<path d="${glyph.path.toSVG()}" transform="translate(${offset + position.xOffset * scale} ${-position.yOffset * scale}) scale(${scale} ${-scale})"/>`;
      offset += position.xAdvance * scale + spacing;
      return path;
    })
    .join("");
  return `<g transform="translate(${x} ${baseline})" fill="${color}">${paths}</g>`;
}
for (const [name, color] of [
  ["green", green],
  ["ink", ink],
  ["reversed", paper],
]) {
  writeFileSync(
    join(output, `wordmark-${name}.svg`),
    wrap(
      280,
      60,
      mark(4, 7, 46, color) + text("evograph", 63, 43, 39, color, bold, -1.4),
    ),
  );
  writeFileSync(
    join(output, `stacked-${name}.svg`),
    wrap(
      230,
      170,
      mark(76, 9, 78, color) + text("evograph", 20, 143, 39, color, bold, -1.4),
    ),
  );
}
writeFileSync(join(output, "mark.svg"), wrap(40, 40, mark(0, 0, 40, green)));
const icon = wrap(
  512,
  512,
  `<rect width="512" height="512" rx="88" fill="${green}"/>${mark(84, 74, 344, paper)}`,
);
writeFileSync(join(output, "icon.svg"), icon);
for (const size of [32, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
  await sharp(Buffer.from(icon))
    .resize(size, size)
    .png()
    .toFile(join(output, name));
}
const png = readFileSync(join(output, "icon-32.png"));
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(join(root, "app/favicon.ico"), Buffer.concat([header, png]));
const og = wrap(
  1200,
  630,
  `<rect width="1200" height="630" fill="${paper}"/><path d="M62 122H1138M62 542H1138" stroke="#cfcec3"/>` +
    mark(58, 41, 46, green) +
    text("evograph", 118, 78, 36, ink, bold, -1.2) +
    text(
      "AN EVOLUTION RECORD FOR YOUR REPOSITORY",
      64,
      177,
      14,
      green,
      mono,
      0.6,
    ) +
    text("The code changed.", 59, 285, 76, ink, regular, -3) +
    text("Keep the why.", 59, 374, 76, green, regular, -3) +
    text("Problems. Decisions. Changes. Connected.", 64, 456, 23, "#656a60") +
    text("LOCAL CLI / OPEN SOURCE", 64, 582, 13, green, mono, 0.6) +
    text("evograph.app", 990, 582, 14, green, mono) +
    `<path d="M941 230v72q0 36 40 36h98M941 302q0-72 65-72h73M1005 302h74" fill="none" stroke="#839779" stroke-width="3"/><g fill="${green}"><circle cx="941" cy="230" r="8"/><circle cx="1079" cy="230" r="8"/><circle cx="1079" cy="302" r="8"/><circle cx="1079" cy="338" r="8"/></g>`,
);
writeFileSync(join(output, "og.svg"), og);
await sharp(Buffer.from(og)).png().toFile(join(output, "og.png"));
console.log(
  "Generated outlined vector logos, app icons, favicon, and 1200×630 social image.",
);
