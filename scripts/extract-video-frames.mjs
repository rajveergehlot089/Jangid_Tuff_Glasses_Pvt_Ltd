// Extracts the homepage scroll-animation frames from the dusk tour video at native resolution,
// cropped to exclude the watermark corner.
// Only frame_*.webp files are replaced; intro_*.webp and the poster are left alone.
// Usage: node scripts/extract-video-frames.mjs   (then: node scripts/build-intro-frames.mjs)
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const VIDEO = path.join(ROOT, 'assets', 'video', 'cinematic-dusk-tour.mp4');
const DIR = path.join(ROOT, 'public', 'images', 'cinematic-frames');
const FPS = Number(process.env.FRAME_FPS || 12); // 20s video × 12 fps = 240 frames
const QUALITY = 90;
// The video carries a Gemini sparkle near the bottom-right (centre ≈ 1160, 600). Keeping the left
// 1110 px (16:9, vertically centred) leaves it out of every frame with no retouching.
const CROP = 'crop=1110:624:0:48';

for (const f of fs.readdirSync(DIR)) if (/^frame_\d+\.webp$/.test(f)) fs.unlinkSync(path.join(DIR, f));

// No scaling: the video is already 1280x720, so frames keep their full source detail.
execSync(
  `ffmpeg -v error -y -i "${VIDEO}" -vf "fps=${FPS},${CROP}" -c:v libwebp -quality ${QUALITY} -compression_level 6 -preset photo "${path.join(DIR, 'frame_%03d.webp')}"`,
  { stdio: 'inherit' }
);

const frames = fs.readdirSync(DIR).filter((f) => /^frame_\d+\.webp$/.test(f));
const bytes = frames.reduce((n, f) => n + fs.statSync(path.join(DIR, f)).size, 0);
console.log(`${frames.length} frames, ${(bytes / 1048576).toFixed(1)} MB total, ${(bytes / frames.length / 1024).toFixed(0)} KB avg`);
