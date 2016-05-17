const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: { type: String, default: 'm' },
  weight: { type: Number, default: 500 },
  strength: { type: Number, default: 10 },
  offspring: [String]
});

module.exports = mongoose.model('Bear', bearSchema);
