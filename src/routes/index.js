const pessoas = require('./pessoasRoute');
const express = require('express');

module.exports = app => {
  app.use(
    express.json(),
    pessoas,
  );
};

