const { PRODUCTS } = require("../data/products");
const { filterProducts, sortProducts } = require("../utils/filterSort");

const PRICE_FLOOR = Math.min(...PRODUCTS.map((p) => p.price));
const PRICE_CEIL = Math.max(...PRODUCTS.map((p) => p.price));

/**
 * Turns raw query-string values into a typed criteria object.
 * Anything missing or malformed is treated as "not set," which
 * filterProducts() already knows how to bypass gracefully.
 */
function parseCriteria(query) {
  const categories = new Set(
    (query.categories || "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
  );

  const minPrice = query.minPrice !== undefined ? Number(query.minPrice) : PRICE_FLOOR;
  const maxPrice = query.maxPrice !== undefined ? Number(query.maxPrice) : PRICE_CEIL;
  const minRating = query.minRating !== undefined ? Number(query.minRating) : 0;

  return {
    categories,
    minPrice: Number.isFinite(minPrice) ? minPrice : PRICE_FLOOR,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : PRICE_CEIL,
    minRating: Number.isFinite(minRating) ? minRating : 0,
  };
}

// GET /api/products
function getProducts(req, res) {
  const criteria = parseCriteria(req.query);
  const sortKey = req.query.sort || "featured";

  const filtered = filterProducts(PRODUCTS, criteria);
  const results = sortProducts(filtered, sortKey);

  res.json({
    total: results.length,
    items: results,
  });
}

// GET /api/products/meta
// Everything the sidebar needs to build itself before any filter is applied:
// the category list with base counts, and the overall price bounds.
function getMeta(req, res) {
  const categoryCounts = {};
  for (const p of PRODUCTS) {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  }

  const categories = Object.keys(categoryCounts)
    .sort()
    .map((name) => ({ name, count: categoryCounts[name] }));

  res.json({
    categories,
    priceBounds: { min: PRICE_FLOOR, max: PRICE_CEIL },
    totalProducts: PRODUCTS.length,
  });
}

module.exports = { getProducts, getMeta };
