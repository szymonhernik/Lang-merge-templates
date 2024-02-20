'use client'

import Link from 'next/link'
import React, { useContext } from 'react'

import { clean } from '../Clean'
import TranslationLinks from '../TranslationLinks'
import { LanguageContext } from '@/contexts/LangContext'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import AnimatedHeaderDesktop from './AnimatedHeaderDesktop'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)
  const pathname = usePathname()
  const langSelected = pathname.split('/')[1]
  const isHomePage = pathname === `/${langSelected}`

  return (
    <header
      className={clsx(
        'text-sm  text-white  fixed top-0 w-screen h-header flex z-[20] pt-4',
        {
          'mix-blend-difference': pathname !== `/${langSelected}`,
        },
      )}
    >
      <div className="container mx-auto  flex items-start  justify-between gap-12">
        <h1 className="mr-auto ">
          <Link href={`/${clean(langSelected)}`} className="">
            <span>Narges Mohammadi</span>
          </Link>
        </h1>
        <AnimatedHeaderDesktop
          pathname={pathname}
          langSelected={langSelected}
          translations={translations}
        />
      </div>
    </header>
  )
}
