const routerLogins = require('express').Router();
const { celebrate } = require('celebrate');
const { userCheckSchema, userCreateSchema } = require('../utils/userSchemas');
const { login, createUser, logout } = require('../controllers/users');

routerLogins.post('/signin', celebrate(userCheckSchema), login);

routerLogins.post('/signup', celebrate(userCreateSchema), createUser);

routerLogins.post('/signout', logout);

module.exports = {
  routerLogins,
};
