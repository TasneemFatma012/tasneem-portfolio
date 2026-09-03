import { API_BASE } from "../utils/constants";
import { getToken } from "../utils/storage";

export function apiUrl(path, params = {}) {
  const url = new URL(path, API_BASE || window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

export async function apiFetch(
  path,
  { method = "GET", body, params } = {}
) {
  const headers = {};

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (body !== undefined && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(apiUrl(path, params), {
    method,
    headers,

    body:
      body !== undefined
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
  });

  const text = await res.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error =
      data?.error ||
      data?.message ||
      res.statusText ||
      "Request failed.";

    const err = new Error(error);
    err.status = res.status;
    err.data = data;

    throw err;
  }

  return data;
}