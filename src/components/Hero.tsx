'use client'

import Image from 'next/image'
import { useCallback } from 'react'

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85'

const DEFAULT_HEADLINE = 'Beautiful homes. Thoughtfully yours.'

const DEFAULT_SUBTITLE =
  'End-to-end interiors by Gautam Kumar, crafted around your life—with quality you can see and care that continues after handover.'

interface HeroProps {
  headline?: string
  subtitle?: string
  imageUrl?: string
}

export default function Hero({
  headline = DEFAULT_HEADLINE,
  subtitle = DEFAULT_SUBTITLE,
  imageUrl = DEFAULT_IMAGE_URL,
}: HeroProps) {
  const handleConsultation = useCallback(() => {
    const contact = document.getElementById('contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '100vh' }}
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Warm contemporary Indian living room interior"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="select-none"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom right, rgba(58,74,44,0.72) 0%, rgba(44,44,44,0.35) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center container-site">
        <div className="max-w-3xl animate-fade-up motion-reduce:animate-none">
          <h1
            className="font-serif text-display-xl text-white text-balance leading-none tracking-tight mb-6"
          >
            {headline}
          </h1>
          <p
            className="font-sans text-lg md:text-xl text-white/85 max-w-xl text-balance leading-relaxed mb-10 animate-fade-up motion-reduce:animate-none"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
          >
            {subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleConsultation}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-sm text-sm font-sans font-medium tracking-wide transition-all duration-200 bg-olive hover:bg-olive-dark text-white border border-brass hover:border-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Book a Free Consultation
            </button>

            <a
              href="#work"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-sm text-sm font-sans font-medium tracking-wide transition-all duration-200 bg-transparent text-white border border-white/70 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Explore Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 animate-fade-in motion-reduce:animate-none"
        style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
        aria-hidden="true"
      >
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <path
            d="M8 4V20M8 20L2 14M8 20L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
