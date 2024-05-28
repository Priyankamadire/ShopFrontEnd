import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, updateCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (product) => {
    updateCart(cart.filter((item) => item._id !== product._id));
  };

  const handleQuantityChange = (product, quantity) => {
    updateCart(
      cart.map((item) =>
        item._id === product._id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item._id} className="cart-item">
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="cart-item-actions">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item, parseInt(e.target.value))
                }
              />
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
