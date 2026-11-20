# # Smoke Shop storefront

Storefront and preview catalog for # Smoke Shop in North Austin. Products, photos,
and prices are sample listings. The cart stays in the current page session;
checkout, payments, and delivery are disabled.

## Project layout

| Path | Responsibility |
| --- | --- |
| `app/` | Frontend routes, components, and styles. `app/catalog/` contains the catalog, filters, cart, and product JSON. |
| `backend/` | Cloudflare Worker entry point, server-side auth helpers, D1 schema, and Drizzle migrations. No live database is configured. |
| `public/` | Static brand assets and product photos. Use `public/images/catalog/` for catalog images. |
| `build/` | Sites packaging plugin. |
| `tests/` | Search, sort, and cart unit tests, plus Worker render and image reference checks. |
| `examples/d1/` | Optional notes example. Not mounted in the storefront. |

## Run locally

Use Node.js 22.13 or later. Check out the project in a folder without `#` in
its path; Vinext can misread it when loading its config.

```sh
npm ci
npm run dev
npm test
```

Open `http://localhost:3000/catalog`. `npm test` builds the Worker and runs the
storefront checks. Run `npm run db:generate` after changing
`backend/db/schema.ts`, if D1 has been enabled.

## Update the catalog

Edit `app/catalog/products.json`. Keep IDs unique, use integer `priceCents`,
and match each `categoryId` to `app/catalog/catalog-data.ts`. Paths starting
with `/images/catalog/` resolve under `public/`. Keep source links for preview
photos and verify inventory, pricing, and image rights before a public launch.

## Deployment

GitHub Pages uses the static build in `.github/workflows/pages.yml` and deploys
from `main`. To reproduce the static build locally:

```sh
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Hash npm run build:pages
```

The private Sites deployment uses the Worker build (`npm run build`) and the
existing `.openai/hosting.json`. Keep secrets out of Git. Sign-in helpers in
`backend/chatgpt-auth.ts` depend on Sites identity headers and are not used by
the static storefront.
