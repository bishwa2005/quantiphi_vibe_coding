import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import { fetchMeta, fetchProducts } from "./api/productsApi.js";

const DEBOUNCE_MS = 120; // keeps slider dragging smooth without hammering the API

export default function App() {
  const [meta, setMeta] = useState(null);
  const [categories, setCategories] = useState(new Set());
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  // One-time bootstrap: category list + counts, price floor/ceiling.
  useEffect(() => {
    fetchMeta()
      .then((m) => {
        setMeta(m);
        setMinPrice(m.priceBounds.min);
        setMaxPrice(m.priceBounds.max);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Instant (debounced) refetch whenever any filter or the sort key changes.
  useEffect(() => {
    if (!meta) return; // wait for bounds to exist before the first real query

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      fetchProducts({ categories, minPrice, maxPrice, minRating, sort })
        .then((data) => {
          setItems(data.items);
          setTotal(data.total);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta, categories, minPrice, maxPrice, minRating, sort]);

  function toggleCategory(name) {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function handlePriceChange({ minPrice: lo, maxPrice: hi }) {
    setMinPrice(lo);
    setMaxPrice(hi);
  }

  function resetAll() {
    setCategories(new Set());
    setMinRating(0);
    setSort("featured");
    if (meta) {
      setMinPrice(meta.priceBounds.min);
      setMaxPrice(meta.priceBounds.max);
    }
  }

  const isFilterActive =
    categories.size > 0 ||
    minRating > 0 ||
    (meta && (minPrice > meta.priceBounds.min || maxPrice < meta.priceBounds.max));

  if (!meta) {
    return (
      <div className="topbar">
        <div className="brand">
          Stockroom
          <small>Inventory No. 004 · Live Catalog</small>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <div className="brand">
          Stockroom
          <small>Inventory No. 004 · Live Catalog</small>
        </div>
        <div className="tagline">
          No filler descriptions, no dark patterns — just what's in stock, filtered your way.
        </div>
      </div>

      <div className="shell">
        <Sidebar
          meta={meta}
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minRating={minRating}
          onToggleCategory={toggleCategory}
          onPriceChange={handlePriceChange}
          onRatingChange={setMinRating}
          onReset={resetAll}
          isFilterActive={isFilterActive}
        />

        <main>
          <div className="main-head">
            <div className="result-count">
              <span className="num">{loading ? "…" : total}</span> items on the shelf
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {error ? (
            <p style={{ color: "var(--crimson)" }}>Couldn't reach the catalog: {error}</p>
          ) : (
            <ProductGrid items={items} onReset={resetAll} />
          )}
        </main>
      </div>
    </>
  );
}
