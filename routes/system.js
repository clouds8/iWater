var express = require('express');
var router = express.Router();
var authDao = require('../proxy/auth');
var roleDao = require('../proxy/role');
var userDao = require('../proxy/user');
var Auth = require('../models/auth').Auth;
var Role = require('../models/role').Role;
var User = require('../models/user').User;


/**
 *
 * /auths
 *get: get all auths
 *post: create a auth
 *delete: delete [auth]
 *
 *
 * /auths/:auth
 * get: get a specific auth
 * post: -
 * put: update a specific auth
 * delete: delete a specific auth
 */

router.get('/auths', function (req, res, next) {
  authDao.getAll(function (err, results) {
    if (err) {
      console.error(err);
    } else {
      res.json(results);
    }
  });
});

router.post('/auths', function (req, res, next) {
  var auth = req.body;
  authDao.addOrUpdate(auth, function (err, result) {
    if (err) {
      console.error(err);
      res.status(400).send({error: err});
    } else {
      // res.redirect('back');
      res.status(200).send({error: null});
    }
  });
});

router.route('/auths/:auth_id')
  .get(function (req, res, next) {
    var authID = req.params.auth_id;
    Auth.findById(authID, function (err, result) {
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
        // res.json(result);
        res.status(200).send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    console.log('in the delete ?');
    Auth.findByIdAndRemove(req.params.auth_id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log('delete:');
        console.log(result);
        res.status(200).send({error: null});
      }
    });
  });




/**
 *
 * /roles
 *get: get all roles
 *post: create a role
 *delete: delete [roles]
 *
 *
 * /roles/:role_id
 * get: get a specific role
 * post: -
 * put: update a specific role
 * delete: delete a specific role
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

router.route('/roles/:role_id')
  .get(function (req, res, next) {
    var roleID = req.params.role_id;
    roleDao.get(roleID, function (err, result) {
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
        res.status(500).send({error: err});
      } else {
        res.send({error: null});
      }
    });
  })

  .delete(function (req, res, next) {
    //TODO: 批量删除操作员
  });

router.route('/users/:user_id')
  .get(function (req, res, next) {

  })
  .put(function (req, res, next) {

  })
  .delete(function (req, res, next) {

  });


module.exports = router;
