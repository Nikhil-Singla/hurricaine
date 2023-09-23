// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hello there!')
})

app.get('/askgpt', (req, res) => {
    console.log(req)
    res.send(req.query.query)
})

// Export the Express API
module.exports = app