var express = require('express');
var router = express.Router();

var AvoirModel = require('../../models/Affaire.js').AvoirModel;

/* GET /avoirs listing. */
router.get('/', function(req, res, next) {
  AvoirModel.find(function (err, avoirs) {
    if (err) return next(err);
    res.json(avoirs);
  });
});

/* POST /avoirs */
router.post('/', function(req, res, next) {
  var avoirBody = req.body;
  
  AvoirModel.create(avoirBody, function (err, avoir) {
    if (err) return next(err);
    res.json(avoir);
  });
});

/* GET /avoirs/id */
router.get('/:id', function(req, res, next) {
  AvoirModel.findById(req.params.id, function (err, avoir) {
    if (err) return next(err);
    res.json(avoir);
  });
});

/* PUT /avoirs/:id */
router.put('/:id', function(req, res, next) {
  var avoirBody = req.body;
  
  AvoirModel.findByIdAndUpdate(req.params.id, avoirBody, function (err, avoir) {
    if (err) return next(err);
    res.json(avoir);
  });
});

/* DELETE /avoirs/:id */
router.delete('/:id', function(req, res, next) {
  AvoirModel.findByIdAndRemove(req.params.id, req.body, function (err, avoir) {
    if (err) return next(err);
    res.json(avoir);
  });
});

module.exports = router;
