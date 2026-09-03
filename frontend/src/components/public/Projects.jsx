import React, { useState } from "react";

import {
  Github,
  Star,
  Code2,
  ArrowUpRight,
  FolderGit2,
} from "lucide-react";

import Section from "../common/Section";
import Card from "../common/Card";

import {
  c,
  display,
  mono,
  API_BASE,
} from "../../utils/constants";

// =====================================================
// HELPERS
// =====================================================

function extractHost(url) {
  try {
    if (!url) return null;

    const value =
      url.startsWith("http://") ||
      url.startsWith("https://")
        ? url
        : `https://${url}`;

    return new URL(value).host.replace(
      /^www\./,
      ""
    );
  } catch {
    return null;
  }
}

// =====================================================
// URL HELPER
// =====================================================
function getImageUrl(url) {
  if (!url) return "";

  const finalUrl =
    url.startsWith("http://") ||
    url.startsWith("https://")
      ? url
      : `${API_BASE}${url}`;

  console.log("IMAGE URL:", finalUrl);

  return finalUrl;
}

// =====================================================
// LIVE URL HELPER
// =====================================================

function getLiveUrl(url) {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `https://${url}`;
}

// =====================================================
// TECH STACK
// =====================================================

function stackTags(stack) {
  if (!stack) return [];

  if (Array.isArray(stack)) {
    return stack
      .flatMap((item) =>
        String(item)
          .split("·")
          .map((x) => x.trim())
      )
      .filter(Boolean);
  }

  return String(stack)
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

// =====================================================
// INITIALS
// =====================================================

function initialsOf(name) {
  return String(name || "")
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// =====================================================
// PROJECT COLORS
// =====================================================

const PROJECT_HUES = [
  265,
  200,
  340,
  25,
  150,
  185,
];

function hueFor(id) {
  const str = String(id ?? "");

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash =
      (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  return PROJECT_HUES[
    hash % PROJECT_HUES.length
  ];
}

// =====================================================
// PROJECT PREVIEW
// =====================================================

function ProjectPreview({ project }) {
  const imageUrl = getImageUrl(
    project.screenshotUrl
  );

  const [broken, setBroken] = useState(
    !imageUrl
  );

  const host =
    extractHost(project.liveUrl) ||
    extractHost(project.githubUrl) ||
    "localhost:5173";

  const hue = hueFor(
    project.id ||
      project._id ||
      project.name
  );

  return (
    <div
      className="project-preview"
      style={{
        border:
          "1px solid rgba(255,255,255,0.09)",

        borderRadius: 12,

        overflow: "hidden",

        background:
          "rgba(255,255,255,0.025)",
      }}
    >

      {/* =================================================
          BROWSER HEADER
      ================================================= */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: 10,

          padding: "8px 10px",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          background:
            "rgba(0,0,0,0.15)",
        }}
      >

        {/* Browser dots */}

        <div
          style={{
            display: "flex",
            gap: 5,
            flexShrink: 0,
          }}
        >
          <span className="browser-dot red" />
          <span className="browser-dot yellow" />
          <span className="browser-dot green" />
        </div>

        {/* URL */}

        <div
          style={{
            flex: 1,

            minWidth: 0,

            ...mono,

            fontSize: 10,

            color: c.mutedSoft,

            background:
              "rgba(255,255,255,0.045)",

            borderRadius: 999,

            padding: "4px 10px",

            overflow: "hidden",

            textOverflow: "ellipsis",

            whiteSpace: "nowrap",
          }}
        >
          {host}
        </div>
      </div>

      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="project-image-wrap"
        style={{
          position: "relative",

          aspectRatio: "16 / 10",

          overflow: "hidden",
        }}
      >

        {!broken ? (
          <img
            src={imageUrl}
            alt={`${project.name} preview`}
            loading="lazy"
            className="project-image"

            onError={() => {
              console.error(
                "Project image failed:",
                imageUrl
              );

              setBroken(true);
            }}

            onLoad={() => {
              console.log(
                "Project image loaded:",
                imageUrl
              );
            }}

            style={{
              width: "100%",

              height: "100%",

              objectFit: "cover",

              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",

              height: "100%",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              position: "relative",

              overflow: "hidden",

              background: `
                radial-gradient(
                  circle at 20% 20%,
                  hsla(
                    ${hue},
                    80%,
                    60%,
                    0.24
                  ),
                  transparent 45%
                ),

                radial-gradient(
                  circle at 80% 80%,
                  hsla(
                    ${hue + 40},
                    80%,
                    60%,
                    0.16
                  ),
                  transparent 45%
                ),

                linear-gradient(
                  135deg,
                  rgba(255,255,255,0.05),
                  rgba(255,255,255,0.01)
                )
              `,
            }}
          >

            {/* Grid */}

            <div
              style={{
                position: "absolute",

                inset: 0,

                opacity: 0.18,

                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,0.08)
                    1px,
                    transparent 1px
                  ),

                  linear-gradient(
                    90deg,
                    rgba(255,255,255,0.08)
                    1px,
                    transparent 1px
                  )
                `,

                backgroundSize:
                  "24px 24px",
              }}
            />

            {/* Initial */}

            <div
              style={{
                position: "relative",

                zIndex: 1,

                width: 70,

                height: 70,

                borderRadius: 18,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                border: `
                  1px solid
                  hsla(
                    ${hue},
                    70%,
                    65%,
                    0.3
                  )
                `,

                background: `
                  hsla(
                    ${hue},
                    70%,
                    50%,
                    0.08
                  )
                `,

                boxShadow: `
                  0 0 50px
                  hsla(
                    ${hue},
                    70%,
                    50%,
                    0.15
                  )
                `,
              }}
            >

              {initialsOf(project.name) ? (
                <span
                  style={{
                    ...display,

                    fontSize: 24,

                    fontWeight: 800,

                    color: `hsla(
                      ${hue},
                      80%,
                      78%,
                      0.85
                    )`,
                  }}
                >
                  {initialsOf(project.name)}
                </span>
              ) : (
                <Code2
                  size={28}
                  color={`hsla(
                    ${hue},
                    80%,
                    78%,
                    0.8
                  )`}
                />
              )}

            </div>
          </div>
        )}

        <div className="project-image-overlay" />

      </div>
    </div>
  );
}

// =====================================================
// PROJECT CARD
// =====================================================

function ProjectCard({
  project,
  index,
}) {
  const tags = stackTags(
    project.techStack
  );

  const number = String(index + 1)
    .padStart(2, "0");

  const liveUrl = getLiveUrl(
    project.liveUrl
  );

  return (
    <article
      className={`project-wrapper ${
        index % 2 === 1
          ? "project-offset"
          : ""
      }`}
    >

      <Card
        className="project-card"

        style={{
          position: "relative",

          overflow: "hidden",

          padding: 18,

          background:
            project.featured
              ? `
                linear-gradient(
                  145deg,
                  ${c.violetBg},
                  rgba(255,255,255,0.025)
                )
              `
              : "rgba(255,255,255,0.025)",

          border:
            project.featured
              ? `1px solid ${c.violetLine}`
              : "1px solid rgba(255,255,255,0.08)",

          borderRadius: 18,
        }}
      >

        {/* =================================================
            CORNER
        ================================================= */}

        <div
          className="project-corner"

          style={{
            position: "absolute",

            top: 0,

            right: 0,

            width: 70,

            height: 70,

            background:
              project.featured
                ? `
                  linear-gradient(
                    135deg,
                    transparent 50%,
                    ${c.violet}22 50%
                  )
                `
                : `
                  linear-gradient(
                    135deg,
                    transparent 50%,
                    rgba(255,255,255,0.06) 50%
                  )
                `,

            pointerEvents: "none",
          }}
        />

        {/* =================================================
            PROJECT NUMBER
        ================================================= */}

        <div
          style={{
            position: "absolute",

            top: 14,

            left: 16,

            zIndex: 3,

            ...mono,

            fontSize: 10,

            fontWeight: 600,

            color: c.mutedSoft,

            letterSpacing: 1,
          }}
        >
          PROJECT_{number}
        </div>

        {/* =================================================
            FEATURED
        ================================================= */}

        {project.featured && (
          <div
            style={{
              position: "absolute",

              top: 12,

              right: 14,

              zIndex: 5,

              display: "flex",

              alignItems: "center",

              gap: 5,

              ...mono,

              fontSize: 9.5,

              color: c.violet,

              padding: "4px 9px",

              borderRadius: 999,

              border:
                `1px solid ${c.violetLine}`,

              background:
                "rgba(0,0,0,0.45)",

              backdropFilter:
                "blur(8px)",
            }}
          >
            <Star
              size={10}
              fill={c.violet}
              stroke="none"
            />

            FEATURED
          </div>
        )}

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          style={{
            marginTop: 22,
          }}
        >
          <ProjectPreview
            project={project}
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: 8,

            marginTop: 16,
          }}
        >

          <FolderGit2
            size={16}
            color={
              project.featured
                ? c.violet
                : c.muted
            }
          />

          <h3
            style={{
              ...display,

              margin: 0,

              fontSize: 16,

              fontWeight: 700,

              color: c.textBright,
            }}
          >
            {project.name}
          </h3>

        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          style={{
            fontSize: 13.5,

            color: c.muted,

            marginTop: 8,

            lineHeight: 1.6,

            minHeight: 44,
          }}
        >
          {project.description ||
            "A full-stack web development project."}
        </p>

        {/* =================================================
            TECH STACK
        ================================================= */}

        {tags.length > 0 && (
          <div
            style={{
              display: "flex",

              flexWrap: "wrap",

              gap: 6,

              marginTop: 13,
            }}
          >

            {tags.map((tag) => (
              <span
                key={tag}
                className="project-tag"

                style={{
                  ...mono,

                  fontSize: 10,

                  color: c.mutedSoft,

                  padding: "4px 8px",

                  borderRadius: 6,

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.025)",
                }}
              >
                {tag}
              </span>
            ))}

          </div>
        )}

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          style={{
            display: "flex",

            gap: 8,

            marginTop: 18,
          }}
        >

          {/* GITHUB */}

          {project.githubUrl && (
            <a
              href={project.githubUrl}

              target="_blank"

              rel="noopener noreferrer"

              className="project-button"

              style={{
                flex: 1,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 6,

                padding: "9px 12px",

                borderRadius: 9,

                border:
                  "1px solid rgba(255,255,255,0.1)",

                color: c.text,

                textDecoration: "none",

                fontSize: 12,
              }}
            >
              <Github size={14} />

              GitHub
            </a>
          )}

          {/* LIVE */}

          {project.liveUrl && (
            <a
              href={liveUrl}

              target="_blank"

              rel="noopener noreferrer"

              className="project-button"

              style={{
                flex: 1,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 6,

                padding: "9px 12px",

                borderRadius: 9,

                border:
                  project.featured
                    ? `1px solid ${c.violetLine}`
                    : "1px solid rgba(255,255,255,0.1)",

                background:
                  project.featured
                    ? "rgba(139,92,246,0.08)"
                    : "transparent",

                color:
                  project.featured
                    ? c.violet
                    : c.text,

                textDecoration: "none",

                fontSize: 12,

                fontWeight: 600,
              }}
            >
              Live

              <ArrowUpRight
                size={14}
              />
            </a>
          )}

        </div>

      </Card>
    </article>
  );
}

// =====================================================
// MAIN PROJECTS
// =====================================================

export default function Projects({
  projects = [],
}) {
  return (
    <Section
      id="projects"
      commit="src/projects/"
      label="Featured Projects"
    >

      <style>{`

        .browser-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: block;
        }

        .browser-dot.red {
          background: #ff5f57;
        }

        .browser-dot.yellow {
          background: #febc2e;
        }

        .browser-dot.green {
          background: #28c840;
        }

        .project-card {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-7px);

          border-color:
            rgba(255,255,255,0.18);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.25),

            0 0 35px
            rgba(139,92,246,0.06);
        }

        .project-card:hover
        .project-image {
          transform: scale(1.06);
        }

        .project-card:hover
        .project-image-overlay {
          opacity: 0.15;
        }

        .project-card:hover
        .project-corner {
          opacity: 1;
        }

        .project-image {
          transition:
            transform 0.6s
            cubic-bezier(0.16,1,0.3,1);
        }

        .project-image-overlay {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              180deg,
              transparent 50%,
              rgba(0,0,0,0.25)
            );

          opacity: 0.35;

          transition:
            opacity 0.3s ease;

          pointer-events: none;
        }

        .project-tag {
          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .project-tag:hover {
          color: ${c.textBright};

          border-color:
            rgba(255,255,255,0.2) !important;

          background:
            rgba(255,255,255,0.06) !important;
        }

        .project-button {
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .project-button:hover {
          transform: translateY(-2px);

          background:
            rgba(255,255,255,0.07) !important;

          border-color:
            rgba(255,255,255,0.22) !important;
        }

        @media (min-width: 640px) {
          .project-offset {
            margin-top: 38px;
          }
        }

        @media (max-width: 639px) {
          .project-offset {
            margin-top: 0;
          }
        }

      `}</style>

      {/* =================================================
          PROJECTS
      ================================================= */}

      {projects.length === 0 ? (

        <div
          style={{
            textAlign: "center",

            padding: "50px 20px",

            border:
              "1px dashed rgba(255,255,255,0.1)",

            borderRadius: 16,
          }}
        >

          <Code2
            size={28}
            color={c.muted}
            style={{
              margin: "0 auto 12px",
            }}
          />

          <p
            style={{
              color: c.muted,

              fontSize: 14,

              margin: 0,
            }}
          >
            No projects published yet.
          </p>

          <p
            style={{
              color: c.mutedSoft,

              fontSize: 12,

              marginTop: 6,
            }}
          >
            Add projects from the admin
            dashboard.
          </p>

        </div>

      ) : (

        <div
          className="grid sm:grid-cols-2 gap-5"
        >
          {projects.map(
            (project, index) => (
              <ProjectCard
                key={
                  project.id ||
                  project._id ||
                  index
                }

                project={project}

                index={index}
              />
            )
          )}
        </div>

      )}

    </Section>
  );
}