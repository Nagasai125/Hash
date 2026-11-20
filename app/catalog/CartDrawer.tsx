import type { Ref } from "react";
import { catalogIsPreview, catalogProducts } from "./catalog-data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CartDrawer({ drawerRef, cart, itemCount, updateCart }: {
  drawerRef: Ref<HTMLDialogElement>;
  cart: Record<string, number>;
  itemCount: number;
  updateCart: (id: string, delta: number) => void;
}) {
  const products = catalogProducts.filter(({ id }) => cart[id] > 0);
  const subtotal = products.reduce((total, { id, priceCents }) => total + (priceCents ?? 0) * cart[id], 0);
  const hasUnpriced = products.some(({ priceCents }) => priceCents == null);

  return (
    <dialog className="shop-cart" ref={drawerRef} aria-labelledby="cart-title">
      <header className="cart-header">
        <div>
          <p className="section-label"># Smoke Shop</p>
          <h2 id="cart-title">Your cart <span aria-live="polite">{itemCount} {itemCount === 1 ? "item" : "items"}</span></h2>
        </div>
        <form method="dialog">
          <button className="cart-close" aria-label="Close cart">×</button>
        </form>
      </header>
      <div className="cart-body">
        {products.length === 0 ? (
          <div className="cart-empty">
            <span aria-hidden="true">#</span>
            <h3>Your cart is empty</h3>
            <p>Add a product from the catalog to get started.</p>
          </div>
        ) : (
          <ul>
            {products.map(({ id, name, brand, image, priceCents }) => (
              <li key={id}>
                <div className="cart-photo">{image && <img src={`${basePath}${image}`} alt="" loading="lazy" />}</div>
                <div className="cart-item">
                  {brand && <small>{brand}</small>}
                  <h3>{name}</h3>
                  <span>{priceCents == null ? "Call for price" : `${money.format(priceCents / 100)} each`}</span>
                  <div className="cart-item-actions">
                    <div className="shop-quantity" role="group" aria-label={`Quantity of ${name}`}>
                      <button type="button" aria-label={`Decrease quantity of ${name}`} onClick={() => updateCart(id, -1)}>−</button>
                      <span>{cart[id]}</span>
                      <button type="button" aria-label={`Increase quantity of ${name}`} onClick={() => updateCart(id, 1)}>+</button>
                    </div>
                    <button className="cart-remove" type="button" aria-label={`Remove ${name} from cart`} onClick={() => updateCart(id, -cart[id])}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="cart-footer">
        {products.length > 0 && <div className="cart-total" aria-live="polite">
          <span>{hasUnpriced ? "Priced items subtotal" : "Subtotal"}</span>
          <strong>{money.format(subtotal / 100)}</strong>
        </div>}
        <p>{catalogIsPreview ? "Sample prices only. Online orders aren’t open yet." : "Online orders aren’t open yet."}</p>
        <form method="dialog"><button className="button button--primary">Continue browsing</button></form>
      </footer>
    </dialog>
  );
}
