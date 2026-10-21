// ─── Company Information ───────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Jangid Tuff Glasses Private Limited',
  nameShort: 'Jangid Tuff Glasses',
  nameHindi: 'जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड',
  tagline: 'Glass that brings your vision to life.',
  description:
    'Toughened glass, mirrors, partitions and custom glass solutions for residential, commercial and architectural spaces in Jodhpur, Rajasthan.',
  contactPerson: 'Karan Jangid',
  phone: '+91 81073 88855',
  phoneRaw: '+918107388855',
  // Secondary line, as listed on the company's Google Business Profile.
  phoneAlt: '+91 92510 77483',
  phoneAltRaw: '+919251077483',
  whatsapp: '918107388855',
  address: {
    street: '21 Narnadi, Boranada, Pal',
    city: 'Jodhpur',
    state: 'Rajasthan',
    zip: '342017',
    country: 'India',
    full: '21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017, India',
  },
  mapsQuery: 'https://maps.app.goo.gl/m5QGZXp7oTFtbjoh6',
  mapsPlaceUrl: 'https://maps.app.goo.gl/m5QGZXp7oTFtbjoh6',
  social: {
    instagram: 'https://www.instagram.com/jangidglassco/',
    instagramHandle: '@jangidglassco',
    facebook:
      'https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/',
  },
  listings: {
    ozone:
      'https://stores.ozone.in/ozone-india-jangid-glass-shilp-gram-pal-road-jodhpur-ozdlr30034',
    zaubacorp:
      'https://www.zaubacorp.com/company/JANGID-TUFF-GLASSES-PRIVATE-LIMITED/U25209RJ2024PTC098277',
  },
  cin: 'U23109RJ2025PTC102882',
  cinNote:
    'Corporate Identity Number supplied by project owner: U23109RJ2025PTC102882. External ZaubaCorp listing references company under U25209RJ2024PTC098277 pending MCA reconciliation. Information is presented factually without unverified claims.',
  hours: 'Monday – Saturday: 10:00 AM – 7:00 PM IST · Sunday closed',
  themeColor: '#08233f',
};

// Aliases for component compatibility
export const BUSINESS = {
  name: COMPANY.nameShort,
  tagline: 'Private Limited',
  legalName: COMPANY.name,
  hindiName: COMPANY.nameHindi,
};

export const CONTACT = {
  contactPerson: COMPANY.contactPerson,
  phone: COMPANY.phone,
  phoneRaw: COMPANY.phoneRaw,
  whatsapp: COMPANY.whatsapp,
  whatsappMessage: 'Hello Jangid Tuff Glasses, I have an enquiry regarding glass products.',
  address: COMPANY.address.full,
  addressShort: `${COMPANY.address.street}, ${COMPANY.address.city}`,
  city: COMPANY.address.city,
  state: COMPANY.address.state,
  pincode: COMPANY.address.zip,
  instagram: COMPANY.social.instagram,
  facebook: COMPANY.social.facebook,
  mapsUrl: COMPANY.mapsQuery,
};

export const SOCIAL_LINKS = {
  instagram: COMPANY.social.instagram,
  facebook: COMPANY.social.facebook,
};

// ─── Navigation ────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  explore: [
    { label: 'About us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
};

// ─── Product Categories ────────────────────────────────────────────────────────

