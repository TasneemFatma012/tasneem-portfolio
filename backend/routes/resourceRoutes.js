const express = require("express");

const crudFactory = require("../controllers/crudFactory");
const { requireAuth } = require("../middleware/auth");
const upload = require("../middleware/upload");

function buildResourceRouter(Model, options = {}) {
  const router = express.Router();

  const c = crudFactory(Model, options);

  router.get("/", c.list);

  router.get("/:id", c.getOne);

  // ==========================================
  // CREATE
  // ==========================================

  router.post(
    "/",
    requireAuth,

    // Only Project needs image upload
    Model.modelName === "Project"
      ? upload.single("image")
      : (req, res, next) => next(),

    async (req, res, next) => {
      try {
        if (Model.modelName === "Project" && req.file) {
          req.body.screenshotUrl =
            `/uploads/${req.file.filename}`;
        }

        await c.create(req, res, next);
      } catch (err) {
        next(err);
      }
    }
  );

  // ==========================================
  // UPDATE
  // ==========================================

  router.put(
    "/:id",
    requireAuth,

    Model.modelName === "Project"
      ? upload.single("image")
      : (req, res, next) => next(),

    async (req, res, next) => {
      try {
        if (Model.modelName === "Project" && req.file) {
          req.body.screenshotUrl =
            `/uploads/${req.file.filename}`;
        }

        await c.update(req, res, next);
      } catch (err) {
        next(err);
      }
    }
  );

  // ==========================================
  // DELETE
  // ==========================================

  router.delete(
    "/:id",
    requireAuth,
    c.remove
  );

  return router;
}

module.exports = buildResourceRouter