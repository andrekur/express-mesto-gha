require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT, DB_HOST, DB_PORT, DB_NAME } = require('./config').config
const { APIError } = require('./errors/APIError')

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./routes'))
app.use(errors());

app.use((err, req, res, next) => APIError(req, res, err, next));

app.listen(PORT, () => {});
