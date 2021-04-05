const StatusCodes = require('http-status-codes');

module.exports = (err, request, response, next) => {
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`We're sorry, the error was: ${err.message}`);
};
