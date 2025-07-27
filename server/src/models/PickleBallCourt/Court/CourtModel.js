const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  addressDistrict: {
    type: String,
    required: true
  },
  priceHour: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  googleMapLink: { type: String, default: '' },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourtLocation'
  }
}, { timestamps: true });

module.exports = mongoose.model('Court', courtSchema);
