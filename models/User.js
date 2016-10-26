var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  age: Number
});

module.exports = mongoose.model('User', UserSchema);
