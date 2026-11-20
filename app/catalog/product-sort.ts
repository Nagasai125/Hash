type ProductSort = "featured" | "price-asc" | "price-desc" | "name";

export function sortProducts<T extends { name: string; priceCents?: number }>(products: T[], sort: ProductSort) {
  if (sort === "featured") return products;
  return [...products].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (a.priceCents == null) return b.priceCents == null ? 0 : 1;
    if (b.priceCents == null) return -1;
    return sort === "price-asc" ? a.priceCents - b.priceCents : b.priceCents - a.priceCents;
  });
}

export type { ProductSort };
