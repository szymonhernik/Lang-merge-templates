import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { COMMON_PARAMS } from '@/lib/constants'
import { loadQuery } from '@/sanity/lib/store'
import { ABOUT_QUERY, CONTACT_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'

import { AboutPagePayload, ContactPagePayload } from '@/types'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { ContactLayout } from '@/components/ContactLayout'

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

  const contactPage = await loadQuery<AboutPagePayload>(
    ABOUT_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['contactPage'] },
    },
  )
  const ogImage = urlForOpenGraphImage(contactPage?.data.ogImage)
  const baseUrl = 'https://www.nargesmohammadi.com'
  return {
    metadataBase: new URL(baseUrl),
    title:
      language === 'en'
        ? 'Contact | Narges Mohammadi'
        : 'Contact | Narges Mohammadi',
    description: contactPage.data.overview ?? '', // Fallback to empty string
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'website',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}/contact`,
    },
    alternates: {
      canonical: `${baseUrl}/${language}/contact`,
      languages: {
        'x-default': `${baseUrl}/contact`,
        en: `${baseUrl}/en/contact`,
        nl: `${baseUrl}/nl/contact`,
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
  const { language } = params

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const initial = await loadQuery<ContactPagePayload>(
    CONTACT_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['contactPage'] },
    },
  )

  if (!initial.data) {
    notFound()
  }

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/contact`, // Dynamic path based on language and slug
      title: lang.title,
    }
  })

  return (
    <>
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />

      <ContactLayout data={initial.data} currentLanguage={language} />
    </>
  )
}
