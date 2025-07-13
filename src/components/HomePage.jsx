// src/components/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="p-6">
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-lg shadow text-center">
        Monsoon Sale! <strong>30%–50% OFF</strong> on selected products! <strong>Use Code: SAM18</strong>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h1>
      {status === "loading" && <p>Loading...</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white border border-gray-200 rounded shadow hover:shadow-lg transform hover:scale-[1.03] transition p-4 block"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 mx-auto mb-3 object-contain"
            />
            <h3 className="text-gray-800 font-medium text-sm mb-1">{product.title}</h3>
            <p className="text-yellow-600 font-semibold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
