const express = require("express");
const multer = require("multer");
const path = require("path");

const Project = require("../models/Project");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// =====================================================
// HELPER: ARRAY PARSER
// =====================================================

function parseArray(value) {
  if (!value) return [];

  // Already an array
  if (Array.isArray(value)) {
    return value;
  }

  // Try JSON array
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    // Not JSON, continue below
  }
  return String(value)
    .split(/[,·]/)
    .map((item) => item.trim())
    .filter(Boolean);
}


// =====================================================
// MULTER IMAGE STORAGE
// =====================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../uploads/projects")
    );
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ext;

    cb(null, filename);
  },
});


// =====================================================
// MULTER CONFIG
// =====================================================

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});


// =====================================================
// GET ALL PROJECTS
// =====================================================

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.json(projects);
  } catch (err) {
    next(err);
  }
});


// =====================================================
// GET SINGLE PROJECT
// =====================================================

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found.",
      });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
});


// =====================================================
// CREATE PROJECT
// =====================================================

router.post(
  "/",
  requireAuth,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const projectData = {
        name: req.body.name || "",

        description:
          req.body.description || "",

        screenshotUrl:
          req.body.screenshotUrl || "",

        techStack:
          parseArray(req.body.techStack),

        features:
          parseArray(req.body.features),

        githubUrl:
          req.body.githubUrl || "",

        liveUrl:
          req.body.liveUrl || "",

        category:
          req.body.category || "general",

        featured:
          req.body.featured === "true",

        published:
          req.body.published !== "false",

        order:
          Number(req.body.order || 0),
      };


      // ---------------------------------------------
      // IMAGE UPLOADED
      // ---------------------------------------------

      if (req.file) {
        projectData.screenshotUrl =
          `/uploads/projects/${req.file.filename}`;
      }


      // ---------------------------------------------
      // CREATE
      // ---------------------------------------------

      const project =
        await Project.create(projectData);

      res.status(201).json(project);

    } catch (err) {
      next(err);
    }
  }
);


// =====================================================
// UPDATE PROJECT
// =====================================================

router.put(
  "/:id",
  requireAuth,
  upload.single("image"),
  async (req, res, next) => {
    try {

      const updateData = {
        name: req.body.name || "",

        description:
          req.body.description || "",

        techStack:
          parseArray(req.body.techStack),

        features:
          parseArray(req.body.features),

        githubUrl:
          req.body.githubUrl || "",

        liveUrl:
          req.body.liveUrl || "",

        category:
          req.body.category || "general",

        featured:
          req.body.featured === "true",

        published:
          req.body.published !== "false",

        order:
          Number(req.body.order || 0),
      };


      // ---------------------------------------------
      // NEW IMAGE UPLOADED
      // ---------------------------------------------

      if (req.file) {
        updateData.screenshotUrl =
          `/uploads/projects/${req.file.filename}`;
      }


      // ---------------------------------------------
      // UPDATE DATABASE
      // ---------------------------------------------

      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );


      if (!project) {
        return res.status(404).json({
          error: "Project not found.",
        });
      }


      res.json(project);

    } catch (err) {
      next(err);
    }
  }
);


// =====================================================
// DELETE PROJECT
// =====================================================

router.delete(
  "/:id",
  requireAuth,
  async (req, res, next) => {
    try {

      const project =
        await Project.findByIdAndDelete(
          req.params.id
        );


      if (!project) {
        return res.status(404).json({
          error: "Project not found.",
        });
      }


      res.json({
        success: true,
      });

    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;