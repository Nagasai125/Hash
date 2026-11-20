import type { Metadata } from "next";
import CatalogExplorer from "./CatalogExplorer";
import "./storefront.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Catalog | # Smoke Shop North Austin",
  description:
    "Explore vapes, premium cigars, glass, hookah, and daily essentials at # Smoke Shop on North Lamar.",
};

export default function CatalogPage() {
  return (
    <main className="catalog-page storefront">
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

      <CatalogExplorer />

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
