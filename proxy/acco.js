// 开户管理的dao
// 根据查询条件查询对象
var Acco = require('../models/acco').Acco
var async = require('async');

function getAccoQuery(params) {
  var query = {};
  if (params.custName) {
    query.custName = {"$regex": params.custName, "$options": "gi"};
  }
  if (query.meterID) {
    query.meterID = params.meterID;
  }
  if (query.addre) {
    query.addre = {"$regex": params.addre, "$options": "gi"};
  }
  return query;
}

exports.getTotalRows = function (params, callback) {

}

exports.getAccosAndCount =function (params, callback) {
  var options = {};
  console.log('in the get AccoAndCount');
  var offset = parseInt(params.offset) || 0;
  var size = parseInt(params.limit) || 10;

  if (params.sort) {
    options.sort = {}
    //如果有排序字段，则看是否为创建时间顺序
    //如果按照时间顺序则观察排序为asc还是desc
    // console.log(params.sort);
    switch (params.order) {
      case 'asc':
        // options.sort = {params.sort: 1}
        options.sort[params.sort] = 1;
        break;
      case 'desc':
        // options.sort = {params.sort: -1}
        options.sort[params.sort] = -1;
        break;
      default:
        options.sort[params.sort] = -1;
    }
  }
  else {
    options.sort = {'createTime': 1}
    }

  // page = page > 0 ? page : 1;
  // options.skip = (page - 1) * size;
  options.limit = size;
  options.skip = offset;
  var query = getAccoQuery(params);

  // Acco.find(query, {}, options, function (err, accos) {
  //   if (err) {
  //     return callback(err);
  //   }
  //   else return callback(null, accos);
  // });
  async.parallel({
    accos: function (callback) {
      Acco.find(query, {}, options)
        .populate('watPro', 'name')
        .exec(function (err, accos) {
          if (err) {
            callback(err);
          } else {
            callback(null, accos);
          }
        });
    },
    total: function (callback) {
      Acco.count(query, function (err, total) {
        if (err) {
          callback(err);
        } else {
          callback(null, total);
        }
      });
    }
  }, function (err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        accos: results.accos,
        total: results.total
      });
    }
  });
  // Acco.find(query, {}, options)
  //   .populate('watPro', 'name')
  //   .exec(function (err, accos) {
  //     if (err) {
  //       callback(err);
  //     }
  //     else {
  //       Acco.count(query,{})
  //           .exec(function (err, countResult) {
  //             if (err) {
  //               console.error(err);
  //               callback(err);
  //             } else {
  //               var accoAndCount = {
  //                 acco: accos,
  //                 count: countResult
  //               }
  //               callback(null, accoAndCount);
  //             }
  //           });
  //       // callback(null, accos);
  //     }
  //   });
}
