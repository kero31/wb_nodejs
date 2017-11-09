var express = require('express');
var router = express.Router();

var SousTraitantModel = require('../../models/Bib.js').SousTraitantModel;

/* GET /sousTraitants listing. */
router.get('/', function(req, res, next) {
  SousTraitantModel.find(function (err, sousTraitants) {
    if (err) return next(err);
    res.json(sousTraitants);
  });
});

/* POST /sousTraitants */
router.post('/', function(req, res, next) {
  var sousTraitantBody = req.body;
  
  SousTraitantModel.create(sousTraitantBody, function (err, sousTraitant) {
    if (err) return next(err);
    res.json(sousTraitant);
  });
});

/* GET /sousTraitants/id */
router.get('/:id', function(req, res, next) {
  SousTraitantModel.findById(req.params.id, function (err, sousTraitant) {
    if (err) return next(err);
    res.json(sousTraitant);
  });
});

/* PUT /sousTraitants/:id */
router.put('/:id', function(req, res, next) {
  var sousTraitantBody = req.body;
  
  SousTraitantModel.findByIdAndUpdate(req.params.id, sousTraitantBody, function (err, sousTraitant) {
    if (err) return next(err);
    res.json(sousTraitant);
  });
});

/* DELETE /sousTraitants/:id */
router.delete('/:id', function(req, res, next) {
  SousTraitantModel.findByIdAndRemove(req.params.id, req.body, function (err, sousTraitant) {
    if (err) return next(err);
    res.json(sousTraitant);
  });
});

module.exports = router;
