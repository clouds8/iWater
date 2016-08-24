var express = require('express');
var router = express.Router();
var User = require('../models/user').User;


router.post('/', function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var _user = { name: name, password: password };
  User.findOne({name: _user.name}, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (!user){
      return res.redirect('/html/login.html');
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        console.log('password is  matched');
        req.session.user = user;
        return res.redirect('/');
      } else {
        console.log('password is not matched');
      }
    });
  });
});

module.exports = router;
