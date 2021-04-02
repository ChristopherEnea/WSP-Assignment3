const express = require('express');
const BodyParser = require('body-parser');
const UserController = require('../controllers/user.controller');

const router = express.Router();
router.use(BodyParser.json());

router.get('', UserController.getUsers);
router.get('/:ssn', UserController.getUser);
router.post('', UserController.createUser);
router.put('/:ssn', UserController.replaceUser);
router.patch('/:ssn', UserController.modifyUser);
router.delete('/:ssn', UserController.deleteUser);
router.delete('', UserController.deleteUsers);

module.exports = router;
