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

export default async function Page({ params }) {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const homeInitial = await loadQuery<{ projects: SanityDocument[] }>(
    HOME_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['home'] },
    },
  )
  // i need:
  // loop through the projects at home.showcaseHome
  // title of the project depending on the language in props
  // // if the language from params is the same as language of showcaseHome[index].work.language -> this is the current title
  // // else if the language from params is different than showcaseHome[index].work.language -> go to showcaseHome[index].work.translation and find the title for the language set in props

  //

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
        initial={homeInitial}
      >
        <HomeLayout />
      </LiveQueryWrapper>
    </>
  )
}
