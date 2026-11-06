import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ search }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([]);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProduct = products.filter((product) => {
    const matchedSearch = product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchedCategory = category === "all" || product.category === category;
    return matchedSearch && matchedCategory;
  });

  const sortedOrder = [...filteredProduct].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.price - b.price;
    }
    if (sortOrder === "high-low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <h1 className="heading">Our Products</h1>
      <div className="product-toolbar">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="product-grid">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && filteredProduct.length === 0 && (
          <p>No matching products found</p>
        )}
        {!loading &&
          !error &&
          sortedOrder.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
      </div>
    </>
  );
}
