import { apiFetch } from "./apiFetch";

export async function fetchMessages() {
  const docs = await apiFetch("/api/messages");
  return Array.isArray(docs) ? docs.map((doc) => ({ ...doc, id: doc._id })) : [];
}

export async function postMessage(msg) {
  return apiFetch("/api/messages", { method: "POST", body: msg });
}

export async function deleteMessage(id) {
  await apiFetch(`/api/messages/${id}`, { method: "DELETE" });
}