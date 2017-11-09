var express = require('express');
var router = express.Router();

var Pays = require('../models/Pays.js');

/* GET /pays listing. */
router.get('/', function(req, res, next) {
  Pays.find(function (err, pays) {
    if (err) return next(err);
    res.json(pays);
  });
});

/* POST /pays*/
router.post('/', function(req, res, next) {
  var paysBody = req.body;
  
  Pays.create(paysBody, function (err, pays) {
    if (err) return next(err);
    res.json(pays);
  });
});

/* GET /pays/id */
router.get('/:id', function(req, res, next) {
  Pays.findById(req.params.id, function (err, pays) {
    if (err) return next(err);
    res.json(pays);
  });
});

/* PUT /pays/:id */
router.put('/:id', function(req, res, next) {
  var paysBody = req.body;
  
  Pays.findByIdAndUpdate(req.params.id, paysBody, function (err, pays) {
    if (err) return next(err);
    res.json(pays);
  });
});

/* DELETE /pays/:id */
router.delete('/:id', function(req, res, next) {
  Pays.findByIdAndRemove(req.params.id, req.body, function (err, pays) {
    if (err) return next(err);
    res.json(pays);
  });
});

module.exports = router;
