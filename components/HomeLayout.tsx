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
      {/* <Link href={language + '/about'}>About</Link>
       <Link href={language + '/works'}>Works</Link> */}
    </div>
  )
}
