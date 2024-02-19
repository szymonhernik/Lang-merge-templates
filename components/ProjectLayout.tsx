import React, { Suspense, useMemo } from 'react'

import Prose from './Prose'
import Title from './Title'

import { Galleries } from './Galleries'
import VideoSpace from './VideoSpace'
import Link from 'next/link'
import ListOfChildrenProjects from './ListOfChildrenProjects'
import {
  filterOutCurrentProject,
  getProjectTitleByLanguage,
} from '@/lib/helpers'
import PortfolioNavigator from './PortfolioNavigator'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export async function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const {
    title,
    summary,
    galleries,
    content,
    details,
    portfolio,
    language,
    slug,
    slugPage,
  } = props.data ?? {}
  const { projects } = portfolio ?? {}

  const otherProjects = useMemo(
    () => filterOutCurrentProject(projects, slug.current, language),
    [projects, slug, language],
  )

  return (
    <>
      <div className="relative z-10 mt-40">
        <section className="">
          <div className="container mx-auto ">
            <header className="flex flex-col gap-y-4 w-1/4">
              <h1 className="text-3xl ">{portfolio.title[language]}</h1>
              {portfolio.projects.length > 1 && (
                <PortfolioNavigator
                  portfolio={portfolio}
                  title={title}
                  language={language}
                  otherProjects={otherProjects}
                  slugPage={slugPage}
                />
              )}
            </header>

            <Suspense
              fallback={
                <div className="h-[50vh] w-full">
                  <h1>Loading...</h1>
                </div>
              }
            >
              <Galleries galleries={galleries} />
            </Suspense>

            <div className="w-auto">
              {details?.length > 0 ? <Prose value={details} /> : null}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
