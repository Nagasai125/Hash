export function changeQuantity(cart: Record<string, number>, id: string, delta: number) {
  const next = { ...cart };
  const quantity = (cart[id] ?? 0) + delta;
  if (quantity > 0) next[id] = quantity;
  else delete next[id];
  return next;
}
