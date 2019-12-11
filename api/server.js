const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');

const apiRouter = require('./apiRouter.js');
const configureMiddleware = require('./configureMiddleware.js')

const sessionOptions = {
  name: 'cookie',
  secret: 'cookiesecret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const server = express();

configureMiddleware(server);

server.use(session(sessionOptions));
server.use('/api', apiRouter);

module.exports = server;