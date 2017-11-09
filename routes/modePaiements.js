var express = require('express');
var router = express.Router();

var ModePaiement = require('../models/ModePaiement.js');

/* GET /modePaiements listing. */
router.get('/', function(req, res, next) {
  ModePaiement.find(function (err, modePaiements) {
    if (err) return next(err);
    res.json(modePaiements);
  });
});

/* POST /modePaiements */
router.post('/', function(req, res, next) {
  var modePaiementBody = req.body;
  
  ModePaiement.create(modePaiementBody, function (err, modePaiement) {
    if (err) return next(err);
    res.json(modePaiement);
  });
});

/* GET /modePaiements/id */
router.get('/:id', function(req, res, next) {
  ModePaiement.findById(req.params.id, function (err, modePaiement) {
    if (err) return next(err);
    res.json(modePaiement);
  });
});

/* PUT /modePaiements/:id */
router.put('/:id', function(req, res, next) {
  var modePaiementBody = req.body;
  
  ModePaiement.findByIdAndUpdate(req.params.id, modePaiementBody, function (err, modePaiement) {
    if (err) return next(err);
    res.json(modePaiement);
  });
});

/* DELETE /modePaiements/:id */
router.delete('/:id', function(req, res, next) {
  ModePaiement.findByIdAndRemove(req.params.id, req.body, function (err, modePaiement) {
    if (err) return next(err);
    res.json(modePaiement);
  });
});

module.exports = router;
