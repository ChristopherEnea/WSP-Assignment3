const StatusCodes = require('http-status-codes');
const UserService = require('../services/user.services');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const getUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const users = await UserService.getUsers(request.query);
    if (users.length === 0) {
      return response.sendStatus(StatusCodes.NOT_FOUND);
    }
    return response.json(users);
  });
};

const getUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await UserService.getUser(request.params.ssn);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(StatusCodes.NOT_FOUND);
    }
  });
};

const createUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await UserService.createUser(request.body);
    response.sendStatus(StatusCodes.CREATED);
  });
};

const replaceUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await UserService.replaceUser(request.params.ssn, request.body);
    return response.sendStatus(StatusCodes.OK);
  });
};

const modifyUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await UserService.modifyUser(request.params.ssn, request.body);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(StatusCodes.NOT_FOUND);
    }
  });
};

const deleteUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await UserService.deleteUser(request.params.ssn);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(StatusCodes.NOT_FOUND);
    }
  });
};

const deleteUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await UserService.deleteUsers());
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  replaceUser,
  modifyUser,
  deleteUser,
  deleteUsers,
};
