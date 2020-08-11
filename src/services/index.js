const container = require('./container');
const { types } = require('../constants');

module.exports = {
  rates: {
    findOne: container.get(types.SERVICE.RATE.FIND_ONE)
  }
}