export const PRODUCT_CATEGORIES = [
  {
    slug: 'toughened-glass',
    name: 'Toughened Glass',
    tag: 'Architectural solutions',
    description:
      'Heat-treated tempered safety glass with high impact resistance and thermal durability. Engineered for structural architectural glazing, entrance systems, partitions, and exterior envelopes.',
    technicalSummary:
      'Manufactured by heating annealed float glass to approximately 650°C followed by uniform rapid air quenching. Creates high compressive surface stresses balanced by internal tensile stresses.',
    thicknessOptions: ['5 mm', '6 mm', '8 mm', '10 mm', '12 mm', '15 mm', '19 mm'],
    availableFinishes: ['Clear Float', 'Extra Clear / Low Iron', 'Tinted (Grey / Bronze / Green)', 'Frosted / Acid-Etched'],
    fabricationConstraints:
      'CRITICAL: Toughened glass CANNOT be cut, drilled, or edge-worked after tempering furnace processing. All notches, hinge cutouts, holes, and polished edges must be fully finalized and verified before production.',
    structuralGuidance:
      'Structural thickness and wind-load suitability must be calculated based on panel dimensions, aspect ratios, building height, deflection limits, and support geometry per Indian and international building standards.',
    compatibleHardware: [
      'Heavy-duty patch fittings & top pivots',
      'Floor spring mechanisms (Ozone / Dorma compatible)',
      'Point-fixed architectural spider fittings',
      'Stainless steel glass-to-wall & glass-to-glass clamps',
    ],
    applications: [
      'Frameless entrance doors & shopfronts',
      'Building facades & curtain wall glazing',
      'Commercial office partitions',
      'Windows, skylights & architectural canopies',
      'Structural glass fins & balustrades',
    ],
    features: [
      '4–5× higher mechanical strength than annealed glass',
      'Safety fracture: fragments into small, blunt granular dice',
      'Enhanced thermal shock resistance engineered for architectural temperature fluctuations',
      'Precision CNC edge-polishing and custom cutouts',
    ],
    image: '/images/optimized/toughened-glass-standoff-mount.webp',
    categoryGroup: 'architectural',
  },
  {
    slug: 'float-clear-glass',
    name: 'Float & Clear Glass',
    tag: 'Architectural solutions',
    description:
      'Precision-manufactured float glass offering superior light transmission and natural color rendition. Serves as the high-grade foundation substrate for clear glazing, mirrors, double-glazing units, and interior joinery.',
    technicalSummary:
      'Produced by floating molten glass over a molten tin bath, yielding parallel surfaces, uniform thickness, and high optical clarity.',
    thicknessOptions: ['4 mm', '5 mm', '6 mm', '8 mm', '10 mm', '12 mm'],
    availableFinishes: ['Clear Annealed', 'Ultra-Clear / Low-Iron (Starphire style)', 'Tinted Solar Control'],
    fabricationConstraints:
      'Standard annealed float glass can be cut, seamed, and drilled on site or in workshop prior to any heat-strengthening. Must not be used where safety glazing is mandated by code without lamination or tempering.',
    structuralGuidance:
      'Ideal for interior picture frames, display showcases, multi-pane insulated glass units (IGU), and non-impact interior architectural glazing.',
    compatibleHardware: [
      'Glazing beads & aluminum window sub-frames',
      'Silicone structural sealants & EPDM gaskets',
      'Showcase showcase profile channels & lock sets',
    ],
    applications: [
      'Residential window glazing & storefront displays',
      'Museum-grade showcases & retail display cabinets',
      'Furniture protection & interior shelving',
      'Raw substrate for mirror silvering and laminating',
    ],
    features: [
      'High visible light transmission for bright natural illumination (ultra-clear low-iron options available)',
      'Uniform thickness tolerance across full panel sheets',
      'Exceptional visual clarity and minimal distortion for crisp, unobstructed views',
      'Available in stock sheet sizes and cut-to-size dimensions',
    ],
    image: '/images/optimized/glass-types-clear-frosted-tinted-fluted.webp',
    categoryGroup: 'architectural',
  },
  {
    slug: 'mirrors-led-mirrors',
    name: 'Mirrors & LED Mirrors',
    tag: 'Interior solutions',
    description:
      'High-definition copper-free silver mirrors and bespoke backlit LED vanity mirrors. Engineered with integrated touch-sensor switching, color temperature control, and optional anti-fog demister pads for luxury bathrooms, dressing rooms, and retail spaces.',
    technicalSummary:
      'Fabricated with double-pass protective backing paint preventing edge corrosion, desilvering, and black spots in high-humidity Rajasthan environments. Front surface features 5mm or 6mm high-clarity float mirror glass with true reflection.',
    thicknessOptions: ['4 mm', '5 mm', '6 mm'],
    availableFinishes: ['High-Clarity Silver', 'Bronze Mirror', 'Grey / Smoked Mirror', 'Beveled Edge (12mm–25mm bevel)', 'Pencil Polished Edge'],
    fabricationConstraints:
      'Backlit electrical wiring requires concealed 220V AC junction boxes behind mirror center. Standard mirror adhesive must be solvent-free and non-acidic to preserve the silver reflective coating.',
    structuralGuidance:
      'Secure mounting utilizes concealed aluminum French cleats or perimeter J-channels rated for full glass weight.',
    compatibleHardware: [
      'IP65 water-resistant warm/neutral/cool white LED modules',
      'Capacitive touch sensors (dimming + tri-color toggle)',
      'Concealed PTC demister heat pads',
      'Heavy-duty aluminum hanging brackets',
    ],
    applications: [
      'Master bathroom vanity mirrors',
      'Full-length bedroom and wardrobe wall mirrors',
      'Luxury hotel, salon & spa dressing mirrors',
      'Retail fitting rooms & aesthetic feature accent walls',
    ],
    features: [
      'Copper-free silver coating with high oxidation resistance',
      'Energy-efficient 12V LED illumination with high CRI (90+)',
      'Touch-sensor single-touch on/off and press-and-hold dimming',
      'Bespoke shapes: Capsule, Arch, Organic pebble, Rectangle, Circle',
    ],
    image: '/images/optimized/led-mirror-bathroom-vanity.webp',
    categoryGroup: 'interior',
  },
  {
    slug: 'slim-glass-partitions',
    name: 'Slim Glass Partitions',
    tag: 'Interior solutions',
    description:
      'Minimalist aluminum-framed, grid-profile, and frameless acoustic glass partition walls. Designed to organize flexible commercial workspaces, executive cabins, and residential room dividers without sacrificing natural illumination.',
    technicalSummary:
      'Slimline architectural partition profiles (25mm to 45mm visible face) in matte black, champagne, and anodized finishes paired with 10mm or 12mm toughened safety glass.',
    thicknessOptions: ['10 mm', '12 mm toughened', '11.52 mm acoustic PVB laminated'],
    availableFinishes: ['Clear Toughened', 'Frosted / Acid-Etched Bands', 'Fluted / Reeded', 'Smoked Grey'],
    fabricationConstraints:
      'Floor-to-ceiling heights must be verified with laser level to account for floor undulation and false ceiling deflection before ordering custom glass heights.',
    structuralGuidance:
      'Full-height panels exceeding 2.7m require appropriate glass thickness (minimum 12mm) or intermediate mullions to limit deflection under human impact loads.',
    compatibleHardware: [
      'Slim architectural aluminum perimeter profiles',
      'Concealed acoustic bottom drop seals & EPDM gaskets',
      'Frameless pivot door hinge sets & magnetic latch handles',
      'Minimalist top track sliding door suspension carriages',
    ],
    applications: [
      'Corporate executive cabins & conference rooms',
      'Modern co-working spaces & commercial studios',
      'Residential living-to-dining acoustic dividers',
      'Home office glass enclosures & acoustic booths',
    ],
    features: [
      'Ultra-slim aluminum visual profile with hidden fasteners',
      'High acoustic isolation when paired with acoustic interlayers',
      'Frameless butt-joint glazing with clear polycarbonate H-joints',
      'Custom ceiling-to-floor heights tailored to site elevations',
    ],
    image: '/images/optimized/partitions-corporate-conference-room.webp',
    categoryGroup: 'interior',
  },
  {
    slug: 'shower-enclosures',
    name: 'Shower Enclosures',
    tag: 'Interior solutions',
    description:
      'Custom-engineered frameless, semi-frameless, and sliding shower cubicles fabricated in 8mm, 10mm, and 12mm toughened safety glass. Fitted with premium corrosion-proof 304/316 grade stainless steel hardware and water-tight magnetic seals.',
    technicalSummary:
      'Glass edges are flat polished with arris. Precision CNC waterjet cutouts accommodate heavy-duty wall-to-glass hinges, stabilizer support bars, and low-profile PVC water deflection threshold barriers.',
    thicknessOptions: ['8 mm', '10 mm', '12 mm toughened safety glass'],
    availableFinishes: ['Ultra-Clear Starphire', 'Standard Clear', 'Frosted Privacy Bands', 'Fluted Texture'],
    fabricationConstraints:
      'Hinge and clamp cutouts must be accurately positioned before tempering. Walls must be checked for plumbness; out-of-plumb walls require custom out-of-square glass CNC tapering.',
    structuralGuidance:
      'Door widths typically range between 600mm and 750mm to balance hinge load durability and effortless ergonomic opening swing.',
    compatibleHardware: [
      'Solid forged 304/316 stainless steel 90° and 180° shower hinges',
      'Wall-to-glass header stabilizer support rods & corner clamps',
      'Magnetic door closing seals & bottom water-drip sweeps',
      'Minimalist back-to-back cylindrical or square towel handles',
    ],
    applications: [
      'Frameless walk-in open wet-room screens',
      'Corner shower cubicles (90° glass-to-glass enclosure)',
      'Sliding shower enclosures with top roller bar systems',
      'Bathtub splash panels & folding glass bath screens',
    ],
    features: [
      'Heat-treated toughened safety glass resisting thermal stress and everyday impact',
      'Optional factory-applied hydrophobic easy-clean anti-limescale coating',
      'Heavy-duty hardware available in Matte Black, Brushed Gold, Rose Gold, and Mirror Chrome',
      'High-performance magnetic door seals and threshold containment for splash protection',
    ],
    image: '/images/optimized/shower-enclosure-frameless-corner.webp',
    categoryGroup: 'interior',
  },
  {
    slug: 'railing-balustrade-glass',
    name: 'Railing & Balustrade Glass',
    tag: 'Architectural solutions',
    description:
      'Heavy-duty toughened and laminated safety glass balustrades for balconies, staircases, terrace parapets, and atrium voids. Engineered to provide unobstructed panoramic views with high structural impact security.',
    technicalSummary:
      'Fabricated from heavy monolithic toughened glass (12mm/15mm) or laminated safety glass (e.g. 13.52mm or 17.52mm PVB/SentryGlas), providing residual structural integrity even in the unlikely event of breakage.',
    thicknessOptions: ['12 mm', '15 mm toughened', '13.52 mm (6+1.52+6)', '17.52 mm (8+1.52+8) laminated'],
    availableFinishes: ['Clear Float', 'Extra Clear / Low Iron', 'Tinted Smoked Grey', 'Frosted Parapet'],
    fabricationConstraints:
      'Holes for base spigots or standoff pins must maintain minimum distance from edge equal to 2x glass thickness to prevent stress concentration.',
    structuralGuidance:
      'Must withstand horizontal line loads (0.75 kN/m to 1.5 kN/m) mandated by building codes for residential and commercial parapet safety.',
    compatibleHardware: [
      'SS 304/316 grade duplex core-drilled or base-plate spigots',
      'Heavy continuous aluminum base channel shoe profiles with dry glazing wedges',
      'Side-mounted point-fixed stainless steel standoffs',
      'Slim stainless steel or wood top handrail profiles (slotted tube)',
    ],
    applications: [
      'Balcony balustrades & rooftop terrace barriers',
      'Internal open-riser staircase glass railings',
      'Commercial atrium safety balustrades',
      'Swimming pool surround safety glass fencing',
    ],
    features: [
      'Superior wind-load resistance and impact durability',
      'Laminated glass variant prevents panel collapse if shattered',
      'Weather-resistant 316-grade stainless hardware resisting outdoor corrosion',
      'Frameless seamless edge appearance maximizing light and vista',
    ],
    image: '/images/optimized/railing-floating-staircase-glass.webp',
    categoryGroup: 'architectural',
  },
  {
    slug: 'decorative-glass',
    name: 'Decorative Glass',
    tag: 'Interior solutions',
    description:
      'Bespoke decorative glass including fluted (reeded/ribbed), acid-etched frosted, colored lacquered backsplashes, and tinted glass. Transforms furniture, cabinetry, partitions, and feature walls into distinct design statements.',
    technicalSummary:
      'Combines light diffusion, textural tactile depth, and controlled visual privacy. Fluted glass features precision rolled linear ribs; lacquered glass uses heat-cured polyurethane backing paint.',
    thicknessOptions: ['4 mm', '5 mm', '8 mm', '10 mm (fluted & lacquered variants)'],
    availableFinishes: ['Narrow Fluted (6mm pitch)', 'Wide Fluted (12mm pitch)', 'Satin Acid Etched', 'Lacquered High Gloss', 'Tinted Bronze & Grey'],
    fabricationConstraints:
      'Lacquered glass is designed for interior opaque cladding and must be adhered using non-reactive neutral-cure silicones.',
    structuralGuidance:
      'Fluted glass can be toughened when supplied in 8mm and 10mm thicknesses for doors and partition panels.',
    compatibleHardware: [
      'Slim aluminum cabinet frame profiles (profile shutter systems)',
      'Concealed soft-close kitchen hinge mountings',
      'Perimeter channel tracks for sliding wardrobe doors',
    ],
    applications: [
      'Modular kitchen backsplashes & chimney surrounds',
      'Wardrobe sliding shutters & fluted display cabinets',
      'Feature accent panels in living rooms & hotel lobbies',
      'Privacy screening for interior bathroom windows & doors',
    ],
    features: [
      'Obscures direct sightlines while permitting soft natural illumination',
      'Heat-resistant and grease-cleanable kitchen backsplash surfaces',
      'Custom lacquered RAL / Asian Paints color-matching options',
      'Adds three-dimensional textural elegance to modern joinery',
    ],
    image: '/images/optimized/decorative-fluted-reeded-glass.webp',
    categoryGroup: 'interior',
  },
  {
    slug: 'glass-table-tops',
    name: 'Glass Table Tops',
    tag: 'Interior solutions',
    description:
      'Custom-cut and edge-polished glass surfaces for dining tables, executive desks, conference tables, and coffee tables. Available in clear, extra-clear, frosted, and smoked finishes with protective toughened treatment.',
    technicalSummary:
      'Produced in flat polished, pencil polished, or beveled edge configurations (12mm to 35mm bevel width). Tempered to withstand thermal shocks from hot crockery and heavy mechanical usage.',
    thicknessOptions: ['6 mm (protective table cover)', '8 mm', '10 mm', '12 mm (freestanding tops)'],
    availableFinishes: ['High-Gloss Flat Polished Edge', 'Classic Beveled Edge', 'Rounded Pencil Edge', 'Ogee Edge Finish'],
    fabricationConstraints:
      'Glass table tops intended to span open frames without full underlying substrate support require minimum 10mm or 12mm toughened specification.',
    structuralGuidance:
      'Corners can be fabricated with radius corners (5mm to 50mm radius) to prevent sharp corner hazards in family dining areas.',
    compatibleHardware: [
      'Transparent silicone anti-slip bumper pads',
      'UV-bonded stainless steel top adapter disks',
      'Solid wood or metal base framing integration',
    ],
    applications: [
      'Residential dining tables & breakfast counters',
      'Executive conference room tables & boardroom desks',
      'Living room coffee tables & bedside console tops',
      'Retail reception desks & display showcases',
    ],
    features: [
      'Scratch-resistant toughened safety glass surface',
      'Precision edge chamfering and diamond-polished borders',
      'Protects underlying valuable timber, veneer, or marble from stains',
      'Custom rectangular, racetrack oval, circular, and geometric shapes',
    ],
    image: '/images/optimized/table-top-circular-beveled-glass.webp',
    categoryGroup: 'interior',
  },
  {
    slug: 'custom-architectural-glass',
    name: 'Custom Architectural Glass',
    tag: 'Custom solutions',
    description:
      'Made-to-order bespoke glass solutions fabricated to project drawings, AutoCAD dimensions, and engineer specifications. Includes complex CNC shaped panels, overhead skylight glazing, glass stairs, and structural canopies.',
    technicalSummary:
      'Tailored fabrication utilizing CNC cutting tables, multi-axis waterjet machining, double-edge grinding, and computerized furnace tempering cycles configured for custom project geometries.',
    thicknessOptions: ['6 mm to 19 mm monolithic', 'Multi-layer laminated (SGP / PVB) up to 30mm+'],
    availableFinishes: ['Custom Polished', 'Mitered 45° Edge Joints', 'Ceramic Frit Printed', 'Low-E Insulated Units'],
    fabricationConstraints:
      'Detailed CAD drawings (.dwg/.dxf) with verified site datum lines are reviewed prior to production. Tolerances confirmed per project specification.',
    structuralGuidance:
      'Overhead glazing (canopies, skylights) mandates laminated safety glass to prevent fallout in event of panel fracture.',
    compatibleHardware: [
      'Engineered point-fixed articulated rotules & spider brackets',
      'Custom structural steel canopy bracketry & tension rods',
      'Heavy structural silicone glazing tapes & structural sealants',
    ],
    applications: [
      'Architectural entrance canopies & covered glass walkways',
      'Overhead atrium skylights & glass roof panels',
      'Structural glass treads & walk-on floor panels',
      'Unique commercial facade envelopes & storefront geometries',
    ],
    features: [
      'Bespoke production based strictly on architectural drawings',
      'CNC waterjet precision cutouts for lighting, locks, and brackets',
      'High load-bearing capacity engineered for commercial traffic',
      'Complete coordination from drawing review to crated site dispatch',
    ],
    image: '/images/optimized/custom-architectural-glass-pavilion.webp',
    categoryGroup: 'custom',
  },
];

