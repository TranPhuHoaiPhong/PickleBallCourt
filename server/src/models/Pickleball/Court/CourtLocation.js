const mongoose = require("mongoose");
const courtLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },      // "Minh Long Stadium"
  address: { type: String, required: true },
  courts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],
});

module.exports = mongoose.model('CourtLocation', courtLocationSchema);
