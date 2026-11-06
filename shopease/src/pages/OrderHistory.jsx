import { useCart } from "../context/useCart";

export default function OrderHistory() {
  const { orders } = useCart();

  return (
    <div className="orders-container">
      <h1>Order History</h1>

      {orders.length === 0 && (
        <div className="no-orders">
          <p>No orders available.</p>
        </div>
      )}

      {orders.map((order) => (
        <div className="order-card" key={order.orderID}>
          <div className="order-header">
            <h3>Order ID: {order.orderID}</h3>
            <p>{order.orderDate}</p>
          </div>

          <div className="customer-details">
            <h4>Customer Details</h4>
            <p>Name: {order.customer.name}</p>
            <p>Email: {order.customer.email}</p>
            <p>Address: {order.customer.address}</p>
          </div>

          <div className="ordered-products">
            <h4>Products</h4>

            {order.items.map((item) => (
              <div className="ordered-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div>
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{Math.round(item.price * 94.68)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total: ₹{Math.round(order.totalPrice * 94.68)}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