// ─── Product Filter Tabs ───────────────────────────────────────────────────────

export const PRODUCT_FILTERS = [
  { label: 'All products', value: 'all' },
  { label: 'Architectural', value: 'architectural' },
  { label: 'Interior', value: 'interior' },
  { label: 'Custom', value: 'custom' },
];

// ─── Architectural Hardware & Profile Systems ──────────────────────────────────

export const HARDWARE_CATEGORIES = [
  {
    id: 'door-controls',
    title: 'Door Controls & Patch Fittings',
    description:
      'Engineered for frameless toughened glass entrance doors, meeting rooms, and vestibules. Fully compatible with high-traffic commercial and residential entries.',
    items: [
      'Top & bottom patch fittings with stainless steel grade 304/316 covers',
      'Heavy-duty hydraulic floor springs (standard 75kg–120kg weight capacity)',
      'Overhead concealed transom closers & pivot assemblies',
      'Locking bottom patch locks with euro-profile safety cylinders',
    ],
  },
  {
    id: 'shower-hardware',
    title: 'Shower Enclosure Fittings & Hinges',
    description:
      'Solid brass and stainless steel moisture-proof components for frameless and sliding shower enclosures.',
    items: [
      'Wall-to-glass and glass-to-glass 90° & 180° heavy-duty shower hinges',
      'Water-deflecting magnetic PVC door seals & translucent bottom drip sweeps',
      'Top-roller sliding track kits with stainless steel tubular rail',
      'Rigid wall-to-glass stabilizer header reinforcement bars',
    ],
  },
  {
    id: 'partition-profiles',
    title: 'Slim Partition & Framing Profiles',
    description:
      'Architectural aluminum profiles for modern office cabins, conference partitions, and luxury home dividers.',
    items: [
      'Ultra-slim 25mm to 45mm visible face perimeter U-channels & glazing beads',
      'Mullion and transom grid bars for Crittall-style aesthetic screens',
      'Acoustic dry-glaze EPDM gaskets for vibration and noise dampening',
      'Concealed door jamb profiles with integrated magnetic strike plates',
    ],
  },
  {
    id: 'railing-hardware',
    title: 'Balustrade & Railing Systems',
    description:
      'Structural mounting components tested for balustrades, staircase edges, terraces, and pool fencing.',
    items: [
      'Duplex 2205 / SS 316 core-drilled & surface base-plate spigots',
      'Heavy continuous bottom aluminum shoe channels with wedge locking systems',
      'Side-mount heavy point-fixed architectural standoff pins',
      'Slotted top handrails in stainless steel and architectural finishes',
    ],
  },
];

