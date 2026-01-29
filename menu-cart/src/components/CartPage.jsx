import React from "react";
import { useCart } from "../components/CartContext";
import { AiFillDelete } from "react-icons/ai";

export default function CartPage() {
  const {
    cartItems,
    deleteFromCart,
    setQuantity,
    setInputQuantity,
    setCouponInput,
    couponInput,
    applyCoupon,
    coupon,
    discount,
    couponError,
    totalPrice,
  } = useCart();

  const handleInputChange = (id, value) => {
    if (/^\d*$/.test(value)) setInputQuantity(id, value);
  };

  const handleUpdate = (id, value) => {
    const quantity = Number(value);
    if (!value || quantity <= 0) deleteFromCart(id);
    else setQuantity(id, quantity);
  };

  const handleApplyCoupon = () => {
    const code = couponInput.trim();
    if (!code) {
      alert("Please enter coupon code");
      return;
    }
    applyCoupon(code);
  };

  return (
    <div className="mt-6 w-full px-3 sm:px-4">
      {cartItems.length === 0 && (
        <p className="text-center font-bold text-xl sm:text-2xl mt-10 px-4">
          Cart empty, please add some coffee :)
        </p>
      )}

      {cartItems.length > 0 && (
        <div className="hidden md:flex justify-center overflow-x-auto">
          <table className="min-w-[750] w-[70%] text-left border-collapse">
            <thead className="bg-amber-900 text-white">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Price x Quantity</th>
                <th className="py-3 px-4 text-center">Update Quantity</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border-b-4 border-dashed">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">${item.price} x {item.quantity}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-center">
                      <input
                        type="text"
                        value={item.inputQuantity ?? item.quantity}
                        onChange={e => handleInputChange(item.id, e.target.value)}
                        className="w-16 p-1 border rounded text-center"
                      />
                      <button
                        onClick={() => handleUpdate(item.id, item.inputQuantity ?? item.quantity)}
                        className="bg-amber-900 px-3 py-1 rounded text-white text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => deleteFromCart(item.id)}
                      className="text-red-600 bg-pink-200 p-2 rounded-full cursor-pointer"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="md:hidden space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="border border-dashed rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <button
                  onClick={() => deleteFromCart(item.id)}
                  className="text-red-600 bg-pink-200 p-2 rounded-full"
                >
                  <AiFillDelete />
                </button>
              </div>
              <p className="text-sm">Price: <b>${item.price}</b></p>
              <p className="text-sm mb-3">Current Quantity: <b>{item.quantity}</b></p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={item.inputQuantity ?? item.quantity}
                  onChange={e => handleInputChange(item.id, e.target.value)}
                  className="w-20 p-2 border rounded text-center"
                />
                <button
                  onClick={() => handleUpdate(item.id, item.inputQuantity ?? item.quantity)}
                  className="bg-amber-900 px-4 py-2 rounded text-white text-sm"
                >
                  Update
                </button>
              </div>
              <div className="mt-3 font-bold text-right">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-xl mx-auto mt-8 space-y-3 px-2">
        <h3 className="font-bold text-lg">Apply Coupon</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-green-700 text-white px-4 rounded"
          >
            Apply
          </button>
        </div>
        {couponError && <p className="text-red-600 text-sm">{couponError}</p>}
        {coupon && <p className="text-green-700 text-sm">
          Coupon <b>{coupon}</b> applied — Discount: ${discount.toFixed(2)}
        </p>}
      </div>

    
      <div className="max-w-xl mx-auto mt-6 text-right px-2">
        <p className="text-xl font-bold">
          Total Payable: ${totalPrice}
        </p>
      </div>
    </div>
  );
}
