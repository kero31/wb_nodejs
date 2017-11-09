var express = require('express');
var router = express.Router();

var Chantier = require('../models/Chantier.js');

/* GET /chantiers listing. */
router.get('/', function(req, res, next) {
  Chantier.find(function (err, chantiers) {
    if (err) return next(err);
    res.json(chantiers);
  });
});

/* POST /chantiers */
router.post('/', function(req, res, next) {
  var chantierBody = req.body;
  
  Chantier.create(chantierBody, function (err, chantier) {
    if (err) return next(err);
    res.json(chantier);
  });
});

/* GET /chantiers/id */
router.get('/:id', function(req, res, next) {
  Chantier.findById(req.params.id, function (err, chantier) {
    if (err) return next(err);
    res.json(chantier);
  });
});

/* PUT /chantiers/:id */
router.put('/:id', function(req, res, next) {
  var chantierBody = req.body;
  
  Chantier.findByIdAndUpdate(req.params.id, chantierBody, function (err, chantier) {
    if (err) return next(err);
    res.json(chantier);
  });
});

/* DELETE /chantiers/:id */
router.delete('/:id', function(req, res, next) {
  Chantier.findByIdAndRemove(req.params.id, req.body, function (err, chantier) {
    if (err) return next(err);
    res.json(chantier);
  });
});

module.exports = router;
