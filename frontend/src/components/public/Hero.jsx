import React from "react";
import { Download } from "lucide-react";

export default function Hero({ profile }) {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-glow-purple" />
      <div className="hero-glow-blue" />
      <div className="hero-inner">
        <h1 className="hero-title">
          Hi, I'm {profile.name}.<br />
          <span>{profile.title}</span>
        </h1>
        <p className="hero-copy">{profile.tagline}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary" style={{ textDecoration: "none" }}>View projects</a>
          <a href="/Tasneem-Fatma-CV.pdf" className="btn-ghost" style={{ textDecoration: "none" }}>
            <Download size={15} /> Resume
          </a>
        </div>
      </div>
    </header>
  );
}