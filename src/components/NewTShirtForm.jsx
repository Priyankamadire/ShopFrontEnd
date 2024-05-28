import React, { useState } from "react";
import axios from "axios";
import "./NewTShirtForm.css";

const NewTShirtForm = () => {
  const [tshirt, setTshirt] = useState({
    name: "",
    color: "",
    type: "",
    gender: "",
    price: "",
    quantity: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTshirt((prevTshirt) => ({
      ...prevTshirt,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posttshirts",
        tshirt
      );
      console.log("T-shirt added:", response.data);
      alert("T-shirt added successfully!");

      setTshirt({
        name: "",
        color: "",
        type: "",
        gender: "Male",
        price: "",
        quantity: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding T-shirt:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="tshirt-form">
        <h2>Add New T-Shirt</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={tshirt.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={tshirt.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={tshirt.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={tshirt.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={tshirt.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={tshirt.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={tshirt.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add T-Shirt</button>
      </form>
    </div>
  );
};

export default NewTShirtForm;
