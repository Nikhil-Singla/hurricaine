// index.js
require("dotenv").config();
const { Configuration, OpenAI } = require('openai');
const axios = require('axios');
const express = require('express')
const weatherRoute = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 4000;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.get('/askgpt', async (req, res) => {
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


app.use('/weather', weatherRoute)

 


// Export the Express API
module.exports = app