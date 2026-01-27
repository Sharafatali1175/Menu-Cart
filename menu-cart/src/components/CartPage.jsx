import React from "react";
import { useCart } from "../components/CartContext";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <p className="text-center font-bold text-2xl mt-10">
        Cart empty, please add some coffee :)
      </p>
    );
  }

  return (
    <div className="mt-8 w-full px-4">
      <div className="hidden md:flex justify-center">
        <table className="w-[70%] text-left border-collapse">
          <thead className="bg-amber-900 text-white">
            <tr className="border-b-2">
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Price x Quantity</th>
              <th className="py-2 px-4 text-center"></th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b-4 border-dashed">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">${item.price} x {item.quantity}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center gap-2">
                    <button className="bg-amber-900 p-2 rounded text-white cursor-pointer" onClick={() => addToCart(item)}><FaPlus /></button>
                    <button className="bg-amber-900 p-2 rounded text-white cursor-pointer" onClick={() => removeFromCart(item.id)}><TiMinus /></button>
                  </div>
                </td>
                <td className="py-2 px-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button className="text-red-600 bg-pink-200 p-2 rounded-full cursor-pointer" onClick={() => deleteFromCart(item.id)}><AiFillDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="border border-dashed rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <button onClick={() => deleteFromCart(item.id)} className="text-red-600 bg-pink-200 p-2 rounded-full"><AiFillDelete /></button>
            </div>
            <p className="text-sm mb-2">Price: ${item.price}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="bg-amber-900 p-2 rounded text-white" onClick={() => removeFromCart(item.id)}><TiMinus /></button>
                <span className="font-semibold">{item.quantity}</span>
                <button className="bg-amber-900 p-2 rounded text-white" onClick={() => addToCart(item)}><FaPlus /></button>
              </div>
              <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
