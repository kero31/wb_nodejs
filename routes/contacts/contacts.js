var express = require('express');
var router = express.Router();

var ContactModel = require('../../models/Contact.js').ContactModel;

/* GET /contacts listing. */
router.get('/', function(req, res, next) {
  ContactModel.find(function (err, contacts) {
    if (err) return next(err);
    res.json(contacts);
  });
});

/* GET /contacts/id */
router.get('/:id', function(req, res, next) {
  ContactModel.findById(req.params.id, function (err, contact) {
    if (err) return next(err);
    res.json(contact);
  });
});


/* DELETE /contacts/:id */
router.delete('/:id', function(req, res, next) {
  ContactModel.findByIdAndRemove(req.params.id, req.body, function (err, contact) {
    if (err) return next(err);
    res.json(contact);
  });
});

module.exports = router;
