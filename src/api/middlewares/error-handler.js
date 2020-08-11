const { logger } = require('../../utils');
const { http, text } = require('../../constants');

module.exports = function errorHandler(err, req, res, next) {
  if (err.details) {
    const messages = err.details.map(d => d.message);
    return res.status(http.VALIDATION_ERROR_CODE)
      .send({ messages });
  }

  if (err.statusCode === http.VALIDATION_ERROR_CODE) {
    return res.status(http.VALIDATION_ERROR_CODE)
      .send({ message: err.message });
  }

  logger.error(text.ERROR_IN_HANDLER(err));

  return res.status(http.INTERNAL_SERVER_ERROR)
    .send({ message: text.SERVER_ERROR });
}
