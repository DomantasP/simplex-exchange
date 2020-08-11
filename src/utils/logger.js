const log4js = require('log4js');
const logger = log4js.getLogger();

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'logs/logs.log', maxLogSize: 1000000, backups: 4, compress: false },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['file', 'console'], level: 'debug' },
  }
});

module.exports = {
  info(message) {
    logger.info(message);
  },

  error(message) {
    logger.error(message);
  },
}
