var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// load mongoose package
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/todo-api')
  .then(() =>  console.log('Connection DB succesfull'))
  .catch((err) => console.error('Erreur DB : ' + err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create routes
{
  var routes = require('./routes/index');
  app.use('/', routes);
  
  var contacts = require('./routes/contacts/contacts');
  app.use('/contacts', contacts);
  var clients = require('./routes/contacts/clients');
  app.use('/clients', clients);
  var diversContacts = require('./routes/contacts/diversContacts');
  app.use('/diversContacts', diversContacts);
  var fournisseurs = require('./routes/contacts/fournisseurs');
  app.use('/fournisseurs', fournisseurs);
  
  var affaires = require('./routes/affaires/affaires');
  app.use('/affaires', affaires);
  var acomptes = require('./routes/affaires/acomptes');
  app.use('/acomptes', acomptes);
  var avoirs = require('./routes/affaires/avoirs');
  app.use('/avoirs', avoirs);
  var devis = require('./routes/affaires/devis');
  app.use('/devis', devis);
  var factures = require('./routes/affaires/factures');
  app.use('/factures', factures);
  var situations = require('./routes/affaires/situations');
  app.use('/situations', situations);
  
  var bibs = require('./routes/bibs/bibs');
  app.use('/bibs', bibs);
  var engins = require('./routes/bibs/engins');
  app.use('/engins', engins);
  var lots = require('./routes/bibs/lots');
  app.use('/lots', lots);
  var mainOeuvres = require('./routes/bibs/mainOeuvres');
  app.use('/mainOeuvres', mainOeuvres);
  var materiaux = require('./routes/bibs/materiaux');
  app.use('/materiaux', materiaux);
  var sousTraitants = require('./routes/bibs/sousTraitants');
  app.use('/sousTraitants', sousTraitants);
  var taches = require('./routes/bibs/taches');
  app.use('/taches', taches);
  
  var activites = require('./routes/activites');
  app.use('/activites', activites);
  var categories = require('./routes/categories');
  app.use('/categories', categories);
  var chantiers = require('./routes/chantiers');
  app.use('/chantiers', chantiers);
  var civilites = require('./routes/civilites');
  app.use('/civilites', civilites);
  var etats = require('./routes/etats');
  app.use('/etats', etats);
  var familles = require('./routes/familles');
  app.use('/familles', familles);
  var localisations = require('./routes/localisations');
  app.use('/localisations', localisations);
  var modePaiements = require('./routes/modePaiements');
  app.use('/modePaiements', modePaiements);
  var pays = require('./routes/pays');
  app.use('/pays', pays);
  var tvas = require('./routes/tvas');
  app.use('/tvas', tvas);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
