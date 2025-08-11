const mongoose = require("mongoose");
const courtLocationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "Minh Long Stadium"
  address: { type: String, required: true },
  phone: { type: String, required: true }, // Số điện thoại
  email: { type: String, required: true },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  imgs: {
    type: [String],
    required: true,
  },
  googleMapLink: { type: String, default: "" },
});

module.exports = mongoose.model("CourtLocation", courtLocationSchema);
