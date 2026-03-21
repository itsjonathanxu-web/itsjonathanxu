// ============================================
// PORTFOLIO DATA -3 Categories
// ============================================

export interface Category {
  slug: string;
  title: string;
  description: string;
  image: string; // hero/cover image
}

export interface Project {
  slug: string;
  title: string;
  categorySlug: string;
  location?: string;
  description: string;
  coverImage: string;
  images: string[];
  year?: string;
}

export interface TravelLocation {
  slug: string;
  title: string;
  coverImage: string;
  description: string;
  areas: TravelArea[];
}

export interface TravelArea {
  name: string;
  images: string[];
}

// ============================================
// CATEGORIES
// ============================================

export const categories: Category[] = [
  {
    slug: "travel-destination",
    title: "Travel & Destination",
    description:
      "Destination marketing and cinematic travel content. Making places unforgettable through visual storytelling.",
    image: "/work/travel-destination/chile/dsc08349.jpg",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    description:
      "Cinematic content for hotels, restaurants, bars, and cafes. Capturing the atmosphere, experience, and story of every space.",
    image: "/work/hospitality/joia-newmarket/dsc08589.jpg",
  },
  {
    slug: "architecture-interiors",
    title: "Architecture & Interiors",
    description:
      "Visual storytelling for real estate developers, interior designers, and architects. Highlighting form, light, and material.",
    image: "/work/architecture-interiors/gardiner-museum/dsc01648-enhanced-nr.jpg",
  },
];

// ============================================
// HOSPITALITY PROJECTS
// ============================================

export const hospitalityProjects: Project[] = [
  {
    slug: "joia-newmarket",
    title: "Joia Newmarket",
    categorySlug: "hospitality",
    location: "Newmarket, Ontario",
    description:
      "A cinematic visual story capturing the warmth, craft, and atmosphere of Joia, from intimate dining moments to aerial perspectives of the space.",
    coverImage: "/work/hospitality/joia-newmarket/dsc08589.jpg",
    year: "2026",
    images: [
      "/work/hospitality/joia-newmarket/dsc08584.jpg",
      "/work/hospitality/joia-newmarket/dsc08589.jpg",
      "/work/hospitality/joia-newmarket/dsc08594.jpg",
      "/work/hospitality/joia-newmarket/dsc08660.jpg",
      "/work/hospitality/joia-newmarket/dsc08694.jpg",
      "/work/hospitality/joia-newmarket/dsc08702.jpg",
      "/work/hospitality/joia-newmarket/dsc08705.jpg",
      "/work/hospitality/joia-newmarket/dsc08711.jpg",
      "/work/hospitality/joia-newmarket/dsc08715.jpg",
      "/work/hospitality/joia-newmarket/dsc08731.jpg",
      "/work/hospitality/joia-newmarket/dsc08746.jpg",
      "/work/hospitality/joia-newmarket/dsc08762.jpg",
      "/work/hospitality/joia-newmarket/dsc08772.jpg",
      "/work/hospitality/joia-newmarket/dsc08773.jpg",
      "/work/hospitality/joia-newmarket/drone-aerial.jpg",
    ],
  },
];

// ============================================
// ARCHITECTURE & INTERIORS PROJECTS
// ============================================

export const architectureProjects: Project[] = [
  {
    slug: "gardiner-museum",
    title: "Gardiner Museum",
    categorySlug: "architecture-interiors",
    location: "Boston",
    description:
      "Architectural photography exploring the interplay of form, light, and materiality within the Gardiner Museum.",
    coverImage: "/work/architecture-interiors/gardiner-museum/dsc01648-enhanced-nr.jpg",
    year: "2025",
    images: [
      "/work/architecture-interiors/gardiner-museum/dsc01648-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01649-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01657-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01663-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01668-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01670-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01678-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01681-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01682-enhanced-nr.jpg",
      "/work/architecture-interiors/gardiner-museum/dsc01684-enhanced-nr.jpg",
    ],
  },
];

// ============================================
// TRAVEL & DESTINATION LOCATIONS
// ============================================

