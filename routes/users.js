const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser, editUserInfo,
} = require('../controllers/users');

Joi.objectId = require('joi-objectid')(Joi);

routerUsers.get('/me', getCurrentUser);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUserInfo);

module.exports = {
  routerUsers,
};
