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
    image: "/work/hospitality/joia-newmarket/1.jpg",
  },
  {
    slug: "architecture-interiors",
    title: "Architecture/Interiors",
    description:
      "Visual storytelling for real estate developers, interior designers, and architects. Highlighting form, light, and material.",
    image: "/work/architecture-interiors/gardiner-museum/1.jpg",
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
    coverImage: "/work/hospitality/joia-newmarket/1.jpg",
    year: "2026",
    images: [
      "/work/hospitality/joia-newmarket/2.jpg",
      "/work/hospitality/joia-newmarket/3.jpg",
      "/work/hospitality/joia-newmarket/4.jpg",
      "/work/hospitality/joia-newmarket/5.jpg",
      "/work/hospitality/joia-newmarket/6.jpg",
      "/work/hospitality/joia-newmarket/7.jpg",
      "/work/hospitality/joia-newmarket/8.jpg",
      "/work/hospitality/joia-newmarket/9.jpg",
      "/work/hospitality/joia-newmarket/10.jpg",
      "/work/hospitality/joia-newmarket/11.jpg",
      "/work/hospitality/joia-newmarket/12.jpg",
      "/work/hospitality/joia-newmarket/drone.jpg",
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
    coverImage: "/work/architecture-interiors/gardiner-museum/1.jpg",
    year: "2025",
    images: [
      "/work/architecture-interiors/gardiner-museum/2.jpg",
      "/work/architecture-interiors/gardiner-museum/3.jpg",
      "/work/architecture-interiors/gardiner-museum/4.jpg",
      "/work/architecture-interiors/gardiner-museum/5.jpg",
      "/work/architecture-interiors/gardiner-museum/6.jpg",
      "/work/architecture-interiors/gardiner-museum/7.jpg",
      "/work/architecture-interiors/gardiner-museum/8.jpg",
    ],
  },
];

// ============================================
// TRAVEL & DESTINATION LOCATIONS
// ============================================

