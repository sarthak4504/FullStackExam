const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', async (req, res) => {
  try {
    const { username, password, gender, number, courseName } = req.body;
    const newUser = new User({
      username,
      gender,
      number,
      coursesEnrolled: [{ courseName }]
    });
    await newUser.save();
    req.flash('success', 'Registered successfully! Please login.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/subjects',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out successfully.');
    res.redirect('/login');
  });
});

module.exports = router;
