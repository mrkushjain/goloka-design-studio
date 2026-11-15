'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''));

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Scroll detection for sticky blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: '#4A5A3A',
          color: '#FAF7F2',
          outlineColor: '#B8975A',
        }}
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md shadow-sm'
            : ''
        )}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(250, 247, 242, 0.88)'
            : 'rgba(250, 247, 242, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo wordmark */}
            <a
              href="#"
              aria-label="Goloka Design Studio — home"
              className="flex flex-col items-start leading-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
              style={{ outlineColor: '#B8975A' }}
            >
              <span
                className="text-2xl tracking-[0.18em] font-semibold transition-colors duration-200"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: '#4A5A3A',
                  letterSpacing: '0.18em',
                }}
              >
                GOLOKA
              </span>
              <span
                className="text-[10px] tracking-[0.28em] uppercase transition-colors duration-200 mt-0.5"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: '#B8975A',
                  letterSpacing: '0.28em',
                }}
              >
                Design Studio
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={href}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'text-sm tracking-wide transition-colors duration-200 relative pb-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded',
                      isActive ? 'font-medium' : 'font-normal'
                    )}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      color: isActive ? '#4A5A3A' : '#6B7560',
                      outlineColor: '#B8975A',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                    {/* Active underline */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 right-0 h-px transition-transform duration-200 origin-left',
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      )}
                      style={{ backgroundColor: '#B8975A' }}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <a
                href="#contact"
                className={cn(
                  'hidden md:inline-flex items-center justify-center',
                  'px-5 py-2.5 text-sm tracking-wide font-medium rounded',
                  'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                )}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  backgroundColor: '#4A5A3A',
                  color: '#FAF7F2',
                  outlineColor: '#B8975A',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#B8975A';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#4A5A3A';
                }}
              >
                Book a Free Consultation
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={toggleMobileMenu}
                className={cn(
                  'md:hidden p-2 rounded transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                )}
                style={{
                  color: '#4A5A3A',
                  outlineColor: '#B8975A',
                }}
              >
                {isMobileMenuOpen ? (
                  <X size={22} aria-hidden="true" />
                ) : (
                  <Menu size={22} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          style={{ backgroundColor: '#FAF7F2' }}
        >
          {/* Subtle divider */}
          <div
            className="h-px mx-4"
            style={{ backgroundColor: '#F0E9DC' }}
            aria-hidden="true"
          />

          <div className="px-4 pt-4 pb-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={handleNavLinkClick}
                  className={cn(
                    'px-3 py-3 text-base rounded transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'
                  )}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    color: isActive ? '#4A5A3A' : '#6B7560',
                    fontWeight: isActive ? 500 : 400,
                    backgroundColor: isActive ? '#F0E9DC' : 'transparent',
                    outlineColor: '#B8975A',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              );
            })}

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={handleNavLinkClick}
              className="mt-3 flex items-center justify-center px-5 py-3 text-sm tracking-wide font-medium rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                backgroundColor: '#4A5A3A',
                color: '#FAF7F2',
                outlineColor: '#B8975A',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#B8975A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#4A5A3A';
              }}
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
