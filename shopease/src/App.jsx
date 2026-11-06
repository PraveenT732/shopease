import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <>
              <ProductList search={search} />
            </>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
