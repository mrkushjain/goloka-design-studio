'use client';

import React from 'react';

interface VideoCard {
  title: string;
  thumbnailUrl: string;
  linkUrl: string;
}

interface SocialSectionProps {
  instagramUrl?: string;
  youtubeUrl?: string;
  videoCards?: VideoCard[];
}

const DEFAULT_VIDEO_CARDS: VideoCard[] = [
  {
    title: 'Modern Kitchen Renovation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c67fb0?w=600&q=80',
    linkUrl: 'https://youtube.com/@GolokaDesignStudio',
  },
  {
    title: 'Minimalist Living Room',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c67fb0?w=600&q=80',
    linkUrl: 'https://youtube.com/@GolokaDesignStudio',
  },
  {
    title: 'Studio Office Makeover',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c67fb0?w=600&q=80',
    linkUrl: 'https://youtube.com/@GolokaDesignStudio',
  },
];

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-8 h-8"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-8 h-8"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-10 h-10 text-white drop-shadow-lg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function SocialSection({
  instagramUrl = 'https://instagram.com/golokadesignstudio',
  youtubeUrl = 'https://youtube.com/@GolokaDesignStudio',
  videoCards = DEFAULT_VIDEO_CARDS,
}: SocialSectionProps) {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-24 bg-[#f7f4ef]"
      aria-labelledby="social-section-heading"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8b7d5a] font-medium mb-3">
            Connect with us
          </p>
          <h2
            id="social-section-heading"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2c2a26] leading-tight"
          >
            Follow our design journey
          </h2>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* YouTube Card */}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-white border border-[#e8e2d9] p-8 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a070]"
            aria-label="Watch our projects on YouTube — opens in new tab"
          >
            {/* Red accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff0000] rounded-t-2xl" />

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#ff0000]/10 flex items-center justify-center text-[#ff0000]">
                <YoutubeIcon />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8b7d5a] font-medium mb-0.5">
                  YouTube
                </p>
                <p className="text-lg font-serif text-[#2c2a26] leading-snug">
                  Watch our projects come to life
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6b6355] leading-relaxed">
              Behind-the-scenes walkthroughs, before-and-after reveals, and deep dives into
              our design process — from first sketch to final install.
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-[#ff0000] mt-auto">
              <span>Subscribe on YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl bg-white border border-[#e8e2d9] p-8 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a070]"
            aria-label="Follow us on Instagram — opens in new tab"
          >
            {/* Instagram gradient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{
                background:
                  'linear-gradient(90deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
              }}
            />

            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
                  color: '#ffffff',
                }}
              >
                <InstagramIcon />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8b7d5a] font-medium mb-0.5">
                  Instagram
                </p>
                <p className="text-lg font-serif text-[#2c2a26] leading-snug">
                  Daily design inspiration
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6b6355] leading-relaxed">
              Curated moodboards, texture studies, material samples, and glimpses of
              projects in progress — your daily dose of considered interiors.
            </p>

            <div
              className="flex items-center gap-2 text-sm font-medium mt-auto"
              style={{ color: '#c0186b' }}
            >
              <span>Follow on Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </a>
        </div>

        {/* Video Thumbnail Grid */}
        {videoCards.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7d5a] font-medium">
                Recent projects
              </p>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.15em] text-[#8b7d5a] font-medium hover:text-[#2c2a26] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a070] rounded"
              >
                View all &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videoCards.map((card, index) => (
                <a
                  key={index}
                  href={card.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-[#e8e2d9] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a070]"
                  aria-label={`Watch ${card.title} on YouTube — opens in new tab`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-[#e8e2d9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.thumbnailUrl}
                      alt={`Thumbnail for ${card.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon />
                      </div>
                    </div>
                    {/* Olive corner accent */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#6b7a3e]/80 backdrop-blur-sm">
                      <span className="text-[10px] text-white font-medium uppercase tracking-wider">
                        Watch
                      </span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-4 py-3 flex items-center gap-3">
                    <div className="flex-shrink-0 text-[#cc0000]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[#2c2a26] truncate leading-snug">
                      {card.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
