const express = require("express");
const { createMessage, listMessages, markRead, removeMessage } = require("../controllers/messageController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", createMessage); 
router.get("/", requireAuth, listMessages);
router.patch("/:id/read", requireAuth, markRead);
router.delete("/:id", requireAuth, removeMessage);

module.exports = router;
