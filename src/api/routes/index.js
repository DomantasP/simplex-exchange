const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const routes = express.Router();
const { http, text } = require('../../constants');
const rate = require('./rate')

routes.use('', rate);

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Health check endpoint
routes.get('/healthz', (req, res) => {
  res.status(http.SUCCESS).json({ message: text.SUCCESS });
});

// Fallback for undefined routes
routes.use((req, res) => {
  res.sendStatus(http.NOT_FOUND);
});


module.exports = routes;
