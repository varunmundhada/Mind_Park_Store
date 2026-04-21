const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const buildHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  get: (endpoint, token) =>
    request(endpoint, { method: "GET", headers: buildHeaders(token) }),
  post: (endpoint, body, token) =>
    request(endpoint, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    }),
  put: (endpoint, body, token) =>
    request(endpoint, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    }),
  patch: (endpoint, body, token) =>
    request(endpoint, {
      method: "PATCH",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    }),
  delete: (endpoint, token) =>
    request(endpoint, { method: "DELETE", headers: buildHeaders(token) }),
};
