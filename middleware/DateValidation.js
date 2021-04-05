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
  if (secondsSinceEpoch - 5 < incomingTimeInt && incomingTimeInt < secondsSinceEpoch + 5) {
    return true;
  }
  return false;
}

// todo. add error logging for bad parseInt
// todo. remove console.logs
router.all('*', async (request, response, next) => {
  const incomingTimes = [];

  // console.log('params:', request.query);
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

  // console.log('headers:', request.header('date-validation'));
  if (request.header('date-validation')) {
    request.header('date-validation').split(', ').forEach((item) => incomingTimes.push(item));
  }

  if (incomingTimes.length === 0) {
    response.status(StatusCodes.UNAUTHORIZED);
  } else if (incomingTimes.length === 1) {
    if (!validateTime(incomingTimes)) {
      response.status(StatusCodes.UNAUTHORIZED);
    }
    request.DateValidation = incomingTimes;
    response.status(StatusCodes.OK);
  }
  incomingTimes.forEach((item) => {
    if (item !== incomingTimes[0]) {
      response.status(StatusCodes.UNAUTHORIZED);
    }
  });
  incomingTimes.forEach((item) => {
    if (!validateTime(item)) {
      response.status(StatusCodes.UNAUTHORIZED);
    }
    response.status(StatusCodes.OK);
  });
  next();
});

module.exports = router;
