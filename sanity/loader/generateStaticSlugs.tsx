import 'server-only'

import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Used in `generateStaticParams`
export async function generateStaticSlugs(type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  const result = await client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
      stega: false,
    })
    .fetch<{ slug: string; language: string }[]>(
      groq`*[_type == "project" && defined(language) && defined(slug.current)]{
        "slug": slug.current,
        language,
    }`,
      { type },
      {
        next: {
          tags: [type],
        },
      },
    )
  return result.map((item) => ({
    language: item.language,
    slug: [item.slug],
  }))
}
