const TIERS = [5, 4, 3, 2, 1];

export default function RatingFilter({ minRating, onChange }) {
  return (
    <div className="filter-block">
      <p className="filter-label">Minimum rating</p>

      <label className="rating-row" htmlFor="rating-any">
        <input
          type="radio"
          name="rating"
          id="rating-any"
          checked={minRating === 0}
          onChange={() => onChange(0)}
        />
        <span>Any rating</span>
      </label>

      {TIERS.map((t) => (
        <label className="rating-row" htmlFor={`rating-${t}`} key={t}>
          <input
            type="radio"
            name="rating"
            id={`rating-${t}`}
            checked={minRating === t}
            onChange={() => onChange(t)}
          />
          <span className="stars-inline">
            {"★".repeat(t)}
            {"☆".repeat(5 - t)}
          </span>
          <span className="up-text">&amp; up</span>
        </label>
      ))}
    </div>
  );
}
