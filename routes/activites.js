var express = require('express');
var router = express.Router();

var Activite = require('../models/Activite.js');

/* GET /activites listing. */
router.get('/', function(req, res, next) {
  Activite.find(function (err, activites) {
    if (err) return next(err);
    res.json(activites);
  });
});

/* POST /activites */
router.post('/', function(req, res, next) {
  var activiteBody = req.body;
  
  Activite.create(activiteBody, function (err, activite) {
    if (err) return next(err);
    res.json(activite);
  });
});

/* GET /activites/id */
router.get('/:id', function(req, res, next) {
  Activite.findById(req.params.id, function (err, activite) {
    if (err) return next(err);
    res.json(activite);
  });
});

/* PUT /activites/:id */
router.put('/:id', function(req, res, next) {
  var activiteBody = req.body;
  
  Activite.findByIdAndUpdate(req.params.id, activiteBody, function (err, activite) {
    if (err) return next(err);
    res.json(activite);
  });
});

/* DELETE /activites/:id */
router.delete('/:id', function(req, res, next) {
  Activite.findByIdAndRemove(req.params.id, req.body, function (err, activite) {
    if (err) return next(err);
    res.json(activite);
  });
});

module.exports = router;
