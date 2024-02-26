import { draftMode } from 'next/headers'
import { SanityDocument } from 'next-sanity'

// import { HomeLayout } from '@/components/HomeLayout'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { HOME_QUERY, SETTINGS_QUERY, WORKS_QUERY } from '@/sanity/queries'

import Header from '@/components/Header'
import { HomeLayout } from '@/components/HomeLayout'
import { i18n } from '@/languages'
import { WorksLayout } from '@/components/WorksLayout'
import UpdateLangContext from '@/components/UpdateLangContext'
import { SettingsQueryResult } from '@/types'
import { Metadata } from 'next'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }

  const dataPage = await loadQuery<SettingsQueryResult>(
    SETTINGS_QUERY,
    queryParams,
    {
      // perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['settings'] },
    },
  )

  const ogImage = urlForOpenGraphImage(dataPage.data.ogImage)
  // console.log('homeRef', dataPage)

  return {
    title:
      language === 'en' ? 'Home | Narges Mohammadi' : 'Home | Narges Mohammadi',
    description: dataPage.data.text[language]
      ? dataPage.data.text[language]
      : '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function Page({ params }) {
  const { language } = params

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const worksInitial = await loadQuery<{ portfolios: SanityDocument[] }>(
    WORKS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['works'] },
    },
  )

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/works`,
      title: lang.title,
    }
  })

  return (
    <>
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? WORKS_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={worksInitial}
      >
        <WorksLayout />
      </LiveQueryWrapper>
    </>
  )
}
