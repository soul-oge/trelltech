import { mockRouter } from './mockTrello';

const BASE_URL = process.env.EXPO_PUBLIC_TRELLO_BASE_URL || 'https://api.trello.com/1';
const API_KEY  = process.env.EXPO_PUBLIC_TRELLO_API_KEY || '';
const TOKEN    = process.env.EXPO_PUBLIC_TRELLO_API_TOKEN || '';
const USE_MOCK = (process.env.EXPO_PUBLIC_USE_MOCK || '0') === '1';

function qs(params: Record<string, any>) {
  const out: Record<string,string> = {};
  Object.entries(params).forEach(([k,v]) => {
    if (v !== undefined && v !== null) out[k] = String(v);
  });
  return new URLSearchParams(out).toString();
}

export async function trelloFetch<T = any>(
  path: string,
  options: RequestInit & { query?: Record<string, any> } = {}
): Promise<T> {
  if (USE_MOCK || !API_KEY || !TOKEN) {
    return mockRouter<T>(path, options);
  }

  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const query = qs({ key: API_KEY, token: TOKEN || undefined, ...(options.query || {}) });
  const url = `${BASE_URL}${path}?${query}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Trello ${res.status}: ${txt}`);
  }
  return res.json();
}
