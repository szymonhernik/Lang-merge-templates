'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { TranslationReach } from '../../lib/types'
import { ListLink } from './ListLink'
import ImageBox from '../shared/ImageBox'

type ProjectLinksProps = {
  projects: TranslationReach[][]
  openByDefault?: boolean
  hasLinkedFile?: boolean
}

export default function ProjectLinks(props: ProjectLinksProps) {
  const { projects } = props

  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  const localeProjects = useMemo(
    () =>
      projects
        // Filter list down to just the current locale
        .map((projectGroup) =>
          projectGroup.find((project) => project.language === language),
        ),
    [language, projects],
  )

  if (!localeProjects?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 justify-center">
      {/* <div className="w-full h-48">
        {selectedProject?.coverImage && (
          <ImageBox
            classesWrapper="h-full "
            classesImage="w-auto h-full object-contain"
            image={selectedProject.coverImage}
            alt={selectedProject.coverImage.alt || ''}
          />
        )}

        {selectedProject?.hasLinkedFile && (
          <div className="shadow-md h-full mx-auto aspect-[3/4] p-4 ">PDF</div>
        )}
      </div> */}
      <ul className="">
        {localeProjects.map((project, index) =>
          project ? (
            <li
              key={project.path}
              className="flex items-center justify-between text-base border-neutral-500 last:border-b-0 border-b-[0.5px] py-4"
            >
              <ListLink href={project.path} locale={project.language}>
                <div
                  className={`flex transition-colors duration-200 hover:underline text-gray-500 `}
                >
                  {String(index + 1).padEnd(2, '.')} {project.title}
                </div>
              </ListLink>
              {project.coverImage && (
                <ImageBox
                  classesWrapper="w-auto h-16" // Set appropriate size for the images
                  classesImage="w-auto h-full object-cover" // Adjust object-fit as needed
                  image={project.coverImage}
                  alt={project.coverImage.alt || 'Project image'}
                />
              )}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}
