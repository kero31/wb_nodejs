var mongoose = require('mongoose');

var CiviliteSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Civilite', CiviliteSchema);