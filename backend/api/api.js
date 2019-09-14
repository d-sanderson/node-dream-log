var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/user.routes'));
router.use('/memories', require('./memory/memory.routes'));


module.exports = router;
