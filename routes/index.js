var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('user in  session');
  if (req.session.user) {
    console.log(req.session.user);
  }
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.sendFile('/html/login');
});

router.get('/router', function (req, res, next) {
  console.log('user in  session');
  var _user = req.session.user;
  if (_user) {
    console.log(_user);
    res.locals.user = _user;
  }
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

router.get('/router/auths', function (req, res, next) {
  res.render('system/auth/auths', { title: '权限管理'});
});

router.get('/router/roles', function (req, res, next) {
  res.render('system/role/roles', { title: '角色管理'});
});


module.exports = router;
