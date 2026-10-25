import React from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Download,
  Sparkles,
} from "lucide-react";

export default function Hero({ profile }) {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-glow-purple" />
      <div className="hero-glow-blue" />
      <div className="hero-inner">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-intro-label">
              <span className="hero-live-dot" />
              PORTFOLIO · DEVELOPER
            </div>

            <p className="hero-greeting">Hello, I’m</p>
            <h1 className="hero-headline">
              {profile.name}
              <span className="hero-headline-mark">.</span>
            </h1>
            <p className="hero-role">{profile.title}</p>
            <p className="hero-description">{profile.tagline}</p>

            <div className="hero-focus-tags" aria-label="Areas of focus">
              <span><Code2 size={13} /> Full-Stack Web</span>
              <span><Sparkles size={13} /> AI / ML · Supporting</span>
              <span><Braces size={13} /> DSA · Java</span>
            </div>

            <div className="hero-cta-row">
              <a href="#projects" className="btn-primary hero-project-link">
                Explore my work
                <ArrowRight size={16} />
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  className="btn-ghost hero-resume-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={15} />
                  View resume
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            {profile.location && (
              <p className="hero-location">
                <span aria-hidden="true">↳</span>
                Based in {profile.location}
              </p>
            )}
          </div>

          <div className="hero-showcase" aria-label="Developer focus areas">
            <div className="hero-showcase-orbit hero-showcase-orbit-outer" />
            <div className="hero-showcase-orbit hero-showcase-orbit-inner" />
            <div className="hero-showcase-card">
              <div className="hero-showcase-topbar">
                <span className="hero-showcase-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>ABOUT.ME</span>
                <Braces size={15} />
              </div>

              <div className="hero-showcase-body">
                <div className="hero-monogram" aria-hidden="true">
                  {profile.name.slice(0, 1)}
                  <span />
                </div>
                <span className="hero-showcase-caption">CURIOUS BY DESIGN</span>
                <h2>Ideas into<br />useful experiences.</h2>
                <p>Building for the web. Exploring intelligent solutions.</p>

                <div className="hero-showcase-divider" />
                <span className="hero-showcase-caption">CURRENT TOOLKIT</span>
                <div className="hero-toolkit">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>Python</span>
                  <span>Java</span>
                </div>
              </div>
            </div>
            <div className="hero-float-chip hero-float-chip-top">
              <Sparkles size={14} />
              <span>AI / ML</span>
            </div>
            <div className="hero-float-chip hero-float-chip-bottom">
              <Code2 size={14} />
              <span>Full-Stack</span>
            </div>
          </div>
        </div>

        <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About Me">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
      </div>
    </header>
  );
}