// ─── Interior Design & Project Collaboration ───────────────────────────────────

export const INTERIOR_SOLUTIONS = [
  {
    title: 'Architect & Interior Designer Support',
    description:
      'We work directly from AutoCAD layouts, architectural elevations, and material schedules to advise on load limits, glass thickness suitability, and hardware cutouts.',
  },
  {
    title: 'Bespoke Residential Upgrades',
    description:
      'From custom LED vanity mirrors and walk-in shower screens to fluted bar cabinets and dining table covers, crafted to individual room measurements.',
  },
  {
    title: 'Commercial Office & Retail Glazing',
    description:
      'Acoustic conference room partitions, branded executive cabin doors, retail shopfront facades, and display showcases engineered for durability.',
  },
  {
    title: 'Measurement & Logistics Coordination',
    description:
      'Clear guidance on measuring site clearances, floor leveling allowances, and safely coordinating crated delivery to project sites in Jodhpur and Rajasthan.',
  },
];

// ─── Services ──────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: 'consultation',
    name: 'Glass Product Consultation',
    description:
      'Discuss intended use, appearance, thickness and other project specifications with our team.',
    details:
      'Whether you need guidance on glass type, finish, or suitability for your application, our consultation service helps you explore the right options before committing. Share your project goals and we will walk you through available products.',
    icon: 'MessageSquare',
  },
  {
    id: 'custom-sizing',
    name: 'Custom Sizing & Precision Cutting',
    description:
      'Share dimensions or drawings so requirements can be reviewed before a quote is prepared.',
    details:
      'Every space is different. Send us measurements, architectural drawings, or even a sketch. We will review feasibility, suggest optimal thicknesses, and prepare precise cut-to-size specifications for your order.',
    icon: 'Ruler',
  },
  {
    id: 'mirror-led',
    name: 'Mirror & LED Crafting',
    description:
      'Explore mirrors, LED vanity mirrors, and backlit concepts for residential or commercial interiors.',
    details:
      'From standard wall mirrors to sensor-controlled LED vanity mirrors with anti-fog features, we craft mirror solutions tailored to bathrooms, dressing rooms, salons, and retail showrooms.',
    icon: 'Lightbulb',
  },
  {
    id: 'architectural-systems',
    name: 'Architectural Glass Systems',
    description:
      'Discuss facades, railings, structural glazing, and other architectural glass applications.',
    details:
      'For architects, builders, and developers, we provide glass systems for building envelopes, balustrades, canopies, and structural features. Share your design intent and we will discuss specification and feasibility.',
    icon: 'Building2',
  },
  {
    id: 'site-coordination',
    name: 'Site Coordination & Logistics',
    description:
      'Review site access, scheduling, transportation, and delivery planning as part of the project.',
    details:
      'Glass is fragile and heavy. We coordinate delivery logistics, discuss site access requirements, packaging, and handling to ensure your order arrives safely and on schedule.',
    icon: 'Truck',
  },
  {
    id: 'installation-guidance',
    name: 'Installation Guidance & Support',
    description:
      'Keep project details, installation expectations, and follow-up questions together for smoother handover.',
    details:
      'While we focus on fabrication and supply, we provide installation guidance documentation, recommend hardware, and can connect you with trusted installation professionals in the Jodhpur region.',
    icon: 'Wrench',
  },
];

