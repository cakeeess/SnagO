// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../features/cartSlice";
import toast from "react-hot-toast";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.thumbnail || res.data.images?.[0]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 bg-white rounded shadow">
      <div>
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-96 object-contain rounded border"
        />
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`h-20 w-20 object-cover border rounded cursor-pointer ${
                selectedImage === img ? "ring-2 ring-yellow-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-yellow-600 font-semibold mb-2">Brand: {product.brand}</p>
        <div className="flex items-center mb-2">
          <div className="text-yellow-400 flex mr-1">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </div>
          <span className="text-gray-600 text-sm">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-xl text-gray-800 font-bold mb-4">${product.price}</p>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
