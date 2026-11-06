import { Link } from "react-router";
import { useCart } from "../context/useCart";

export default function ProductCard({ id, title, price, image }) {
  const { dispatch } = useCart();
  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-details-link">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>₹{Math.round(price * 94.68)}</p>
      </Link>
      <button
        onClick={() =>
          dispatch({
            type: "ADD_TO_CART",
            payload: {
              id,
              title,
              price,
              image,
            },
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
