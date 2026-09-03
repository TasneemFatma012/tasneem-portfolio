import React from "react";
import Navbar from "../components/public/Navbar";
import Hero from "../components/public/Hero";
import About from "../components/public/About";
import Skills from "../components/public/Skills";
import Projects from "../components/public/Projects";
import GithubSection from "../components/public/GithubSection";
import Education from "../components/public/Education";
import Certificates from "../components/public/Certificates";
import Experience from "../components/public/Experience";
import ResumeContact from "../components/public/ResumeContact";
import Footer from "../components/public/Footer";

export default function PublicSite({ data, addMessage }) {
  const { profile, skills, projects, education, certificates, experience } = data;

  return (
    <div className="public-site">
      <Navbar name={profile.name} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <GithubSection username={profile.github} />
      <Education education={education} />
      <Certificates certificates={certificates} />
      <Experience experience={experience} />
      <ResumeContact profile={profile} onSendMessage={addMessage} />
      <Footer name={profile.name} />
    </div>
  );
}