import { Link } from "react-router";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to ShopEase</h1>
        <p>
          Discover great products at amazing prices. Find everything you need in
          one place.
        </p>

        <Link to="/products" className="shop-btn">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
