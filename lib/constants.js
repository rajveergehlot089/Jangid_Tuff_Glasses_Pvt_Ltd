// ─── Company Information ───────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Jangid Tuff Glasses Private Limited',
  nameShort: 'Jangid Tuff Glasses',
  nameHindi: 'जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड',
  tagline: 'Glass that brings your vision to life.',
  description:
    'Toughened glass, mirrors, partitions and custom glass solutions for residential, commercial and architectural spaces in Jodhpur, Rajasthan.',
  contactPerson: 'Karan Jangid',
  phone: '+91 81073 88885',
  phoneRaw: '+918107388885',
  whatsapp: '918107388885',
  address: {
    street: '21 Narnadi, Boranada, Pal',
    city: 'Jodhpur',
    state: 'Rajasthan',
    zip: '342017',
    country: 'India',
    full: '21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017, India',
  },
  mapsQuery:
    'https://www.google.com/maps/search/?api=1&query=21+Narnadi+Boranada+Pal+Jodhpur+Rajasthan+342017',
  social: {
    instagram: 'https://www.instagram.com/jangidglassco/',
    instagramHandle: '@jangidglassco',
    facebook:
      'https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/',
  },
  listings: {
    ozone:
      'https://www.ozone.in/dealers/rajasthan/jodhpur/jangid-tuff-glasses-pvt-ltd',
    zaubacorp:
      'https://www.zaubacorp.com/company/JANGID-TUFF-GLASSES-PRIVATE-LIMITED/U25209RJ2024PTC098277',
  },
  hours: 'Please call to confirm',
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
      'Heat-treated tempered safety glass with high impact resistance. Ideal for doors, facades, windows, and structural architectural glazing.',
    applications: [
      'Doors & entrances',
      'Facades & curtain walls',
      'Windows & skylights',
      'Structural glazing',
    ],
    features: [
      '4–5× stronger than standard glass',
      'Breaks into small, safe granular pieces',
      'Withstands thermal stress',
      'Available in various thicknesses',
    ],
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'architectural',
  },
  {
    slug: 'float-clear-glass',
    name: 'Float & Clear Glass',
    tag: 'Architectural solutions',
    description:
      'Optically clear, distortion-free float glass offering high light transmission. Versatile base material for a wide range of fabrication and glazing needs.',
    applications: [
      'Windows & facades',
      'Display cases',
      'Furniture & shelving',
      'Custom fabrication base',
    ],
    features: [
      'High optical clarity',
      'Uniform thickness',
      'Excellent light transmission',
      'Available in multiple thicknesses',
    ],
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'architectural',
  },
  {
    slug: 'mirrors-led-mirrors',
    name: 'Mirrors & LED Mirrors',
    tag: 'Interior solutions',
    description:
      'High-clarity silver mirrors, backlit LED vanity mirrors, and touch-sensor controls for bathrooms, bedrooms, retail, and hospitality interiors.',
    applications: [
      'Bathroom vanity mirrors',
      'Bedroom wall mirrors',
      'Retail display mirrors',
      'Hospitality & salon mirrors',
    ],
    features: [
      'Copper-free silver coating',
      'Energy-efficient LED backlighting',
      'Touch-sensor on/off & dimming',
      'Anti-fog heating option',
    ],
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'interior',
  },
  {
    slug: 'slim-glass-partitions',
    name: 'Slim Glass Partitions',
    tag: 'Interior solutions',
    description:
      'Minimalist aluminum-framed or frameless glass partition walls. Create bright, flexible workspaces and interior divisions without sacrificing natural light.',
    applications: [
      'Office cabin divisions',
      'Conference rooms',
      'Co-working spaces',
      'Residential room dividers',
    ],
    features: [
      'Slim aluminium profiles',
      'Frameless options available',
      'Sound insulation options',
      'Custom height & width',
    ],
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'interior',
  },
  {
    slug: 'shower-enclosures',
    name: 'Shower Enclosures',
    tag: 'Interior solutions',
    description:
      'Custom frameless, semi-frameless, and sliding shower cubicles in toughened safety glass. Clean, contemporary shower solutions for modern bathrooms.',
    applications: [
      'Frameless walk-in showers',
      'Sliding shower doors',
      'Corner shower cubicles',
      'Bathtub glass screens',
    ],
    features: [
      '8–12 mm toughened glass',
      'Easy-clean nano coating option',
      'Stainless steel hardware',
      'Custom sizing to fit any bathroom',
    ],
    image:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'interior',
  },
  {
    slug: 'railing-balustrade-glass',
    name: 'Railing & Balustrade Glass',
    tag: 'Architectural solutions',
    description:
      'Toughened and laminated glass balustrades for balconies, staircases, terraces, and pool areas. Modern glass railing concepts with durable hardware.',
    applications: [
      'Balcony railings',
      'Staircase balustrades',
      'Terrace barriers',
      'Pool-side fencing',
    ],
    features: [
      'Toughened or laminated safety glass',
      'Stainless steel spigots & standoffs',
      'Frameless or post-mounted designs',
      'Weather-resistant finish',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'architectural',
  },
  {
    slug: 'decorative-glass',
    name: 'Decorative Glass',
    tag: 'Interior solutions',
    description:
      'Frosted, fluted, tinted, and lacquered glass to bring pattern, texture, and character to residential and commercial interiors.',
    applications: [
      'Kitchen backsplashes',
      'Room dividers',
      'Cabinet doors',
      'Feature walls',
    ],
    features: [
      'Frosted & sandblasted finishes',
      'Fluted & reeded textures',
      'Lacquered colour options',
      'Custom patterns & designs',
    ],
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'interior',
  },
  {
    slug: 'glass-table-tops',
    name: 'Glass Table Tops',
    tag: 'Interior solutions',
    description:
      'Custom-cut glass table surfaces in clear, frosted, or tinted finishes. Polished edges and precise dimensions for dining, office, and display tables.',
    applications: [
      'Dining tables',
      'Office desks',
      'Coffee & side tables',
      'Display counters',
    ],
    features: [
      'Toughened safety glass',
      'Bevelled or polished edges',
      'Custom shapes & cutouts',
      'Available in 6–12 mm thickness',
    ],
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
    categoryGroup: 'interior',
  },
  {
    slug: 'custom-architectural-glass',
    name: 'Custom Architectural Glass',
    tag: 'Custom solutions',
    description:
      'Bespoke glass solutions fabricated to architectural specifications. Made-to-measure concepts based on project drawings, dimensions, and unique design requirements.',
    applications: [
      'Unique facade panels',
      'Custom skylights',
      'Architectural feature glazing',
      'Specialist project requirements',
    ],
    features: [
      'Fabricated to drawings & specs',
      'Multiple glass types available',
      'CNC cutting & drilling',
      'Project-specific engineering',
    ],
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80',
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
      'We offer toughened (tempered) glass, float & clear glass, mirrors & LED mirrors, slim glass partitions, shower enclosures, railing & balustrade glass, decorative glass, glass table tops, and custom architectural glass solutions.',
  },
  {
    question: 'Do you provide custom glass cutting and sizing?',
    answer:
      'Yes. Share your dimensions, drawings, or measurements and we will review feasibility, suggest optimal thicknesses, and prepare precise cut-to-size specifications. Custom shapes, cutouts, and edge finishes are available.',
  },
  {
    question: 'What is toughened glass and why is it recommended?',
    answer:
      'Toughened (tempered) glass is heat-treated to be 4–5 times stronger than standard annealed glass. If it breaks, it shatters into small, blunt granular pieces rather than sharp shards, making it significantly safer for doors, facades, partitions, and architectural applications.',
  },
  {
    question: 'Do you deliver outside Jodhpur?',
    answer:
      'We are based in Jodhpur, Rajasthan, and primarily serve the local and surrounding regions. For deliveries to other locations, please contact us to discuss logistics, packaging, and transportation options for your order.',
  },
  {
    question: 'How do I request a quote for my glass project?',
    answer:
      'Visit our Contact page and fill in the enquiry form with your name, phone number, product type, project dimensions, and any additional details. The form prepares your message in WhatsApp so you can send it directly to our team for a prompt response.',
  },
  {
    question: 'Can you help with glass for bathrooms and shower enclosures?',
    answer:
      'Absolutely. We provide frameless, semi-frameless, and sliding shower cubicles in 8–12 mm toughened safety glass. Optional features include nano easy-clean coating, stainless steel hardware, and custom sizing to fit any bathroom layout.',
  },
  {
    question: 'What information should I prepare before contacting you?',
    answer:
      'To help us give you the best guidance, prepare: the intended application (e.g., partition, door, mirror), approximate dimensions, preferred glass type or finish, project location, and your expected timeline. Photos or drawings of the space are very helpful.',
  },
  {
    question: 'Do you provide installation services?',
    answer:
      'Our primary focus is on glass fabrication and supply. However, we provide installation guidance documentation, recommend appropriate hardware, and can connect you with trusted installation professionals in the Jodhpur region.',
  },
  {
    question: 'What are LED mirrors and do you customise them?',
    answer:
      'LED mirrors feature integrated energy-efficient backlighting, often with touch-sensor controls for on/off and dimming. We offer customisation for size, shape, lighting colour temperature, and optional anti-fog heating.',
  },
  {
    question: 'Is Jangid Tuff Glasses a registered company?',
    answer:
      'Yes. Jangid Tuff Glasses Private Limited is a registered Indian private limited company. Our registration details are publicly available on the Ministry of Corporate Affairs portal and ZaubaCorp.',
  },
];

