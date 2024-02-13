'use client'

import Link from 'next/link'
import React, { useContext } from 'react'

import { clean } from './Clean'
import TranslationLinks from './TranslationLinks'
import { LanguageContext } from '@/contexts/LangContext'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { i18n } from '@/languages'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)
  const pathname = usePathname()
  const langSelected = pathname.split('/')[1]

  return (
    <header
      className={clsx(
        'text-sm  text-white  fixed top-0 w-screen h-header flex z-[20] pt-4',
        {
          'mix-blend-difference': pathname !== `/${langSelected}`,
        },
      )}
    >
      <div className="container mx-auto flex items-start  justify-between gap-4">
        <h1 className="mr-auto ">
          <Link href={`/${clean(langSelected)}`} className="">
            <span>Narges Mohammadi</span>
          </Link>
        </h1>
        <TranslationLinks translations={translations} />
        <div
          className={clsx(
            'flex flex-col gap-1 w-16 justify-end items-start text-gray-200 ',
            {
              'text-gray-400': pathname !== `/${langSelected}`,
            },
          )}
        >
          <Link
            href={'/' + langSelected + '/works'}
            className={clsx('hover:text-white', {
              'text-white': pathname.startsWith(`/${langSelected}/works`),
            })}
          >
            {langSelected === 'en' ? 'Works' : 'Werken'}
          </Link>
          <Link
            href={'/' + langSelected + '/about'}
            className={clsx('hover:text-white', {
              'text-white': pathname === `/${langSelected}/about`,
            })}
          >
            {langSelected === 'en' ? 'About' : 'Over'}
          </Link>

          <Link
            href={'/' + langSelected + '/music'}
            className={clsx('hover:text-white', {
              'text-white': pathname === `/${langSelected}/music`,
            })}
          >
            {langSelected === 'en' ? 'Music' : 'Muziek'}
          </Link>
        </div>
      </div>
    </header>
  )
}
