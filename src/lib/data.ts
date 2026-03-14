export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  type: "photo" | "video" | "both";
  client?: string;
  year?: string;
  featured?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "hospitality",
    title: "Hospitality",
    description:
      "Cinematic content for hotels, restaurants, bars, and cafes. Capturing the atmosphere, experience, and story of every space.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
  },
  {
    slug: "architecture-interiors",
    title: "Architecture & Interiors",
    description:
      "Visual storytelling for real estate developers, interior designers, and architects. Highlighting form, light, and material.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    slug: "travel-destination",
    title: "Travel & Destination",
    description:
      "Destination marketing and cinematic travel content for tourism boards and travel brands. Making places unforgettable.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
  },
  {
    slug: "brand-commercial",
    title: "Brand & Commercial",
    description:
      "Premium content for lifestyle brands and commercial projects. Elevating products and stories through cinematic craft.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  },
];

// Placeholder projects — replace with real work
export const projects: Project[] = [
  // Hospitality
  {
    id: "hotel-lobby-film",
    title: "Boutique Hotel — Lobby & Suites",
    category: "Hospitality",
    categorySlug: "hospitality",
    description: "A cinematic walkthrough capturing the atmosphere of a boutique hotel interior.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    type: "both",
    client: "Sample Hotel",
    year: "2026",
    featured: true,
  },
  {
    id: "restaurant-ambiance",
    title: "Fine Dining — Evening Service",
    category: "Hospitality",
    categorySlug: "hospitality",
    description: "Moody, intimate visual story of a high-end restaurant during evening service.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    type: "photo",
    client: "Sample Restaurant",
    year: "2026",
  },
  {
    id: "cocktail-bar",
    title: "Speakeasy Bar — Brand Content",
    category: "Hospitality",
    categorySlug: "hospitality",
    description: "Atmospheric photography and video for a hidden cocktail bar.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    type: "both",
    client: "Sample Bar",
    year: "2026",
  },
  // Architecture & Interiors
  {
    id: "modern-residence",
    title: "Modern Residence — Toronto",
    category: "Architecture & Interiors",
    categorySlug: "architecture-interiors",
    description: "Architectural photography highlighting clean lines and natural light in a modern home.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    type: "photo",
    client: "Sample Developer",
    year: "2026",
    featured: true,
  },
  {
    id: "interior-design-studio",
    title: "Design Studio — Workspace",
    category: "Architecture & Interiors",
    categorySlug: "architecture-interiors",
    description: "A visual study of materiality and space in a contemporary design studio.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    type: "photo",
    client: "Sample Studio",
    year: "2026",
  },
  {
    id: "luxury-condo",
    title: "Luxury Condominium — Penthouse",
    category: "Architecture & Interiors",
    categorySlug: "architecture-interiors",
    description: "Cinematic real estate video showcasing a penthouse suite with skyline views.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    type: "video",
    client: "Sample Real Estate",
    year: "2026",
  },
  // Travel & Destination
  {
    id: "bali-destination",
    title: "Bali — Island Life",
    category: "Travel & Destination",
    categorySlug: "travel-destination",
    description: "Cinematic travel film capturing the spirit and beauty of Bali.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    type: "video",
    client: "Personal Project",
    year: "2026",
    featured: true,
  },
  {
    id: "japan-streets",
    title: "Tokyo — After Dark",
    category: "Travel & Destination",
    categorySlug: "travel-destination",
    description: "Night photography and film through the neon-lit streets of Tokyo.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    type: "both",
    client: "Personal Project",
    year: "2026",
  },
  {
    id: "vietnam-countryside",
    title: "Vietnam — The Quiet North",
    category: "Travel & Destination",
    categorySlug: "travel-destination",
    description: "Documentary-style visuals from the mountains and rice terraces of northern Vietnam.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    type: "photo",
    client: "Personal Project",
    year: "2026",
  },
  // Brand & Commercial
  {
    id: "lifestyle-brand",
    title: "Lifestyle Brand — Product Launch",
    category: "Brand & Commercial",
    categorySlug: "brand-commercial",
    description: "Commercial photography and video for a lifestyle brand product campaign.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    type: "both",
    client: "Sample Brand",
    year: "2026",
    featured: true,
  },
  {
    id: "fashion-editorial",
    title: "Editorial — Urban Collection",
    category: "Brand & Commercial",
    categorySlug: "brand-commercial",
    description: "Fashion-forward editorial shoot in an urban environment.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    type: "photo",
    client: "Sample Fashion",
    year: "2026",
  },
  {
    id: "coffee-brand",
    title: "Artisan Coffee — Brand Film",
    category: "Brand & Commercial",
    categorySlug: "brand-commercial",
    description: "A short brand film following the journey from bean to cup.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    type: "video",
    client: "Sample Coffee Co.",
    year: "2026",
  },
];

export function getProjectsByCategory(slug: string): Project[] {
  return projects.filter((p) => p.categorySlug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
