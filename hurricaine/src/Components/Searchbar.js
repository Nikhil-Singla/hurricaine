import React, { useState } from "react";
import axios from 'axios';
import './Searchbar.css';
const Searchbar = () => {
  const [input, setInput] = useState("");
  const search = () => {
    console.log(input);
    setInput(input);
    console.log(input);
    axios.get(`https://hackwidwest-backend.vercel.app/askgpt?query=${input}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  };

  return (
    <div className="flex justify-center align-middle mt-40">
      <div className="w-1/2 h-12 border-2 border-grey-500 rounded flex justify-end">
        <input class="inputBar" onInput={e=>setInput(e.target.value)} />
        <div class="innerElement">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div class="searchElement" onClick={search}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Searchbar;
