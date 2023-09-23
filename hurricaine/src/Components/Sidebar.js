import React, { useState } from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col" class="dropdown-content">
      <p className="w-full">Local Weather Information</p>
      <p className="w-full">Area Emergency Services</p>
      <p className="w-full">Emergency Preparedness</p>
      <p className="w-full">Frequently Asked Questions</p>
    </div>
  )
}

export default Sidebar;
