import React from "react";
import img1 from "./img1.jpg";

const Home = () => {
  return (
    <div>
      <br />
      <br />
      <center>
        <img src={img1} alt="Image 1" />
        <h1 style={{ fontFamily: "cursive" }}>
          Introducing a new Clothing Brand
        </h1>
      </center>
    </div>
  );
};

export default Home;
