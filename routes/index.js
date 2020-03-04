const express = require('express');
const router = express.Router();
const { row1, row2, row3 } = require('../lib/loaders');

// render home page
router.get('/', (req, res) => {
  return res.render('main/home', { row1, row2, row3 });
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;
