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
          console.log('portfolio:', portfolio)
          console.log('projectPaths: ', projectPaths)

          const numberOfProjects = portfolio.projects.length
          {
            /* if number of projects is 1 then add the link around the article and dont add component ProjectLinks */
          }
          {
            /* if number of projects is > 1 then dont add the link around the article, only add it as already in project links*/
          }
          return (
            <>
              <article key={portfolio._id} className="col-span-1 bg-blue-200">
                {portfolio?.slug?.[language]?.current ? (
                  <>
                    <p>img</p>
                    <p>{numberOfProjects}</p>

                    <Link href={''}>
                      <Title>{portfolio.title[language]}</Title>
                    </Link>
                    {projectPaths.length > 0 ? (
                      <>
                        <ProjectLinks projects={projectPaths} openByDefault />
                      </>
                    ) : (
                      <Prose>No projects available</Prose>
                    )}
                  </>
                ) : (
                  <>
                    <Title>{portfolio.title[language]}</Title>
                    <ul>
                      <li>item 1</li>
                      <li>item 2</li>
                    </ul>
                  </>
                )}
              </article>
            </>
          )
        })}
    </div>
  )
}
