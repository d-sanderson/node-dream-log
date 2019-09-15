const router = require('express').Router();
const controller = require('./user.controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
// lock down the right routes :)
router.param('id', controller.params);

router.get('/me', checkUser, controller.me);
router.route('/')
  // .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;