var mongoose = require('mongoose');

var LocalisationSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Localisation', LocalisationSchema);