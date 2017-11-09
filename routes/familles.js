var express = require('express');
var router = express.Router();

var Famille = require('../models/Famille.js');

/* GET /familles listing. */
router.get('/', function(req, res, next) {
  Famille.find(function (err, familles) {
    if (err) return next(err);
    res.json(familles);
  });
});

/* POST /familles */
router.post('/', function(req, res, next) {
  var familleBody = req.body;
  
  Famille.create(familleBody, function (err, famille) {
    if (err) return next(err);
    res.json(famille);
  });
});

/* GET /familles/id */
router.get('/:id', function(req, res, next) {
  Famille.findById(req.params.id, function (err, famille) {
    if (err) return next(err);
    res.json(famille);
  });
});

/* PUT /familles/:id */
router.put('/:id', function(req, res, next) {
  var familleBody = req.body;
  
  Famille.findByIdAndUpdate(req.params.id, familleBody, function (err, famille) {
    if (err) return next(err);
    res.json(famille);
  });
});

/* DELETE /familles/:id */
router.delete('/:id', function(req, res, next) {
  Famille.findByIdAndRemove(req.params.id, req.body, function (err, famille) {
    if (err) return next(err);
    res.json(famille);
  });
});

module.exports = router;
