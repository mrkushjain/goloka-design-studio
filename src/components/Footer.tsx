'use client'

import type { SiteSettings } from '@/types'

interface FooterProps {
  settings?: Partial<SiteSettings>
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '/privacy' },
] as const

export default function Footer({ settings }: FooterProps) {
  const phone = settings?.contact_phone ?? '+91 98765 43210'
  const email = settings?.contact_email ?? 'hello@goloka.design'
  const instagramUrl = settings?.instagram_url ?? 'https://instagram.com/golokadesignstudio'
  const youtubeUrl = settings?.youtube_url ?? 'https://youtube.com/@GolokaDesignStudio'

  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-[#3b3a2e] text-[#f5f0e8]"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-serif text-xl font-light tracking-wide text-[#f5f0e8]">
                The Goloka Design Studio
              </p>
              <p className="mt-1 text-sm font-light text-[#c8bfa0]">
                by Gautam Kumar
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#b0a888]">
              End-to-end residential interiors crafted around your life — with
              quality you can see and care that continues after handover.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-[#c8bfa0] transition-colors hover:text-[#f5f0e8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch us on YouTube"
                className="text-[#c8bfa0] transition-colors hover:text-[#f5f0e8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#c8bfa0]">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#b0a888] transition-colors hover:text-[#f5f0e8]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#c8bfa0]">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-[#b0a888] transition-colors hover:text-[#f5f0e8]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-[#b0a888] transition-colors hover:text-[#f5f0e8]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#4e4d3f]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[#857d68] sm:flex-row lg:px-8">
          <p>
            &copy; {year} The Goloka Design Studio. All rights reserved.
          </p>
          <p className="italic">Built with care in Hyderabad</p>
        </div>
      </div>
    </footer>
  )
}
