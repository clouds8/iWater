var User = require('../models/user').User;
var Role = require('../models/role').Role;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var INITPASS = '123';

var async = require('async');


//查询条件构建
function getUserQuery(params) {
  var query = {};
  if (params.name) {
    query.name = {"$regex": params.name, "$options": "gi"};
  }
  return query;
}


//分页获取用户
exports.getUsersAndCount = function (params, callback) {
  var options = {};

  //当size === 0 时返回所有记录
  if (parseInt(params.size)!==0) {
    var offset = parseInt(params.offset) || 0;
    var size = parseInt(params.limit) || 10;
    options.limit = size;
    options.skip = offset;
  }


  if (params.sort) {
    options.sort = {};
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
    options.sort = {'createTime': -1};
  }

  var query = getUserQuery(params);

  async.parallel({

    //返回操作员数组
    users: function (callback) {
      User.find(query, '_id name roles disabled disabledAlis createTime modifyTime', options)
      .populate({
          path: 'roles',
          select: "roleName"
      })
      .exec(function (err, users) {
        if (err) {
          callback(err);
        } else {
          callback(null, users);
        }
      });
    },

    //返回操作员总数
    total: function (callback) {
      User.count(query, function (err, total) {
        if (err) {
          callback(err);
        } else {
          callback(null, total);
        }
      });
    }

  //查找操作结束后的回调函数
  }, function (err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        users: results.users,
        total: results.total
      });
    }
  });

};

exports.add = function (user, cb) {

  // 如果roles是字符串数组的形式则使用这个
  // if (user.roles) {
  //   var len = user.roles.length;
  //   var tempRoleArray = [];
  //   while (len--) {
  //     tempRoleArray.push(new mongoose.Types.ObjectId(user.roles[len]));
  //   }
  //   user.roles = tempRoleArray;
  // }


  //if (user.roles) {
  //  var len = user.roles.length;
  //  var tempRoleArray = [];
  //  while (len--) {
  //    console.log(len);
  //    //tempRoleArray.push(new mongoose.Type.ObjectId(user.roles[len]._id));
  //    tempRoleArray.push(user.roles[len]._id);
  //  }
  //  user.roles = tempRoleArray;
  //}

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {

    if (err) {
      cb(err);
    } else {
      if (!user.password) {
        user.password = INITPASS;
      }
      //加盐
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
          return;
        } else {

          user.password = hash;
          User.create(user, function (err, result) {
            console.log('end');
            if (err) {
              console.error(err);
              cb(err);
            } else {
              console.log(result);
              cb(null, result);
            }
          });
        }
      });

    }
  });
};

//更新用户   (这里可能要删除user对象的_id)
exports.update = function (userID, user, callback) {

  if (user.password) {

    var genSalt = new Promise(function(resolve, reject) {
      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
          reject(err);
        } else {
          resolve(salt);
        }
      });
    });

    genSalt.then(function (salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          Promise.reject(err);
        } else {
          user.password = hash;
          delete user._id;
          User.findByIdAndUpdate(userID, user, callback);
        }
      });
    })
    .catch(function (err) {
      callback(err);
    });

  } else {

    delete user._id;
    User.findByIdAndUpdate(userID, user, callback);

  }

};

exports.getById = function (userID, callback) {
  User.findById(userID)
    .populate({
        path: 'roles',
        select: "roleName"
    })
    .exec(callback);
};

exports.delById = function (userID, callback) {
  User.findByIdAndRemove(userID, callback);
};
