const path = require('path');
const winston = require('winston');

const filename = path.join(__dirname, '../logfile.log');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename }),
  ],
});

module.exports = async (request, response, next) => {
  logger.log('info', 'New request', {
    time: Math.round(Date.now() / 1000),
    verb: request.method,
    path: request.url,
    body: request.body,
    query: request.query,
    headers: request.headers,
    DateValidation: request.dateValidation,
  });
  next();
};
