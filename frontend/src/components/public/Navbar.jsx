import React from "react";
import {
  User,
  Code2,
  FolderGit2,
  Github,
  Linkedin,
  BarChart3,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
} from "lucide-react";

import { c } from "../../utils/constants";

const NAV_ITEMS = [
  { name: "About", icon: User, id: "about" },
  { name: "Skills", icon: Code2, id: "skills" },
  { name: "Projects", icon: FolderGit2, id: "projects" },
  { name: "GitHub", icon: Github, id: "github" },
  { name: "LinkedIn", icon: Linkedin, id: "linkedin" },
  { name: "DSA", icon: BarChart3, id: "dsa" },
  { name: "Education", icon: GraduationCap, id: "education" },
  { name: "Certificates", icon: Award, id: "certificates" },
  { name: "Experience", icon: Briefcase, id: "experience" },
  { name: "Resume", icon: FileText, id: "resume" },
];

export default function Navbar({ name }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo / Name */}
   <a href="#about" className="navbar-logo">
     <img src="/TF logo.png" alt="TF Logo" /> 
  </a>

        {/* Navigation */}
        <div
          className="navbar-desktop-links hidden md:flex"
          style={{
            gap: 20,
            fontSize: 12,
            color: c.muted,
            alignItems: "center",
          }}
        >
          {NAV_ITEMS.map(({ name, icon: Icon }) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              className="nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon size={15} strokeWidth={1.8} />
              <span>{name}</span>
            </a>
          ))}
        </div>

        <div className="navbar-mobile-links" aria-label="Portfolio sections">
          {NAV_ITEMS.map(({ name, icon: Icon, id }) => (
            <a key={id} href={`#${id}`} className="navbar-mobile-link">
              <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
              <span>{name}</span>
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}