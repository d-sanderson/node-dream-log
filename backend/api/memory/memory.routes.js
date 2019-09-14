const express = require('express');
const router = express.Router();
const controller = require('./memory.controller');
const auth = require('../../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];
router.route('/')
  .get(controller.getMemories)
  .post(checkUser, controller.post);
router.route('/update').post(checkUser, controller.updateMemory);
router.route('/delete').delete(checkUser, controller.deleteMemory);


module.exports = router;
