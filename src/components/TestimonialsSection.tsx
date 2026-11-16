'use client'

// no useState needed — marquee is CSS-driven
import type { Testimonial } from '@/types'

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'demo-1',
    name: 'Priya & Kiran Reddy',
    community: 'My Home Tridasa, Hyderabad',
    quote:
      'Working with Gautam was seamless from first meeting to final handover. Our apartment feels like it was built just for us. The quality of materials and attention to detail exceeded every expectation.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 1,
  },
  {
    id: 'demo-2',
    name: 'Ramesh & Kavya Sharma',
    community: 'My Home Sayuk, Hyderabad',
    quote:
      'The modular kitchen is both beautiful and incredibly functional. Gautam understood exactly how our family cooks together. Three months on and the finishes still look brand new.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 2,
  },
  {
    id: 'demo-3',
    name: 'Anitha & Suresh Nair',
    community: 'My Home Tridasa, Hyderabad',
    quote:
      'What impressed us most was the after-sales support. A punch-list item was fixed the very next day without any follow-up. Genuinely rare in this industry.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 3,
  },
  {
    id: 'demo-4',
    name: 'Deepika Menon',
    community: 'My Home Sayuk, Hyderabad',
    quote:
      'The wardrobe design for our master bedroom is stunning. Every centimetre is utilised so cleverly — I finally have space for everything. The arc-router finish on the shutters is my favourite touch.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 4,
  },
  {
    id: 'demo-5',
    name: 'Vikram & Leela Iyer',
    community: 'My Home Tridasa, Hyderabad',
    quote:
      'We gave Gautam a tight budget and an even tighter timeline. He delivered on both — and the result looks like it cost twice as much. Our guests always ask for his contact.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 5,
  },
  {
    id: 'demo-6',
    name: 'Sunita Joshi',
    community: 'Kokapet, Hyderabad',
    quote:
      'The pooja unit Gautam designed is absolutely divine. He understood the spiritual significance and created something that feels sacred and beautiful at the same time. We receive compliments on it every Diwali.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 6,
  },
  {
    id: 'demo-7',
    name: 'Arun & Meena Kumar',
    community: 'Kompally, Hyderabad',
    quote:
      'Goloka Design Studio handled our complete 3BHK end to end. The foyer, living, kitchen, all three bedrooms — all done in 60 days with zero hassle. The 3D renders were spot-on; there were no surprises on handover day.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 7,
  },
  {
    id: 'demo-8',
    name: 'Ritu & Sanjay Kapoor',
    community: 'Kondapur, Hyderabad',
    quote:
      'The kids bedroom and wardrobe are so thoughtfully designed — the blue wardrobe with the loft study area makes my daughter feel like she has her own little world. She refuses to leave her room now!',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 8,
  },
  {
    id: 'demo-9',
    name: 'Harish Reddy',
    community: 'My Home Sayuk, Hyderabad',
    quote:
      'The TV unit with the fluted wood panel is the centrepiece of our living room. Guests spend the first ten minutes just admiring it. The LED under-panel glow in the evening is gorgeous.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 9,
  },
  {
    id: 'demo-10',
    name: 'Padma & Ravi Chandra',
    community: 'Manikonda, Hyderabad',
    quote:
      'We were initially nervous about a full home renovation with two young kids in the house. Gautam planned the execution in phases so we could stay put throughout. Professional, clean, and absolutely on time.',
    rating: 5,
    photo_url: '',
    approved: true,
    is_demo: true,
    sort_order: 10,
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
  // Use Sheets data only when it contains at least one real (non-demo) approved entry.
  // Otherwise fall back to the hardcoded demo set so the section is never empty.
  const hasRealTestimonials =
    testimonials && testimonials.some((t) => t.approved && !t.is_demo)

  const displayList: Testimonial[] = hasRealTestimonials
    ? testimonials!
        .filter((t) => t.approved)
        .sort((a, b) => a.sort_order - b.sort_order)
    : DEMO_TESTIMONIALS

  if (displayList.length === 0) return null

  return <TestimonialsInner testimonials={displayList} />
}

// Inner component — infinite horizontal marquee, pauses on hover
function TestimonialsInner({ testimonials }: { testimonials: Testimonial[] }) {
  // Duplicate list so the loop scrolls seamlessly
  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full section-pad"
      style={{ backgroundColor: '#2E3524' }} /* deep olive-dark */
    >
      <div className="container-site">
        {/* Section header */}
        <header className="mb-10 flex flex-col gap-3">
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
      </div>

      {/* Marquee — full-bleed, overflows container intentionally */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden w-full" aria-label="Scrolling client testimonials">
        <div
          className="marquee-track flex gap-6"
          style={{ width: 'max-content' }}
        >
          {doubled.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="shrink-0"
              style={{ width: 'clamp(300px, 36vw, 480px)' }}
              aria-hidden={idx >= testimonials.length ? 'true' : undefined}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
