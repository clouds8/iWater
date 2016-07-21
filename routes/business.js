var express = require('express');
var router = express.Router();

/* GET business module. */
router.get('/accountmanage', function(req, res, next) {
  res.render('business/accountmanage', { title: '账户管理' });
});

module.exports = router;
