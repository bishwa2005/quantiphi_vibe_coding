import ProductCard from "./ProductCard.jsx";
import EmptyState from "./EmptyState.jsx";

export default function ProductGrid({ items, onReset }) {
  if (items.length === 0) {
    return (
      <div className="grid">
        <EmptyState onReset={onReset} />
      </div>
    );
  }

  return (
    <div className="grid">
      {items.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  );
}
