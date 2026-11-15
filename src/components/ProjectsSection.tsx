'use client';

import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Project } from '@/types';

// ─── Default projects (shown when API unavailable) ───────────────────────────

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'default-1',
    title: 'Living Room',
    community: 'My Home Tridasa',
    category: 'Living',
    description:
      'An airy living room designed for a Tridasa community home — warm tones, curated art, and abundant natural light.',
    cover_image_url:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 1,
  },
  {
    id: 'default-2',
    title: 'Kitchen',
    community: 'My Home Tridasa',
    category: 'Kitchen',
    description:
      'A modern modular kitchen with matte finishes, handleless cabinetry, and a view that makes cooking a pleasure.',
    cover_image_url:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 2,
  },
  {
    id: 'default-3',
    title: 'Master Bedroom',
    community: 'My Home Tridasa',
    category: 'Bedroom',
    description:
      'A serene master bedroom retreat — custom upholstered headboard, layered lighting, and a palette drawn from nature.',
    cover_image_url:
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 3,
  },
  {
    id: 'default-4',
    title: 'Living Space',
    community: 'My Home Sayuk',
    category: 'Living',
    description:
      'Open-plan living designed for a Sayuk family home — flexible seating, bespoke joinery, and an inviting warmth.',
    cover_image_url:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 4,
  },
  {
    id: 'default-5',
    title: 'Dining Area',
    community: 'My Home Sayuk',
    category: 'Dining',
    description:
      'A warm dining area in a Sayuk home — a statement pendant, solid-wood table, and thoughtful spatial flow.',
    cover_image_url:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 5,
  },
  {
    id: 'default-6',
    title: 'Bedroom',
    community: 'My Home Sayuk',
    category: 'Bedroom',
    description:
      'A calm, clutter-free bedroom in a Sayuk home — built-in storage, soft drapery, and a colour story that soothes.',
    cover_image_url:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    gallery_image_urls: '',
    image_kind: 'stock',
    published: true,
    sort_order: 6,
  },
];

const CATEGORIES = ['All', 'Living', 'Kitchen', 'Bedroom', 'Dining'] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isIllustrative(project: Project): boolean {
  return (
    project.image_kind === 'stock' ||
    project.id.startsWith('default-')
  );
}

/** Stagger index → pixel height for a loose masonry feel */
function cardHeight(index: number): string {
  const pattern = [340, 420, 360, 440, 320, 400];
  return `${pattern[index % pattern.length]}px`;
}

// ─── Intersection observer hook ───────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Focus trap inside Dialog (Radix handles this, included for safety) ───────

// Radix Dialog ships its own focus trap; we rely on that.

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, index, inView, onOpen }: ProjectCardProps) {
  const illustrative = isIllustrative(project);

  return (
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full overflow-hidden rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        height: cardHeight(index),
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
        transition: `opacity 0.65s ease ${0.08 * index}s, transform 0.65s ease ${0.08 * index}s`,
        // brass focus ring
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--tw-ring-color' as any]: '#B8955A',
      }}
      aria-label={`View ${project.title} at ${project.community}`}
    >
      {/* Image */}
      <img
        src={project.cover_image_url}
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
                  src={project.cover_image_url}
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
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const { ref: sectionRef, inView } = useInView(0.08);

  const filtered = activeCategory === 'All'
    ? displayProjects
    : displayProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.96) } to { opacity: 1; transform: translate(-50%, -50%) scale(1) } }
      `}</style>

      <section
        ref={sectionRef}
        id="our-work"
        className="w-full px-6 py-20 md:px-12 lg:px-20"
        style={{ backgroundColor: '#F9F5EF' }}
      >
        {/* Section heading */}
        <div
          className="text-center mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
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
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.15s',
          }}
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
                    inView={inView}
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
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
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
