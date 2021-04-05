const express = require('express');
const BodyParser = require('body-parser');
const StatusCodes = require('http-status-codes');

const router = express.Router();
router.use(BodyParser.json());

function validateTime(incomingTime) {
  if (incomingTime === undefined) {
    return undefined;
  }
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  const incomingTimeInt = Number.parseInt(incomingTime, 10);
  if (Number.isNaN(incomingTimeInt)) {
    throw new Error('NaN');
  }
  if (secondsSinceEpoch - 300 < incomingTimeInt && incomingTimeInt < secondsSinceEpoch + 300) {
    return true;
  }
  return false;
}

// todo. add error logging for bad parseInt
router.all('*', async (request, response, next) => {
  const incomingTimes = [];

  Object.keys(request.query)
    .forEach((key) => {
      if (key.toLowerCase() === 'date-validation') {
        if (typeof request.query[key] !== 'object') {
          incomingTimes.push(request.query[key]);
        } else {
          request.query[key].forEach((item) => incomingTimes.push(item));
        }
      }
    });

  if (request.header('date-validation')) {
    request.header('date-validation')
      .split(', ')
      .forEach((item) => incomingTimes.push(item));
  }

  if (incomingTimes.length === 0) {
    // no time inputs
    response.sendStatus(StatusCodes.UNAUTHORIZED);
  } else if (incomingTimes.length > 0) {
    const matching = incomingTimes.every((item) => {
      if (item !== incomingTimes[0]) {
        return false;
      }
      return true;
    });
    const inRange = incomingTimes.every((item) => {
      if (!validateTime(item)) {
        return false;
      }
      return true;
    });
    if (!matching || !inRange) {
      response.sendStatus(StatusCodes.UNAUTHORIZED);
    } else {
      request.dateValidation = incomingTimes;
      next();
    }
  }
});

module.exports = router;
