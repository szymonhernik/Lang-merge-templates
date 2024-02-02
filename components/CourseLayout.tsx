'use client'

import { useParams } from 'next/navigation'
import React, { PropsWithChildren, useMemo } from 'react'

import ProjectLinks from '@/components/ProjectLinks'
import Title from '@/components/Title'
import { createProjectLinks } from '@/lib/helpers'

import { i18n } from '@/languages'

import Prose from './Prose'

type CourseLayoutProps = PropsWithChildren<{
  data?: any
}>

export function CourseLayout(props: CourseLayoutProps) {
  const { title, slug, presenters, projects } = props.data ?? {}

  // Render the localized title, if it exists, otherwise fallback to base
  const { language: currentLanguage } = useParams()
  const titleLanguage = Array.isArray(currentLanguage)
    ? currentLanguage[0]
    : currentLanguage
  const currentTitle = title ? title[titleLanguage] ?? title[i18n.base] : null

  // Each "course" document has an array of "project" references
  // "project" documents have document-level translations
  // Each document has a unique slug and are related by an
  // array of references stored in a separate "translation.metadata" document
  const projectPaths = useMemo(
    () => createProjectLinks(projects, slug),
    [projects, slug],
  )

  return (
    <>
      <div className="relative">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-2 md:gap-4 xl:gap-8">
            <Title>{currentTitle}</Title>
            {/* {title} */}
          </div>
        </section>

        <div className="p-4 md:p-8 xl:p-16 container mx-auto">
          {projectPaths.length > 0 ? (
            <ProjectLinks projects={projectPaths} openByDefault />
          ) : (
            <Prose>{props.children}</Prose>
          )}
        </div>
      </div>
    </>
  )
}
