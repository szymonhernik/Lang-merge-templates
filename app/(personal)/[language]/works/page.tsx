import { draftMode } from 'next/headers'
import { SanityDocument } from 'next-sanity'

// import { HomeLayout } from '@/components/HomeLayout'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { HOME_QUERY, WORKS_QUERY } from '@/sanity/queries'

import Header from '@/components/Header'
import { HomeLayout } from '@/components/HomeLayout'
import { i18n } from '@/languages'

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
  // console.log(
  //   'worksInitial.data.projects[0].groups',
  //   worksInitial.data.projects,
  // )

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}`,
      title: lang.title,
    }
  })

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? HOME_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={worksInitial}
      >
        <HomeLayout />
      </LiveQueryWrapper>
    </>
  )
}
