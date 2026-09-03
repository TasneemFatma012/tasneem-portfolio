const Profile = require("../models/Profile");

// GET /api/profile  (public)
async function getProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({ name: "Your Name" });
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

// PUT /api/profile  (admin only) — upsert the single profile document
async function updateProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
