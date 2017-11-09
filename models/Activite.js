var mongoose = require('mongoose');

var ActiviteSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Activite', ActiviteSchema);