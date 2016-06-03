const mongoose = require('mongoose');

var slothSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String, default: 'f' },
  weight: { type: Number, default: 100 },
  strength: { type: Number, default: 50 },
  offspring: [String],
  wranglerId: String
});

module.exports = mongoose.model('Sloth', slothSchema);
