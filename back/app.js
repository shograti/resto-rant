const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const db = require('./database/db');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

db.connect(function (err) {
  if (err) throw err;
  console.log('Database connection succeeded');
});

app.get('/api/restaurants-and-bars', (req, res) => {
  const city = req.query.city;
  if (city) {
    db.query(
      `SELECT * from SHOP WHERE (type = 'bar' OR type = 'restaurant') AND com_nom = '${city}' `,
      function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  } else {
    const message = 'You must provide a city';
    res.status(404).json(message);
  }
});

app.get('/api/restaurants', (req, res) => {
  const city = req.query.city;
  if (city) {
    db.query(
      `SELECT * from SHOP WHERE type = 'restaurant' AND com_nom = '${city}' `,
      function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  } else {
    const message = 'You must provide a city';
    res.status(404).json(message);
  }
});

app.get('/api/bars', (req, res) => {
  const city = req.query.city;
  if (city) {
    db.query(
      `SELECT * from SHOP WHERE type = 'bar' AND com_nom = '${city}' `,
      function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  } else {
    const message = 'You must provide a city';
    res.status(404).json(message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
