const User = require('../models/user.model');

const getUsers = async (query) => User.find(query).select('-_id -__v');
const createUser = async (body) => new User(body).save();
const getUser = async (id) => User.findOne({ ssn: id }).select('-_id -__v');
const replaceUser = async (id, body) => User.findOneAndReplace({ ssn: id }, body);
const modifyUser = async (id, body) => User.findOneAndUpdate({ ssn: id }, body, { new: true }).select('-_id -__v');
const deleteUser = async (id) => User.deleteOne({ ssn: id });
const deleteUsers = async () => User.deleteMany({});

module.exports = {
  getUsers,
  createUser,
  getUser,
  replaceUser,
  modifyUser,
  deleteUser,
  deleteUsers,
};
