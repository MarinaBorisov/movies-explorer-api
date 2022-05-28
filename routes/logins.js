const routerLogins = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');

routerLogins.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routerLogins.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

routerLogins.post('/signout', logout);

module.exports = {
  routerLogins,
};
