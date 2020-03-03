const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation');

router.get('/register', (req, res) => {
  return res.render('auth/register', { errors: req.flash('errors') });
});

router.post('/register', userValidation, userController.register);

router.get('/login', (req, res) => {
  return res.render('auth/login', { errors: req.flash('errors') });
});

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/login',
    failureFlash: true
  })
);

router.get('/profile', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('auth/profile');
  } else {
    res.send('Unauthorized');
  }
});

router.get('/update-profile', (req, res) => {
  res.render('auth/update-profile');
});

module.exports = router;
