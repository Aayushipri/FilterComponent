import React, { useEffect, useState } from "react";

const products = [
  { id: 1, name: "Product 1", category: "Electronics", price: 199.99 },
  { id: 2, name: "Product 2", category: "Clothing", price: 29.99 },
  { id: 3, name: "Product 3", category: "Electronics", price: 149.99 },
  { id: 4, name: "Product 4", category: "Books", price: 9.99 },
];

function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [debouncedCategoryFilter, setDebouncedCategoryFilter] =
    useState(categoryFilter);
  const [debouncedPriceFilter, setDebouncedPriceFilter] = useState(priceFilter);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedCategoryFilter(categoryFilter);
      setDebouncedPriceFilter(priceFilter);
    }, 30000);
    return () => clearTimeout(delay);
  }, [categoryFilter, priceFilter]);

  const filteredProducts = products.filter(
    (product) =>
      product.category
        .toLowerCase()
        .includes(debouncedCategoryFilter.toLowerCase()) &&
      (debouncedPriceFilter === "" ||
        product.price <= parseFloat(debouncedPriceFilter))
  );

  const resetFilters = () => {
    setCategoryFilter("");
    setPriceFilter("");
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by max price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <button onClick={resetFilters}>Reset</button>
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
