
import React from "react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Section from "../common/Section";
import { c } from "../../utils/constants";

export default function About({ profile }) {
  return (
    <Section id="about" commit="README.md" label="About Me">
      <div className="about-modern">
      

        {/* Main Content */}
        <div className="about-grid">

          {/* Monogram */}
          <div className="about-monogram-wrap">
            <div className="about-monogram">
              <span>T</span>
              <span>F</span>
            </div>

            <div className="about-orbit orbit-one" />
            <div className="about-orbit orbit-two" />

            <span className="about-status">
              <span className="status-dot" />
              AVAILABLE
            </span>
          </div>

          {/* Content */}
          <div className="about-content">

            

            <div className="about-description">
              <span className="description-mark">“</span>

              <p>{profile.about}</p>

              <span className="description-mark closing">”</span>
            </div>

            {/* Contact Information */}
            <div className="about-contact-grid">

              {profile.location && (
                <div className="about-contact-card">
                  <div className="contact-icon">
                    <MapPin size={16} strokeWidth={1.5} />
                  </div>

                  <div>
                    <span className="contact-label">LOCATION</span>
                    <span className="contact-value">
                      {profile.location}
                    </span>
                  </div>
                </div>
              )}

              <div className="about-contact-card">
                <div className="contact-icon">
                  <Mail size={16} strokeWidth={1.5} />
                </div>

                <div>
                  <span className="contact-label">EMAIL</span>
                  <span className="contact-value">
                    {profile.email}
                  </span>
                </div>
              </div>

              {profile.phone && (
                <div className="about-contact-card">
                  <div className="contact-icon">
                    <Phone size={16} strokeWidth={1.5} />
                  </div>

                  <div>
                    <span className="contact-label">PHONE</span>
                    <span className="contact-value">
                      {profile.phone}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Signature */}
        <div className="about-footer">
          <span>BUILDING • LEARNING • CREATING</span>
          <span className="about-footer-line" />
          <span>TF / 2026</span>
        </div>

      </div>
    </Section>
  );
}

