const express = require('express');
const StatusCodes = require('http-status-codes');

const router = express.Router();

module.exports = router.delete('*', async (request, response, next) => {
  response.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  next();
});
