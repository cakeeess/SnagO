// src/components/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchCategoryProducts();
  }, [category]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{category.replace("-", " ")}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white border border-gray-200 rounded shadow hover:shadow-lg transform hover:scale-[1.03] transition p-4 flex flex-col"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 mx-auto object-contain mb-3"
            />
            <h3 className="text-gray-800 font-medium text-base mb-1">{product.title}</h3>
            <p className="text-yellow-600 font-semibold text-lg">${product.price}</p>
            <p className="text-green-600 text-sm mt-auto">
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
