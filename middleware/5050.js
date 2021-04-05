const coinflip = require('coinflip');
const StatusCodes = require('http-status-codes');

module.exports = async (request, response, next) => {
  if (coinflip()) {
    response.status(StatusCodes.OK).send('Hello World');
  } else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('oops');
  }
  next();
};
