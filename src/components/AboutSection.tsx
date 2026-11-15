'use client'

export default function AboutSection() {
  return (
    <section className="bg-ivory py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-brass mb-10 md:mb-14">
          About the Studio
        </p>

        {/* Split layout */}
        <div className="flex flex-col md:flex-row gap-0">

          {/* Left: decorative panel */}
          <div className="relative md:w-[38%] flex-shrink-0 bg-olive flex flex-col items-center justify-center px-8 py-14 md:py-16 min-h-[280px] md:min-h-0">
            {/* Brass border inset */}
            <div
              className="absolute inset-4 pointer-events-none"
              style={{ border: '1px solid rgba(184,151,90,0.45)' }}
            />
            {/* Inner brass accent lines — top + bottom */}
            <div
              className="absolute top-7 left-7 right-7 h-px"
              style={{ background: 'rgba(184,151,90,0.35)' }}
            />
            <div
              className="absolute bottom-7 left-7 right-7 h-px"
              style={{ background: 'rgba(184,151,90,0.35)' }}
            />

            {/* Studio name */}
            <div className="relative z-10 text-center px-4">
              {/* Small ornament */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: 'rgba(184,151,90,0.6)' }} />
                <div
                  className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                  style={{ background: 'rgba(184,151,90,0.8)' }}
                />
                <div className="h-px w-8" style={{ background: 'rgba(184,151,90,0.6)' }} />
              </div>

              <p
                className="font-sans text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ color: 'rgba(184,151,90,0.75)' }}
              >
                The
              </p>
              <h2
                className="font-serif font-light text-ivory leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '0.03em' }}
              >
                Goloka
              </h2>
              <h2
                className="font-serif font-light text-ivory leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '0.03em' }}
              >
                Design Studio
              </h2>

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-px w-8" style={{ background: 'rgba(184,151,90,0.6)' }} />
                <div
                  className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                  style={{ background: 'rgba(184,151,90,0.8)' }}
                />
                <div className="h-px w-8" style={{ background: 'rgba(184,151,90,0.6)' }} />
              </div>
            </div>
          </div>

          {/* Right: text content */}
          <div className="md:w-[62%] bg-sand px-8 md:px-14 py-12 md:py-14 flex flex-col justify-center">
            {/* Brass rule */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: 'rgba(184,151,90,0.5)' }} />
              <div
                className="w-1 h-1 rotate-45 flex-shrink-0"
                style={{ background: 'rgba(184,151,90,0.7)' }}
              />
            </div>

            {/* Body paragraphs */}
            <div className="space-y-5">
              <p
                className="font-serif font-light text-charcoal leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)' }}
              >
                Every home carries the fingerprints of the people who live in it. At The Goloka
                Design Studio, we begin every project by listening—to how you move through your
                spaces, what matters to you each morning, how your family comes together.
              </p>

              <p
                className="font-serif font-light text-charcoal leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)' }}
              >
                Gautam Kumar personally leads each project from the first design conversation
                through final handover, and continues to be available long after move-in day.
                This isn&rsquo;t just a business practice—it&rsquo;s a belief that the best
                interiors are built on lasting relationships.
              </p>

              <p
                className="font-serif font-light text-charcoal leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)' }}
              >
                We work with families at My Home Tridasa, My Home Sayuk, and other carefully
                selected communities, bringing the same level of attention to a compact bedroom
                as to a full-home transformation.
              </p>
            </div>

            {/* Brass rule */}
            <div className="flex items-center gap-4 my-8">
              <div
                className="w-1 h-1 rotate-45 flex-shrink-0"
                style={{ background: 'rgba(184,151,90,0.7)' }}
              />
              <div className="h-px flex-1" style={{ background: 'rgba(184,151,90,0.5)' }} />
            </div>

            {/* Signature */}
            <p
              className="font-serif italic text-olive-light"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
            >
              &mdash; by Gautam Kumar
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
