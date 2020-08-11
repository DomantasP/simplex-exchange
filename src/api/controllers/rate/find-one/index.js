const { asyncHandler } = require('../../../../utils');
const services = require('../../../../services');

const findOne = async (req, res) => {
  const data = await services.rates.findOne.run({
    baseCurrency: req.query.base_currency,
    quoteCurrency: req.query.quote_currency,
    baseAmount: req.query.base_amount,
  })

  res.send({
    quote_amount: data.quoteAmount,
    exchange_rate: data.exchangeRate,
  })
}

module.exports = asyncHandler(findOne);
