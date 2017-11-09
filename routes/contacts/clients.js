var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Client = require('../../models/Contact.js').Client;
var ClientModel = Client.ClientModel;

/* GET /clients listing. */
router.get('/', function(req, res, next) {
  ClientModel.find(function (err, clients) {
    if (err) return next(err);
    res.json(clients);
  });
});

/* POST /clients */
router.post('/', function(req, res, next) {
  var clientBody = req.body;
  
  ClientModel.create(clientBody, function (err, client) {
    if (err) return next(err);
    console.log(client.libelle + " : " + client.chiffreAffaire);
    res.json(client);
  });
});

/* GET /clients/id */
router.get('/:id', function(req, res, next) {
  ClientModel.findById(req.params.id, function (err, client) {
    if (err) return next(err);
    res.json(client);
  });
});

/* PUT /clients/:id */
router.put('/:id', function(req, res, next) {
  var clientBody = req.body;
  
  ClientModel.findByIdAndUpdate(req.params.id, clientBody, function (err, client) {
    if (err) return next(err);
    res.json(client);
  });
});

/* DELETE /clients/:id */
router.delete('/:id', function(req, res, next) {
  ClientModel.findByIdAndRemove(req.params.id, req.body, function (err, client) {
    if (err) return next(err);
    res.json(client);
  });
});

/* GET /clients/:function/id */
router.get('/:function/:id', function(req, res, next) {
  var clientId = req.params.id;
  if(req.params.function == 'getChiffreAffaire') {
    Client.getChiffreAffaire(clientId, function (err, result) {
      if (err) return next(err);
      
      console.log("result=" + JSON.stringify(result) + " / result[0]=" + result[0]);

      //res.json(result[0]); //en utlisant l'aggregate
      var jsonrRes = {
        chiffreAffaire: result
      }
      res.json(jsonrRes);
    });
  }
});

module.exports = router;
