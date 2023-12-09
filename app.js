const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { HTTP_STATUS_NOT_FOUND  } = require('http2').constants;


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  };

  next();
});

app.use('/users', require('./routes/users'))
app.use('/cards', require('./routes/cards'))

app.use(function(req, res, next) {
  res.status(HTTP_STATUS_NOT_FOUND).send({message: 'URL not found'})
});

app.listen(PORT, () => {});
