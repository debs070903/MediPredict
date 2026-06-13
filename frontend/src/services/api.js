const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://medipredict-ue2e.onrender.com/api";

async function request(path, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      payload?.detail || payload?.error || payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  forgotPassword: (body) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  validateResetToken: (token) =>
    request(`/auth/reset-password?token=${encodeURIComponent(token)}`, {
      method: "GET",
    }),

  resetPassword: (body) =>
    request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  me: (token) => request("/auth/me", { method: "GET" }, token),
  updateProfile: (token, body) =>
    request("/users/me", { method: "PUT", body: JSON.stringify(body) }, token),
  getDashboardSummary: (token) =>
    request("/dashboard/summary", { method: "GET" }, token),
  getPredictionById: (token, id) =>
    request(`/predictions/${id}`, { method: "GET" }, token),
  getPredictions: (token) => request("/predictions", { method: "GET" }, token),
  createPrediction: (token, body) =>
    request(
      "/predictions",
      { method: "POST", body: JSON.stringify(body) },
      token
    ),
  getMlHealth: () => request("/ml/health", { method: "GET" }),
  getMlModelInfo: () => request("/ml/model-info", { method: "GET" }),
};

export function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortDate(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
