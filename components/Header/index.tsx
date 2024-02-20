'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

import { clean } from '../Clean'
import TranslationLinks from '../TranslationLinks'
import { LanguageContext } from '@/contexts/LangContext'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { i18n } from '@/languages'
import { AnimatePresence, motion } from 'framer-motion'

export default function Header() {
  const { currentLanguage, translations } = useContext(LanguageContext)
  const pathname = usePathname()
  const langSelected = pathname.split('/')[1]
  const isHomePage = pathname === `/${langSelected}`

  const [isHovered, setIsHovered] = useState(!isHomePage)

  // Update the isHovered state based on the pathname
  useEffect(() => {
    // If the pathname is not the home page, set isHovered to true
    setIsHovered(pathname !== `/${langSelected}`)
  }, [pathname]) // This effect runs every time the pathname changes

  const menuVariants = {
    hidden: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    visible: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
    },
  }
  const transVariants = {
    hidden: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    visible: {
      opacity: 0,
      x: -40,
      transition: { duration: 0.2, ease: 'easeOut', delay: 0.05 },
    },
  }
  const borderVariants = {
    initial: { x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    animate: {
      x: -90, // Adjust this value to match the desired position
      transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
    },
  }

  const linksVariants = {
    hidden: {
      opacity: 0,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    visible: {
      opacity: 1,
      x: -100,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.05 },
    },
  }

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
        {isHomePage ? (
          <motion.div
            variants={transVariants}
            initial="hidden"
            animate={isHovered ? 'visible' : 'hidden'}
          >
            <TranslationLinks translations={translations} />
          </motion.div>
        ) : (
          <TranslationLinks translations={translations} />
        )}
        <motion.div
          className="flex gap-12 items-start w-24 "
          onMouseEnter={() =>
            pathname === `/${langSelected}` && setIsHovered(true)
          }
          onMouseLeave={() =>
            pathname === `/${langSelected}` && setIsHovered(false)
          }
        >
          <motion.div
            className=""
            variants={menuVariants}
            initial="hidden"
            animate={isHovered ? 'visible' : 'hidden'}
          >
            MENU
          </motion.div>
          <motion.div
            className="border-r-[1.5px] w-px h-12 "
            variants={borderVariants}
            initial="initial"
            animate={isHovered ? 'animate' : 'initial'}
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="origin-left "
                variants={linksVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div className=" flex flex-col gap-2">
                  <Link
                    href={'/' + langSelected + '/works'}
                    className={clsx('hover:text-white pr-4', {
                      'text-white': pathname.startsWith(
                        `/${langSelected}/works`,
                      ),
                    })}
                  >
                    {langSelected === 'en' ? 'Works' : 'Werken'}
                  </Link>
                  <Link
                    href={'/' + langSelected + '/about'}
                    className={clsx('hover:text-white pr-4', {
                      'text-white': pathname === `/${langSelected}/about`,
                    })}
                  >
                    {langSelected === 'en' ? 'About' : 'Over'}
                  </Link>

                  <Link
                    href={'/' + langSelected + '/music'}
                    className={clsx('hover:text-white pr-4', {
                      'text-white': pathname === `/${langSelected}/music`,
                    })}
                  >
                    {langSelected === 'en' ? 'Music' : 'Muziek'}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  )
}
