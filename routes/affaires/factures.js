var express = require('express');
var router = express.Router();

var FactureModel = require('../../models/Affaire.js').FactureModel;

/* GET /factures listing. */
router.get('/', function(req, res, next) {
  FactureModel.find(function (err, factures) {
    if (err) return next(err);
    res.json(factures);
  });
});

/* POST /factures */
router.post('/', function(req, res, next) {
  var factureBody = req.body;
  
  FactureModel.create(factureBody, function (err, facture) {
    if (err) return next(err);
    res.json(facture);
  });
});

/* GET /factures/id */
router.get('/:id', function(req, res, next) {
  FactureModel.findById(req.params.id, function (err, facture) {
    if (err) return next(err);
    res.json(facture);
  });
});

/* PUT /factures/:id */
router.put('/:id', function(req, res, next) {
  var factureBody = req.body;
  
  FactureModel.findByIdAndUpdate(req.params.id, factureBody, function (err, facture) {
    if (err) return next(err);
    res.json(facture);
  });
});

/* DELETE /factures/:id */
router.delete('/:id', function(req, res, next) {
  FactureModel.findByIdAndRemove(req.params.id, req.body, function (err, facture) {
    if (err) return next(err);
    res.json(facture);
  });
});

module.exports = router;
