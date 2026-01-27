import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const deleteFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

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
