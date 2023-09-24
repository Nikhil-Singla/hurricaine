import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Searchbar from "./Searchbar";
import Geolocation from "./Geolocation";

const Home = () => {
  return (
    <div>
      <Nav />
      <Searchbar />
      <Geolocation />
      <Footer />
    </div>
  )
}

export default Home;
