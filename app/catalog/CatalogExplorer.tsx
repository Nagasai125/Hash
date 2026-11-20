"use client";

import { useMemo, useState } from "react";
import { catalogCategories, catalogIsPreview, catalogProducts } from "./catalog-data";
import { changeQuantity } from "./cart";
import { sortProducts, type ProductSort } from "./product-sort";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const brands = [...new Set(catalogProducts.flatMap(({ brand }) => brand ? [brand] : []))].sort();

export default function CatalogExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState<ProductSort>("featured");
  // shortcut: page-session cart only, add persistence when checkout is defined.
  const [cart, setCart] = useState<Record<string, number>>({});
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const updateCart = (id: string, delta: number) => setCart((current) => changeQuantity(current, id, delta));
  const selectedCategory = catalogCategories.find((category) => category.id === activeCategory);
  const hasProducts = catalogProducts.length > 0;

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sortProducts(catalogProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const searchableText = [
        product.name,
        product.brand,
        product.description,
        ...(product.tags ?? []),
      ].filter(Boolean).join(" ").toLowerCase();

      return matchesCategory && (!brand || product.brand === brand) && (!normalizedQuery || searchableText.includes(normalizedQuery));
    }), sort);
  }, [activeCategory, brand, query, sort]);

  function clearFilters() {
    setQuery("");
    setBrand("");
    setActiveCategory("all");
    setSort("featured");
  }

  return (
    <section className="shop shell" id="browse" aria-labelledby="all-products-title">
      <div className="shop-intro">
        <p className="section-label"># Smoke Shop · North Austin</p>
        <h1 id="all-products-title">Shop <span>catalog</span></h1>
        <p>{catalogIsPreview ? "Sample prices only. We haven’t confirmed what’s in stock." : hasProducts ? "Online checkout isn’t available yet." : "Products aren’t listed online yet."}</p>
      </div>

      {hasProducts && <div className="shop-options">
        <label>Brand <select value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="">All brands</option>
          {brands.map((name) => <option key={name}>{name}</option>)}
        </select></label>
        <label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value as ProductSort)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name: A–Z</option>
        </select></label>
        {(query || brand || selectedCategory || sort !== "featured") && <button type="button" onClick={clearFilters}>Reset</button>}
        <a href="#cart-title">View cart ({itemCount})</a>
      </div>}

      <div className="shop-categories" role="group" aria-label="Browse by category">
        {catalogCategories.map((category) => (
          <button key={category.id} type="button" aria-pressed={activeCategory === category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? "all" : category.id)}>
            {category.image && <img src={`${basePath}${category.image}`} alt="" />}
            <span>{category.eyebrow}<strong>{category.name}</strong></span>
          </button>
        ))}
      </div>

      <div className="shop-bar">
        <h2>{selectedCategory?.name ?? (hasProducts ? "All products" : "Shop by department")}</h2>
        {hasProducts &&
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
        }
        {selectedCategory && <button type="button" onClick={() => setActiveCategory("all")}>View all</button>}
      </div>

      {hasProducts && <div className="catalog-results__meta" aria-live="polite">
        <span>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>
      </div>}

      {visibleProducts.length > 0 ? (
        <div className="catalog-products" aria-live="polite">
          {visibleProducts.map((product) => {
            const category = catalogCategories.find((item) => item.id === product.categoryId);

            return (
              <article className="catalog-product" key={product.id}>
                <div className="catalog-product__visual" style={{ backgroundImage: `url("${basePath}/images/catalog/studio.webp")` }}>
                  {product.image ? (
                    <img className={product.illustrativeImage ? "is-illustration" : "is-packshot"} src={`${basePath}${product.image}`} alt={product.illustrativeImage ? "" : product.name} loading="lazy" />
                  ) : (
                    <div className="shop-product-placeholder" aria-hidden="true"><b>#</b><small>{category?.name}</small></div>
                  )}
                  {product.illustrativeImage ? <em>Example image</em> : product.availability && <em>{product.availability}</em>}
                </div>
                <div className="catalog-product__copy">
                  <p>{product.brand ?? category?.name}</p>
                  <h3>{product.name}</h3>
                  {product.description && <span>{product.description}</span>}
                  <div>
                    <small>{category?.name}</small>
                    <strong>{product.priceCents == null ? "Call for price" : usd.format(product.priceCents / 100)}</strong>
                  </div>
                  <button className="button button--primary shop-add" type="button" onClick={() => updateCart(product.id, 1)} aria-label={`Add ${product.name} to cart`}>Add to cart</button>
                </div>
              </article>
            );
          })}
        </div>
      ) : !hasProducts ? (
        <div className="shop-departments">
          {(selectedCategory ? [selectedCategory] : catalogCategories).map((category) => (
            <article key={category.id}>
              <h3>{category.name}</h3>
              <ul>{category.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      ) : (
        <div className="catalog-empty catalog-empty--search" aria-live="polite">
          <div>
            <p className="section-label">No matches</p>
            <h3>Try another search or category.</h3>
          </div>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
      <section className="shop-cart" aria-labelledby="cart-title">
        <h2 id="cart-title" aria-live="polite">Your cart ({itemCount})</h2>
        {itemCount === 0 ? <p>Your cart is empty.</p> : (
          <ul>
            {catalogProducts.filter(({ id }) => cart[id] > 0).map(({ id, name, priceCents }) => (
              <li key={id}>
                <span><strong>{name}</strong><small>{priceCents == null ? "Call for price" : `${usd.format(priceCents / 100)} each`}</small></span>
                <div className="shop-quantity">
                  <button type="button" aria-label={`Decrease quantity of ${name}`} onClick={() => updateCart(id, -1)}>−</button>
                  <span>{cart[id]}</span>
                  <button type="button" aria-label={`Increase quantity of ${name}`} onClick={() => updateCart(id, 1)}>+</button>
                  <button type="button" aria-label={`Remove ${name} from cart`} onClick={() => updateCart(id, -cart[id])}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p>You can add items, but you can’t place an order yet.</p>
      </section>
      {!catalogIsPreview && <aside className="shop-visit">
        <div><h2>Find it in-store</h2><p>Online product listings are not live inventory. Call to check availability.</p></div>
        <a className="button button--primary" href="tel:+15125687868">Call the shop</a>
        <a className="button button--glass" href={`${basePath}/#visit`}>Plan your visit</a>
      </aside>}
    </section>
  );
}
