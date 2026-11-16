'use client'

import { useEffect, useRef, useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  fullName?: string
  phone?: string
  city?: string
  consent?: string
  captcha?: string
}

interface FormValues {
  fullName: string
  phone: string
  city: string
  consent: boolean
}

const INDIAN_CITIES = [
  'Hyderabad',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Other',
]

const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
    }
    onTurnstileLoad?: () => void
  }
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    phone: '',
    city: '',
    consent: false,
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)
  const turnstileTokenRef = useRef<string>('')

  // Capture UTM params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utm: Record<string, string> = {}
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
        const val = params.get(key)
        if (val) utm[key] = val
      }
      setUtmParams(utm)
    }
  }, [])

  // Load Turnstile script and render widget
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return

    const renderWidget = () => {
      if (!turnstileContainerRef.current || !window.turnstile) return
      if (turnstileWidgetIdRef.current) return // already rendered

      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          turnstileTokenRef.current = token
          setErrors((prev) => ({ ...prev, captcha: undefined }))
        },
        'expired-callback': () => {
          turnstileTokenRef.current = ''
        },
        'error-callback': () => {
          turnstileTokenRef.current = ''
        },
        theme: 'light',
      })
      turnstileWidgetIdRef.current = widgetId
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      window.onTurnstileLoad = renderWidget
      if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
        const script = document.createElement('script')
        script.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
    }
  }, [])

  function validate(): FieldErrors {
    const errs: FieldErrors = {}

    if (!values.fullName.trim()) {
      errs.fullName = 'Please enter your full name.'
    }

    if (!values.phone.trim()) {
      errs.phone = 'Please enter your phone number.'
    } else if (!PHONE_RE.test(values.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number.'
    }

    if (!values.city.trim()) {
      errs.city = 'Please select or enter your city.'
    }

    if (!values.consent) {
      errs.consent = 'Please give your consent to proceed.'
    }

    // Only require CAPTCHA when the site key is actually configured.
    // Without a key the widget never renders, so we skip the check gracefully.
    const hasCaptcha = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (hasCaptcha && !turnstileTokenRef.current) {
      errs.captcha = 'Please complete the security check.'
    }

    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Honeypot check (should be empty)
    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value
    if (honeypot) return // silently abort — bot

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setState('submitting')
    setErrors({})
    setErrorMessage('')

    try {
      // On static GitHub Pages there is no server, so we submit directly to the
      // Apps Script web app URL (NEXT_PUBLIC_APPS_SCRIPT_URL).  When running
      // on a full Next.js server (Vercel etc.) we fall back to the same-origin
      // /api/enquiry route which also does server-side Turnstile verification.
      const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL

      let success = false

      if (scriptUrl) {
        // --- Static/GitHub Pages path: POST directly to Apps Script ---
        // Apps Script web apps don't support JSON CORS, so we encode as
        // application/x-www-form-urlencoded (a "simple" request — no preflight).
        const params = new URLSearchParams({
          action: 'saveLead',
          secret: process.env.NEXT_PUBLIC_APPS_SCRIPT_PUBLIC_TOKEN ?? '',
          lead_id: crypto.randomUUID(),
          name: values.fullName.trim(),
          phone: values.phone.trim(),
          city: values.city.trim(),
          consent: 'true',
          source: typeof window !== 'undefined' ? window.location.href : '',
          ...utmParams,
        })

        // mode: 'no-cors' fires the POST but returns an opaque response.
        // We cannot read the body, so we show success optimistically.
        // Apps Script will still save the lead regardless.
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        })
        success = true
      } else {
        // --- Full-server path: same-origin API route with Turnstile verify ---
        const payload = {
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          city: values.city.trim(),
          consent: values.consent,
          turnstileToken: turnstileTokenRef.current,
          ...utmParams,
        }
        const res = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.message ?? 'Something went wrong. Please try again.')
        }
        success = true
      }

      if (success) setState('success')
    } catch (err) {
      setState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')

      // Reset Turnstile so the user can retry
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current)
        turnstileTokenRef.current = ''
      }
    }
  }

  function handleRetry() {
    setState('idle')
    setErrorMessage('')
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl bg-olive-50 border border-olive-200 p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-stone-800 mb-2">We'll be in touch soon!</h3>
        <p className="text-stone-600 text-sm">
          Thank you for reaching out. Gautam will contact you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-stone-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(e) => {
            setValues((v) => ({ ...v, fullName: e.target.value }))
            if (errors.fullName) setErrors((er) => ({ ...er, fullName: undefined }))
          }}
          placeholder="Priya Sharma"
          className={`w-full rounded-lg border px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-olive-500 transition ${
            errors.fullName ? 'border-red-400 bg-red-50' : 'border-stone-300 bg-white'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => {
            setValues((v) => ({ ...v, phone: e.target.value }))
            if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }))
          }}
          placeholder="+91 98765 43210"
          className={`w-full rounded-lg border px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-olive-500 transition ${
            errors.phone ? 'border-red-400 bg-red-50' : 'border-stone-300 bg-white'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <select
          id="city"
          name="city"
          value={values.city}
          onChange={(e) => {
            setValues((v) => ({ ...v, city: e.target.value }))
            if (errors.city) setErrors((er) => ({ ...er, city: undefined }))
          }}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-olive-500 transition appearance-none bg-white ${
            errors.city ? 'border-red-400 bg-red-50' : 'border-stone-300'
          } ${values.city === '' ? 'text-stone-400' : 'text-stone-800'}`}
        >
          <option value="" disabled>
            Select your city
          </option>
          {INDIAN_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="mt-1 text-xs text-red-600">{errors.city}</p>
        )}
      </div>

      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Turnstile */}
      <div>
        <div ref={turnstileContainerRef} />
        {errors.captcha && (
          <p className="mt-1 text-xs text-red-600">{errors.captcha}</p>
        )}
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => {
              setValues((v) => ({ ...v, consent: e.target.checked }))
              if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }))
            }}
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-olive-600 focus:ring-olive-500 cursor-pointer"
          />
          <span className="text-sm text-stone-600 leading-snug">
            I agree to be contacted by The Goloka Design Studio about my enquiry.{' '}
            <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1 text-xs text-red-600">{errors.consent}</p>
        )}
      </div>

      {/* Error banner */}
      {state === 'error' && errorMessage && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Submit / Retry */}
      {state === 'error' ? (
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={false}
            className="flex-1 rounded-xl bg-olive-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-olive-800 disabled:opacity-50 transition"
          >
            Try Again →
          </button>
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-xl border border-stone-300 px-4 py-3.5 text-sm text-stone-600 hover:bg-stone-50 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full rounded-xl bg-olive-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-olive-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {state === 'submitting' ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Let's Design My Home →"
          )}
        </button>
      )}
    </form>
  )
}
