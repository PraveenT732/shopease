import { Link } from "react-router";
import { useCart } from "../context/useCart";

export default function Navbar({ search, setSearch }) {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="navbar">
      <h2>ShopEase</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Search Products..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <Link className="cart-link" to="/cart">
        Cart ({cartCount})
      </Link>
      <Link className="order-link" to="/orders">My Orders</Link>
    </nav>
  );
}
