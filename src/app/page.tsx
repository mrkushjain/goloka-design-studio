import { Suspense } from 'react'
import { getSettings, getTestimonials, getProjects, getServices, getFaqs } from '@/lib/sheets'
import type { SiteSettings, Testimonial, Project, Service, FAQ } from '@/types'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import BrandPromise from '@/components/BrandPromise'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import DesignInspiration from '@/components/DesignInspiration'
import HowItWorks from '@/components/HowItWorks'
import MaterialsSection from '@/components/MaterialsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AboutSection from '@/components/AboutSection'
import SocialSection from '@/components/SocialSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

// Skeleton fallbacks --------------------------------------------------------

function SectionSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div
      className={`w-full ${height} animate-pulse bg-stone-100`}
      aria-hidden="true"
    />
  )
}

// Data fetching helpers — each returns a safe fallback on error -------------

async function fetchSettings(): Promise<Partial<SiteSettings>> {
  try {
    return (await getSettings()) as Partial<SiteSettings>
  } catch {
    return {}
  }
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    return (await getTestimonials()) as Testimonial[]
  } catch {
    return []
  }
}

async function fetchProjects(): Promise<Project[]> {
  try {
    return (await getProjects()) as Project[]
  } catch {
    return []
  }
}

async function fetchServices(): Promise<Service[]> {
  try {
    return (await getServices()) as Service[]
  } catch {
    return []
  }
}

async function fetchFaqs(): Promise<FAQ[]> {
  try {
    return (await getFaqs()) as FAQ[]
  } catch {
    return []
  }
}

// Page (Server Component) ---------------------------------------------------

export default async function Home() {
  const [settings, testimonials, projects, services, faqs] = await Promise.all([
    fetchSettings(),
    fetchTestimonials(),
    fetchProjects(),
    fetchServices(),
    fetchFaqs(),
  ])

  return (
    <>
      {/* Navigation — no data dependency, renders immediately */}
      <Navigation />

      {/* Hero */}
      <Suspense fallback={<SectionSkeleton height="h-screen" />}>
        <Hero
          headline={(settings as SiteSettings).hero_headline}
          subtitle={(settings as SiteSettings).hero_subtitle}
          imageUrl={(settings as SiteSettings).hero_image_url}
        />
      </Suspense>

      {/* Brand Promise */}
      <BrandPromise />

      {/* Services */}
      <section id="services">
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <ServicesSection services={services} />
        </Suspense>
      </section>

      {/* Projects */}
      <section id="projects">
        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <ProjectsSection projects={projects} />
        </Suspense>
      </section>

      {/* Design Inspiration */}
      <Suspense fallback={<SectionSkeleton height="h-80" />}>
        <DesignInspiration />
      </Suspense>

      {/* How It Works */}
      <HowItWorks />

      {/* Materials */}
      <MaterialsSection />

      {/* Testimonials */}
      <section id="testimonials">
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <TestimonialsSection testimonials={testimonials} />
        </Suspense>
      </section>

      {/* About */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Social */}
      <Suspense fallback={<SectionSkeleton height="h-80" />}>
        <SocialSection
          instagramUrl={(settings as SiteSettings).instagram_url}
          youtubeUrl={(settings as SiteSettings).youtube_url}
        />
      </Suspense>

      {/* FAQ */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <FAQSection faqs={faqs} />
      </Suspense>

      {/* Contact */}
      <section id="contact">
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <ContactSection settings={settings} />
        </Suspense>
      </section>

      {/* Footer */}
      <Footer settings={settings} />
    </>
  )
}
