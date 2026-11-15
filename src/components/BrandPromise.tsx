'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, Gem, UserCheck, HeartHandshake } from 'lucide-react';

interface Pillar {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    icon: Layers,
    title: 'End-to-End Execution',
    description:
      'From concept to handover, everything under one roof. No fragmented vendors, no dropped threads — just seamless execution at every stage.',
  },
  {
    icon: Gem,
    title: 'Carefully Selected Materials',
    description:
      'Premium finishes chosen for beauty and longevity. Each material is sourced with intention, ensuring your home ages with grace.',
  },
  {
    icon: UserCheck,
    title: 'Personal Attention',
    description:
      'Gautam Kumar personally oversees every project. Your home receives the same care and scrutiny as if it were his own.',
  },
  {
    icon: HeartHandshake,
    title: 'After-Sales Care',
    description:
      'Our relationship doesn\'t end at handover. We remain your partner long after you\'ve settled in, ensuring every detail endures.',
  },
];

function PillarCard({
  pillar,
  index,
  isVisible,
}: {
  pillar: Pillar;
  index: number;
  isVisible: boolean;
}) {
  const Icon = pillar.icon;

  return (
    <div
      className="group relative flex flex-col gap-5 rounded-sm border border-sand-dark bg-ivory p-8
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(74,90,58,0.10)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease-out ${index * 110}ms, transform 0.55s ease-out ${index * 110}ms, box-shadow 0.3s ease-out, translate 0.3s ease-out`,
      }}
    >
      {/* Icon container */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/30 bg-sand
          transition-colors duration-300 group-hover:border-brass/60 group-hover:bg-sand-dark"
      >
        <Icon className="h-5 w-5 text-brass transition-colors duration-300 group-hover:text-brass-light" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-display-sm text-olive-dark leading-tight">{pillar.title}</h3>
        <p className="font-sans text-sm leading-relaxed text-warm-gray">{pillar.description}</p>
      </div>

      {/* Subtle bottom accent line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px origin-left scale-x-0 bg-gradient-to-r from-brass/60 to-transparent
          transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </div>
  );
}

export default function BrandPromise() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-sand section-pad">
      <div className="container-site">
        {/* Section header */}
        <div
          className="mb-14 flex flex-col items-center text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.55s ease-out, transform 0.55s ease-out',
          }}
        >
          {/* Eyebrow rule */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-10 bg-brass/50" />
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-brass">
              Our Promise
            </span>
            <div className="h-px w-10 bg-brass/50" />
          </div>

          <h2 className="font-serif text-display-lg text-olive text-balance">
            Why families choose us
          </h2>
        </div>

        {/* 2×2 → 4-column grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
