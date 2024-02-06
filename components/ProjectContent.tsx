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
      <article className="space-y-4 relative flex flex-col">
        {numberOfProjects === 1 ? (
          <ImageBox
            // classesWrapper="w-full h-full  "
            classesImage="aspect-[3/4] object-cover w-full  overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
            image={portfolio.projects[0].coverImage}
            alt={`${portfolio.projects[0].coverImage?.alt ?? ''}`}
          />
        ) : (
          <div className="aspect-[3/4] object-cover w-full  overflow-hidden"></div>
        )}

        {projectPaths.length > 0 && numberOfProjects > 1 ? (
          <div className="absolute top-16 w-full p-4">
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
