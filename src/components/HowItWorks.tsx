'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Tell us about your home',
    description:
      'Share your vision, floor plan, and how your family lives. We listen first.',
  },
  {
    number: '02',
    title: 'Explore designs and materials',
    description:
      'Browse curated options tailored to your style and budget range.',
  },
  {
    number: '03',
    title: 'Finalize the scope and quotation',
    description: 'Clear scope, transparent pricing, no surprises.',
  },
  {
    number: '04',
    title: 'Watch your interiors take shape',
    description:
      'Our team executes with care, keeping you informed throughout.',
  },
  {
    number: '05',
    title: 'Move in with ongoing support',
    description:
      "We're here after handover for any adjustments or questions.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function HowItWorks() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#F9F5EF' }}
      className="w-full px-6 py-20 md:px-12 lg:px-20"
    >
      {/* Section heading */}
      <div
        className="text-center mb-16"
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
          The process
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
          style={{ color: '#3B3A35', fontFamily: 'Georgia, serif' }}
        >
          Your journey to a beautiful home
        </h2>
      </div>

      {/* Desktop: horizontal steps */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between gap-0">
          {/* Connecting brass line */}
          <div
            className="absolute top-10 left-0 right-0 h-px"
            style={{
              backgroundColor: '#B8955A',
              marginLeft: '10%',
              marginRight: '10%',
              opacity: inView ? 1 : 0,
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center px-4 flex-1"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s`,
              }}
            >
              {/* Step number circle */}
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                style={{ backgroundColor: '#F9F5EF', border: '1.5px solid #B8955A' }}
              >
                <span
                  className="text-2xl font-normal leading-none select-none"
                  style={{ color: '#6B6B3A', fontFamily: 'Georgia, serif' }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-base font-semibold mb-2 leading-snug"
                style={{ color: '#3B3A35', fontFamily: 'sans-serif' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#7C7569', fontFamily: 'sans-serif', maxWidth: '17ch', margin: '0 auto' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical accordion */}
      <div className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => {
          const isOpen = openStep === i;
          return (
            <div
              key={step.number}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
              }}
            >
              {/* Vertical connector line above (except first) */}
              {i > 0 && (
                <div
                  className="w-px mx-auto"
                  style={{
                    height: '28px',
                    backgroundColor: '#B8955A',
                    opacity: 0.6,
                  }}
                />
              )}

              <button
                onClick={() => setOpenStep(isOpen ? null : i)}
                className="w-full flex items-center gap-4 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                {/* Circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{
                    border: '1.5px solid #B8955A',
                    backgroundColor: isOpen ? '#B8955A' : '#F9F5EF',
                  }}
                >
                  <span
                    className="text-lg font-normal leading-none select-none"
                    style={{
                      color: isOpen ? '#F9F5EF' : '#6B6B3A',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title row */}
                <div className="flex-1">
                  <span
                    className="text-base font-semibold"
                    style={{ color: '#3B3A35', fontFamily: 'sans-serif' }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Chevron */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#B8955A',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Accordion body */}
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '120px' : '0px',
                  transition: 'max-height 0.35s ease',
                }}
              >
                <p
                  className="text-sm leading-relaxed pt-3 pb-1 pl-18"
                  style={{
                    color: '#7C7569',
                    fontFamily: 'sans-serif',
                    paddingLeft: '4.5rem',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
