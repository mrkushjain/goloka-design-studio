export interface SiteSettings {
  company_name: string
  founder_name: string
  hero_headline: string
  hero_subtitle: string
  hero_image_url: string
  contact_phone: string
  contact_email: string
  whatsapp_number: string
  instagram_url: string
  youtube_url: string
  service_cities: string
  footer_text: string
}

export interface Testimonial {
  id: string
  name: string
  community: string
  quote: string
  rating: number
  photo_url: string
  approved: boolean
  is_demo: boolean
  sort_order: number
}

export interface Project {
  id: string
  title: string
  community: string
  category: string
  description: string
  cover_image_url: string
  gallery_image_urls: string
  image_kind: string
  published: boolean
  sort_order: number
}

export interface Service {
  id: string
  title: string
  description: string
  image_url: string
  published: boolean
  sort_order: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  published: boolean
  sort_order: number
}

export interface LeadForm {
  name: string
  phone: string
  city: string
  consent: boolean
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  turnstile_token: string
  honeypot?: string
}
