// Rebuilds public/images/optimized/*.webp at full source resolution and high quality.
// Source → output pairs are read from the two original optimisation scripts, so filenames stay identical.
// Usage: node scripts/rebuild-hd-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'images', 'optimized');
const MAX_EDGE = 2400;

function pairsFrom(script, dir, srcKey, destKey, ext) {
  const text = fs.readFileSync(path.join(ROOT, 'scripts', script), 'utf8');
  const re = new RegExp(`${srcKey}[^'"]*['"]([^'"]+\\.png)['"][\\s\\S]*?${destKey}:\\s*['"]([^'"]+)['"]`, 'g');
  return [...text.matchAll(re)].map(([, src, dest]) => ({
    src: path.join(ROOT, 'public', ...dir, src),
    dest: dest.endsWith('.webp') ? dest : `${dest}${ext}`,
  }));
}

const pairs = [
  ...pairsFrom('prepare-optimized-assets.mjs', ['new images'], 'NEW_IMAGES_DIR,', 'destSlug', '.webp'),
  ...pairsFrom('prepare-optimized-assets.mjs', ['images', 'real'], 'REAL_IMAGES_DIR,', 'destSlug', '.webp'),
  ...pairsFrom('optimize-new-images-2.mjs', ['new images 2'], 'src:', 'dest', ''),
];

for (const { src, dest } of pairs) {
  if (!fs.existsSync(src)) {
    console.warn('missing source:', src);
    continue;
  }
  const meta = await sharp(src).metadata();
  // Tiny sources (screenshots) would only get worse; leave them alone.
  if (meta.width < 800) {
    console.warn(`skip ${dest}: source only ${meta.width}x${meta.height}`);
    continue;
  }
  const info = await sharp(src)
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, dest));
  console.log(`${dest}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}

// Extra HD landscape images used only by the gallery (no earlier optimised copy existed).
const GALLERY_EXTRAS = [
  ['new images/Modern Glass Office and Future-Focused Design (1).png', 'glass-office-sunset-panorama.webp'],
  ['hero-exact.png', 'villa-poolside-glass-facade.webp'],
  ['new images/Custom Glass Solutions Showroom-7.png', 'custom-glass-lakeview-living.webp'],
  ['new images/Modern Glass Home with Mountain Views-6.png', 'glass-home-mountain-views.webp'],
  ['new images/Modern Luxury Glass Architecture-5.png', 'luxury-glass-corner-terrace.webp'],
  ['new images/Slim Glass Partitions in a Modern City Interior-2.png', 'slim-partitions-city-interior.webp'],
  ['new images/Stronger Glass, Safer Spaces-4.png', 'toughened-glass-hillside-living.webp'],
  ['new images/Toughened Glass Modern Architecture-8.png', 'toughened-glass-cantilever-terrace.webp'],
];

for (const [src, dest] of GALLERY_EXTRAS) {
  const info = await sharp(path.join(ROOT, 'public', src))
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, dest));
  console.log(`${dest}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}

// Footer poster: the source stacks two banners; split them at the bright divider row.
{
  const src = path.join(ROOT, 'public', 'new images', 'Modern Glass Office and Future-Focused Design (1).png');
  const { data, info } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true });
  let divider = 0;
  let best = 0;
  for (let y = Math.floor(info.height * 0.4); y < info.height * 0.6; y++) {
    let sum = 0;
    for (let x = 0; x < info.width; x++) sum += data[y * info.width + x];
    if (sum > best) [best, divider] = [sum, y];
  }
  const parts = [
    ['footer-poster-brand.webp', 0, divider - 3],
    ['footer-poster-tagline.webp', divider + 4, info.height - divider - 4],
  ];
  for (const [dest, top, height] of parts) {
    const out = await sharp(src)
      .extract({ left: 0, top, width: info.width, height })
      .webp({ quality: 92, effort: 6, smartSubsample: true })
      .toFile(path.join(OUT, dest));
    console.log(`${dest}  ${out.width}x${out.height}  (divider at y=${divider})`);
  }
}
