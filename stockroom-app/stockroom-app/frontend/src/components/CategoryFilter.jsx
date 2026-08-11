export default function CategoryFilter({ categories, selected, onToggle }) {
  return (
    <div className="filter-block">
      <p className="filter-label">Category</p>
      <div>
        {categories.map((cat) => {
          const id = `cat-${cat.name.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <label className="check-row" htmlFor={id} key={cat.name}>
              <input
                type="checkbox"
                id={id}
                checked={selected.has(cat.name)}
                onChange={() => onToggle(cat.name)}
              />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
