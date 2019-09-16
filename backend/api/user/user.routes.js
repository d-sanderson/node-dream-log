const router = require('express').Router();
const controller = require('./user.controller');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];
const verifySignup = auth.verifySignup();
// lock down the right routes :)
router.param('id', controller.params);

router.get('/me', checkUser, controller.me);
router.route('/')
  // .get(controller.get)
  .post(verifySignup, controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;