export const travelLocations: TravelLocation[] = [
  {
    slug: "chile",
    title: "Chile",
    coverImage: "/work/travel-destination/chile/1.jpg",
    description: "Glacial waters, jagged peaks, and the raw grandeur of Patagonia.",
    areas: [
      {
        name: "Patagonia",
        images: [
          "/work/travel-destination/chile/2.jpg",
          "/work/travel-destination/chile/3.jpg",
          "/work/travel-destination/chile/4.jpg",
          "/work/travel-destination/chile/5.jpg",
          "/work/travel-destination/chile/6.jpg",
          "/work/travel-destination/chile/7.jpg",
        ],
      },
    ],
  },
  {
    slug: "japan",
    title: "Japan",
    coverImage: "/work/travel-destination/japan/tokyo/4.jpg",
    description: "A cinematic journey through Tokyo, Kyoto, Osaka, and Nara, capturing the contrast of tradition and modernity.",
    areas: [
      {
        name: "Tokyo",
        images: [
          "/work/travel-destination/japan/tokyo/1.jpg",
          "/work/travel-destination/japan/tokyo/2.jpg",
          "/work/travel-destination/japan/tokyo/6.jpg",
          "/work/travel-destination/japan/tokyo/5.jpg",
          "/work/travel-destination/japan/tokyo/7.jpg",
          "/work/travel-destination/japan/tokyo/8.jpg",
          "/work/travel-destination/japan/tokyo/9.jpg",
          "/work/travel-destination/japan/tokyo/10.jpg",
        ],
      },
      {
        name: "Kyoto",
        images: [
          "/work/travel-destination/japan/kyoto/1.jpg",
          "/work/travel-destination/japan/kyoto/2.jpg",
          "/work/travel-destination/japan/kyoto/3.jpg",
          "/work/travel-destination/japan/kyoto/4.jpg",
          "/work/travel-destination/japan/kyoto/5.jpg",
          "/work/travel-destination/japan/kyoto/6.jpg",
          "/work/travel-destination/japan/kyoto/7.jpg",
          "/work/travel-destination/japan/kyoto/8.jpg",
          "/work/travel-destination/japan/kyoto/9.jpg",
        ],
      },
      {
        name: "Nara",
        images: [
          "/work/travel-destination/japan/nara/1.jpg",
          "/work/travel-destination/japan/nara/2.jpg",
          "/work/travel-destination/japan/nara/3.jpg",
          "/work/travel-destination/japan/nara/4.jpg",
        ],
      },
      {
        name: "Osaka",
        images: [
          "/work/travel-destination/japan/osaka/1.jpg",
          "/work/travel-destination/japan/osaka/2.jpg",
          "/work/travel-destination/japan/osaka/3.jpg",
          "/work/travel-destination/japan/osaka/4.jpg",
        ],
      },
    ],
  },
  {
    slug: "death-valley",
    title: "Death Valley",
    coverImage: "/work/travel-destination/death-valley/1.jpg",
    description: "Endless desert, shifting dunes, and otherworldly landscapes in the hottest place on Earth.",
    areas: [
      {
        name: "Death Valley",
        images: [
          "/work/travel-destination/death-valley/2.jpg",
          "/work/travel-destination/death-valley/3.jpg",
          "/work/travel-destination/death-valley/4.jpg",
          "/work/travel-destination/death-valley/5.jpg",
          "/work/travel-destination/death-valley/6.jpg",
          "/work/travel-destination/death-valley/7.jpg",
          "/work/travel-destination/death-valley/8.jpg",
          "/work/travel-destination/death-valley/9.jpg",
          "/work/travel-destination/death-valley/10.jpg",
          "/work/travel-destination/death-valley/11.jpg",
          "/work/travel-destination/death-valley/12.jpg",
          "/work/travel-destination/death-valley/13.jpg",
          "/work/travel-destination/death-valley/14.jpg",
          "/work/travel-destination/death-valley/15.jpg",
        ],
      },
    ],
  },
  {
    slug: "united-kingdom",
    title: "United Kingdom",
    coverImage: "/work/travel-destination/united-kingdom/london/0.jpg",
    description: "From the streets of London to the cliffs of Seven Sisters and the wild beauty of Northern Ireland.",
    areas: [
      {
        name: "London",
        images: [
          "/work/travel-destination/united-kingdom/london/1.jpg",
          "/work/travel-destination/united-kingdom/london/2.jpg",
          "/work/travel-destination/united-kingdom/london/3.jpg",
          "/work/travel-destination/united-kingdom/london/4.jpg",
          "/work/travel-destination/united-kingdom/london/5.jpg",
          "/work/travel-destination/united-kingdom/london/6.jpg",
        ],
      },
      {
        name: "Seven Sisters",
        images: [
          "/work/travel-destination/united-kingdom/seven-sisters/1.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/2.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/3.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/4.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/5.jpg",
          "/work/travel-destination/united-kingdom/seven-sisters/6.jpg",
        ],
      },
      {
        name: "Oxford",
        images: [
          "/work/travel-destination/united-kingdom/oxford/1.jpg",
          "/work/travel-destination/united-kingdom/oxford/2.jpg",
          "/work/travel-destination/united-kingdom/oxford/3.jpg",
          "/work/travel-destination/united-kingdom/oxford/4.jpg",
          "/work/travel-destination/united-kingdom/oxford/5.jpg",
          "/work/travel-destination/united-kingdom/oxford/6.jpg",
          "/work/travel-destination/united-kingdom/oxford/7.jpg",
          "/work/travel-destination/united-kingdom/oxford/8.jpg",
        ],
      },
      {
        name: "Northern Ireland",
        images: [
          "/work/travel-destination/united-kingdom/northern-ireland/1.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/2.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/3.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/4.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/5.jpg",
          "/work/travel-destination/united-kingdom/northern-ireland/6.jpg",
        ],
      },
    ],
  },
  {
    slug: "united-states",
    title: "United States",
    coverImage: "/work/travel-destination/united-states/chicago/1.jpg",
    description: "Architectural grandeur and urban energy across Chicago, Detroit, and Boston.",
    areas: [
      {
        name: "Chicago",
        images: [
          "/work/travel-destination/united-states/chicago/2.jpg",
          "/work/travel-destination/united-states/chicago/3.jpg",
          "/work/travel-destination/united-states/chicago/4.jpg",
          "/work/travel-destination/united-states/chicago/5.jpg",
          "/work/travel-destination/united-states/chicago/6.jpg",
          "/work/travel-destination/united-states/chicago/7.jpg",
          "/work/travel-destination/united-states/chicago/8.jpg",
          "/work/travel-destination/united-states/chicago/9.jpg",
          "/work/travel-destination/united-states/chicago/10.jpg",
          "/work/travel-destination/united-states/chicago/11.jpg",
          "/work/travel-destination/united-states/chicago/12.jpg",
          "/work/travel-destination/united-states/chicago/13.jpg",
          "/work/travel-destination/united-states/chicago/14.jpg",
          "/work/travel-destination/united-states/chicago/15.jpg",
          "/work/travel-destination/united-states/chicago/16.jpg",
        ],
      },
      {
        name: "Detroit",
        images: [
          "/work/travel-destination/united-states/detroit/1.jpg",
          "/work/travel-destination/united-states/detroit/2.jpg",
          "/work/travel-destination/united-states/detroit/3.jpg",
          "/work/travel-destination/united-states/detroit/4.jpg",
          "/work/travel-destination/united-states/detroit/5.jpg",
          "/work/travel-destination/united-states/detroit/6.jpg",
          "/work/travel-destination/united-states/detroit/7.jpg",
          "/work/travel-destination/united-states/detroit/8.jpg",
          "/work/travel-destination/united-states/detroit/9.jpg",
        ],
      },
      {
        name: "Boston",
        images: [
          "/work/travel-destination/united-states/boston/1.jpg",
          "/work/travel-destination/united-states/boston/2.jpg",
          "/work/travel-destination/united-states/boston/3.jpg",
          "/work/travel-destination/united-states/boston/4.jpg",
          "/work/travel-destination/united-states/boston/5.jpg",
          "/work/travel-destination/united-states/boston/6.jpg",
        ],
      },
    ],
  },
  {
    slug: "malaysia",
    title: "Malaysia",
    coverImage: "/work/travel-destination/malaysia/1.jpg",
    description: "Tropical light, vibrant culture, and lush landscapes across Malaysia.",
    areas: [
      {
        name: "Malaysia",
        images: [
          "/work/travel-destination/malaysia/2.jpg",
          "/work/travel-destination/malaysia/3.jpg",
          "/work/travel-destination/malaysia/4.jpg",
          "/work/travel-destination/malaysia/5.jpg",
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
    slug: "united-kingdom",
    title: "United Kingdom",
    categorySlug: "travel-destination",
    description: "From the streets of London to the cliffs of Seven Sisters and the wild beauty of Northern Ireland.",
    coverImage: "/work/travel-destination/united-kingdom/london/0.jpg",
    images: [],
  },
  {
    slug: "chile",
    title: "Chile",
    categorySlug: "travel-destination",
    description: "Glacial waters, jagged peaks, and the raw grandeur of Patagonia.",
    coverImage: "/work/travel-destination/chile/dsc08376.jpg",
    images: [],
  },
];
