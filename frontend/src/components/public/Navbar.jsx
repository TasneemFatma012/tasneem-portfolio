import React from "react";
import {
  User,
  Code2,
  FolderGit2,
  Github,
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
  { name: "Github", icon: Github, id: "github" },
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
          className="hidden md:flex"
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

      </div>
    </nav>
  );
}