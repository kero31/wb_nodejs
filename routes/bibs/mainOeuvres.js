var express = require('express');
var router = express.Router();

var MainOeuvreModel = require('../../models/Bib.js').MainOeuvreModel;

/* GET /mainOeuvres listing. */
router.get('/', function(req, res, next) {
  MainOeuvreModel.find(function (err, mainOeuvres) {
    if (err) return next(err);
    res.json(mainOeuvres);
  });
});

/* POST /mainOeuvres */
router.post('/', function(req, res, next) {
  var mainOeuvreBody = req.body;
  
  MainOeuvreModel.create(mainOeuvreBody, function (err, mainOeuvre) {
    if (err) return next(err);
    res.json(mainOeuvre);
  });
});

/* GET /mainOeuvres/id */
router.get('/:id', function(req, res, next) {
  MainOeuvreModel.findById(req.params.id, function (err, mainOeuvre) {
    if (err) return next(err);
    res.json(mainOeuvre);
  });
});

/* PUT /mainOeuvres/:id */
router.put('/:id', function(req, res, next) {
  var mainOeuvreBody = req.body;
  
  MainOeuvreModel.findByIdAndUpdate(req.params.id, mainOeuvreBody, function (err, mainOeuvre) {
    if (err) return next(err);
    res.json(mainOeuvre);
  });
});

/* DELETE /mainOeuvres/:id */
router.delete('/:id', function(req, res, next) {
  MainOeuvreModel.findByIdAndRemove(req.params.id, req.body, function (err, mainOeuvre) {
    if (err) return next(err);
    res.json(mainOeuvre);
  });
});

module.exports = router;
