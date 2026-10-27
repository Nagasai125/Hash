"use client";

import { useMemo, useState } from "react";
import { catalogCategories, catalogProducts } from "./catalog-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CatalogExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return catalogProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const searchableText = [
        product.name,
        product.brand,
        product.description,
        ...(product.tags ?? []),
      ].filter(Boolean).join(" ").toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  return (
    <section className="catalog-results shell" id="browse" aria-labelledby="all-products-title">
      <div className="catalog-results__heading">
        <div>
          <p className="section-label">Full inventory</p>
          <h2 id="all-products-title">All products.<br />One clean view.</h2>
        </div>
        <p>
          Search by name or brand, then narrow the list by category. Availability
          can change daily, so call to confirm before making the trip.
        </p>
      </div>

      <div className="catalog-toolbar" aria-label="Search and filter products">
        <label className="catalog-search">
          <span className="sr-only">Search products</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products or brands"
          />
        </label>

        <div className="catalog-filter__controls">
          <button
            type="button"
            className={activeCategory === "all" ? "is-active" : ""}
            onClick={() => setActiveCategory("all")}
          >All</button>
          {catalogCategories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={activeCategory === category.id ? "is-active" : ""}
              onClick={() => setActiveCategory(category.id)}
            >{category.name}</button>
          ))}
        </div>
      </div>

      <div className="catalog-results__meta">
        <span>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>
        <span>{activeCategory === "all" ? "All categories" : catalogCategories.find((category) => category.id === activeCategory)?.name}</span>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="catalog-products" aria-live="polite">
          {visibleProducts.map((product) => {
            const category = catalogCategories.find((item) => item.id === product.categoryId);

            return (
              <article className="catalog-product" key={product.id}>
                <div className="catalog-product__visual">
                  {product.image ? (
                    <img src={`${basePath}${product.image}`} alt={product.name} loading="lazy" />
                  ) : (
                    <span aria-hidden="true">#</span>
                  )}
                  {product.availability && <em>{product.availability}</em>}
                </div>
                <div className="catalog-product__copy">
                  <p>{product.brand ?? category?.name}</p>
                  <h3>{product.name}</h3>
                  {product.description && <span>{product.description}</span>}
                  <div>
                    <small>{category?.name}</small>
                    <strong>{product.price ?? "Call for price"}</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : catalogProducts.length === 0 ? (
        <div className="catalog-empty" aria-live="polite">
          <span aria-hidden="true">#</span>
          <div>
            <p className="section-label">Inventory setup ready</p>
            <h3>The shelves are ready for your products.</h3>
            <p>
              The catalog structure is complete. Product names, brands, photos,
              pricing, and availability can now be added without redesigning the page.
            </p>
          </div>
          <a className="button button--primary" href="tel:+15125687868">Call for today&apos;s stock</a>
        </div>
      ) : (
        <div className="catalog-empty catalog-empty--search" aria-live="polite">
          <div>
            <p className="section-label">No matches</p>
            <h3>Try another search or category.</h3>
          </div>
          <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Clear filters</button>
        </div>
      )}
    </section>
  );
}
