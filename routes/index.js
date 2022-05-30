const router = require('express').Router();
const { routerLogins } = require('./logins');
const { routerMovies } = require('./movies');
const { routerUsers } = require('./users');
const NotFoundError = require('../errorModules/notFound');
const auth = require('../middlewares/auth');
const { REQUESTED_RESOURCE_NOT_FOUND } = require('../utils/constants');

router.use('/', routerLogins);
router.use('/movies', auth, routerMovies);
router.use('/users', auth, routerUsers);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(REQUESTED_RESOURCE_NOT_FOUND));
});

module.exports = router;
