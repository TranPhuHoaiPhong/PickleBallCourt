const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },      // "Sân 1", "Sân 2"
  image: { type: String },
  hourlyRate: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'CourtLocation' },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Court", courtSchema);
