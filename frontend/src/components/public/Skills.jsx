import React, { useMemo, useState, useEffect } from "react";

import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaJava,
  FaPython,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiMysql,
  SiKubernetes,
  SiTailwindcss,
  SiPostman,
  SiVite,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiFirebase,
  SiBootstrap,
  SiNpm,
  SiCplusplus,
} from "react-icons/si";

import {
  Layers,
  Radar,
  Sparkles,
} from "lucide-react";

import Section from "../common/Section";
import Card from "../common/Card";

import { c, display } from "../../utils/constants";


// =====================================================
// TECHNOLOGY CONFIG
// =====================================================

const TECH_CONFIG = {

  // ================= FRONTEND =================

  React: {
    icon: FaReact,
    color: "#61DAFB",
  },

  "React.js": {
    icon: FaReact,
    color: "#61DAFB",
  },

  JavaScript: {
    icon: FaJs,
    color: "#F7DF1E",
  },

  "JavaScript (ES6)": {
    icon: FaJs,
    color: "#F7DF1E",
  },

  JS: {
    icon: FaJs,
    color: "#F7DF1E",
  },

  TypeScript: {
    icon: SiTypescript,
    color: "#3178C6",
  },

  HTML: {
    icon: FaHtml5,
    color: "#E34F26",
  },

  HTML5: {
    icon: FaHtml5,
    color: "#E34F26",
  },

  CSS: {
    icon: FaCss3Alt,
    color: "#1572B6",
  },

  CSS3: {
    icon: FaCss3Alt,
    color: "#1572B6",
  },

  Tailwind: {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  "Tailwind CSS": {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  TailwindCSS: {
    icon: SiTailwindcss,
    color: "#06B6D4",
  },

  Bootstrap: {
    icon: SiBootstrap,
    color: "#7952B3",
  },

  "Bootstrap 5": {
    icon: SiBootstrap,
    color: "#7952B3",
  },

  Redux: {
    icon: SiRedux,
    color: "#764ABC",
  },

  "Next.js": {
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },

  Vite: {
    icon: SiVite,
    color: "#646CFF",
  },

  EJS: {
    icon: Layers,
    color: "#B4CA65",
  },


  // ================= BACKEND =================

  "Node.js": {
    icon: FaNodeJs,
    color: "#339933",
  },

  Node: {
    icon: FaNodeJs,
    color: "#339933",
  },

  Express: {
    icon: SiExpress,
    color: "#FFFFFF",
  },

  "Express.js": {
    icon: SiExpress,
    color: "#FFFFFF",
  },

  "REST API": {
    icon: Radar,
    color: "#A78BFA",
  },

  REST: {
    icon: Radar,
    color: "#A78BFA",
  },


  // ================= DATABASE =================

  MongoDB: {
    icon: SiMongodb,
    color: "#47A248",
  },

  MySQL: {
    icon: SiMysql,
    color: "#4479A1",
  },

  SQL: {
    icon: SiMysql,
    color: "#4479A1",
  },


  // ================= PROGRAMMING =================

  Java: {
    icon: FaJava,
    color: "#ED8B00",
  },

  Python: {
    icon: FaPython,
    color: "#3776AB",
  },

  "C++": {
    icon: SiCplusplus,
    color: "#00599C",
  },


  // ================= DEVOPS =================

  Docker: {
    icon: FaDocker,
    color: "#2496ED",
  },

  Kubernetes: {
    icon: SiKubernetes,
    color: "#326CE5",
  },


  // ================= GIT =================

  Git: {
    icon: FaGitAlt,
    color: "#F05032",
  },

  GitHub: {
    icon: FaGithub,
    color: "#FFFFFF",
  },


  // ================= TOOLS =================

  Postman: {
    icon: SiPostman,
    color: "#FF6C37",
  },

  NPM: {
    icon: SiNpm,
    color: "#CB3837",
  },

  npm: {
    icon: SiNpm,
    color: "#CB3837",
  },

  Firebase: {
    icon: SiFirebase,
    color: "#FFCA28",
  },
};

const GROUP_COLORS = {

  frontend: "#61DAFB",

  backend: "#339933",

  database: "#47A248",

  devops: "#F05032",

  "devops-tools": "#F05032",

  tools: "#FF6C37",

  "tools-platforms": "#FF6C37",

  dsa: "#A78BFA",

  languages: "#F7DF1E",

  "other-technologies": "#A78BFA",

};


// =====================================================
// DEFAULT SKILLS
// =====================================================

const DEFAULT_SKILLS = [

  {
    id: "frontend",
    group: "Frontend",
    accent: "#61DAFB",

    items: [
      {
        name: "React",
        level: 85,
      },
      {
        name: "JavaScript",
        level: 82,
      },
      {
        name: "HTML",
        level: 90,
      },
      {
        name: "CSS",
        level: 85,
      },
      {
        name: "Tailwind CSS",
        level: 78,
      },
      {
        name: "Redux",
        level: 70,
      },
    ],
  },

  {
    id: "backend",
    group: "Backend",
    accent: "#339933",

    items: [
      {
        name: "Node.js",
        level: 82,
      },
      {
        name: "Express",
        level: 80,
      },
      {
        name: "REST API",
        level: 78,
      },
    ],
  },

  {
    id: "database",
    group: "Database",
    accent: "#47A248",

    items: [
      {
        name: "MongoDB",
        level: 82,
      },
      {
        name: "MySQL",
        level: 72,
      },
      {
        name: "SQL",
        level: 75,
      },
    ],
  },

  {
    id: "devops",
    group: "DevOps & Tools",
    accent: "#F05032",

    items: [
      {
        name: "Git",
        level: 85,
      },
      {
        name: "GitHub",
        level: 85,
      },
      {
        name: "Docker",
        level: 65,
      },
      {
        name: "Kubernetes",
        level: 55,
      },
      {
        name: "Postman",
        level: 80,
      },
    ],
  },
];


// =====================================================
// GET GROUP COLOR
// =====================================================

function getGroupAccent(group) {

  if (!group) {
    return c.violet;
  }

  const id = String(group.id || "")
    .toLowerCase()
    .trim();

  const name = String(group.group || "")
    .toLowerCase()
    .trim();


  // First check ID

  if (GROUP_COLORS[id]) {
    return GROUP_COLORS[id];
  }


  // Then check name

  if (
    name.includes("front")
  ) {
    return GROUP_COLORS.frontend;
  }

  if (
    name.includes("back")
  ) {
    return GROUP_COLORS.backend;
  }

  if (
    name.includes("database") ||
    name.includes("db")
  ) {
    return GROUP_COLORS.database;
  }

  if (
    name.includes("devops")
  ) {
    return GROUP_COLORS.devops;
  }

  if (
    name.includes("tool")
  ) {
    return GROUP_COLORS.tools;
  }

  if (
    name.includes("dsa")
  ) {
    return GROUP_COLORS.dsa;
  }

  if (
    name.includes("language")
  ) {
    return GROUP_COLORS.languages;
  }


  return c.violet;
}


// =====================================================
// NORMALIZE SKILL
// =====================================================

function normalizeSkill(skill) {

  if (typeof skill === "string") {

    return {
      name: skill,
      level: 75,
    };

  }

  return {
    ...skill,

    name:
      skill?.name ||
      skill?.technology ||
      skill?.title ||
      "Unknown",

    level:
      Number(
        skill?.level ??
        skill?.percentage ??
        skill?.proficiency ??
        75
      ),
  };
}


// =====================================================
// NORMALIZE GROUP
// =====================================================

function normalizeGroup(group, index) {

  return {

    ...group,

    id:
      group?.id ||
      group?._id ||
      `group-${index}`,

    group:
      group?.group ||
      group?.name ||
      group?.title ||
      "Other",

    accent:
      getGroupAccent(group),

    items:
      (
        group?.items ||
        group?.skills ||
        group?.technologies ||
        []
      ).map(normalizeSkill),

  };

}


// =====================================================
// RADAR CONSTANTS
// =====================================================

const SIZE = 360;

const CENTER = SIZE / 2;

const R_MAX = 108;

const RINGS = [
  0.25,
  0.5,
  0.75,
  1,
];


// =====================================================
// RADAR HELPERS
// =====================================================

function pointOn(angle, radius) {

  return {

    x:
      CENTER +
      radius *
        Math.sin(angle),

    y:
      CENTER -
      radius *
        Math.cos(angle),

  };

}


function polygonPoints(items, radiusFn) {

  const n = items.length;

  if (!n) {
    return "";
  }

  return items

    .map((item, index) => {

      const angle =
        (2 * Math.PI * index) /
        n;

      const point =
        pointOn(
          angle,
          radiusFn(item)
        );

      return `${point.x},${point.y}`;

    })

    .join(" ");

}


// =====================================================
// RADAR CHART
// =====================================================

function RadarChart({
  group,
  hovered,
  setHovered,
}) {

  const items =
    group.items.map(normalizeSkill);

  const n =
    items.length;

  const accent =
    getGroupAccent(group);


  if (!n) {
    return null;
  }


  const dataPoints =
    polygonPoints(
      items,
      (item) =>
        (item.level / 100) *
        R_MAX
    );


  return (

    <div
      className="skill-radar"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        margin: "0 auto",
      }}
    >

      {/* ================= SVG ================= */}

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          width: "100%",
          height: "auto",
          overflow: "visible",
        }}
      >

        <defs>

          <radialGradient
            id={`radar-fill-${group.id}`}
            cx="50%"
            cy="50%"
            r="65%"
          >

            <stop
              offset="0%"
              stopColor={accent}
              stopOpacity="0.35"
            />

            <stop
              offset="65%"
              stopColor={accent}
              stopOpacity="0.14"
            />

            <stop
              offset="100%"
              stopColor={accent}
              stopOpacity="0.02"
            />

          </radialGradient>


          <filter
            id={`radar-glow-${group.id}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >

            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>

              <feMergeNode
                in="blur"
              />

              <feMergeNode
                in="SourceGraphic"
              />

            </feMerge>

          </filter>

        </defs>


        {/* ================= GRID ================= */}

        {RINGS.map((ring) => (

          <polygon
            key={ring}
            points={polygonPoints(
              items,
              () =>
                ring * R_MAX
            )}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

        ))}


        {/* ================= AXIS ================= */}

        {items.map(
          (item, index) => {

            const angle =
              (2 * Math.PI * index) /
              n;

            const point =
              pointOn(
                angle,
                R_MAX
              );

            return (

              <line
                key={`axis-${item.name}`}
                x1={CENTER}
                y1={CENTER}
                x2={point.x}
                y2={point.y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />

            );

          }
        )}


        {/* ================= DATA AREA ================= */}

        <polygon
          points={dataPoints}
          fill={`url(#radar-fill-${group.id})`}
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
          filter={`url(#radar-glow-${group.id})`}
          className="skill-radar-shape"
        />


        {/* ================= POINTS ================= */}

        {items.map(
          (item, index) => {

            const angle =
              (2 * Math.PI * index) /
              n;

            const point =
              pointOn(
                angle,
                (item.level / 100) *
                  R_MAX
              );

            const active =
              hovered === index;

            return (

              <circle
                key={item.name}
                cx={point.x}
                cy={point.y}
                r={
                  active
                    ? 7
                    : 4.5
                }
                fill={
                  c.bg ||
                  "#0d0d12"
                }
                stroke={accent}
                strokeWidth="2"
                style={{
                  cursor: "pointer",
                  transition:
                    "all 0.2s ease",
                }}
                onMouseEnter={() =>
                  setHovered(index)
                }
                onMouseLeave={() =>
                  setHovered(null)
                }
              />

            );

          }
        )}


        {/* ================= CENTER ================= */}

        <circle
          cx={CENTER}
          cy={CENTER}
          r="49"
          fill="rgba(10,10,15,0.95)"
          stroke={`${accent}55`}
          strokeWidth="1"
        />

        <circle
          cx={CENTER}
          cy={CENTER}
          r="42"
          fill="none"
          stroke={`${accent}20`}
          strokeWidth="1"
        />


        {/* ================= OVERALL ================= */}

        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          fontSize="25"
          fontWeight="700"
          fill={accent}
          style={display}
        >

          {Math.round(
            items.reduce(
              (sum, item) =>
                sum +
                Number(
                  item.level
                ),
              0
            ) / n
          )}

          %

        </text>


        <text
          x={CENTER}
          y={CENTER + 16}
          textAnchor="middle"
          fontSize="9"
          fill={c.muted}
          style={display}
        >
          OVERALL
        </text>

      </svg>


      {/* ================= LABELS ================= */}

      {items.map(
        (item, index) => {

          const angle =
            (2 * Math.PI * index) /
            n;

          const labelPoint =
            pointOn(
              angle,
              R_MAX + 43
            );


          const config =
            TECH_CONFIG[
              item.name
            ];


          const Icon =
            config?.icon ||
            Layers;


          const iconColor =
            config?.color ||
            accent;


          let transform =
            "translate(-50%, -50%)";


          if (
            labelPoint.x <
            CENTER - 20
          ) {

            transform =
              "translate(-100%, -50%)";

          }


          if (
            labelPoint.x >
            CENTER + 20
          ) {

            transform =
              "translate(0%, -50%)";

          }


          const active =
            hovered === index;


          return (

            <div
              key={item.name}
              style={{

                position:
                  "absolute",

                left:
                  `${(labelPoint.x / SIZE) * 100}%`,

                top:
                  `${(labelPoint.y / SIZE) * 100}%`,

                transform,

                display:
                  "flex",

                alignItems:
                  "center",

                gap: 6,

                padding:
                  "5px 8px",

                borderRadius: 7,

                background:
                  active
                    ? `${iconColor}18`
                    : "rgba(10,10,15,0.72)",

                border:
                  `1px solid ${
                    active
                      ? `${iconColor}55`
                      : "rgba(255,255,255,0.06)"
                  }`,

                whiteSpace:
                  "nowrap",

                transition:
                  "all 0.2s ease",

                cursor:
                  "default",

                boxShadow:
                  active
                    ? `0 0 15px ${iconColor}18`
                    : "none",

                ...display,

              }}

              onMouseEnter={() =>
                setHovered(index)
              }

              onMouseLeave={() =>
                setHovered(null)
              }
            >

              <Icon
                size={15}
                color={iconColor}
              />

              <span
                style={{
                  fontSize: 10.5,

                  color:
                    active
                      ? c.textBright
                      : c.muted,

                  fontWeight:
                    active
                      ? 600
                      : 400,
                }}
              >
                {item.name}
              </span>

            </div>

          );

        }
      )}


      {/* ================= TOOLTIP ================= */}

      {hovered !== null && items[hovered] && (

        <div
          style={{

            position:
              "absolute",

            left:
              "50%",

            bottom:
              0,

            transform:
              "translateX(-50%)",

            display:
              "flex",

            alignItems:
              "center",

            gap: 8,

            padding:
              "7px 12px",

            background:
              "rgba(12,12,18,0.97)",

            border:
              `1px solid ${accent}55`,

            borderRadius:
              8,

            boxShadow:
              "0 8px 25px rgba(0,0,0,0.4)",

            fontSize:
              12,

            whiteSpace:
              "nowrap",

            zIndex:
              20,

          }}
        >

          <span
            style={{
              color:
                c.textBright,
              fontWeight:
                600,
            }}
          >
            {
              items[
                hovered
              ].name
            }
          </span>


          <span
            style={{
              color:
                TECH_CONFIG[
                  items[
                    hovered
                  ].name
                ]?.color ||
                accent,

              fontWeight:
                700,
            }}
          >

            {
              items[
                hovered
              ].level
            }

            %

          </span>

        </div>

      )}

    </div>

  );

}


