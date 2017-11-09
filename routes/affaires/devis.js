var express = require('express');
var router = express.Router();

var DevisModel = require('../../models/Affaire.js').DevisModel;

/* GET /devis listing. */
router.get('/', function(req, res, next) {
  DevisModel.find(function (err, devis) {
    if (err) return next(err);
    res.json(devis);
  });
});

/* POST /devis */
router.post('/', function(req, res, next) {
  var devisBody = req.body;
  
  DevisModel.create(devisBody, function (err, devis) {
    if (err) return next(err);
    res.json(devis);
  });
});

/* GET /devis/id */
router.get('/:id', function(req, res, next) {
  DevisModel.findById(req.params.id, function (err, devis) {
    if (err) return next(err);
    res.json(devis);
  });
});

/* PUT /devis/:id */
router.put('/:id', function(req, res, next) {
  var devisBody = req.body;
  
  DevisModel.findByIdAndUpdate(req.params.id, devisBody, function (err, devis) {
    if (err) return next(err);
    res.json(devis);
  });
});

/* DELETE /devis/:id */
router.delete('/:id', function(req, res, next) {
  DevisModel.findByIdAndRemove(req.params.id, req.body, function (err, devis) {
    if (err) return next(err);
    res.json(devis);
  });
});

module.exports = router;
