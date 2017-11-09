var mongoose = require('mongoose');

/** 
 * Abstract Contact.
 */
var optionDiscriminator = { discriminatorKey: 'kind' };
var options = { 
  discriminatorKey: 'kind',
  timestamps: { createdAt: 'created_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
};

var ContactSchema = new mongoose.Schema({
  code : String,
  hidden : Boolean,
  nomSociete : String,
  codeNaf : String,
  siren : String,
  rappelDate : Date,
  tvaIntra : String,
  remarques : Buffer,
  rappelMotif : Buffer,
  activiteId : {type: mongoose.Schema.Types.ObjectId, ref: 'Activite'},
  categorieId : {type: mongoose.Schema.Types.ObjectId, ref: 'Categorie'},
  listDetailContacts : [{
      defaut : Boolean,
      ordre : Number,
      fonction : String,
      coordonnee : {
        nom : String,
        prenom : String,
        rue : String,
        complementaire : String,
        cp : String,
        ville : String,
        tels : [{
          ordre : Number,
          type : String,
          tel : String
        }],
        mails : [{
          ordre : Number,
          mail : String
        }],
        paysId : {type: mongoose.Schema.Types.ObjectId, ref: 'Pays'},
        civiliteId : {type: mongoose.Schema.Types.ObjectId, ref: 'Civilite'},
        localisationId : {type: mongoose.Schema.Types.ObjectId, ref: 'Localisation'}
      },
    }]
}, options);

var ContactModel = mongoose.model('Contact', ContactSchema);

/** 
 * Client.
 */
var ClientSchema = new mongoose.Schema({
    libelle : String,
    prospect : Boolean,
    montantPlafond : Number
}, optionDiscriminator);

/*
var getChiffreAffaire = function(pClientId, pCallback) {
  var Affaire = mongoose.model('Affaire');
  Affaire.aggregate([
    {$match: {
      clientId : mongoose.Types.ObjectId(pClientId),
      __t : { '$ne':'Devis' }
    }},
    {$group: {
      _id : "$clientId", 
      chiffreAffaire : { $sum: "$montantTTC2" }//"$montantTTC"
    }}], pCallback
    );
};*/
var getChiffreAffaire = function(pClientId, pCallback) {
  var AffaireModel = mongoose.model('Affaire');
  AffaireModel.find({clientId: pClientId}, function (err, affairesList) {
    if (err) throw err;
    
    //console.log("affList=" + JSON.stringify(affairesList));
    
    //Voir pour async http://justinklemm.com/node-js-async-tutorial/
    var async = require("async");
    var montantHT = 0;
    var Affaire = require('./Affaire.js').Affaire;
    
    // 1st para in async.each() is the array of items
    async.each(affairesList,
      // 2nd param is the function that each item is passed to
      function(affaire, callback){
        //console.log("aff=" + JSON.stringify(affaire));
        Affaire.getMontantHT(affaire, function (err2, result) {
          if (err2) throw err2;
          console.log("MontantHT from client=" + JSON.stringify(result));
          montantHT += result;
          
          // Async call is done, alert via callback
          callback();
        });
      },
      // 3rd param is the function to call when everything's done
      function(err){
        // All tasks are done now
        console.log("MontantHT total from client=" + montantHT);
        pCallback(err, montantHT);
      }
    );
    
    /*
    // Array to hold async tasks
    var asyncTasks = [];
    // Loop through some items
    affairesList.forEach(function(affaire){
      // We don't actually execute the async action here
      // We add a function containing it to an array of "tasks"
      asyncTasks.push(function(callback){
        // Call an async function, often a save() to DB
        Affaire.getMontantHT(affaire, function (err2, result) {
          if (err2) throw err2;
          console.log("MontantHT from client=" + JSON.stringify(result));
          montantHT += result;
          
          // Async call is done, alert via callback
          callback();
        });
      });
    });
    
    // At this point, nothing has been executed.
    // We just pushed all the async tasks into an array.
     
    // To move beyond the iteration example, let's add
    // another (different) async task for proof of concept
    asyncTasks.push(function(callback){
      // Set a timeout for 3 seconds
      setTimeout(function(){
        // It's been 3 seconds, alert via callback
        callback();
      }, 3000);
    });

     
    // Now we have an array of functions doing async tasks
    // Execute all async tasks in the asyncTasks array
    async.parallel(asyncTasks, function(){
      // All tasks are done now
      console.log("MontantHT total from client=" + montantHT);
      pCallback(err, montantHT);
    });
    */
  });
};

var ClientModel = ContactModel.discriminator('Client', ClientSchema);

/** 
 * Fournisseur.
 */
var FournisseurModel = ContactModel.discriminator('Fournisseur',
      new mongoose.Schema({
        
      }, optionDiscriminator));

/** 
 * Divers contact.
 */
var DiversContactModel = ContactModel.discriminator('DiversContact',
      new mongoose.Schema({
        
      }, optionDiscriminator));
      
/** 
 * Export des implémentations de contact.
 */
module.exports = {
  ContactModel, 
  Client : {ClientModel, getChiffreAffaire}, 
  FournisseurModel, 
  DiversContactModel
};
