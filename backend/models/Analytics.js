const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["visit", "resume_view", "project_view", "github_click"], required: true },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
