import { Translation } from '@/lib/types'
import type { PortableTextBlock } from '@portabletext/types'
import { SanityDocument } from 'next-sanity'
import type { Image } from 'sanity'

interface PortfolioProjectHome {
  title: string
  slug: string
  projectsCount: number
}

interface Slug {
  current: string
  _type: 'slug'
}
interface TranslationHome {
  path: string
  language: string
  title: string
  slug: Slug
}

export interface ShowcaseHomeProject {
  language: string
  title: string
  slug: string
  portfolio?: PortfolioProjectHome // Assuming it follows the same structure defined elsewhere
  coverImage?: {
    alt?: string
    asset: {
      _id: string
      url: string
      lqip?: string
      aspectRatio?: number
    }
  }
  coverImageOptional?: {
    alt?: string
    asset: {
      _id: string
      url: string
      lqip?: string
    }
  }
  translations: TranslationHome[]
}
export interface HomeQueryResult {
  home: {
    showcaseHome?: ShowcaseHomeProject[]
  }
}

export interface AboutPagePayload {
  ogImage?: Image
  overview?: string
  _id: string
  title: string
  slug: string
  content: PortableTextBlock[]
  language: string
  profilePicture: {
    alt: string
    asset: {
      _id: string
      url: string
      lqip: string
      aspectRatio: number
      width: number
      height: number
    }
  }
  highlightedContent: string
  pageBuilder: PageBuilderItem[]
}

interface GalleryImage {
  _key?: string
  _type?: 'image'
  alt?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface Gallery {
  _key?: string
  _type: 'gallery'
  galleryTitle: string
  images: GalleryImage[]
}

export interface PageBuilderItem {
  _type: 'gallery'
  gallery: Gallery
}

export interface LocalizedProject {
  currentTitle: string
  currentSlug: string
  language: string
  title: string
  slug: string
  portfolio?: {
    title: string
    slug: string
    projectsCount: number
  }
  coverImage?: {
    alt?: string
    asset: any // Consider defining a more specific type for the asset if possible
  }
  coverImageOptional?: {
    alt?: string
    asset: any // Same as above, define a more specific type if possible
  }
  translations: TranslationHome[] // Define a more specific type for translations if applicable
}

export interface MusicPagePayload {
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  summary: string
  content: PortableTextBlock[]
  language: string
  videoBanner: {
    _type: 'mux.video'
    asset: {
      _weak: boolean
      _ref: string
      _type: 'reference'
    }
  }
  link: {
    linkTitle: string
    href: string
    _id: string
  }
}
