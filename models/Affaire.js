var mongoose = require('mongoose');

/** 
 * Abstract Affaire.
 */
var optionDiscriminator = { discriminatorKey: 'kind' };
var options = { 
  discriminatorKey: 'kind',
  timestamps: { createdAt: 'created_at' }/*,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }*/
};


var AffaireSchema = new mongoose.Schema({
  code : String,
  reference : String,
  termine: Boolean,
  valide : Boolean,
  dureeValidite : Date,
  dateDebutTravaux : Date,
  dateFinTravaux : Date,
  dateCloture : Date,
  etatId : {type: mongoose.Schema.Types.ObjectId, ref: 'Etat'},
  chantierId : {type: mongoose.Schema.Types.ObjectId, ref: 'Chantier'},
  conclusion : Buffer,
  introduction : Buffer,
  metre : Buffer,
  notes : Buffer,
  descriptif : Buffer,
  listEcheanciers : [{
      montant : Number,
      reglements : [{
        code : String,
        descriptif : String,
        datePaiement : Date,
        banque : String,
        numCheque : String,
        modePaiementId : {type: mongoose.Schema.Types.ObjectId, ref: 'ModePaiement'}
      }]
    }],
  listEtudes : [{
      active : Boolean,
      listElementsBib : [{
        metre : Buffer,
        bibId : {type: mongoose.Schema.Types.ObjectId, ref: 'Bib'}
      }],
      tvaDefaultId : {type: mongoose.Schema.Types.ObjectId, ref: 'Tva'}
    }],
  clientId : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'}
}, options);

var AffaireModel = mongoose.model('Affaire', AffaireSchema);
/*
AffaireSchema.virtual('montantHT').get(function () {
  //TODO changer le calcul
  return 10;
});*/
var getMontantHT = function(pAff, pCallback) {
  var etudeActive = null;
  for(var i=0; i< pAff.listEtudes.length; i++) {
    var etude = pAff.listEtudes[i];
    console.log("etude=" + JSON.stringify(etude));
    if(etude.active) {
      etudeActive = etude;
    }
  }
  
  if(etudeActive != null) {
    var async = require("async");
    var montantHT = 0;
    var Bib = require('./Bib.js').Bib;
    
    // 1st para in async.each() is the array of items
    async.each(etudeActive.listElementsBib,
      // 2nd param is the function that each item is passed to
      function(bibId, callback){
        console.log("bibId=" + JSON.stringify(bibId));
        Bib.getPrixAchatUnitaire(bibId, function (err, result) {
          if (err) throw err;
          console.log("PrixAchatUnitaire from aff=" + JSON.stringify(result));
          montantHT += result;
          
          // Async call is done, alert via callback
          callback();
        });
      },
      // 3rd param is the function to call when everything's done
      function(err){
        // All tasks are done now
        console.log("MontantHT from aff=" + montantHT);
        pCallback(err, montantHT);
      }
    );
  } else {
    // Test de résultat quand la méthode est lente pour la 2ème affaire du client
    var timeout = 0;
    if(pAff.id == "5823130e6e2aca0ea3f99cb9") {
      timeout = 5000;
    }
    //console.log("timeout=" + timeout + " / pAff.id=" + pAff.id);
    setTimeout(function(){ 
        //console.log("sleep terminé");
        //console.log("MontantHT from aff null avec hasCallbackToBeCall");
        pCallback(null, 25);
    }, timeout);
  }
  
  /*
  var montantHT = 0;
  if(etudeActive != null && etudeActive.listElementsBib.length > 0) {
    var Bib = require('./Bib.js').Bib;
    var nbResulted = 0;
    for(var iBibId in etudeActive.listElementsBib) {
      var bibId = etudeActive.listElementsBib[iBibId];
      console.log("bibId=" + JSON.stringify(bibId));
      Bib.getPrixAchatUnitaire(bibId, function (err, result) {
        if (err) throw err;
        console.log("PrixAchatUnitaire from aff=" + JSON.stringify(result));
        montantHT += result;
        
        nbResulted++;
        if(etudeActive.listElementsBib.length == nbResulted) {
          console.log("MontantHT from aff=" + montantHT);
          pCallback(err, montantHT);
        }
      });
    }
  } else {
    // Test de résultat quand la méthode est lente pour la 2ème affaire du client
    var timeout = 0;
    if(pAff.id == "5823130e6e2aca0ea3f99cb9") {
      timeout = 5000;
    }
    //console.log("timeout=" + timeout + " / pAff.id=" + pAff.id);
    setTimeout(function(){ 
        //console.log("sleep terminé");
        //console.log("MontantHT from aff null avec hasCallbackToBeCall");
        pCallback(null, 25);
    }, timeout);
  }*/
};

/** 
 * Devis.
 */
var DevisModel = AffaireModel.discriminator('Devis',
      new mongoose.Schema({
        devisId : {type: mongoose.Schema.Types.ObjectId, ref: 'Devis'}
      }, optionDiscriminator));

/** 
 * Facture.
 */
var FactureModel = AffaireModel.discriminator('Facture',
      new mongoose.Schema({
        devisId : {type: mongoose.Schema.Types.ObjectId, ref: 'Devis'}
      }, optionDiscriminator));
      
/** 
 * Acompte.
 */
var AcompteModel = AffaireModel.discriminator('Acompte',
      new mongoose.Schema({
        devisId : {type: mongoose.Schema.Types.ObjectId, ref: 'Devis'}
      }, optionDiscriminator));

/** 
 * Situation.
 */
var SituationModel = AffaireModel.discriminator('Situation',
      new mongoose.Schema({
        devisId : {type: mongoose.Schema.Types.ObjectId, ref: 'Devis'}
      }, optionDiscriminator));
    
/** 
 * Avoir.
 */
var AvoirModel = AffaireModel.discriminator('Avoir',
      new mongoose.Schema({
        factureId : {type: mongoose.Schema.Types.ObjectId, ref: 'Facture'}
      }, optionDiscriminator));
      
      
/** 
 * Export des implémentations de Affaire.
 */
module.exports = {
  Affaire : {AffaireModel, getMontantHT},
  DevisModel, 
  FactureModel, 
  AcompteModel, 
  SituationModel, 
  AvoirModel
};
