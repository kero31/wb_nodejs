var express = require('express');
var router = express.Router();

var Categorie = require('../models/Categorie.js');

/* GET /categories listing. */
router.get('/', function(req, res, next) {
  Categorie.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});

/* POST /categories */
router.post('/', function(req, res, next) {
  var categorieBody = req.body;
  
  Categorie.create(categorieBody, function (err, categorie) {
    if (err) return next(err);
    res.json(categorie);
  });
});

/* GET /categories/id */
router.get('/:id', function(req, res, next) {
  Categorie.findById(req.params.id, function (err, categorie) {
    if (err) return next(err);
    res.json(categorie);
  });
});

/* PUT /categories/:id */
router.put('/:id', function(req, res, next) {
  var categorieBody = req.body;
  
  Categorie.findByIdAndUpdate(req.params.id, categorieBody, function (err, categorie) {
    if (err) return next(err);
    res.json(categorie);
  });
});

/* DELETE /categories/:id */
router.delete('/:id', function(req, res, next) {
  Categorie.findByIdAndRemove(req.params.id, req.body, function (err, categorie) {
    if (err) return next(err);
    res.json(categorie);
  });
});

module.exports = router;
