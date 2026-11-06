import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && product && (
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-category">Category: {product.category}</p>
            <h2>₹{Math.round(product.price * 94.68)}</h2>
            <p className="product-description">{product.description}</p>
            <p>Rating: {product.rating?.rate ?? "N/A"} / 5</p>
            <p>Reviews: {product.rating?.count ?? 0}</p>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  },
                })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
