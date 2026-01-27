import React from "react";
import { useCart } from "../components/CartContext";
import items from "../data/itemsData";

function ItemsList() {
  const { addToCart } = useCart();

  return (
    <div className="w-[90%] mx-auto p-4 max-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 flex flex-col justify-between border rounded shadow"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
              {item.name}
            </h3>
            <p className="text-center text-gray-700 my-2 font-bold text-2xl">
              Price: ${item.price}
            </p>
            <button
              onClick={() => addToCart(item)}
              className="bg-gray-800 text-white font-semibold py-1 px-3 rounded hover:bg-blue-700 transition-colors cursor-pointer self-center"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ItemsList);
