import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { cartReducer,initialState } from "../data/cartReduce";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback(item => dispatch({ type: "ADD", payload: item }), []);


  const deleteFromCart = useCallback(id => dispatch({ type: "DELETE", payload: id }), []);


  const setQuantity = useCallback((id, quantity) => dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }), []);


  const setInputQuantity = useCallback((id, value) => dispatch({ type: "SET_INPUT_QUANTITY", payload: { id, value } }), []);


  const setCouponInput = useCallback(value => dispatch({ type: "SET_INPUT_COUPON", payload: value }), []);


  const applyCoupon = useCallback(code => dispatch({ type: "APPLY_COUPON", payload: code }), []);

  
  const removeCoupon = useCallback(() => dispatch({ type: "REMOVE_COUPON" }), []);


  const totalItems = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);

  const totalPrice = useMemo(() => {
    const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return (total - state.discount).toFixed(2);
  }, [state.items, state.discount]);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        coupon: state.coupon,
        couponInput: state.couponInput,
        discount: state.discount,
        couponError: state.couponError,
        addToCart,
        deleteFromCart,
        setQuantity,
        setInputQuantity,
        setCouponInput,
        applyCoupon,
        removeCoupon,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
