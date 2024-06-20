import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'
import { loadQuery } from '@/sanity/lib/store'
import { ABOUT_QUERY, CONTACT_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'
import { AboutLayout } from '@/components/AboutLayout'
import { AboutPagePayload, ContactPagePayload } from '@/types'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { ContactLayout } from '@/components/ContactLayout'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language, slug } = params
  const queryParams = { ...COMMON_PARAMS, language }

  const contactPage = await loadQuery<AboutPagePayload>(
    ABOUT_QUERY,
    queryParams,
    {
      // perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['contactPage'] },
    },
  )
  const ogImage = urlForOpenGraphImage(contactPage?.data.ogImage)
  // console.log('aboutPage', aboutPage)

  return {
    title:
      language === 'en'
        ? 'Contact | Narges Mohammadi'
        : 'Contact | Narges Mohammadi',
    description: contactPage.data.overview
      ? contactPage.data.overview
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function Page({ params }) {
  const { language, slug } = params

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
      {/* <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? ABOUT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      > */}
      <ContactLayout data={initial.data} currentLanguage={language} />
      {/* <h1 className="h-96 bg-yellow-200 w-96 p-16">{initial.data.title}</h1> */}
      {/* </LiveQueryWrapper> */}
    </>
  )
}
