export default function PriceRangeSlider({ bounds, minPrice, maxPrice, onChange }) {
  const { min: floor, max: ceil } = bounds;
  const range = Math.max(ceil - floor, 1);
  const leftPct = ((minPrice - floor) / range) * 100;
  const rightPct = ((maxPrice - floor) / range) * 100;

  function handleMinChange(e) {
    const next = Math.min(Number(e.target.value), maxPrice - 2);
    onChange({ minPrice: next, maxPrice });
  }

  function handleMaxChange(e) {
    const next = Math.max(Number(e.target.value), minPrice + 2);
    onChange({ minPrice, maxPrice: next });
  }

  return (
    <div className="filter-block">
      <p className="filter-label">Price range</p>
      <div className="price-values">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
      <div className="slider-track-wrap">
        <div className="rail" />
        <div
          className="fill"
          style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
        />
        <input
          type="range"
          min={floor}
          max={ceil}
          value={minPrice}
          onChange={handleMinChange}
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={floor}
          max={ceil}
          value={maxPrice}
          onChange={handleMaxChange}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}
