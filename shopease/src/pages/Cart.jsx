import { Link } from "react-router";
import { useCart } from "../context/useCart";

export default function Cart() {
  const { cart, dispatch } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 && (
        <div className="empty-cart">
          <p>Cart is empty. Add products!</p>
          <Link to="/products">Continue Shopping</Link>
        </div>
      )}

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p>₹{Math.round(item.price * 94.68)}</p>
          </div>

          <div className="quantity-controls">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "DECREASE_QUANTITY",
                  payload: item.id,
                })
              }
            >
              -
            </button>

            <p>{item.quantity}</p>

            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "INCREASE_QUANTITY",
                  payload: item.id,
                })
              }
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            type="button"
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item.id,
              })
            }
          >
            Delete
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Total Price: ₹{Math.round(totalPrice * 94.68)}</h2>

          <Link className="checkout-btn" to="/checkout">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
