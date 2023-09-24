// index.js
require("dotenv").config();
const { Configuration, OpenAI } = require('openai');
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'; 
const app = express();
const PORT = process.env.PORT || 3000;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.use(
  // function(req, res, next) {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   res.setHeader('Access-Control-Allow-Credentials', true);
    express.json()
);

app.use(cors());

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
})

app.get('/', (req, res) => {
    const userPrompt = "I was part of an earthquake, help me";
    // generateSuggestedQuestions(userPrompt);
    //   .then(suggestedQuestions => {
    //     console.log('Suggested Questions:');
    //     suggestedQuestions.forEach((question, index) => {
    //       console.log(`${index + 1}. ${question}`);
    //     });
    //   })
    //   .catch(error => {
    //     // Handle errors
    //     console.error('Error:', error);
    //   });
    res.send('Hello there!')
})

app.post('/askgpt', async (req, res) => {
    const chats = req.body;
    const userPrompt = chats[0]['content'];
    try{
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": chats[0]['content']}],
        messages: chats,
        max_tokens: 256
      });
      var responseData = result.choices[0].message;
      var finalResponse = []
      try{
        var suggestedResponse = await generateSuggestedQuestions(userPrompt);
        
      }catch (error) {
        console.error('Error generating suggested questions:', error);
        throw error;
      }finally{
        finalResponse.push(responseData);
        finalResponse.push(suggestedResponse);
        console.log(finalResponse);
        res.send(finalResponse);
      }
    }
    catch (error) {
      console.error('Error generating suggested questions:', error);
      throw error;
    }
    
    
    // console.log(result);
    // res.json({
    //     output: result.choices[0].message,
    // });
    // res.send('GPT Endpoint')
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
        // messages: [{"role": "user", "content": "Hello!"}],
    //   });
    // console.log(chatCompletion);
    // return res.status(200).json({
    //   success: true,
    //   message: chatCompletion.choices[0].message,
    // });

});

app.post('/weather', async (req, res) => {
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    finalData = {}
    axios.get('https://api.weatherapi.com/v1/forecast.json?key=' + process.env.WEATHER_KEY + '&q='+req.body.latitude+','+req.body.longitude+'&alerts=yes').then(resp => {
        axios.get('https://api.weatherapi.com/v1/current.json?key=' + process.env.WEATHER_KEY + '&q='+req.body.latitude+','+req.body.longitude+'&alerts=yes').then(respOne => {
            // console.log(resp.data);
            finalData = Object.assign(resp.data, respOne.data);
            res.send(finalData);
        });
    });
});

async function generateSuggestedQuestions(prompt) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": `Provide some more helpful resources and details of locations to provide help to the human based on the following:\n\n${prompt}`}],
        max_tokens: 256,
        temperature: 1 // Adjust the number of tokens as needed
        },
      );
      const suggestedQuestions = response.choices[0].message;
      console.log(suggestedQuestions);
      return suggestedQuestions;
    } catch (error) {
      console.error('Error generating suggested questions:', error);
      throw error;
    }
  }

// Export the Express API
module.exports = app

