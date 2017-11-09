var express = require('express');
var router = express.Router();

var FournisseurModel = require('../../models/Contact.js').FournisseurModel;

/* GET /fournisseurs listing. */
router.get('/', function(req, res, next) {
  FournisseurModel.find(function (err, fournisseurs) {
    if (err) return next(err);
    res.json(fournisseurs);
  });
});

/* POST /fournisseurs */
router.post('/', function(req, res, next) {
  var fournisseurBody = req.body;
  
  FournisseurModel.create(fournisseurBody, function (err, fournisseur) {
    if (err) return next(err);
    res.json(fournisseur);
  });
});

/* GET /fournisseurs/id */
router.get('/:id', function(req, res, next) {
  FournisseurModel.findById(req.params.id, function (err, fournisseur) {
    if (err) return next(err);
    res.json(fournisseur);
  });
});

/* PUT /fournisseurs/:id */
router.put('/:id', function(req, res, next) {
  var fournisseurBody = req.body;
  
  FournisseurModel.findByIdAndUpdate(req.params.id, fournisseurBody, function (err, fournisseur) {
    if (err) return next(err);
    res.json(fournisseur);
  });
});

/* DELETE /fournisseurs/:id */
router.delete('/:id', function(req, res, next) {
  FournisseurModel.findByIdAndRemove(req.params.id, req.body, function (err, fournisseur) {
    if (err) return next(err);
    res.json(fournisseur);
  });
});

module.exports = router;
