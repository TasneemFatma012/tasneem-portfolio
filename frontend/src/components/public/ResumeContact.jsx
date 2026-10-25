import React from "react";
import {
  Download,
  FileText,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import Section from "../common/Section";
import ContactForm from "./ContactForm";

export default function ResumeContact({
  profile,
}) {
  return (
    <Section
      id="resume"
      commit="CONTACT.md"
      label="Resume + Contact"
    >
      <div className="resume-contact-modern">

        {/* =====================================
            RESUME CARD
        ====================================== */}
        <div className="resume-modern-card">

          <div className="resume-card-top">
            <div className="resume-icon">
              <FileText size={21} />
            </div>

            <span className="resume-index">
              01 / RESUME
            </span>
          </div>

          <div className="resume-content">

            <span className="resume-eyebrow">
              PROFESSIONAL PROFILE
            </span>

            <h3>
              Let my work
              <br />
              <span>speak for itself.</span>
            </h3>

            <p>
              Explore my technical skills, projects, experience,
              and development journey through my latest resume.
            </p>

          </div>

          {/* Resume Information */}
          <div className="resume-meta">

            <div className="resume-meta-item">
              <span>ROLE</span>
              <strong>Full-Stack Developer</strong>
            </div>

            <div className="resume-meta-item">
              <span>FOCUS</span>
              <strong>Web · React · Node.js</strong>
            </div>

          </div>

          {/* Resume Buttons */}
          {profile.resumeUrl ? (
            <div className="resume-actions">

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="resume-btn resume-btn-outline"
              >
                <FileText size={15} />
                <span>View Resume</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={profile.resumeUrl}
                download
                className="resume-btn resume-btn-gold"
              >
                <Download size={15} />
                <span>Download</span>
              </a>

            </div>
          ) : (
            <p className="resume-unavailable">
              Resume not uploaded yet.
            </p>
          )}

        </div>


        {/* =====================================
            CONTACT CARD
        ====================================== */}
        <div className="contact-modern-card">

          <div className="contact-header">

            <div className="contact-title-row">

              <div className="contact-icon">
                <Mail size={19} />
              </div>

              <div>
                <span className="contact-eyebrow">
                  OPEN TO OPPORTUNITIES
                </span>

                <h3>
                  Let's build something.
                </h3>
              </div>

            </div>

            <Sparkles
              size={18}
              className="contact-spark"
            />

          </div>

          <p className="contact-description">
            Have a project, opportunity, or idea in mind?
            Send me a message and let's connect.
          </p>

          <div className="contact-file-label">
            <span className="contact-dot" />
            CONTACT.md
          </div>

          <ContactForm
            email={profile.email}
          />

        </div>

      </div>


      {/* =====================================
          FOOTER
      ====================================== */}
      <div className="resume-contact-footer">

        <span>
          AVAILABLE FOR SELECTED OPPORTUNITIES
        </span>

        <span className="footer-line" />

        <span>
          TF / 2026
        </span>

      </div>

    </Section>
  );
}
