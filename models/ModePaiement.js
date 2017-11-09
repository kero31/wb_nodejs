var mongoose = require('mongoose');

var ModePaiementSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('ModePaiement', ModePaiementSchema);