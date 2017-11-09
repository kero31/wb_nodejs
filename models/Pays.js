var mongoose = require('mongoose');

var PaysSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Pays', PaysSchema);