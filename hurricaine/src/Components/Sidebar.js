import React, { useState } from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col" class="dropdown-content">
      <a href="https://www.ready.gov/faq" className="w-full">Local Weather Information</a>
      <a href="??" className="w-full">Area Emergency Services</a>
      <a href="??" className="w-full">Emergency Preparedness</a>
      <a href="??" className="w-full">Frequently Asked Questions</a>
    </div>
  )
}

export default Sidebar;