// =====================================================
// SKILL DETAILS
// =====================================================

function SkillDetails({
  group,
}) {

  const items =
    group.items
      .map(normalizeSkill)
      .sort(
        (a, b) =>
          b.level -
          a.level
      );


  const groupAccent =
    getGroupAccent(group);


  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 11,
      }}
    >

      {items.map(
        (skill, index) => {

          const config =
            TECH_CONFIG[
              skill.name
            ];


          const Icon =
            config?.icon ||
            Layers;


          const iconColor =
            config?.color ||
            groupAccent;


          return (

            <div
              key={skill.name}
              style={{
                padding:
                  "11px 12px",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                borderRadius:
                  10,

                background:
                  "rgba(255,255,255,0.025)",
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  marginBottom:
                    7,
                }}
              >

                <div
                  style={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: 8,

                    ...display,
                  }}
                >

                  <Icon
                    size={17}
                    color={
                      iconColor
                    }
                  />

                  <span
                    style={{
                      color:
                        c.textBright,

                      fontSize:
                        12,
                    }}
                  >
                    {skill.name}
                  </span>

                </div>


                <span
                  style={{
                    color:
                      iconColor,

                    fontSize:
                      11,

                    fontWeight:
                      700,
                  }}
                >
                  {skill.level}%
                </span>

              </div>


              {/* PROGRESS */}

              <div
                style={{
                  width:
                    "100%",

                  height:
                    4,

                  borderRadius:
                    10,

                  overflow:
                    "hidden",

                  background:
                    "rgba(255,255,255,0.07)",
                }}
              >

                <div
                  style={{
                    width:
                      `${skill.level}%`,

                    height:
                      "100%",

                    borderRadius:
                      10,

                    background:
                      iconColor,

                    boxShadow:
                      `0 0 8px ${iconColor}55`,

                    animation:
                      `skillBar 0.8s ease ${index * 0.08}s both`,
                  }}
                />

              </div>

            </div>

          );

        }
      )}

    </div>

  );

}


