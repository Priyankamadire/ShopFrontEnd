import React, { useState } from "react";
import { Link } from "react-router-dom";
// Assuming you have this CSS file in your project

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        <img
          src="https://thumbs.dreamstime.com/b/vector-graphic-initials-letter-cc-logo-design-template-emblem-hexagon-204622180.jpg"
          alt="Logo"
          style={{
            width: "50px", // Adjust width as needed
            height: "50px", // Adjust height as needed
            borderRadius: "50%", // Make it round
          }}
        />
      </h1>

      <button className="menu-btn" onClick={toggleMenu}>
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>
      <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link" onClick={toggleMenu}>
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link" onClick={toggleMenu}>
            Products
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cart" className="nav-link" onClick={toggleMenu}>
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-tshirt" className="nav-link" onClick={toggleMenu}>
            Add T-Shirt
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tshirt-list" className="nav-link" onClick={toggleMenu}>
            Edit/Delete
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
