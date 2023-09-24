import React, { useState } from "react";
import axios from 'axios';
import './Searchbar.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import userProfileIcon from '../assets/userProfilePicture.png';

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [speechStart, setSpeechStart] = useState(false);
  const [searchBarClass, setSearchBarClass] = useState("flex justify-center align-middle mt-40");

  const search = () => {
    setInput(input);
    const searchResult = document.getElementById("searchResult");
    const searchInput = document.getElementById("searchInput");
    const searchResultInput = document.createElement("div");
    const userIcon = document.createElement("img");
    
    const messageContainer = document.createElement("div");
    messageContainer.style.display = 'flex';
    messageContainer.style.alignItems = 'center';


    userIcon.src = userProfileIcon;
    userIcon.style.height = '30px';
    userIcon.style.width = '30px';
    userIcon.style.borderRadius = "50%";

    searchResultInput.innerHTML = input;
    searchResultInput.style.paddingLeft = "10px";

    messageContainer.appendChild(searchResultInput);
    messageContainer.insertBefore(userIcon, searchResultInput);

    messageContainer.style.paddingBottom = "10px";
    searchResult.appendChild(messageContainer);
    
    axios.get(`https://hackwidwest-backend.vercel.app/askgpt?query=${input}`)
      .then(function (response) {
        console.log(response);
        setSearchBarClass("absolute bottom-0 flex justify-center align-middle my-20 w-full")
        
        const searchResultAnswer = document.createElement("div");
        searchResultAnswer.innerHTML = response.data;

        searchResult.appendChild(searchResultAnswer);
        searchInput.innerHTML = "";


        setInput("")
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="w-1/2 text-start" id="searchResult">
        </div>
      </div>
      <div className={searchBarClass}>
        <div className="w-1/2 h-12 border-2 border-grey-500 rounded flex justify-end">
          <input class="inputBar" defaultValue={input} onInput={e=>setInput(e.target.value)} />
          <div class="innerElement" onClick={SpeechRecognition.startListening}>
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
        {transcript}
      </div>
    </div>
  )
}

export default Searchbar;
