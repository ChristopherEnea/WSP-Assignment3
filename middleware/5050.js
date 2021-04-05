const express = require('express');
const BodyParser = require('body-parser');
const StatusCodes = require('http-status-codes');

const router = express.Router();
router.use(BodyParser.json());

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
}

router.all('', async (request, response, next) => {
  console.log(getRandomInt(1, 10) % 2);
  // response.status(StatusCodes.OK);
  next();
});

module.exports = router;
