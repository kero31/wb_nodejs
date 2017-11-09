var mongoose = require('mongoose');

var CategorieSchema = new mongoose.Schema({
    libelle : String
});

module.exports = mongoose.model('Categorie', CategorieSchema);