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

type HomeLayoutProps = {
  data?: { portfolios: SanityDocument[] }
}

export function HomeLayout(props: HomeLayoutProps) {
  const { portfolios } = props.data || {}
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  return (
    <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
      {portfolios &&
        portfolios?.length > 0 &&
        portfolios.map((portfolio) => {
          // Generate project links for each portfolio
          const projectPaths = createProjectLinks(
            portfolio.projects,
            portfolio.slug,
          )
          const numberOfProjects = portfolio.projects.length
          return (
            <>
              <article
                key={portfolio._id}
                className="mt-64 relative bg-gradient-to-tr mix-blend-multiply from-cyan-100 via-pink-100 to-yellow-100 p-8 md:p-16 xl:p-24 rounded-xl md:rounded-2xl xl:rounded-3xl w-full max-w-7xl mx-auto flex flex-col gap-4 md:flex-row items-start md:items-center md:justify-between group 
            hover:scale-[1.01] hover:rotate-[-0.25deg] 
            transition-transform duration-200"
              >
                {portfolio?.slug?.[language]?.current ? (
                  <>
                    <Title>{portfolio.title[language]}</Title>
                    {projectPaths.length > 0 ? (
                      <>
                        <ProjectLinks projects={projectPaths} openByDefault />
                        {numberOfProjects}
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
      <Link href={language + '/about'}>About</Link>
    </div>
  )
}
