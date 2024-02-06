import { Translation } from '@/lib/types'
import { clsx } from 'clsx'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import ProjectLinks from './ProjectLinks'

type MultifaceProjectsProps = PropsWithChildren<{
  projects: Translation[][]
}>

export default function MultifaceProjects(props: MultifaceProjectsProps) {
  const { children, projects } = props

  return (
    <>
      <ProjectLinks projects={projects} />
    </>
  )
}
