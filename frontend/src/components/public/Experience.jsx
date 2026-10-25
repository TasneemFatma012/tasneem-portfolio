import React from "react";
import {
  Briefcase,
  Calendar,
  Github,
  TestTube,
  Hammer,
  Rocket,
  ChevronRight,
} from "lucide-react";

import Section from "../common/Section";
import Card from "../common/Card";
import { c, display, mono } from "../../utils/constants";

const PIPELINE_STEPS = [
  {
    name: "GitHub",
    icon: Github
  },
  {
    name: "Actions",
    icon: Rocket
  },
  {
    name: "Test",
    icon: TestTube
  },
  {
    name: "Build",
    icon: Hammer
  },
  {
    name: "Deploy",
    icon: Rocket
  },
  {
    name: "Vercel / Render",
    icon: Rocket
  }
];

export default function Experience({ experience }) {

  return (

    <Section
      id="experience"
      commit="deploy.yml"
      label="Experience & Training"
    >

      {/* EXPERIENCE */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginBottom: 35
        }}
      >

        {experience.length === 0 ? (

          <p
            style={{
              color: c.muted,
              fontSize: 14
            }}
          >
            No experience entries yet.
          </p>

        ) : (

          experience.map((x) => (

            <Card
              key={x.id}
              style={{
                position: "relative"
              }}
            >

              <div
                style={{
                  display: "flex",
                  gap: 16
                }}
              >

                {/* Icon */}

                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: `${c.teal}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >

                  <Briefcase
                    size={20}
                    color={c.teal}
                  />

                </div>


                {/* Details */}

                <div style={{ flex: 1 }}>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8
                    }}
                  >

                    <div>

                      <div
                        style={{
                          ...display,
                          fontWeight: 600,
                          color: c.textBright || c.text,
                          fontSize: 16
                        }}
                      >
                        {x.position}
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          color: c.teal,
                          marginTop: 4
                        }}
                      >
                        {x.company}
                      </div>

                    </div>


                    <div
                      style={{
                        ...mono,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        color: c.muted
                      }}
                    >

                      <Calendar size={12} />

                      {x.duration}

                    </div>

                  </div>


                  {Array.isArray(x.responsibilities) ? (
                    <ul
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: c.muted,
                        margin: "12px 0 0",
                        paddingLeft: 18,
                      }}
                    >
                      {x.responsibilities.map((responsibility) => (
                        <li key={responsibility} style={{ marginTop: 4 }}>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: c.muted,
                        marginTop: 12,
                      }}
                    >
                      {x.responsibilities}
                    </p>
                  )}

                </div>

              </div>

            </Card>

          ))

        )}

      </div>


      {/* DEVOPS PIPELINE */}

      <div>

        <div
          style={{
            ...display,
            fontSize: 15,
            fontWeight: 600,
            color: c.textBright || c.text,
            marginBottom: 14
          }}
        >
          ⚡ CI/CD Workflow
        </div>


        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8
          }}
        >

          {PIPELINE_STEPS.map((step, index) => {

            const Icon = step.icon;

            return (

              <React.Fragment key={step.name}>

                <div
                  style={{
                    ...mono,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,

                    padding: "9px 12px",

                    borderRadius: 10,

                    border: `1px solid ${c.line}`,

                    background: c.surface,

                    color: c.body,

                    fontSize: 11
                  }}
                >

                  <Icon
                    size={13}
                    color={c.teal}
                  />

                  {step.name}

                </div>


                {index < PIPELINE_STEPS.length - 1 && (

                  <ChevronRight
                    size={14}
                    color={c.lineHover}
                  />

                )}

              </React.Fragment>

            );

          })}

        </div>

      </div>

    </Section>

  );
}