var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/router', function (req, res, next) {
  res.render('common/layout', { title: 'TestRouter'});
});

router.get('/router/init', function (req, res, next) {
  res.render('common/content', { title: '个人主页'});
});


router.get('/router/acco', function (req, res, next) {
  res.render('busi/acco/acco', { title: '开户列表'});
});

router.get('/router/content', function (req, res, next) {
  res.render('common/content', { title: 'content'});
});

router.get('/router/auth', function (req, res, next) {
  res.render('common/content', { title: 'content'});
});



module.exports = router;
