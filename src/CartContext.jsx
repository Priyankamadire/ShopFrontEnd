import React, { createContext, useState, useEffect } from "react";

// Create a context for the cart
export const CartContext = createContext();

// CartProvider component to provide cart state and functions to children components
export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + 1;
        if (newQuantity > product.quantity) {
          alert(`${product.quantity}`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to update the cart state
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
