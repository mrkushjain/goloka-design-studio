import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for The Goloka Design Studio — how we collect, use, and protect your information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Top navigation bar */}
      <header className="border-b border-sand-dark/40">
        <div className="container-site py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-olive-dark text-lg tracking-wide hover:text-olive transition-colors"
          >
            The Goloka Design Studio
          </Link>
          <Link
            href="/"
            className="font-sans text-sm text-warm-gray hover:text-charcoal transition-colors flex items-center gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to home
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="container-site py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Page heading */}
          <div className="mb-12">
            <h1 className="font-serif text-display-md text-olive-dark mb-3">Privacy Policy</h1>
            <p className="font-sans text-sm text-warm-gray">Last updated: 15 November 2026</p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="font-sans text-base text-charcoal leading-relaxed">
              The Goloka Design Studio is a residential interior design studio based in Hyderabad.
              We take privacy seriously. This page explains plainly what information we collect when
              you reach out to us, how we use it, and what rights you have.
            </p>
          </section>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                1. Information we collect
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed mb-3">
                When you submit the enquiry form on our website, we collect:
              </p>
              <ul className="font-sans text-base text-charcoal leading-relaxed space-y-2 pl-5 list-disc marker:text-olive">
                <li>Your <strong className="font-medium">name</strong></li>
                <li>Your <strong className="font-medium">phone number</strong></li>
                <li>Your <strong className="font-medium">city</strong></li>
              </ul>
              <p className="font-sans text-base text-charcoal leading-relaxed mt-3">
                We do not collect payment details, government IDs, or any sensitive personal data
                through this website.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                2. How we use your information
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed mb-3">
                We use the information you provide solely to:
              </p>
              <ul className="font-sans text-base text-charcoal leading-relaxed space-y-2 pl-5 list-disc marker:text-olive">
                <li>Respond to your design enquiry</li>
                <li>Schedule and book a consultation with Gautam Kumar</li>
                <li>Follow up on your project if you become a client</li>
              </ul>
              <p className="font-sans text-base text-charcoal leading-relaxed mt-3">
                We will never use your contact details to send unsolicited marketing messages.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                3. Where your information is stored
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                Enquiry submissions are stored in a private Google Sheet, accessible only to The
                Goloka Design Studio team. Google&rsquo;s infrastructure is used solely as a
                storage mechanism; your data is never processed by Google for advertising or
                profiling purposes on our behalf.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                4. No third-party sharing or sale
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                We do not sell, rent, trade, or otherwise share your personal information with
                third parties for their own marketing or commercial purposes. Your details stay
                within our studio.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                5. Cloudflare Turnstile
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                Our enquiry form uses{' '}
                <a
                  href="https://www.cloudflare.com/products/turnstile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive underline underline-offset-2 hover:text-olive-dark transition-colors"
                >
                  Cloudflare Turnstile
                </a>{' '}
                to protect against automated spam. Turnstile runs a lightweight privacy-preserving
                challenge in your browser. It does not set tracking cookies or fingerprint you for
                advertising. Cloudflare&rsquo;s own{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive underline underline-offset-2 hover:text-olive-dark transition-colors"
                >
                  privacy policy
                </a>{' '}
                applies to the Turnstile service.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                6. Cookies
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                This website does not use cookies for analytics, advertising, or tracking. The
                only cookies that may be set are those technically necessary for the Cloudflare
                Turnstile challenge to function. No consent banner is shown because no tracking
                or profiling cookies are used.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                7. Your right to deletion
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                You may request that we delete your enquiry record at any time. To do so, email us
                at{' '}
                <a
                  href="mailto:hello@goloka.design"
                  className="text-olive underline underline-offset-2 hover:text-olive-dark transition-colors"
                >
                  hello@goloka.design
                </a>{' '}
                with the subject line <em>&ldquo;Delete my data&rdquo;</em> and the name and phone
                number you submitted. We will remove your record within 7 days and confirm by
                reply.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                8. Changes to this policy
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                If we make material changes to how we handle your data, we will update the
                &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to
                review this page periodically.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="font-serif text-2xl text-olive-dark mb-4">
                9. Contact
              </h2>
              <p className="font-sans text-base text-charcoal leading-relaxed">
                Questions about this policy or how we handle your data? Write to us at{' '}
                <a
                  href="mailto:hello@goloka.design"
                  className="text-olive underline underline-offset-2 hover:text-olive-dark transition-colors"
                >
                  hello@goloka.design
                </a>
                .
              </p>
            </section>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-sand-dark/40">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
