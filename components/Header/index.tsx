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
  // const isInnerWorksPage = pathname.startsWith(`/${langSelected}/works/`)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header
      className={clsx(
        'text-sm fixed top-0 w-screen h-headerSmall lg:h-header flex z-[20] pt-4   ',
        {
          'text-white bg-transparent': isHomePage,
        },
        {
          'text-black bg-white md:bg-transparent':
            !isHomePage && !isMusicPage && !isWorksPage,
        },
        {
          'text-black lg:!absolute lg:right-0 lg:text-white lg:mix-blend-difference bg-white lg:bg-transparent':
            isWorksPage,
        },
        {
          'text-white bg-black md:bg-transparent': isMusicPage,
        },
      )}
    >
      <div
        className={clsx(
          'px-6 lg:px-12 py-4  w-screen 3xl:mx-auto max-w-screen-3xl text-base flex items-start  justify-between gap-12 ',
        )}
      >
        <div className="space-y-3 ">
          <h1
            className={clsx('mr-auto space-x-3 ', {
              'lg:fixed lg:left-12 lg:top-8': isWorksPage,
            })}
          >
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
            <div className="lg:hidden">
              <TranslationLinks translations={translations} isWorksPage />
            </div>
          )}
        </div>
        <div className="text-left flex flex-col gap-[0.3rem] lg:hidden">
          <MobileNavLinks
            pathname={pathname}
            langSelected={langSelected}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isMusicPage={isMusicPage}
            isHomePage={isHomePage}
          />
        </div>

        <div className="hidden lg:flex gap-12 items-start">
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
