var express = require('express');
var router = express.Router();
var accoDao = require('../proxy/acco');

/* GET business module. */
router.get('/accountmanage', function(req, res, next) {
  res.render('business/accountmanage', { title: '账户管理' });
});

router.get('/accos', function (req, res, next) {
  /**
   * 请求参数
   * @return {[type]} [description]
   */
  var params = req.query;
  // console.log('hello');
  console.log(params);
  console.log('~~~~~~~~~~~~~~');
  // accoDao.getAccos(params, function (err, accos) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     var total = accos.length;
  //     var data = {
  //       total: 14,
  //       rows: accos
  //     }
  //     console.log(total + '~~~~~~~~~~~~~');
  //     res.json(data);
  //   }
  // });
  accoDao.getAccosAndCount(params, function (err, accoAndCount) {
    console.log('getAccosAndCount');
    if (err) {
      console.error(err);
      res.error(err);
    } else {
      var data = {
        total: accoAndCount.total,
        rows: accoAndCount.accos
      }
      console.log(data);
      console.log(accoAndCount);
      res.json(data);
    }
  });

})

module.exports = router;
