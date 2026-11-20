"use client";

import { useMemo, useRef, useState } from "react";
import CartDrawer from "./CartDrawer";
import { catalogCategories, catalogIsPreview, catalogProducts } from "./catalog-data";
import { changeQuantity } from "./cart";
import { sortProducts, type ProductSort } from "./product-sort";
import { matchesSearch, searchWords } from "./product-search";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const brands = [...new Set(catalogProducts.flatMap(({ brand }) => brand ? [brand] : []))].sort();
const categoryNames = new Map(catalogCategories.map(({ id, name }) => [id, name]));

export default function CatalogExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState<ProductSort>("featured");
  // shortcut: page-session cart only, add persistence when checkout is defined.
  const [cart, setCart] = useState<Record<string, number>>({});
  const drawerRef = useRef<HTMLDialogElement>(null);
  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const updateCart = (id: string, delta: number) => setCart((current) => changeQuantity(current, id, delta));
  const selectedCategory = catalogCategories.find((category) => category.id === activeCategory);
  const hasProducts = catalogProducts.length > 0;

  const visibleProducts = useMemo(() => {
    const terms = searchWords(query);

    return sortProducts(catalogProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      return matchesCategory && (!brand || product.brand === brand) && matchesSearch(terms, [
        product.name,
        product.brand,
        categoryNames.get(product.categoryId),
        product.description,
        ...(product.tags ?? []),
      ]);
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
        <label>Category <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}>
          <option value="all">All categories</option>
          {catalogCategories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select></label>
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
        <button className="cart-trigger" type="button" aria-haspopup="dialog" onClick={() => drawerRef.current?.showModal()}>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
          Cart <span aria-live="polite">{itemCount}</span>
        </button>
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

      {hasProducts && <div className="sr-only" aria-live="polite">
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
                    <img className="is-packshot" src={`${basePath}${product.image}`} alt={product.name} loading="lazy" />
                  ) : (
                    <div className="shop-product-placeholder" aria-hidden="true"><b>#</b><small>{category?.name}</small></div>
                  )}
                  {product.availability && <em>{product.availability}</em>}
                </div>
                <div className="catalog-product__copy">
                  <p>{product.brand ?? category?.name}</p>
                  <h3>{product.name}</h3>
                  {product.description && <span>{product.description}</span>}
                  <div>
                    <small>{category?.name}</small>
                    <strong>{product.priceCents == null ? "Call for price" : usd.format(product.priceCents / 100)}</strong>
                  </div>
                  <button className="button button--primary shop-add" type="button" onClick={() => { updateCart(product.id, 1); drawerRef.current?.showModal(); }} aria-label={`Add ${product.name} to cart`}>Add to cart</button>
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
      <CartDrawer drawerRef={drawerRef} cart={cart} itemCount={itemCount} updateCart={updateCart} />
      {!catalogIsPreview && <aside className="shop-visit">
        <div><h2>Find it in-store</h2><p>Online product listings are not live inventory. Call to check availability.</p></div>
        <a className="button button--primary" href="tel:+15125687868">Call the shop</a>
        <a className="button button--glass" href={`${basePath}/#visit`}>Plan your visit</a>
      </aside>}
    </section>
  );
}
