const mongoose = require('mongoose');

var slothbearSchema = new mongoose.Schema({
  name: String,
  gender: String,
  weight: Number,
  strength: Number,
  parents: [String],
  wranglerId: String
});

module.exports = mongoose.model('Slothbear', slothbearSchema);
