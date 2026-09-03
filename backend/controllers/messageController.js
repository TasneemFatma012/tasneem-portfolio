const Message = require("../models/Message");

// POST /api/messages  (public — contact form)
async function createMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required." });
    }
    const doc = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    next(err);
  }
}

// GET /api/messages  (admin only)
async function listMessages(req, res, next) {
  try {
    const docs = await Message.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/messages/:id/read  (admin only)
async function markRead(req, res, next) {
  try {
    const doc = await Message.findByIdAndUpdate(req.params.id, { status: "read" }, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found." });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/messages/:id  (admin only)
async function removeMessage(req, res, next) {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found." });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createMessage, listMessages, markRead, removeMessage };
