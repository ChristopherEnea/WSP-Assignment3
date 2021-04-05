const express = require('express');
const BodyParser = require('body-parser');
const coinflip = require('coinflip');
const StatusCodes = require('http-status-codes');

const router = express.Router();
router.use(BodyParser.json());

router.all('', async (request, response, next) => {
  if (coinflip()) {
    response.status(StatusCodes.OK).send('Hello World');
  } else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('oops');
  }
  next();
});

module.exports = router;
