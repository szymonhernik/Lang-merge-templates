import get from 'lodash/get'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { SanityDocument } from 'next-sanity'

import Header from '@/components/Header'
import { ProjectLayout } from '@/components/ProjectLayout'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'
import { createProjectLinks } from '@/lib/helpers'

import { getAboutsWithSlugs, getProjectsWithSlugs } from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { ABOUT_QUERY } from '@/sanity/queries'
import { i18n } from '@/languages'

export const metadata: Metadata = {
  title: 'Works page',
}

export default async function Page({ params }) {
  const { language, slug } = params

  return (
    <>
      <Header translations={[]} currentLanguage={language} />
      {/* <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? ABOUT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      > */}
      <h1 className="h-96 bg-yellow-200 w-96 mt-96">Works</h1>
      {/* </LiveQueryWrapper> */}
    </>
  )
}
