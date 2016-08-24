/**
 * 后台服务Restful API
 */

var express = require('express');
var router = express.Router();

var accoDao = require('../proxy/acco');
var authDao = require('../proxy/auth');
var roleDao = require('../proxy/role');
var userDao = require('../proxy/user');


router.route('/accos')

  .get(function (req, res, next) {
    var params = req.query;
    accoDao.getAccosAndCount(params, function (err, accoAndCount) {
      if (err) {
        console.error(err);
        // res.error(err);
      } else {
        var data = {
          total: accoAndCount.total,
          rows: accoAndCount.accos
        };
        res.json(data);
      }
    });
  })





/**
 * 权限管理
 */
router.route('/auths')

  .get(function (req, res, next) {
    authDao.getAll(function (err, results) {
      if (err) {
        console.error(err);
      } else {
        res.json(results);
      }
    });
  })

  .post(function (req, res, next) {
    var auth = req.body;
    authDao.addOrUpdate(auth, function (err, result) {
      if (err) {
        console.error(err);
        res.status(400).send({error: err});
      } else {
        res.status(200).send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    //TODO: 批量删除权限
  });




/**
 * 权限管理单个权限操作
 */
router.route('/auths/:auth_id')

  .get(function (req, res, next) {
    var authID = req.params.auth_id;
    authDao.getById(authID, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  })

  .put(function (req, res, next) {
    // var authID = req.params.auth_id;
    var auth = req.body;
    authDao.addOrUpdate(auth, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    authDao.delById(req.params.auth_id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({error: null});
      }
    });
  });




/**
 * 角色管理
 */
router.route('/roles')

  .get(function (req, res, next) {
    var params = req.query;
    roleDao.getRolesAndCount(params, function (err, rolesAndCount) {
      if (err) {
        res.status(500).send({"error": err});
      } else {
        var data = {
          total: rolesAndCount.total,
          rows: rolesAndCount.roles
        };
        res.send(data);
      }
    });
  })

  .post(function (req, res, next) {
    var role = req.body;
    roleDao.add(role, function (err, result) {
      if (err) {
        res.status(500).send({error: err});
      } else {
        res.send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    //TODO: 批量删除角色
  });


/**
 * 角色管理单个角色操作
 */
router.route('/roles/:role_id')

  .get(function (req, res, next) {
    var roleID = req.params.role_id;
    roleDao.getById(roleID, function (err, result) {
      if (err) {
        res.send({error: err});
      } else {
        res.send(result);
      }
    });
  })

  .put(function (req, res, next) {
    var roleID = req.params.role_id;
    var role = req.body;
    delete role._id;
    roleDao.update(roleID, role, function (err, result) {
      if (err) {
        res.send({error: err});
      } else {
        res.send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    var roleID = req.params.role_id;
    roleDao.delete(roleID, function (err, result) {
      if (err) {
        res.send({error: err});
      } else {
        res.send({error: null});
      }
    });
  });





/**
 * 用户管理
 */
router.route('/users')

  .get(function (req, res, next) {
    var params = req.query;
    userDao.getUsersAndCount(params, function (err, usersAndCount) {
      if (err) {
        res.status(500).send({"error": err});
      } else {
        var data = {
          total: usersAndCount.total,
          rows: usersAndCount.users
        };
        res.send(data);
      }
    });
  })

  .post(function (req, res, next) {
    var user = req.body;
    console.log(user);
    userDao.add(user, function (err, result) {
      console.log('end');
      if (err) {
        console.log(err);
        res.status(500).send({error: err});
      } else {
        res.send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    //TODO: 批量删除操作员
  });

/**
 * 用户管理单个用户操作
 */
router.route('/users/:user_id')
  .get(function (req, res, next) {
    userDao.getById(eq.params.user_id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  })
  .put(function (req, res, next) {
    var user = req.body
    console.log(req.params.user_id);
    userDao.update(req.params.user_id, user, function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.status(200).send({error: null});
      }
    });
  })
  .delete(function (req, res, next) {
    userDao.delById(req.params.user_id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({error: null});
      }
    });
  });









module.exports = router;
