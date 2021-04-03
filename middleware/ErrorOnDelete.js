const express = require('express');
const BodyParser = require('body-parser');
const StatusCodes = require('http-status-codes');

const router = express.Router();
router.use(BodyParser.json());

router.delete('*', async (request, response) => response.sendStatus(StatusCodes.METHOD_NOT_ALLOWED));

module.exports = router;
