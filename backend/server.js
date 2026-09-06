require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDB = require("./config/db");

const User = require("./models/User");
const Skill = require("./models/Skill");
const Project = require("./models/Project");
const Education = require("./models/Education");
const Certificate = require("./models/Certificate");
const Experience = require("./models/Experience");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const githubRoutes = require("./routes/githubRoutes");
const buildResourceRouter = require("./routes/resourceRoutes");
const projectRoutes = require("./routes/projectRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

// =========================================================
// SECURITY & CORS
// =========================================================

app.use(helmet());

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://tasneem-portfolio-roan.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// =========================================================
// BODY PARSER & LOGGER
// =========================================================

app.use(express.json({ limit: "2mb" }));

app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);

// =========================================================
// UPLOADS
// =========================================================

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader(
      "Cross-Origin-Resource-Policy",
      "cross-origin"
    );
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// =========================================================
// RATE LIMITING
// =========================================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api/messages", limiter);
app.use("/api/auth", limiter);

// =========================================================
// HEALTH CHECK
// =========================================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

// =========================================================
// API ROUTES
// =========================================================

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/github", githubRoutes);

app.use(
  "/api/skills",
  buildResourceRouter(Skill)
);

app.use("/api/projects", projectRoutes);

app.use(
  "/api/education",
  buildResourceRouter(Education)
);

app.use(
  "/api/certificates",
  buildResourceRouter(Certificate)
);

app.use(
  "/api/experience",
  buildResourceRouter(Experience)
);

// =========================================================
// ERROR HANDLING
// =========================================================

app.use(notFound);

app.use(errorHandler);

// =========================================================
// ADMIN BOOTSTRAP
// =========================================================

async function bootstrapAdmin() {
  const existing = await User.findOne({
    role: "admin",
  });

  if (existing) {
    return;
  }

  if (
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD
  ) {
    console.warn(
      "No admin account exists and ADMIN_EMAIL/ADMIN_PASSWORD are not set — skipping bootstrap."
    );

    return;
  }

  await User.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log(
    `Bootstrapped admin account: ${process.env.ADMIN_EMAIL}`
  );
}

// =========================================================
// SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

connectDB()
  .then(bootstrapAdmin)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `API listening on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Failed to start server:",
      error
    );
    process.exit(1);
  });

module.exports = app;