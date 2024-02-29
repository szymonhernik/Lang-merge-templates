'use client'

import { useParams } from 'next/navigation'
import { SanityDocument } from 'next-sanity'
import { createProjectLinks } from '@/lib/helpers'
import React, { useMemo, useState } from 'react'
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  // console.log('portfolios', portfolios[0].category)

  const filteredPortfolios = useMemo(() => {
    if (
      !selectedCategory ||
      selectedCategory === 'all' ||
      selectedCategory === 'alle'
    ) {
      return portfolios
    }
    return portfolios?.filter((portfolio) => {
      return portfolio.category._id === selectedCategory
    })
  }, [portfolios, selectedCategory])

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  return (
    <section className="w-full my-desktopSpace pb-desktopSpace">
      <PageTitle currentLanguage={language} currentPage={'Works'} />
      <FilterWorks
        currentLanguage={language}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div className="3xl:max-w-[1936px] mx-auto grid gap-16 md:gap-8 px-4 md:px-6 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 pt-header">
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