// ─── Process Steps ─────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Initial Requirement',
    description:
      'Share photos, elevations, measurements, and a brief of your project goals.',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Specification Review',
    description:
      'We discuss glass type, thickness, cutouts, edge finish, and hardware requirements.',
    icon: 'FileSearch',
  },
  {
    step: 3,
    title: 'Precision Fabrication',
    description:
      'Glass is cut, polished, drilled, and heat-treated to exact specifications.',
    icon: 'Factory',
  },
  {
    step: 4,
    title: 'Dispatch & Handover',
    description:
      'Every piece is inspected, carefully packed, and dispatched to your site or pickup point.',
    icon: 'PackageCheck',
  },
];

// ─── FAQ Items ─────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: 'What types of glass does Jangid Tuff Glasses offer?',
    answer:
      'We offer toughened (tempered) safety glass (5mm–19mm), float & clear annealed glass, high-definition and LED vanity mirrors, slim acoustic glass partitions, frameless shower enclosures, balcony balustrade glass, decorative fluted glass, table tops, and custom architectural glass solutions in Jodhpur, Rajasthan.',
  },
  {
    question: 'What factors determine the price of toughened glass?',
    answer:
      'Glass pricing is determined by specific technical parameters: panel thickness (e.g. 8mm, 10mm, 12mm), glass substrate type (clear float vs ultra-clear low-iron), edge polish (standard seamed edge vs CNC machine flat polish or beveling), internal cutouts or holes for hardware fittings, and total square footage. We provide clear, itemized quotations with zero hidden processing charges.',
  },
  {
    question: 'How do I take site measurements for an accurate glass quotation?',
    answer:
      'Measure the height and width in millimeters at three separate points (left/middle/right and top/center/bottom) using a steel tape. Always note if adjoining walls or floors are slightly out of plumb or level, and indicate whether you need hardware fittings. You can share rough hand sketches or CAD drawings directly via WhatsApp (+91 81073 88855) for an immediate technical estimate.',
  },
  {
    question: 'Can toughened glass be cut or drilled after tempering?',
    answer:
      'No. Once annealed glass has passed through the tempering furnace, it cannot be cut, drilled, or edge-polished. Any post-tempering modification will cause the internal stress balance to fracture the entire panel into granular pieces. Therefore, all dimensions, cutouts, and hole placements must be 100% verified before furnace processing.',
  },
  {
    question: 'Do you deliver outside Jodhpur across Rajasthan?',
    answer:
      'Yes. While our fabrication unit is in Boranada / Pal, Jodhpur, we regularly coordinate crated, secure transit dispatches across Pali, Barmer, Nagaur, Bikaner, and other regions in Rajasthan. For bulk project orders or out-of-district sites, contact our logistics team to discuss scheduled vehicle delivery.',
  },
  {
    question: 'How do I request a quote for my glass project?',
    answer:
      'Visit our Contact page and fill in the brief quotation form with your name, phone number, product category, approximate dimensions, and site location. The form formats your details directly into WhatsApp so you can send it directly to our technical team for prompt, structured review.',
  },
  {
    question: 'Can you help with glass for bathrooms and shower enclosures?',
    answer:
      'Yes. We manufacture frameless, semi-frameless, and sliding shower cubicles in 8mm, 10mm, and 12mm toughened safety glass. We coordinate with 304/316 grade stainless steel hinges, magnetic water-stops, stabilizing header bars, and optional hydrophobic easy-clean coatings tailored to bathroom spaces.',
  },
  {
    question: 'What is included in a quotation from Jangid Tuff Glasses?',
    answer:
      'Our formal quotes clearly itemize the glass specification (thickness, type, finish), edge-polishing work, precision cutout charges, protective packaging/crating, and applicable GST. Site delivery charges or hardware fittings are separated so you have complete visibility over your material investment.',
  },
  {
    question: 'Do you provide on-site installation services?',
    answer:
      'Our core expertise is high-precision glass processing, tempering, and wholesale/retail supply. While we do not operate as general building contractors, we provide full cutout templates and hardware positioning guidance, and can connect you with experienced, verified installation specialists in the Jodhpur region.',
  },
  {
    question: 'What are LED mirrors and do you customise them?',
    answer:
      'LED mirrors feature integrated energy-efficient backlighting, touch-sensor capacitive controls (on/off and dimming), tri-color lighting options, and optional anti-fog demister heating pads. We craft bespoke custom shapes including arch, capsule, circle, and asymmetrical organic shapes for vanity and dressing spaces.',
  },
  {
    question: 'Is Jangid Tuff Glasses a registered private limited company?',
    answer:
      'Yes. Jangid Tuff Glasses Private Limited is an officially incorporated Indian private limited enterprise (CIN: U23109RJ2025PTC102882) located at 21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017.',
  },
];

