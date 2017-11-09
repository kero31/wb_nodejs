var mongoose = require('mongoose');
var round = require('mongo-round');

/** 
 * Abstract Bib.
 */
var optionDiscriminator = { discriminatorKey: 'kind' };
var options = { 
  discriminatorKey: 'kind',
  timestamps: { createdAt: 'created_at' } 
};

var BibSchema = new mongoose.Schema({
  code : String,
  motCle : String,
  numSerie : String,
  unite : String,
  notes : Buffer,
  descriptionTechnique : Buffer,
  descriptionCommerciale : Buffer,
  image : Buffer,
  descriptif : Buffer,
  tvaId : {type: mongoose.Schema.Types.ObjectId, ref: 'Tva'},
  familleId : {type: mongoose.Schema.Types.ObjectId, ref: 'Famille'},
  quantite : Number,
  prixAchatUnitaire : Number,
}, options);

var BibModel = mongoose.model('Bib', BibSchema);

var getPrixAchatUnitaire = function(pBibId, pCallback) {
  BibModel.findById(pBibId, function (err, bib) {
    if (err) throw err;
    
    var value = 0;
    if(bib.prixAchatUnitaire) {
        value = bib.prixAchatUnitaire;
    } else {
        //TODO calculer prix achat unitaire pour chaque type
        value = 10;
    }
    console.log("PrixAchatUnitaire from bib=" + value);
    pCallback(err, value);
  });
};

/** 
 * Materiaux.
 */
var MateriauxSchema = new mongoose.Schema({
        prixTarif : Number,
        remise : Number,
        fournisseurDefautId : {type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur'}
      }, optionDiscriminator);
var MateriauxModel = BibModel.discriminator('Materiaux', MateriauxSchema);

MateriauxSchema.virtual('fraisGeneraux').get(function () {
  return round(this.prixTarif - this.remise, 2);
});

/** 
 * Tache.
 */
var TacheModel = BibModel.discriminator('Tache',
      new mongoose.Schema({
        prixVenteFixe : Number,
        mainOuvre : {
            fraisGeneraux : Number,
            benefice : Number,
        },
        materiaux : {
            fraisGeneraux : Number,
            benefice : Number,
        },
        soustraitant : {
            fraisGeneraux : Number,
            benefice : Number,
        },
        engin : {
            fraisGeneraux : Number,
            benefice : Number,
        },
        bibs : [{
            bibId : {type: mongoose.Schema.Types.ObjectId, ref: 'Bib'}
        }]
      }, optionDiscriminator));

/** 
 * Lot.
 */
var LotModel = BibModel.discriminator('Lot',
      new mongoose.Schema({
        bibs : [{
            bibId : {type: mongoose.Schema.Types.ObjectId, ref: 'Bib'}
        }]
      }, optionDiscriminator));
      
/** 
 * Engin.
 */
var EnginModel = BibModel.discriminator('Engin',
      new mongoose.Schema({
        immatriculation : String,
        immatriculationDate : Date
      }, optionDiscriminator));

/** 
 * SousTraitant.
 */
var SousTraitantModel = BibModel.discriminator('SousTraitant',
      new mongoose.Schema({

      }, optionDiscriminator));
      

/** 
 * MainOeuvre.
 */
var MainOeuvreModel = BibModel.discriminator('MainOeuvre',
      new mongoose.Schema({

      }, optionDiscriminator));


/** 
 * Export des implémentations de Bib.
 */
module.exports = {
    Bib : {BibModel, getPrixAchatUnitaire}, 
    MateriauxModel, 
    TacheModel, 
    LotModel, 
    EnginModel, 
    SousTraitantModel, 
    MainOeuvreModel
};