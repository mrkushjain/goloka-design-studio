'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import ContactForm from './ContactForm'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ConsultationModalContextValue {
  open: () => void
  close: () => void
}

const ConsultationModalContext = createContext<ConsultationModalContextValue>({
  open: () => {},
  close: () => {},
})

export const useConsultationModal = () => useContext(ConsultationModalContext)

// ---------------------------------------------------------------------------
// Provider + Modal
// ---------------------------------------------------------------------------

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ConsultationModalContext.Provider value={{ open, close }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          {/* Overlay */}
          <Dialog.Overlay
            className="
              fixed inset-0 z-50
              bg-stone-900/60 backdrop-blur-sm
              data-[state=open]:animate-overlayShow
              data-[state=closed]:animate-overlayHide
            "
          />

          {/* Panel */}
          <Dialog.Content
            aria-labelledby="consultation-modal-title"
            aria-describedby="consultation-modal-desc"
            className="
              fixed z-50
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[calc(100vw-2rem)] max-w-lg
              max-h-[calc(100dvh-2rem)] overflow-y-auto
              rounded-2xl
              bg-[#f9f7f2] border border-stone-200/80
              shadow-2xl shadow-stone-900/20
              p-8 sm:p-10
              focus:outline-none
              data-[state=open]:animate-contentShow
              data-[state=closed]:animate-contentHide
            "
          >
            {/* Close button */}
            <Dialog.Close
              aria-label="Close consultation modal"
              className="
                absolute top-4 right-4
                h-8 w-8 rounded-full
                flex items-center justify-center
                text-stone-400 hover:text-stone-700 hover:bg-stone-100
                transition focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Dialog.Close>

            {/* Header */}
            <div className="mb-6 pr-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-olive-200" aria-hidden="true" />
                <span className="text-xs tracking-widest uppercase text-olive-600 font-medium select-none">
                  Free Consultation
                </span>
                <div className="h-px flex-1 bg-olive-200" aria-hidden="true" />
              </div>

              <Dialog.Title
                id="consultation-modal-title"
                className="font-serif text-2xl sm:text-3xl font-light text-stone-800 leading-snug"
              >
                Book your free consultation
              </Dialog.Title>

              <Dialog.Description
                id="consultation-modal-desc"
                className="mt-2 text-sm text-stone-500 leading-relaxed"
              >
                Tell us about your home and we'll be in touch.
              </Dialog.Description>
            </div>

            {/* Form */}
            <ContactForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ConsultationModalContext.Provider>
  )
}
