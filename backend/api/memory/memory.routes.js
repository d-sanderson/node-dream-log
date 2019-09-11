const express = require('express');
const router = express.Router();
const memCtrl = require('./memory.controller');

router.route('/')
  .get(memCtrl.getMemories)
  .post(memCtrl.createMemory);
router.route('/update').post(memCtrl.updateMemory);
router.route('/delete').delete(memCtrl.deleteMemory);


module.exports = router;
