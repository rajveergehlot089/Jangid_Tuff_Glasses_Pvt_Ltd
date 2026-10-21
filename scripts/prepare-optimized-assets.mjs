import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const NEW_IMAGES_DIR = path.join(ROOT_DIR, 'assets', 'source-images', 'new images');
const REAL_IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images', 'real');
const OPT_DIR = path.join(ROOT_DIR, 'public', 'images', 'optimized');

if (!fs.existsSync(OPT_DIR)) {
  fs.mkdirSync(OPT_DIR, { recursive: true });
}

// Master mapping of assets with rich metadata, strictly adhering to authenticity rules
const ASSET_CATALOG = [
  // ─── Company Real Photography ───
  {
    id: 'factory-front-original',
    sourceFile: path.join(REAL_IMAGES_DIR, 'factory-front-original.jpg'),
    destSlug: 'factory-front-boranada',
    altText: 'Original photograph of Jangid Tuff Glasses Private Limited factory in Boranada Jodhpur Rajasthan',
    subject: 'Factory Front Exterior with JANGID TUFF GLASSES PVT. LTD. signage and inaugural decoration',
    category: 'factory',
    intendedPages: ['/about', '/contact', '/'],
    isActualCompanyWork: true,
    provenance: 'Genuine Company Photograph (Google Maps Listing Source)'
  },
  {
    id: 'factory-concept-reference',
    sourceFile: path.join(REAL_IMAGES_DIR, 'factory-concept-reference.png'),
    destSlug: 'showroom-concept-reference',
    altText: 'Architectural showroom concept design with Jangid Tuff Glasses facade rendering',
    subject: 'Showroom Concept Visualization with Illuminated Glass Facade',
    category: 'reference',
    intendedPages: ['/about', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'Supplied Concept Rendering (Google Maps Reference Asset)'
  },

  // ─── Curated Product & Architectural Glazing Assets (from public/new images) ───
  {
    id: 'led-mirror-luxury-vanity',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_66arih66arih66ar.png'),
    destSlug: 'led-mirror-bathroom-vanity',
    altText: 'Designer rectangular backlit LED vanity mirror with integrated touch switch in modern bathroom',
    subject: 'Mirrors & LED Mirrors',
    category: 'mirrors-led-mirrors',
    intendedPages: ['/products/mirrors-led-mirrors', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Concept'
  },
  {
    id: 'shower-enclosure-corner',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_dcek0ldcek0ldcek.png'),
    destSlug: 'shower-enclosure-frameless-corner',
    altText: 'Frameless toughened glass corner shower enclosure cubicle with stainless steel hinges and stabilizer bar',
    subject: 'Shower Enclosures',
    category: 'shower-enclosures',
    intendedPages: ['/products/shower-enclosures', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Concept'
  },
  {
    id: 'shower-enclosure-portrait',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_i2s02ni2s02ni2s0.png'),
    destSlug: 'shower-enclosure-frameless-walkin',
    altText: 'Custom frameless toughened glass shower door and partition with stainless steel hardware in marble bathroom',
    subject: 'Shower Enclosures',
    category: 'shower-enclosures',
    intendedPages: ['/products/shower-enclosures', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Concept'
  },
  {
    id: 'railing-staircase-luxury',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_3meheh3meheh3meh.png'),
    destSlug: 'railing-floating-staircase-glass',
    altText: 'Cantilevered floating wooden staircase with structural toughened glass balustrade and stainless steel point-fixed standoffs',
    subject: 'Railing & Balustrade Glass',
    category: 'railing-balustrade-glass',
    intendedPages: ['/products/railing-balustrade-glass', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'railing-terrace-balcony',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_66arih66arih66ar (1).png'),
    destSlug: 'railing-terrace-spigots-balcony',
    altText: 'Frameless glass balcony railing with stainless steel floor spigots on luxury villa terrace with sea view',
    subject: 'Railing & Balustrade Glass',
    category: 'railing-balustrade-glass',
    intendedPages: ['/products/railing-balustrade-glass', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'railing-highrise-channel',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_9alukj9alukj9alu.png'),
    destSlug: 'railing-continuous-base-channel',
    altText: 'Monolithic toughened glass balustrade in continuous aluminum base shoe channel overlooking city skyline',
    subject: 'Railing & Balustrade Glass',
    category: 'railing-balustrade-glass',
    intendedPages: ['/products/railing-balustrade-glass', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'partitions-corporate-office',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_3zuojq3zuojq3zuo.png'),
    destSlug: 'partitions-corporate-conference-room',
    altText: 'Modern office conference room enclosed by clear toughened glass partitions with patch-fitted doors and handles',
    subject: 'Slim Glass Partitions',
    category: 'slim-glass-partitions',
    intendedPages: ['/products/slim-glass-partitions', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'decorative-glass-fluted',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_8jtddu8jtddu8jtd.png'),
    destSlug: 'decorative-fluted-reeded-glass',
    altText: 'Architectural fluted reeded decorative glass partition screen in bronze metal frame',
    subject: 'Decorative Glass',
    category: 'decorative-glass',
    intendedPages: ['/products/decorative-glass', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Reference'
  },
  {
    id: 'glass-table-top-dining',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_do0931do0931do09.png'),
    destSlug: 'table-top-circular-beveled-glass',
    altText: 'Heavy circular toughened glass table top with flat polished beveled edge on solid wood dining base',
    subject: 'Glass Table Tops',
    category: 'glass-table-tops',
    intendedPages: ['/products/glass-table-tops', '/products', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Reference'
  },
  {
    id: 'toughened-glass-pillar-mount',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_66arih66arih66ar (2).png'),
    destSlug: 'toughened-glass-standoff-mount',
    altText: 'Heavy-duty toughened glass panel with polished edges and BS EN 12150 stamp mounted on concrete pillar with stainless steel standoffs',
    subject: 'Toughened Glass & Safety Certification',
    category: 'toughened-glass',
    intendedPages: ['/products/toughened-glass', '/products', '/gallery', '/about', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Technical Reference'
  },
  {
    id: 'toughened-glass-double-height',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_8z0z1z8z0z1z8z0z.png'),
    destSlug: 'structural-glazing-double-height-villa',
    altText: 'Monumental double-height architectural glass curtain wall and structural glass staircase in modern villa',
    subject: 'Toughened Glass & Structural Glazing',
    category: 'toughened-glass',
    intendedPages: ['/products/toughened-glass', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Concept'
  },
  {
    id: 'hardware-fittings-collection',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_z5g42xz5g42xz5g4.png'),
    destSlug: 'architectural-hardware-fittings-stainless',
    altText: 'Precision 304/316 grade stainless steel architectural glass hardware fittings: shower hinges, spigots, clamps and glass samples',
    subject: 'Architectural Hardware & Profile Systems',
    category: 'hardware',
    intendedPages: ['/services', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Product Reference'
  },
  {
    id: 'commercial-entrance-canopy',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Modern Glass Atrium Entrance-1.png'),
    destSlug: 'commercial-atrium-canopy-entrance',
    altText: 'Modern commercial building entrance with cantilevered glass canopy, frameless glass doors and full architectural glazing',
    subject: 'Commercial Glazing & Canopies',
    category: 'commercial',
    intendedPages: ['/services', '/gallery', '/products/custom-architectural-glass'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'corporate-spider-canopy',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_qnhvz9qnhvz9qnhv.png'),
    destSlug: 'corporate-spider-fitting-canopy',
    altText: 'Corporate entrance with suspended glass canopy mounted on stainless steel spider brackets and frameless entry doors',
    subject: 'Commercial Glazing & Spider Fittings',
    category: 'commercial',
    intendedPages: ['/services', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'custom-pavilion-terrace',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Luxury Glass-Faced Modern Pavilion-3.png'),
    destSlug: 'custom-architectural-glass-pavilion',
    altText: 'Pristine architectural glass corner pavilion opening onto expansive stone terrace with panoramic sunset sky',
    subject: 'Custom Architectural Glass',
    category: 'custom-architectural-glass',
    intendedPages: ['/products/custom-architectural-glass', '/products', '/gallery', '/'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Reference'
  },
  {
    id: 'retail-storefront-glazing',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_4orqom4orqom4orq.png'),
    destSlug: 'retail-storefront-curtain-wall',
    altText: 'Architectural retail storefront with double-height glass curtain wall and frameless corner entrance',
    subject: 'Commercial Storefronts & Display Glazing',
    category: 'commercial',
    intendedPages: ['/services', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Concept'
  },
  {
    id: 'estate-villa-aerial',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Gemini_Generated_Image_6rq4lk6rq4lk6rq4.png'),
    destSlug: 'architectural-villa-coastal-estate',
    altText: 'Luxury modern villa complex with multi-level glass facades, glass railings, and private swimming pools',
    subject: 'Architectural Glass Projects',
    category: 'architectural',
    intendedPages: ['/gallery', '/about'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Architectural Concept'
  },
  {
    id: 'glass-samples-swatches',
    sourceFile: path.join(NEW_IMAGES_DIR, 'Quality Glass for a Brighter Tomorrow.png'),
    destSlug: 'glass-types-clear-frosted-tinted-fluted',
    altText: 'Comparative display of architectural glass types: Clear Toughened, Frosted Satin, Tinted Bronze, and Fluted Reeded Glass',
    subject: 'Glass Types & Finish Comparison',
    category: 'float-clear-glass',
    intendedPages: ['/products/float-clear-glass', '/products', '/gallery'],
    isActualCompanyWork: false,
    provenance: 'AI-Generated Material Comparison Reference'
  }
];

async function processAssets() {
  console.log('--- OPTIMIZING ASSETS & GENERATING MANIFEST ---');
  const manifestEntries = [];

  for (const asset of ASSET_CATALOG) {
    if (!fs.existsSync(asset.sourceFile)) {
      console.warn('WARNING: Missing file:', asset.sourceFile);
      continue;
    }

    const sourceStats = fs.statSync(asset.sourceFile);
    const sourceMeta = await sharp(asset.sourceFile).metadata();

    const optWebpName = `${asset.destSlug}.webp`;
    const optWebpPath = path.join(OPT_DIR, optWebpName);

    // Resize high-res images to max 1600px width/height while preserving aspect ratio, convert to webp 85
    await sharp(asset.sourceFile)
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(optWebpPath);

    const optStats = fs.statSync(optWebpPath);
    const optMeta = await sharp(optWebpPath).metadata();

    const entry = {
      id: asset.id,
      slug: asset.destSlug,
      originalFilename: path.basename(asset.sourceFile),
      originalPath: asset.sourceFile.replace(ROOT_DIR, '').replace(/\\/g, '/'),
      originalSizeKB: Math.round(sourceStats.size / 1024),
      originalDimensions: { width: sourceMeta.width, height: sourceMeta.height },
      webPath: `/images/optimized/${optWebpName}`,
      webSizeKB: Math.round(optStats.size / 1024),
      webDimensions: { width: optMeta.width, height: optMeta.height },
      altText: asset.altText,
      subject: asset.subject,
      category: asset.category,
      intendedPages: asset.intendedPages,
      isActualCompanyWork: asset.isActualCompanyWork,
      provenance: asset.provenance
    };

    manifestEntries.push(entry);
    console.log(`Processed ${asset.destSlug}: ${entry.originalSizeKB}KB -> ${entry.webSizeKB}KB (${entry.webDimensions.width}x${entry.webDimensions.height})`);
  }

  // Generate lib/site-assets.js
  const jsContent = `// ─────────────────────────────────────────────────────────────────────────────
// JANGID TUFF GLASSES — MASTER ASSET MANIFEST & PROVENANCE REGISTRY
// Automatically audited and verified from project source files.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_ASSETS = ${JSON.stringify(manifestEntries, null, 2)};

export const ASSET_MAP = Object.fromEntries(
  SITE_ASSETS.map((asset) => [asset.id, asset])
);

export function getAsset(id) {
  return ASSET_MAP[id] || null;
}

export function getAssetsByCategory(category) {
  return SITE_ASSETS.filter((asset) => asset.category === category);
}

export function getAssetsForPage(pagePath) {
  return SITE_ASSETS.filter((asset) => asset.intendedPages.includes(pagePath));
}
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'lib', 'site-assets.js'), jsContent, 'utf-8');
  console.log('Saved master asset manifest to lib/site-assets.js');

  // Also save a JSON copy
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'images', 'asset-inventory.json'), JSON.stringify(manifestEntries, null, 2), 'utf-8');
  console.log('Saved JSON inventory to public/images/asset-inventory.json');
}

processAssets().catch(err => {
  console.error('Asset processing failed:', err);
  process.exit(1);
});
