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

import { getProjectsWithSlugs } from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { PROJECT_QUERY } from '@/sanity/queries'

// export async function generateStaticParams() {
//   const projects = await getProjectsWithSlugs()
//   // console.log('Projects:', projects[0].portfolio)

//   const params: { language: string; portfolio: string; project: string }[] =
//     projects
//       .map((project) => ({
//         ...project,
//         // Couldn't filter down the object of slugs in the GROQ query,
//         // so we filter them here instead
//         portfolio: project.language
//           ? get(project, [`portfolio`, project.language, `current`], null)
//           : null,
//       }))
//       .filter((project) => project.portfolio)

//   return params
// }

export const metadata: Metadata = {
  title: 'Project Page',
}

export default async function Page({ params }) {
  const { project, language } = params
  // console.log('params project: ', params)
  const queryParams = { ...COMMON_PARAMS, slug: project, language }
  const { isEnabled } = draftMode()

  const initial = await loadQuery<SanityDocument>(PROJECT_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['project'] },
  })

  if (!initial.data) {
    notFound()
  }

  const projectPaths = createProjectLinks(
    initial.data.portfolio.projects,
    initial.data.portfolio.slug,
  )
  const currentProjectIndex = projectPaths.findIndex((versions) =>
    versions.find((project) => project.title === initial.data.title),
  )
  const translations = projectPaths[currentProjectIndex]

  return (
    <>
      <Header translations={translations} currentLanguage={language} />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? PROJECT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <ProjectLayout />
      </LiveQueryWrapper>
    </>
  )
}
