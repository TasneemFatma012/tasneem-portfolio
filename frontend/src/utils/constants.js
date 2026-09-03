export const c = {
  bg: "#090A0A", surface: "#111414", surface2: "#171B19",
  line: "#292E2B", lineSoft: "#292E2B", lineHover: "#3F4640",
  text: "#F5F1E8", textBright: "#F5F1E8", muted: "#969C96",
  mutedSoft: "#6B716B", body: "#C9CDC5",
  violet: "#D8B46A", violetLine: "#5C4B2C", violetBg: "#1A160D",
  blue: "#C7F000", teal: "#C7F000", tealLine: "#3A4512", tealBg: "#14170A",
  danger: "#E36B7A", dangerBg: "#2A1620",
};

export const display = { fontFamily: '"Space Grotesk", sans-serif' };
export const mono = { fontFamily: '"JetBrains Mono", monospace' };

export const gradientText = {
  ...display,
  backgroundImage: `linear-gradient(90deg, ${c.violet}, ${c.blue})`,
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
};
export const gradientBg = { backgroundImage: `linear-gradient(90deg, ${c.violet}, ${c.blue})` };

export const FONT_LINK = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

export const inputStyle = { width: "100%", background: c.bg, border: `1px solid ${c.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, color: c.text, outline: "none" };
export const btnPrimary = { color: "#fff", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 };
export const btnGhost = { background: "transparent", color: c.body, border: `1px solid ${c.line}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 };

export const API_BASE = import.meta.env.VITE_API_URL || "";

export const DEFAULTS = {
  profile: {
    name: "Tasneem",
    title: "Full-Stack Developer · MERN & DevOps",
    tagline: "I build products end to end — React on the front, Node on the back, CI/CD wired underneath.",
    about: "MCA student and full-stack developer focused on the MERN stack. I like owning the whole pipeline: writing the feature, shipping it through GitHub Actions, and watching it land on a live URL. Currently deepening my DevOps practice — Docker, CI/CD, and cloud deployment.",
    email: "tasneemfatma8271@gmail.com", phone: "8271295651", location: "Jamshedpur, India",
    github: "TasneemFatma012", resumeUrl: "/Tasneem-Fatma-CV.pdf", linkedin: "https://www.linkedin.com/in/tasneem-fatma-7933ba344",
  },
  skills: [
    { id: "s1", group: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "EJS"] },
    { id: "s2", group: "Backend", items: ["Node.js", "Express.js"] },
    { id: "s3", group: "Database", items: ["MongoDB", "SQL", "Cloudant"] },
    { id: "s4", group: "DevOps", items: ["Git", "GitHub", "Docker", "GitHub Actions", "CI/CD"] },
  ],
  projects: [
    { id: "p1", name: "SkyNest", desc: "Full-stack booking platform with real-time availability and admin analytics.", stack: "React · Node.js · MongoDB", github: "", live: "", featured: true },
  ],
  education: [
    { id: "e1", years: "2025–2027", degree: "MCA", school: "Arka Jain University" },
    { id: "e2", years: "2020–2023", degree: "BCA", school: "Jamshedpur Women's College" },
    { id: "e3", years: "2018–2020", degree: "Intermediate", school: "Karim City College" },
    { id: "e4", years: "2018", degree: "Class 10", school: "M.O. Academy" },
  ],
  certificates: [],
  experience: [],
};