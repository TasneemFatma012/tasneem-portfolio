import React from "react";
import { ArrowUpRight, BarChart3, Code2, ExternalLink, Target } from "lucide-react";
import Section from "../common/Section";

export default function DsaPerformance({ username }) {
  const profileUrl = username
    ? `https://leetcode.com/u/${encodeURIComponent(username)}/`
    : "https://leetcode.com/";

  return (
    <Section id="dsa" label="DSA Performance">
      <div className="dsa-performance-card">
        <div className="dsa-performance-main">
          <div className="dsa-performance-icon" aria-hidden="true">
            <BarChart3 size={23} />
          </div>

          <div className="dsa-performance-copy">
            <span className="dsa-performance-eyebrow">
              <span className="dsa-status-dot" />
              LEETCODE · JAVA{username ? ` · @${username}` : ""}
            </span>
            <h3>Practicing Data Structures & Algorithms.</h3>
            <p>
              I regularly work through coding problems in Java to build stronger
              algorithmic thinking and problem-solving skills.
            </p>
          </div>

          <a
            className="dsa-platform-link"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit LeetCode profile
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="dsa-focus-list" aria-label="DSA practice focus">
          <div className="dsa-focus-item">
            <span className="dsa-focus-icon" aria-hidden="true"><Code2 size={15} /></span>
            <div><span>LANGUAGE</span><strong>Java</strong></div>
          </div>
          <div className="dsa-focus-item">
            <span className="dsa-focus-icon" aria-hidden="true"><Target size={15} /></span>
            <div><span>FOCUS</span><strong>Data Structures & Algorithms</strong></div>
          </div>
          <div className="dsa-focus-item">
            <span className="dsa-focus-icon" aria-hidden="true"><ExternalLink size={15} /></span>
            <div><span>PLATFORM</span><strong>LeetCode</strong></div>
          </div>
        </div>

        <p className="dsa-stats-note" role="note">
          Problem counts and contest rating are not displayed without verified
          profile data.
        </p>
      </div>
    </Section>
  );
}
