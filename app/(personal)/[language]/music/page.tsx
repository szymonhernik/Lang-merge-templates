import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { COMMON_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { MUSIC_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'

import { MusicLayout } from '@/components/MusicLayout'
import { MusicPagePayload } from '@/types'
import { Suspense } from 'react'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export async function generateStaticParams() {
  return i18n.languages.map((lang) => {
    return {
      language: lang.id,
    }
  })
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()

  const musicPage = await loadQuery<MusicPagePayload>(
    MUSIC_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['musicPage'] },
    },
  )
  const ogImage = urlForOpenGraphImage(musicPage?.data.ogImage)
  const baseUrl = 'https://www.nargesmohammadi.com'
  return {
    metadataBase: new URL(baseUrl),
    title:
      language === 'en'
        ? 'Music | Narges Mohammadi'
        : 'Muziek | Narges Mohammadi',
    description: musicPage.data.overview ?? '', // Fallback to empty string
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'website',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}/music`,
    },
    alternates: {
      canonical: `${baseUrl}/en/music`,
      languages: {
        en: `${baseUrl}/en/music`,
        nl: `${baseUrl}/nl/music`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function Page({ params }) {
  const { language, slug } = params
  const currentLanguage = language

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const initial = await loadQuery<MusicPagePayload>(MUSIC_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['musicPage'] },
  })

  if (!initial.data) {
    notFound()
  }

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/music`, // Dynamic path based on language and slug
      title: lang.title,
    }
  })

  return (
    <>
      <Suspense fallback={null}>
        <UpdateLangContext
          currentLanguage={language}
          translations={translations}
        />
      </Suspense>

      <MusicLayout data={initial.data} currentLanguage={currentLanguage} />
    </>
  )
}
