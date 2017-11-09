var express = require('express');
var router = express.Router();

var MateriauxModel = require('../../models/Bib.js').MateriauxModel;

/* GET /materiaux listing. */
router.get('/', function(req, res, next) {
  MateriauxModel.find(function (err, materiaux) {
    if (err) return next(err);
    res.json(materiaux);
  });
});

/* POST /materiaux */
router.post('/', function(req, res, next) {
  var materiauxBody = req.body;
  
  MateriauxModel.create(materiauxBody, function (err, materiaux) {
    if (err) return next(err);
    res.json(materiaux);
  });
});

/* GET /materiaux/id */
router.get('/:id', function(req, res, next) {
  MateriauxModel.findById(req.params.id, function (err, materiaux) {
    if (err) return next(err);
    res.json(materiaux);
  });
});

/* PUT /materiaux/:id */
router.put('/:id', function(req, res, next) {
  var materiauxBody = req.body;
  
  MateriauxModel.findByIdAndUpdate(req.params.id, materiauxBody, function (err, materiaux) {
    if (err) return next(err);
    res.json(materiaux);
  });
});

/* DELETE /materiaux/:id */
router.delete('/:id', function(req, res, next) {
  MateriauxModel.findByIdAndRemove(req.params.id, req.body, function (err, materiaux) {
    if (err) return next(err);
    res.json(materiaux);
  });
});

module.exports = router;
