function starGlyphs(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = "★".repeat(full);
  if (half) s += "✩";
  s += "☆".repeat(Math.max(5 - full - (half ? 1 : 0), 0));
  return s;
}

export default function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="thumb">
        {product.icon}
        <div className="price-tag">
          <span className="hole" />${product.price}
        </div>
      </div>
      <div className="card-body">
        <span className="eyebrow">{product.category}</span>
        <h3 className="item-name">{product.name}</h3>
        <div className="rating-line">
          <span className="stars">{starGlyphs(product.rating)}</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
