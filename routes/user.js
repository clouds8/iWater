var express = require('express');
var router = express.Router();
var userDao = require('../proxy/user');

function requireAuthentication(req, res, next) {
  var _user = req.session.user;
  if (_user) {
    res.locals.user = _user;
    userDao.getUserAuthsSetById(_user._id, function (err, authSet) {
      if (err) {
        console.error(err);
        next(err);
      } else {
        console.log('show the baseUrl');
        console.log(req.baseUrl);
        // console.log(authSet);
        next();
      }
    });
  } else {
    res.redirect('html/login.html');

  }
}


router.get('/auths', function (req, res, next) {
  var _user = req.session.user;

  if (_user) {
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    userDao.getUserAuthsSetById(_user._id, function (err, userAuths) {
      if (err) {
        console.error(err);
        // res.end();
      } else {
        console.log('##############');
        // console.log(userAuths.length);
        console.log('##############');

        res.send(userAuths);
      }
    });
  } else {
    res.redirect('html/login.html');
  }

});



module.exports = router;
