const inversify = require('inversify')
require('reflect-metadata');
const rate = require('./rate');
const clients = require('../clients');
const utils = require('../utils');
const { types } = require('../constants');

const container = new inversify.Container();

inversify.decorate(inversify.injectable(), utils.Cache)
inversify.decorate(inversify.injectable(), clients.RatesProvider)
inversify.decorate(inversify.injectable(), rate.FindOne)

inversify.decorate(inversify.inject(types.CLIENTS.RATES_PROVIDER), rate.FindOne, 0);
inversify.decorate(inversify.inject(types.UTILS.CACHE), rate.FindOne, 1);

container.bind(types.SERVICE.RATE.FIND_ONE).to(rate.FindOne);
container.bind(types.UTILS.CACHE).to(utils.Cache);
container.bind(types.CLIENTS.RATES_PROVIDER).to(clients.RatesProvider);

module.exports = container;
