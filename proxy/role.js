var Role = require('../models/role').Role;
var mongoose = require('mongoose');
var async = require('async');


//查询条件构建
function getRoleQuery(params) {
  var query = {};
  if (params.roelName) {
    query.custName = {"$regex": params.roelName, "$options": "gi"};
  }
}

//分页获取角色
exports.getRolesAndCount = function (params, callback) {
  var options = {};
  var offset = parseInt(params.offset) || 0;
  var size = parseInt(params.limit) || 10;
  options.limit = size;
  options.skip = offset;
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
    options.sort = {'createTime': 1}
  }

  var query = getRoleQuery(params);
  async.parallel({
    //返回角色数组
    roles: function (callback) {
      Role.find(query, {}, options)
        .populate('auths')
        .exec(function (err, roles) {
          if (err) {
            callback(err);
          } else {
            callback(null, roles);
          }
        })
    },
    //返回所有记录总数
    total: function (callback) {
      Role.count(query, function (err, total) {
        if (err) {
          callback(err);
        } else {
          callback(null, total);
        }
      })
    }
  //返回最终结果
  }, function (err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        roles: results.roles,
        total: results.total
      });
    }
  });
}

exports.add = function (role, callback) {
  // role._id = new mongoose.Types.ObjectId();
  console.log(role);
  if (role.auths) {
    var len = role.auths.length;
    var tempAuthsArray = [];
    while (len--) {
      tempAuthsArray.push(new mongoose.Types.ObjectId(role.auths[len]))
      console.log(tempAuthsArray);
    }
    role.auths = tempAuthsArray;
  }
  console.log('after');
  console.log(role);
  Role.create(role, callback);
}

exports.update = function (roleID, role, callback) {
  Role.findByIdAndUpdate(roleID, role, callback);
}

exports.get = function (roleID, callback) {
  Role.findById(roleID)
    .populate('auths')
    .exec(callback);
}

exports.delete = function (roleID, callback) {
  //TODO 如果仍存在属于该角色的操作员，则不能删除该角色。
  Role.findByIdAndUpdateRemove(roleID, callback);
}
