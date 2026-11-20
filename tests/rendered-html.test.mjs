import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path) {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(
    new Request(new URL(path, "http://localhost"), { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("the homepage links to the standalone catalog", async () => {
  const html = await render("/");
  assert.match(html, /# Smoke Shop/);
  assert.match(html, /href="\/catalog\/?"/);
});

test("the catalog renders its filters and all products have local photos", async () => {
  const html = await render("/catalog");
  assert.match(html, /All categories/);
  assert.match(html, /All brands/);
  assert.match(html, /value="refills">Refills/);

  const products = JSON.parse(await readFile(new URL("../app/catalog/products.json", import.meta.url), "utf8"));
  assert.equal(new Set(products.map(({ id }) => id)).size, products.length);
  for (const { image } of products) {
    assert.match(image, /^\/images\/catalog\//);
    assert.ok(html.includes(image), image);
    await access(new URL(`../public${image}`, import.meta.url));
  }
});
