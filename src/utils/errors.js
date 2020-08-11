const { http } = require('../constants')

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http.VALIDATION_ERROR_CODE;
    this.message = message;
  }
}

module.exports = {
  ValidationError,
}
