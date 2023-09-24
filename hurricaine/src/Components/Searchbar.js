import React, { useState } from "react";
import axios from 'axios';
import './Searchbar.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import userProfileIcon from '../assets/userProfilePicture.png';
import Tornado from '../assets/Tornado.png';
import Map from "./Map";


const Searchbar = () => {
  const [input, setInput] = useState("");
  const inputArray = [];
  const answerArray = [];
  const [speechStart, setSpeechStart] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const searchInput = document.getElementById("search-input");
  const [searchBarClass, setSearchBarClass] = useState("flex justify-center align-middle mt-40");
  const createRequestBody = () => {
    const requestBody = [];
    for (let i=0; i<inputArray.length-2; i++) {
      requestBody.push({
        "role": "user",
        "content": inputArray[i]
      });
      if (answerArray[i]) {
        requestBody.push({
          "role": "user",
          "content": answerArray[i]
        })
      }
    };
    requestBody.push({
      "role": "user",
      "content": inputArray[inputArray.length-1]
    });
    console.log('requestBody');
    console.log(requestBody);
    return requestBody
  };

  const search = () => {
    searchInput.value = "";
    setInput(input);
    inputArray.push(input);
    console.log('inputArray');
    console.log(inputArray);
    const searchResult = document.getElementById("searchResult");
    const userIcon = document.createElement("img");

    const messageContainer = document.createElement("div");
    messageContainer.style.display = 'flex';
    messageContainer.style.alignItems = 'center';
    messageContainer.style.marginBottom = "20px";

    userIcon.src = userProfileIcon;
    userIcon.style.height = '28px';
    userIcon.style.width = '28px';
    userIcon.style.borderRadius = "50%";

    const searchResultInput = document.createElement("div");
    searchResultInput.innerHTML = input;
    searchResultInput.style.paddingLeft = "10px";

    messageContainer.appendChild(searchResultInput);
    messageContainer.insertBefore(userIcon, searchResultInput);

    messageContainer.style.paddingBottom = "10px";
    searchResult.appendChild(messageContainer);

    const objDiv = document.getElementById("Scroller");
    objDiv.scrollTop = objDiv.scrollHeight;

    axios.post('https://9079-23-228-186-78.ngrok-free.app/askgpt', createRequestBody())
      .then(function (response) {
        console.log('response');
        console.log(response.data);
        setSearchBarClass("searchBar")

        const searchResultAnswer = document.createElement("p");
        response.data.forEach(element => {
          answerArray.push(element.content);
          searchResultAnswer.innerHTML += element.content + " "
        });
        const answerContainer = document.createElement("div");
        answerContainer.style.display = 'flex';
        answerContainer.style.justifyContent = "flex-end";
        answerContainer.style.alignItems = 'center';
        answerContainer.style.marginBottom = "20px";

        const hurricaineIcon = document.createElement("img");
        hurricaineIcon.src = Tornado;
        hurricaineIcon.style.height = '50px';
        hurricaineIcon.style.width = '50px';
        hurricaineIcon.style.borderRadius = "50%";

        answerContainer.appendChild(searchResultAnswer);
        answerContainer.appendChild(hurricaineIcon);

        searchResult.appendChild(answerContainer);

        setInput("")
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const handleSearch = () => {
    if (!input) {
      return setPlaceholder("Please enter your question: e.g. where is the nearest hospital?")
    } else {
      search()
    }
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="convo-box">
      <div className="overflow-scroll search-result-container" id="Scroller">
        <div className="flex w-full justify-center">
          <div className="w-1/2 text-start" id="searchResult" >
          </div>
        </div>
      {input.includes("where") ? <Map className="w-full" /> : <br/>}
      </div>
      <div className={searchBarClass}>
        <div className="w-1/2 h-12 border-2 border-grey-500 rounded flex justify-end">
          <input class="inputBar" id="search-input" placeholder={placeholder} onInput={e=>setInput(e.target.value)} onKeyDown={handleKeyPress}  />
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
          <div class="searchElement" onClick={handleSearch}>
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
