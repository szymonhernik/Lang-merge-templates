'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import { SanityDocument } from 'next-sanity'

import { getLabelByKey } from '@/lib/getLabelByKey'
import { createPortfolioSummary, createProjectLinks } from '@/lib/helpers'
import { Label } from '@/lib/types'

import Button from './Button'
import Title from './Title'
import TranslationLinks from './TranslationLinks'
import ProjectLinks from './ProjectLinks'
import Prose from './Prose'
import { useMemo } from 'react'
import Link from 'next/link'
import ImageBox from './shared/ImageBox'
import ProjectLink from './ProjectLink'

type HomeLayoutProps = {
  data?: { home: SanityDocument }
}

export function HomeLayout({ localizedProjects }) {
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  return (
    <div className="container mx-auto py-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
      {localizedProjects?.map((project, key) => (
        <div key={key}>
          <ProjectLink project={project} language={language}>
            <h1>{project.currentTitle}</h1>
          </ProjectLink>

          {project.coverImage && (
            <div className="w-1/4">
              <ImageBox
                classesWrapper="w-full h-auto"
                classesImage="w-auto h-full object-contain"
                image={project.coverImage}
                alt={project.coverImage.alt || ''}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
