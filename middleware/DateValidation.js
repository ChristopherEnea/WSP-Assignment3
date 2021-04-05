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
  if (secondsSinceEpoch - 5 < incomingTimeInt && incomingTimeInt < secondsSinceEpoch + 5) {
    return true;
  }
  return false;
}

// todo. add error logging for bad parseInt
router.all('*', async (request, response, next) => {
  // console.log('query:', request.query['date-validation']);
  Object.keys(request.query).forEach((key) => {
    if (key.toLowerCase() === 'date-validation') {
      console.log(request.query[key]);
      console.log(validateTime(Number.parseInt(request.query[key], 10)));
    }
  });
  // console.log('query:', test);
  // console.log('header:', request.get('date-validation'));
  // console.log(validateTime(request.get('date-validation')));
  if (!request.get('date-validation')) {
    console.log('no header timestamp');
  } else if (request.get('date-validation') && !validateTime(request.get('date-validation'))) {
    console.log('header timestamp out of range');
  }
  next();
});

module.exports = router;
