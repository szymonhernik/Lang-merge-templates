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

import React, { useMemo } from 'react'
import Link from 'next/link'
import MultifaceProjects from './MultifaceProjects'
import ImageBox from './shared/ImageBox'
import ProjectContent from './ProjectContent'

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
  // console.log('portfolios', portfolios[0].projects)

  return (
    <section className="w-full py-12">
      <div className="2xl:max-w-[1536px] mx-auto grid gap-6 md:gap-8 px-4 md:px-6 lg:grid-cols-4 md:grid-cols-2 pt-header">
        {portfolios &&
          portfolios?.length > 0 &&
          portfolios.map((portfolio, index) => {
            const numberOfProjects = portfolio.projects.length
            // console.log('portfolio:', portfolio)
            return (
              <React.Fragment key={index}>
                {numberOfProjects === 1 &&
                portfolio?.slug?.[language]?.current ? (
                  <Link href={`works/${portfolio.slug[language].current}`}>
                    <ProjectContent
                      portfolio={portfolio}
                      language={language}
                      numberOfProjects={numberOfProjects}
                    />
                  </Link>
                ) : (
                  <ProjectContent
                    portfolio={portfolio}
                    language={language}
                    numberOfProjects={numberOfProjects}
                  />
                )}
              </React.Fragment>
            )
          })}
      </div>
    </section>
  )
}
