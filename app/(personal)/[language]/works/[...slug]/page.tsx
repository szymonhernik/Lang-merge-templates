import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { SanityDocument } from 'next-sanity'

import Header from '@/components/Header'
import { ProjectLayout } from '@/components/ProjectLayout'
import UpdateLangContext from '@/components/UpdateLangContext'

import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'
import { createProjectReachLinks } from '@/lib/helpers'

import {
  fetchPortfoliosWithProjectsCount,
  getProjectsWithSlugs,
} from '@/sanity/fetchers'
import { loadQuery } from '@/sanity/lib/store'
import { PROJECT_QUERY } from '@/sanity/queries'
import { Suspense } from 'react'

export async function generateStaticParams() {
  const projects = await getProjectsWithSlugs() // Fetch projects and their portfolio slugs
  const portfolios = await fetchPortfoliosWithProjectsCount() // Hypothetical function to fetch portfolios with projects count

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

    return {
      language: project.language,
      slug: slugArray, // Assuming you need a string path for each route
    }
  })

  return params
}

export const metadata: Metadata = {
  title: 'Project Page',
}

export default async function Page({ params }) {
  const { slug, language } = params
  let project = ''
  const projectGroup = slug[0]

  if (slug.length === 2) {
    project = slug[1]
  } else if (slug.length === 1) {
    project = slug[0]
  }

  const queryParams = { ...COMMON_PARAMS, slug: project, language }
  const { isEnabled } = draftMode()

  const initial = await loadQuery<SanityDocument>(PROJECT_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['project'] },
  })

  if (!initial.data) {
    notFound()
  }

  // console.log('initial.data', initial.data.portfolio.projects[0].pageBuilder)

  const projectPaths = createProjectReachLinks(
    initial.data.portfolio.projects,
    initial.data.portfolio.slug,
  )
  const currentProjectIndex = projectPaths.findIndex((versions) =>
    versions.find((project) => project.title === initial.data.title),
  )
  const translations = projectPaths[currentProjectIndex]

  const galleries = initial.data.portfolio.projects[0].pageBuilder

  return (
    <>
      {/* <Header translations={translations} currentLanguage={language} /> */}
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />

      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? PROJECT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <ProjectLayout data={{ ...initial.data, galleries }} />
      </LiveQueryWrapper>
    </>
  )
}
