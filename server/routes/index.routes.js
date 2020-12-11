const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/cart', require('./cart.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/dishes', require('./dishes.routes'));
router.use('/session', require('./sessions.routes'));
router.use('/tables', require('./tables.routes'));

module.exports = router;
