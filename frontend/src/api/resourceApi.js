import { apiFetch } from "./apiFetch";
import { isValidMongoId } from "../utils/validators";

import {
  RESOURCE_MAP,
  toUiProfile,
  toUiSkill,
  toUiProject,
  toUiEducation,
  toUiCertificate,
  toUiExperience,
} from "../utils/transformers";


// =====================================================
// FETCH ALL SITE DATA
// =====================================================

export async function fetchSiteData() {
  const [
    profile,
    skills,
    projects,
    education,
    certificates,
    experience,
  ] = await Promise.all([
    apiFetch("/api/profile"),
    apiFetch("/api/skills"),
    apiFetch("/api/projects"),
    apiFetch("/api/education"),
    apiFetch("/api/certificates"),
    apiFetch("/api/experience"),
  ]);

  return {
    profile: toUiProfile(profile),

    skills: Array.isArray(skills)
      ? skills.map(toUiSkill)
      : [],

    projects: Array.isArray(projects)
      ? projects.map(toUiProject)
      : [],

    education: Array.isArray(education)
      ? education.map(toUiEducation)
      : [],

    certificates: Array.isArray(certificates)
      ? certificates.map(toUiCertificate)
      : [],

    experience: Array.isArray(experience)
      ? experience.map(toUiExperience)
      : [],

    messages: [],
  };
}


// =====================================================
// SAVE RESOURCE
// Supports normal JSON + project image upload
// =====================================================

export async function saveResource(resource, item) {
  const { toUi, toBackend } = RESOURCE_MAP[resource];

  const payload = toBackend(item);

  let body = payload;

  // ---------------------------------------------------
  // PROJECT IMAGE UPLOAD
  // ---------------------------------------------------

  if (resource === "projects" && item.imageFile) {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Arrays
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append("image", item.imageFile);

    body = formData;
  }

  // ---------------------------------------------------
  // CREATE / UPDATE
  // ---------------------------------------------------

  const doc =
    item.id && isValidMongoId(item.id)
      ? await apiFetch(`/api/${resource}/${item.id}`, {
          method: "PUT",
          body,
        })
      : await apiFetch(`/api/${resource}`, {
          method: "POST",
          body,
        });

  return toUi(doc);
}


// =====================================================
// DELETE RESOURCE
// =====================================================

export async function deleteResource(resource, id) {
  if (!id) {
    throw new Error("Resource ID is required.");
  }

  return await apiFetch(`/api/${resource}/${id}`, {
    method: "DELETE",
  });
}