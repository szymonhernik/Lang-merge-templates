'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { TranslationReach } from '../../lib/types'
import { ListLink } from './ListLink'
import ImageBox from '../shared/ImageBox'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import Image from 'next/image'

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
  // console.log(projects[0][0].coverImage)

  if (!localeProjects?.length) {
    return null
  }
  // console.log('projects', projects)

  return (
    <div className="min-h-full bg-brokenYellow p-4 md:bg-transparent md:p-1 md:px-2 ">
      <Accordion
        type="single"
        collapsible
        className="w-full  text-tryeMobile md:text-trye"
        defaultValue="item-0"
      >
        {localeProjects.map((project, index) =>
          project ? (
            <AccordionItem
              value={`item-${index}`}
              key={project.path}
              className="h-auto  border-black"
            >
              {project.coverImage ? (
                <>
                  <AccordionTrigger className="hover:no-underline">
                    <Link href={project.path}>
                      <div
                        className={` transition-colors duration-200  hover:underline  `}
                      >
                        {String(index + 1).padEnd(2, '.')} {project.title}{' '}
                        {project.year && (
                          <span className="  opacity-50 ml-1 text-sm">
                            ({project.year})
                          </span>
                        )}
                      </div>
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="h-36 w-auto">
                    <Link href={project.path}>
                      <Image
                        alt={
                          project.coverImage.alt ? project.coverImage.alt : ''
                        }
                        width={
                          project.coverImage.asset.width
                            ? Math.round(project.coverImage.asset.width / 100)
                            : 100
                        }
                        height={
                          project.coverImage.asset.height
                            ? Math.round(project.coverImage.asset.height / 100)
                            : 100
                        }
                        className={`w-auto h-full object-cover `}
                        sizes={
                          '(max-width:640px) 25vw, (max-width: 768px) 20vw, 10vw'
                        }
                        src={project.coverImage.asset.url}
                        placeholder="blur"
                        blurDataURL={project.coverImage.asset.lqip} // Use the extracted LQIP as the blurDataURL
                      />
                    </Link>
                  </AccordionContent>
                </>
              ) : (
                <Link href={project.path} className="inline-block">
                  <div
                    className={`py-3 md:py-4 w-fit transition-colors duration-200  hover:opacity-100 hover:underline opacity-50 `}
                  >
                    {String(index + 1).padEnd(2, '.')} {project.title}{' '}
                    {project.year && (
                      <span className="  opacity-50 ml-1 text-sm">
                        ({project.year})
                      </span>
                    )}
                  </div>
                </Link>
              )}
              {/* </li> */}
            </AccordionItem>
          ) : null,
        )}
      </Accordion>
    </div>
  )
}
