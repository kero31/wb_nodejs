var express = require('express');
var router = express.Router();

var Localisation = require('../models/Localisation.js');

/* GET /localisations listing. */
router.get('/', function(req, res, next) {
  Localisation.find(function (err, localisations) {
    if (err) return next(err);
    res.json(localisations);
  });
});

/* POST /localisations */
router.post('/', function(req, res, next) {
  var localisationBody = req.body;
  
  Localisation.create(localisationBody, function (err, localisation) {
    if (err) return next(err);
    res.json(localisation);
  });
});

/* GET /localisations/id */
router.get('/:id', function(req, res, next) {
  Localisation.findById(req.params.id, function (err, localisation) {
    if (err) return next(err);
    res.json(localisation);
  });
});

/* PUT /localisations/:id */
router.put('/:id', function(req, res, next) {
  var localisationBody = req.body;
  
  Localisation.findByIdAndUpdate(req.params.id, localisationBody, function (err, localisation) {
    if (err) return next(err);
    res.json(localisation);
  });
});

/* DELETE /localisations/:id */
router.delete('/:id', function(req, res, next) {
  Localisation.findByIdAndRemove(req.params.id, req.body, function (err, localisation) {
    if (err) return next(err);
    res.json(localisation);
  });
});

module.exports = router;
