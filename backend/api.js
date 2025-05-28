const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/AuthRoutes.js')

const REST_API = express.Router();
REST_API.use(express.json());
REST_API.use(cors());
REST_API.use(authRoute);

module.exports = REST_API;