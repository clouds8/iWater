var express = require('express');
var mongoose = require('mongoose');
var WatPro = require('../models/watPro').WatPro;
var Item = require('../models/item').Item;
var Acco = require('../models/acco').Acco;
var Auth = require('../models/auth').Auth;
var router = express.Router();

router.get('/item', function (req, res, next) {
  console.log('in the item');
  Item.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('show the all items');
      res.json(result);
    }
  })
});

router.get('/additem', function (req, res, next) {
  console.log('insect the item');

  var tempItem1 = {
    name: '一阶用水_水资源费',
    price: 0.5,
    tags: ['生活', '居民']
  }

  var tempItem2 = {
    name: '一阶用水-污水费',
    price: 0.2,
    tags: ['生活', '净化']
  }

  var tempItem3 = {
    name: '一阶用水-水费',
    price: 0.8,
    tags: ['生活', '居民']
  }

  var tempItems = [];
  tempItems.push(tempItem1);
  tempItems.push(tempItem2);
  tempItems.push(tempItem3);

  Item.create(tempItems, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('save items');
      res.send(result);
    }
  });
});

router.get('/watpro', function (req, res, next) {
  console.log('in the watpro');
  // WatPro.find({}, function (err, results) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('show the results');
  //     res.json(results);
  //   }
  // });
  WatPro.find()
  .populate('ladder1.items', 'name price')
  .exec(function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('show the results');
      res.json(results);
    }
  });

});

router.get('/addwatpro', function (req, res, next) {
  console.log('insect the watpro');
  Item.find({}, function (err, results) {
    if (err) {
      console.log(err);
    } else {

      var tempWatPro = new WatPro({
        name: '用水性质二',
        ladder1: {
          max: 9
        }
      })

      var len = results.length;
      while (len--) {
        tempWatPro.ladder1.items.push(results[len]);
      }
      // tempWatPro.ladder1.items.push(results[0]);
      tempWatPro.save(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('save watpro');
          res.json(data);
        }
      });
    }
  });
});

router.get('/acco', function (req, res, next) {
  console.log('in the acco');
  Acco.find()
  .populate('watPro', 'name')
  .exec(function (err, results) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('show the acco');
      res.json(results);
    }
  })
})

router.get('/addacco', function (req, res, next) {
  console.log('insect the Acco');
  var tempAcco = new Acco({
    custID: '440871177208237321',
    custName: '张志欢4',
    tele: '8613234552341',
    addre: '深南大道3622号',
    meterID: 'HZ39235',
    meterType: '机械表',
    payMode: '后付费',
    famiNum: 3,
    Freq: [1,2,3,4,5,6,7,8,9,10,11,12]
  });
  // WatPro.findOne().populate('ladder1.items').exec(function (err, watpro) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('find one watpro');
  //     tempAcco.watPro.push(watpro);
  //     tempAcco.save(function (err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('save acca');
  //         res.json(result);
  //       }
  //     });
  //   }
  // });
  //
  WatPro.find().populate('ladder1.items').exec(function (err, watpro) {
    if (err) {
      console.log(err);
    } else {
      console.log('find watpros');
      console.log(watpro);
      var len = watpro.length;
      for (var i = 0; i < len; i++) {
        console.log('push' + i );
        tempAcco.watPro.push(watpro[i]);
      }
      tempAcco.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('save acca');
          res.json({acco: result, watpro: watpro});
        }
      });
    }
  });
});

router.get('/auth', function (req, res, next) {
  console.log('list the auth');
  Auth.find({}, function (err, results) {
    if (err) {
      console.error(err);
    } else {
      res.json(results);
    }
  })
});

router.get('/addauth', function (req, res, next) {
  console.log('in the auth');


  var tempAuth1 = {
    text: '系统设置',
    parentID: null,
    href: null,
    icon: 'fa fa-home fa-fw',
    depart: '营业'
  }
  var tempAuth2 = {
    text: '账期管理',
    parentID: null,
    href: null,
    icon: 'fa fa-home fa-fw',
    depart: '营业'
  }
  var tempAuth3 = {
    text: '收费管理',
    parentID: null,
    href: null,
    icon: 'fa fa-home fa-fw',
    depart: '营业'
  }
  var tempAuth4 = {
    text: '开户管理',
    parentID: '5790492b94a8c1d59a049295',
    href: null,
    icon: 'fa fa-home fa-fw',
    depart: '营业'
  }

  var tempAuths = [tempAuth1, tempAuth2, tempAuth3, tempAuth4];


  // var auth = new Auth(tempAuth);
  Auth.insertMany(tempAuths, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;
