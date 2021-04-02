const express = require('express');
const BodyParser = require('body-parser');

const router = express.Router();
router.use(BodyParser.json());

router.delete('*', async (request, response) => response.sendStatus(405));

module.exports = router;
