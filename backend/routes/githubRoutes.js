const express = require("express");
const { getStats, getRepos } = require("../controllers/githubController");

const router = express.Router();

router.get("/stats", getStats);
router.get("/repos", getRepos);

module.exports = router;
