import assert from "node:assert/strict";
import test from "node:test";
import { sortProducts } from "../app/catalog/product-sort.ts";

test("sorts price numerically, keeps unpriced items last, and preserves input order", () => {
  const products = [{ name: "B", priceCents: 1200 }, { name: "C" }, { name: "A", priceCents: 900 }];
  assert.deepEqual(sortProducts(products, "price-asc").map(p => p.name), ["A", "B", "C"]);
  assert.deepEqual(sortProducts(products, "price-desc").map(p => p.name), ["B", "A", "C"]);
  assert.deepEqual(sortProducts(products, "name").map(p => p.name), ["A", "B", "C"]);
  assert.deepEqual(products.map(p => p.name), ["B", "C", "A"]);
});
