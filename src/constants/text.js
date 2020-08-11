module.exports = {
  SUCCESS: 'Success',
  API_STARTED: port => `Api started on port: ${port}`,
  SERVER_ERROR: 'INTERNAL SERVER ERROR',
  ERROR_IN_HANDLER: (err) => `ERROR RECEIVED IN HANDLER ${err.message} ${err.stack}`,

  ERROR_CODES: {
    UNSUPPORTED_QUOTE_CURRENCY: 'UNSUPPORTED_QUOTE_CURRENCY'
  }
}
