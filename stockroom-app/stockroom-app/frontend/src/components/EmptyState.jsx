export default function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <div className="glyph">📭</div>
      <h3>No items match your criteria.</h3>
      <p>Try widening the price range, clearing a category, or lowering the star cutoff.</p>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
}
