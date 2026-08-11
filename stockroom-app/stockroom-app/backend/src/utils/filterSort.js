/**
 * Combinatorial intersect filter.
 *
 * A product survives only if it satisfies every active criterion at once —
 * category, price range, and minimum rating are ANDed together, not ORed.
 * An "unset" criterion is bypassed entirely rather than treated as a
 * restriction, so an empty filter state safely falls back to the full
 * inventory.
 *
 * @param {Array} products   full inventory array
 * @param {Object} criteria  { categories: Set<string>, minPrice, maxPrice, minRating }
 * @returns {Array} filtered products
 */
function filterProducts(products, criteria) {
  const { categories, minPrice, maxPrice, minRating } = criteria;

  return products.filter((product) => {
    const passesCategory =
      !categories || categories.size === 0 || categories.has(product.category);
    const passesPrice =
      (minPrice === undefined || product.price >= minPrice) &&
      (maxPrice === undefined || product.price <= maxPrice);
    const passesRating =
      minRating === undefined || minRating === 0 || product.rating >= minRating;

    return passesCategory && passesPrice && passesRating;
  });
}

/**
 * Sorts an already-filtered result set. Never mutates the array it's given —
 * the pipeline is always "filter first, then arrange," so sorting can never
 * accidentally widen or narrow the result count.
 *
 * @param {Array} products filtered products
 * @param {string} sortKey one of: featured | price-asc | price-desc | rating-desc
 */
function sortProducts(products, sortKey) {
  const sorted = [...products];

  switch (sortKey) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      // Preserve original catalog order.
      break;
  }

  return sorted;
}

module.exports = { filterProducts, sortProducts };
