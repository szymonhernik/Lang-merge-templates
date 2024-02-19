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
              <h1 className="text-xl ">{portfolio.title[language]}</h1>
              {portfolio.projects.length > 1 && (
                <div>
                  <h2 className="text-lg pb-4"> {title} </h2>
                  <p>
                    Other in{' '}
                    <span className="italic">{portfolio.title[language]}</span>:
                  </p>
                  {otherProjects.map((project, index) => (
                    <React.Fragment key={index}>
                      <ListOfChildrenProjects
                        project={project}
                        language={language}
                        slugPage={slugPage}
                        getProjectTitle={getProjectTitleByLanguage}
                      />
                      {index < otherProjects.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                  <p></p>
                </div>
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
