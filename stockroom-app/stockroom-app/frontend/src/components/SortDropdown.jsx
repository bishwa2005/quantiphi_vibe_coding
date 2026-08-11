export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-wrap">
      <label htmlFor="sortSelect">Sort by</label>
      <select id="sortSelect" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated First</option>
      </select>
    </div>
  );
}
