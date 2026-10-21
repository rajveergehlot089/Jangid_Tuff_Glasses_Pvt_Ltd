import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sourceDir = path.join(process.cwd(), 'assets', 'source-images', 'new images 2');
const targetDir = path.join(process.cwd(), 'public', 'images', 'optimized');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (1).png',
    dest: 'hardware-shower-sliding-enclosure.webp',
    title: 'Frameless Shower Hardware & Sliding Track Systems',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (10).png',
    dest: 'hardware-shower-cubicle-hinge.webp',
    title: 'Frameless Glass Shower Enclosure with Brass Hinges',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (2).png',
    dest: 'hardware-slim-partition-profiles.webp',
    title: 'Slimline Aluminum Glass Partition Profiles',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (3).png',
    dest: 'processing-tempering-furnace-line.webp',
    title: 'Continuous Glass Tempering Furnace Line',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (4).png',
    dest: 'processing-specialty-glass-finishes.webp',
    title: 'Architectural Fluted, Tinted, and Frosted Glass Samples',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (5).png',
    dest: 'hardware-balustrade-railing-mounts.webp',
    title: 'Architectural Balustrade Railing Mounts & Spigots',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (6).png',
    dest: 'processing-cnc-edge-polishing.webp',
    title: 'Industrial CNC Glass Edge Polishing Machinery',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (7).png',
    dest: 'processing-waterjet-hole-drilling.webp',
    title: 'CNC Waterjet Glass Cutout and Hole Drilling Machine',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (8).png',
    dest: 'processing-fluted-decorative-glass.webp',
    title: 'Decorative Reeded and Fluted Glass Finishes',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke (9).png',
    dest: 'hardware-commercial-entrance-doors.webp',
    title: 'Commercial Frameless Entrance Doors with Patch Fittings',
  },
  {
    src: 'Gemini_Generated_Image_ytkezaytkezaytke.png',
    dest: 'hardware-door-controls-patch-fittings.webp',
    title: 'Architectural Door Controls, Hydraulic Floor Springs & Patch Fittings',
  },
];

console.log('Optimizing 11 images from "public/new images 2" to WebP...');

for (const item of mapping) {
  const srcPath = path.join(sourceDir, item.src);
  const destPath = path.join(targetDir, item.dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`Missing source file: ${srcPath}`);
    continue;
  }

  const cmd = `ffmpeg -y -i "${srcPath}" -vf "scale=1200:-1:flags=lanczos" -c:v libwebp -quality 85 -preset photo "${destPath}"`;
  execSync(cmd);

  const srcStat = fs.statSync(srcPath);
  const destStat = fs.statSync(destPath);
  const srcMB = (srcStat.size / (1024 * 1024)).toFixed(2);
  const destKB = (destStat.size / 1024).toFixed(1);

  console.log(`✓ ${item.dest}: ${srcMB} MB -> ${destKB} KB (${item.title})`);
}

console.log('All 11 images successfully optimized!');
