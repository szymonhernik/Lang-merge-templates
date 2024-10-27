import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { COMMON_PARAMS } from '@/lib/constants'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadQuery } from '@/sanity/lib/store'
import { SettingsQueryResult } from '@/types'
import { SETTINGS_QUERY } from '@/sanity/queries'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = draftMode()
  const queryParams = { ...COMMON_PARAMS, language: 'en' }

  const dataPage = await loadQuery<SettingsQueryResult>(
    SETTINGS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['settings'] },
    },
  )

  const ogImage = urlForOpenGraphImage(dataPage.data.ogImage)
  const baseUrl = 'https://nargesmohammadi.com'

  return {
    metadataBase: new URL('https://nargesmohammadi.com'),
    title: 'Home | Narges Mohammadi',
    description: dataPage.data.text['en'] ? dataPage.data.text['en'] : '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `${baseUrl}/en`,
      languages: {
        en: `${baseUrl}/en`,
        nl: `${baseUrl}/nl`,
      },
    },
    robots: {
      index: false, // Don't index the root page
      follow: true,
    },
  }
}

export default function RootPage() {
  // This page will not be rendered due to middleware redirect
  return (
    <div>
      <h1>Welcome to Narges Mohammadi's Portfolio</h1>
      <p>Please select a language to continue.</p>
    </div>
  )
}
