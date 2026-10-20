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
  hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST (Please call to confirm)',
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

export const GALLERY_ITEMS = [
  {
    id: 'gallery-1',
    title: 'Jangid Tuff Glasses Factory Premises (Authentic Photo)',
    category: 'factory',
    tag: 'Factory & Plant',
    caption: 'Official operational factory premises of Jangid Tuff Glasses Private Limited located at 21 Narnadi, Boranada Industrial Area, Pal, Jodhpur, Rajasthan.',
    image: '/images/real/factory-front-original.jpg',
    alt: 'Original photograph of Jangid Tuff Glasses Private Limited factory in Boranada Jodhpur',
    isActualCompanyWork: true,
  },
  {
    id: 'gallery-2',
    title: 'LiSEC Glass Tempering & Cutting Line',
    category: 'processing',
    tag: 'Tempering Line',
    caption: 'High-precision automated LiSEC glass processing and horizontal tempering line for 5mm to 19mm safety glass.',
    image: '/images/real/glass-processing-plant.png',
    alt: 'Advanced glass processing LiSEC tempering furnace table',
  },
  {
    id: 'gallery-3',
    title: 'Automated CNC Edge Polishing Line',
    category: 'processing',
    tag: 'Edge Finishing',
    caption: 'Multi-spindle CNC automated glass edge polishing delivering flawless flat-polish with arrised corners and beveling.',
    image: '/images/real/cnc-edge-polishing.png',
    alt: 'Automated multi-spindle CNC glass edge polishing machinery in operation',
  },
  {
    id: 'gallery-4',
    title: 'Raw & Tempered Glass Storage A-Frames',
    category: 'factory',
    tag: 'Glass Inventory',
    caption: 'Heavy-duty wooden A-frame storage containing premium clear, ultra-clear, and tinted architectural glass sheet inventory.',
    image: '/images/real/glass-storage-racks.png',
    alt: 'Large sheets of architectural glass stacked in heavy wooden A-frame racks',
  },
  {
    id: 'gallery-5',
    title: 'Executive Conference Room Glass Enclosures',
    category: 'partitions',
    tag: 'Office Partitions',
    caption: 'Floor-to-ceiling toughened acoustic glass partition walls providing sound insulation with maximum visual openness.',
    image: '/images/optimized/partitions-corporate-conference-room.webp',
    alt: 'Modern corporate conference room with glass partition walls and door',
  },
  {
    id: 'gallery-6',
    title: 'Architectural Staircase Glass Railings',
    category: 'railings',
    tag: 'Staircase Railings',
    caption: 'Heavy monolithic toughened glass panels point-fixed with stainless steel standoff pins on floating wooden stairs.',
    image: '/images/optimized/railing-floating-staircase-glass.webp',
    alt: 'Floating staircase with structural frameless glass railings and standoff mounts',
  },
  {
    id: 'gallery-7',
    title: 'Luxury Frameless Walk-In Shower Cubicles',
    category: 'showers',
    tag: 'Shower Enclosures',
    caption: 'Custom 10mm toughened glass corner shower enclosure fitted with corrosion-proof SS 304 hinges and magnetic seals.',
    image: '/images/optimized/shower-enclosure-frameless-corner.webp',
    alt: 'Luxury frameless corner glass shower enclosure in marble bathroom',
  },
  {
    id: 'gallery-8',
    title: 'Exterior Terrace & Balcony Balustrades',
    category: 'railings',
    tag: 'Balcony Railings',
    caption: 'Duplex stainless steel spigot-mounted toughened glass balustrades providing unobstructed panoramic views.',
    image: '/images/optimized/railing-terrace-spigots-balcony.webp',
    alt: 'Modern terrace balcony with frameless glass balustrade and spigots',
  },
  {
    id: 'gallery-9',
    title: 'Toughened Glass Technical Mount & Certification',
    category: 'architectural',
    tag: 'Toughened Glass',
    caption: 'Heavy-duty tempered safety glass sheet with polished arrised edges and BS EN 12150 compliance stamp.',
    image: '/images/optimized/toughened-glass-standoff-mount.webp',
    alt: 'Heavy-duty toughened glass panel with polished edges and standoff hardware',
  },
  {
    id: 'gallery-10',
    title: 'Designer Backlit LED Vanity Mirror',
    category: 'decorative',
    tag: 'LED Mirrors',
    caption: 'High-definition copper-free silver mirror with perimeter LED backlighting and integrated capacitive touch sensors.',
    image: '/images/optimized/led-mirror-bathroom-vanity.webp',
    alt: 'Designer backlit LED vanity mirror in luxury bathroom',
  },
  {
    id: 'gallery-11',
    title: 'Heavy-Duty Stainless Glass Hardware & Hinges',
    category: 'hardware',
    tag: 'Architectural Hardware',
    caption: 'Solid grade 304/316 stainless steel heavy-duty glass-to-glass hinges, spigots, and precision clamp fittings.',
    image: '/images/optimized/architectural-hardware-fittings-stainless.webp',
    alt: 'Collection of precision stainless steel glass hardware fittings',
  },
  {
    id: 'gallery-12',
    title: 'Reeded Fluted Architectural Glass Partition',
    category: 'decorative',
    tag: 'Decorative Finishes',
    caption: 'Textured fluted reeded glass screen in bronze architectural frame providing soft light diffusion with privacy.',
    image: '/images/optimized/decorative-fluted-reeded-glass.webp',
    alt: 'Reeded fluted decorative glass screen partition in bronze frame',
  },
  {
    id: 'gallery-13',
    title: 'Commercial Atrium Canopy & Entry Facade',
    category: 'architectural',
    tag: 'Commercial Glazing',
    caption: 'Cantilevered architectural glass canopy with frameless entrance doors and double-height curtain wall glazing.',
    image: '/images/optimized/commercial-atrium-canopy-entrance.webp',
    alt: 'Commercial glass canopy and atrium entrance facade',
  },
  {
    id: 'gallery-14',
    title: 'Double-Height Villa Structural Glazing',
    category: 'architectural',
    tag: 'Structural Glazing',
    caption: 'Monumental floor-to-ceiling glass curtain walls and structural glass features in high-end architecture.',
    image: '/images/optimized/structural-glazing-double-height-villa.webp',
    alt: 'Double-height structural glass curtain wall in luxury villa',
  },
  {
    id: 'gallery-15',
    title: 'Precision Beveled Glass Dining Table Top',
    category: 'decorative',
    tag: 'Table Tops',
    caption: 'Custom-cut circular toughened glass table top with flat polished beveled edge protecting fine timber dining furniture.',
    image: '/images/optimized/table-top-circular-beveled-glass.webp',
    alt: 'Circular beveled toughened glass dining table top',
  },
  {
    id: 'gallery-16',
    title: 'Showroom Facade Architectural Concept',
    category: 'reference',
    tag: 'Concept Reference',
    caption: 'Supplied 3D architectural concept visualization demonstrating showroom facade illumination and glass display intent.',
    image: '/images/optimized/showroom-concept-reference.webp',
    alt: '3D architectural concept visualization of modern glass showroom',
    isActualCompanyWork: false,
  },
];

export const GALLERY_FILTERS = [
  { label: 'All Showcase (16)', value: 'all' },
  { label: 'Factory & Plant', value: 'factory' },
  { label: 'Processing & CNC', value: 'processing' },
  { label: 'Partitions', value: 'partitions' },
  { label: 'Railings', value: 'railings' },
  { label: 'Showers', value: 'showers' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Decorative', value: 'decorative' },
  { label: 'Architectural', value: 'architectural' },
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
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85',
  pageHeroImage:
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
};
