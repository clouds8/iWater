var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  delete req.session.user;
  delete req.app.locals.user;
  res.redirect('/html/login.html');
})

module.exports = router;
