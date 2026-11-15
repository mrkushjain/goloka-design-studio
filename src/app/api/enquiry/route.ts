// API routes are excluded from the static export (GitHub Pages has no server).
// They are used when deploying to a full Next.js host such as Vercel.
export const dynamic = 'force-static'

import { NextRequest, NextResponse } from 'next/server'
import { saveLead } from '@/lib/sheets'

// ---------------------------------------------------------------------------
// In-memory rate limiter — max 5 submissions per IP per hour.
// This state lives in the Node.js process; it resets on cold starts.
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number
  resetAt: number
}
const rateLimitMap = new Map<string, RateLimitEntry>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }

  if (entry.count >= 5) {
    return true
  }

  entry.count += 1
  return false
}

// ---------------------------------------------------------------------------
// Turnstile verification
// ---------------------------------------------------------------------------
interface TurnstileResponse {
  success: boolean
  hostname?: string
  action?: string
  'error-codes'?: string[]
}

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[enquiry] TURNSTILE_SECRET_KEY is not set')
    return false
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  let expectedHostname = ''
  try {
    expectedHostname = new URL(siteUrl).hostname
  } catch {
    // If the env var is malformed, skip hostname check
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  })

  let result: TurnstileResponse
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    })
    result = (await res.json()) as TurnstileResponse
  } catch (err) {
    console.error('[enquiry] Turnstile request failed:', err)
    return false
  }

  if (!result.success) {
    console.warn('[enquiry] Turnstile rejected token. Codes:', result['error-codes'])
    return false
  }

  // Validate hostname when we have both sides
  if (expectedHostname && result.hostname && result.hostname !== expectedHostname) {
    console.warn(
      `[enquiry] Turnstile hostname mismatch: expected=${expectedHostname} got=${result.hostname}`,
    )
    return false
  }

  return true
}

// ---------------------------------------------------------------------------
// Field validation helpers
// ---------------------------------------------------------------------------
const PHONE_RE = /^\+?[\d\s\-().]{10,}$/

function validateFields(body: Record<string, unknown>): string | null {
  const { name, phone, city, consent } = body

  if (typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 100) {
    return 'Name must be between 1 and 100 characters.'
  }
  if (typeof phone !== 'string' || !PHONE_RE.test(phone.trim())) {
    return 'Phone must contain at least 10 digits.'
  }
  if (typeof city !== 'string' || city.trim().length < 1 || city.trim().length > 50) {
    return 'City must be between 1 and 50 characters.'
  }
  if (consent !== true) {
    return 'You must provide consent to submit this form.'
  }
  return null
}

// ---------------------------------------------------------------------------
// POST /api/enquiry
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Derive client IP (works behind Vercel / common reverse proxies)
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  // Rate limit check
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot — silent accept; do not reveal rejection to bots
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ success: true })
  }

  // Turnstile token presence check
  const turnstileToken = body.turnstile_token
  if (typeof turnstileToken !== 'string' || turnstileToken.trim().length === 0) {
    return NextResponse.json({ error: 'Missing CAPTCHA token.' }, { status: 400 })
  }

  // Field validation
  const validationError = validateFields(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  // Turnstile server-side verification
  const turnstileOk = await verifyTurnstile(turnstileToken.trim(), clientIp)
  if (!turnstileOk) {
    return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 400 })
  }

  // Build lead object
  const lead: Record<string, unknown> = {
    lead_id: crypto.randomUUID(),
    name: (body.name as string).trim(),
    phone: (body.phone as string).trim(),
    city: (body.city as string).trim(),
    consent: true,
    submitted_at: new Date().toISOString(),
    source_ip: clientIp,
    // Optional fields — include if present
    ...(typeof body.email === 'string' && body.email ? { email: body.email.trim() } : {}),
    ...(typeof body.message === 'string' && body.message ? { message: body.message.trim() } : {}),
    ...(typeof body.service === 'string' && body.service ? { service: body.service.trim() } : {}),
  }

  try {
    await saveLead(lead)
  } catch (err) {
    console.error('[enquiry] saveLead failed:', err)
    return NextResponse.json(
      { error: 'Unable to submit your enquiry right now. Please try again shortly.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
