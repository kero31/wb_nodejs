var express = require('express');
var router = express.Router();

var SituationModel = require('../../models/Affaire.js').SituationModel;

/* GET /situations listing. */
router.get('/', function(req, res, next) {
  SituationModel.find(function (err, situations) {
    if (err) return next(err);
    res.json(situations);
  });
});

/* POST /situations */
router.post('/', function(req, res, next) {
  var situationBody = req.body;
  
  SituationModel.create(situationBody, function (err, situation) {
    if (err) return next(err);
    res.json(situation);
  });
});

/* GET /situations/id */
router.get('/:id', function(req, res, next) {
  SituationModel.findById(req.params.id, function (err, situation) {
    if (err) return next(err);
    res.json(situation);
  });
});

/* PUT /situations/:id */
router.put('/:id', function(req, res, next) {
  var situationBody = req.body;
  
  SituationModel.findByIdAndUpdate(req.params.id, situationBody, function (err, situation) {
    if (err) return next(err);
    res.json(situation);
  });
});

/* DELETE /situations/:id */
router.delete('/:id', function(req, res, next) {
  SituationModel.findByIdAndRemove(req.params.id, req.body, function (err, situation) {
    if (err) return next(err);
    res.json(situation);
  });
});

module.exports = router;
