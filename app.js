const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { APIError} = require('./errors/APIError')
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./routes'))
app.use(errors());

app.use((err, req, res, next) => APIError(req, res, err, next));

app.listen(PORT, () => {});
