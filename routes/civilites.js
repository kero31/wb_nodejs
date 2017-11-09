var express = require('express');
var router = express.Router();

var Civilite = require('../models/Civilite.js');

/* GET /civilites listing. */
router.get('/', function(req, res, next) {
  Civilite.find(function (err, civilites) {
    if (err) return next(err);
    res.json(civilites);
  });
});

/* POST /civilites */
router.post('/', function(req, res, next) {
  var civiliteBody = req.body;
  
  Civilite.create(civiliteBody, function (err, civilite) {
    if (err) return next(err);
    res.json(civilite);
  });
});

/* GET /civilites/id */
router.get('/:id', function(req, res, next) {
  Civilite.findById(req.params.id, function (err, civilite) {
    if (err) return next(err);
    res.json(civilite);
  });
});

/* PUT /civilites/:id */
router.put('/:id', function(req, res, next) {
  var civiliteBody = req.body;
  
  Civilite.findByIdAndUpdate(req.params.id, civiliteBody, function (err, civilite) {
    if (err) return next(err);
    res.json(civilite);
  });
});

/* DELETE /civilites/:id */
router.delete('/:id', function(req, res, next) {
  Civilite.findByIdAndRemove(req.params.id, req.body, function (err, civilite) {
    if (err) return next(err);
    res.json(civilite);
  });
});

module.exports = router;
