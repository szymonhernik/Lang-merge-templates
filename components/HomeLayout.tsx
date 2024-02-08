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

type HomeLayoutProps = {
  data?: { home: SanityDocument }
}

export function HomeLayout({ localizedProjects }) {
  console.log('localizedProjectsss', localizedProjects)

  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  // const getTitleForLanguage = (work, language) => {
  //   // Check if the primary language of the work matches the current language
  //   if (work.language === language) {
  //     return work.title
  //   }
  //   // If not, find the translation for the current language
  //   const translation = work.translations.find((t) => t.language === language)
  //   return translation ? translation.title : work.title // Fallback to the original title if no translation is found
  // }

  return (
    <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
      {localizedProjects?.map((project, key) => (
        <div key={key}>
          <h1>{project.currentTitle}</h1>
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
