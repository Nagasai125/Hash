"use client";

import { useMemo, useState } from "react";
import { catalogCategories, catalogProducts } from "./catalog-data";
import { changeQuantity } from "./cart";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CatalogExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  // shortcut: page-session cart only, add persistence when checkout is defined.
  const [cart, setCart] = useState<Record<string, number>>({});
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const updateCart = (id: string, delta: number) => setCart((current) => changeQuantity(current, id, delta));
  const selectedCategory = catalogCategories.find((category) => category.id === activeCategory);
  const hasProducts = catalogProducts.length > 0;

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
    <section className="shop shell" id="browse" aria-labelledby="all-products-title">
      <div className="shop-intro">
        <p className="section-label">The North Lamar storefront</p>
        <h1 id="all-products-title">Shop the <span>catalog.</span></h1>
        <p>{hasProducts ? "Browse products and build your cart. Online checkout isn’t open yet." : "Explore our departments while we prepare the online product listings."}</p>
      </div>

      <div className="shop-categories" role="group" aria-label="Browse by category">
        {catalogCategories.map((category) => (
          <button key={category.id} type="button" aria-pressed={activeCategory === category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? "all" : category.id)}>
            <img src={`${basePath}${category.image}`} alt="" />
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
          <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Clear filters</button>
        </div>
      )}
      <section className="shop-cart" aria-labelledby="cart-title">
        <h2 id="cart-title" aria-live="polite">Your cart ({itemCount})</h2>
        {itemCount === 0 ? <p>{hasProducts ? "Add a product to get started." : "You’ll be able to add items when product listings are available."}</p> : (
          <ul>
            {catalogProducts.filter(({ id }) => cart[id] > 0).map(({ id, name, price }) => (
              <li key={id}>
                <span><strong>{name}</strong><small>{price ? `${price} each` : "Call for price"}</small></span>
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
        <p>Checkout is not available yet. Adding items does not place an order.</p>
      </section>
      <aside className="shop-visit">
        <div><h2>Find it in-store</h2><p>Online product listings are not live inventory. Call to check availability.</p></div>
        <a className="button button--primary" href="tel:+15125687868">Call the shop</a>
        <a className="button button--glass" href={`${basePath}/#visit`}>Plan your visit</a>
      </aside>
    </section>
  );
}
