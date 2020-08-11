const express = require('express');
const routes = express.Router();
const controllers = require('../../controllers');

routes.get('/quote', controllers.rate.findOne);

module.exports = routes;
