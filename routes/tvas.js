var express = require('express');
var router = express.Router();

var Tva = require('../models/Tva.js');

/* GET /tvas listing. */
router.get('/', function(req, res, next) {
  Tva.find(function (err, tvas) {
    if (err) return next(err);
    res.json(tvas);
  });
});

/* POST /tvas */
router.post('/', function(req, res, next) {
  var tvaBody = req.body;
  
  Tva.create(tvaBody, function (err, tva) {
    if (err) return next(err);
    res.json(tva);
  });
});

/* GET /tvas/id */
router.get('/:id', function(req, res, next) {
  Tva.findById(req.params.id, function (err, tva) {
    if (err) return next(err);
    res.json(tva);
  });
});

/* PUT /tvas/:id */
router.put('/:id', function(req, res, next) {
  var tvaBody = req.body;
  
  Tva.findByIdAndUpdate(req.params.id, tvaBody, function (err, tva) {
    if (err) return next(err);
    res.json(tva);
  });
});

/* DELETE /tvas/:id */
router.delete('/:id', function(req, res, next) {
  Tva.findByIdAndRemove(req.params.id, req.body, function (err, tva) {
    if (err) return next(err);
    res.json(tva);
  });
});

module.exports = router;
