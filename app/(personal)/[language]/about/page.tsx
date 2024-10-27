import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { COMMON_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { ABOUT_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'
import { AboutLayout } from '@/components/AboutLayout'
import { AboutPagePayload } from '@/types'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export async function generateStaticParams() {
  return i18n.languages.map((lang) => {
    return {
      language: lang.id,
    }
  })
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language, slug } = params
  const { isEnabled } = draftMode()
  const queryParams = { ...COMMON_PARAMS, language }

  const aboutPage = await loadQuery<AboutPagePayload>(
    ABOUT_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['aboutPage'] },
    },
  )
  const ogImage = urlForOpenGraphImage(aboutPage?.data.ogImage)
  const baseUrl = 'https://www.nargesmohammadi.com'

  return {
    metadataBase: new URL(baseUrl),
    title:
      language === 'en'
        ? 'About | Narges Mohammadi'
        : 'Over | Narges Mohammadi',
    description: aboutPage.data.overview ?? '', // Fallback to empty string
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'website',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}/about`,
    },
    alternates: {
      canonical: `${baseUrl}/en/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        nl: `${baseUrl}/nl/about`,
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

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const initial = await loadQuery<AboutPagePayload>(ABOUT_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['aboutPage'] },
  })

  if (!initial.data) {
    notFound()
  }

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/about`, // Dynamic path based on language and slug
      title: lang.title,
    }
  })

  return (
    <>
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />

      <AboutLayout data={initial.data} currentLanguage={language} />
    </>
  )
}
