import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card-img"
      />
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-title">{product.gender}</p>
        <p className="product-card-text">
          {product.color} - {product.type}
        </p>
        <p className="product-card-price">${product.price}</p>
        <button className="product-card-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
