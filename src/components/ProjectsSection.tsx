'use client';

import { useCallback, useEffect, useState } from 'react';
import { Project } from '@/types';

// Prepend basePath so local /portfolio/ images resolve correctly on GitHub Pages.
function asset(path: string): string {
  if (!path || path.startsWith('http')) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${base}${path}`;
}

// ─── Real project photos ──────────────────────────────────────────────────────

const DEFAULT_PROJECTS: Project[] = [
  // ── My Home Tridasa ─────────────────────────────────────────────────────────
  {
    id: 'tridasa-tv-chandelier',
    title: 'TV Unit with Crystal Chandelier',
    community: 'My Home Tridasa',
    category: 'Living',
    description:
      'Floating TV panel with clean white lacquer finish, V-pull drawers, and a stunning crystal chandelier that anchors the living space.',
    cover_image_url: '/portfolio/tv-unit-chandelier.webp',
    gallery_image_urls: '/portfolio/tv-unit-chandelier.webp,/portfolio/living-partition-grid.webp',
    image_kind: 'real',
    published: true,
    sort_order: 1,
  },
  {
    id: 'tridasa-tv-marble',
    title: 'TV Unit — Marble Accent Wall',
    community: 'My Home Tridasa',
    category: 'Living',
    description:
      'Wall-mounted TV unit with Calacatta marble-effect panel, flanked by warm teak open shelving and a fluted wood accent column.',
    cover_image_url: '/portfolio/tv-unit-marble-panel.webp',
    gallery_image_urls: '/portfolio/tv-unit-marble-panel.webp,/portfolio/tv-unit-fluted-wood.webp',
    image_kind: 'real',
    published: true,
    sort_order: 2,
  },
  {
    id: 'tridasa-living-partition',
    title: 'Living Room Partition',
    community: 'My Home Tridasa',
    category: 'Living',
    description:
      'An open grid partition in white — a design element that separates spaces while keeping the apartment feeling open and airy.',
    cover_image_url: '/portfolio/living-partition-grid.webp',
    gallery_image_urls: '/portfolio/living-partition-grid.webp',
    image_kind: 'real',
    published: true,
    sort_order: 3,
  },
  {
    id: 'tridasa-kitchen-pink',
    title: 'Modular Kitchen — Rose Blush',
    community: 'My Home Tridasa',
    category: 'Kitchen',
    description:
      'Modular kitchen in a soft rose-blush finish with black aluminium shutters, marble-effect backsplash, and an integrated chimney.',
    cover_image_url: '/portfolio/kitchen-pink-overview.webp',
    gallery_image_urls: '/portfolio/kitchen-pink-overview.webp,/portfolio/kitchen-pink-shutter.webp',
    image_kind: 'real',
    published: true,
    sort_order: 4,
  },
  {
    id: 'tridasa-kitchen-grey',
    title: 'Modular Kitchen — Slate Blue',
    community: 'My Home Tridasa',
    category: 'Kitchen',
    description:
      'High-gloss slate-blue wall cabinets with under-shelf LED lighting, open display niches, and a crisp white countertop.',
    cover_image_url: '/portfolio/kitchen-grey-open.webp',
    gallery_image_urls: '/portfolio/kitchen-grey-open.webp,/portfolio/kitchen-grey-upper.webp',
    image_kind: 'real',
    published: true,
    sort_order: 5,
  },
  {
    id: 'tridasa-wardrobe-arc',
    title: 'Wardrobe — Arc Router Design',
    community: 'My Home Tridasa',
    category: 'Wardrobe',
    description:
      'Four-door floor-to-ceiling wardrobe in off-white with elegant arc router detailing and sleek matte-black bar handles.',
    cover_image_url: '/portfolio/wardrobe-arc-design.webp',
    gallery_image_urls: '/portfolio/wardrobe-arc-design.webp,/portfolio/wardrobe-sliding-beige.webp',
    image_kind: 'real',
    published: true,
    sort_order: 6,
  },
  {
    id: 'tridasa-wardrobe-sliding',
    title: 'Sliding Wardrobe — Two-tone',
    community: 'My Home Tridasa',
    category: 'Wardrobe',
    description:
      'Sliding wardrobe with a two-tone panel design — white and warm beige — framed in brushed aluminium with recessed pulls.',
    cover_image_url: '/portfolio/wardrobe-sliding-beige.webp',
    gallery_image_urls: '/portfolio/wardrobe-sliding-beige.webp',
    image_kind: 'real',
    published: true,
    sort_order: 7,
  },
  // ── My Home Sayuk ───────────────────────────────────────────────────────────
  {
    id: 'sayuk-bedroom-mural',
    title: 'Master Bedroom — Mountain Mural',
    community: 'My Home Sayuk',
    category: 'Bedroom',
    description:
      'Master bedroom with a dramatic landscape mural wall, padded leather headboard, platform bed, and LED false-ceiling details.',
    cover_image_url: '/portfolio/bedroom-mural-wardrobe.webp',
    gallery_image_urls: '/portfolio/bedroom-mural-wardrobe.webp,/portfolio/bedroom-mural-platform.webp',
    image_kind: 'real',
    published: true,
    sort_order: 8,
  },
  {
    id: 'sayuk-study-vanity',
    title: 'Study & Vanity Unit',
    community: 'My Home Sayuk',
    category: 'Bedroom',
    description:
      'Warm walnut study unit with wall-mounted cabinets, a curved desk surface, integrated lighting, and open display shelving.',
    cover_image_url: '/portfolio/study-vanity-unit.webp',
    gallery_image_urls: '/portfolio/study-vanity-unit.webp,/portfolio/study-desk-unit.webp',
    image_kind: 'real',
    published: true,
    sort_order: 9,
  },
  {
    id: 'sayuk-storage-combo',
    title: 'Storage & Pooja Combo Unit',
    community: 'My Home Sayuk',
    category: 'Living',
    description:
      'Multi-functional unit combining overhead storage, a crockery counter, open display shelves, and a compact pooja cabinet.',
    cover_image_url: '/portfolio/storage-unit-combo.webp',
    gallery_image_urls: '/portfolio/storage-unit-combo.webp',
    image_kind: 'real',
    published: true,
    sort_order: 10,
  },
  {
    id: 'sayuk-kitchen-fridge',
    title: 'Kitchen — Warm Wood & Glass',
    community: 'My Home Sayuk',
    category: 'Kitchen',
    description:
      'Open-plan kitchen with warm wood cabinets, glass-shutter wall units backlit in amber, and clean white base counters.',
    cover_image_url: '/portfolio/kitchen-fridge-unit.webp',
    gallery_image_urls: '/portfolio/kitchen-fridge-unit.webp',
    image_kind: 'real',
    published: true,
    sort_order: 11,
  },
  {
    id: 'sayuk-wardrobe-kids',
    title: "Kid's Wardrobe — Blue & White",
    community: 'My Home Sayuk',
    category: 'Wardrobe',
    description:
      'Cheerful two-tone wardrobe for a child\'s room — muted steel blue lower doors with white loft cabinets and playful dinosaur handles.',
    cover_image_url: '/portfolio/wardrobe-kids-blue.webp',
    gallery_image_urls: '/portfolio/wardrobe-kids-blue.webp',
    image_kind: 'real',
    published: true,
    sort_order: 12,
  },
  {
    id: 'sayuk-pooja-krishna',
    title: 'Pooja Unit — Krishna Mandir',
    community: 'My Home Sayuk',
    category: 'Pooja',
    description:
      'Beautifully crafted pooja unit with a backlit arched Krishna mural, marble finish, turned wooden columns, and a stepped prasad shelf.',
    cover_image_url: '/portfolio/pooja-krishna-arch.webp',
    gallery_image_urls: '/portfolio/pooja-krishna-arch.webp,/portfolio/pooja-tirupati.webp',
    image_kind: 'real',
    published: true,
    sort_order: 13,
  },
  {
    id: 'sayuk-pooja-ganesha',
    title: 'Pooja Unit — Ganesha Mandir',
    community: 'My Home Sayuk',
    category: 'Pooja',
    description:
      'Warm copper-toned mandir with hand-painted Ganesha glass panels, arched top details, brass bell accents, and a side display cabinet.',
    cover_image_url: '/portfolio/pooja-ganesha-doors.webp',
    gallery_image_urls: '/portfolio/pooja-ganesha-doors.webp,/portfolio/pooja-elephant-doors.webp',
    image_kind: 'real',
    published: true,
    sort_order: 14,
  },
  {
    id: 'sayuk-foyer',
    title: 'Foyer — Mirror & Storage',
    community: 'My Home Sayuk',
    category: 'Living',
    description:
      'Slim entrance foyer unit with a tall arched mirror, decorative pendant, and a compact storage cabinet — a welcoming first impression.',
    cover_image_url: '/portfolio/foyer-mirror-cabinet.webp',
    gallery_image_urls: '/portfolio/foyer-mirror-cabinet.webp',
    image_kind: 'real',
    published: true,
    sort_order: 15,
  },
  {
    id: 'sayuk-tv-fluted',
    title: 'TV Unit — Fluted Wood Panel',
    community: 'My Home Sayuk',
    category: 'Living',
    description:
      'TV wall featuring fluted teak wood cladding, a floating media console with under-unit LED strip, and a tall glass display cabinet.',
    cover_image_url: '/portfolio/tv-unit-fluted-wood.webp',
    gallery_image_urls: '/portfolio/tv-unit-fluted-wood.webp',
    image_kind: 'real',
    published: true,
    sort_order: 16,
  },
];

const CATEGORIES = ['All', 'Living', 'Kitchen', 'Bedroom', 'Wardrobe', 'Pooja'] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isIllustrative(project: Project): boolean {
  // Only mark as illustrative if explicitly flagged as stock
  return project.image_kind === 'stock';
}

// ─── Main exported component ──────────────────────────────────────────────────

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const hasRealPhotos = projects && projects.length > 0 && projects.some((p) => p.image_kind === 'real');
  const displayProjects = hasRealPhotos ? projects! : DEFAULT_PROJECTS;

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  const filtered = activeCategory === 'All'
    ? displayProjects
    : displayProjects.filter((p) => p.category === activeCategory);

  const total = filtered.length;

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(((idx % total) + total) % total);
      setFade(true);
    }, 220);
  }, [total]);

  // Reset to first slide when category changes
  useEffect(() => { setCurrent(0); setFade(true); }, [activeCategory]);

  // Auto-advance every 4 s when not paused and more than 1 slide
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(id);
  }, [current, paused, total, goTo]);

  const project = filtered[current] ?? filtered[0];
  if (!project) return null;

  return (
    <section
      id="our-work"
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: '#F9F5EF' }}
    >
      {/* Section heading */}
      <div className="text-center mb-8 px-6">
        <p className="uppercase tracking-widest text-xs mb-3" style={{ color: '#B8955A', fontFamily: 'sans-serif' }}>
          Portfolio
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
          style={{ color: '#3B3A35', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Our Work
        </h2>
        <div className="mx-auto mt-4" style={{ width: 48, height: 1, backgroundColor: '#B8955A' }} />
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-6" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-5 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{
                fontFamily: 'sans-serif',
                backgroundColor: active ? '#B8955A' : 'transparent',
                color: active ? '#F9F5EF' : '#7C7569',
                border: active ? '1px solid #B8955A' : '1px solid #C8B99A',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Slideshow */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9', maxHeight: '72vh' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Portfolio slideshow"
      >
        {/* Slide image */}
        <img
          key={project.id}
          src={asset(project.cover_image_url)}
          alt={`${project.community} — ${project.title}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: 'opacity 0.4s ease', opacity: fade ? 1 : 0 }}
          loading="lazy"
          decoding="async"
        />

        {/* Preload next image off-screen */}
        {total > 1 && (
          <img
            src={asset(filtered[(current + 1) % total].cover_image_url)}
            alt=""
            aria-hidden="true"
            className="sr-only"
            loading="eager"
          />
        )}

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(26,24,20,0.75) 0%, transparent 50%)' }}
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 md:pb-8">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'sans-serif' }}>
            {project.community}
          </p>
          <p
            className="text-white text-xl md:text-2xl font-normal"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {project.title}
          </p>
        </div>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous project"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus-visible:outline-none"
              style={{ backgroundColor: 'rgba(249,245,239,0.18)', color: '#F9F5EF' }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next project"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-colors focus-visible:outline-none"
              style={{ backgroundColor: 'rgba(249,245,239,0.18)', color: '#F9F5EF' }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-4 right-6 flex gap-1.5">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all focus-visible:outline-none"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  backgroundColor: i === current ? '#B8955A' : 'rgba(249,245,239,0.5)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
