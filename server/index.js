// require('dotenv').config();
// const newRelic = require('newrelic');
const express = require('express');
const db = require('../database/seed.js');
const parser = require('body-parser');
const path = require('path');
const compression = require('compression');


const app = express();


app.use(compression());
app.use(parser.json());


app.get('/', (req, res) => {
  res.send('Hello from the server')
})



app.get('/reviews/:id', (req, res) => {
  db.getReviews(req.params.id, (err, reviews) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.send(reviews)
    }
  })
})



app.listen(3000);
