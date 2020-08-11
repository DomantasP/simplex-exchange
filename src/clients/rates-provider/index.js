const axios = require('axios');
const config = require('config');

class RatesProvider {
  async getRatesForBaseCurrency(baseCurrency) {
    const res = await axios.get(`${config.rateApiUrl}/latest?base=${baseCurrency}`);
    return res.data.rates;
  }
}

module.exports = RatesProvider;
