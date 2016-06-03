const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String, default: 'm' },
  weight: { type: Number, default: 500 },
  strength: { type: Number, default: 10 },
  offspring: [String],
  wranglerId: String
});

module.exports = mongoose.model('Bear', bearSchema);
