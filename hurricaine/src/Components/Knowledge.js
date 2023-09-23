import React, { useState } from "react";
import Sidebar from "./Sidebar";
import './Knowledge.css';

const Knowledge = () => {
  return (
    <div class="dropdown"> 
      <span>Knowledge</span>     
      <Sidebar />
    </div>
  )
}

export default Knowledge;
