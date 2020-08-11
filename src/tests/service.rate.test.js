process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const services = require('../services')

describe('Rates Service', () => {
  test('should find exchange rate successfully', async () => {
    const result = await services.rates.findOne.run({
      baseCurrency: 'USD',
      quoteCurrency: 'EUR',
      baseAmount: 100,
    })

    expect(result.quoteAmount).toBeTruthy();
    expect(result.exchangeRate).toBeTruthy();
  });

  test('should fail on not supported base currency', async () => {
    try {
      await services.rates.findOne.run({
        baseCurrency: 'LTU',
        quoteCurrency: 'EUR',
        baseAmount: 100,
      })
    } catch (e) {
      expect(e.details[0].message).toEqual('"Base currency" must be one of [USD, EUR, GBP, ILS]')
    }
  });

  test('should fail on not supported quote currency', async () => {
    try {
      await services.rates.findOne.run({
        baseCurrency: 'USD',
        quoteCurrency: 'LTU',
        baseAmount: 100,
      })
    } catch (e) {
      expect(e.details[0].message).toEqual('"Quote currency" must be one of [USD, EUR, GBP, ILS]')
    }
  });

  test('should fail on invalid base amount', async () => {
    try {
      await services.rates.findOne.run({
        baseCurrency: 'USD',
        quoteCurrency: 'EUR',
        baseAmount: 'hi there',
      })
    } catch (e) {
      expect(e.message).toEqual("\"Base amount\" must be a number")
    }
  });
});
