import { Translation } from '@/lib/types'
import { clsx } from 'clsx'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

import { SanityDocument } from 'next-sanity'
import { createProjectReachLinks } from '@/lib/helpers'
import ImageBox from './shared/ImageBox'
import MultifaceProjects from './MultifaceProjects'
import Title from './Title'
import { ShowcaseWorksPageExtended } from '@/types'

type ProjectContentProps = PropsWithChildren<{
  project: ShowcaseWorksPageExtended
  // portfolio: any
  language: string
  // numberOfProjects: number
}>

export default function ProjectContent(props: ProjectContentProps) {
  const { children, language, project } = props

  return (
    <>
      <article className="gap-4 relative flex flex-col opacity-90 hover:opacity-100 transition-opacity">
        <ImageBox
          size={'(max-width: 768px) 100vw, 45vw'}
          classesImage="aspect-[3/4] object-cover w-full overflow-hidden  transition-opacity"
          image={project.coverImage}
          alt={`${project.coverImage?.alt ?? ''}`}
        />

        <Title year={project.year}>{project.currentTitle}</Title>
      </article>
    </>
  )
}
