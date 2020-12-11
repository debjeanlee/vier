const router = require('express').Router();
const passport = require('passport');

router.post(
  '/register',
  passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
