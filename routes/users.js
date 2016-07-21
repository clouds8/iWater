var express = require('express');
var mongoose = require('mongoose');
var WatPro = require('../models/watPro').WatPro;
var Item = require('../models/watPro').Item;
var ObjectId = mongoose.Types.ObjectId;
var router = express.Router();

/* GET users listing. */
router.get('/test', function(req, res, next) {
  console.log('in users');

  var items = [];
  var item1 = {_id: new ObjectId ,name: 'item1', price: 5}
  var item2 = {_id: new ObjectId, name: 'item2', price: 6}
  items.push(item1);
  items.push(item2);
  var watpro1 = {name: watpro1, ladders: [ {max: 4, items: [] } ]}
  watpro1.ladders[0].items.push(item1);
  watpro1.ladders[0].items.push(item2);
  watpro1.ladders[0].items.push(item1);

  Item.create(items, function (err, result) {
    console.log(result);
    WatPro.create(watpro1, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
        // res.send('respond with a resource');
      }

    });
  });


  // var watPro1 = new WatPro(tem);

  // var watPro1 = new WatPro({
  //   name: 1,
  //   ladders: [{max: 10, items: [{name: 'item1', price: 2}]}]
  // });

  // watPro1.ladders[0].items[0].push({name: 'item1', price: 2});
  //
  // watPro1.save(function (err) {
  //   if (err) {
  //     console.error(err);
  //     next();
  //   } else {
  //     console.log('success!');
  //     WatPro.find({}, function (err, results) {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         console.log(results);
  //         res.json(results);
  //       }
  //     })
  //   }
  // })

  // res.send('respond with a resource');
});

module.exports = router;
