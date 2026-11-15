'use client';

import { useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'What does end-to-end service mean?',
    answer:
      'We handle everything — design, procurement, execution, and handover — so you have a single point of contact and accountability throughout your project.',
  },
  {
    question: 'How does the initial consultation work?',
    answer:
      "Your first consultation is free. We visit your home, understand your vision and lifestyle, and walk you through our design process. There's no obligation to proceed.",
  },
  {
    question: 'What materials do you typically use?',
    answer:
      'We work with a curated selection of quality materials chosen for durability, finish, and everyday practicality. During the design phase, we present options across different price points so you can make informed choices.',
  },
  {
    question: 'Can I customise the designs?',
    answer:
      'Absolutely. Every project begins with understanding how you live — your routines, your aesthetic preferences, your storage needs. The designs are built around you, not the other way around.',
  },
  {
    question: 'How is the project timeline determined?',
    answer:
      'Timelines depend on the scope, complexity, and site conditions. We provide a clear schedule at the quotation stage and keep you informed of progress throughout.',
  },
  {
    question: 'What happens after handover?',
    answer:
      'We stay in touch. If you notice anything that needs attention after moving in, reach out to us directly. After-sales care is a core part of how we work.',
  },
];

interface FAQItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const id = `faq-answer-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(107, 97, 68, 0.2)',
      }}
    >
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => onToggle(index)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#4a5240',
            lineHeight: 1.4,
            letterSpacing: '0.01em',
          }}
        >
          {faq.question}
        </span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            border: '1.5px solid #9a8c5a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9a8c5a',
            fontSize: '1rem',
            lineHeight: 1,
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            backgroundColor: isOpen ? '#9a8c5a' : 'transparent',
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="5"
              y1="1"
              x2="5"
              y2="9"
              stroke={isOpen ? '#faf8f3' : '#9a8c5a'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="5"
              x2="9"
              y2="5"
              stroke={isOpen ? '#faf8f3' : '#9a8c5a'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={buttonId}
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '400px' : '0',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1rem',
            color: '#7a7060',
            lineHeight: 1.75,
            paddingBottom: '20px',
            margin: 0,
            paddingRight: '38px',
          }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      aria-labelledby="faq-heading"
      style={{
        backgroundColor: '#faf8f3',
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        <h2
          id="faq-heading"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            color: '#3a3728',
            marginBottom: '56px',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          }}
        >
          Questions we're often asked
        </h2>

        <div
          style={{
            borderTop: '1px solid rgba(107, 97, 68, 0.2)',
          }}
        >
          {items.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
