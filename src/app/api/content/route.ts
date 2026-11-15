// API routes are excluded from the static export (GitHub Pages has no server).
// They are used when deploying to a full Next.js host such as Vercel.
export const dynamic = 'force-static'

import { NextRequest, NextResponse } from 'next/server'
import { getSettings, getServices, getProjects, getTestimonials, getFaqs } from '@/lib/sheets'

// ---------------------------------------------------------------------------
// Type stubs — the sheets lib returns unknown arrays; we type-narrow minimally
// ---------------------------------------------------------------------------
interface Project {
  published?: boolean
  status?: string
  [key: string]: unknown
}

interface Testimonial {
  approved?: boolean
  demo?: boolean
  [key: string]: unknown
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/** Return only published projects */
function filterProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return []
  return (raw as Project[]).filter(
    (p) => p.published === true || p.status === 'published',
  )
}

/** Return approved testimonials; in prod also exclude demo entries */
function filterTestimonials(raw: unknown): Testimonial[] {
  if (!Array.isArray(raw)) return []
  return (raw as Testimonial[]).filter((t) => {
    if (t.approved !== true) return false
    if (isProduction() && t.demo === true) return false
    return true
  })
}

// ---------------------------------------------------------------------------
// GET /api/content
// ---------------------------------------------------------------------------
export async function GET(_req: NextRequest): Promise<NextResponse> {
  // Fetch all data sources in parallel; treat each failure independently
  const [settingsResult, servicesResult, projectsResult, testimonialsResult, faqsResult] =
    await Promise.allSettled([
      getSettings(),
      getServices(),
      getProjects(),
      getTestimonials(),
      getFaqs(),
    ])

  const settings =
    settingsResult.status === 'fulfilled' ? settingsResult.value : {}
  const services =
    servicesResult.status === 'fulfilled' ? (Array.isArray(servicesResult.value) ? servicesResult.value : []) : []
  const projects =
    projectsResult.status === 'fulfilled' ? filterProjects(projectsResult.value) : []
  const testimonials =
    testimonialsResult.status === 'fulfilled' ? filterTestimonials(testimonialsResult.value) : []
  const faqs =
    faqsResult.status === 'fulfilled' ? (Array.isArray(faqsResult.value) ? faqsResult.value : []) : []

  // Log any failures server-side only — never surface them to the client
  if (settingsResult.status === 'rejected') {
    console.error('[content] getSettings failed:', settingsResult.reason)
  }
  if (servicesResult.status === 'rejected') {
    console.error('[content] getServices failed:', servicesResult.reason)
  }
  if (projectsResult.status === 'rejected') {
    console.error('[content] getProjects failed:', projectsResult.reason)
  }
  if (testimonialsResult.status === 'rejected') {
    console.error('[content] getTestimonials failed:', testimonialsResult.reason)
  }
  if (faqsResult.status === 'rejected') {
    console.error('[content] getFaqs failed:', faqsResult.reason)
  }

  const payload = { settings, services, projects, testimonials, faqs }

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300',
    },
  })
}
