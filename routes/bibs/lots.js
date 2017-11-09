var express = require('express');
var router = express.Router();

var LotModel = require('../../models/Bib.js').LotModel;

/* GET /lots listing. */
router.get('/', function(req, res, next) {
  LotModel.find(function (err, lots) {
    if (err) return next(err);
    res.json(lots);
  });
});

/* POST /lots */
router.post('/', function(req, res, next) {
  var lotBody = req.body;
  
  LotModel.create(lotBody, function (err, lot) {
    if (err) return next(err);
    res.json(lot);
  });
});

/* GET /lots/id */
router.get('/:id', function(req, res, next) {
  LotModel.findById(req.params.id, function (err, lot) {
    if (err) return next(err);
    res.json(lot);
  });
});

/* PUT /lots/:id */
router.put('/:id', function(req, res, next) {
  var lotBody = req.body;
  
  LotModel.findByIdAndUpdate(req.params.id, lotBody, function (err, lot) {
    if (err) return next(err);
    res.json(lot);
  });
});

/* DELETE /lots/:id */
router.delete('/:id', function(req, res, next) {
  LotModel.findByIdAndRemove(req.params.id, req.body, function (err, lot) {
    if (err) return next(err);
    res.json(lot);
  });
});

module.exports = router;
