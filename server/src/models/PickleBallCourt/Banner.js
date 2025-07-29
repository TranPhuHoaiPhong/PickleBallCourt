const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    imageUrl: [{ type: String, required: true }],
    title: { type: String },
    isActive: { type: Boolean, default: true },
    showFrom: { type: Date },
    showUntil: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
