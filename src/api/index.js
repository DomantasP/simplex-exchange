const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const config = require('config');
const bodyParser = require('body-parser');
const { text } = require('../constants');
const { logger } =  require('../utils');
const middlewares = require('./middlewares');

const { port } = config;
const app = express();

app.use(helmet())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(middlewares.requestLogger);

app.use('/', routes);
app.use(middlewares.errorHandler);

process.on('uncaughtException', (err) => {
  logger.error(`UncaughtException: ${err.message} ${err.stack}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`UnhandledRejection: ${err.message} ${err.stack}`);
});

const startedText = text.API_STARTED(port);
const server = app.listen(port);
logger.info(startedText);

module.exports = { server };
