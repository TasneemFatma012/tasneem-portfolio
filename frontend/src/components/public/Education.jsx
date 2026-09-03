import React from "react";
import Section from "../common/Section";
import { c, display, mono } from "../../utils/constants";

export default function Education({ education }) {
  return (
    <Section id="education" commit="log --oneline" label="Education">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {education.map((e) => (
          <div key={e.id} style={{ display: "flex", gap: 16 }}>
            <div style={{ ...mono, width: 110, flexShrink: 0, fontSize: 12, color: c.teal, paddingTop: 4 }}>{e.years}</div>
            <div style={{ flex: 1, borderLeft: `1px solid ${c.line}`, paddingLeft: 16, paddingBottom: 4 }}>
              <div style={{ ...display, fontWeight: 600, color: c.text }}>{e.degree}</div>
              <div style={{ fontSize: 14, color: c.muted }}>{e.school}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}