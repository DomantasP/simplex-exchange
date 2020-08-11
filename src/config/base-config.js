module.exports = {
  rateApiUrl: 'https://api.exchangeratesapi.io',
  port: 5000,
  rounding: {
    roundDown: 0,
    roundHalfUp: 1,
    roundHalfEven: 2,
    roundUp: 3,
  },
  supportedCurrencies: ['USD', 'EUR', 'GBP', 'ILS'],
  cache: {
    timeoutInSeconds: 60,
    limit: 2,
  }
};
