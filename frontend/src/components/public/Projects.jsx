import React, { useState } from "react";

import {
  Github,
  Star,
  Code2,
  ArrowUpRight,
  FolderGit2,
  ChevronDown,
} from "lucide-react";

import Section from "../common/Section";
import Card from "../common/Card";

import {
  c,
  mono,
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
  return url || "";
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

const PROJECT_ARTWORK = {
  "imperial-hotel": {
    category: "HOSPITALITY",
    headline: "A considered stay",
    accent: "#d8b36b",
    visual: "hotel",
  },
  "student-crud": {
    category: "STUDENT DIRECTORY",
    headline: "Records, made simple",
    accent: "#72d8b4",
    visual: "crud",
  },
  "little-explorers-abc-zoo": {
    category: "LEARNING ADVENTURE",
    headline: "Every letter has a friend",
    accent: "#eabf62",
    visual: "learning",
  },
  "animation-game-challenge": {
    category: "ARCADE EXPERIMENT",
    headline: "Play in motion",
    accent: "#f18a68",
    visual: "game",
  },
  "student-performance-analytics-dashboard": {
    category: "STUDENT INSIGHTS",
    headline: "Make progress visible",
    accent: "#72b8ec",
    visual: "analytics",
  },
  "credit-wise-loan-approval": {
    category: "CREDIT ANALYSIS",
    headline: "A clearer lending signal",
    accent: "#b99af5",
    visual: "credit",
  },
  "house-price-prediction": {
    category: "PROPERTY PREDICTION",
    headline: "Find the value in every home",
    accent: "#e9ae6c",
    visual: "property",
  },
  "road-accident-analysis-dashboard": {
    category: "ROAD SAFETY",
    headline: "See patterns. Plan safer roads.",
    accent: "#62cfc5",
    visual: "road",
  },
  "meesho-sales-overview-dashboard": {
    category: "COMMERCE ANALYTICS",
    headline: "Every sale tells a story",
    accent: "#ef8bb5",
    visual: "sales",
  },
};

function ProjectArtwork({ project, hue }) {
  const artwork = PROJECT_ARTWORK[project.id] || {
    category: "PROJECT PREVIEW",
    headline: project.name,
    accent: `hsl(${hue} 68% 68%)`,
    visual: "analytics",
  };
  const accent = artwork.accent;
  const idPrefix = String(project.id || project.name)
    .replace(/[^a-zA-Z0-9_-]/g, "-");

  return (
    <svg
      className="project-artwork"
      viewBox="0 0 800 500"
      role="img"
      aria-label={`${project.name} illustrated project cover`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${idPrefix}-artwork-background`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#17231c" />
          <stop offset="100%" stopColor="#0b100d" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-artwork-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#202c24" />
          <stop offset="100%" stopColor="#121a15" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#${idPrefix}-artwork-background)`} />
      <circle cx="710" cy="65" r="170" fill={accent} opacity=".09" />
      <circle cx="70" cy="460" r="160" fill={accent} opacity=".055" />
      <rect x="36" y="28" width="728" height="444" rx="20" fill="#0b100d" stroke="#ffffff" strokeOpacity=".12" />
      <path d="M36 48a20 20 0 0 1 20-20h688a20 20 0 0 1 20 20v38H36z" fill="#151d18" />
      <circle cx="60" cy="57" r="5" fill="#ff756b" />
      <circle cx="78" cy="57" r="5" fill="#e9c66c" />
      <circle cx="96" cy="57" r="5" fill="#70c99b" />
      <rect x="292" y="45" width="340" height="24" rx="12" fill="#202923" />
      <text x="310" y="61" fill="#91a397" fontSize="10" fontFamily="monospace">{artwork.category}</text>
      <rect x="54" y="108" width="692" height="336" rx="13" fill={`url(#${idPrefix}-artwork-panel)`} />
      <text x="82" y="150" fill={accent} fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="monospace">
        {artwork.category}
      </text>
      <text x="82" y="183" fill="#f2f5ed" fontSize="23" fontWeight="700" fontFamily="Arial, sans-serif">
        {artwork.headline}
      </text>
      <circle cx="704" cy="148" r="16" fill={accent} opacity=".16" />
      <circle cx="704" cy="148" r="5" fill={accent} />

      {artwork.visual === "learning" && (
        <g>
          {[
            { x: 91, letter: "A", color: "#e9a75d" },
            { x: 218, letter: "B", color: "#73c9aa" },
            { x: 345, letter: "C", color: "#8fa9e8" },
            { x: 472, letter: "D", color: "#e48891" },
          ].map((tile) => (
            <g key={tile.letter}>
              <rect x={tile.x} y="225" width="104" height="132" rx="16" fill={tile.color} opacity=".13" stroke={tile.color} strokeOpacity=".58" />
              <circle cx={tile.x + 52} cy="268" r="23" fill={tile.color} opacity=".25" />
              <text x={tile.x + 52} y="280" textAnchor="middle" fill={tile.color} fontSize="34" fontWeight="700" fontFamily="Arial, sans-serif">
                {tile.letter}
              </text>
              <rect x={tile.x + 24} y="320" width="56" height="6" rx="3" fill={tile.color} opacity=".58" />
            </g>
          ))}
          <text x="91" y="395" fill="#a9b8ac" fontSize="12" fontFamily="Arial, sans-serif">Tap a letter to explore the trail</text>
          <rect x="596" y="228" width="112" height="129" rx="14" fill="#ffffff" fillOpacity=".035" />
          <circle cx="652" cy="274" r="24" fill={accent} opacity=".24" />
          <path d="M635 279q17-31 34 0-17 18-34 0Z" fill={accent} />
          <text x="652" y="328" textAnchor="middle" fill="#d6e2d8" fontSize="11" fontFamily="Arial, sans-serif">Meet a new friend</text>
        </g>
      )}

      {artwork.visual === "game" && (
        <g>
          <rect x="86" y="220" width="410" height="174" rx="18" fill="#101713" stroke="#ffffff" strokeOpacity=".08" />
          <circle cx="290" cy="306" r="62" fill="none" stroke={accent} strokeOpacity=".22" strokeWidth="2" />
          <circle cx="290" cy="306" r="42" fill="none" stroke={accent} strokeOpacity=".45" strokeWidth="2" />
          <circle cx="290" cy="306" r="20" fill={accent} opacity=".82" />
          <path d="M112 362h350" stroke="#44534a" strokeWidth="3" strokeLinecap="round" />
          <path d="m142 361 21-42 22 42m218 0 21-62 21 62" fill={accent} opacity=".28" />
          <rect x="522" y="220" width="184" height="174" rx="18" fill="#ffffff" fillOpacity=".035" />
          <text x="547" y="255" fill="#aab9ae" fontSize="11" fontFamily="monospace">LEVEL 01</text>
          <text x="547" y="302" fill="#f3f3ec" fontSize="34" fontWeight="700" fontFamily="Arial, sans-serif">PLAY</text>
          <rect x="547" y="326" width="120" height="8" rx="4" fill={accent} opacity=".75" />
          <text x="547" y="369" fill="#aab9ae" fontSize="11" fontFamily="Arial, sans-serif">Move · Explore · Repeat</text>
        </g>
      )}

      {artwork.visual === "hotel" && (
        <g>
          <rect x="86" y="220" width="374" height="174" rx="18" fill="#25251f" />
          <path d="M133 355V285a68 68 0 0 1 136 0v70" fill="#3b3528" stroke={accent} strokeOpacity=".74" strokeWidth="3" />
          <path d="M153 355v-68a48 48 0 0 1 96 0v68" fill="#101713" />
          <rect x="296" y="306" width="122" height="49" rx="6" fill={accent} opacity=".2" />
          <rect x="309" y="286" width="96" height="28" rx="8" fill="#e2d6bc" opacity=".78" />
          <path d="M294 354v-34h126v34" fill="#b99560" opacity=".64" />
          <rect x="480" y="220" width="226" height="174" rx="18" fill="#ffffff" fillOpacity=".035" />
          <text x="508" y="259" fill="#aab9ae" fontSize="11" fontFamily="monospace">ROOMS FROM</text>
          <text x="508" y="302" fill="#f3f3ec" fontSize="29" fontWeight="700" fontFamily="Arial, sans-serif">₹2,500</text>
          <text x="508" y="326" fill="#aab9ae" fontSize="11" fontFamily="Arial, sans-serif">per night · choose your dates</text>
          <rect x="508" y="348" width="132" height="25" rx="12" fill={accent} opacity=".8" />
          <text x="574" y="365" textAnchor="middle" fill="#181811" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">EXPLORE STAYS</text>
        </g>
      )}

      {artwork.visual === "crud" && (
        <g>
          <rect x="86" y="220" width="620" height="174" rx="16" fill="#101713" stroke="#ffffff" strokeOpacity=".08" />
          <text x="110" y="251" fill="#aab9ae" fontSize="11" fontFamily="monospace">STUDENT RECORDS</text>
          <text x="110" y="282" fill="#87968b" fontSize="10" fontFamily="monospace">NAME</text>
          <text x="358" y="282" fill="#87968b" fontSize="10" fontFamily="monospace">COURSE</text>
          <text x="548" y="282" fill="#87968b" fontSize="10" fontFamily="monospace">STATUS</text>
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(0 ${row * 32})`}>
              <path d="M108 296h572" stroke="#ffffff" strokeOpacity=".07" />
              <circle cx="122" cy="311" r="8" fill={accent} opacity={0.35 + row * 0.1} />
              <rect x="141" y="307" width="112" height="7" rx="3" fill="#dce6dc" opacity=".65" />
              <rect x="358" y="307" width="82" height="7" rx="3" fill="#a9b9ad" opacity=".42" />
              <rect x="548" y="304" width="66" height="13" rx="6" fill={accent} opacity=".42" />
            </g>
          ))}
        </g>
      )}

      {artwork.visual === "credit" && (
        <g>
          <rect x="86" y="220" width="286" height="174" rx="18" fill={accent} opacity=".13" stroke={accent} strokeOpacity=".3" />
          <text x="112" y="255" fill="#d8dfe1" fontSize="11" fontFamily="monospace">CREDIT-WISE</text>
          <text x="112" y="299" fill="#f5f5ef" fontSize="21" fontWeight="700" fontFamily="Arial, sans-serif">Loan analysis</text>
          <text x="112" y="325" fill="#aab9ae" fontSize="11" fontFamily="Arial, sans-serif">Data preparation · model evaluation</text>
          <rect x="112" y="350" width="116" height="25" rx="12" fill={accent} opacity=".82" />
          <text x="170" y="367" textAnchor="middle" fill="#15131a" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">ML WORKFLOW</text>
          <circle cx="535" cy="307" r="73" fill="none" stroke="#ffffff" strokeOpacity=".08" strokeWidth="14" />
          <circle cx="535" cy="307" r="48" fill={accent} opacity=".15" />
          <path d="m514 307 14 14 29-31" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="654" y="299" fill="#dce6dc" fontSize="11" fontFamily="Arial, sans-serif">Classification</text>
          <text x="654" y="319" fill={accent} fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">MODELS</text>
        </g>
      )}

      {artwork.visual === "property" && (
        <g>
          <rect x="86" y="220" width="280" height="174" rx="18" fill="#ffffff" fillOpacity=".035" />
          <path d="m132 298 92-68 92 68v74H132z" fill={accent} opacity=".16" stroke={accent} strokeOpacity=".72" strokeWidth="3" />
          <path d="M191 372v-52h65v52m-103-57h36v27h-36zm94 0h36v27h-36z" fill={accent} opacity=".5" />
          <path d="m132 298 92-68 92 68" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="392" y="220" width="314" height="174" rx="18" fill="#ffffff" fillOpacity=".035" />
          <text x="420" y="257" fill="#aab9ae" fontSize="11" fontFamily="monospace">MACHINE LEARNING</text>
          <text x="420" y="296" fill="#f3f3ec" fontSize="23" fontWeight="700" fontFamily="Arial, sans-serif">Price prediction</text>
          <path d="M420 355h244" fill="none" stroke="#ffffff" strokeOpacity=".12" strokeWidth="2" />
          <circle cx="455" cy="355" r="5" fill={accent} opacity=".55" />
          <circle cx="520" cy="355" r="5" fill={accent} opacity=".7" />
          <circle cx="585" cy="355" r="5" fill={accent} opacity=".85" />
          <circle cx="650" cy="355" r="5" fill={accent} />
          <text x="420" y="382" fill="#aab9ae" fontSize="10" fontFamily="monospace">FEATURES · REGRESSION · EVALUATION</text>
        </g>
      )}

      {artwork.visual === "road" && (
        <g>
          <rect x="86" y="220" width="365" height="174" rx="18" fill="#101713" stroke="#ffffff" strokeOpacity=".08" />
          <path d="M102 270c75 1 78 68 151 67s80-74 181-48" fill="none" stroke="#65776c" strokeWidth="22" strokeLinecap="round" />
          <path d="M102 270c75 1 78 68 151 67s80-74 181-48" fill="none" stroke="#c9d0c5" strokeOpacity=".7" strokeWidth="2" strokeDasharray="9 11" />
          <circle cx="153" cy="285" r="9" fill={accent} />
          <circle cx="256" cy="336" r="9" fill="#f1b76a" />
          <circle cx="375" cy="305" r="9" fill="#e88376" />
          <rect x="476" y="220" width="230" height="174" rx="18" fill="#ffffff" fillOpacity=".035" />
          <text x="501" y="255" fill="#aab9ae" fontSize="11" fontFamily="monospace">SAFETY ANALYSIS</text>
          <text x="501" y="296" fill="#f3f3ec" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">Accident patterns</text>
          <circle cx="512" cy="333" r="5" fill={accent} />
          <circle cx="530" cy="333" r="5" fill="#f1b76a" />
          <circle cx="548" cy="333" r="5" fill="#e88376" />
          <text x="501" y="375" fill={accent} fontSize="10" fontFamily="monospace">LOCATION · TIME · SEVERITY</text>
        </g>
      )}

      {(artwork.visual === "analytics" || artwork.visual === "sales") && (
        <g>
          <rect x="86" y="220" width="188" height="72" rx="13" fill="#ffffff" fillOpacity=".04" />
          <rect x="288" y="220" width="188" height="72" rx="13" fill="#ffffff" fillOpacity=".04" />
          <rect x="490" y="220" width="188" height="72" rx="13" fill="#ffffff" fillOpacity=".04" />
          <text x="107" y="246" fill="#aab9ae" fontSize="10" fontFamily="monospace">{artwork.visual === "sales" ? "COMMERCE" : "STUDENT RESULTS"}</text>
          <text x="107" y="274" fill="#f3f3ec" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">{artwork.visual === "sales" ? "Sales insights" : "Subject analysis"}</text>
          <text x="309" y="246" fill="#aab9ae" fontSize="10" fontFamily="monospace">{artwork.visual === "sales" ? "PRODUCTS" : "RANKINGS"}</text>
          <text x="309" y="274" fill="#f3f3ec" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">Data exploration</text>
          <text x="511" y="246" fill="#aab9ae" fontSize="10" fontFamily="monospace">{artwork.visual === "sales" ? "REGIONS" : "STUDY HOURS"}</text>
          <text x="511" y="274" fill={accent} fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">Visual reports</text>
          <rect x="86" y="308" width="592" height="86" rx="14" fill="#101713" />
          {[0, 1, 2, 3].map((row) => (
            <path key={row} d={`M110 ${328 + row * 17}H654`} stroke="#ffffff" strokeOpacity=".07" />
          ))}
          <rect x="122" y="340" width="164" height="27" rx="8" fill={accent} opacity=".12" />
          <rect x="304" y="340" width="164" height="27" rx="8" fill={accent} opacity=".2" />
          <rect x="486" y="340" width="164" height="27" rx="8" fill={accent} opacity=".12" />
          <circle cx="146" cy="353" r="5" fill={accent} opacity=".8" />
          <circle cx="328" cy="353" r="5" fill={accent} opacity=".8" />
          <circle cx="510" cy="353" r="5" fill={accent} opacity=".8" />
        </g>
      )}
    </svg>
  );
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
        className="project-browser-header"
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
          className="project-browser-dots"
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
          className="project-browser-address"
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
          <ProjectArtwork project={project} hue={hue} />
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
  const tags = stackTags(project.techStack);
  const number = String(index + 1).padStart(2, "0");
  const liveUrl = getLiveUrl(project.liveUrl);

  return (
    <article className={`project-wrapper${project.featured ? " project-featured" : ""}`}>
      <Card className="project-card">
        <header className="project-card-header">
          <span className="project-index">PROJECT_{number}</span>
          {project.featured && (
            <span className="project-featured-label">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          )}
        </header>

        <div className="project-card-layout">
          <div className="project-preview-frame">
            <ProjectPreview project={project} />
          </div>

          <div className="project-card-content">
            <div className="project-heading">
              <FolderGit2 size={19} aria-hidden="true" />
              <h3 className="project-title">{project.name}</h3>
            </div>

            <p className="project-description">
              {project.description || "A full-stack web development project."}
            </p>

            {tags.length > 0 && (
              <div className="project-tech-stack" aria-label="Technologies used">
                {tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="project-actions">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button project-button-secondary"
                >
                  <Github size={15} />
                  Source code
                  <ArrowUpRight size={14} />
                </a>
              )}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button project-button-primary"
                >
                  Visit live
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}

function ProjectGroup({ title, description, projects, kicker }) {
  if (!projects.length) return null;

  return (
    <section className="project-group" aria-label={title}>
      <header className="project-group-header">
        <div className="project-group-copy">
          <span className="project-group-kicker">{kicker}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="project-group-count">
          {String(projects.length).padStart(2, "0")}
          <span> projects</span>
        </span>
      </header>

      <div className="projects-grid">
        {[...projects]
          .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
          .map((project, index) => (
            <ProjectCard
              key={project.id || project._id || index}
              project={project}
              index={index}
            />
          ))}
      </div>
    </section>
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
      label="Projects"
    >
      <div className="projects-intro">
        <p>From full-scale applications to focused experiments.</p>
        <span>{String(projects.length).padStart(2, "0")} total</span>
      </div>

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
            New projects will appear here soon.
          </p>

        </div>

      ) : (
        <div className="project-groups">
          <ProjectGroup
            title="Major Projects"
            description="End-to-end applications built to solve practical problems."
            projects={projects.filter((project) => project.type === "major")}
            kicker="WEB DEVELOPMENT · FEATURED WORK"
          />
          {projects.some((project) => project.type === "mini") && (
            <details className="project-archive">
              <summary>
                <span className="project-archive-copy">
                  <strong>More projects</strong>
                  <span>Mini builds, experiments, and analytics projects</span>
                </span>
                <span className="project-archive-action">
                  Show {projects.filter((project) => project.type === "mini").length} projects
                  <ChevronDown size={16} aria-hidden="true" />
                </span>
              </summary>
              <ProjectGroup
                title="Mini Projects"
                description="Smaller web builds and supporting data explorations."
                projects={projects.filter((project) => project.type === "mini")}
                kicker="MORE FROM THE WORKBENCH"
              />
            </details>
          )}
          {projects.some((project) => !["major", "mini"].includes(project.type)) && (
            <ProjectGroup
              title="Other Projects"
              description="Additional projects and experiments."
              projects={projects.filter((project) => !["major", "mini"].includes(project.type))}
              kicker="MORE WORK"
            />
          )}
        </div>
      )}

    </Section>
  );
}