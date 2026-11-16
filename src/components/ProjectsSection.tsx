'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
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
    cover_image_url: '/portfolio/tv-unit-chandelier.png',
    gallery_image_urls: '/portfolio/tv-unit-chandelier.png,/portfolio/living-partition-grid.png',
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
    cover_image_url: '/portfolio/tv-unit-marble-panel.png',
    gallery_image_urls: '/portfolio/tv-unit-marble-panel.png,/portfolio/tv-unit-fluted-wood.png',
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
    cover_image_url: '/portfolio/living-partition-grid.png',
    gallery_image_urls: '/portfolio/living-partition-grid.png',
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
    cover_image_url: '/portfolio/kitchen-pink-overview.png',
    gallery_image_urls: '/portfolio/kitchen-pink-overview.png,/portfolio/kitchen-pink-shutter.png',
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
    cover_image_url: '/portfolio/kitchen-grey-open.png',
    gallery_image_urls: '/portfolio/kitchen-grey-open.png,/portfolio/kitchen-grey-upper.png',
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
    cover_image_url: '/portfolio/wardrobe-arc-design.png',
    gallery_image_urls: '/portfolio/wardrobe-arc-design.png,/portfolio/wardrobe-sliding-beige.png',
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
    cover_image_url: '/portfolio/wardrobe-sliding-beige.png',
    gallery_image_urls: '/portfolio/wardrobe-sliding-beige.png',
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
    cover_image_url: '/portfolio/bedroom-mural-wardrobe.png',
    gallery_image_urls: '/portfolio/bedroom-mural-wardrobe.png,/portfolio/bedroom-mural-platform.png',
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
    cover_image_url: '/portfolio/study-vanity-unit.png',
    gallery_image_urls: '/portfolio/study-vanity-unit.png,/portfolio/study-desk-unit.png',
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
    cover_image_url: '/portfolio/storage-unit-combo.png',
    gallery_image_urls: '/portfolio/storage-unit-combo.png',
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
    cover_image_url: '/portfolio/kitchen-fridge-unit.png',
    gallery_image_urls: '/portfolio/kitchen-fridge-unit.png',
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
    cover_image_url: '/portfolio/wardrobe-kids-blue.png',
    gallery_image_urls: '/portfolio/wardrobe-kids-blue.png',
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
    cover_image_url: '/portfolio/pooja-krishna-arch.png',
    gallery_image_urls: '/portfolio/pooja-krishna-arch.png,/portfolio/pooja-tirupati.png',
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
    cover_image_url: '/portfolio/pooja-ganesha-doors.png',
    gallery_image_urls: '/portfolio/pooja-ganesha-doors.png,/portfolio/pooja-elephant-doors.png',
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
    cover_image_url: '/portfolio/foyer-mirror-cabinet.png',
    gallery_image_urls: '/portfolio/foyer-mirror-cabinet.png',
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
    cover_image_url: '/portfolio/tv-unit-fluted-wood.png',
    gallery_image_urls: '/portfolio/tv-unit-fluted-wood.png',
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

/** Stagger index → pixel height for a loose masonry feel */
function cardHeight(index: number): string {
  const pattern = [340, 420, 360, 440, 320, 400];
  return `${pattern[index % pattern.length]}px`;
}

// ─── Intersection observer hook ───────────────────────────────────────────────

// ─── Focus trap inside Dialog (Radix handles this, included for safety) ───────

