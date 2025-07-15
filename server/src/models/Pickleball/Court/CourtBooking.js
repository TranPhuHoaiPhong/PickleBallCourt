const mongoose = require("mongoose");

const courtBookingSchema = new mongoose.Schema({
  court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },               // "2025-07-15"
  timeSlot: { type: String, required: true },           // "18:00 - 19:00"
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
}, { timestamps: true });

module.exports = mongoose.model('CourtBooking', courtBookingSchema);