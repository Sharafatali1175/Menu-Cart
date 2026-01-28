import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const found = state.find(i => i.id === action.payload.id);
      return found
        ? state.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE":
      return state
        .map(i =>
          i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0);

    case "DELETE":
      return state.filter(i => i.id !== action.payload);

    case "SET_INPUT_QUANTITY":
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, inputQuantity: action.payload.value }
          : i
      );

    case "SET_QUANTITY":
      return state
        .map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity, inputQuantity: undefined }
            : i
        )
        .filter(i => i.quantity > 0);

    default:
      return state;
  }
};

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

  const setQuantity = useCallback(
    (id, quantity) =>
      dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
    []
  );

  const setInputQuantity = useCallback(
    (id, value) =>
      dispatch({ type: "SET_INPUT_QUANTITY", payload: { id, value } }),
    []
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
        .toFixed(2),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        setQuantity,
        setInputQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
