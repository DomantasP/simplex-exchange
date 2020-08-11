const morgan = require('morgan');
const { logger } = require('../../utils');

module.exports = morgan((tokens, req, res) => {
  logger.info(
    `API called ${JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      responseTimeMs: Number(Math.ceil(tokens['response-time'](req, res)))
    })}
  `);
})
