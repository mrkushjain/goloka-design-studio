'use client'

import { useState } from 'react'
import type { Testimonial } from '@/types'

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'demo-1',
    name: 'Priya & Kiran Reddy',
    community: 'My Home Tridasa',
    quote:
      'Working with Gautam was seamless from first meeting to final handover. Our My Home Tridasa apartment feels like it was built just for us. The quality of materials and the attention to detail exceeded our expectations.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 1,
  },
  {
    id: 'demo-2',
    name: 'Ramesh Sharma',
    community: 'My Home Sayuk',
    quote:
      'The modular kitchen design is both beautiful and incredibly functional. Gautam understood exactly how our family cooks together. Even three months after moving in, the finishes look as good as new.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 2,
  },
  {
    id: 'demo-3',
    name: 'Anitha & Suresh Nair',
    community: 'My Home Tridasa',
    quote:
      'What impressed us most was the after-sales support. A small punch-list item was fixed promptly without any follow-up needed. Genuinely rare in this industry.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 3,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={i < rating ? 0 : 1.5}
          className="w-4 h-4 text-brass"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex flex-col gap-5 p-8 md:p-10 rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm h-full">
      {/* Large opening quote mark */}
      <div
        aria-hidden="true"
        className="font-serif text-brass text-7xl leading-none select-none -mb-2"
        style={{ fontFamily: 'var(--font-cormorant)', lineHeight: 0.8 }}
      >
        &ldquo;
      </div>

      {/* Star rating */}
      <StarRating rating={testimonial.rating} />

      {/* Quote body */}
      <blockquote className="font-serif text-ivory/90 text-lg md:text-xl leading-relaxed italic flex-1">
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <footer className="flex flex-col gap-1 mt-2 border-t border-white/10 pt-5">
        <cite className="not-italic font-sans font-medium text-ivory text-sm tracking-wide uppercase">
          {testimonial.name}
        </cite>
        <span className="font-sans text-warm-gray-light text-xs tracking-widest uppercase">
          {testimonial.community}
        </span>

        {/* Demo label */}
        {testimonial.is_demo && (
          <span className="mt-2 inline-block self-start font-sans text-[10px] tracking-wider uppercase text-brass/70 border border-brass/30 rounded-sm px-2 py-0.5">
            Sample testimonial — not a verified customer review
          </span>
        )}
      </footer>
    </article>
  )
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Determine which set to display
  const hasRealTestimonials =
    testimonials && testimonials.some((t) => t.approved && !t.is_demo)

  // In production (real data provided), hide section if all are demo or none exist
  const isProduction = Array.isArray(testimonials)
  if (isProduction && !hasRealTestimonials) {
    return null
  }

  // Use provided testimonials if real ones exist, otherwise fall back to demo set
  const displayList: Testimonial[] = isProduction
    ? testimonials!
        .filter((t) => t.approved)
        .sort((a, b) => a.sort_order - b.sort_order)
    : DEMO_TESTIMONIALS

  if (displayList.length === 0) return null

  return <TestimonialsInner testimonials={displayList} />
}

// Inner component that holds navigation state so we avoid hooks conditionally
function TestimonialsInner({ testimonials }: { testimonials: Testimonial[] }) {
  const total = testimonials.length
  // Show 2 per "page" on desktop, 1 on mobile — drive navigation in steps of 1
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total)
  const next = () => setActiveIndex((i) => (i + 1) % total)

  // Visible pair: activeIndex and activeIndex+1 (wraps)
  const visiblePair = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % total],
  ]

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full section-pad"
      style={{ backgroundColor: '#2E3524' }} /* deep olive-dark */
    >
      <div className="container-site">
        {/* Section header */}
        <header className="mb-12 md:mb-16 flex flex-col gap-3">
          <p className="font-sans text-brass text-xs tracking-[0.25em] uppercase">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif text-display-md text-ivory text-balance"
          >
            What Our Homeowners Say
          </h2>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mobile: show only activeIndex */}
          <div className="md:hidden">
            <TestimonialCard testimonial={testimonials[activeIndex]} />
          </div>

          {/* Desktop: show visiblePair */}
          {visiblePair.map((t, idx) => (
            <div key={`${t.id}-${activeIndex}-${idx}`} className="hidden md:block">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        {total > 1 && (
          <nav
            className="mt-10 flex items-center gap-6"
            aria-label="Testimonials navigation"
          >
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-brass/40 text-brass transition-colors hover:bg-brass hover:border-brass focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 group-hover:text-olive-dark transition-colors"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <ol className="flex gap-2" aria-label="Testimonial position">
              {testimonials.map((_, i) => (
                <li key={i}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === activeIndex ? 'true' : undefined}
                    className={[
                      'w-2 h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2',
                      i === activeIndex
                        ? 'bg-brass scale-125'
                        : 'bg-white/25 hover:bg-white/50',
                    ].join(' ')}
                  />
                </li>
              ))}
            </ol>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-brass/40 text-brass transition-colors hover:bg-brass hover:border-brass focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 group-hover:text-olive-dark transition-colors"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
