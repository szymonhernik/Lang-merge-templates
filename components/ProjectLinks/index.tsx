'use client'

import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { Translation } from '../../lib/types'
import { ListLink } from './ListLink'

type ProjectLinksProps = {
  projects: Translation[][]
  openByDefault?: boolean
  hasLinkedFile?: boolean
}

export default function ProjectLinks(props: ProjectLinksProps) {
  const { projects, openByDefault = false } = props

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
  // console.log('projects', projects)

  return (
    <Menu as="div" className="">
      <Menu.Items static as="ul" className="">
        {localeProjects.map((project, index) => {
          if (project) {
            return (
              <Menu.Item
                as="li"
                key={project.path}
                className="flex items-center"
              >
                {({ active }) => (
                  <ListLink href={project.path} locale={project.language}>
                    <span className="flex-1 flex items-center gap-x-2">
                      <span className="font-bold text-sm  w-6">
                        {String(index + 1).padEnd(2, '.')}
                      </span>
                      <span>{project.title}</span>
                    </span>
                  </ListLink>
                )}
              </Menu.Item>
            )
          } else {
            return null
          }
        })}
      </Menu.Items>
    </Menu>
  )
}
