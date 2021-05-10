const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

module.exports = app;
