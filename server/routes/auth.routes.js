const router = require('express').Router();
const passport = require('passport');

/**
 * @method POST
 * @route '/api/auth/register'
 */
router.post(
  '/register',
  passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

/**
 * @method GET
 * @route '/api/auth/login'
 */
router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
