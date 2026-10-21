// Builds the blue-hour intro for the homepage scroll animation: the mansion at dusk holds with a
// slow push-in, then dissolves into the daylight frame_001 so the sequence continues seamlessly.
// Usage: node scripts/build-intro-frames.mjs
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'public', 'images', 'cinematic-frames');
const SRC = path.join(ROOT, 'assets', 'source-images', 'new images', 'cinematic-blue-hour-mansion.png');
const W = 1280;
const H = 720;
const COUNT = 24; // keep in sync with INTRO_FRAMES in CinematicScrollHero.jsx
const HOLD = 6; // frames that show pure blue hour before the dissolve starts

const smooth = (t) => t * t * (3 - 2 * t);

async function frameAt(scale) {
  // Push-in by cropping the centre, so the framing ends up matching frame_001.
  const meta = await sharp(SRC).metadata();
  const cw = Math.round(meta.width / scale);
  const ch = Math.round(meta.height / scale);
  return sharp(SRC)
    .removeAlpha()
    .extract({ left: Math.round((meta.width - cw) / 2), top: Math.round((meta.height - ch) / 2), width: cw, height: ch })
    .resize(W, H, { fit: 'cover' })
    .raw()
    .toBuffer();
}

const day = await sharp(path.join(DIR, 'frame_001.webp')).removeAlpha().resize(W, H, { fit: 'cover' }).raw().toBuffer();

for (let i = 0; i < COUNT; i++) {
  const t = i / (COUNT - 1);
  const dusk = await frameAt(1 + 0.02 * t);
  const mix = i < HOLD ? 0 : smooth((i - HOLD) / (COUNT - 1 - HOLD));
  const out = Buffer.alloc(dusk.length);
  for (let p = 0; p < dusk.length; p++) out[p] = Math.round(dusk[p] * (1 - mix) + day[p] * mix);
  const name = `intro_${String(i + 1).padStart(3, '0')}.webp`;
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 88 }).toFile(path.join(DIR, name));
}

// Blurred poster shown while frames load now opens on blue hour too.
await sharp(SRC).resize(320, 180, { fit: 'cover' }).blur(2).webp({ quality: 60 }).toFile(path.join(DIR, 'poster-blur.webp'));
console.log(`built ${COUNT} intro frames + poster`);
