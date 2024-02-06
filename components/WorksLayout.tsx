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

type WorksLayoutProps = {
  data?: { portfolios: SanityDocument[] }
}

export function WorksLayout(props: WorksLayoutProps) {
  const { portfolios } = props.data || {}
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  // console.log('externalDocs', externalDocs)
  // console.log('portfolios', portfolios[0].projects[2].linkedFile.asset.url)

  return (
    <div className="grid grid-cols-4 gap-4 pt-header px-8">
      {portfolios &&
        portfolios?.length > 0 &&
        portfolios.map((portfolio) => {
          // Generate project links for each portfolio
          const projectPaths = createProjectLinks(
            portfolio.projects,
            portfolio.slug,
          )
          console.log('projectPaths:', projectPaths)

          const numberOfProjects = portfolio.projects.length

          // Article content for reusability
          const articleContent = (
            <>
              <div className="w-full bg-gray-200 h-96 flex items-center justify-center">
                img
              </div>
              {/* <p>{numberOfProjects}</p> */}

              {projectPaths.length > 0 && numberOfProjects > 1 ? (
                <>
                  <ProjectLinks projects={projectPaths} openByDefault />
                </>
              ) : (
                numberOfProjects === 1 && null
              )}
              <Title>{portfolio.title[language]}</Title>
            </>
          )

          return (
            <>
              {numberOfProjects === 1 &&
              portfolio?.slug?.[language]?.current ? (
                <Link href={`works/${portfolio.slug[language].current}`}>
                  <article className="col-span-1 bg-blue-200">
                    {articleContent}
                  </article>
                </Link>
              ) : (
                <article className="col-span-1 bg-blue-200">
                  {articleContent}
                </article>
              )}
            </>
          )
        })}
    </div>
  )
}
