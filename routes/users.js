const routerUsers = require('express').Router();
const { celebrate } = require('celebrate');
const { userPatchSchema } = require('../utils/userSchemas');
const { getCurrentUser, editUserInfo } = require('../controllers/users');

routerUsers.get('/me', getCurrentUser);

routerUsers.patch('/me', celebrate(userPatchSchema), editUserInfo);

module.exports = {
  routerUsers,
};
