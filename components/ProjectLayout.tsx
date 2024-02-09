'use client'

import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { createProjectLinks } from '@/lib/helpers'

import { i18n } from '@/languages'

import Button from './Button'

import Prose from './Prose'
import Title from './Title'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const { title, summary, content, details, portfolio } = props.data ?? {}
  const { projects } = portfolio ?? {}
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  return (
    <>
      <div className="relative z-10 mt-40">
        <section className="">
          <div className="container mx-auto ">
            <Title>{title}</Title>
            <div className="w-auto">
              {details?.length > 0 ? <Prose value={details} /> : null}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
