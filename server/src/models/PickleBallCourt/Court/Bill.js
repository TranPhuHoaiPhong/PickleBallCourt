const mongoose = require("mongoose");

const bookingHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    court: {
      courtId: { type: mongoose.Schema.Types.ObjectId, ref: "Court" },
    },
    location: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourtLocation",
      },
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingHistory", bookingHistorySchema);
