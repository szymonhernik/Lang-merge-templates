import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { getAboutsWithSlugs, getProjectsWithSlugs } from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { MUSIC_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'

import { MusicLayout } from '@/components/MusicLayout'
import { MusicPagePayload } from '@/types'
import { Suspense } from 'react'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

// export async function generateStaticParams() {
//   const aboutPages = await getAboutsWithSlugs()

//   // Adjusted to correct property names and extraction of slug
//   const params = aboutPages.map((aboutPage) => ({
//     language: aboutPage.language,
//     aboutPage: aboutPage.aboutPage.current, // Correctly accessing the slug
//   }))

//   return params
// }

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language, slug } = params
  const queryParams = { ...COMMON_PARAMS, language }

  const musicPage = await loadQuery<MusicPagePayload>(
    MUSIC_QUERY,
    queryParams,
    {
      // perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['musicPage'] },
    },
  )
  const ogImage = urlForOpenGraphImage(musicPage?.data.ogImage)
  // console.log('musicPage', musicPage)

  return {
    title:
      language === 'en'
        ? 'Music | Narges Mohammadi'
        : 'Muziek | Narges Mohammadi',
    description: musicPage.data.overview ? musicPage.data.overview : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function Page({ params }) {
  const { language, slug } = params
  // console.log('PARAMS ABOUT: ', params)
  const currentLanguage = language

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const initial = await loadQuery<MusicPagePayload>(MUSIC_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['musicPage'] },
  })

  if (!initial.data) {
    notFound()
  }

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/music`, // Dynamic path based on language and slug
      title: lang.title,
    }
  })

  return (
    <>
      <Suspense fallback={null}>
        <UpdateLangContext
          currentLanguage={language}
          translations={translations}
        />
      </Suspense>
      {/* <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? MUSIC_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      > */}
      {/* <div className="bg-black"> */}
      <MusicLayout data={initial.data} currentLanguage={currentLanguage} />
      {/* </div> */}

      {/* <h1 className="h-96 bg-yellow-200 w-96 p-16">{initial.data.title}</h1> */}
      {/* </LiveQueryWrapper> */}
    </>
  )
}
