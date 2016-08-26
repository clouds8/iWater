var express = require('express');
var userDao = require('../proxy/user');
var router = express.Router();


// function requireAuthentication(req, res, next) {
//   var _user = req.session.user;
//   if (_user) {
//     res.locals.user = _user;
//     userDao.getUserAuthsSetById(_user._id, function (err, authSet) {
//       if (err) {
//         console.error(err);
//         next(err);
//       } else {
//         console.log('show the baseUrl');
//         console.log(req.baseUrl);
//         console.log(authSet);
//         next();
//       }
//     });
//   } else {
//     res.redirect('html/login.html');
//
//   }
// }
//
// router.use(requireAuthentication);

router.get('/', function (req, res, next) {

  var _user = req.session.user;
  console.log('the _user: ' + _user);
  console.log(_user);

  if (_user) {
    // req.app.locals.user = _user;
    res.locals.user = _user;
    res.render('common/layout', { title: 'iWater服务系统'});
  } else {
    res.redirect('html/login.html');
  }

  // res.render('common/layout', { title: 'iWater服务系统'});
});


router.get('/init', function (req, res, next) {
  res.render('common/content', { title: '个人主页'});
});


router.get('/acco', function (req, res, next) {
  res.render('busi/acco/acco', { title: '开户列表'});
});


router.get('/auths', function (req, res, next) {
  res.render('system/auth/auths', { title: '权限管理'});
});


router.get('/roles', function (req, res, next) {
  res.render('system/role/roles', { title: '角色管理'});
});


router.get('/users', function (req, res, next) {
  res.render('system/user/users', { title: '用户管理'});
});

module.exports = router;
