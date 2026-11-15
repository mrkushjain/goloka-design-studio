'use client'

import Image from 'next/image'
import { Service } from '@/types'

const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Complete Home Interiors',
    description: 'Full-home transformations — from bare walls to a home that feels entirely yours. Every room, every detail, every material chosen with care.',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    published: true,
    sort_order: 1,
  },
  {
    id: '2',
    title: 'Modular Kitchens',
    description: 'Kitchens designed around how you cook — ergonomic layouts, premium shutters, and storage that makes everyday use a pleasure.',
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    published: true,
    sort_order: 2,
  },
  {
    id: '3',
    title: 'Bedrooms & Wardrobes',
    description: 'Restful retreats with wardrobes crafted to your exact storage needs — swing, sliding, or walk-in, finished beautifully inside and out.',
    image_url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    published: true,
    sort_order: 3,
  },
  {
    id: '4',
    title: 'Living & Dining Spaces',
    description: 'Spaces that invite gathering — balanced layouts, considered furniture, and a palette that holds the whole home together.',
    image_url: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
    published: true,
    sort_order: 4,
  },
  {
    id: '5',
    title: 'TV Units & Storage',
    description: 'Custom units that anchor your living room — hiding clutter while becoming a quiet focal point of the space.',
    image_url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80',
    published: true,
    sort_order: 5,
  },
  {
    id: '6',
    title: 'Pooja Units',
    description: 'Sacred spaces designed with reverence — crafted in wood, stone, or veneer to honour your practice and complement your home.',
    image_url: 'https://images.unsplash.com/photo-1585821569331-6a7a0c72e1f8?w=800&q=80',
    published: true,
    sort_order: 6,
  },
  {
    id: '7',
    title: 'Lighting & False Ceilings',
    description: 'Layers of light — ambient, task, and accent — set within ceilings that add volume and drama to every room.',
    image_url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
    published: true,
    sort_order: 7,
  },
]

interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden bg-stone-50 cursor-default">
      {/* Image container — 3:4 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
        <Image
          src={service.image_url}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 flex flex-col justify-end p-6
            bg-gradient-to-t from-black/80 via-black/30 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500 ease-out
          "
        >
          <p
            className="text-white/90 text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Title bar */}
      <div className="px-4 py-4 border-t border-stone-200 group-hover:border-stone-400 transition-colors duration-300">
        <h3
          className="text-stone-800 text-lg leading-snug tracking-wide group-hover:text-stone-950 transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          {service.title}
        </h3>
      </div>
    </div>
  )
}

interface ServicesSectionProps {
  services?: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const displayServices =
    services && services.length > 0
      ? [...services].sort((a, b) => a.sort_order - b.sort_order).filter((s) => s.published)
      : DEFAULT_SERVICES

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-14 text-center">
        <h2
          className="text-4xl md:text-5xl text-stone-900 mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: '0.01em' }}
        >
          Our Services
        </h2>
        <p
          className="text-stone-500 text-base md:text-lg max-w-xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
        >
          Every corner of your home, designed with intention
        </p>
        {/* Thin decorative rule */}
        <div className="mt-6 mx-auto w-12 h-px bg-stone-300" />
      </div>

      {/* Services grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {displayServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
