import React from "react";
import { ArrowUpRight, Linkedin, Sparkles } from "lucide-react";
import Section from "../common/Section";

export default function LinkedInSection({ profile }) {
  const linkedinUrl = profile.linkedin;

  return (
    <Section id="linkedin" label="LinkedIn">
      <div className="linkedin-card">
        <div className="linkedin-card-mark" aria-hidden="true">
          <Linkedin size={25} />
        </div>

        <div className="linkedin-card-content">
          <span className="linkedin-eyebrow">
            <Sparkles size={13} />
            PROFESSIONAL NETWORK
          </span>
          <h3>Let’s connect professionally.</h3>
          <p>
            View my professional profile, follow my journey, and connect with
            me on LinkedIn.
          </p>
          {linkedinUrl && (
            <a
              className="linkedin-profile-url"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedinUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          )}
        </div>

        {linkedinUrl ? (
          <a
            className="linkedin-profile-button"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit LinkedIn profile
            <ArrowUpRight size={16} />
          </a>
        ) : (
          <p className="linkedin-unavailable" role="status">
            LinkedIn profile link is not available yet.
          </p>
        )}
      </div>
    </Section>
  );
}
