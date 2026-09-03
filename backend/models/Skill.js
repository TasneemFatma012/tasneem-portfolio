const mongoose = require("mongoose");

const skillGroupSchema = new mongoose.Schema(
  {
    group: { type: String, required: true }, 
    items: [{ type: String, required: true }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillGroupSchema);
