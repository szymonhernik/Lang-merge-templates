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
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { LocalizedProject } from '@/types'

export async function generateStaticParams() {
  const projects = await getProjectsWithSlugs() // Fetch projects and their portfolio slugs
  const portfolios = await fetchPortfoliosWithProjectsCount()
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
      slug: slugArray,
    }
  })

  return params
}

export async function generateMetadata({ params }) {
  const projects = await getProjectsWithSlugs()
  const portfolios = await fetchPortfoliosWithProjectsCount()

  // Extract slug and language from params
  const { slug, language } = params
  // console.log('slug', slug)

  // Find the current project based on the slug and language
  const currentProject = projects.find((project) => {
    const matchingPortfolio = portfolios.find(
      (portfolio) =>
        portfolio.slug[language]?.current ===
        project.portfolio[language].current,
    )
    // console.log('matchingPortfolio', matchingPortfolio)

    const isSoloProject = matchingPortfolio?.projectsCount === 1

    const slugMatches = isSoloProject
      ? slug.length === 1 && slug[0] === project.project
      : slug.length === 2 &&
        slug[0] === matchingPortfolio.slug[language]?.current &&
        slug[1] === project.project

    return slugMatches
  })
  // console.log('currentProject', currentProject)

  const ogImage = urlForOpenGraphImage(currentProject?.coverImage)
  // console.log('ogImage', ogImage)

  // Construct a title for the page based on the current project's details
  // If the project is part of a portfolio with more than one element, append "| portfolio name"
  let title = currentProject ? `${currentProject.title}` : 'No title'
  if (currentProject) {
    const matchingPortfolio = portfolios.find(
      (portfolio) =>
        portfolio.slug[language]?.current ===
        currentProject.portfolio[language].current,
    )
    // Check if the portfolio has more than one project
    if (matchingPortfolio && matchingPortfolio.projectsCount > 1) {
      // Append portfolio name in the correct language
      title += ` | ${matchingPortfolio.title[language]}`
    }
  }
  // console.log(currentProject.overview)

  return {
    title: title,
    description: currentProject?.overview ?? '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string[]; language: string }
}) {
  const { slug, language } = params
  let project = ''
  const projectGroup = slug[0]
  const currentLanguage = language

  if (slug.length === 2) {
    project = slug[1]
  } else if (slug.length === 1) {
    project = slug[0]
  }

  console.log('slug', slug)

  const queryParams = { ...COMMON_PARAMS, slug: project, language }
  const { isEnabled } = draftMode()

  const initial = await loadQuery<LocalizedProject>(
    PROJECT_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['project', 'portfolio'] },
    },
  )

  if (!initial.data) {
    notFound()
  }
  console.log('initial.data', initial.data)
  // initial.data.translations [
  //   {
  //     language: 'en',
  //     title: 'Attempts for refuge',
  //     slug: { current: 'attempts-for-refuge', _type: 'slug' }
  //   },
  //   {
  //     language: 'nl',
  //     title: 'Attempts for refuge',
  //     slug: { current: 'attempts-for-refuge-nl', _type: 'slug' }
  //   }
  // ]
  // I need to add path to this object: '/en/works/attempts-for-refuge',
  const newTranslations = initial.data.translations.map((translation) => {
    const path = `/${translation.language}/works/${translation.slug.current}`
    return { ...translation, path }
  })

  const slugPage = slug
  // const projectPaths = createProjectReachLinks(
  //   initial.data.portfolio.projects,
  //   initial.data.portfolio.slug,
  // )
  // const currentProjectIndex = projectPaths.findIndex((versions) =>
  //   versions.find((project) => project.title === initial.data.title),
  // )

  const translations = newTranslations

  console.log('translations', translations)
  // const gallery = initial.data.portfolio.projects[0].projectGallery

  const gallery = initial.data.projectGallery

  // console.log(
  //   'initial.data',
  //   initial.data.portfolio.projects[currentProjectIndex].pageExtraMaterials[1],
  // )

  return (
    <>
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
        <ProjectLayout
          data={{
            ...initial.data,
          }}
          gallery={gallery}
        />
      </LiveQueryWrapper>
    </>
  )
}
