const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priceHour: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Court', courtSchema);
