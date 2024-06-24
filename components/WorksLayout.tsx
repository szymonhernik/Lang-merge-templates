'use client'

import { useParams } from 'next/navigation'
import { SanityDocument } from 'next-sanity'

import React from 'react'
import Link from 'next/link'
import ProjectContent from './ProjectContent'
import PageTitle from './PageTitle'

import { ShowcaseWorksPageExtended } from '@/types'

type WorksLayoutProps = {
  localizedProjects: ShowcaseWorksPageExtended[]
}

export function WorksLayout(props: WorksLayoutProps) {
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
            return (
              <React.Fragment key={index}>
                <Link href={`/${language}/works/${project.currentSlug}`}>
                  <ProjectContent project={project} language={language} />
                </Link>
              </React.Fragment>
            )
          })}
      </div>
    </section>
  )
}
