import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TShirtList.css";

const TShirtList = () => {
  const [tshirts, setTShirts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    type: "",
    gender: "Male",
    price: "",
    quantity: "",
    image: "",
  });

  useEffect(() => {
    fetchTShirts();
  }, []);

  const fetchTShirts = async () => {
    try {
      const response = await axios.get(
        "https://shopbackend-3ams.onrender.com/api/tshirts"
      );
      setTShirts(response.data);
    } catch (error) {
      console.error("Error fetching T-shirts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://shopbackend-3ams.onrender.com/api/delete/${id}`
      );
      setTShirts(tshirts.filter((tshirt) => tshirt._id !== id));
    } catch (error) {
      console.error("Error deleting T-shirt:", error);
    }
  };

  const handleEditClick = (tshirt) => {
    setEditingId(tshirt._id);
    setFormData({
      name: tshirt.name,
      color: tshirt.color,
      type: tshirt.type,
      gender: tshirt.gender,
      price: tshirt.price,
      quantity: tshirt.quantity,
      image: tshirt.image,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://shopbackend-3ams.onrender.com/api/updatetshirts/${id}`,
        formData
      );
      setEditingId(null);
      fetchTShirts();
      alert("T-shirt updated successfully!");
    } catch (error) {
      console.error("Error updating T-shirt:", error);
    }
  };

  return (
    <div className="table-container">
      <h2>T-Shirt List</h2>
      <table className="tshirt-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Type</th>
            <th>Gender</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tshirts.map((tshirt) => (
            <tr key={tshirt._id}>
              {editingId === tshirt._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button
                      className="save-button"
                      onClick={(e) => handleSubmit(e, tshirt._id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <img src={tshirt.image} alt={tshirt.name} width="50" />
                  </td>
                  <td>{tshirt.name}</td>
                  <td>{tshirt.color}</td>
                  <td>{tshirt.type}</td>
                  <td>{tshirt.gender}</td>
                  <td>${tshirt.price}</td>
                  <td>{tshirt.quantity}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(tshirt)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(tshirt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TShirtList;
