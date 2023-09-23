import React, { useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Searchbar from "./Searchbar";

const Home = () => {
  return (
    <div>
      <Nav />
      <Searchbar />
      <Footer />
    </div>
  )
}

export default Home;
