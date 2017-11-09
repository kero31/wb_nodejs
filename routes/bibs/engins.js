var express = require('express');
var router = express.Router();

var EnginModel = require('../../models/Bib.js').EnginModel;

/* GET /engins listing. */
router.get('/', function(req, res, next) {
  EnginModel.find(function (err, engins) {
    if (err) return next(err);
    res.json(engins);
  });
});

/* POST /engins */
router.post('/', function(req, res, next) {
  var enginBody = req.body;
  
  EnginModel.create(enginBody, function (err, engin) {
    if (err) return next(err);
    res.json(engin);
  });
});

/* GET /engins/id */
router.get('/:id', function(req, res, next) {
  EnginModel.findById(req.params.id, function (err, engin) {
    if (err) return next(err);
    res.json(engin);
  });
});

/* PUT /engins/:id */
router.put('/:id', function(req, res, next) {
  var enginBody = req.body;
  
  EnginModel.findByIdAndUpdate(req.params.id, enginBody, function (err, engin) {
    if (err) return next(err);
    res.json(engin);
  });
});

/* DELETE /engins/:id */
router.delete('/:id', function(req, res, next) {
  EnginModel.findByIdAndRemove(req.params.id, req.body, function (err, engin) {
    if (err) return next(err);
    res.json(engin);
  });
});

module.exports = router;
