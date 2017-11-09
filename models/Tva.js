var mongoose = require('mongoose');

var TvaSchema = new mongoose.Schema({
    libelle : String,
    taux : Number,
    hidden : Boolean
});

module.exports = mongoose.model('Tva', TvaSchema);