const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  court: { type: mongoose.Schema.Types.ObjectId, ref: "Court", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // nếu có user
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  name: { type: String, required: true },    
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
