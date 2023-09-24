import React, { useState } from "react";
import axios from 'axios';
import './Searchbar.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [speechStart, setSpeechStart] = useState(false);
  const [searchBarClass, setSearchBarClass] = useState("flex justify-center align-middle mt-40");
  const search = () => {
    setInput(input);
    const searchResult = document.getElementById("searchResult");
    const searchInput = document.getElementById("searchInput");
    const searchResultInput = document.createElement("div");
    searchResultInput.innerHTML = input;
    searchResult.appendChild(searchResultInput);
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
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const listen = () => {
    if (speechStart === false) {
      SpeechRecognition.startListening();
      setSpeechStart(true)
    } else {
      setInput(transcript)
      SpeechRecognition.stopListening()
      setSpeechStart(false)
    }
  }

  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="w-1/2 text-start" id="searchResult">
        </div>
      </div>
      <div className={searchBarClass}>
        <div className="w-1/2 h-12 border-2 border-grey-500 rounded flex justify-end">
          <input class="inputBar" defaultValue={input} onInput={e=>setInput(e.target.value)} />
          {!speechStart ?
            <div class="innerElement">
              { !browserSupportsSpeechRecognition ?
                  <div class="innerElement">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="grey" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  :
                  <div class="innerElement" onClick={listen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
              }
            </div>
            :
            <div class="innerElement" onClick={listen}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
          <div class="searchElement" onClick={search}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </div>
      { !browserSupportsSpeechRecognition ? <div>Browser doesn't support speech recognition.</div> : "" }
    </div>
  )
}

export default Searchbar;
