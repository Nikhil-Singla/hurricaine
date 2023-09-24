// index.js
require("dotenv").config();
const { Configuration, OpenAI } = require('openai');
const axios = require('axios');
const express = require('express')

const app = express();
const PORT = process.env.PORT || 4000;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(
    express.json()
);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.get('/askgpt', async (req, res) => {
    res.send('GPT Endpoint')
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{"role": "user", "content": "Hello!"}],
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
    axios.get('https://api.weatherapi.com/v1/forecast.json?key=64817355ccfe46609a6221118232309&q='+req.body.latitude+','+req.body.longitude+'&alerts=yes').then(resp => {
        axios.get('https://api.weatherapi.com/v1/current.json?key=64817355ccfe46609a6221118232309&q='+req.body.latitude+','+req.body.longitude+'&alerts=yes').then(respOne => {
            // console.log(resp.data);
            finalData = Object.assign(resp.data, respOne.data);
            res.send(finalData);
        });
    });
});


// Export the Express API
module.exports = app