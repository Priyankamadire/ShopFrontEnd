import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://shopbackend-3ams.onrender.com/api/tshirts"
      );
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    );

    const matchesGender = genderFilter ? product.gender === genderFilter : true;
    const matchesColor = colorFilter ? product.color === colorFilter : true;
    const matchesType = typeFilter ? product.type === typeFilter : true;

    const priceRange = priceRangeFilter.split("-");
    console.log(priceRange);

    const matchesPriceRange =
      priceRangeFilter === ""
        ? true
        : priceRangeFilter === "0-20"
        ? product.price >= 0 && product.price <= 20
        : priceRangeFilter === "21-50"
        ? product.price > 20 && product.price <= 50
        : priceRangeFilter === "51-100"
        ? product.price > 50 && product.price <= 100
        : product.price > 100;

    return (
      matchesSearch &&
      matchesGender &&
      matchesColor &&
      matchesType &&
      matchesPriceRange
    );
  });

  const resetFilters = () => {
    setSearch("");
    setGenderFilter("");
    setColorFilter("");
    setTypeFilter("");
    setPriceRangeFilter("");
  };

  return (
    <div className="product-list-container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Colors</option>
          {/* Assuming products have a color field; this can be dynamic based on available colors */}
          {[...new Set(products.map((product) => product.color))].map(
            (color) => (
              <option key={color} value={color}>
                {color}
              </option>
            )
          )}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Types</option>
          {/* Assuming products have a type field; this can be dynamic based on available types */}
          {[...new Set(products.map((product) => product.type))].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={priceRangeFilter}
          onChange={(e) => setPriceRangeFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">All Prices</option>
          <option value="0-20">$0 - $20</option>
          <option value="21-50">$21 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="100+">$100+</option>
        </select>

        <button onClick={resetFilters} className="reset-button">
          Reset Filters
        </button>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
