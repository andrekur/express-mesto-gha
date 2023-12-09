const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.user = {
    _id: '65721d58a43ab690b262b50f'
  };

  next();
});

app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log('WORK');
});
