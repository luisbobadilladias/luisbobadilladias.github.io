// Generates the social share images in public/og/. Run with: npm run og
// Re-run it if you change your name, role or tagline.
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

const out = new URL('../public/og/', import.meta.url);
await mkdir(out, { recursive: true });

const photo = await readFile(new URL('../src/assets/luis.jpg', import.meta.url));
const avatar = await sharp(photo)
  .resize(360, 360)
  .composite([{ input: Buffer.from('<svg width="360" height="360"><circle cx="180" cy="180" r="180"/></svg>'), blend: 'dest-in' }])
  .png()
  .toBuffer();

// Plain photo used by the Person JSON-LD.
await sharp(photo).resize(800, 800).jpeg({ quality: 82 }).toFile(new URL('luis.jpg', out).pathname);

const copy = {
  es: { line1: 'Data Platform Engineer · Asunción', line2: 'Data engineering · Consultoría · Enseñanza' },
  en: { line1: 'Data Platform Engineer · Asunción, Paraguay', line2: 'Data engineering · Consulting · Teaching' },
};

function cells(x, y) {
  let s = '';
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 5; c++) {
      const on = c === 3 && r === 1;
      s += `<rect x="${x + c * 48}" y="${y + r * 32}" width="48" height="32" fill="${on ? '#CC005F' : '#FFFFFF'}" stroke="${on ? '#CC005F' : '#E2E2E2'}" stroke-width="${on ? 2 : 1.5}"/>`;
    }
  s += `<text x="${x + 3 * 48 + 24}" y="${y + 32 + 23}" font-family="Menlo, monospace" font-weight="700" font-size="22" fill="#FFFFFF" text-anchor="middle">›</text>`;
  return s;
}

for (const [lang, t] of Object.entries(copy)) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#FFFFFF"/>
    <rect x="0" y="590" width="1200" height="40" fill="#151515"/>
    ${cells(900, 64)}
    <text x="80" y="300" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="76" fill="#151515" letter-spacing="-1.5">Luis Bobadilla Dias</text>
    <text x="80" y="370" font-family="Helvetica Neue, Arial, sans-serif" font-size="36" fill="#CC005F">${t.line1}</text>
    <text x="80" y="430" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" fill="#555555">${t.line2}</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: avatar, left: 800, top: 210 }])
    .png({ compressionLevel: 9 })
    .toFile(new URL(`og-${lang}.png`, out).pathname);
  console.log(`public/og/og-${lang}.png`);
}
