'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { Translation } from '@/lib/types'

import { clean } from './Clean'
import { i18n } from '@/languages'

type TranslationLinksProps = {
  translations: Translation[]
}

export default function TranslationLinks(props: TranslationLinksProps) {
  const { translations = [] } = props
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  const availableTranslations = useMemo<Translation[]>(
    () =>
      i18n.languages.reduce<Translation[]>((acc, cur) => {
        const availableTranslation = translations.find(
          (translation) => translation.language === cur.id,
        )
        return availableTranslation ? [...acc, availableTranslation] : acc
      }, []),
    [translations],
  )

  return (
    <ul className="inline-flex items-center ">
      {availableTranslations.map((version) => (
        <li
          key={version.language}
          className={clsx(
            ``,
            version.language === language
              ? `pointer-events-none`
              : `text-gray-500 hover:text-black`,
          )}
        >
          {version?.path ? (
            <Link
              href={clean(version.path)}
              locale={version.language}
              className="flex items-center group "
            >
              <span className="block uppercase font-mono  tracking-widest  px-1">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </Link>
          ) : (
            <span className="flex items-center group  opacity-25 pointer-events-none">
              <span className="block uppercase font-mono  tracking-widest  px-1">
                {version.language}
              </span>
              <span className="sr-only">{version.title}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
