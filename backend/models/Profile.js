const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: String,
    tagline: String,
    about: String,
    email: String,
    phone: String,
    location: String,
    githubUsername: String,
    linkedinUrl: String,
    resumeUrl: String,
    photoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
