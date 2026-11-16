import type { Metadata } from 'next'
import './globals.css'
import { ConsultationModalProvider } from '@/components/ConsultationModal'

export const metadata: Metadata = {
  title: {
    default: 'The Goloka Design Studio — Residential Interiors by Gautam Kumar',
    template: '%s | The Goloka Design Studio',
  },
  description: 'End-to-end residential interiors by Gautam Kumar. Thoughtful designs crafted around your life, with quality you can see and care that continues after handover.',
  keywords: ['interior design', 'residential interiors', 'Hyderabad', 'My Home Tridasa', 'My Home Sayuk', 'modular kitchen', 'Gautam Kumar'],
  authors: [{ name: 'The Goloka Design Studio' }],
  creator: 'The Goloka Design Studio',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://goloka.design',
    siteName: 'The Goloka Design Studio',
    title: 'The Goloka Design Studio — Residential Interiors by Gautam Kumar',
    description: 'End-to-end residential interiors by Gautam Kumar. Thoughtful designs crafted around your life.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Goloka Design Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Goloka Design Studio',
    description: 'End-to-end residential interiors by Gautam Kumar.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConsultationModalProvider>{children}</ConsultationModalProvider>
      </body>
    </html>
  )
}
