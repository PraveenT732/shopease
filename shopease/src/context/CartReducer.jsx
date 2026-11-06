import { useReducer, useState } from "react";
import { CartContext } from "./useCart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id,
      );
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "INCREASE_QUANTITY": {
      return state.map((item) =>
        action.payload === item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    case "DECREASE_QUANTITY": {
      return state
        .map((item) =>
          action.payload === item.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => action.payload !== item.id);
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [orders, setOrders] = useState([]);
  function addOrder(order) {
    setOrders((prev) => [...prev, order]);
  }
  return (
    <CartContext.Provider value={{ cart, dispatch, orders, addOrder }}>
      {children}
    </CartContext.Provider>
  );
}
