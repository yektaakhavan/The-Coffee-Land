// Thin wrapper around fetch() for talking to the Coffee Land backend.
//
// Base URL comes from VITE_API_URL (set it in .env for local dev, and in
// the Vercel project's Environment Variables for production). Falls back
// to localhost:3000, which is where `vercel dev` serves the backend.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AUTH_STORAGE_KEY = "auth";

export function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function setStoredAuth(auth) {
  if (auth) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

function getToken() {
  return getStoredAuth()?.token ?? null;
}

function buildQuery(params) {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries).toString()}`;
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("اتصال به سرور برقرار نشد — اینترنت یا آدرس بک‌اند رو بررسی کن");
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || `خطا در ارتباط با سرور (کد ${res.status})`);
  }
  return data;
}

export const api = {
  // Auth
  register: (payload) => request("/api/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  me: () => request("/api/auth/me", { auth: true }),

  // Products
  getProducts: (params) => request(`/api/products${buildQuery(params)}`),
  getProductBySlug: (slug) => request(`/api/products/${slug}`),
  createProduct: (payload) =>
    request("/api/products", { method: "POST", body: payload, auth: true }),
  updateProduct: (id, payload) =>
    request(`/api/products/id/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteProduct: (id) =>
    request(`/api/products/id/${id}`, { method: "DELETE", auth: true }),

  // Categories
  getCategories: () => request("/api/categories"),
  createCategory: (payload) =>
    request("/api/categories", { method: "POST", body: payload, auth: true }),
  updateCategory: (id, payload) =>
    request(`/api/categories/id/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteCategory: (id) =>
    request(`/api/categories/id/${id}`, { method: "DELETE", auth: true }),

  // Orders
  createOrder: (payload) =>
    request("/api/orders", { method: "POST", body: payload, auth: true }),
  getMyOrders: () => request("/api/orders/mine", { auth: true }),
  getAllOrders: () => request("/api/orders", { auth: true }),
  updateOrderStatus: (id, status) =>
    request(`/api/orders/id/${id}/status`, { method: "PATCH", body: { status }, auth: true }),
  deleteOrder: (id) =>
    request(`/api/orders/id/${id}`, { method: "DELETE", auth: true }),
};
