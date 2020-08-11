const Joi = require('@hapi/joi').extend(require('joi-currency-code'));
const Big = require('big.js');
const { rounding, supportedCurrencies } = require('config');
const { text } = require('../../../constants');
const { errors } = require('../../../utils');

class FindOne {
  constructor(ratesProvider, cache) {
    Big.RM = rounding.roundHalfEven;
    this._ratesProvider = ratesProvider;
    this._cache = cache;
  }

  async validate(params) {
    const schema = Joi.object({
      baseCurrency: Joi.string().currency().valid(...supportedCurrencies).required().label('Base currency'),
      quoteCurrency: Joi.string().currency().valid(...supportedCurrencies).required().label('Quote currency'),
      baseAmount: Joi.number().integer().required().label('Base amount'),
    });

    await schema.validateAsync(params);
  }

  async run({ baseCurrency, quoteCurrency, baseAmount }) {
    await this.validate({ baseCurrency, quoteCurrency, baseAmount });

    let rates = this._cache.get(baseCurrency);
    if (!rates) {
      rates = await this._ratesProvider.getRatesForBaseCurrency(baseCurrency);
      this._cache.set(baseCurrency, rates);
    }

    const exchangeRate = rates[quoteCurrency];

    // In case third party API removes currency
    if (!exchangeRate) {
      throw new errors.ValidationError(text.ERROR_CODES.UNSUPPORTED_QUOTE_CURRENCY)
    }

    const quoteAmount = Number(Big(baseAmount).times(exchangeRate).round());
    return { quoteAmount, exchangeRate };
  }
}

module.exports = FindOne;
