import assert from "node:assert/strict";
import test from "node:test";
import { changeQuantity } from "../app/catalog/cart.ts";

test("adds items, updates quantities, and removes empty lines without mutating the cart", () => {
  const cart = { first: 1 };
  const added = changeQuantity(cart, "second", 1);
  assert.deepEqual(changeQuantity(added, "first", 1), { first: 2, second: 1 });
  assert.deepEqual(changeQuantity(added, "first", -1), { second: 1 });
  assert.deepEqual(cart, { first: 1 });
});
