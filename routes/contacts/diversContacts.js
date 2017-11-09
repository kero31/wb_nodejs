var express = require('express');
var router = express.Router();

var DiversContactModel = require('../../models/Contact.js').DiversContactModel;

/* GET /diversContacts listing. */
router.get('/', function(req, res, next) {
  DiversContactModel.find(function (err, diversContacts) {
    if (err) return next(err);
    res.json(diversContacts);
  });
});

/* POST /diversContacts */
router.post('/', function(req, res, next) {
  var diversContactBody = req.body;
  
  DiversContactModel.create(diversContactBody, function (err, diversContact) {
    if (err) return next(err);
    res.json(diversContact);
  });
});

/* GET /diversContacts/id */
router.get('/:id', function(req, res, next) {
  DiversContactModel.findById(req.params.id, function (err, diversContact) {
    if (err) return next(err);
    res.json(diversContact);
  });
});

/* PUT /diversContacts/:id */
router.put('/:id', function(req, res, next) {
  var diversContactBody = req.body;
  
  DiversContactModel.findByIdAndUpdate(req.params.id, diversContactBody, function (err, diversContact) {
    if (err) return next(err);
    res.json(diversContact);
  });
});

/* DELETE /diversContacts/:id */
router.delete('/:id', function(req, res, next) {
  DiversContactModel.findByIdAndRemove(req.params.id, req.body, function (err, diversContact) {
    if (err) return next(err);
    res.json(diversContact);
  });
});

module.exports = router;
