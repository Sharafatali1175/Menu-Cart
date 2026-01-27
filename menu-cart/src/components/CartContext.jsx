import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { cartReducer } from "../data/CartReducer";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback(
    (item) => dispatch({ type: "ADD", payload: item }),
    []
  );

  const removeFromCart = useCallback(
    (id) => dispatch({ type: "REMOVE", payload: id }),
    []
  );

  const deleteFromCart = useCallback(
    (id) => dispatch({ type: "DELETE", payload: id }),
    []
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
