import React from "react";
import { ExternalLink, Award } from "lucide-react";
import Section from "../common/Section";
import Card from "../common/Card";
import { c, display, mono } from "../../utils/constants";

export default function Certificates({ certificates }) {
  return (
    <Section
      id="certificates"
      commit="certs/*.pdf"
      label="Certificates & Achievements"
    >

      {certificates.length === 0 ? (

        <p
          style={{
            color: c.muted,
            fontSize: 14
          }}
        >
          No certificates added yet.
        </p>

      ) : (

        <div className="grid sm:grid-cols-2 gap-4">

          {certificates.map((cert) => (

            <Card
              key={cert.id}
              style={{
                position: "relative",
                overflow: "hidden"
              }}
            >

              {/* Top Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14
                }}
              >

                {/* Certificate Icon */}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: `${c.violet}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Award
                    size={21}
                    color={c.violet}
                  />
                </div>


                {/* Certificate Details */}
                <div style={{ flex: 1 }}>

                  <div
                    style={{
                      ...display,
                      fontWeight: 600,
                      color: c.textBright || c.text,
                      fontSize: 15
                    }}
                  >
                    {cert.title}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: c.muted,
                      marginTop: 6
                    }}
                  >
                    {cert.org}
                  </div>

                  <div
                    style={{
                      ...mono,
                      fontSize: 11,
                      color: c.muted,
                      marginTop: 5
                    }}
                  >
                    {cert.date}
                  </div>

                </div>

              </div>


              {/* View Certificate */}
              {cert.url && (

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 18,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: c.violet,
                    textDecoration: "none",
                    fontWeight: 500
                  }}
                >
                  View Certificate
                  <ExternalLink size={13} />
                </a>

              )}

            </Card>

          ))}

        </div>

      )}

    </Section>
  );
}