// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Sidebar({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setError("Invalid categories format.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 transition-opacity"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 border-r border-gray-200 z-20 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-5">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Categories
          </h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
              {categories.map((cat, index) => {
                const label =
                  typeof cat === "string"
                    ? cat.replace("-", " ")
                    : cat?.name
                    ? String(cat.name).replace("-", " ")
                    : `Category ${index + 1}`;
                const value =
                  typeof cat === "string"
                    ? cat
                    : cat?.name
                    ? String(cat.name)
                    : "";
                return (
                  <NavLink
                    key={value || index}
                    to={`/category/${value}`}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md transition duration-200 capitalize ${
                        isActive
                          ? "bg-yellow-100 text-gray-900 font-semibold"
                          : "hover:bg-yellow-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                );
              })}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
