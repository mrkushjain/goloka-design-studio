'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface StyleCard {
  id: string
  name: string
  tagline: string
  description: string
  src: string
  alt: string
  feature?: boolean
}

const styles: StyleCard[] = [
  {
    id: 'warm-contemporary',
    name: 'Warm Contemporary',
    tagline: 'Comfort, refined.',
    description:
      'Soft tones and warm woods meet comfortable modernity. Spaces that feel as good as they look — welcoming without being casual.',
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    alt: 'Warm contemporary living room with soft tones and natural wood furniture',
    feature: true,
  },
  {
    id: 'modern-indian',
    name: 'Modern Indian',
    tagline: 'Heritage, reinterpreted.',
    description:
      'Classic Indian motifs interpreted through a clean, modern lens. Rich culture expressed with restraint and intention.',
    src: 'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?w=800&q=80',
    alt: 'Modern Indian interior with traditional motifs in a contemporary setting',
  },
  {
    id: 'minimal-luxury',
    name: 'Minimal Luxury',
    tagline: 'Less, but better.',
    description:
      'Restrained palette, exceptional materials, quiet confidence. Every object earns its place.',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    alt: 'Minimal luxury interior with clean lines and premium materials',
  },
  {
    id: 'earthy-natural',
    name: 'Earthy & Natural',
    tagline: 'Rooted in the real world.',
    description:
      'Terracotta, cane, stone, plants — materials that connect you to the natural world. Warm, alive, and deeply grounding.',
    src: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80',
    alt: 'Earthy natural interior with terracotta, cane, and lush greenery',
  },
]

function StyleCardItem({
  card,
  index,
  isVisible,
}: {
  card: StyleCard
  index: number
  isVisible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className={`relative overflow-hidden rounded-xl group cursor-pointer
        ${card.feature ? 'md:row-span-2' : ''}
      `}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease-out ${index * 120}ms, transform 0.65s ease-out ${index * 120}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${card.name} — ${card.tagline}`}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${card.feature ? 'h-[480px] md:h-full md:min-h-[600px]' : 'h-[300px] md:h-[280px]'}`}>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes={
            card.feature
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 768px) 100vw, 25vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />

        {/* Persistent subtle gradient at bottom for legibility on non-hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none"
          style={{
            background: hovered
              ? 'linear-gradient(to top, rgba(44,44,44,0.90) 0%, rgba(44,44,44,0.65) 50%, rgba(44,44,44,0.30) 100%)'
              : 'linear-gradient(to top, rgba(44,44,44,0.55) 0%, rgba(44,44,44,0.05) 60%, transparent 100%)',
            transition: 'background 0.45s ease-out',
          }}
          aria-hidden="true"
        />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Style name — always visible */}
          <h3
            className={`font-serif text-ivory leading-tight mb-1
              ${card.feature ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}
            `}
            style={{
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            }}
          >
            {card.name}
          </h3>

          {/* Tagline — always visible, subtle */}
          <p
            className="font-sans text-xs tracking-[0.18em] uppercase text-brass-light mb-3"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
          >
            {card.tagline}
          </p>

          {/* Description — fades in on hover */}
          <p
            className={`font-sans text-sm text-ivory/85 leading-relaxed
              ${card.feature ? 'max-w-sm' : 'max-w-xs'}
            `}
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
              maxHeight: '5em',
            }}
          >
            {card.description}
          </p>
        </div>

        {/* Feature badge */}
        {card.feature && (
          <div className="absolute top-5 left-5">
            <span className="inline-block font-sans text-xs font-semibold tracking-widest uppercase bg-brass/90 text-ivory px-3 py-1 rounded-full">
              Most popular
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

export default function DesignInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const featureCard = styles.find((s) => s.feature)!
  const supportingCards = styles.filter((s) => !s.feature)

  return (
    <section
      ref={sectionRef}
      className="bg-ivory py-20 md:py-28 overflow-hidden"
      aria-labelledby="inspiration-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-terracotta mb-4">
            Design Inspiration
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="inspiration-heading"
              className="font-serif text-display-lg text-charcoal leading-tight"
            >
              Find your style.
            </h2>
            <p className="font-sans text-base text-warm-gray leading-relaxed max-w-sm md:text-right">
              Every home has its own personality. These are the four design languages we work in most.
            </p>
          </div>
        </div>

        {/* Staggered grid: feature left, three right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* Feature card — left column, full height */}
          <div className="md:row-span-2">
            <StyleCardItem
              card={featureCard}
              index={0}
              isVisible={isVisible}
            />
          </div>

          {/* Supporting cards — right column, stacked */}
          {supportingCards.map((card, i) => (
            <StyleCardItem
              key={card.id}
              card={card}
              index={i + 1}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s ease-out 600ms, transform 0.65s ease-out 600ms',
          }}
        >
          <p className="font-sans text-sm text-warm-gray">
            Not sure which direction is right for you?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-charcoal border-b border-brass pb-0.5 hover:text-brass transition-colors duration-200"
          >
            Talk to a designer
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
