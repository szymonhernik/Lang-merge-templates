'use client'
import { LanguageIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useContext } from 'react'

import { Translation } from '@/lib/types'

import { i18n } from '@/languages'
import { clean } from './Clean'
import TranslationLinks from './TranslationLinks'
import { LanguageContext, useLanguage } from '@/contexts/LangContext'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)
  // const { translations, currentLanguage = i18n.base } = props
  console.log('currentLanguage', currentLanguage)
  console.log('translations', translations)

  return (
    <header className="font-bold text-black fixed top-0 w-screen h-header flex z-20 pt-4">
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
