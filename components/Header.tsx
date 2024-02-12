'use client'

import Link from 'next/link'
import React, { useContext } from 'react'

import { clean } from './Clean'
import TranslationLinks from './TranslationLinks'
import { LanguageContext } from '@/contexts/LangContext'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)

  return (
    <header className=" text-sm text-white mix-blend-difference  fixed top-0 w-screen h-header flex z-20 pt-4">
      <div className="container mx-auto flex items-start  justify-between gap-4">
        <h1 className="mr-auto">
          <Link href={`/${clean(currentLanguage)}`} className="">
            <span>Narges Mohammadi</span>
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