export const FAQS = FAQ_ITEMS;

// ─── Gallery Items ─────────────────────────────────────────────────────────────

// Only HD landscape images, each visually unique (low-res screenshots and portrait crops are excluded).
const G = '/images/optimized/';

export const GALLERY_ITEMS = [
  // ─── Processing ───
  { id: 'g-tempering', category: 'processing', tag: 'Tempering Line', title: 'Horizontal Glass Tempering Line', image: `${G}processing-tempering-furnace-line.webp`, alt: 'Glass panels moving through a horizontal tempering furnace', caption: 'Glass panels leaving a horizontal tempering furnace, the heat-treatment stage that turns float glass into toughened safety glass.' },
  { id: 'g-cnc', category: 'processing', tag: 'Edge Finishing', title: 'Automated CNC Edge Polishing Line', image: `${G}processing-cnc-edge-polishing.webp`, alt: 'Multi-spindle CNC glass edge polishing machinery in operation', caption: 'Multi-spindle CNC edge polishing for flat-polished edges, arrised corners, and bevels.' },
  { id: 'g-waterjet', category: 'processing', tag: 'Cutouts & Drilling', title: 'Waterjet Cutting & Hole Drilling', image: `${G}processing-waterjet-hole-drilling.webp`, alt: 'CNC waterjet cutting holes and cutouts in a glass sheet', caption: 'Precision cutouts and drilled holes for hinges, patch fittings, and spigot mounts.' },
  { id: 'g-finishes', category: 'decorative', tag: 'Glass Finishes', title: 'Textured, Tinted & Lacquered Samples', image: `${G}processing-fluted-decorative-glass.webp`, alt: 'Sample panels of fluted, frosted, tinted, and lacquered glass', caption: 'Side-by-side samples of fluted, frosted, tinted, and back-painted glass finishes for interiors.' },
  { id: 'g-range', category: 'decorative', tag: 'Glass Types', title: 'Clear, Frosted, Tinted & Fluted Glass', image: `${G}glass-types-clear-frosted-tinted-fluted.webp`, alt: 'Overview of clear, frosted, tinted, and fluted glass types', caption: 'An overview of the main glass looks: clear, frosted, tinted, and fluted.' },

  // ─── Partitions & interiors ───
  { id: 'g-conference', category: 'partitions', tag: 'Office Partitions', title: 'Executive Conference Room Glass Enclosures', image: `${G}partitions-corporate-conference-room.webp`, alt: 'Modern corporate conference room with glass partition walls and door', caption: 'Floor-to-ceiling toughened acoustic glass partition walls providing sound insulation with maximum visual openness.' },
  { id: 'g-slim-city', category: 'partitions', tag: 'Slim Partitions', title: 'Slim Glass Partitions in a City Interior', image: `${G}slim-partitions-city-interior.webp`, alt: 'Slim-framed glass partitions in an apartment overlooking a city', caption: 'Slim-profile glass partitions dividing a living and dining space while keeping the city view open.' },
  { id: 'g-profiles', category: 'partitions', tag: 'Partition Profiles', title: 'Slim Aluminium Partition Profiles', image: `${G}hardware-slim-partition-profiles.webp`, alt: 'Office glass partitions with slim black aluminium profiles', caption: 'Minimal aluminium channels and framed glass doors for modern workspaces.' },
  { id: 'g-office-panorama', category: 'architectural', tag: 'Office Glazing', title: 'Panoramic Office Glazing', image: `${G}glass-office-sunset-panorama.webp`, alt: 'Executive office with floor-to-ceiling glass overlooking a sunset landscape', caption: 'Full-height glazing in an executive office framing a wide sunset view.' },

  // ─── Railings ───
  { id: 'g-staircase', category: 'railings', tag: 'Staircase Railings', title: 'Architectural Staircase Glass Railings', image: `${G}railing-floating-staircase-glass.webp`, alt: 'Floating staircase with structural frameless glass railings and standoff mounts', caption: 'Heavy monolithic toughened glass panels point-fixed with stainless steel standoff pins on floating wooden stairs.' },
  { id: 'g-terrace', category: 'railings', tag: 'Balcony Railings', title: 'Exterior Terrace & Balcony Balustrades', image: `${G}railing-terrace-spigots-balcony.webp`, alt: 'Modern terrace balcony with frameless glass balustrade and spigots', caption: 'Stainless steel spigot-mounted toughened glass balustrades providing unobstructed panoramic views.' },
  { id: 'g-balustrade-mounts', category: 'railings', tag: 'Railing Hardware', title: 'Standoff-Mounted Stair Balustrade', image: `${G}hardware-balustrade-railing-mounts.webp`, alt: 'Glass stair balustrade fixed with stainless steel standoff mounts', caption: 'Side-fixed glass balustrade on a timber staircase, held by stainless standoff mounts.' },
  { id: 'g-cantilever', category: 'railings', tag: 'Terrace Glazing', title: 'Cantilevered Terrace with Glass Balustrade', image: `${G}toughened-glass-cantilever-terrace.webp`, alt: 'Glass-walled living room opening onto a terrace with a frameless glass balustrade', caption: 'A glass corner living space opening onto a terrace edged with a frameless glass balustrade.' },

  // ─── Showers & bathrooms ───
  { id: 'g-shower-corner', category: 'showers', tag: 'Shower Enclosures', title: 'Luxury Frameless Corner Shower', image: `${G}shower-enclosure-frameless-corner.webp`, alt: 'Luxury frameless corner glass shower enclosure in marble bathroom', caption: 'Toughened glass corner shower enclosure with stainless hinges and magnetic seals.' },
  { id: 'g-shower-sliding', category: 'showers', tag: 'Sliding Shower', title: 'Sliding Glass Shower Enclosure', image: `${G}hardware-shower-sliding-enclosure.webp`, alt: 'Frameless sliding glass shower enclosure in a stone bathroom', caption: 'Frameless sliding shower with a stainless roller track in a stone-clad bathroom.' },
  { id: 'g-shower-hinge', category: 'showers', tag: 'Hinged Shower', title: 'Hinged Glass Shower Cubicle', image: `${G}hardware-shower-cubicle-hinge.webp`, alt: 'Hinged frameless glass shower cubicle beside a backlit vanity', caption: 'Hinged frameless shower cubicle paired with a backlit vanity niche.' },
  { id: 'g-led-mirror', category: 'decorative', tag: 'LED Mirrors', title: 'Designer Backlit LED Vanity Mirror', image: `${G}led-mirror-bathroom-vanity.webp`, alt: 'Designer backlit LED vanity mirror in luxury bathroom', caption: 'Copper-free silver mirror with perimeter LED backlighting and touch sensor control.' },

  // ─── Hardware ───
  { id: 'g-patch', category: 'hardware', tag: 'Patch Fittings', title: 'Patch Fittings & Door Locks', image: `${G}hardware-door-controls-patch-fittings.webp`, alt: 'Stainless steel patch fittings and locks for frameless glass doors', caption: 'Top and bottom patch fittings, corner locks, and pivots for frameless glass doors.' },
  { id: 'g-stainless', category: 'hardware', tag: 'Architectural Hardware', title: 'Stainless Glass Hardware & Hinges', image: `${G}architectural-hardware-fittings-stainless.webp`, alt: 'Collection of precision stainless steel glass hardware fittings', caption: 'Grade 304/316 stainless steel glass-to-glass hinges, spigots, and clamp fittings.' },
  { id: 'g-standoff', category: 'hardware', tag: 'Standoff Mounts', title: 'Toughened Glass with Standoff Mounts', image: `${G}toughened-glass-standoff-mount.webp`, alt: 'Toughened glass panel with polished edges and standoff hardware', caption: 'Toughened safety glass with polished edges fixed on stainless standoff hardware.' },
  { id: 'g-entrance', category: 'hardware', tag: 'Entrance Doors', title: 'Frameless Commercial Entrance Doors', image: `${G}hardware-commercial-entrance-doors.webp`, alt: 'Frameless glass entrance doors at a commercial building', caption: 'Frameless toughened glass entrance with floor-spring doors and fixed side panels.' },

  // ─── Decorative ───
  { id: 'g-fluted', category: 'decorative', tag: 'Decorative Finishes', title: 'Reeded Fluted Glass Partition', image: `${G}decorative-fluted-reeded-glass.webp`, alt: 'Reeded fluted decorative glass screen partition in bronze frame', caption: 'Fluted reeded glass screen in a bronze frame, diffusing light while keeping privacy.' },
  { id: 'g-table', category: 'decorative', tag: 'Table Tops', title: 'Beveled Glass Dining Table Top', image: `${G}table-top-circular-beveled-glass.webp`, alt: 'Circular beveled toughened glass dining table top', caption: 'Custom-cut circular toughened glass table top with a polished beveled edge.' },

  // ─── Architectural ───
  { id: 'g-atrium', category: 'architectural', tag: 'Commercial Glazing', title: 'Commercial Atrium Canopy & Entrance', image: `${G}commercial-atrium-canopy-entrance.webp`, alt: 'Commercial glass canopy and atrium entrance facade', caption: 'Cantilevered glass canopy with frameless entrance doors and double-height curtain wall.' },
  { id: 'g-spider', category: 'architectural', tag: 'Spider Fittings', title: 'Spider-Fitted Glass Canopy', image: `${G}corporate-spider-fitting-canopy.webp`, alt: 'Corporate entrance canopy with spider-fitted glass', caption: 'Point-fixed glass canopy supported by stainless spider fittings at a corporate entrance.' },
  { id: 'g-storefront', category: 'architectural', tag: 'Curtain Wall', title: 'Retail Storefront Curtain Wall', image: `${G}retail-storefront-curtain-wall.webp`, alt: 'Retail storefront with a full-height glass curtain wall', caption: 'Full-height storefront glazing that puts the retail interior on display.' },
  { id: 'g-double-height', category: 'architectural', tag: 'Structural Glazing', title: 'Double-Height Villa Structural Glazing', image: `${G}structural-glazing-double-height-villa.webp`, alt: 'Double-height structural glass curtain wall in luxury villa', caption: 'Floor-to-ceiling structural glazing across a double-height villa living space.' },
  { id: 'g-pavilion', category: 'architectural', tag: 'Glass Pavilion', title: 'Glass-Faced Modern Pavilion', image: `${G}custom-architectural-glass-pavilion.webp`, alt: 'Modern pavilion with full glass facade', caption: 'A pavilion wrapped in full-height glass for an uninterrupted landscape view.' },
  { id: 'g-coastal', category: 'architectural', tag: 'Residential Glazing', title: 'Coastal Villa Glass Facade', image: `${G}architectural-villa-coastal-estate.webp`, alt: 'Coastal villa with large glass facade', caption: 'Large-format glazing on a coastal villa facing the sea.' },
  { id: 'g-poolside', category: 'architectural', tag: 'Residential Glazing', title: 'Poolside Villa Glass Facade', image: `${G}villa-poolside-glass-facade.webp`, alt: 'Two-storey villa with glass walls lit at dusk beside a swimming pool', caption: 'A two-storey villa with glass walls on both levels, lit at dusk beside the pool.' },
  { id: 'g-lakeview', category: 'architectural', tag: 'Sliding Glass Walls', title: 'Lakeview Living with Glass Walls', image: `${G}custom-glass-lakeview-living.webp`, alt: 'Living room enclosed by full-height glass walls overlooking a lake', caption: 'Full-height glass walls enclosing a living room that looks out over a lake.' },
  { id: 'g-mountain', category: 'architectural', tag: 'Residential Glazing', title: 'Glass Home with Mountain Views', image: `${G}glass-home-mountain-views.webp`, alt: 'Modern home with sliding glass walls and a glass balcony overlooking mountains', caption: 'Sliding glass walls and a frameless glass balcony facing distant hills.' },
  { id: 'g-corner-terrace', category: 'architectural', tag: 'Corner Glazing', title: 'Frameless Glass Corner Terrace', image: `${G}luxury-glass-corner-terrace.webp`, alt: 'Frameless glass corner of a living room opening onto a terrace', caption: 'A frameless glass corner that dissolves the boundary between living room and terrace.' },
  { id: 'g-hillside', category: 'architectural', tag: 'Toughened Glass', title: 'Hillside Living Behind Toughened Glass', image: `${G}toughened-glass-hillside-living.webp`, alt: 'Glass-walled living room overlooking a hillside and pool', caption: 'Toughened glass walls opening a hillside living room to the view and pool deck.' },
];