// Radix Dialog ships its own focus trap; we rely on that.

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const illustrative = isIllustrative(project);

  return (
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full overflow-hidden rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        height: cardHeight(index),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--tw-ring-color' as any]: '#B8955A',
      }}
      aria-label={`View ${project.title} at ${project.community}`}
    >
      {/* Image */}
      <img
        src={asset(project.cover_image_url)}
        alt={`${project.community} — ${project.title}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlay — always present, deepens on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(to top, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.18) 55%, transparent 100%)',
        }}
      />

      {/* Hover overlay — full cover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'rgba(26,24,20,0.45)' }}
      />

      {/* Illustrative badge (top-left) */}
      {illustrative && (
        <div
          className="absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest"
          style={{
            backgroundColor: 'rgba(26,24,20,0.68)',
            color: '#E8D9C0',
            fontFamily: 'sans-serif',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(184,149,90,0.4)',
          }}
        >
          Illustrative design concept
        </div>
      )}

      {/* Community badge (top-right) */}
      <div
        className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest"
        style={{
          backgroundColor: 'rgba(184,149,90,0.85)',
          color: '#1A1814',
          fontFamily: 'sans-serif',
          backdropFilter: 'blur(4px)',
        }}
      >
        {project.community}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <p
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: '#B8955A', fontFamily: 'sans-serif' }}
        >
          {project.category}
        </p>
        <h3
          className="text-lg font-normal leading-snug"
          style={{ color: '#F5EFE2', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {project.title}
        </h3>

        {/* Description — slides up on hover */}
        <p
          className="text-sm leading-relaxed mt-1 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
          style={{ color: '#D1C4AE', fontFamily: 'sans-serif' }}
        >
          {project.description}
        </p>

        {/* CTA */}
        <span
          className="inline-flex items-center gap-1 text-xs mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75"
          style={{ color: '#B8955A', fontFamily: 'sans-serif' }}
        >
          View project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
}

// ─── Lightbox / Modal ─────────────────────────────────────────────────────────

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

function Lightbox({ project, onClose }: LightboxProps) {
  const illustrative = project ? isIllustrative(project) : false;

  return (
    <Dialog.Root open={!!project} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay
          className="fixed inset-0 z-50"
          style={{
            backgroundColor: 'rgba(10,9,7,0.88)',
            backdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.25s ease',
          }}
        />

        {/* Panel */}
        <Dialog.Content
          className="fixed z-50 overflow-y-auto focus:outline-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(90vw, 920px)',
            maxHeight: '90vh',
            backgroundColor: '#1A1814',
            borderRadius: '2px',
            border: '1px solid rgba(184,149,90,0.25)',
            animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-describedby={project ? `lightbox-desc-${project.id}` : undefined}
        >
          {project && (
            <>
              {/* Image */}
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={asset(project.cover_image_url)}
                  alt={`${project.community} — ${project.title}`}
                  className="w-full h-full object-cover"
                />

                {/* Illustrative label over image */}
                {illustrative && (
                  <div
                    className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest"
                    style={{
                      backgroundColor: 'rgba(10,9,7,0.72)',
                      color: '#E8D9C0',
                      fontFamily: 'sans-serif',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(184,149,90,0.4)',
                    }}
                  >
                    Illustrative design concept
                  </div>
                )}

                {/* Close button */}
                <Dialog.Close
                  className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'rgba(10,9,7,0.6)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(184,149,90,0.35)',
                    color: '#E8D9C0',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ['--tw-outline-color' as any]: '#B8955A',
                  }}
                  aria-label="Close lightbox"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Dialog.Close>
              </div>

              {/* Copy */}
              <div className="p-6 md:p-8">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: '#B8955A', fontFamily: 'sans-serif' }}
                >
                  {project.community} &mdash; {project.category}
                </p>

                <Dialog.Title
                  className="text-2xl md:text-3xl font-normal leading-snug mb-3"
                  style={{ color: '#F5EFE2', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {project.title}
                </Dialog.Title>

                <p
                  id={`lightbox-desc-${project.id}`}
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: '#A89880', fontFamily: 'sans-serif' }}
                >
                  {project.description}
                </p>

                {illustrative && (
                  <p
                    className="text-xs mt-4 italic"
                    style={{ color: '#7C7569', fontFamily: 'sans-serif' }}
                  >
                    Images shown are illustrative design concepts to help you visualise the possibilities.
                  </p>
                )}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Fall back to hardcoded real photos when the Sheets data contains only
  // stock/sample images (image_kind !== 'real'), so the portfolio always shows
  // real photos until the user updates their Sheets with actual project data.
  const hasRealPhotos = projects && projects.length > 0 && projects.some((p) => p.image_kind === 'real');
  const displayProjects = hasRealPhotos ? projects! : DEFAULT_PROJECTS;

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'All'
    ? displayProjects
    : displayProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Keyframe styles for lightbox only */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.96) } to { opacity: 1; transform: translate(-50%, -50%) scale(1) } }
      `}</style>

      <section
        id="our-work"
        className="w-full px-6 py-20 md:px-12 lg:px-20"
        style={{ backgroundColor: '#F9F5EF' }}
      >
        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ color: '#B8955A', fontFamily: 'sans-serif' }}
          >
            Portfolio
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
            style={{ color: '#3B3A35', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Our Work
          </h2>
          <div
            className="mx-auto mt-4"
            style={{ width: 48, height: 1, backgroundColor: '#B8955A' }}
          />
        </div>

        {/* Category filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-5 py-2 text-sm transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                style={{
                  fontFamily: 'sans-serif',
                  backgroundColor: active ? '#B8955A' : 'transparent',
                  color: active ? '#F9F5EF' : '#7C7569',
                  border: active ? '1px solid #B8955A' : '1px solid #C8B99A',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ['--tw-ring-color' as any]: '#B8955A',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-inspired grid */}
        {filtered.length === 0 ? (
          <p
            className="text-center py-16"
            style={{ color: '#7C7569', fontFamily: 'sans-serif' }}
          >
            No projects in this category yet.
          </p>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gridAutoRows: '1px',
              alignItems: 'start',
            }}
          >
            {filtered.map((project, i) => {
              const h = parseInt(cardHeight(i), 10);
              return (
                <div
                  key={project.id}
                  style={{ gridRowEnd: `span ${h + 16}` }}
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    onOpen={setLightboxProject}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer for illustrative images */}
        <p
          className="text-center text-xs mt-8"
          style={{
            color: '#A89880',
            fontFamily: 'sans-serif',
          }}
        >
          Images marked &ldquo;Illustrative design concept&rdquo; are representative samples to help visualise the possibilities.
        </p>
      </section>

      {/* Lightbox */}
      <Lightbox
        project={lightboxProject}
        onClose={() => setLightboxProject(null)}
      />
    </>
  );
}
