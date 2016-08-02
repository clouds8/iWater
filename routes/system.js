var express = require('express');
var router = express.Router();
var authDao = require('../proxy/auth');
var Auth = require('../models/auth').Auth


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

// router.route('/auths')
// .get()

router.get('/auths', function (req, res, next) {
  authDao.getAll(function (err, results) {
    if (err) {
      console.error(err);
    } else {
      res.json(results);
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
        res.redirect('back');
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
  })

router.post('/auth', function (req, res, next) {
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
})

// router.delete('/auth', function (req, res, next) {
// })





module.exports = router;
