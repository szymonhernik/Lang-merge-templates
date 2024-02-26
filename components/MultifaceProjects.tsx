import { TranslationReach } from '@/lib/types'
import React, { PropsWithChildren } from 'react'
import ProjectLinks from './ProjectLinks'

type MultifaceProjectsProps = PropsWithChildren<{
  projects: TranslationReach[][]
}>

export default function MultifaceProjects(props: MultifaceProjectsProps) {
  const { children, projects } = props

  return (
    <>
      <ProjectLinks projects={projects} />
    </>
  )
}