const GALLERY_CATEGORY_LABELS = [
  ['architectural', 'Architectural'],
  ['partitions', 'Partitions'],
  ['railings', 'Railings'],
  ['showers', 'Showers'],
  ['hardware', 'Hardware'],
  ['decorative', 'Decorative'],
  ['processing', 'Processing'],
];

export const GALLERY_FILTERS = [
  { label: 'All', value: 'all', count: GALLERY_ITEMS.length },
  ...GALLERY_CATEGORY_LABELS.map(([value, label]) => ({
    label,
    value,
    count: GALLERY_ITEMS.filter((item) => item.category === value).length,
  })),
];

// ─── About Page / Company Info ─────────────────────────────────────────────────

export const ABOUT = {
  mission:
    'To make high-quality glass products and expert guidance accessible to homeowners, businesses, architects, and builders across Jodhpur and Rajasthan.',
  vision:
    'To be the most trusted glass partner in Western Rajasthan — known for clear communication, precision fabrication, and helping every customer find the right glass solution for their space.',
  values: [
    {
      title: 'Quality-minded',
      description:
        'Discuss specifications, intended use and finish before confirming a product. We prioritise getting it right the first time.',
    },
    {
      title: 'Customer-led',
      description:
        "Every enquiry starts with the customer’s needs and project context. We listen first, recommend second.",
    },
    {
      title: 'Practical planning',
      description:
        'Clear dimensions, site details and timelines help everyone plan better. We encourage thorough preparation for the best results.',
    },
  ],
  story:
    'Jangid Tuff Glasses Private Limited is a Jodhpur-based glass business. We help customers explore glass options for interiors, commercial environments and architectural projects. Our approach begins with listening: where the glass will be used, what look you want to achieve, the dimensions involved and any project constraints.',
  storyExtended:
    "From mirrors and partitions to architectural glass applications, start with your intended use and we will help you take the next step. Contact us to discuss the right next steps for your requirement.",
};

// ─── Hero / Landing Page Data ──────────────────────────────────────────────────

export const HERO = {
  eyebrow: 'Jodhpur • Rajasthan • Glass solutions',
  headline: 'Glass that brings',
  headlineAccent: 'your vision to life.',
  subheadline:
    'Toughened glass, mirrors, partitions and custom glass solutions for residential, commercial and architectural spaces.',
  stats: [
    { label: 'Made for your space', sublabel: 'Custom requirements' },
    { label: 'Product guidance', sublabel: 'Discuss your application' },
    { label: 'Local contact', sublabel: 'Jodhpur, Rajasthan' },
  ],
  backgroundImage:
    '/images/optimized/villa-poolside-glass-facade.webp',
  pageHeroImage:
    '/images/optimized/glass-office-sunset-panorama.webp',
};
