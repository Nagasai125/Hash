import products from "./products.json";

export type CatalogCategory = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  includes: string[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  categoryId: CatalogCategory["id"];
  brand?: string;
  description?: string;
  image?: string;
  priceCents?: number;
  imageSource?: string;
  illustrativeImage?: boolean;
  availability?: "In stock" | "Low stock" | "Call to confirm";
  tags?: string[];
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "vapes",
    name: "Vapes",
    eyebrow: "Devices & flavor",
    description:
      "Disposables, refillable pod systems, coils, pods, and e-liquids. We can help you find the right setup.",
    image: "/images/vape.jpg",
    alt: "Black vape device surrounded by natural vapor",
    includes: ["Disposables", "Pod systems", "Coils & pods", "E-liquids"],
  },
  {
    id: "premium-cigars",
    name: "Premium cigars",
    eyebrow: "Humidor selection",
    description:
      "Humidor-kept classics, everyday favorites, and special-occasion sticks selected for every kind of smoke.",
    image: "/images/cigars.jpg",
    alt: "Premium cigar resting on a wooden humidor",
    includes: ["Everyday favorites", "Premium sticks", "Special occasions", "Accessories"],
  },
  {
    id: "glass-hookah",
    name: "Glass & hookah",
    eyebrow: "Statement pieces",
    description:
      "Functional glass, standout hookahs, bowls, hoses, charcoal, and the details that complete a reliable setup.",
    image: "/images/hookah.jpg",
    alt: "Illuminated glass hookah in a lounge",
    includes: ["Functional glass", "Hookahs", "Bowls & hoses", "Charcoal"],
  },
  {
    id: "daily-essentials",
    name: "Daily essentials",
    eyebrow: "Everything else",
    description:
      "The dependable pieces you reach for most, ready for restocks, replacements, and last-minute runs.",
    image: "/images/glass.jpg",
    alt: "Hookah and accessories on a wooden table",
    includes: ["Papers & wraps", "Trays & grinders", "Lighters", "Storage & cleaning"],
  },
  {
    id: "botanicals",
    name: "Botanicals & edibles",
    eyebrow: "Flower & gummies",
    description: "Reference listings for botanicals and edibles.",
    image: "",
    alt: "",
    includes: [],
  },
];

// shortcut: local snapshot, replace with verified records from the Sheets export.
export const catalogIsPreview = true;
export const catalogProducts: CatalogProduct[] = products;
