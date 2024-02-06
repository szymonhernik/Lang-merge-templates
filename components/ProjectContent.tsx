import { Translation } from '@/lib/types'
import { clsx } from 'clsx'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import ProjectLinks from './ProjectLinks'
import { SanityDocument } from 'next-sanity'
import { createProjectLinks } from '@/lib/helpers'
import ImageBox from './shared/ImageBox'
import MultifaceProjects from './MultifaceProjects'
import Title from './Title'

type ProjectContentProps = PropsWithChildren<{
  portfolio: any
  language: string
  numberOfProjects: number
}>

export default function ProjectContent(props: ProjectContentProps) {
  const { children, portfolio, language, numberOfProjects } = props

  //   const numberOfProjects = portfolio.projects.length
  const projectPaths = createProjectLinks(portfolio.projects, portfolio.slug) // Ensure createProjectLinks is imported or accessible

  return (
    <>
      <article className="col-span-1 bg-blue-200 relative">
        <div className="w-full bg-gray-200 h-[30rem] object-cover overflow-hidden flex items-center justify-center">
          {numberOfProjects === 1 && (
            <ImageBox
              classesWrapper="w-full h-full  "
              classesImage="min-h-full object-cover"
              image={portfolio.projects[0].coverImage}
              alt={`${portfolio.projects[0].coverImage?.alt ?? ''}`}
            />
          )}
        </div>

        {projectPaths.length > 0 && numberOfProjects > 1 ? (
          <div className="absolute top-1/2 w-full p-4">
            <MultifaceProjects projects={projectPaths} />
          </div>
        ) : (
          numberOfProjects === 1 && null
        )}
        <Title>{portfolio.title[language]}</Title>
      </article>
    </>
  )
}