export const travelLocations: TravelLocation[] = [
  {
    slug: "united-kingdom",
    title: "United Kingdom",
    coverImage: "/work/travel-destination/united-kingdom/london/0.jpg",
    description: "From the streets of London to the cliffs of Seven Sisters and the wild beauty of Northern Ireland.",
    areas: [
      {
        name: "London",
        images: [
          "/work/travel-destination/united-kingdom/london/0.jpg",
          "/work/travel-destination/united-kingdom/london/1.jpg",
          "/work/travel-destination/united-kingdom/london/2.jpg",
          "/work/travel-destination/united-kingdom/london/3.jpg",
          "/work/travel-destination/united-kingdom/london/4.jpg",
          "/work/travel-destination/united-kingdom/london/5.jpg",
          "/work/travel-destination/united-kingdom/london/6.jpg",
          "/work/travel-destination/united-kingdom/london/7.jpg",
        ],
      },
      {
        name: "Oxford",
        images: [
          "/work/travel-destination/united-kingdom/oxford/dsc01090-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01105-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01126-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01127-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01130-enhanced-nr.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01150-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01153-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01160-enhanced-nr-2.jpg",
          "/work/travel-destination/united-kingdom/oxford/dsc01173-enhanced-nr.jpg",
        ],
      },
      {
        name: "Northern Ireland",
        images: [
          "/work/travel-destination/united-kingdom/northern-ireland/1-3.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/1-5.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/1-6.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/7-2.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/cave.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/dark-hedges.jpg",
        ],
      },
      {
        name: "Seven Sisters",
        images: [
          "/work/travel-destination/united-kingdom/seven-sisters/ss-1.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/ss-2.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/ss-4.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/ss-5.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/ss-6.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/ss-8.jpg",
        ],
      },
    ],
  },
  {
    slug: "japan",
    title: "Japan",
    coverImage: "/work/travel-destination/japan/tokyo/dsc05832-min.jpg",
    description: "A cinematic journey through Tokyo, Kyoto, Osaka, and Nara, capturing the contrast of tradition and modernity.",
    areas: [
      {
        name: "Tokyo",
        images: [
          "/work/travel-destination/japan/tokyo/dsc05799-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05805-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05810-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05832-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05857-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05866-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05874-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05888-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05919-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05970-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05993-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc05999-min.jpg",
          "/work/travel-destination/japan/tokyo/dsc06080-min.jpg",
        ],
      },
      {
        name: "Kyoto",
        images: [
          "/work/travel-destination/japan/kyoto/dsc06461-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06465-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06468-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06511-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06518-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06528-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06548-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06558-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06677-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06686-min.jpg",
          "/work/travel-destination/japan/kyoto/dsc06690-min.jpg",
        ],
      },
      {
        name: "Nara",
        images: [
          "/work/travel-destination/japan/nara/dsc06565-min.jpg",
          "/work/travel-destination/japan/nara/dsc06589-min.jpg",
          "/work/travel-destination/japan/nara/dsc06591-min.jpg",
          "/work/travel-destination/japan/nara/dsc06597-min.jpg",
        ],
      },
      {
        name: "Osaka",
        images: [
          "/work/travel-destination/japan/osaka/dsc06610-enhanced-nr-min.jpg",
          "/work/travel-destination/japan/osaka/dsc06613-enhanced-nr-min.jpg",
          "/work/travel-destination/japan/osaka/dsc06615-min.jpg",
          "/work/travel-destination/japan/osaka/dsc06631-enhanced-nr-min.jpg",
        ],
      },
    ],
  },
  {
    slug: "united-states",
    title: "United States",
    coverImage: "/work/travel-destination/united-states/chicago/dsc06764-enhanced-nr.jpg",
    description: "Architectural grandeur and urban energy across Boston, Chicago, and Detroit.",
    areas: [
      {
        name: "Boston",
        images: [
          "/work/travel-destination/united-states/boston/dsc01712.jpg",
          "/work/travel-destination/united-states/boston/dsc01713.jpg",
          "/work/travel-destination/united-states/boston/dsc01716.jpg",
          "/work/travel-destination/united-states/boston/dsc01720-min.jpg",
          "/work/travel-destination/united-states/boston/dsc01727-min.jpg",
          "/work/travel-destination/united-states/boston/dsc01738-min.jpg",
        ],
      },
      {
        name: "Chicago",
        images: [
          "/work/travel-destination/united-states/chicago/dsc06714-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06723-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06764-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06778-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06786-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06790-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06791-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06798-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06819-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06826-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06832-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06842-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06855-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06856-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06869-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06988-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06994-enhanced-nr.jpg",
          "/work/travel-destination/united-states/chicago/dsc06995-enhanced-nr.jpg",
        ],
      },
      {
        name: "Detroit",
        images: [
          "/work/travel-destination/united-states/detroit/dsc07032-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07037-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07058-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07060-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07067-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07072-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07075-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07078-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07079-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07080-enhanced-nr-min.jpg",
          "/work/travel-destination/united-states/detroit/dsc07081-enhanced-nr-2-min.jpg",
        ],
      },
    ],
  },
  {
    slug: "malaysia",
    title: "Malaysia",
    coverImage: "/work/travel-destination/malaysia/dsc05527-enhanced-nr-2-min.jpg",
    description: "Tropical light, vibrant culture, and lush landscapes across Malaysia.",
    areas: [
      {
        name: "Malaysia",
        images: [
          "/work/travel-destination/malaysia/dsc05527-enhanced-nr-2-min.jpg",
          "/work/travel-destination/malaysia/dsc05550-enhanced-nr-2-min.jpg",
          "/work/travel-destination/malaysia/dsc05551-enhanced-nr-min.jpg",
          "/work/travel-destination/malaysia/dsc05568-enhanced-nr-2-min.jpg",
          "/work/travel-destination/malaysia/dsc05585-enhanced-nr-min.jpg",
          "/work/travel-destination/malaysia/dsc05592-enhanced-nr-min.jpg",
        ],
      },
    ],
  },
  {
    slug: "chile",
    title: "Chile",
    coverImage: "/work/travel-destination/chile/dsc08349.jpg",
    description: "Glacial waters, jagged peaks, and the raw grandeur of Patagonia.",
    areas: [
      {
        name: "Patagonia",
        images: [
          "/work/travel-destination/chile/dsc08349.jpg",
          "/work/travel-destination/chile/dsc08354.jpg",
          "/work/travel-destination/chile/dsc08373.jpg",
          "/work/travel-destination/chile/dsc08376.jpg",
          "/work/travel-destination/chile/dsc08379.jpg",
          "/work/travel-destination/chile/dsc08383.jpg",
          "/work/travel-destination/chile/dsc08389.jpg",
          "/work/travel-destination/chile/dsc08390.jpg",
          "/work/travel-destination/chile/dsc08408.jpg",
        ],
      },
    ],
  },
  {
    slug: "death-valley",
    title: "Death Valley",
    coverImage: "/work/travel-destination/death-valley/1-min.jpg",
    description: "Endless desert, shifting dunes, and otherworldly landscapes in the hottest place on Earth.",
    areas: [
      {
        name: "Death Valley",
        images: [
          "/work/travel-destination/death-valley/1-min.jpg",
          "/work/travel-destination/death-valley/1-2-min.jpg",
          "/work/travel-destination/death-valley/1-3-min.jpg",
          "/work/travel-destination/death-valley/dsc07172-min.jpg",
          "/work/travel-destination/death-valley/dsc07177-enhanced-nr-2-min.jpg",
          "/work/travel-destination/death-valley/dsc07180-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07182-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07183-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07193-min.jpg",
          "/work/travel-destination/death-valley/dsc07205-min.jpg",
          "/work/travel-destination/death-valley/dsc07213-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07216-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07218-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07228-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07375-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/dsc07381-enhanced-nr-min.jpg",
          "/work/travel-destination/death-valley/itsjonathanxu---dune-1-min.jpg",
          "/work/travel-destination/death-valley/itsjonathanxu---dune-2-min.jpg",
          "/work/travel-destination/death-valley/xu_jonathan_landscape_2-min.jpg",
        ],
      },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProjectsByCategory(slug: string): Project[] {
  if (slug === "hospitality") return hospitalityProjects;
  if (slug === "architecture-interiors") return architectureProjects;
  return [];
}

export function getTravelLocationBySlug(slug: string): TravelLocation | undefined {
  return travelLocations.find((l) => l.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return travelFeaturedProjects;
}

// Travel locations surfaced as "featured projects" on home page
const travelFeaturedProjects: Project[] = [
  {
    slug: "death-valley",
    title: "Death Valley",
    categorySlug: "travel-destination",
    description: "Endless desert, shifting dunes, and otherworldly landscapes in the hottest place on Earth.",
    coverImage: "/work/travel-destination/death-valley/dsc07213-enhanced-nr-min.jpg",
    images: [],
  },
  {
    slug: "chile",
    title: "Chile",
    categorySlug: "travel-destination",
    description: "Glacial waters, jagged peaks, and the raw grandeur of Patagonia.",
    coverImage: "/work/travel-destination/chile/dsc08349.jpg",
    images: [],
  },
  {
    slug: "japan",
    title: "Japan",
    categorySlug: "travel-destination",
    description: "A cinematic journey through Tokyo, Kyoto, Osaka, and Nara, capturing the contrast of tradition and modernity.",
    coverImage: "/work/travel-destination/japan/nara/dsc06565-min.jpg",
    images: [],
  },
];
