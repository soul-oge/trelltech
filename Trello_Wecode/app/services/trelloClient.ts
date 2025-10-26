import { mockRouter } from './mockTrello';

const BASE_URL = process.env.EXPO_PUBLIC_TRELLO_BASE_URL || 'https://api.trello.com/1';
const API_KEY  = process.env.EXPO_PUBLIC_TRELLO_API_KEY || 'f397235e4ae558c6a5d03a8a9f7c4da4';
const TOKEN    = process.env.EXPO_PUBLIC_TRELLO_API_TOKEN || 'ATTA25b7fb60347aa39c151fa13b2e17ddbc039bb6d262bab67c6a7804a2ab0cd1de8166F729';
const USE_MOCK = (process.env.EXPO_PUBLIC_USE_MOCK || '0') === '1';

console.log('[ENV]', {
  USE_MOCK: (process.env.EXPO_PUBLIC_USE_MOCK || '0'),
  hasKey: !!API_KEY,
  hasToken: !!TOKEN,
  base: BASE_URL
});

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
  try {
    if (USE_MOCK) {
      console.log('[TRELLO] using MOCK for', path);
      return mockRouter<T>(path, options);
    }

    if (!API_KEY || !TOKEN) {
      console.warn('[TRELLO] missing key/token → abort real call');
      throw new Error('Missing Trello key/token');
    }

    console.log('re'); // <-- tu le vois déjà

    const headers = options.body
      ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
      : (options.headers || {});
    console.log('[TRELLO] step A headers ok');

    const query = qs({ key: API_KEY, token: TOKEN || undefined, ...(options.query || {}) });
    console.log('[TRELLO] step B qs ok', query);

    const url = `${BASE_URL}${path}?${query}`;
    console.log('[TRELLO] step C url built');

    console.log('[TRELLO]', options.method || 'GET', url);

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.warn('[TRELLO][ERROR]', res.status, txt);
      throw new Error(`Trello ${res.status}: ${txt}`);
    }

    const data = await res.json();
    console.log('[TRELLO] OK', Array.isArray(data) ? `items=${data.length}` : 'object');
    return data;
  } catch (e) {
    console.error('[TRELLO][CATCH]', (e as Error).message);
    throw e;
  }
}
