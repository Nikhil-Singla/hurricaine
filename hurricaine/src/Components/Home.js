import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Searchbar from "./Searchbar";
import Geolocation from "./Geolocation";
import "./Home.css"

const Home = () => {
  return (
    <div className="wholePage">
      <Nav />
      <Searchbar />
      <Geolocation />
      <Footer />
    </div>
  )
}

export default Home;
