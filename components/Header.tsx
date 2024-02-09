import { LanguageIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

import { Translation } from '@/lib/types'

import { i18n } from '@/languages'
import { clean } from './Clean'
import TranslationLinks from './TranslationLinks'

type HeaderProps = {
  translations: Translation[]
  currentLanguage?: string
}

export default function Header(props: HeaderProps) {
  const { translations, currentLanguage = i18n.base } = props

  return (
    <header className="font-bold text-white mix-blend-difference fixed top-0 w-screen h-header flex z-20 pt-4">
      <div className="container mx-auto flex items-start  justify-between gap-4">
        <h1 className="mr-auto">
          <Link href={`/${clean(currentLanguage)}`} className="">
            <span className="">Narges Mohammadi</span>
          </Link>
        </h1>
        <TranslationLinks translations={translations} />
        <div className="flex flex-col">
          <Link href={'/' + currentLanguage + '/about'}>
            {currentLanguage === 'en' ? 'About' : 'Over'}
          </Link>
          <Link href={'/' + currentLanguage + '/works'}>
            {currentLanguage === 'en' ? 'Works' : 'Werken'}
          </Link>
          <Link href={'/' + currentLanguage + '/music'}>
            {currentLanguage === 'en' ? 'Music' : 'Muziek'}
          </Link>
        </div>
      </div>
    </header>
  )
}
