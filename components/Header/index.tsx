'use client'

import Link from 'next/link'
import React, { useContext } from 'react'

import { clean } from '../Clean'
import TranslationLinks from '../TranslationLinks'
import { LanguageContext } from '@/contexts/LangContext'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import AnimatedHeaderDesktop from './AnimatedHeaderDesktop'
import MobileNavLinks from './MobileNavLinks'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)
  const pathname = usePathname()
  const langSelected = pathname.split('/')[1]
  const isHomePage = pathname === `/${langSelected}`

  return (
    <header
      className={clsx(
        'text-sm text-white fixed top-0 w-screen h-header flex z-[20] pt-4',
        {
          'text-black bg-white': !isHomePage,
        },
      )}
    >
      <div
        className={clsx(
          'px-6 py-4  w-screen 3xl:mx-auto max-w-screen-3xl text-base flex items-start  justify-between gap-12',
        )}
      >
        <div className="space-y-3">
          <h1 className="mr-auto ">
            <Link href={`/${clean(langSelected)}`} className="">
              <span>Narges Mohammadi</span>
            </Link>
          </h1>
          <div className={clsx('md:hidden', { hidden: !isHomePage })}>
            <TranslationLinks translations={translations} />
          </div>
        </div>
        <div className="text-left flex flex-col gap-[0.3rem] md:hidden">
          <MobileNavLinks pathname={pathname} langSelected={langSelected} />
        </div>

        <div className="hidden md:flex gap-12 items-start">
          <AnimatedHeaderDesktop
            pathname={pathname}
            langSelected={langSelected}
            translations={translations}
          />
        </div>
      </div>
    </header>
  )
}
