var express = require('express');
var router = express.Router();

var AcompteModel = require('../../models/Affaire.js').AcompteModel;

/* GET /acomptes listing. */
router.get('/', function(req, res, next) {
  AcompteModel.find(function (err, acomptes) {
    if (err) return next(err);
    res.json(acomptes);
  });
});

/* POST /acomptes */
router.post('/', function(req, res, next) {
  var acompteBody = req.body;
  
  AcompteModel.create(acompteBody, function (err, acompte) {
    if (err) return next(err);
    res.json(acompte);
  });
});

/* GET /acomptes/id */
router.get('/:id', function(req, res, next) {
  AcompteModel.findById(req.params.id, function (err, acompte) {
    if (err) return next(err);
    res.json(acompte);
  });
});

/* PUT /acomptes/:id */
router.put('/:id', function(req, res, next) {
  var acompteBody = req.body;
  
  AcompteModel.findByIdAndUpdate(req.params.id, acompteBody, function (err, acompte) {
    if (err) return next(err);
    res.json(acompte);
  });
});

/* DELETE /acomptes/:id */
router.delete('/:id', function(req, res, next) {
  AcompteModel.findByIdAndRemove(req.params.id, req.body, function (err, acompte) {
    if (err) return next(err);
    res.json(acompte);
  });
});

module.exports = router;
