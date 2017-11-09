var express = require('express');
var router = express.Router();

var BibModel = require('../../models/Bib.js').BibModel;

/* GET /bibs listing. */
router.get('/', function(req, res, next) {
  BibModel.find(function (err, bibs) {
    if (err) return next(err);
    res.json(bibs);
  });
});

/* GET /bibs/id */
router.get('/:id', function(req, res, next) {
  BibModel.findById(req.params.id, function (err, bib) {
    if (err) return next(err);
    res.json(bib);
  });
});

/* DELETE /bibs/:id */
router.delete('/:id', function(req, res, next) {
  BibModel.findByIdAndRemove(req.params.id, req.body, function (err, bib) {
    if (err) return next(err);
    res.json(bib);
  });
});

module.exports = router;
