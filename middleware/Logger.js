const express = require('express');
const BodyParser = require('body-parser');
const StatusCodes = require('http-status-codes');

const router = express.Router();
router.use(BodyParser.json());

router.all('*', async (request, response, next) => {
  const log = Object;
  log.time = Math.round(Date.now() / 1000);
  log.verb = request.method;
  log.path = request.url;
  log.body = request.body;
  log.query = request.query;
  log.headers = request.headers;
  log.DateValidation = request.DateValidation;
  console.log(log);
  next();
});

module.exports = router;
