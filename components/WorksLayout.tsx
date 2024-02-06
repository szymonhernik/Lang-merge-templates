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
    <div className="grid grid-cols-4 gap-4 pt-header px-8">
      {portfolios &&
        portfolios?.length > 0 &&
        portfolios.map((portfolio) => {
          const numberOfProjects = portfolio.projects.length
          // console.log('portfolio:', portfolio)
          return (
            <>
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
            </>
          )
        })}
    </div>
  )
}
