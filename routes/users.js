var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource dcs');
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST /users */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /users/:id */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;