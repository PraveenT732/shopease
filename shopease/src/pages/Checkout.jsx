import { useState } from "react";
import { useCart } from "../context/useCart";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { cart, dispatch, addOrder } = useCart();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (form.name.trim() === "") {
      alert("Enter a valid name");
      return;
    }

    if (form.email.trim() === "") {
      alert("Enter a valid email");
      return;
    }

    if (form.address.trim() === "") {
      alert("Enter a valid address");
      return;
    }

    const order = {
      orderID: Date.now(),
      customer: { ...form },
      items: cart.map((item) => ({ ...item })),
      totalPrice: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      orderDate: new Date().toLocaleString(),
    };

    addOrder(order);
    dispatch({ type: "CLEAR_CART" });

    alert("Order placed successfully");

    setForm({
      name: "",
      email: "",
      address: "",
    });
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            placeholder="Enter your delivery address"
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}