'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { SanityDocument } from 'next-sanity'
import { createProjectLinks } from '@/lib/helpers'
import React, { useMemo } from 'react'
import Link from 'next/link'
import ProjectContent from './ProjectContent'
import PageTitle from './PageTitle'
import FilterWorks from './WorksPage/FilterWorks'

type WorksLayoutProps = {
  data?: { portfolios: SanityDocument[]; categories: SanityDocument[] }
}

export function WorksLayout(props: WorksLayoutProps) {
  const { portfolios, categories } = props.data || {}
  const params = useParams()
  const searchParams = useSearchParams()
  const showCategory = searchParams.get('show')

  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  const filteredPortfolios = useMemo(() => {
    if (!portfolios) return []

    // Defaults to "Artworks" if no filter is specified
    const effectiveFilter = (showCategory || 'artworks').toLowerCase()

    return portfolios.filter(
      (portfolio) =>
        portfolio.category &&
        portfolio.category.categoryName.toLowerCase() === effectiveFilter,
    )
  }, [portfolios, showCategory])

  return (
    <section className="w-full py-mobileSpace lg:pt-desktopSpace lg:pb-16">
      <PageTitle currentLanguage={language} currentPage={'Works'} />
      <FilterWorks currentLanguage={language} />
      <div className="3xl:max-w-[1936px] mx-auto grid gap-16 md:gap-8 px-4 md:px-6 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 pt-header lg:pt-0 ">
        {filteredPortfolios &&
          filteredPortfolios.length > 0 &&
          filteredPortfolios.map((portfolio, index) => {
            const numberOfProjects = portfolio.projects.length
            const projectPaths = createProjectLinks(
              portfolio.projects,
              portfolio.slug,
            )
            // console.log('projectPaths:', projectPaths)
            return (
              <React.Fragment key={index}>
                {numberOfProjects === 1 &&
                portfolio?.slug?.[language]?.current ? (
                  <Link
                    href={`${projectPaths[0].find((project) => project.language === language)?.path}`}
                  >
                    <ProjectContent
                      portfolio={portfolio}
                      language={language}
                      numberOfProjects={numberOfProjects}
                    />
                  </Link>
                ) : (
                  <ProjectContent
                    portfolio={portfolio}
                    language={language}
                    numberOfProjects={numberOfProjects}
                  />
                )}
              </React.Fragment>
            )
          })}
      </div>
    </section>
  )
}
