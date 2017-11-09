var express = require('express');
var router = express.Router();

var TacheModel = require('../../models/Bib.js').TacheModel;

/* GET /taches listing. */
router.get('/', function(req, res, next) {
  TacheModel.find(function (err, taches) {
    if (err) return next(err);
    res.json(taches);
  });
});

/* POST /taches */
router.post('/', function(req, res, next) {
  var tacheBody = req.body;
  
  TacheModel.create(tacheBody, function (err, tache) {
    if (err) return next(err);
    res.json(tache);
  });
});

/* GET /taches/id */
router.get('/:id', function(req, res, next) {
  TacheModel.findById(req.params.id, function (err, tache) {
    if (err) return next(err);
    res.json(tache);
  });
});

/* PUT /taches/:id */
router.put('/:id', function(req, res, next) {
  var tacheBody = req.body;
  
  TacheModel.findByIdAndUpdate(req.params.id, tacheBody, function (err, tache) {
    if (err) return next(err);
    res.json(tache);
  });
});

/* DELETE /taches/:id */
router.delete('/:id', function(req, res, next) {
  TacheModel.findByIdAndRemove(req.params.id, req.body, function (err, tache) {
    if (err) return next(err);
    res.json(tache);
  });
});

module.exports = router;
