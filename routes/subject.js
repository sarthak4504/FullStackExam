const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', isLoggedIn, async (req, res) => {
  const subjects = await Subject.find({});
  res.render('subjects/index', { subjects });
});


module.exports = router;
