//权限管理dao
//

var Auth = require('../models/auth').Auth;
var mongoose = require('mongoose');

function getAuthQuery(params) {
  var query = {};
  if (params.text) {
    query.text = {"$regex": params.text, "$options": "gi"};
  }
  return query;
}

//增加或者更新记录
exports.addOrUpdate = function (auth, callback) {

  if (auth._id) {
    var id = auth._id;
    delete auth._id;
    //如果父节点ID为空，则节点点击时会展开
    if(!auth.parentID)
      auth.selectable = false;
    Auth.findByIdAndUpdate(id, auth, {new: true, upsert: true,
      setDefaultsOnInsert: true}, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        // console.log('success~~~');
        callback(null, result);
      }
    });
  }
  else {
    auth._id = new mongoose.Types.ObjectId();
    Auth.create(auth, callback);
  }
};

// exports.authUpdate = function (auth, callback) {
//
// }

exports.getAuthsAndCount = function (params, callback) {
  var options = {};
  var offset = parseInt(params.offset) || 0;
  var size = parseInt(params.limit) || 10;
  if (params.sort) {
    options.sort = {}
    switch (params.order) {
      case 'asc':
        options.sort[params.sort] = 1;
        break;
      case 'desc':
        options.sort[params.sort] = -1;
        break;
      default:
        options.sort[params.sort] = -1;
    }
  } else {
    options.sort = {'order': 1}
  }

  options.limit = size;
  options.skip = offset;
  var query = getAuthQuery(params);

  //返回auth和总数
  async.parallel({
    auths: function (callback) {
      Auth.find(query, {}, options)
      .exec(function (err, auths) {
        if (err) {
          callback(err);
        } else {
          callback(null, auths);
        }
      });
    },
    total: function (callback) {
      Auth.count(query, function (err, total) {
        if (err) {
          callback(err);
        } else {
          callback(null, total);
        }
      });
    }
  }, function (err, results) {
    if (err) {
      callback(err)
    } else {
      callback(null, {
        accos: results.accos,
        total: results.total
      });
    }
  });
}

//无条件获取所有记录
exports.getAll = function (callback) {
  Auth.find({}, null, function (err, results) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

//带条件获取记录
//TODO: 根据查询条件返回匹配的记录以及其祖先记录。
// function getWithParams(params, callback) {
//   var query = getAuthQuery(params);
//   async.waterfall([
//     getRelativeAuths,
//     getParentAuths
//   ],function (err, result) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result);
//     }
//   });
//
//   function getRelativeAuths(callback) {
//     Auth.find(query, null, callback(err, results){
//
//     });
//   }
//   function getParentAuths(auths, callback) {
//
//   }
// }
