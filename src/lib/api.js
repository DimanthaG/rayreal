/**
 * API client for the rayreal-backend REST API.
 *
 * Public
 *   GET    /api/properties                 → { items: Property[] }   (all public listings)
 *   GET    /api/properties/:refId          → Property
 * Admin (Authorization: Bearer <Firebase ID token>)
 *   GET    /api/admin/properties           → { items: Property[] }
 *   GET    /api/admin/properties/:refId    → Property
 *   GET    /api/admin/stats                → { total, available, reserved, sold, featured }
 *   POST   /api/admin/properties           → Property            (body: PropertyInput)
 *   PUT    /api/admin/properties/:refId    → Property            (body: PropertyInput)
 *   PATCH  /api/admin/properties/:refId    → Property            (body: { status?, featured? })
 *   DELETE /api/admin/properties/:refId    → { ok: true }        (also deletes its Storage images)
 *
 * With no VITE_API_BASE_URL set, the site runs in "demo mode": an empty, in-browser store so the
 * site and admin panel can be tried without a backend. Nothing leaves the browser.
 */
import { config, isDemo } from '../config';

let tokenProvider = async () => null;
export function setTokenProvider(fn) {
  tokenProvider = fn;
}
/** Current admin's Firebase ID token (refreshed automatically by Firebase). */
export const getAuthToken = () => tokenProvider();

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = await tokenProvider();
    if (!token) throw new ApiError('Your session has expired. Please sign in again.', 401);
    headers.Authorization = `Bearer ${token}`;
  }
  let res;
  try {
    res = await fetch(`${config.apiBaseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || `Request failed (${res.status})`, res.status);
  return data;
}

/* ───────────── demo store ───────────── */
const DEMO_KEY = 'rr-demo-properties-v2';
let demoStore = null;
/** Demo mode starts empty; listings added in the demo admin are kept in this browser. */
export async function initDemo() {
  if (demoStore) return;
  try {
    demoStore = JSON.parse(localStorage.getItem(DEMO_KEY) || 'null');
  } catch {
    demoStore = null;
  }
  demoStore = Array.isArray(demoStore) ? demoStore : [];
}
function demo() {
  return demoStore;
}
function saveDemo() {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(demoStore));
  } catch {
    /* storage full or blocked: keep in memory */
  }
}
const wait = async (ms = 250) => {
  await initDemo();
  await new Promise((r) => setTimeout(r, ms));
};
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
function nextRef(list) {
  const max = list.reduce((m, p) => Math.max(m, parseInt(String(p.refId).slice(3), 10) || 0), 0);
  return `RR-${String(max + 1).padStart(4, '0')}`;
}
const stats = (list) => ({
  total: list.length,
  available: list.filter((p) => p.status === 'available').length,
  reserved: list.filter((p) => p.status === 'reserved').length,
  sold: list.filter((p) => p.status === 'sold').length,
  featured: list.filter((p) => p.featured).length,
});

/* ───────────── public ───────────── */
export async function listProperties() {
  if (isDemo) {
    await wait(120);
    return demo().filter((p) => p.status !== 'draft');
  }
  const data = await request('/api/properties');
  return data.items || [];
}

export async function getProperty(refId) {
  if (isDemo) {
    await wait(120);
    const p = demo().find((x) => x.refId.toLowerCase() === String(refId).toLowerCase());
    if (!p) throw new ApiError('Property not found', 404);
    return p;
  }
  return request(`/api/properties/${encodeURIComponent(refId)}`);
}

/* ───────────── admin ───────────── */
export const admin = {
  async list() {
    if (isDemo) return (await wait(), [...demo()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    return (await request('/api/admin/properties', { auth: true })).items || [];
  },
  async get(refId) {
    if (isDemo) {
      await wait(120);
      const p = demo().find((x) => x.refId === refId);
      if (!p) throw new ApiError('Property not found', 404);
      return structuredClone(p);
    }
    return request(`/api/admin/properties/${encodeURIComponent(refId)}`, { auth: true });
  },
  async stats() {
    if (isDemo) return (await wait(80), stats(demo()));
    return request('/api/admin/stats', { auth: true });
  },
  async create(input) {
    if (isDemo) {
      await wait();
      const list = demo();
      const now = new Date().toISOString();
      const p = { ...input, refId: nextRef(list), slug: slug(input.title), createdAt: now, updatedAt: now };
      p.id = p.refId;
      list.unshift(p);
      saveDemo();
      return p;
    }
    return request('/api/admin/properties', { method: 'POST', body: input, auth: true });
  },
  async update(refId, input) {
    if (isDemo) {
      await wait();
      const list = demo();
      const i = list.findIndex((p) => p.refId === refId);
      if (i < 0) throw new ApiError('Property not found', 404);
      list[i] = { ...list[i], ...input, slug: slug(input.title || list[i].title), updatedAt: new Date().toISOString() };
      saveDemo();
      return list[i];
    }
    return request(`/api/admin/properties/${refId}`, { method: 'PUT', body: input, auth: true });
  },
  async patch(refId, changes) {
    if (isDemo) {
      await wait(150);
      const p = demo().find((x) => x.refId === refId);
      Object.assign(p, changes, { updatedAt: new Date().toISOString() });
      saveDemo();
      return p;
    }
    return request(`/api/admin/properties/${refId}`, { method: 'PATCH', body: changes, auth: true });
  },
  async remove(refId) {
    if (isDemo) {
      await wait();
      demoStore = demo().filter((p) => p.refId !== refId);
      saveDemo();
      return { ok: true };
    }
    return request(`/api/admin/properties/${refId}`, { method: 'DELETE', auth: true });
  },
  resetDemo() {
    demoStore = [];
    saveDemo();
  },
};
