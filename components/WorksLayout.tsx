'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { SanityDocument } from 'next-sanity'
import { createProjectLinks } from '@/lib/helpers'
import React, { useMemo } from 'react'
import Link from 'next/link'
import ProjectContent from './ProjectContent'
import PageTitle from './PageTitle'
import FilterWorks from './WorksPage/FilterWorks'
import {
  LocalizedProject,
  ShowcaseHomeProject,
  ShowcaseWorksPageExtended,
} from '@/types'

type WorksLayoutProps = {
  data?: { portfolios: SanityDocument[]; categories: SanityDocument[] }
  localizedProjects: ShowcaseWorksPageExtended[]
}

export function WorksLayout(props: WorksLayoutProps) {
  const { portfolios, categories } = props.data || {}
  const params = useParams()
  const localizedProjects = props.localizedProjects

  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  return (
    <section className="w-full py-mobileSpace lg:pt-desktopSpace lg:pb-16">
      <PageTitle currentLanguage={language} currentPage={'Works'} />
      <div className="3xl:max-w-[1936px] mx-auto grid gap-16 md:gap-x-8 md:gap-y-20 px-4 md:px-6 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 pt-header lg:pt-0 ">
        {localizedProjects &&
          localizedProjects.length > 0 &&
          localizedProjects.map((project, index) => {
            // const numberOfProjects = portfolio.projects.length
            // const projectPaths = createProjectLinks(
            //   portfolio.projects,
            //   portfolio.slug,
            // )
            // console.log('projectPaths:', projectPaths)
            // path =
            //     '/' +
            //     [projectLang, 'works', portfolioLangSlug, projectLangSlug].join(
            //       '/',
            //     )
            return (
              <React.Fragment key={index}>
                <Link href={`/${language}/works/${project.currentSlug}`}>
                  <ProjectContent project={project} language={language} />
                  {/* <ProjectContent
                    portfolio={portfolio}
                    language={language}
                    numberOfProjects={numberOfProjects}
                  /> */}
                </Link>
              </React.Fragment>
            )
          })}
      </div>
    </section>
  )
}
