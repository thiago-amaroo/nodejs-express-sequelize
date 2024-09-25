const pessoas = require('./pessoasRoute');
const cursos = require('./cursosRoute');
const categorias = require('./categoriasRoute');

const express = require('express');

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Raiz da API');
  });

  app.use(
    express.json(),
    pessoas,
    cursos,
    categorias,
  );
};