export const FAQS = FAQ_ITEMS;

// ─── Gallery Items ─────────────────────────────────────────────────────────────

export const GALLERY_ITEMS = [
  {
    id: 'gallery-1',
    title: 'Glass architecture',
    category: 'architectural',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern glass architecture with clean lines',
    isIllustrative: true,
  },
  {
    id: 'gallery-2',
    title: 'Mirror interior',
    category: 'interior',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    alt: 'Elegant mirror in a modern interior setting',
    isIllustrative: true,
  },
  {
    id: 'gallery-3',
    title: 'Glass workspace',
    category: 'interior',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    alt: 'Open workspace with glass partition walls',
    isIllustrative: true,
  },
  {
    id: 'gallery-4',
    title: 'Modern residence',
    category: 'architectural',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    alt: 'Contemporary residence with glass railing',
    isIllustrative: true,
  },
  {
    id: 'gallery-5',
    title: 'Bathroom glass',
    category: 'interior',
    image:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern bathroom with glass shower enclosure',
    isIllustrative: true,
  },
  {
    id: 'gallery-6',
    title: 'Decorative interior',
    category: 'custom',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    alt: 'Decorative glass elements in an interior space',
    isIllustrative: true,
  },
  {
    id: 'gallery-7',
    title: 'Building facade',
    category: 'architectural',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
    alt: 'Glass facade on a contemporary building',
    isIllustrative: true,
  },
  {
    id: 'gallery-8',
    title: 'Contemporary living',
    category: 'custom',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    alt: 'Contemporary living room with custom glass features',
    isIllustrative: true,
  },
];

export const GALLERY_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Architectural', value: 'architectural' },
  { label: 'Interior', value: 'interior' },
  { label: 'Custom', value: 'custom' },
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
