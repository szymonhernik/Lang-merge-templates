import type { PortableTextBlock } from '@portabletext/types'
import { SanityDocument } from 'next-sanity'
import type { Image } from 'sanity'

export interface HomeQueryResult {
  home: {
    showcaseHome: SanityDocument[]
  }
}
