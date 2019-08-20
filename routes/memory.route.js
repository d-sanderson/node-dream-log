const express = require('express');
const router = express.Router();
const memory_controller = require('../controllers/memory.controller');


router.post('/create', memory_controller.memory_create);
// router.get('/:id', memory_controller.memory_details);
// router.put('/:id/update', memory_controller.memory_update);
// router.delete('/:id/delete', memory_controller.memory_delete);
module.exports = router;
