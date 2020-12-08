const router = require('express').Router();

router.use('/categories', require('./categories.routes'));
router.use('/dishes', require('./dishes.routes'));

module.exports = router;
