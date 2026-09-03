import { apiFetch } from "./apiFetch";
import { setToken, setStoredUser } from "../utils/storage";
import { toUiProfile, toBackendProfile } from "../utils/transformers";

export async function loginAdmin(email, password) {
  const auth = await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
  setToken(auth.token);
  setStoredUser(auth.user);
  return auth.user;
}

export async function validateAdmin() {
  const user = await apiFetch("/api/auth/me");
  setStoredUser(user);
  return user;
}

export async function saveProfile(profile) {
  const doc = await apiFetch("/api/profile", { method: "PUT", body: toBackendProfile(profile) });
  return toUiProfile(doc);
}