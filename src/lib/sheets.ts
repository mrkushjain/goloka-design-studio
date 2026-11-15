const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL!
const APPS_SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET!
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

interface CacheEntry<T> {
  data: T
  ts: number
}
const cache = new Map<string, CacheEntry<unknown>>()

async function callScript<T>(action: string, payload?: Record<string, unknown>): Promise<T> {
  if (!APPS_SCRIPT_URL) throw new Error('APPS_SCRIPT_URL not configured')
  const body = JSON.stringify({ action, secret: APPS_SCRIPT_SECRET, ...payload })
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) throw new Error(`Apps Script error: ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.data as T
}

export async function getSettings(): Promise<Record<string, string>> {
  const key = 'settings'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data as Record<string, string>
  const data = await callScript<Record<string, string>>('getSettings')
  cache.set(key, { data, ts: Date.now() })
  return data
}

export async function getTestimonials() {
  const key = 'testimonials'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const data = await callScript('getTestimonials')
  cache.set(key, { data, ts: Date.now() })
  return data
}

export async function getProjects() {
  const key = 'projects'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const data = await callScript('getProjects')
  cache.set(key, { data, ts: Date.now() })
  return data
}

export async function getServices() {
  const key = 'services'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const data = await callScript('getServices')
  cache.set(key, { data, ts: Date.now() })
  return data
}

export async function getFaqs() {
  const key = 'faqs'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data
  const data = await callScript('getFaqs')
  cache.set(key, { data, ts: Date.now() })
  return data
}

export async function saveLead(lead: Record<string, unknown>) {
  return callScript('saveLead', { lead })
}
