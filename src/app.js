const express = require('express');
const routes = require('./routes'); //se pego index.js so preciso passar a pasta e ele pega index automaticamente

const app = express();

routes(app);

module.exports = app;
