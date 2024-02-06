import { Translation } from '@/lib/types'
import { clsx } from 'clsx'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import ProjectLinks from './ProjectLinks'
import ImageBox from './shared/ImageBox'

type MultifaceProjectsProps = PropsWithChildren<{
  projects: Translation[][]
}>

export default function MultifaceProjects(props: MultifaceProjectsProps) {
  const { children, projects } = props

  return (
    <>
      {projects.map((project, index) => {
        console.log(
          'project.image',
          project.find((p) => p.language === 'en')?.coverImage,
        )

        return (
          <div key={index}>
            {project.find((p) => p.language === 'en')?.coverImage && (
              <ImageBox
                classesWrapper="w-1/4 h-auto  "
                classesImage="w-auto h-auto"
                image={project.find((p) => p.language === 'en')?.coverImage}
                alt={`${project.find((p) => p.language === 'en')?.coverImage?.alt ?? ''}`}
              />
            )}
          </div>
        )
      })}
      <ProjectLinks projects={projects} />
    </>
  )
}
