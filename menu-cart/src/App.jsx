import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import Header from "./components/Header";
import CartPage from "./components/CartPage";
import { CartProvider, useCart } from "./components/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

function AppContent() {
  const {totalPrice, totalItems } = useCart();

  return (
    <div className="bg-pink-100 min-h-screen">
      <Header itemCount={totalItems} />

      <div className="w-[95%] mx-auto mt-4">
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="border-2 border-gray-300 px-6 py-3 rounded bg-gray-700 text-white tracking-tight shadow-lg">
          <span>Total:</span>{" "}
          <span className="text-lg">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
