import { draftMode } from 'next/headers'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { SETTINGS_QUERY, WORKS_QUERY } from '@/sanity/queries'

import { i18n } from '@/languages'
import { WorksLayout } from '@/components/WorksLayout'
import UpdateLangContext from '@/components/UpdateLangContext'
import { SettingsQueryResult, WorksQueryResult } from '@/types'
import { Metadata } from 'next'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { localizeProjects } from '@/lib/localizeProjects'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }

  const dataPage = await loadQuery<SettingsQueryResult>(
    SETTINGS_QUERY,
    queryParams,
    {
      next: { tags: ['settings'] },
    },
  )

  const ogImage = urlForOpenGraphImage(dataPage.data.ogImage)
  const baseUrl = 'https://www.nargesmohammadi.com'

  return {
    metadataBase: new URL(baseUrl),
    title:
      language === 'en'
        ? 'Works | Narges Mohammadi'
        : 'Werken | Narges Mohammadi',
    description: dataPage.data.text[language] ?? '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'website',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}/works`,
    },

    alternates: {
      canonical: `${baseUrl}/en/works`,
      languages: {
        en: `${baseUrl}/en/works`,
        nl: `${baseUrl}/nl/works`,
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
  const worksInitial = await loadQuery<WorksQueryResult>(
    WORKS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['project'] },
    },
  )

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/works`,
      title: lang.title,
    }
  })

  const localizedProjects = localizeProjects(
    worksInitial.data.projects.showcaseWorks,
    language,
  )

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
        <WorksLayout
          localizedProjects={localizedProjects}
          language={language}
        />
      </LiveQueryWrapper>
    </>
  )
}
