var express = require('express');
var router = express.Router();

var Affaire = require('../../models/Affaire.js').Affaire;
var AffaireModel =Affaire.AffaireModel;

/* GET /affaires listing. */
router.get('/', function(req, res, next) {
  AffaireModel.find(function (err, affaires) {
    if (err) return next(err);
    res.json(affaires);
  });
});

/* GET /affaires/id */
router.get('/:id', function(req, res, next) {
  AffaireModel.findById(req.params.id, function (err, affaire) {
    if (err) return next(err);
    res.json(affaire);
  });
});

/* DELETE /affaires/:id */
router.delete('/:id', function(req, res, next) {
  AffaireModel.findByIdAndRemove(req.params.id, req.body, function (err, affaire) {
    if (err) return next(err);
    res.json(affaire);
  });
});

module.exports = router;
