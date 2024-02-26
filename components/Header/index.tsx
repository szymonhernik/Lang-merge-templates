'use client'

import Link from 'next/link'
import React, { Suspense, useContext, useState } from 'react'

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
  const isMusicPage = pathname === `/${langSelected}/music`
  const isWorksPage = pathname.startsWith(`/${langSelected}/works/`)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header
      className={clsx(
        'text-sm fixed top-0 w-screen h-headerSmall md:h-header flex z-[20] pt-4  ',
        {
          'text-white': isHomePage,
        },
        {
          'text-black bg-white md:bg-transparent':
            !isHomePage && !isMusicPage && !isWorksPage,
        },
        {
          'text-white mix-blend-difference': isWorksPage,
        },
        {
          'text-white bg-black md:bg-transparent': isMusicPage,
        },
      )}
    >
      <div
        className={clsx(
          'px-6 py-4  w-screen 3xl:mx-auto max-w-screen-3xl text-base flex items-start  justify-between gap-12',
        )}
      >
        <div className="space-y-3">
          <h1 className={clsx('mr-auto space-x-3', {})}>
            <Link href={`/${clean(langSelected)}`} className="">
              <span>Narges Mohammadi</span>
            </Link>
            <Link
              href={`/${langSelected}/works`}
              className={`underline hidden ${isWorksPage && 'lg:inline'}`}
            >
              back to works
            </Link>
          </h1>
          {(isHomePage || isMenuOpen) && (
            <div className="md:hidden">
              <TranslationLinks translations={translations} isWorksPage />
            </div>
          )}
        </div>
        <div className="text-left flex flex-col gap-[0.3rem] md:hidden">
          <MobileNavLinks
            pathname={pathname}
            langSelected={langSelected}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isMusicPage={isMusicPage}
            isHomePage={isHomePage}
          />
        </div>

        <div className="hidden md:flex gap-12 items-start">
          <Suspense>
            <AnimatedHeaderDesktop
              pathname={pathname}
              langSelected={langSelected}
              translations={translations}
              isWorksPage={isWorksPage}
            />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
