const express = require('express');
const db = require('../database/seed.js');
const parser = require('body-parser');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(parser.json())

app.get('/', (req, res) => {
  res.send('Hello from the server')
})

app.get('/reviews', (req, res) => {
  db.getReviews(40000, (err, reviews) => {
    if (err) {
      res.send(console.log(err))
    } else {
      res.send(reviews)
    }
  })
})

app.listen(PORT, () => {
  console.log('server listening at localhost:3000')
})