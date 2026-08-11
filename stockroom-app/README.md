# Stockroom — Product Multi-Filter Sidebar

A two-tier app: an Express API that owns the product data and the
filter/sort logic, and a React (Vite) frontend that renders the sidebar
and the product grid against it.

```
stockroom-app/
├── backend/     Express REST API (port 4000)
└── frontend/    React + Vite client (port 5173)
```

## 1. Run the backend

```bash
cd backend
npm install
npm run dev        # nodemon, restarts on save
# or: npm start
```

Starts on `http://localhost:4000`. Endpoints:

- `GET /api/products/meta` — category list + counts, price floor/ceiling.
  Used once on load to build the sidebar.
- `GET /api/products?categories=Apparel,Footwear&minPrice=20&maxPrice=200&minRating=4&sort=price-asc`
  — filtered + sorted product list. All query params are optional; an
  absent or empty one is bypassed rather than treated as a restriction.

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. It expects the API at
`http://localhost:4000/api/products` by default — copy `.env.example` to
`.env` and set `VITE_API_URL` if you're pointing it somewhere else.

## How filtering works

`backend/src/utils/filterSort.js` is the core of the assignment:

- `filterProducts(products, criteria)` does a single pass over the master
  array and keeps an item only if it satisfies category **and** price
  range **and** minimum rating together (a true intersection, not three
  separate lists merged). An unset criterion — no categories checked, no
  rating tier chosen — is bypassed rather than excluding everything, so
  a blank filter state returns the full catalog.
- `sortProducts(products, sortKey)` only ever runs on the array
  `filterProducts` already returned, and always works on a shallow copy —
  so sorting can never change which items are showing, only their order.

The frontend never filters or sorts client-side — it just reflects
whatever state the sidebar is in as query params and renders whatever the
API sends back, debounced by ~120ms so dragging the price slider doesn't
fire a request on every pixel of movement while still feeling instant.
When the API returns zero items, the grid swaps for the
"No items match your criteria" panel with its own reset button.
