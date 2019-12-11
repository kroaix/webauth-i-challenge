const express = require('express');
const helmet = require('helmet');

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url}`);
  next();
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(logger);
}