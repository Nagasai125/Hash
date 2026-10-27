import type { Metadata } from "next";
import CatalogExplorer from "./CatalogExplorer";
import { catalogCategories } from "./catalog-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Catalog | # Smoke Shop North Austin",
  description:
    "Explore vapes, premium cigars, glass, hookah, and daily essentials at # Smoke Shop on North Lamar.",
};

export default function CatalogPage() {
  return (
    <main className="catalog-page">
      <div className="age-note">21+ • Please enjoy responsibly</div>

      <header className="catalog-nav shell">
        <a href={`${basePath}/`} className="catalog-nav__brand" aria-label="# Smoke Shop home">
          <img src={`${basePath}/man-logo-mark.svg`} alt="" />
          <span><b>#</b> Smoke Shop</span>
        </a>
        <nav aria-label="Catalog navigation">
          <a href={`${basePath}/`}>Home</a>
          <a href={`${basePath}/#story`}>Our story</a>
          <a href={`${basePath}/#visit`}>Visit</a>
          <a className="nav__call" href="tel:+15125687868">Call us</a>
        </nav>
      </header>

      <section className="catalog-hero" aria-labelledby="catalog-page-title">
        <div className="catalog-hero__orbit" aria-hidden="true">
          {catalogCategories.map((category, index) => (
            <figure className={`catalog-hero__tile catalog-hero__tile--${index + 1}`} key={category.id}>
              <img src={`${basePath}${category.image}`} alt="" />
            </figure>
          ))}
          <span className="catalog-hero__signal">#</span>
        </div>
        <div className="catalog-hero__content shell">
          <p className="section-label">The selection • North Austin</p>
          <h1 id="catalog-page-title">Find what fits.<br /><span>Skip the guesswork.</span></h1>
          <p>
            Browse the shop by category, then call for today&apos;s exact brands,
            flavors, sizes, and availability. We&apos;ll help narrow it down before you arrive.
          </p>
          <div className="catalog-hero__actions">
            <a className="button button--primary" href="#browse">Browse categories</a>
            <a className="button button--glass" href="tel:+15125687868">(512) 568-7868</a>
          </div>
        </div>
        <a className="catalog-hero__back" href={`${basePath}/`}>← Back to home</a>
      </section>

      <div id="browse"><CatalogExplorer /></div>

      <section className="catalog-assist">
        <div className="catalog-assist__hash" aria-hidden="true">#</div>
        <div className="catalog-assist__content shell">
          <p className="section-label">Need a real answer?</p>
          <h2>Tell us what you like.<br />We&apos;ll narrow it down.</h2>
          <p>
            Selection moves fast. Call before your visit for current stock, or stop in
            and we&apos;ll help you build the right setup in person.
          </p>
          <div>
            <a className="button button--primary" href="tel:+15125687868">Call for stock</a>
            <a className="button button--glass" href="https://www.google.com/maps/dir/?api=1&destination=10014+N+Lamar+Blvd+Austin+TX+78753" target="_blank" rel="noreferrer">Get directions ↗</a>
          </div>
        </div>
      </section>

      <footer className="footer shell catalog-footer">
        <div className="footer__brand">
          <img src={`${basePath}/man-logo-mark.svg`} alt="" />
          <span className="logo"><span className="logo__mark">#</span><span className="logo__type">SMOKE SHOP</span></span>
        </div>
        <p>10014 N Lamar Blvd, Austin, TX 78753</p>
        <p>For adults 21+ only.</p>
      </footer>
    </main>
  );
}
