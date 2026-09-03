import { DEFAULTS } from "./constants";

export const uid = () => Math.random().toString(36).slice(2, 9);

/* ---- profile ---- */
export function toUiProfile(doc) {
  return {
    ...DEFAULTS.profile,
    name: doc?.name || DEFAULTS.profile.name,
    title: doc?.title || DEFAULTS.profile.title,
    tagline: doc?.tagline || DEFAULTS.profile.tagline,
    about: doc?.about || DEFAULTS.profile.about,
    email: doc?.email || DEFAULTS.profile.email,
    phone: doc?.phone || DEFAULTS.profile.phone,
    location: doc?.location || DEFAULTS.profile.location,
    github: doc?.githubUsername || DEFAULTS.profile.github,
    resumeUrl: doc?.resumeUrl || DEFAULTS.profile.resumeUrl,
    linkedin: doc?.linkedinUrl || DEFAULTS.profile.linkedin,
    photoUrl: doc?.photoUrl || "",
  };
}
export function toBackendProfile(profile) {
  return {
    name: profile.name,
    title: profile.title,
    tagline: profile.tagline,
    about: profile.about,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    githubUsername: profile.github,
    linkedinUrl: profile.linkedin,
    resumeUrl: profile.resumeUrl,
    photoUrl: profile.photoUrl,
  };
}

/* ---- skills ---- */
export function toUiSkill(doc) {
  return { id: doc._id, group: doc.group, items: doc.items || [] };
}
export function toBackendSkill(skill) {
  return { group: skill.group?.trim(), items: skill.items || [] };
}

/* ---- projects ---- */
export function toUiProject(doc) {
  return {
    id: doc._id,
    name: doc.name || "",
    description: doc.description || "",
    screenshotUrl: doc.screenshotUrl || "",
    techStack: Array.isArray(doc.techStack) ? doc.techStack : [],
    features: Array.isArray(doc.features) ? doc.features : [],
    githubUrl: doc.githubUrl || "",
    liveUrl: doc.liveUrl || "",
    category: doc.category || "general",
    featured: !!doc.featured,
    published: doc.published !== false,
    order: doc.order || 0,
  };
}

export function toBackendProject(project) {
  return {
    name: project.name,
    description: project.description,
    screenshotUrl: project.screenshotUrl || "",
    techStack: Array.isArray(project.techStack)
      ? project.techStack
      : String(project.techStack || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    features: Array.isArray(project.features) ? project.features : [],
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    category: project.category || "general",
    featured: project.featured,
    published: project.published,
    order: project.order,
  };
}

/* ---- education ---- */
export function toUiEducation(doc) {
  return { id: doc._id, years: doc.years, degree: doc.degree, school: doc.school };
}
export function toBackendEducation(item) {
  return { years: item.years?.trim(), degree: item.degree?.trim(), school: item.school?.trim() };
}

/* ---- certificates ---- */
export function toUiCertificate(doc) {
  return {
    id: doc._id,
    title: doc.title,
    org: doc.organization,
    date: doc.date || "",
    url: doc.credentialUrl || doc.fileUrl || "",
  };
}
export function toBackendCertificate(item) {
  return {
    title: item.title,
    organization: item.org,
    date: item.date,
    credentialUrl: item.url,
    fileUrl: item.url,
  };
}

/* ---- experience ---- */
export function toUiExperience(doc) {
  return {
    id: doc._id,
    company: doc.company,
    position: doc.position,
    duration: doc.duration || "",
    responsibilities: doc.responsibilities || "",
    technologies: doc.technologies || [],
    documentUrl: doc.documentUrl || "",
  };
}
export function toBackendExperience(item) {
  return {
    company: item.company,
    position: item.position,
    duration: item.duration,
    responsibilities: item.responsibilities,
    technologies: item.technologies || [],
    documentUrl: item.documentUrl,
  };
}


export const RESOURCE_MAP = {
  skills: { toUi: toUiSkill, toBackend: toBackendSkill },
  projects: { toUi: toUiProject, toBackend: toBackendProject },
  education: { toUi: toUiEducation, toBackend: toBackendEducation },
  certificates: { toUi: toUiCertificate, toBackend: toBackendCertificate },
  experience: { toUi: toUiExperience, toBackend: toBackendExperience },
};