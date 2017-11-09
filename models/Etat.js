var mongoose = require('mongoose');

var EtatSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Etat', EtatSchema);