import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import { CartProvider } from "./CartContext";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import NewTShirtForm from "./components/NewTShirtForm";
import TShirtList from "./components/TShirtList";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />

            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-tshirt" element={<NewTShirtForm />} />
            <Route path="/tshirt-list" element={<TShirtList />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
