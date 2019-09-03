const express = require('express');
const router = express.Router();
const memCtrl = require('./memory.controller');

router.route('/memories').get(memCtrl.getMemories);
router.route('/update').post(memCtrl.updateMemory);
router.route('/delete').delete(memCtrl.deleteMemory);
router.route('/create').post(memCtrl.createMemory);

module.exports = router;