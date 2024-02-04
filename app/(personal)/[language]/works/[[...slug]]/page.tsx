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

import {
  fetchPortfoliosWithProjectsCount,
  getProjectsWithSlugs,
} from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { PROJECT_QUERY } from '@/sanity/queries'

// export async function generateStaticParams() {}

// export async function generateStaticParams() {
//   const projects = await getProjectsWithSlugs()
//   console.log('Projects:', projects)

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

//   console.log('params for static pages: ', params)

//   return params
// }
// export async function generateStaticParams() {
//   const projects = await getProjectsWithSlugs()
//   const params = projects.flatMap((project) => {
//     // Check if the portfolio has exactly one project
//     const isSoloProject = project.portfolio[project.language]?.projectsCount === 1;

//     // If solo, include the portfolio slug, otherwise just the project slug
//     const slugArray = isSoloProject
//       ? [project.portfolio[project.language].current, project.project]
//       : [project.project];
//     console.log('slug array', slugArray)

//     return {
//       language: project.language,
//       slug: slugArray.join('/'),
//     }
//   })

//   console.log('Paths for static pages: ', params)
//   return params
// }
export async function generateStaticParams() {
  const projects = await getProjectsWithSlugs() // Fetch projects and their portfolio slugs
  const portfolios = await fetchPortfoliosWithProjectsCount() // Hypothetical function to fetch portfolios with projects count

  console.log('PORTFOLIOS: ', portfolios)
  console.log('PORTFOLIOS[0]: ', portfolios[0])
  console.log('PORTFOLIOS[0]: ', portfolios[1])

  // Map portfolio projects count to each project using slug matching
  const params = projects.map((project) => {
    // Find the portfolio that matches the project's slug in the project's language
    const matchingPortfolio = portfolios.find(
      (portfolio) =>
        portfolio.slug[project.language]?.current ===
        project.portfolio[project.language].current,
    )

    const isSoloProject = matchingPortfolio?.projectsCount === 1

    // Construct slugArray based on whether it's a solo project or not
    const slugArray = !isSoloProject
      ? [project.portfolio[project.language].current, project.project]
      : [project.project]

    console.log(
      'project count for matching portfolio:',
      matchingPortfolio?.projectsCount,
    )

    return {
      language: project.language,
      slug: slugArray, // Assuming you need a string path for each route
    }
  })

  console.log('Paths for static pages:', params)
  return params
}

export const metadata: Metadata = {
  title: 'Project Page',
}

export default async function Page({ params }) {
  const { slug, language } = params
  let project = ''
  const projectGroup = slug[0]
  console.log('SLUG:', slug)

  if (slug.length === 2) {
    project = slug[1]
  } else if (slug.length === 1) {
    project = slug[0]
  }
  // console.log('params: ', params)
  // params:  { language: 'en', slug: [ 'double-work', 'exhibition' ] }
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
