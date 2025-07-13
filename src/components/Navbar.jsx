
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ isSidebarOpen, toggleSidebar }) {
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 text-gray-800 p-3 flex items-center z-30 shadow-sm">
      <button
        className="text-xl mr-3 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      <p className="text-xl font-bold tracking-wide">SnagO!</p>

      <div className="ml-auto space-x-6 flex items-center">
        <Link to="/" className="hover:text-yellow-600 transition">Home</Link>

        <Link to="/cart" className="relative hover:text-yellow-600 transition flex items-center">
          Cart
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemsCount}
            </span>
          )}
        </Link>

       <Link to="/account" className="hover:text-yellow-300">Account</Link>
      </div>
    </nav>
  );
}

export default Navbar;
