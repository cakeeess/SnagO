
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import Signup from "./components/Signup";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/Login";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-16 transition-all duration-300 bg-gradient-to-br from-slate-100 to-blue-50 min-h-screen p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/account" element={<AccountPage />} />   
           <Route path="/login" element={<LoginPage />} />  
        </Routes>
      </main>
    </>
  );
}

export default App;
