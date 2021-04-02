const UserService = require('../services/user.services');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

const getUsers = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const users = await UserService.getUsers(req.query);
    if (users.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(users);
  });
};

const getUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const getResult = await UserService.getUser(req.params.ssn);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const createUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    await UserService.createUser(req.body);
    res.sendStatus(201);
  });
};

const replaceUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    // if (req.body == null) { return res.sendStatus(204); }
    await UserService.replaceUser(req.params.ssn, req.body);
    return res.sendStatus(200);
  });
};

const modifyUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const patchResult = await UserService.modifyUser(req.params.ssn, req.body);
    if (patchResult != null) {
      res.json(patchResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteUser = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const getResult = await UserService.deleteUser(req.params.ssn);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteUsers = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    res.json(await UserService.deleteUsers());
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
