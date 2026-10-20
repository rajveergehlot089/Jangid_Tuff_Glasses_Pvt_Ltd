import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const VIDEO_PATH = path.join(ROOT_DIR, 'public', 'new images', 'Video Project 3 (1).mp4');
const FRAMES_DIR = path.join(ROOT_DIR, 'public', 'images', 'cinematic-frames');

console.log('--- JANGID TUFF GLASSES VIDEO FRAME EXTRACTION ---');
console.log('Source video:', VIDEO_PATH);
console.log('Target directory:', FRAMES_DIR);

if (!fs.existsSync(VIDEO_PATH)) {
  console.error('ERROR: Video file not found at', VIDEO_PATH);
  process.exit(1);
}

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

// Clear any existing test files in frames dir
const existingFiles = fs.readdirSync(FRAMES_DIR);
for (const file of existingFiles) {
  fs.unlinkSync(path.join(FRAMES_DIR, file));
}

// 14.3 seconds total video.
// Extracting at ~8.4 frames per second gives exactly 120 frames.
// 120 frames at 1280x720 WebP (quality 80) is ~25-30 KB per frame -> ~3.5MB total sequence!
// Perfect for canvas scrubbing and ultra-fast progressive loading on Vercel.
console.log('Extracting 120 sequential frames (1280x720, WebP quality 80)...');

const ffmpegCmd = [
  'ffmpeg',
  '-y',
  '-i', `"${VIDEO_PATH}"`,
  '-vf', '"fps=120/14.3,scale=1280:720:flags=lanczos"',
  '-c:v', 'libwebp',
  '-quality', '80',
  '-preset', 'photo',
  `"${path.join(FRAMES_DIR, 'frame_%03d.webp')}"`
].join(' ');

console.log('Running command:', ffmpegCmd);
execSync(ffmpegCmd, { stdio: 'inherit' });

const generatedFrames = fs.readdirSync(FRAMES_DIR).filter(f => f.endsWith('.webp'));
console.log(`Successfully generated ${generatedFrames.length} frames.`);

let totalBytes = 0;
for (const f of generatedFrames) {
  totalBytes += fs.statSync(path.join(FRAMES_DIR, f)).size;
}

const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
const avgKB = (totalBytes / generatedFrames.length / 1024).toFixed(1);
console.log(`Total sequence size: ${totalMB} MB (Average: ${avgKB} KB / frame)`);

// Generate high-res poster and low-res blur poster
const firstFrame = path.join(FRAMES_DIR, generatedFrames[0]);
const posterWebp = path.join(FRAMES_DIR, 'poster.webp');
const posterBlur = path.join(FRAMES_DIR, 'poster-blur.webp');

fs.copyFileSync(firstFrame, posterWebp);
console.log('Created poster.webp from first frame.');

// Low-res blur poster for instant perception
const blurCmd = [
  'ffmpeg',
  '-y',
  '-i', `"${firstFrame}"`,
  '-vf', '"scale=320:180:flags=lanczos,boxblur=5:5"',
  '-c:v', 'libwebp',
  '-quality', '50',
  `"${posterBlur}"`
].join(' ');
execSync(blurCmd, { stdio: 'inherit' });
console.log('Created low-res blurred placeholder poster.');

// Write metadata manifest for client loader
const manifest = {
  totalFrames: generatedFrames.length,
  framePattern: '/images/cinematic-frames/frame_%03d.webp',
  poster: '/images/cinematic-frames/poster.webp',
  posterBlur: '/images/cinematic-frames/poster-blur.webp',
  aspectRatio: 16 / 9,
  width: 1280,
  height: 720,
  totalSizeMB: parseFloat(totalMB),
  avgFrameKB: parseFloat(avgKB),
  fps: 120 / 14.3,
  durationSeconds: 14.3,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(FRAMES_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf-8'
);
console.log('Generated frames manifest:', path.join(FRAMES_DIR, 'manifest.json'));
