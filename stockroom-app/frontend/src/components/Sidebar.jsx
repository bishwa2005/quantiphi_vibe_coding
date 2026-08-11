import CategoryFilter from "./CategoryFilter.jsx";
import PriceRangeSlider from "./PriceRangeSlider.jsx";
import RatingFilter from "./RatingFilter.jsx";

export default function Sidebar({
  meta,
  categories,
  minPrice,
  maxPrice,
  minRating,
  onToggleCategory,
  onPriceChange,
  onRatingChange,
  onReset,
  isFilterActive,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <h2>Filter</h2>
        <button className="reset-link" onClick={onReset} disabled={!isFilterActive}>
          Reset all
        </button>
      </div>

      <CategoryFilter
        categories={meta.categories}
        selected={categories}
        onToggle={onToggleCategory}
      />

      <PriceRangeSlider
        bounds={meta.priceBounds}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={onPriceChange}
      />

      <RatingFilter minRating={minRating} onChange={onRatingChange} />
    </aside>
  );
}
