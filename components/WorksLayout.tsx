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
          const numberOfProjects = portfolio.projects.length

          // Article content for reusability
          const articleContent = (
            <>
              <p>img</p>
              <p>{numberOfProjects}</p>

              <Title>{portfolio.title[language]}</Title>
              {projectPaths.length > 0 && numberOfProjects > 1 ? (
                <ProjectLinks projects={projectPaths} openByDefault />
              ) : (
                numberOfProjects === 1 && null
              )}
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
