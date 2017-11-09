var express = require('express');
var router = express.Router();

var Etat = require('../models/Etat.js');

/* GET /etats listing. */
router.get('/', function(req, res, next) {
  Etat.find(function (err, etats) {
    if (err) return next(err);
    res.json(etats);
  });
});

/* POST /etats */
router.post('/', function(req, res, next) {
  var etatBody = req.body;
  
  Etat.create(etatBody, function (err, etat) {
    if (err) return next(err);
    res.json(etat);
  });
});

/* GET /etats/id */
router.get('/:id', function(req, res, next) {
  Etat.findById(req.params.id, function (err, etat) {
    if (err) return next(err);
    res.json(etat);
  });
});

/* PUT /etats/:id */
router.put('/:id', function(req, res, next) {
  var etatBody = req.body;
  
  Etat.findByIdAndUpdate(req.params.id, etatBody, function (err, etat) {
    if (err) return next(err);
    res.json(etat);
  });
});

/* DELETE /etats/:id */
router.delete('/:id', function(req, res, next) {
  Etat.findByIdAndRemove(req.params.id, req.body, function (err, etat) {
    if (err) return next(err);
    res.json(etat);
  });
});

module.exports = router;
