import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Searchbar from "./Searchbar";
import Geolocation from "./Geolocation";
import Map from "./Map";

const Home = () => {
  return (
    <div>
      <Nav />
      <Searchbar />
      <Map />
      <Geolocation />
      <Footer />
    </div>
  )
}

export default Home;
