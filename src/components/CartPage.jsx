import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cartSlice";
import toast from "react-hot-toast";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (!credentials) {
      toast.error("Please sign up before placing an order.");
      setTimeout(() => {
        window.location.href = "/signup";
      }, 1500);
      return;
    }

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...previousOrders,
        {
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          items: cartItems,
          total,
        },
      ])
    );

    dispatch(clearCart());
    toast.success("Order placed successfully!");

    setTimeout(() => {
      window.location.href = "/profile";
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-4 items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-semibold">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <p className="text-xl font-bold text-gray-800">
                Total: ${total.toFixed(2)}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCheckout}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Checkout
                </button>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
