const express = require('express');
const router = express.Router();

// render home page
router.get('/', (req, res) => {
  return res.render('main/home');
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;
