var mongoose = require('mongoose');

var FamilleSchema = new mongoose.Schema({
    type : Number,
    descriptif : String,
    listSousFamilleId : [{type: mongoose.Schema.Types.ObjectId, ref: 'Famille'}]
});

module.exports = mongoose.model('Famille', FamilleSchema);