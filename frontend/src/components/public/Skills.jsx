import React from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import Section from "../common/Section";
import { DEFAULTS } from "../../utils/constants";

const CATEGORY_DETAILS = {
  frontend: {
    title: "Frontend development",
    description: "Building responsive, user-focused web interfaces.",
    icon: Layers3,
    focus: "CORE FOCUS",
    projects: ["home-mitra", "skynest", "zerodha-clone"],
  },
  backend: {
    title: "Backend development",
    description: "Connecting interfaces to APIs, application logic, and services.",
    icon: Code2,
    focus: "CORE FOCUS",
    projects: ["home-mitra", "skynest", "student-crud"],
  },
  database: {
    title: "Databases",
    description: "Working with relational and document-oriented data stores.",
    icon: Database,
    focus: "CORE FOCUS",
    projects: ["home-mitra", "skynest", "nexora-trading-platform"],
  },
  "programming-languages": {
    title: "Programming languages",
    description: "Languages used across application development and coursework.",
    icon: TerminalSquare,
    focus: "FOUNDATIONS",
    projects: [],
  },
  "core-computer-science": {
    title: "Computer science foundations",
    description: "Data structures, algorithms, OOP, DBMS, networks, and operating systems.",
    icon: Code2,
    focus: "FOUNDATIONS",
    projects: [],
  },
  "data-analytics-ml": {
    title: "AI, ML & data analytics",
    description: "Supporting interests in data preparation, analysis, and machine learning.",
    icon: BrainCircuit,
    focus: "SUPPORTING FOCUS",
    projects: [
      "student-performance-analytics-dashboard",
      "credit-wise-loan-approval",
      "house-price-prediction",
      "road-accident-analysis-dashboard",
      "meesho-sales-overview-dashboard",
    ],
  },
  "tools-platforms": {
    title: "Tools & platforms",
    description: "Tools used to build, test, version, and deploy projects.",
    icon: Wrench,
    focus: "WORKFLOW",
    projects: ["skynest", "home-mitra", "zerodha-clone"],
  },
};

function SkillCategory({ group }) {
  const details = CATEGORY_DETAILS[group.id] || {
    title: group.group,
    description: "Technologies included in my development toolkit.",
    icon: Code2,
    focus: "TOOLKIT",
    projects: [],
  };
  const Icon = details.icon;
  const relatedProjects = DEFAULTS.projects.filter((project) =>
    details.projects.includes(project.id)
  );

  return (
    <article className={`skills-category-card skills-category-${details.focus.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="skills-category-heading">
        <span className="skills-category-icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <div>
          <span className="skills-category-focus">{details.focus}</span>
          <h3>{details.title}</h3>
        </div>
      </div>

      <p className="skills-category-description">{details.description}</p>

      <ul className="skills-chip-list" aria-label={details.title}>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {relatedProjects.length > 0 && (
        <div className="skills-project-evidence">
          <span>Used in projects</span>
          <div>
            {relatedProjects.map((project) => (
              <a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function Skills({ skills = [] }) {
  const orderedGroups = [...skills].sort((first, second) => {
    const order = [
      "frontend",
      "backend",
      "database",
      "programming-languages",
      "core-computer-science",
      "data-analytics-ml",
      "tools-platforms",
    ];
    return order.indexOf(first.id) - order.indexOf(second.id);
  });

  return (
    <Section
      id="skills"
      commit="package.json"
      label="Skills & Technologies"
    >
      <div className="skills-catalog">
        <div className="skills-catalog-intro">
          <span>WEB DEVELOPMENT FIRST</span>
          <p>
            Technologies organized by focus, with project examples instead of
            subjective skill scores.
          </p>
        </div>

        <div className="skills-category-grid">
          {orderedGroups.map((group) => (
            <SkillCategory key={group.id} group={group} />
          ))}
        </div>
      </div>
    </Section>
  );
}
