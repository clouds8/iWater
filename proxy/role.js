var Role = require('../models/role').Role;
var mongoose = require('mongoose');
var async = require('async');
var Auth = require('../models/auth').Auth;


//查询条件构建
function getRoleQuery(params) {
  var query = {};
  if (params.roleName) {
    query.roleName = {"$regex": params.roleName, "$options": "gi"};
  }
  return query;
}

function addAuthsParentName(roles, callback) {
  function iteratee(role, callback) {
    if (role.auths) {
      async.map(role.auths, function (auth, callback) {

        Auth.findById(auth.parentID, 'text')
        .exec(function (err, result) {
          if (err) {
            callback(err);
          } else {
            if (result) {
              auth._doc.parentName = result.text;
            } else {
              auth._doc.parentName = '根目录';
            }
            callback(null, auth);
          }
        });

      }, function (err, results) {
        if (err) {
          callback(err);
        } else {
          role.auths = results;
          // console.log('test:');
          // console.log(role.auths);
          callback(null, role);
        }
      });//- end async.each
    }//- end if
  }//- end iteratee

  async.map(roles, iteratee, function (err, transformedRoles) {

    if (err) {
      console.log(err);
      callback(err);
    } else {
      // console.log(transformedRoles);
      callback(null, transformedRoles);
    }

    // var p = new Promise(function(resolve, reject) {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     resolve(roles);
    //   }
    // });

  }); //- end async.map
}

//分页获取角色
exports.getRolesAndCount = function (params, callback) {
  var options = {};

  //当size === 0 时返回所有记录
  if (parseInt(params.limit)!==0) {
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
    options.sort = {'createTime': 1};
  }

  var query = getRoleQuery(params);
  async.parallel({
    //返回角色数组
    roles: function (callback) {
      Role.find(query, {}, options)
        .populate('auths')
        .exec(function (err,roles) {
          addAuthsParentName(roles, function (err, roles) {
            if (err) {
              callback(err);
            } else {
              callback(null, roles);
            }
          });
        });
        // .exec(function (err, roles) {
        //   if (err) {
        //     callback(err);
        //   } else {
        //     // addAuthsParentName(roles)
        //     // .then(function (roles) {
        //     //   callback(null, roles);
        //     // })
        //     // .catch(function (err) {
        //     //   callback(err);
        //     // })
        //     //
        //     var p = new Promise(function(resolve, reject) {
        //
        //     });
        //     p.then(function (roles) {
        //       return roles;
        //     })
        //     .catch(function (err) {
        //       callback(err)
        //     })
        //   }
        // })
    },
    //返回所有记录总数
    total: function (callback) {
      Role.count(query, function (err, total) {
        if (err) {
          callback(err);
        } else {
          callback(null, total);
        }
      });
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
};

exports.add = function (role, callback) {
  // role._id = new mongoose.Types.ObjectId();
  if (role.auths) {
    var len = role.auths.length;
    var tempAuthsArray = [];
    while (len--) {
      var _id = role.auths[len]._id;
      if (mongoose.Types.ObjectId.isValid(_id)) {
        tempAuthsArray.push(mongoose.Types.ObjectId(_id));
      }
    }
    role.auths = tempAuthsArray;
  }
  Role.create(role, callback);
};

exports.update = function (roleID, role, callback) {
  Role.findByIdAndUpdate(roleID, role, callback);
};

exports.getById = function (roleID, callback) {
  Role.findById(roleID)
    .populate('auths')
    .exec(callback);
};

exports.delete = function (roleID, callback) {
  //TODO 如果仍存在属于该角色的操作员，则不能删除该角色。
  Role.findByIdAndRemove(roleID, callback);
};
