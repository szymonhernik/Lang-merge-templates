import get from 'lodash/get'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { SanityDocument } from 'next-sanity'

import Header from '@/components/Header'
import { ProjectLayout } from '@/components/ProjectLayout'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { getAboutsWithSlugs, getProjectsWithSlugs } from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { ABOUT_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'

// export async function generateStaticParams() {
//   const aboutPages = await getAboutsWithSlugs()

//   // Adjusted to correct property names and extraction of slug
//   const params = aboutPages.map((aboutPage) => ({
//     language: aboutPage.language,
//     aboutPage: aboutPage.aboutPage.current, // Correctly accessing the slug
//   }))

//   return params
// }

export const metadata: Metadata = {
  title: 'About page',
}

export default async function Page({ params }) {
  const { language, slug } = params
  // console.log('PARAMS ABOUT: ', params)

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const initial = await loadQuery<SanityDocument>(ABOUT_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['aboutPage'] },
  })
  const aboutsWithSlugs = await getAboutsWithSlugs()
  // console.log('abouts slugs: ', aboutsWithSlugs)
  // results in
  // abouts slugs:  [
  //   { language: 'en', aboutPage: { _type: 'slug', current: 'about' } },
  //   { language: 'nl', aboutPage: { current: 'over', _type: 'slug' } }
  // ]

  if (!initial.data) {
    notFound()
  }

  const translations = i18n.languages.map((lang) => {
    // const slug =
    //   aboutsWithSlugs.find((page) => page.language === lang.id)?.aboutPage
    //     .current || '/'

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
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? ABOUT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <h1 className="h-96 bg-yellow-200 w-96 p-16">{initial.data.title}</h1>
      </LiveQueryWrapper>
    </>
  )
}
