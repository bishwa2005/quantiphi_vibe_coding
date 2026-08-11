const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api/products";

// Sidebar bootstrap data: category list + counts, and the overall price floor/ceiling.
export async function fetchMeta() {
  const res = await fetch(`${API_BASE}/meta`);
  if (!res.ok) throw new Error(`Meta request failed (${res.status})`);
  return res.json();
}

// Fetches the filtered + sorted product set for the current sidebar state.
// `criteria.categories` is expected as a Set<string>; everything else is a number.
export async function fetchProducts(criteria) {
  const params = new URLSearchParams();

  if (criteria.categories && criteria.categories.size > 0) {
    params.set("categories", [...criteria.categories].join(","));
  }
  if (criteria.minPrice !== undefined) params.set("minPrice", criteria.minPrice);
  if (criteria.maxPrice !== undefined) params.set("maxPrice", criteria.maxPrice);
  if (criteria.minRating) params.set("minRating", criteria.minRating);
  if (criteria.sort) params.set("sort", criteria.sort);

  const res = await fetch(`${API_BASE}?${params.toString()}`);
  if (!res.ok) throw new Error(`Products request failed (${res.status})`);
  return res.json();
}
