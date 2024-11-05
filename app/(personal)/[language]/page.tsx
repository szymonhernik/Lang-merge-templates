import { draftMode } from 'next/headers'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { HOME_QUERY, SETTINGS_QUERY } from '@/sanity/queries'

import { i18n } from '../../../languages'
import { HomeLayout } from '@/components/HomeLayout'

import { HomeQueryResult, SettingsQueryResult } from '@/types'
import UpdateLangContext from '@/components/UpdateLangContext'
import { localizeProjects } from '@/lib/localizeProjects'
import { Metadata } from 'next'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language } = params
  const { isEnabled } = draftMode()
  const queryParams = { ...COMMON_PARAMS, language }

  const dataPage = await loadQuery<SettingsQueryResult>(
    SETTINGS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['settings'] },
    },
  )

  const ogImage = urlForOpenGraphImage(dataPage.data.ogImage)
  const baseUrl = 'https://www.nargesmohammadi.com'

  return {
    metadataBase: new URL(baseUrl),
    title: 'Home | Narges Mohammadi',
    description: dataPage.data.text[language] ?? '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'website',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}`,
    },
    alternates: {
      canonical: `${baseUrl}/en`,
      languages: {
        en: `${baseUrl}/en`,
        nl: `${baseUrl}/nl`,
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
  const homeInitial = await loadQuery<HomeQueryResult>(
    HOME_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['home, project'] },
    },
  )

  const localizedProjects = localizeProjects(
    homeInitial.data.home.showcaseHome,
    language,
  )

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}`,
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
        query={isEnabled ? HOME_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={homeInitial}
      >
        <HomeLayout localizedProjects={localizedProjects} language={language} />
      </LiveQueryWrapper>
    </>
  )
}
