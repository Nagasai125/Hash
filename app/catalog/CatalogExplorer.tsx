"use client";

import { useMemo, useState } from "react";
import {
  catalogCategories,
  catalogProducts,
  type CatalogCategory,
} from "./catalog-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function CategoryPanel({ category, index }: { category: CatalogCategory; index: number }) {
  const products = catalogProducts.filter((product) => product.categoryId === category.id);

  return (
    <article className="catalog-panel" id={category.id}>
      <div className="catalog-panel__image-wrap">
        <img
          src={`${basePath}${category.image}`}
          alt={category.alt}
          className="catalog-panel__image"
          loading="lazy"
        />
        <div className="catalog-panel__image-shade" />
        <span className="catalog-panel__number">0{index + 1}</span>
        <p className="catalog-panel__eyebrow">{category.eyebrow}</p>
      </div>

      <div className="catalog-panel__content">
        <div>
          <p className="catalog-panel__status"><i /> Stock changes daily</p>
          <h2>{category.name}</h2>
          <p className="catalog-panel__description">{category.description}</p>
        </div>

        <ul className="catalog-panel__includes" aria-label={`${category.name} includes`}>
          {category.includes.map((item) => <li key={item}>{item}</li>)}
        </ul>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                {product.image ? (
                  <img src={`${basePath}${product.image}`} alt="" />
                ) : <div className="product-card__mark">#</div>}
                <div className="product-card__copy">
                  <p>{product.brand ?? category.name}</p>
                  <h3>{product.name}</h3>
                  {product.description && <span>{product.description}</span>}
                  <div>
                    {product.price && <strong>{product.price}</strong>}
                    <em>{product.availability ?? "Call to confirm"}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-panel__pending">
            <span>Product lineup coming next</span>
            <p>Call and we&apos;ll confirm today&apos;s brands, flavors, sizes, and availability.</p>
            <a href="tel:+15125687868">Call for {category.name.toLowerCase()} ↗</a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function CatalogExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleCategories = useMemo(
    () => activeCategory === "all"
      ? catalogCategories
      : catalogCategories.filter((category) => category.id === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <div className="catalog-filter shell" aria-label="Filter catalog categories">
        <div className="catalog-filter__label">
          <span>Browse by category</span>
          <small>{catalogProducts.length > 0 ? `${catalogProducts.length} products` : "Inventory preview"}</small>
        </div>
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

      <section className="catalog-list shell" aria-live="polite">
        {visibleCategories.map((category) => (
          <CategoryPanel
            category={category}
            index={catalogCategories.findIndex((item) => item.id === category.id)}
            key={category.id}
          />
        ))}
      </section>
    </>
  );
}
