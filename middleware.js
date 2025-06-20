const express = require('express');
const cors = require('cors');

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
};

module.exports = applyMiddlewares;