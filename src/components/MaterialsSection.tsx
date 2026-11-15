'use client';

import Image from 'next/image';
import { useRef } from 'react';

const materials = [
  {
    id: 'wood',
    name: 'Solid Wood',
    category: 'Structure',
    description:
      'Seasoned hardwoods selected for tight grain and dimensional stability. Each piece is hand-inspected before cutting.',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Close-up of warm wood grain texture',
  },
  {
    id: 'stone',
    name: 'Natural Stone',
    category: 'Surface',
    description:
      'Quarried slabs — marble, granite, quartzite — sealed for daily use without dulling the character of the natural veining.',
    src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    alt: 'Close-up of a smooth stone surface with natural veining',
  },
  {
    id: 'brass',
    name: 'Solid Brass',
    category: 'Hardware',
    description:
      'Cast and hand-finished hardware in unlacquered or satin brass. It develops a natural patina over time, never peeling or pitting.',
    src: 'https://images.unsplash.com/photo-1587467512961-120760940315?w=600&q=80',
    alt: 'Close-up of polished brass hardware detail',
  },
  {
    id: 'fabric',
    name: 'Performance Fabric',
    category: 'Upholstery',
    description:
      'Tightly woven textiles chosen for breathability, stain resistance, and colour retention — without the stiff feel of heavily treated cloth.',
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    alt: 'Close-up of woven fabric texture in earthy tones',
  },
];

const focusAreas = [
  {
    label: 'Durability',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" />
      </svg>
    ),
    description:
      'Materials are sourced with long lifecycles in mind. We avoid veneers, MDF cores, and coatings that chip within years.',
  },
  {
    label: 'Finish Quality',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    description:
      'Every surface is hand-sanded and inspected at multiple stages. Joints are tight. Edges are eased. Nothing leaves the workshop looking rushed.',
  },
  {
    label: 'Everyday Practicality',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description:
      'Beautiful furniture has to live in real homes. We test for heat, moisture, and daily wear so your pieces age well, not just look good on delivery day.',
  },
];

export default function MaterialsSection() {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    stripRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    stripRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section
      className="bg-sand py-20 md:py-28 overflow-hidden"
      aria-labelledby="materials-heading"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-18">
          <p className="font-sans text-sm font-medium tracking-widest uppercase text-terracotta mb-4">
            Materials & Craftsmanship
          </p>
          <h2
            id="materials-heading"
            className="font-serif text-display-md text-charcoal mb-5 leading-tight"
          >
            Built to last.
            <br />
            Finished to impress.
          </h2>
          <p className="font-sans text-base md:text-lg text-warm-gray leading-relaxed">
            We select materials for how they look on day one — and how they hold up for years
            to come.
          </p>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="relative">
        {/* Scroll controls */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll materials left"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm text-charcoal shadow-md hover:bg-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          aria-label="Scroll materials right"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm text-charcoal shadow-md hover:bg-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-sand to-transparent pointer-events-none z-[1]" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-sand to-transparent pointer-events-none z-[1]" aria-hidden="true" />

        {/* Scrollable strip */}
        <div
          ref={stripRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10 md:px-20 pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
          role="list"
          aria-label="Material textures"
        >
          {materials.map((mat) => (
            <article
              key={mat.id}
              role="listitem"
              className="flex-none w-72 md:w-80 scroll-snap-align-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image with overlay */}
              <div className="relative h-96 rounded-xl overflow-hidden group">
                <Image
                  src={mat.src}
                  alt={mat.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" aria-hidden="true" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block font-sans text-xs font-semibold tracking-widest uppercase bg-brass/90 text-ivory px-3 py-1 rounded-full">
                    {mat.category}
                  </span>
                </div>
                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl text-ivory mb-1">{mat.name}</h3>
                  <p className="font-sans text-sm text-ivory/80 leading-relaxed line-clamp-3">
                    {mat.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Scroll hint on mobile */}
      <p className="md:hidden font-sans text-xs text-warm-gray-light text-center mt-3 tracking-wide" aria-hidden="true">
        Swipe to explore
      </p>

      {/* Focus areas */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 md:mt-20">
        <div className="border-t border-sand-dark pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {focusAreas.map((area) => (
              <div key={area.label} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-terracotta">
                  {area.icon}
                  <h3 className="font-sans text-sm font-semibold tracking-wide uppercase text-charcoal">
                    {area.label}
                  </h3>
                </div>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
