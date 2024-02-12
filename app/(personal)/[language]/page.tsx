import { draftMode } from 'next/headers'
import { SanityDocument } from 'next-sanity'

// import { HomeLayout } from '@/components/HomeLayout'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { HOME_QUERY } from '@/sanity/queries'

import { i18n } from '../../../languages'
import Header from '@/components/Header'
import { HomeLayout } from '@/components/HomeLayout'

import { HomeQueryResult } from '@/types'
import UpdateLangContext from '@/components/UpdateLangContext'
import { localizeProjects } from '@/lib/localizeProjects'

export default async function Page({ params }) {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const homeInitial = await loadQuery<HomeQueryResult>(
    HOME_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['home'] },
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

  // console.log(homeInitial.data.home.showcaseHome)

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
