const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    date: String,
    credentialUrl: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