// =====================================================
// MAIN SKILLS
// =====================================================

export default function Skills({
  skills,
}) {

  
  const skillGroups =
    useMemo(() => {

      const source =
        skills?.length
          ? skills
          : DEFAULT_SKILLS;

      return source.map(
        normalizeGroup
      );

    }, [skills]);


  const [
    activeId,
    setActiveId,
  ] = useState(
    skillGroups[0]?.id
  );


  const [
    hovered,
    setHovered,
  ] = useState(null);



  useEffect(() => {

    if (!skillGroups.length) {
      return;
    }

    const exists =
      skillGroups.some(
        (group) =>
          group.id === activeId
      );

    if (!exists) {

      setActiveId(
        skillGroups[0].id
      );

    }

  }, [
    skillGroups,
    activeId,
  ]);


  const activeGroup =
    skillGroups.find(
      (group) =>
        group.id === activeId
    ) ||
    skillGroups[0];


  const overall =
    useMemo(() => {

      if (!activeGroup) {
        return 0;
      }


      const values =
        activeGroup.items.map(
          (skill) =>
            Number(
              skill.level
            )
        );


      if (!values.length) {
        return 0;
      }


      return Math.round(

        values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) /
          values.length

      );

    }, [
      activeGroup,
    ]);


  if (!activeGroup) {
    return null;
  }


  const activeAccent =
    getGroupAccent(
      activeGroup
    );


  return (

    <Section
      id="skills"
      commit="package.json"
      label="Skills & Technologies"
    >
      <div className="skills-fullscreen">

      <style>{`

        /* =====================================
           RADAR ANIMATION
        ====================================== */

        @keyframes radarGrow {

          from {

            transform:
              scale(0.15);

            opacity:
              0;

          }

          to {

            transform:
              scale(1);

            opacity:
              1;

          }

        }


        .skill-radar-shape {

          transform-origin:
            180px 180px;

          animation:
            radarGrow
            0.8s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );

        }


        /* =====================================
           PROGRESS BAR
        ====================================== */

        @keyframes skillBar {

          from {

            transform:
              scaleX(0);

            transform-origin:
              left;

          }

          to {

            transform:
              scaleX(1);

            transform-origin:
              left;

          }

        }


        /* =====================================
           CATEGORY TAB
        ====================================== */

        .skill-tab {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          padding:
            8px 14px;

          border-radius:
            999px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          background:
            transparent;

          color:
            ${c.muted};

          font-size:
            12px;

          cursor:
            pointer;

          transition:
            all
            0.2s
            ease;

        }


        .skill-tab:hover {

          color:
            ${c.textBright};

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

        }


        .skill-tab.active {

          color:
            ${c.textBright};

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

        }


        /* =====================================
           MOBILE
        ====================================== */

        @media (
          max-width: 700px
        ) {

          .skill-radar {

            max-width:
              330px !important;

          }

        }

      `}</style>


      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",

          alignItems:
            "flex-end",

          gap:
            20,

          marginBottom:
            18,

          flexWrap:
            "wrap",
        }}
      >

        </div>


      {/* =================================================
          CATEGORY BUTTONS
      ================================================= */}

      <div
        style={{
          display:
            "flex",

          flexWrap:
            "wrap",

          gap:
            8,

          marginBottom:
            16,
        }}
      >

        {skillGroups.map(
          (group) => {

            const active =
              group.id ===
              activeGroup.id;


            const groupAccent =
              getGroupAccent(
                group
              );


            return (

              <button
                key={
                  group.id
                }
                type="button"
                className={
                  `skill-tab ${
                    active
                      ? "active"
                      : ""
                  }`
                }
                onClick={() => {

                  setActiveId(
                    group.id
                  );

                  setHovered(
                    null
                  );

                }}
                style={{
                  borderColor:
                    active
                      ? `${groupAccent}66`
                      : undefined,
                }}
              >

                <Radar
                  size={13}
                  color={
                    active
                      ? groupAccent
                      : c.muted
                  }
                />

                {
                  group.group
                }

              </button>

            );

          }
        )}

      </div>


      {/* =================================================
          DASHBOARD CARD
      ================================================= */}

      <Card>

        <div
          className="grid lg:grid-cols-2 gap-6"
          style={{
            alignItems:
              "center",
          }}
        >

          {/* ================= RADAR ================= */}

          <div>

            <div
              style={{
                textAlign:
                  "center",

                marginBottom:
                  5,
              }}
            >

              <div
                style={{
                  color:
                    activeAccent,

                  fontSize:
                    13,

                  fontWeight:
                    700,

                  letterSpacing:
                    "0.08em",

                  textTransform:
                    "uppercase",
                }}
              >

                {
                  activeGroup.group
                }

              </div>


              <div
                style={{
                  color:
                    c.muted,

                  fontSize:
                    11,

                  marginTop:
                    3,
                }}
              >
                Overall proficiency
              </div>

            </div>


            <RadarChart
              group={
                activeGroup
              }
              hovered={
                hovered
              }
              setHovered={
                setHovered
              }
            />

          </div>


          {/* ================= DETAILS ================= */}

          <div>

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                marginBottom:
                  15,
              }}
            >

              <div
                style={{
                  color:
                    c.textBright,

                  fontWeight:
                    600,

                  fontSize:
                    13,
                }}
              >
                Skill Breakdown
              </div>


              <div
                style={{
                  fontSize:
                    12,

                  fontWeight:
                    700,

                  color:
                    activeAccent,
                }}
              >

                {overall}%
                {" "}
                overall

              </div>

            </div>


            <SkillDetails
              group={
                activeGroup
              }
            />

          </div>

        </div>

      </Card>


      {/* =================================================
          FOOTNOTE
      ================================================= */}

      <div
        style={{
          marginTop:
            14,

          textAlign:
            "center",

          color:
            c.muted,

          fontSize:
            10.5,

          ...display,
        }}
      >

        * Percentages represent self-assessed
        proficiency and hands-on experience.

      </div>

      </div>

    </Section>

  );

}