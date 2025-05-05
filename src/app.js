// src/app.js
require('dotenv').config();
const express = require('express');
const path    = require('path');
const db      = require('./db');
const listingsRoute = require('./routes/listings');

const app = express();

// serve static HTML/CSS/JS from public/
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// health‐check
app.get('/api/health', async (req, res) => {
  const result = await db.query('SELECT NOW()');
  return res.json({ serverTime: result.rows[0].now });
});

// mount our listings router under /api/listings
app.use('/api/listings', listingsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
